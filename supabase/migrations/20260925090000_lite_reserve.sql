-- Tavnit Lite: atomic quota reservation.
--
-- The routes used to count today's rows and insert the ownership row only
-- after the backend had accepted the document, seconds later. Fifty
-- requests sent at once all saw the same count and all passed — per
-- session, per IP and the global cap alike — and each spent credits of the
-- Lite org. lite_reserve counts and inserts in one transaction, serialised
-- by an advisory lock, so the check and the claim can no longer be split.
--
-- p_kind = 'run' | 'split' count against the document quota (and the
-- global cap); p_kind = 'match' counts against a separate per-session /
-- per-IP limit of comparisons (a comparison runs the Matcher, which costs
-- credits too, and used to be unlimited).
--
-- Returns the reservation id, or 'quota' / 'daily_cap'. The row is created
-- with run_id = 'pending:<id>'; lite_finalize swaps in the backend's id,
-- lite_release deletes the reservation when the backend call fails.
--
-- Callable by the service role only.

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
      where created_at >= day_start and kind <> 'match';
    if n_global >= p_cap then
      return 'daily_cap';
    end if;
    select count(*) into n_session from lite_runs
      where created_at >= day_start and kind <> 'match' and session_id = p_session;
    select count(*) into n_ip from lite_runs
      where created_at >= day_start and kind <> 'match' and ip_hash = p_ip_hash;
    if n_session >= p_limit or n_ip >= p_limit then
      return 'quota';
    end if;
  end if;

  insert into lite_runs (id, run_id, tool, locale, session_id, ip_hash, filename, byte_size, pages, is_sample, kind, status)
  values (new_id, 'pending:' || new_id::text, p_tool, p_locale, p_session, p_ip_hash, p_filename, p_byte_size, p_pages, p_is_sample, p_kind, 'reserved');

  return new_id::text;
end;
$$;

create or replace function public.lite_finalize(p_id uuid, p_run_id text)
returns void
language sql
set search_path = public
as $$
  update lite_runs set run_id = p_run_id, status = 'queued'
  where id = p_id and run_id = 'pending:' || p_id::text;
$$;

create or replace function public.lite_release(p_id uuid)
returns void
language sql
set search_path = public
as $$
  delete from lite_runs where id = p_id and run_id = 'pending:' || p_id::text;
$$;

revoke all on function public.lite_reserve(text, text, text, text, text, integer, integer, text, integer, integer, boolean) from public, anon, authenticated;
revoke all on function public.lite_finalize(uuid, text) from public, anon, authenticated;
revoke all on function public.lite_release(uuid) from public, anon, authenticated;
grant execute on function public.lite_reserve(text, text, text, text, text, integer, integer, text, integer, integer, boolean) to service_role;
grant execute on function public.lite_finalize(uuid, text) to service_role;
grant execute on function public.lite_release(uuid) to service_role;
