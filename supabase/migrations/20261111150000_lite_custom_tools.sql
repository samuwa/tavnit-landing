-- Tavnit Lite: the Custom Tool ("build your own extractor").
--
-- A visitor uploads a sample document, the product's field-suggestion
-- assistant proposes the columns, the visitor prunes / renames them and the
-- landing creates a Flow for them in the Tavnit Lite org. One row here per
-- attempt:
--
--   draft     the suggestion came back and waits for the visitor to confirm
--             (suggestion = the assistant's hint parts, WITHOUT the example
--             values it read from the document; the browser never sends
--             hints back, it only names which fields it keeps)
--   active    the visitor's tool: flow_id is its Flow in the Lite org. At
--             most ONE per session and one per signed-in user.
--   replaced  the visitor rebuilt the tool from a new document
--   expired   an anonymous tool nobody used for 30 days
--
-- The Flow of a replaced / expired row is deleted by the hourly cleanup
-- (src/lib/lite/custom-server.ts) once its runs are gone; flow_deleted_at
-- records it.
--
-- Quota: every row counts as one AI suggestion against a per-visitor and a
-- global daily limit (lite_custom_reserve), separate from the document quota
-- of lite_runs — a suggestion costs a model call but no credits.
--
-- Service-role only, like lite_runs: RLS on, no policies. Owned by
-- tavnit-landing. Applied to the shared project on 2026-11-11.

create table if not exists public.lite_custom_tools (
  id              uuid        primary key default gen_random_uuid(),
  session_id      text        not null,
  ip_hash         text        not null,
  user_id         uuid        references auth.users (id) on delete set null,
  locale          text        not null default 'es',
  status          text        not null default 'draft'
                              check (status in ('draft', 'active', 'replaced', 'expired')),
  name            text,
  document_type   text,
  suggestion      jsonb,
  fields          jsonb,
  flow_id         uuid,
  created_at      timestamptz not null default now(),
  activated_at    timestamptz,
  last_used_at    timestamptz,
  retired_at      timestamptz,
  flow_deleted_at timestamptz
);

-- One tool per visitor: the session cookie owns it, the account too once the
-- visitor signs in.
create unique index if not exists lite_custom_tools_one_per_session
  on public.lite_custom_tools (session_id) where status = 'active';
create unique index if not exists lite_custom_tools_one_per_user
  on public.lite_custom_tools (user_id) where status = 'active' and user_id is not null;
create index if not exists lite_custom_tools_session_day_idx on public.lite_custom_tools (session_id, created_at desc);
create index if not exists lite_custom_tools_ip_day_idx      on public.lite_custom_tools (ip_hash, created_at desc);
create index if not exists lite_custom_tools_created_idx     on public.lite_custom_tools (created_at desc);
create index if not exists lite_custom_tools_retired_idx
  on public.lite_custom_tools (retired_at) where flow_id is not null and flow_deleted_at is null;

alter table public.lite_custom_tools enable row level security;

-- Claims one suggestion before the assistant is called. Count and insert in
-- one transaction (advisory lock), like lite_reserve, so parallel requests
-- cannot all pass the same count. Returns the new draft's id, 'quota' or
-- 'daily_cap'. The landing deletes the draft when the assistant fails, which
-- gives the unit back.
create or replace function public.lite_custom_reserve(
  p_session text,
  p_ip_hash text,
  p_locale  text,
  p_limit   integer,
  p_cap     integer
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
  perform pg_advisory_xact_lock(hashtext('lite_custom_reserve'));

  select count(*) into n_global from lite_custom_tools where created_at >= day_start;
  if n_global >= p_cap then
    return 'daily_cap';
  end if;
  select count(*) into n_session from lite_custom_tools
    where created_at >= day_start and session_id = p_session;
  select count(*) into n_ip from lite_custom_tools
    where created_at >= day_start and ip_hash = p_ip_hash;
  if n_session >= p_limit or n_ip >= p_limit then
    return 'quota';
  end if;

  insert into lite_custom_tools (id, session_id, ip_hash, locale, status)
  values (new_id, p_session, p_ip_hash, case when p_locale = 'en' then 'en' else 'es' end, 'draft');

  return new_id::text;
end;
$$;

-- Turns a draft into the visitor's tool and retires the one it replaces, in
-- one transaction, so the "one active tool" indexes never see two. Returns
-- {ok, retired: [flow ids of the tools it replaced]}; ok = false when the
-- draft is not this session's or was already used.
create or replace function public.lite_custom_activate(
  p_id      uuid,
  p_session text,
  p_user    uuid,
  p_flow_id uuid,
  p_name    text,
  p_fields  jsonb
) returns jsonb
language plpgsql
set search_path = public
as $$
declare
  found uuid;
  retired jsonb;
begin
  perform pg_advisory_xact_lock(hashtext('lite_custom_activate'));

  select id into found from lite_custom_tools
    where id = p_id and session_id = p_session and status = 'draft'
    for update;
  if found is null then
    return jsonb_build_object('ok', false);
  end if;

  with gone as (
    update lite_custom_tools
       set status = 'replaced', retired_at = now()
     where status = 'active'
       and (session_id = p_session or (p_user is not null and user_id = p_user))
    returning flow_id
  )
  select coalesce(jsonb_agg(flow_id) filter (where flow_id is not null), '[]'::jsonb) into retired from gone;

  update lite_custom_tools
     set status = 'active',
         flow_id = p_flow_id,
         name = p_name,
         fields = p_fields,
         suggestion = null,
         user_id = coalesce(p_user, user_id),
         activated_at = now(),
         last_used_at = now()
   where id = p_id;

  return jsonb_build_object('ok', true, 'retired', retired);
end;
$$;

revoke all on function public.lite_custom_reserve(text, text, text, integer, integer) from public, anon, authenticated;
revoke all on function public.lite_custom_activate(uuid, text, uuid, uuid, text, jsonb) from public, anon, authenticated;
grant execute on function public.lite_custom_reserve(text, text, text, integer, integer) to service_role;
grant execute on function public.lite_custom_activate(uuid, text, uuid, uuid, text, jsonb) to service_role;
