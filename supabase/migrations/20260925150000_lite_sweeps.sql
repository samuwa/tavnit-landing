-- Tavnit Lite: spreadsheet tools (number and date formatting through a
-- Cleaner). kind = 'sweep': one spreadsheet cleaned by a Cleaner of the Lite
-- org, counted against the daily quota like a document.
--
-- meta holds what the landing needs to rebuild the visitor's file around
-- the Cleaner's output: the original header and rows and which columns were
-- sent. It is the visitor's data, so the 24-hour purge clears it along with
-- the sweep row (src/lib/lite/purge.ts).

alter table public.lite_runs add column if not exists meta jsonb;

create or replace function public.lite_reserve(
  p_session text,
  p_ip_hash text,
  p_tool text,
  p_locale text,
  p_kind text,
  p_limit integer,
  p_cap integer,
  p_filename text,
  p_byte_size integer,
  p_pages integer,
  p_is_sample boolean
) returns text
language plpgsql
set search_path = public
as $$
declare
  day_start timestamptz := date_trunc('day', now() at time zone 'utc') at time zone 'utc';
  n_session integer;
  n_ip integer;
  n_global integer;
  new_id uuid := gen_random_uuid();
begin
  if p_kind not in ('run', 'split', 'match', 'sweep') then
    raise exception 'invalid kind %', p_kind;
  end if;

  perform pg_advisory_xact_lock(hashtext('lite_reserve'));

  if p_kind = 'match' then
    select count(*) into n_session from lite_runs
      where created_at >= day_start and kind = 'match' and session_id = p_session;
    select count(*) into n_ip from lite_runs
      where created_at >= day_start and kind = 'match' and ip_hash = p_ip_hash;
    if n_session >= p_limit or n_ip >= p_limit then
      return 'quota';
    end if;
  else
    select count(*) into n_global from lite_runs
      where created_at >= day_start and kind <> 'match' and run_id not like 'sample-%';
    if n_global >= p_cap then
      return 'daily_cap';
    end if;
    select count(*) into n_session from lite_runs
      where created_at >= day_start and kind <> 'match' and run_id not like 'sample-%' and session_id = p_session;
    select count(*) into n_ip from lite_runs
      where created_at >= day_start and kind <> 'match' and run_id not like 'sample-%' and ip_hash = p_ip_hash;
    if n_session >= p_limit or n_ip >= p_limit then
      return 'quota';
    end if;
  end if;

  insert into lite_runs (id, run_id, tool, locale, session_id, ip_hash, filename, byte_size, pages, is_sample, kind, status)
  values (new_id, 'pending:' || new_id::text, p_tool, p_locale, p_session, p_ip_hash, p_filename, p_byte_size, p_pages, p_is_sample, p_kind, 'reserved');

  return new_id::text;
end;
$$;
