-- Booking outcome for /schedule requests. The Calendly inline embed posts a
-- calendly.event_scheduled message to the page when the visitor books; the
-- page reports it back so the admin panel can show which requests turned
-- into meetings and for when.
--
--   scheduled_at         — when the visitor completed the booking
--   meeting_at           — the meeting's start time (from the embed event;
--                          server-verified via the Calendly API when
--                          CALENDLY_API_TOKEN is configured)
--   calendly_event_uri   — API URIs of the booked event/invitee, kept so the
--   calendly_invitee_uri   time can be (re)resolved server-side later

alter table meeting_requests
  add column if not exists scheduled_at timestamptz,
  add column if not exists meeting_at timestamptz,
  add column if not exists calendly_event_uri text,
  add column if not exists calendly_invitee_uri text;
