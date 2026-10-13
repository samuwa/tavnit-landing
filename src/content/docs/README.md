# Localized docs (the ten new languages)

English docs live at `/docs` (`src/app/docs`), Spanish at `/es/documentacion`
(`src/app/es/documentacion`, Spanish slugs). The ten other languages get a
**subset** of the docs under `/<segment>/docs/<English slug>`, rendered by
`src/app/[lang]/docs` from the modules in this folder:

| page | URL (German example) | English source | module |
| --- | --- | --- | --- |
| Getting started | `/de/docs` | `src/app/docs/page.tsx` | `<code>/index.tsx` |
| Flows | `/de/docs/flows` | `src/app/docs/flows/page.tsx` | `<code>/flows.tsx` |
| API integration | `/de/docs/api-integration` | `src/components/docs/ApiIntegrationContent.tsx` | `<code>/api-integration.tsx` |
| Email integration | `/de/docs/email-integration` | `src/app/docs/email-integration/page.tsx` | `<code>/email-integration.tsx` |
| MCP connector | `/de/docs/mcp-connector` | `src/app/docs/mcp-connector/page.tsx` | `<code>/mcp-connector.tsx` |
| Human in the Loop | `/de/docs/human-in-the-loop` | `src/app/docs/human-in-the-loop/page.tsx` | `<code>/human-in-the-loop.tsx` |

Every other docs page (Buckets, Cleaners, Webhooks, …) stays English-only:
it has no URL in the new languages, the localized sidebar links to its
English page with an "EN" badge, and hreflang / the language menu never
claim a twin. **Never create a stub**: a page that is not translated must
not exist under `/<segment>/docs` (it 404s; the registry decides).

**Done:** German (`de/`) — all six pages. **To do:** `pt-BR`, `fr`, `it`,
`nl`, `pl`, `tr`, `zh-Hans`, `ja`, `ko`. Until a language is registered,
`/<segment>/docs/...` is a 404 — note that the app
(tavnit-nextjs `src/app/(app)/docs/page.tsx`, `TRANSLATED_SECTIONS`)
already frames `/<segment>/docs/<slug>` for these six sections in every
language, so each untranslated language shows a 404 in the app's docs
panel until it lands here.

## How it fits together

- `types.ts` — `TRANSLATED_DOC_SLUGS` (the six pages), the `DocsNavCopy`
  type (one language's docs strings) and the page-module contract.
- `index.ts` — the registry `DOCS_CONTENT`: per language, its `nav` strings
  and one dynamic import per translated page. `src/lib/routes.ts` reads it
  (`NEW_LOCALE_PATHS`), so registering a page is what gives it hreflang on
  every twin (English, Spanish, other languages), sitemap entries, the
  docs language menu and `localizedPath()`.
- `src/components/docs/i18n.ts` — server-side resolver: localized section
  strings, docs home, and `docsShellData(locale)`, the props of the client
  `DocsShell` (sidebar labels, EN badges, chrome strings, language menu).
- `src/app/[lang]/docs/` — `layout.tsx` (shell, embed script, docs ItemList
  JSON-LD), `page.tsx` (getting started), `[slug]/page.tsx` (the rest),
  `_doc.tsx` (metadata + TechArticle/HowTo JSON-LD + body).
- Links: page modules write **English** docs paths (`/docs/cleaners`,
  `/docs/flows#runs`). `DocLink` and `Related` (components/docs/ui.tsx)
  rewrite them to `/<segment>/docs/...` when that page is translated into
  the language, and keep the English URL otherwise — so a link starts
  pointing at the translation the day it is registered.

## Adding a language (example: French, `fr`)

1. **`src/content/docs/fr/nav.ts`** — copy `de/nav.ts`, rename the const,
   translate every string: `docsName`, `home`, `description`, `chrome`
   (sidebar/menu/CodeBlock/Related strings), `groupLabels`, `labels` (the
   sidebar label of **all 21** docs pages, translated or not — product nouns
   stay English) and `pages` (heading, `<title>` under ~60 characters,
   description under ~160, for the six pages).
2. **Six page modules** `fr/index.tsx`, `fr/flows.tsx`,
   `fr/api-integration.tsx`, `fr/email-integration.tsx`,
   `fr/mcp-connector.tsx`, `fr/human-in-the-loop.tsx`. Copy the German
   module for the structure (imports, `schema` export, a default component
   that returns the `<section>`), and translate **from the English source**
   in the table above (the German text is a translation, not the reference).
   Keep every component, prop, icon, `key`, image `src`, table shape and
   list order exactly as in the English page. Rename the component
   (`FlowsFr`) and update the header comment.
   - `export const schema` (getting started, flows, email, MCP, HITL): the
     HowTo steps must say what the page's numbered list visibly says, and
     `primaryImage.caption` is translated; `url`/`width`/`height` stay.
   - `api-integration.tsx` is a client module (`"use client"`, tab and
     Python/JavaScript state): keep it client, export no `schema`, keep the
     shared imports from `@/components/docs/code-samples`.
   - Do not render `DocsPageSchema`, metadata or the shell: the route does.
3. **Register it** in `index.ts`:

   ```ts
   import frNav from "./fr/nav";
   // …
   fr: {
     nav: frNav,
     pages: {
       "getting-started": () => import("./fr/index"),
       flows: () => import("./fr/flows"),
       "api-integration": () => import("./fr/api-integration"),
       "email-integration": () => import("./fr/email-integration"),
       "mcp-connector": () => import("./fr/mcp-connector"),
       "human-in-the-loop": () => import("./fr/human-in-the-loop"),
     },
   },
   ```

   Nothing else changes: routes, `generateStaticParams`, hreflang, sitemap
   and the sidebar follow the registry. (A language may register fewer
   pages while work is in progress; the missing ones stay English-only.)

## What stays English

- Product nouns, as in the app: Tavnit, Flow, Cleaner, Bucket, Collection,
  Splitter, Matcher, Inspector, Filler, Agent, Pipeline, Subject, Signals,
  Nets, Wave, Catch, MCP, Run(s), HITL, API, webhook; third-party names
  (claude.ai, Cursor, Make, Zapier, n8n, Power Automate, Google Drive…).
  Spanish-style localized nouns ("Colecciones") are not used here.
- Everything technical: code samples (shared `code-samples.ts`, comments
  included — the Spanish page does not translate them either), endpoints and
  methods (`POST /runs/process`), JSON keys and field names (`flow_id`,
  `file_base64`, `awaiting_approval`), header names, status codes, curl,
  every `InlineCode` value, email address shapes, file extensions, API error
  strings the API returns in English (`Your role only permits HITL reviews`).
- URLs: `href`s (write English `/docs/...` paths, see "Links" above),
  image `src`, external links. A non-docs site page linked from a server
  module goes through `localizedPath(enPath, "<code>")` from
  `@/lib/routes` (see `de/mcp-connector.tsx`, `/integrations/mcp`).
- Third-party UI you cannot localize (claude.ai's "Settings → Connectors →
  Add custom connector", Make's "Create a new scenario").

## UI labels

Quote Tavnit's interface the way the app shows it in that language: look
the English label up in tavnit-nextjs `src/lib/i18n/translations.en.ts`,
take the same key from `translations.<code>.ts` (e.g. `flows.createNew`
"Create Flow" → German "Flow erstellen"; `nav.hitl` "Human in the Loop" →
German "Manuelle Prüfung", which is also the page's sidebar label). Labels
the dictionary does not have (some field options are hard-coded English in
the app) are translated naturally. App messages quoted in the docs
(toasts, warnings) use the dictionary's wording too.

## How to verify

```bash
npx tsc --noEmit          # nav keys complete, modules match the contract
npx eslint src/content/docs src/app/[lang]/docs
npm run build             # "/[lang]/docs/[slug]" must list /<segment>/docs/… paths
npm run start             # then, e.g. for French:
curl -s -o /dev/null -w "%{http_code}\n" localhost:3000/fr/docs                     # 200
curl -s -o /dev/null -w "%{http_code}\n" localhost:3000/fr/docs/flows               # 200
curl -s -o /dev/null -w "%{http_code}\n" "localhost:3000/fr/docs/api-integration?embed=1"  # 200
curl -s -o /dev/null -w "%{http_code}\n" localhost:3000/fr/docs/buckets             # 404 (English-only page)
curl -s localhost:3000/docs/flows | grep -o 'hrefLang="[^"]*"'   # lists fr next to en, es, de
curl -s localhost:3000/fr/docs/flows | grep -o '<link rel="canonical"[^>]*>\|<title>[^<]*</title>'
curl -s localhost:3000/sitemap.xml | grep -o '<loc>[^<]*/fr/docs[^<]*</loc>'
```

Then read the pages in a browser (desktop and phone width; German and
Polish strings run long in table headers and the sidebar), open the
language menu in the docs header, check that sidebar entries of untranslated
pages carry "EN" and open the English page, and open
`/<segment>/docs?embed=1` to see the framed (app) layout. Chinese, Japanese
and Korean titles use the system CJK font (globals.css, `--font-cjk`).
