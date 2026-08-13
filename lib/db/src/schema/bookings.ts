import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";

export const bookingsTable = pgTable("bookings", {
  id: serial("id").primaryKey(),
  bookingId: text("booking_id").notNull().unique(),           // KT-XXXXXXXX
  orderId: text("order_id").notNull().unique(),               // CCAvenue order_id
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  phone: text("phone"),
  serviceName: text("service_name").notNull(),
  paymentStatus: text("payment_status").notNull().default("SUCCESS"),
  paymentAmount: integer("payment_amount").notNull(),         // in paise
  paymentCurrency: text("payment_currency").notNull().default("INR"),
  paymentTransactionId: text("payment_transaction_id"),
  paymentDate: timestamp("payment_date", { withTimezone: true }),
  // Birth details (filled after payment)
  dateOfBirth: text("date_of_birth"),
  birthTime: text("birth_time"),
  birthPlace: text("birth_place"),
  birthCity: text("birth_city"),
  birthState: text("birth_state"),
  birthCountry: text("birth_country"),
  latitude: text("latitude"),
  longitude: text("longitude"),
  // Session scheduling
  sessionDate: timestamp("session_date", { withTimezone: true }),
  sessionDuration: integer("session_duration").default(60),   // minutes
  sessionTimezone: text("session_timezone").default("Asia/Kolkata"),
  // Google Calendar
  googleCalendarEventId: text("google_calendar_event_id"),
  googleCalendarEventLink: text("google_calendar_event_link"),
  calendarRetryCount: integer("calendar_retry_count").default(0),
  calendarLastError: text("calendar_last_error"),
  // Status: pending_birth_details | birth_details_submitted | confirmed | cancelled
  bookingStatus: text("booking_status").notNull().default("pending_birth_details"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Booking = typeof bookingsTable.$inferSelect;
export type InsertBooking = typeof bookingsTable.$inferInsert;
