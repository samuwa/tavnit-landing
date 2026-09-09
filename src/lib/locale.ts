import { SITE_URL } from "@/lib/site";

/**
 * Locale plumbing for the Spanish site.
 *
 * The site is not internationalised route-by-route: English lives at the root
 * and Spanish lives under /es with its own (Spanish) slugs, because the two
 * are not translations of each other so much as parallel sites for two
 * markets — Panama and Latin America search in Spanish, everyone else in
 * English. The root layout keeps <html lang="en">; Spanish pages set
 * lang="es" on their content wrapper (see MarketingPage).
 *
 * What this module owns:
 *  - the EN↔ES pairs for the static routes (dynamic pairs live next to their
 *    data in use-cases.es.ts and guides.es.ts, keyed by the English slug);
 *  - `languageAlternates()`, the one way hreflang is emitted, so both sides
 *    of a pair always declare the same three URLs. Google drops a pair the
 *    moment one side disagrees, and Next's `alternates` replaces rather than
 *    merges, so every paired page must call this explicitly.
 */

export type Locale = "en" | "es";

export const ES_LOCALE_OG = "es_PA";
export const EN_LOCALE_OG = "en_US";

/** Static routes with a Spanish twin. Dynamic ones derive from their data. */
export const STATIC_ROUTE_PAIRS: { en: string; es: string }[] = [
  { en: "/", es: "/es" },
  { en: "/schedule", es: "/es/agendar" },
  { en: "/use-cases", es: "/es/casos-de-uso" },
  { en: "/integrations", es: "/es/integraciones" },
  { en: "/integrations/mcp", es: "/es/integraciones/mcp" },
  { en: "/guides", es: "/es/guias" },
];

export const ES_PATH_BY_EN: Record<string, string> = Object.fromEntries(
  STATIC_ROUTE_PAIRS.map((p) => [p.en, p.es]),
);

/**
 * hreflang block for one EN↔ES pair. x-default is always English: it is the
 * page shown to searchers whose language matches neither, and the English
 * page is the one every other market can read.
 */
export function languageAlternates(enPath: string, esPath: string) {
  return {
    en: `${SITE_URL}${enPath}`,
    es: `${SITE_URL}${esPath}`,
    "x-default": `${SITE_URL}${enPath}`,
  };
}
