-- Meeting requests from the public /schedule page (form filled before the
-- Calendly embed is shown). Written by the landing site with the service
-- role; read from SQL / future admin panel views. No client access.
--
-- Apply manually via the Supabase SQL editor (same flow as the other
-- migrations in this directory).

create table if not exists meeting_requests (
  id         uuid        primary key default gen_random_uuid(),
  name       text        not null,
  email      text        not null,
  company    text,
  topic      text,
  source     text        not null default 'landing',
  created_at timestamptz not null default now()
);

create index if not exists meeting_requests_created_idx
  on meeting_requests (created_at desc);

-- Service-role only: RLS on, no policies.
alter table meeting_requests enable row level security;
