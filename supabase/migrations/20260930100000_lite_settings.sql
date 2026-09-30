-- Tavnit Lite limits, editable from the admin panel (Free tools page) so the
-- team can raise them while testing without a redeploy. One row. A null
-- column means "no override": the landing falls back to its env var
-- (LITE_RUNS_PER_DAY / LITE_DAILY_CAP) and then to the code default.
-- Service role only (RLS on, no policies), like the other lite_* tables.
create table if not exists public.lite_settings (
  id boolean primary key default true check (id),
  runs_per_day integer check (runs_per_day is null or runs_per_day between 1 and 10000),
  daily_cap integer check (daily_cap is null or daily_cap between 1 and 1000000),
  updated_at timestamptz not null default now(),
  updated_by uuid
);

alter table public.lite_settings enable row level security;

insert into public.lite_settings (id) values (true) on conflict (id) do nothing;
