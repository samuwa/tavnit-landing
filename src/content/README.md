# Page content per language

The site serves twelve languages (registry: `src/lib/locales.ts`). English
lives at the root, Spanish under `/es` with Spanish slugs, and the ten other
languages under `/<segment>/<English path>` (`/de/tools/invoice-to-excel`),
rendered by `src/app/[lang]`. Which English page exists in which language is
registered in `src/lib/routes.ts` (`NEW_LOCALE_PATHS`), which also emits every
hreflang block (`alternatesFor`) and every localized link (`localizedPath`).

This folder holds the **page content** of those languages: plain, typed data
files rendered by shared components. One file per language per area.

| code | URL segment | hreflang | language |
| --- | --- | --- | --- |
| `en` | (root) | `en` | English |
| `es` | `es` | `es` | Español |
| `pt-BR` | `pt-br` | `pt-BR` | Português (Brasil) |
| `fr` | `fr` | `fr` | Français |
| `de` | `de` | `de` | Deutsch |
| `it` | `it` | `it` | Italiano |
| `nl` | `nl` | `nl` | Nederlands |
| `pl` | `pl` | `pl` | Polski |
| `tr` | `tr` | `tr` | Türkçe |
| `zh-Hans` | `zh-hans` | `zh-Hans` | 简体中文 |
| `ja` | `ja` | `ja` | 日本語 |
| `ko` | `ko` | `ko` | 한국어 |

## Status: 60 stubs awaiting translation

Every new-language file below is a STUB that serves the English source. Each
starts with `// TODO(i18n): translate from en` (`grep -rl "TODO(i18n)" src`
lists what is left). Translate them before the new languages go live: until
then `/de/...` serves English text while declaring itself German in
hreflang, `lang` and the sitemap.

| area | stub files (10 each) | translate from | rendered by |
| --- | --- | --- | --- |
| Home | `home/{pt-BR,fr,de,it,nl,pl,tr,zh-Hans,ja,ko}.ts` | `home/en.ts` (~85 lines) | `components/LocalizedHome.tsx` |
| Use cases | `use-cases/{…}.ts` | `use-cases/en.ts` (hub, ~35 lines) + `src/lib/use-cases.ts` (17 pages, ~840 lines of data) | `components/UseCasesHub.tsx`, `components/UseCaseArticle.tsx` |
| Guides | `guides/{…}.ts` | `guides/en.ts` (hub, ~28 lines) + `src/lib/guides.ts` (3 guides, ~230 lines) | `components/GuidesHub.tsx`, `components/GuideArticle.tsx` |
| Integrations | `integrations/{…}.ts` | `integrations/en.ts` (~160 lines) + the cards of `src/lib/integrations.ts` (6 entries) | `components/IntegrationsHub.tsx`, `components/McpIntegration.tsx` |
| Enterprise | `enterprise/{…}.ts` | `enterprise/en.ts` (~63 lines) | `components/EnterpriseServices.tsx` |
| Free tools | `tools/{…}.ts` | `tools/en.ts` (~1,770 lines) | `src/lib/lite/copy.ts` → `components/lite/*` |

That is 6 areas × 10 languages = 60 files:
`src/content/{home,use-cases,guides,integrations,enterprise,tools}/{pt-BR,fr,de,it,nl,pl,tr,zh-Hans,ja,ko}.ts`.

English and Spanish are not stubs: `en.ts` files are what `/` renders (home
excepted: `home/en.ts` is a translation source only, `/` keeps its animated
home), `es.ts` files are what `/es` renders. Spanish use cases, guides and
integrations keep their own pages and data (`src/lib/*.es.ts`), so those
three areas have no `es.ts` here.

## How to translate a stub

1. Replace `const de: HomeCopy = en;` with a full object literal of the same
   type, written in the language (copy the English source and translate it
   in place). Keep the `import type`, remove `import en` and the TODO line.
2. Keep every key. TypeScript (`npx tsc --noEmit`) fails on a missing or
   misspelled one.
3. Use cases and guides: copy the `items` array from `src/lib/use-cases.ts` /
   `src/lib/guides.ts` (import their types: `UseCase`, `Guide`). You may
   drop an item, never rename its slug: the [lang] routes, sitemap and
   hreflang follow the items of each language's file automatically.
4. Integrations: copy the six entries of `src/lib/integrations.ts` into
   `items`, translating `label` and `summary` only.

### What stays English (never translate)

- Every URL: `slug`, `href`, `path`, `links[].href`, `pipeline[].href`. Links
  are written as English site paths; components localize them with
  `localizedPath()` (`/pricing` and untranslated docs stay English).
- Dates and numbers that are data: `published`, `updated`, `readingMinutes`.
- `own` on integration cards; `ids` in `home/*.ts` — keep
  `how-it-works`, `use-cases`, `integrations`, `faq` (the header and footer
  link `/<lang>#how-it-works`).
- Product nouns, as in the app: Tavnit, Flow, Cleaner, Bucket, Collection,
  Splitter, Matcher, Inspector, Filler, Agent, Pipeline, MCP; brand and
  product names (Zapier, Make, n8n, Power Automate, claude.ai, Cursor,
  Excel).
- Placeholders: `{count}`, `{m}`, `{mcpUrl}` and, in the free tools, every
  `{token}`: `{doc}`, `{Doc}`, `{a_doc}`, `{your_docs}`… (filled from each
  tool's `vocab`), `{limit}`, `{file}`, `{rows}`, `{pages}`, `{shown}`,
  `{total}`, `{s}`, `{n}`, `{fields}`, `{col}`. Move them where the grammar
  needs them; do not rename them.
- Rich-text markup (fields typed `Rich` in `types.ts`): `[label](/path)`,
  `**bold**`, `` `code` `` — translate the words inside, keep the markup.

### Free tools notes

- `tools/<code>.ts` translates the PAGE only. The tool itself runs the
  English ENGINE (`engineLocale()` in `src/lib/locales.ts`): the Flow, the
  sample document and the column names stay English for every language but
  Spanish. Do not translate column names (`columnOrder`, `lineFields` live in
  `src/lib/lite/defs`, not here).
- `base` is one complete tool written with `{doc}` tokens; each tool's
  `vocab` supplies the document words (`doc`, `a_doc`, `the_docs`…). Where
  the language's grammar (cases, gender, articles) does not fit a token,
  write the string out in that tool's `overrides` instead of forcing it.
- `og` is the subtitle of each tool's social card. Chinese, Japanese and
  Korean cards fall back to the generic site card (no CJK font in `next/og`),
  so their `og` strings are not rendered yet; translate them anyway.

## Chrome strings (already translated)

Short interface strings stay as `Record<Locale, …>` next to their component
and are filled for all twelve languages (machine-quality: have a native
speaker review them):
`Header.tsx` (nav, CTAs), `Footer.tsx` (columns, tagline), `SiteSettings.tsx`
(theme/language panel), `LanguageSuggestion.tsx` (detection bar),
`CookieSettingsLink.tsx`, `Analytics.tsx` (cookie banner),
`UseCaseArticle.tsx`, `GuideArticle.tsx`, `SchedulePage.tsx` (book-a-demo
page), `ScheduleMeeting.tsx` (its form), `lite/LiteHeader.tsx` (language
menu label), `lite/LiteCompare.tsx` ("optional").

## How to verify

```bash
npx tsc --noEmit   # every key present, every type right
npm run lint
npm run build      # generates /<segment>/… for every page of every language
npm run start      # then spot-check, e.g.:
curl -s localhost:3000/de | grep -o '<div lang="[^"]*"'
curl -s localhost:3000/de/schedule | grep -o 'hrefLang="[^"]*"'   # same set as /schedule
grep -rl "TODO(i18n)" src                                           # stubs left
```

Read the page in the browser at phone width too: German and Polish strings
run long, and the header nav and buttons have little room.

## Adding pages to the new languages

1. Create the route under `src/app/[lang]/…` (render the shared component
   with the page's language from `pageLocale(params)`).
2. Register its English path in `NEW_LOCALE_PATHS` (`src/lib/routes.ts`) —
   static paths in `NEW_LOCALE_STATIC_PATHS`, dynamic ones from the data the
   route's `generateStaticParams` reads. That is what gives it hreflang on
   every twin, sitemap entries and switcher links.
3. Docs: six docs pages are localized through their own registry
   (`src/content/docs`, routes under `src/app/[lang]/docs`), which
   `routes.ts` already reads. To translate them into a language, follow
   `src/content/docs/README.md` (German is done).
