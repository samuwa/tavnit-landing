-- The landing now serves twelve languages (src/lib/locales.ts): a visitor's
-- intent on the free tools records the PAGE language, any of the twelve
-- codes, so the product can greet them in it. The inline check of
-- 20260925180000_lite_intents.sql allowed only 'es' / 'en'.
--
-- Not widened, on purpose:
--  * lite_runs.locale (no check): it stores the ENGINE language — 'es' or
--    'en', the Flow / Matcher / sample the run used (engineLocale()) — and
--    the API routes read it back to pick column names.
--  * followup_invites.lang: the follow-up questionnaire stays es / en.

alter table public.lite_intents drop constraint if exists lite_intents_locale_check;
alter table public.lite_intents
  add constraint lite_intents_locale_check
  check (locale in ('en', 'es', 'pt-BR', 'fr', 'de', 'it', 'nl', 'pl', 'tr', 'zh-Hans', 'ja', 'ko'));
