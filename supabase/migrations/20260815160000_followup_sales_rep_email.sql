-- The sales rep on a follow-up invite is now picked from the admin panel's
-- users (platform_admins) instead of free text, and the email the prospect
-- sees on the questionnaire (upload fallback, mailto CTA) is that rep's —
-- arie@ or samuel@ — rather than a single hardcoded address.
--
-- sales_rep keeps the display name; sales_rep_email carries the address.
-- Null on old rows and repless invites → the landing site falls back to
-- SALES_EMAIL in src/lib/site.ts.
--
-- Applied to production via the Supabase Management API on 2026-08-15.

alter table public.followup_invites
  add column if not exists sales_rep_email text;
