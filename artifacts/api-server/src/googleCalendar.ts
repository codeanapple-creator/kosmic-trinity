import { google } from 'googleapis';

export interface CalendarEventParams {
  bookingId: string;
  customerName: string;
  customerEmail: string;
  serviceName: string;
  dateOfBirth: string;
  birthTime: string;
  birthPlace: string;
  sessionDate: Date;
  sessionDuration: number; // minutes
  sessionTimezone: string;
}

export interface CalendarEventResult {
  eventId: string;
  eventLink: string;
}

function getCalendarClient() {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const calendarId = process.env.GOOGLE_CALENDAR_ID ?? 'primary';

  if (!clientEmail || !privateKey) {
    throw new Error(
      'Google Calendar credentials not configured. Set GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY, and optionally GOOGLE_CALENDAR_ID.'
    );
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/calendar'],
  });

  return { calendar: google.calendar({ version: 'v3', auth }), calendarId };
}

export async function createCalendarEvent(
  params: CalendarEventParams
): Promise<CalendarEventResult> {
  const { calendar, calendarId } = getCalendarClient();

  const endDate = new Date(
    params.sessionDate.getTime() + params.sessionDuration * 60 * 1000
  );

  const description = [
    'KosmicTrinity Session',
    '',
    `Booking ID: ${params.bookingId}`,
    `Service: ${params.serviceName}`,
    `Customer: ${params.customerName}`,
    `Email: ${params.customerEmail}`,
    '',
    `Date of Birth: ${params.dateOfBirth}`,
    `Birth Time: ${params.birthTime}`,
    `Birth Place: ${params.birthPlace}`,
    '',
    'Payment Status: Confirmed',
  ].join('\n');

  const event = await calendar.events.insert({
    calendarId,
    sendUpdates: 'all',
    requestBody: {
      summary: `KosmicTrinity Session – ${params.customerName}`,
      description,
      start: {
        dateTime: params.sessionDate.toISOString(),
        timeZone: params.sessionTimezone,
      },
      end: {
        dateTime: endDate.toISOString(),
        timeZone: params.sessionTimezone,
      },
      attendees: [{ email: params.customerEmail }],
    },
  });

  const eventId = event.data.id ?? '';
  const eventLink =
    event.data.htmlLink ??
    `https://calendar.google.com/calendar/event?eid=${eventId}`;

  return { eventId, eventLink };
}

export async function updateCalendarEvent(
  eventId: string,
  params: { sessionDate: Date; sessionDuration: number; sessionTimezone: string }
): Promise<CalendarEventResult> {
  const { calendar, calendarId } = getCalendarClient();

  const endDate = new Date(
    params.sessionDate.getTime() + params.sessionDuration * 60 * 1000
  );

  const event = await calendar.events.patch({
    calendarId,
    eventId,
    sendUpdates: 'all',
    requestBody: {
      start: {
        dateTime: params.sessionDate.toISOString(),
        timeZone: params.sessionTimezone,
      },
      end: {
        dateTime: endDate.toISOString(),
        timeZone: params.sessionTimezone,
      },
    },
  });

  return {
    eventId: event.data.id ?? eventId,
    eventLink: event.data.htmlLink ?? '',
  };
}
