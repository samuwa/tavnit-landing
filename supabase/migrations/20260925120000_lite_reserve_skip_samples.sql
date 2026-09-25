-- Tavnit Lite: downloads of a recorded sample are not documents.
--
-- The sample buttons now play back a recording instead of running the
-- engine (src/lib/lite/samples). Downloading that result still leaves a
-- lite_runs row, so the visitor shows up as a lead — but the row has
-- kind = 'run' and was counted by lite_reserve like a processed document:
-- five sample downloads used up a visitor's daily quota, and a signed-in
-- script could fill the global cap for everyone without spending a credit.
-- Those rows have run_id 'sample-<hex>' and are now left out of every count.

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
  if p_kind not in ('run', 'split', 'match') then
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
