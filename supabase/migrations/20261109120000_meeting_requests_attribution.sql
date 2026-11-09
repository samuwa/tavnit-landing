-- Ad-click attribution for /schedule requests (src/lib/attribution.ts).
--
-- When a visitor arrives from a Google Ads click, the click id and UTM tags
-- are kept for the session and sent with the demo form. Stored here so that
-- meetings that actually happened can be uploaded to Google Ads as offline
-- conversions (Tools → Conversions → Uploads), keyed by gclid.
--
--   gclid / gbraid / wbraid — Google Ads click ids (gbraid/wbraid on iOS)
--   utm_*                    — campaign tags from the ad's final URL
--   landing_page             — path the visitor first landed on

alter table meeting_requests
  add column if not exists gclid text,
  add column if not exists gbraid text,
  add column if not exists wbraid text,
  add column if not exists utm_source text,
  add column if not exists utm_medium text,
  add column if not exists utm_campaign text,
  add column if not exists utm_term text,
  add column if not exists utm_content text,
  add column if not exists landing_page text;

create index if not exists meeting_requests_gclid_idx
  on meeting_requests (gclid) where gclid is not null;
