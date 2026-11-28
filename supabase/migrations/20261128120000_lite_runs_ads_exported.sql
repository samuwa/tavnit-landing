-- Marks lite_runs rows already written to a Google Ads offline-conversion
-- CSV (scripts/export-ads-offline-conversions.mjs). The export skips rows
-- with ads_exported_at set so the same click is not uploaded twice.
--
-- Apply manually via the Supabase SQL editor. Without this column the
-- export still runs, but it cannot remember what it already wrote, and
-- --mark refuses to stamp anything.

alter table lite_runs
  add column if not exists ads_exported_at timestamptz;

create index if not exists lite_runs_ads_export_idx
  on lite_runs (downloaded_at)
  where downloaded_at is not null and ads_exported_at is null;
