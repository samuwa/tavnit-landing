-- Tavnit Lite: one row per free-tool run started from the public site
-- (/tools/* and /es/herramientas/*). Written by the landing with the service
-- role; the browser never touches this table. Owned by tavnit-landing-next.
--
-- What it is for:
--   * quota — runs per anonymous session and per hashed IP per day, plus a
--     global daily cap that protects the Lite org's credit balance;
--   * ownership — a run's rows can only be polled or downloaded by the
--     session that created it;
--   * leads — the download step requires a Tavnit account, so user_id and
--     user_email are the lead record for sales.
--
-- IPs are never stored raw: ip_hash is an HMAC with LITE_IP_SALT.
-- No document content is stored here (the file lives in the Lite org's runs).
--
-- Apply manually via the Supabase SQL editor (same flow as the other
-- migrations in this directory).

create table if not exists lite_runs (
  id            uuid        primary key default gen_random_uuid(),
  run_id        text        not null unique,
  tool          text        not null,
  locale        text        not null default 'es',
  session_id    text        not null,
  ip_hash       text        not null,
  filename      text,
  byte_size     integer,
  pages         integer,
  is_sample     boolean     not null default false,
  status        text        not null default 'queued',
  row_count     integer,
  user_id       uuid        references auth.users (id) on delete set null,
  user_email    text,
  downloaded_at timestamptz,
  created_at    timestamptz not null default now(),
  finished_at   timestamptz
);

create index if not exists lite_runs_ip_day_idx      on lite_runs (ip_hash, created_at desc);
create index if not exists lite_runs_session_day_idx on lite_runs (session_id, created_at desc);
create index if not exists lite_runs_created_idx     on lite_runs (created_at desc);
create index if not exists lite_runs_user_idx        on lite_runs (user_id) where user_id is not null;

-- Service-role only: RLS on, no policies.
alter table lite_runs enable row level security;
