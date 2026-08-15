-- Sales post-meeting follow-up questionnaire.
--
-- After a first demo call, sales sends the prospect a personalized link
-- (tavnit.io/s/<token>) that walks them through a short branching
-- questionnaire; answers stream into this table as they are given, so even an
-- abandoned form leaves the sentiment behind. The sales team creates links and
-- reads responses from tavnit-admin (/followups); the landing site serves the
-- questionnaire and writes answers.
--
-- Access model: both surfaces use the service role exclusively (tavnit-admin's
-- getServiceSupabase, the landing site's server-only store). RLS is enabled
-- with no policies, so the anon key — which the browser holds — can see
-- nothing. The unguessable token in the URL is the prospect's only credential,
-- and it is only ever checked server-side.
--
-- NOT applied to production yet — apply via the Supabase MCP or SQL editor.

create table if not exists public.followup_invites (
  id uuid primary key default gen_random_uuid(),
  token text not null unique,
  client_name text not null,
  company text,
  contact_email text,
  sales_rep text,
  notes text,
  -- Starting language for the questionnaire ('es' default — clients are in
  -- Panama today; the client can still toggle ES/EN on the page).
  lang text not null default 'es' check (lang in ('es', 'en')),
  created_at timestamptz not null default now(),

  -- Filled in as the client moves through the questionnaire.
  opened_at timestamptz,
  started_at timestamptz,
  completed_at timestamptz,
  sentiment text,                       -- loved | unsure | not_needed
  answers jsonb not null default '{}',  -- keyed by step id; see the landing repo's src/lib/followup/flow.ts
  files jsonb not null default '[]'     -- [{ name, path, size }] in the followup-uploads bucket
);

create index if not exists followup_invites_created_idx
  on public.followup_invites (created_at desc);

alter table public.followup_invites enable row level security;

-- Private bucket for the documents prospects upload (10 MB cap, also
-- enforced app-side). No storage policies: service role only.
insert into storage.buckets (id, name, public, file_size_limit)
values ('followup-uploads', 'followup-uploads', false, 10485760)
on conflict (id) do nothing;
