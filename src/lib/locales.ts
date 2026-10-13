/**
 * The site's languages: one registry, the detection resolver and the
 * language cookies.
 *
 * URL scheme. English lives at the root. Spanish is a parallel site under
 * /es with its own Spanish slugs (it predates this registry and keeps its
 * URLs). The ten other languages live under /<segment>/… with the ENGLISH
 * path after the segment (/de/tools/invoice-to-excel), rendered by the
 * src/app/[lang] tree; which English pages exist in which language is
 * registered in src/lib/routes.ts. The root layout keeps <html lang="en">;
 * each page sets `lang` on its content wrapper (MarketingPage, LiteShell).
 *
 * Detection never redirects (Googlebot crawls from the US, and hreflang
 * does the routing for searchers): src/proxy.ts only proposes a language in
 * the `tavnit_lang_auto` cookie and the LanguageSuggestion bar offers the
 * twin page. An explicit choice (the switcher, the bar) is `tavnit_lang`,
 * shared with app.tavnit.io.
 *
 * Mirror of the app's src/lib/i18n/locales.ts (codes, normalizeLanguage,
 * parseAcceptLanguage, COUNTRY_LANGUAGES, resolveLanguage) and
 * src/lib/i18n/cookies.ts (cookie names and attributes) — change together.
 */

export const LOCALES = [
  { code: "en", segment: "", hreflang: "en", og: "en_US", nativeName: "English", englishName: "English" },
  { code: "es", segment: "es", hreflang: "es", og: "es_PA", nativeName: "Español", englishName: "Spanish" },
  { code: "pt-BR", segment: "pt-br", hreflang: "pt-BR", og: "pt_BR", nativeName: "Português (Brasil)", englishName: "Portuguese (Brazil)" },
  { code: "fr", segment: "fr", hreflang: "fr", og: "fr_FR", nativeName: "Français", englishName: "French" },
  { code: "de", segment: "de", hreflang: "de", og: "de_DE", nativeName: "Deutsch", englishName: "German" },
  { code: "it", segment: "it", hreflang: "it", og: "it_IT", nativeName: "Italiano", englishName: "Italian" },
  { code: "nl", segment: "nl", hreflang: "nl", og: "nl_NL", nativeName: "Nederlands", englishName: "Dutch" },
  { code: "pl", segment: "pl", hreflang: "pl", og: "pl_PL", nativeName: "Polski", englishName: "Polish" },
  { code: "tr", segment: "tr", hreflang: "tr", og: "tr_TR", nativeName: "Türkçe", englishName: "Turkish" },
  { code: "zh-Hans", segment: "zh-hans", hreflang: "zh-Hans", og: "zh_CN", nativeName: "简体中文", englishName: "Chinese (Simplified)" },
  { code: "ja", segment: "ja", hreflang: "ja", og: "ja_JP", nativeName: "日本語", englishName: "Japanese" },
  { code: "ko", segment: "ko", hreflang: "ko", og: "ko_KR", nativeName: "한국어", englishName: "Korean" },
] as const;

export type Locale = (typeof LOCALES)[number]["code"];

/** The languages served by the src/app/[lang] tree (English paths after the segment). */
export type NewLocale = Exclude<Locale, "en" | "es">;

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_CODES: readonly Locale[] = LOCALES.map((l) => l.code);

export const NEW_LOCALES = LOCALE_CODES.filter((l): l is NewLocale => l !== "en" && l !== "es");

export type LocaleInfo = (typeof LOCALES)[number];

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && LOCALES.some((l) => l.code === value);
}

export function isNewLocale(value: unknown): value is NewLocale {
  return isLocale(value) && value !== "en" && value !== "es";
}

export function localeInfo(locale: Locale): LocaleInfo {
  return LOCALES.find((l) => l.code === locale) ?? LOCALES[0];
}

/** hreflang tag (also the `lang` attribute and schema.org `inLanguage`). */
export function hreflangOf(locale: Locale): string {
  return localeInfo(locale).hreflang;
}

/**
 * Tag for Intl formatters (numbers, dates). English and Spanish keep the
 * regional formats the site has always used (en-US, es-PA, the primary
 * market); the others use their hreflang tag.
 */
export function intlTag(locale: Locale): string {
  if (locale === "en") return "en-US";
  if (locale === "es") return "es-PA";
  return hreflangOf(locale);
}

/** Open Graph locale (og:locale). */
export function ogLocale(locale: Locale): string {
  return localeInfo(locale).og;
}

/** The new locale whose URL segment this is (`pt-br` → `pt-BR`), else null. */
export function localeFromSegment(segment: string): NewLocale | null {
  const found = LOCALES.find((l) => l.segment === segment);
  return found && isNewLocale(found.code) ? found.code : null;
}

/** URL segment of a new locale (`zh-Hans` → `zh-hans`). */
export function segmentOf(locale: NewLocale): string {
  return localeInfo(locale).segment;
}

/** `/<segment><enPath>` for a page of the [lang] tree (no existence check: see routes.ts). */
export function prefixedPath(locale: NewLocale, enPath: string): string {
  const seg = `/${segmentOf(locale)}`;
  if (enPath === "/" || enPath === "") return seg;
  if (enPath.startsWith("/#") || enPath.startsWith("/?")) return `${seg}${enPath.slice(1)}`;
  return `${seg}${enPath}`;
}

/** The home page of a locale. */
export function localeHome(locale: Locale): string {
  if (locale === "en") return "/";
  if (locale === "es") return "/es";
  return prefixedPath(locale, "/");
}

/**
 * Free-tool ENGINE locale. The Lite org holds one Flow / Matcher / sample per
 * engine language (field names, column order, sample documents are Spanish
 * or English); every other site language runs the English engine and only
 * translates the page around it.
 */
export type EngineLocale = "en" | "es";

export function engineLocale(locale: Locale): EngineLocale {
  return locale === "es" ? "es" : "en";
}

const BY_LOWER = new Map<string, Locale>(LOCALES.map((l) => [l.code.toLowerCase(), l.code]));

// ---------------------------------------------------------------------------
// Detection. Copied verbatim from the app's src/lib/i18n/locales.ts (its
// `Language` is this file's `Locale`) — change together.
// ---------------------------------------------------------------------------

/**
 * Supported language for a BCP 47 tag, else null. Regional variants map to
 * their language (es-419 → es, fr-CA → fr, pt-PT → pt-BR); Chinese maps to
 * Simplified only for zh / zh-CN / zh-SG / zh-Hans — Traditional (TW, HK,
 * MO, Hant) is not offered, so it resolves to null.
 */
export function normalizeLanguage(tag: string | null | undefined): Locale | null {
  if (!tag) return null;
  const t = tag.trim().replace(/_/g, "-").toLowerCase();
  if (!t) return null;
  const exact = BY_LOWER.get(t);
  if (exact) return exact;
  if (t.startsWith("zh")) {
    if (t.startsWith("zh-hant") || /^zh-(tw|hk|mo)\b/.test(t)) return null;
    if (t === "zh" || t.startsWith("zh-hans") || /^zh-(cn|sg)\b/.test(t)) return "zh-Hans";
    return null;
  }
  const base = t.split("-")[0];
  if (base === "pt") return "pt-BR";
  return BY_LOWER.get(base) ?? null;
}

/** Accept-Language → tags ordered by q (stable for equal q). */
export function parseAcceptLanguage(header: string | null | undefined): string[] {
  if (!header) return [];
  return header
    .split(",")
    .map((part, i) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.map((p) => p.trim()).find((p) => p.startsWith("q="));
      const weight = q ? Number(q.slice(2)) : 1;
      return { tag: tag.trim(), q: Number.isFinite(weight) ? weight : 0, i };
    })
    .filter((x) => x.tag && x.tag !== "*" && x.q > 0)
    .sort((a, b) => b.q - a.q || a.i - b.i)
    .map((x) => x.tag);
}

interface CountryLanguages {
  /** Supported languages spoken there, most common first. */
  langs: Locale[];
  /** Several official/common languages: the browser's choice decides. */
  multilingual?: true;
}

const one = (lang: Locale): CountryLanguages => ({ langs: [lang] });

/**
 * ISO 3166-1 alpha-2 → supported languages spoken there. Countries not
 * listed fall back to the browser language, then English.
 */
export const COUNTRY_LANGUAGES: Record<string, CountryLanguages> = {
  // Spanish-speaking
  ...Object.fromEntries(
    ["ES", "MX", "AR", "CO", "PE", "VE", "CL", "EC", "GT", "CU", "BO", "DO",
     "HN", "PY", "SV", "NI", "CR", "PA", "UY", "PR", "GQ"].map((c) => [c, one("es")])
  ),
  // Portuguese-speaking (Brazilian Portuguese is the offered variant)
  ...Object.fromEntries(
    ["BR", "PT", "AO", "MZ", "CV", "GW", "ST", "TL"].map((c) => [c, one("pt-BR")])
  ),
  // French-speaking
  ...Object.fromEntries(
    ["FR", "MC", "SN", "CI", "ML", "BF", "NE", "TG", "BJ", "GA", "CG", "CD",
     "GN", "MG", "HT", "RE", "GP", "MQ", "GF", "PF", "NC"].map((c) => [c, one("fr")])
  ),
  // German-speaking
  DE: one("de"), AT: one("de"), LI: one("de"),
  IT: one("it"), SM: one("it"), VA: one("it"),
  NL: one("nl"), SR: one("nl"), AW: one("nl"), CW: one("nl"),
  PL: one("pl"),
  TR: one("tr"),
  CN: one("zh-Hans"),
  JP: one("ja"),
  KR: one("ko"),
  // English-speaking
  ...Object.fromEntries(
    ["GB", "IE", "AU", "NZ", "JM", "TT", "BS", "BB", "BZ", "GH", "NG", "KE",
     "UG", "TZ", "ZA", "ZW", "ZM", "BW", "NA", "MT"].map((c) => [c, one("en")])
  ),
  // The US: English, but a Spanish-preferring browser gets Spanish.
  US: { langs: ["en", "es"] },
  // Multilingual: the browser decides among (or beyond) these.
  CH: { langs: ["de", "fr", "it"], multilingual: true },
  BE: { langs: ["nl", "fr", "de"], multilingual: true },
  LU: { langs: ["fr", "de"], multilingual: true },
  CA: { langs: ["en", "fr"], multilingual: true },
  SG: { langs: ["en", "zh-Hans"], multilingual: true },
  IN: { langs: ["en"], multilingual: true },
  PH: { langs: ["en"], multilingual: true },
  MY: { langs: ["en"], multilingual: true },
  HK: { langs: ["en"], multilingual: true },
  TW: { langs: ["en"], multilingual: true },
  CM: { langs: ["fr", "en"], multilingual: true },
  MA: { langs: ["fr"], multilingual: true },
  DZ: { langs: ["fr"], multilingual: true },
  TN: { langs: ["fr"], multilingual: true },
  CY: { langs: ["en", "tr"], multilingual: true },
};

/**
 * The language to show a visitor who has made no explicit choice.
 *
 * - The browser's preferred language wins when it is spoken in the
 *   visitor's country (a French-speaking Swiss, a Spanish-speaking American).
 * - In a multilingual country, the browser's first supported language wins
 *   even when it is not on the list (an English browser in Belgium).
 * - Otherwise the country's main language decides (Brazil → pt-BR even on an
 *   English browser — location first, as product decided).
 * - Unknown country: the browser's first supported language, else English.
 */
export function resolveLanguage(
  country: string | null | undefined,
  acceptLanguage: string | readonly string[] | null | undefined
): Locale {
  const tags =
    typeof acceptLanguage === "string" || acceptLanguage == null
      ? parseAcceptLanguage(acceptLanguage as string | null | undefined)
      : [...acceptLanguage];
  const region = country?.trim().toUpperCase() ?? "";
  // A bare "zh" means Traditional for a reader in Taiwan / Hong Kong / Macau
  // or one whose browser already asked for Traditional (zh-TW, zh-Hant).
  let traditional = ["TW", "HK", "MO"].includes(region);
  const prefs: Locale[] = [];
  for (const tag of tags) {
    const t = tag.trim().toLowerCase();
    if (t.startsWith("zh-hant") || /^zh-(tw|hk|mo)\b/.test(t)) traditional = true;
    if (t === "zh" && traditional) continue;
    const lang = normalizeLanguage(tag);
    if (lang) prefs.push(lang);
  }
  const entry = region ? COUNTRY_LANGUAGES[region] : undefined;
  if (!entry) return prefs[0] ?? DEFAULT_LOCALE;
  const spokenHere = prefs.find((l) => entry.langs.includes(l));
  if (spokenHere) return spokenHere;
  if (entry.multilingual) return prefs[0] ?? entry.langs[0];
  return entry.langs[0];
}

// ---------------------------------------------------------------------------
// Cookies. Same names and attributes as the app's src/lib/i18n/cookies.ts —
// change together.
//
// - `tavnit_lang`: the visitor's EXPLICIT choice (the app's picker, this
//   site's switcher and suggestion bar). Scoped to `Domain=tavnit.io` in
//   production so a choice made on tavnit.io carries to app.tavnit.io and
//   back; host-only elsewhere (localhost, *.vercel.app previews). The proxy
//   re-issues it on page navigations because Safari caps JS-written cookies
//   at 7 days.
// - `tavnit_lang_auto`: what detection proposed (country + Accept-Language),
//   host-only, 7 days. Never an explicit choice.
// ---------------------------------------------------------------------------

export const LANG_COOKIE = "tavnit_lang";
export const AUTO_LANG_COOKIE = "tavnit_lang_auto";
export const LANG_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;
export const AUTO_LANG_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

const SHARED_DOMAIN = "tavnit.io";

/** `Domain` for the shared cookie on this host, or undefined (host-only). */
export function sharedCookieDomain(hostname: string): string | undefined {
  const host = hostname.toLowerCase();
  return host === SHARED_DOMAIN || host.endsWith(`.${SHARED_DOMAIN}`) ? SHARED_DOMAIN : undefined;
}

/** Parse a cookie value into a supported language (accepts any casing). */
export function cookieLanguage(value: string | null | undefined): Locale | null {
  if (!value) return null;
  let v = value;
  try {
    v = decodeURIComponent(value);
  } catch {
    return null;
  }
  return isLocale(v) ? v : normalizeLanguage(v);
}

function readBrowserCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  for (const part of document.cookie.split(";")) {
    const [k, ...rest] = part.trim().split("=");
    if (k === name) return rest.join("=");
  }
  return null;
}

export function readLangCookie(): Locale | null {
  return cookieLanguage(readBrowserCookie(LANG_COOKIE));
}

export function readAutoLangCookie(): Locale | null {
  return cookieLanguage(readBrowserCookie(AUTO_LANG_COOKIE));
}

/** Record an explicit choice (browser only). */
export function writeLangCookie(lang: Locale): void {
  if (typeof document === "undefined") return;
  const domain = sharedCookieDomain(window.location.hostname);
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie =
    `${LANG_COOKIE}=${encodeURIComponent(lang)}; Path=/; Max-Age=${LANG_COOKIE_MAX_AGE}; SameSite=Lax` +
    (domain ? `; Domain=${domain}` : "") +
    secure;
}
