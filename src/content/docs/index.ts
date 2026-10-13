import type { NewLocale } from "@/lib/locales";
import {
  TRANSLATED_DOC_SLUGS,
  type DocsLocaleContent,
  type DocsNavCopy,
  type DocsPageModule,
  type TranslatedDocSlug,
} from "./types";
import deNav from "./de/nav";

/**
 * Localized docs registry: which of the six translatable docs pages exist in
 * which new language. A language is listed only once its pages are actually
 * translated (no stubs: an untranslated page must 404 under /<segment>/docs
 * and is linked in English). src/lib/routes.ts reads this registry, so
 * hreflang, the sitemap, the docs language menu and localizedPath() follow it.
 *
 * Adding a language: src/content/docs/README.md.
 */
export const DOCS_CONTENT: Partial<Record<NewLocale, DocsLocaleContent>> = {
  de: {
    nav: deNav,
    pages: {
      "getting-started": () => import("./de/index"),
      flows: () => import("./de/flows"),
      "api-integration": () => import("./de/api-integration"),
      "email-integration": () => import("./de/email-integration"),
      "mcp-connector": () => import("./de/mcp-connector"),
      "human-in-the-loop": () => import("./de/human-in-the-loop"),
    },
  },
};

/** The new languages that have docs. */
export function docsLocales(): NewLocale[] {
  return (Object.keys(DOCS_CONTENT) as NewLocale[]).filter((l) => translatedDocSlugs(l).length > 0);
}

/** The translated docs pages of a language, in sidebar-independent canonical order. */
export function translatedDocSlugs(locale: NewLocale): TranslatedDocSlug[] {
  const pages = DOCS_CONTENT[locale]?.pages;
  return pages ? TRANSLATED_DOC_SLUGS.filter((s) => pages[s] !== undefined) : [];
}

export function isTranslatedDoc(locale: NewLocale, slug: string): slug is TranslatedDocSlug {
  return (translatedDocSlugs(locale) as string[]).includes(slug);
}

export function docsNavCopy(locale: NewLocale): DocsNavCopy | undefined {
  return DOCS_CONTENT[locale]?.nav;
}

export async function loadDocPage(locale: NewLocale, slug: TranslatedDocSlug): Promise<DocsPageModule | undefined> {
  const load = DOCS_CONTENT[locale]?.pages[slug];
  return load ? load() : undefined;
}
