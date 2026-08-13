import { Router, type Request, type Response, type NextFunction } from 'express';
import { db } from '@workspace/db';
import { bookingsTable } from '@workspace/db/schema';
import { eq, desc } from 'drizzle-orm';
import { createCalendarEvent, updateCalendarEvent } from '../googleCalendar.js';
import { sendBookingConfirmedEmail } from '../mailer.js';

const router = Router();

function adminAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers['x-admin-token'];
  const adminToken = process.env.ADMIN_TOKEN;

  if (!adminToken) {
    res.status(503).json({ error: 'Admin access not configured. Set ADMIN_TOKEN.' });
    return;
  }
  if (token !== adminToken) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  next();
}

router.use('/admin', adminAuth);

// GET /api/admin/bookings
router.get('/admin/bookings', async (req, res) => {
  try {
    const bookings = await db
      .select()
      .from(bookingsTable)
      .orderBy(desc(bookingsTable.createdAt));
    res.json(bookings);
  } catch (err: any) {
    req.log.error({ err }, 'Admin list bookings error');
    res.status(500).json({ error: 'Could not fetch bookings' });
  }
});

// GET /api/admin/bookings/:bookingId
router.get('/admin/bookings/:bookingId', async (req, res) => {
  try {
    const [booking] = await db
      .select()
      .from(bookingsTable)
      .where(eq(bookingsTable.bookingId, req.params.bookingId));
    if (!booking) { res.status(404).json({ error: 'Not found' }); return; }
    res.json(booking);
  } catch (err: any) {
    res.status(500).json({ error: 'Could not fetch booking' });
  }
});

// PUT /api/admin/bookings/:bookingId/session — set / update session time
router.put('/admin/bookings/:bookingId/session', async (req, res) => {
  try {
    const { sessionDate, sessionDuration, sessionTimezone } = req.body;
    if (!sessionDate) { res.status(400).json({ error: 'sessionDate required' }); return; }

    const [booking] = await db
      .select()
      .from(bookingsTable)
      .where(eq(bookingsTable.bookingId, req.params.bookingId));
    if (!booking) { res.status(404).json({ error: 'Not found' }); return; }

    const date = new Date(sessionDate);
    const duration: number = sessionDuration ?? booking.sessionDuration ?? 60;
    const tz: string = sessionTimezone ?? booking.sessionTimezone ?? 'Asia/Kolkata';

    await db
      .update(bookingsTable)
      .set({ sessionDate: date, sessionDuration: duration, sessionTimezone: tz, updatedAt: new Date() })
      .where(eq(bookingsTable.bookingId, req.params.bookingId));

    // Update or create calendar event if birth details exist
    if (booking.dateOfBirth && booking.birthTime) {
      try {
        let eventId = booking.googleCalendarEventId;
        let eventLink = booking.googleCalendarEventLink;

        if (eventId) {
          const r = await updateCalendarEvent(eventId, { sessionDate: date, sessionDuration: duration, sessionTimezone: tz });
          eventLink = r.eventLink;
        } else {
          const r = await createCalendarEvent({
            bookingId: booking.bookingId,
            customerName: booking.customerName,
            customerEmail: booking.customerEmail,
            serviceName: booking.serviceName,
            dateOfBirth: booking.dateOfBirth,
            birthTime: booking.birthTime,
            birthPlace: booking.birthPlace ?? '',
            sessionDate: date,
            sessionDuration: duration,
            sessionTimezone: tz,
          });
          eventId = r.eventId;
          eventLink = r.eventLink;
        }

        await db
          .update(bookingsTable)
          .set({
            googleCalendarEventId: eventId,
            googleCalendarEventLink: eventLink,
            bookingStatus: 'confirmed',
            calendarLastError: null,
            updatedAt: new Date(),
          })
          .where(eq(bookingsTable.bookingId, req.params.bookingId));
      } catch (calErr: any) {
        req.log.warn({ err: calErr }, 'Calendar update failed during session set');
      }
    }

    const [updated] = await db.select().from(bookingsTable).where(eq(bookingsTable.bookingId, req.params.bookingId));
    res.json(updated);
  } catch (err: any) {
    req.log.error({ err }, 'Admin update session error');
    res.status(500).json({ error: 'Could not update session' });
  }
});

// POST /api/admin/bookings/:bookingId/retry-calendar
router.post('/admin/bookings/:bookingId/retry-calendar', async (req, res) => {
  try {
    const [booking] = await db.select().from(bookingsTable).where(eq(bookingsTable.bookingId, req.params.bookingId));
    if (!booking) { res.status(404).json({ error: 'Not found' }); return; }
    if (!booking.dateOfBirth) { res.status(400).json({ error: 'Birth details not yet submitted' }); return; }

    const sessionDate: Date = (() => {
      if (booking.sessionDate) return new Date(booking.sessionDate);
      const d = new Date();
      d.setDate(d.getDate() + 7);
      d.setUTCHours(4, 30, 0, 0);
      return d;
    })();

    const result = await createCalendarEvent({
      bookingId: booking.bookingId,
      customerName: booking.customerName,
      customerEmail: booking.customerEmail,
      serviceName: booking.serviceName,
      dateOfBirth: booking.dateOfBirth,
      birthTime: booking.birthTime ?? '',
      birthPlace: booking.birthPlace ?? '',
      sessionDate,
      sessionDuration: booking.sessionDuration ?? 60,
      sessionTimezone: booking.sessionTimezone ?? 'Asia/Kolkata',
    });

    await db
      .update(bookingsTable)
      .set({
        googleCalendarEventId: result.eventId,
        googleCalendarEventLink: result.eventLink,
        bookingStatus: 'confirmed',
        calendarRetryCount: (booking.calendarRetryCount ?? 0) + 1,
        calendarLastError: null,
        updatedAt: new Date(),
      })
      .where(eq(bookingsTable.bookingId, req.params.bookingId));

    res.json({ success: true, eventLink: result.eventLink });
  } catch (err: any) {
    req.log.error({ err }, 'Calendar retry error');
    res.status(500).json({ error: err.message });
  }
});

// POST /api/admin/bookings/:bookingId/resend-email
router.post('/admin/bookings/:bookingId/resend-email', async (req, res) => {
  try {
    const [booking] = await db.select().from(bookingsTable).where(eq(bookingsTable.bookingId, req.params.bookingId));
    if (!booking) { res.status(404).json({ error: 'Not found' }); return; }

    await sendBookingConfirmedEmail({
      clientName: booking.customerName,
      clientEmail: booking.customerEmail,
      serviceName: booking.serviceName,
      bookingId: booking.bookingId,
      dateOfBirth: booking.dateOfBirth ?? 'Not provided',
      birthTime: booking.birthTime ?? 'Not provided',
      birthPlace: booking.birthPlace ?? 'Not provided',
      calendarLink: booking.googleCalendarEventLink,
      amount: booking.paymentAmount,
      currency: booking.paymentCurrency,
    });

    res.json({ success: true });
  } catch (err: any) {
    req.log.error({ err }, 'Resend email error');
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/admin/bookings/:bookingId — soft cancel
router.delete('/admin/bookings/:bookingId', async (req, res) => {
  try {
    await db
      .update(bookingsTable)
      .set({ bookingStatus: 'cancelled', updatedAt: new Date() })
      .where(eq(bookingsTable.bookingId, req.params.bookingId));
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: 'Could not cancel booking' });
  }
});

export default router;
