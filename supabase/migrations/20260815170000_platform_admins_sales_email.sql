-- Client-facing sales address for panel users.
--
-- Arie and Samuel signed up with their personal emails, but a prospect on
-- the follow-up questionnaire must see their @tavnit.io addresses. This
-- column carries that public address; when creating a follow-up link the
-- admin panel resolves the rep's email as
-- platform_admins.sales_email ?? profiles.email.
--
-- For a new rep later: set their sales_email here (SQL editor) or extend
-- the /settings/admins UI — until then the fallback shows whatever email
-- they registered with.
--
-- Applied to production via the Supabase Management API on 2026-08-15.

alter table public.platform_admins
  add column if not exists sales_email text;
