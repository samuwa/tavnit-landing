-- Follow-up improvements: per-rep scheduling, reminder tracking, link expiry.
--
-- scheduler_url (both tables): each rep can have their own Calendly/Cal.com
-- link on platform_admins; it is resolved onto the invite at creation, and
-- the questionnaire's final CTA books directly with the lead's owner. The
-- invite-level value falls back to FOLLOWUP_SCHEDULER_URL, then a mailto.
--
-- reminded_at: stamped by tavnit-admin's daily cron when it emails the rep
-- about an unopened or abandoned link, so a reminder fires at most once.
--
-- expires_at: links stop working 30 days after creation (checked server-side
-- by the landing page); the admin panel can regenerate an expired link with a
-- fresh token. Backfill keeps the rule consistent for pre-existing rows.
--
-- Applied to production via the Supabase Management API on 2026-08-15.

alter table public.followup_invites
  add column if not exists scheduler_url text,
  add column if not exists reminded_at timestamptz,
  add column if not exists expires_at timestamptz default (now() + interval '30 days');

update public.followup_invites
  set expires_at = created_at + interval '30 days'
  where expires_at is null;

alter table public.platform_admins
  add column if not exists scheduler_url text;
