-- Tavnit Lite → Tavnit: what a visitor tried, so the product can start them
-- where they left off (templates, questionnaire, guide).
--
-- Security model:
--  * Only the landing's server writes, with the service role. No insert,
--    update or delete policy exists for anyone else.
--  * A signed-in user can read only their own intents (user_id = auth.uid()).
--  * Guests are linked to their user through a one-time handoff token the
--    landing puts on the "Try it in Tavnit" link. The app redeems it with
--    claim_lite_handoff(), a SECURITY DEFINER function that only ever links
--    rows to the caller, only for an unclaimed token under 7 days old.

create table if not exists public.lite_intents (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  user_id uuid references auth.users(id) on delete set null,
  tool text not null,
  kind text not null check (kind in ('used', 'cta', 'download')),
  feature text check (feature is null or feature ~ '^[a-z][a-z:-]{0,39}$'),
  locale text not null default 'es' check (locale in ('es', 'en')),
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index if not exists lite_intents_session_idx on public.lite_intents (session_id);
create index if not exists lite_intents_user_idx on public.lite_intents (user_id, created_at desc);
alter table public.lite_intents enable row level security;

drop policy if exists lite_intents_read_own on public.lite_intents;
create policy lite_intents_read_own on public.lite_intents
  for select to authenticated
  using (user_id = auth.uid());

create table if not exists public.lite_handoffs (
  token text primary key check (token ~ '^[0-9a-f]{48}$'),
  session_id text not null,
  created_at timestamptz not null default now(),
  claimed_by uuid references auth.users(id) on delete set null,
  claimed_at timestamptz
);
alter table public.lite_handoffs enable row level security;
-- no policies: only the service role and claim_lite_handoff() touch it

create or replace function public.claim_lite_handoff(p_token text)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_session text;
  v_linked integer := 0;
begin
  if v_uid is null or p_token is null or p_token !~ '^[0-9a-f]{48}$' then
    return 0;
  end if;
  select session_id into v_session
    from public.lite_handoffs
   where token = p_token
     and claimed_by is null
     and created_at > now() - interval '7 days'
   for update;
  if v_session is null then
    return 0;
  end if;
  update public.lite_handoffs set claimed_by = v_uid, claimed_at = now() where token = p_token;
  update public.lite_intents set user_id = v_uid where session_id = v_session and user_id is null;
  get diagnostics v_linked = row_count;
  return v_linked;
end;
$$;

revoke all on function public.claim_lite_handoff(text) from public;
revoke all on function public.claim_lite_handoff(text) from anon;
grant execute on function public.claim_lite_handoff(text) to authenticated;
