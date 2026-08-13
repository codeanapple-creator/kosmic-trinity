import { Router } from 'express';
import { db } from '@workspace/db';
import { bookingsTable } from '@workspace/db/schema';
import { eq } from 'drizzle-orm';
import { createCalendarEvent } from '../googleCalendar.js';
import { sendBookingConfirmedEmail } from '../mailer.js';

const router = Router();

// GET /api/booking/ref/:bookingId — fetch booking for thank-you page
router.get('/booking/ref/:bookingId', async (req, res) => {
  try {
    const { bookingId } = req.params;
    if (!bookingId || !/^KT-[A-Z0-9]{8}$/.test(bookingId)) {
      res.status(400).json({ error: 'Invalid booking reference' });
      return;
    }

    const [booking] = await db
      .select()
      .from(bookingsTable)
      .where(eq(bookingsTable.bookingId, bookingId));

    if (!booking) {
      res.status(404).json({ error: 'Booking not found' });
      return;
    }

    // Return only the fields safe to expose to the customer
    res.json({
      bookingId: booking.bookingId,
      customerName: booking.customerName,
      customerEmail: booking.customerEmail,
      serviceName: booking.serviceName,
      paymentStatus: booking.paymentStatus,
      paymentAmount: booking.paymentAmount,
      paymentCurrency: booking.paymentCurrency,
      bookingStatus: booking.bookingStatus,
      // Include if birth details already submitted (e.g. page refresh)
      dateOfBirth: booking.dateOfBirth,
      birthTime: booking.birthTime,
      birthPlace: booking.birthPlace,
      googleCalendarEventLink: booking.googleCalendarEventLink,
    });
  } catch (err: any) {
    req.log.error({ err }, 'Get booking ref error');
    res.status(500).json({ error: 'Could not retrieve booking' });
  }
});

// POST /api/booking/birth-details — save birth details, create calendar event
router.post('/booking/birth-details', async (req, res) => {
  try {
    const {
      bookingId,
      fullName,
      dateOfBirth,
      birthTime,
      birthPlace,
      birthCity,
      birthState,
      birthCountry,
      latitude,
      longitude,
    } = req.body;

    if (!bookingId || !fullName || !dateOfBirth || !birthTime || !birthPlace) {
      res.status(400).json({ error: 'Please fill in all required fields.' });
      return;
    }

    if (!/^KT-[A-Z0-9]{8}$/.test(bookingId)) {
      res.status(400).json({ error: 'Invalid booking reference' });
      return;
    }

    const [booking] = await db
      .select()
      .from(bookingsTable)
      .where(eq(bookingsTable.bookingId, bookingId));

    if (!booking) {
      res.status(404).json({ error: 'Booking not found' });
      return;
    }

    if (booking.paymentStatus !== 'SUCCESS') {
      res.status(400).json({ error: 'Payment not verified for this booking.' });
      return;
    }

    // Idempotency: if already confirmed with a calendar link, return it
    if (booking.googleCalendarEventLink && booking.bookingStatus === 'confirmed') {
      res.json({
        success: true,
        bookingId: booking.bookingId,
        googleCalendarEventLink: booking.googleCalendarEventLink,
        calendarCreated: true,
        message: 'Your session is already confirmed.',
      });
      return;
    }

    // Save birth details
    await db
      .update(bookingsTable)
      .set({
        customerName: fullName,
        dateOfBirth,
        birthTime,
        birthPlace,
        birthCity: birthCity ?? null,
        birthState: birthState ?? null,
        birthCountry: birthCountry ?? null,
        latitude: latitude ?? null,
        longitude: longitude ?? null,
        bookingStatus: 'birth_details_submitted',
        updatedAt: new Date(),
      })
      .where(eq(bookingsTable.bookingId, bookingId));

    // Attempt Google Calendar event creation
    let calendarEventId: string | null = null;
    let calendarEventLink: string | null = null;
    let calendarError: string | null = null;

    try {
      // Default session: 7 days from now at 10:00 AM IST (04:30 UTC)
      const offsetDays = parseInt(process.env.DEFAULT_SESSION_OFFSET_DAYS ?? '7', 10);
      const sessionDate = new Date();
      sessionDate.setDate(sessionDate.getDate() + offsetDays);
      sessionDate.setUTCHours(4, 30, 0, 0);

      const result = await createCalendarEvent({
        bookingId: booking.bookingId,
        customerName: fullName,
        customerEmail: booking.customerEmail,
        serviceName: booking.serviceName,
        dateOfBirth,
        birthTime,
        birthPlace,
        sessionDate: booking.sessionDate ?? sessionDate,
        sessionDuration: booking.sessionDuration ?? 60,
        sessionTimezone: booking.sessionTimezone ?? 'Asia/Kolkata',
      });

      calendarEventId = result.eventId;
      calendarEventLink = result.eventLink;
    } catch (calErr: any) {
      req.log.warn({ err: calErr }, 'Google Calendar creation failed (non-fatal)');
      calendarError = calErr.message;
    }

    // Persist calendar outcome
    await db
      .update(bookingsTable)
      .set({
        googleCalendarEventId: calendarEventId,
        googleCalendarEventLink: calendarEventLink,
        calendarLastError: calendarError,
        calendarRetryCount: calendarError ? 1 : 0,
        bookingStatus: calendarEventId ? 'confirmed' : 'birth_details_submitted',
        updatedAt: new Date(),
      })
      .where(eq(bookingsTable.bookingId, bookingId));

    // Send confirmation email (non-fatal)
    await sendBookingConfirmedEmail({
      clientName: fullName,
      clientEmail: booking.customerEmail,
      serviceName: booking.serviceName,
      bookingId: booking.bookingId,
      dateOfBirth,
      birthTime,
      birthPlace,
      calendarLink: calendarEventLink,
      amount: booking.paymentAmount,
      currency: booking.paymentCurrency,
    }).catch((emailErr: Error) => {
      req.log.warn({ err: emailErr }, 'Confirmation email failed (non-fatal)');
    });

    res.json({
      success: true,
      bookingId: booking.bookingId,
      googleCalendarEventLink: calendarEventLink,
      calendarCreated: !!calendarEventId,
      message: calendarEventId
        ? 'Your session has been confirmed and added to Google Calendar.'
        : "We've received your birth details. We're temporarily unable to create your calendar booking — your information is safe and we'll reach out to confirm your session time.",
    });
  } catch (err: any) {
    req.log.error({ err }, 'Birth details submission error');
    res.status(500).json({ error: 'Could not save your birth details. Please try again.' });
  }
});

export default router;
