-- Tavnit Lite: one ownership table for everything a visitor starts.
--   kind = 'run'   an extraction run (the default; every existing row)
--   kind = 'split' a Splitter job (run_id holds the split id)
--   kind = 'match' a Matcher job  (run_id holds the match id)
-- Quotas count documents (run + split); matches are derived from runs the
-- visitor already paid for with their quota.
alter table public.lite_runs add column if not exists kind text not null default 'run';
create index if not exists lite_runs_kind_created_idx on public.lite_runs (kind, created_at);
