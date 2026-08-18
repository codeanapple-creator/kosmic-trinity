-- Safe migration: adds all columns introduced after initial bookings table creation.
-- Uses ADD COLUMN IF NOT EXISTS so it is safe to run multiple times.
-- Run on your VPS: psql -U <user> -d <dbname> -f add_missing_booking_columns.sql

BEGIN;

-- Birth details
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS date_of_birth      TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS birth_time         TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS birth_place        TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS birth_city         TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS birth_state        TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS birth_country      TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS latitude           TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS longitude          TEXT;

-- Session scheduling
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS session_date       TIMESTAMPTZ;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS session_duration   INTEGER DEFAULT 60;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS session_timezone   TEXT    DEFAULT 'Asia/Kolkata';

-- Google Calendar
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS google_calendar_event_id   TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS google_calendar_event_link TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS calendar_retry_count        INTEGER DEFAULT 0;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS calendar_last_error         TEXT;

-- Booking lifecycle status
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS booking_status TEXT NOT NULL DEFAULT 'pending_birth_details';

-- Row timestamps
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

-- Backfill updated_at for any existing rows
UPDATE bookings SET updated_at = created_at WHERE updated_at IS NULL;

COMMIT;

-- Verify: list all columns in the table
SELECT column_name, data_type, column_default, is_nullable
FROM information_schema.columns
WHERE table_name = 'bookings'
ORDER BY ordinal_position;
