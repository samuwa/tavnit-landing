import { DOC_BY_SLUG, DOC_GROUP_LABELS, DOC_SECTIONS, docSection, docSections, type DocGroup, type DocSection, type DocSlug } from "./nav";
import { LOCALE_CODES, hreflangOf, localeHome, localeInfo, prefixedPath, type Locale, type NewLocale } from "@/lib/locales";
import { twinPath } from "@/lib/routes";
import { docsNavCopy, isTranslatedDoc, translatedDocSlugs } from "@/content/docs";
import type { DocsChrome } from "@/content/docs/types";

/**
 * The docs in every language, server side: which docs page exists in which
 * language, its localized section strings, and the data the client docs
 * shell needs (computed here so the client bundle never carries the other
 * languages' strings or the route registry).
 *
 * English (/docs) and Spanish (/es/documentacion) come from nav.ts; the new
 * languages (/<segment>/docs/…, English slugs) from the src/content/docs
 * registry, which holds only translated pages.
 */

const CHROME: Record<"en" | "es", DocsChrome> = {
  en: {
    back: "Back to home",
    toggle: "Toggle menu",
    goHome: "Go home",
    contents: "Contents",
    close: "Close menu",
    nav: "Documentation",
    languages: "Read this page in another language",
    englishOnly: "English only",
    copy: "Copy",
    copied: "Copied!",
    related: "Related documentation",
    keepReading: "Keep reading",
  },
  es: {
    back: "Volver al inicio",
    toggle: "Abrir o cerrar el menú",
    goHome: "Ir al inicio",
    contents: "Contenido",
    close: "Cerrar el menú",
    nav: "Documentación",
    languages: "Leer esta página en otro idioma",
    englishOnly: "Solo en inglés",
    copy: "Copiar",
    copied: "¡Copiado!",
    related: "Documentación relacionada",
    keepReading: "Sigue leyendo",
  },
};

/** Docs home of a language (getting started). */
export function docsHome(locale: Locale): string {
  if (locale === "en") return "/docs";
  if (locale === "es") return "/es/documentacion";
  return prefixedPath(locale, "/docs");
}

/** The section in this language, or undefined when the page is not translated into it. */
export function localeDocSection(slug: DocSlug, locale: Locale): DocSection | undefined {
  if (locale === "en" || locale === "es") return docSection(slug, locale);
  const nav = docsNavCopy(locale);
  if (!nav || !isTranslatedDoc(locale, slug)) return undefined;
  const en = DOC_BY_SLUG[slug];
  return { ...en, ...nav.pages[slug], label: nav.labels[slug], href: prefixedPath(locale, en.href) };
}

/** The docs pages that exist in this language, in sidebar order. */
export function localeDocSections(locale: Locale): DocSection[] {
  if (locale === "en" || locale === "es") return docSections(locale);
  return DOC_SECTIONS.map((s) => localeDocSection(s.slug, locale)).filter((s): s is DocSection => s !== undefined);
}

/** "Docs" and "Home" in this language (breadcrumbs, ItemList name). */
export function docsNames(locale: Locale): { docs: string; list: string; home: string } {
  if (locale === "en") return { docs: "Docs", list: "Tavnit Documentation", home: "Home" };
  if (locale === "es") return { docs: "Documentación", list: "Documentación de Tavnit", home: "Inicio" };
  const nav = docsNavCopy(locale);
  return nav
    ? { docs: nav.docsName, list: `Tavnit — ${nav.docsName}`, home: nav.home }
    : { docs: "Docs", list: "Tavnit Documentation", home: "Home" };
}

/** Layout default description of a new language's docs. */
export function docsDescription(locale: NewLocale): string | undefined {
  return docsNavCopy(locale)?.description;
}

export interface DocsShellNavItem {
  slug: DocSlug;
  group: DocGroup;
  label: string;
  href: string;
  /** Not translated into the shell's language: links to the English page. */
  english: boolean;
}

export interface DocsShellLanguage {
  locale: Locale;
  hreflang: string;
  name: string;
  short: string;
  href: string;
}

/** Everything the client DocsShell renders, for one language. */
export interface DocsShellData {
  locale: Locale;
  /** `lang` attribute (hreflang tag). */
  lang: string;
  home: string;
  chrome: DocsChrome;
  groupLabels: Record<DocGroup, string>;
  items: DocsShellNavItem[];
  /**
   * English docs path → this language's page, for the translated pages only.
   * DocLink and Related localize English hrefs through it, so page modules
   * write `/docs/...` and a link follows the page once it is translated.
   */
  links: Record<string, string>;
  /** The language menu of each page that exists in this language. */
  languages: Partial<Record<DocSlug, DocsShellLanguage[]>>;
}

function languagesOf(slug: DocSlug): DocsShellLanguage[] {
  const enPath = DOC_BY_SLUG[slug].href;
  return LOCALE_CODES.flatMap((l) => {
    const href = twinPath(enPath, l);
    if (href === undefined) return [];
    return [{ locale: l, hreflang: hreflangOf(l), name: localeInfo(l).nativeName, short: l.split("-")[0].toUpperCase(), href }];
  });
}

export function docsShellData(locale: Locale): DocsShellData {
  if (locale === "en" || locale === "es") {
    const sections = docSections(locale);
    return {
      locale,
      lang: hreflangOf(locale),
      home: localeHome(locale),
      chrome: CHROME[locale],
      groupLabels: DOC_GROUP_LABELS[locale],
      items: sections.map((s) => ({ slug: s.slug, group: s.group, label: s.label, href: s.href, english: false })),
      links: {},
      languages: Object.fromEntries(sections.map((s) => [s.slug, languagesOf(s.slug)])),
    };
  }
  const nav = docsNavCopy(locale);
  if (!nav) throw new Error(`No docs registered for ${locale}`);
  const translated = new Set<DocSlug>(translatedDocSlugs(locale));
  const links: Record<string, string> = {};
  for (const slug of translated) links[DOC_BY_SLUG[slug].href] = prefixedPath(locale, DOC_BY_SLUG[slug].href);
  return {
    locale,
    lang: hreflangOf(locale),
    home: localeHome(locale),
    chrome: nav.chrome,
    groupLabels: nav.groupLabels,
    items: DOC_SECTIONS.map((s) => ({
      slug: s.slug,
      group: s.group,
      label: nav.labels[s.slug],
      href: links[s.href] ?? s.href,
      english: !translated.has(s.slug),
    })),
    links,
    languages: Object.fromEntries([...translated].map((slug) => [slug, languagesOf(slug)])),
  };
}
