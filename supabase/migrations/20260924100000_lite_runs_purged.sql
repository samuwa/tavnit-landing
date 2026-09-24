-- Tavnit Lite retention: free-tool documents and results are deleted 24 h
-- after the run (see src/lib/lite/purge.ts and the lite-cleanup cron).
-- lite_runs keeps only the fact that a run happened; purged_at marks that
-- the run row and its storage objects are gone, and filename is cleared.
--
-- Apply manually via the Supabase SQL editor (same flow as the other
-- migrations in this directory).

alter table lite_runs add column if not exists purged_at timestamptz;

create index if not exists lite_runs_purge_idx
  on lite_runs (created_at) where purged_at is null;
