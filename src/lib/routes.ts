import { SITE_URL } from "@/lib/site";
import {
  LOCALE_CODES,
  NEW_LOCALES,
  hreflangOf,
  localeHome,
  ogLocale,
  prefixedPath,
  type Locale,
  type NewLocale,
} from "@/lib/locales";
import { USE_CASES_ES, esUseCasePath } from "@/lib/use-cases.es";
import { GUIDES_ES, esGuidePath } from "@/lib/guides.es";
import { DOC_SECTIONS, DOC_BY_SLUG_ES } from "@/components/docs/nav";
import { LITE_TOOLS, LITE_TOOL_IDS } from "@/lib/lite/tools";
import { USE_CASE_CONTENT } from "@/content/use-cases";
import { GUIDE_CONTENT } from "@/content/guides";

/**
 * Which page exists in which language, and the one way to link to it.
 *
 * Every page is identified by its ENGLISH path. Its twins:
 *  - Spanish: a parallel page with a Spanish slug (`ES_TWINS`), from the
 *    static pairs below and the data of use cases, guides, docs and tools;
 *  - the ten new languages: `/<segment><enPath>`, served by src/app/[lang],
 *    when the English path is registered for that language in
 *    `NEW_LOCALE_PATHS` (derived from the [lang] route tree and its data).
 *
 * `alternatesFor(enPath)` is the ONLY way hreflang is emitted — pages,
 * sitemap — so every twin of a page declares the identical set: Google drops
 * an annotation the moment one side disagrees, and Next's `alternates`
 * replaces rather than merges, so every page passes it explicitly.
 * x-default is always English: the page shown to searchers whose language
 * matches none, and the one every other market can read.
 */

/** Static routes with a Spanish twin. Dynamic ones derive from their data. */
export const STATIC_ROUTE_PAIRS: { en: string; es: string }[] = [
  { en: "/", es: "/es" },
  { en: "/schedule", es: "/es/agendar" },
  { en: "/use-cases", es: "/es/casos-de-uso" },
  { en: "/integrations", es: "/es/integraciones" },
  { en: "/integrations/mcp", es: "/es/integraciones/mcp" },
  { en: "/guides", es: "/es/guias" },
  { en: "/tools", es: "/es/herramientas" },
  { en: "/enterprise", es: "/es/empresas" },
  { en: "/privacy", es: "/es/privacidad" },
  { en: "/terms", es: "/es/terminos" },
];

/** Every EN → ES pair the site declares. */
export const ES_ROUTE_PAIRS: { en: string; es: string }[] = [
  ...STATIC_ROUTE_PAIRS,
  ...LITE_TOOL_IDS.map((id) => ({ en: LITE_TOOLS[id].paths.en, es: LITE_TOOLS[id].paths.es })),
  ...USE_CASES_ES.map((uc) => ({ en: `/use-cases/${uc.slug}`, es: esUseCasePath(uc) })),
  ...GUIDES_ES.map((g) => ({ en: `/guides/${g.slug}`, es: esGuidePath(g) })),
  ...DOC_SECTIONS.map((d) => ({ en: d.href, es: DOC_BY_SLUG_ES[d.slug].href })),
];

const ES_TWINS = new Map(ES_ROUTE_PAIRS.map((p) => [p.en, p.es]));

/**
 * English paths that the src/app/[lang] tree serves, per language. Each
 * route folder under src/app/[lang] registers here; the dynamic ones read
 * the same data their generateStaticParams does, so a page cannot exist
 * without being linked and annotated, nor be annotated without existing.
 *
 * Docs (/docs/...) are not localised yet: when src/app/[lang]/docs exists,
 * add `DOC_SECTIONS.map((d) => d.href)` (or the translated subset) here.
 */
export const NEW_LOCALE_STATIC_PATHS = [
  "/",
  "/use-cases",
  "/guides",
  "/tools",
  "/integrations",
  "/integrations/mcp",
  "/schedule",
  "/enterprise",
] as const;

export const NEW_LOCALE_PATHS: Record<NewLocale, ReadonlySet<string>> = Object.fromEntries(
  NEW_LOCALES.map((locale): [NewLocale, ReadonlySet<string>] => [
    locale,
    new Set<string>([
      ...NEW_LOCALE_STATIC_PATHS,
      ...USE_CASE_CONTENT[locale].items.map((uc) => `/use-cases/${uc.slug}`),
      ...GUIDE_CONTENT[locale].items.map((g) => `/guides/${g.slug}`),
      ...LITE_TOOL_IDS.map((id) => LITE_TOOLS[id].paths.en),
    ]),
  ]),
) as Record<NewLocale, ReadonlySet<string>>;

function splitSuffix(path: string): [string, string] {
  const i = path.search(/[?#]/);
  if (i === -1) return [path, ""];
  return [path.slice(0, i) || "/", path.slice(i)];
}

/** The page at this English path in this language, or undefined when it has none. */
export function twinPath(enPath: string, locale: Locale): string | undefined {
  const [path, suffix] = splitSuffix(enPath);
  if (locale === "en") return enPath;
  if (locale === "es") {
    const es = ES_TWINS.get(path);
    return es === undefined ? undefined : `${es}${suffix}`;
  }
  return NEW_LOCALE_PATHS[locale].has(path) ? prefixedPath(locale, `${path}${suffix}`) : undefined;
}

/**
 * Link to an English path from a page in `locale`: the twin when it exists,
 * else the English page itself. Paths that are not English site paths
 * (external URLs, a Spanish path from Spanish data, docs for now) come back
 * unchanged.
 */
export function localizedPath(enPath: string, locale: Locale): string {
  return twinPath(enPath, locale) ?? enPath;
}

/** The languages this page exists in, in registry order (English always). */
export function localesFor(enPath: string): Locale[] {
  return LOCALE_CODES.filter((l) => twinPath(enPath, l) !== undefined);
}

/** hreflang block for every twin of a page, + x-default → English. */
export function alternatesFor(enPath: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const locale of localesFor(enPath)) out[hreflangOf(locale)] = `${SITE_URL}${twinPath(enPath, locale)}`;
  out["x-default"] = `${SITE_URL}${enPath}`;
  return out;
}

/** `alternates` metadata of the page `enPath` rendered in `locale`. */
export function pageAlternates(enPath: string, locale: Locale) {
  return { canonical: localizedPath(enPath, locale), languages: alternatesFor(enPath) };
}

/** og:locale + og:locale:alternate of the page `enPath` rendered in `locale`. */
export function pageOgLocales(enPath: string, locale: Locale) {
  return {
    locale: ogLocale(locale),
    alternateLocale: localesFor(enPath).filter((l) => l !== locale).map(ogLocale),
  };
}

/**
 * What the language switcher and the suggestion bar need, computed on the
 * server so the client bundle never carries the route registry:
 *  - `links`: every language → this page's twin, or that language's home;
 *  - `available`: the languages this page itself exists in.
 */
export interface LanguageLinks {
  links: Record<Locale, string>;
  available: Locale[];
}

export function languageLinksFor(enPath: string): LanguageLinks {
  return {
    links: Object.fromEntries(LOCALE_CODES.map((l) => [l, twinPath(enPath, l) ?? localeHome(l)])) as Record<Locale, string>,
    available: localesFor(enPath),
  };
}
