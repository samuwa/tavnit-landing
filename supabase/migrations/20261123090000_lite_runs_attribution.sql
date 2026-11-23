-- Ad-click attribution for free-tool leads (src/lib/attribution.ts).
--
-- Same columns meeting_requests got in 20261109120000: when a visitor who
-- arrived from a Google Ads click signs in to download a free tool's result,
-- the click id and UTM tags kept for the session travel with the download
-- request and are stamped on the run by recordDownload (src/lib/lite/notify.ts).
-- Stored so these leads can be uploaded to Google Ads as offline conversions
-- (Tools → Conversions → Uploads), keyed by gclid and downloaded_at.
--
-- Only downloaded runs (leads) ever carry these; runs of visitors who never
-- sign in stay without them.
--
-- Apply manually via the Supabase SQL editor (same flow as the other
-- migrations in this directory). The code tolerates the columns being absent:
-- the attribution write is its own request and fails on its own.

alter table lite_runs
  add column if not exists gclid text,
  add column if not exists gbraid text,
  add column if not exists wbraid text,
  add column if not exists utm_source text,
  add column if not exists utm_medium text,
  add column if not exists utm_campaign text,
  add column if not exists utm_term text,
  add column if not exists utm_content text,
  add column if not exists landing_page text;

create index if not exists lite_runs_gclid_idx
  on lite_runs (gclid) where gclid is not null;
