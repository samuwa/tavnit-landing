import type { NewLocale } from "@/lib/locales";
import {
  TRANSLATED_DOC_SLUGS,
  type DocsLocaleContent,
  type DocsNavCopy,
  type DocsPageModule,
  type TranslatedDocSlug,
} from "./types";
import deNav from "./de/nav";
import trNav from "./tr/nav";
import jaNav from "./ja/nav";
import plNav from "./pl/nav";
import zhHansNav from "./zh-Hans/nav";
import itNav from "./it/nav";
import frNav from "./fr/nav";
import ptBRNav from "./pt-BR/nav";
import koNav from "./ko/nav";
import nlNav from "./nl/nav";

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
  nl: {
    nav: nlNav,
    pages: {
      "getting-started": () => import("./nl/index"),
      flows: () => import("./nl/flows"),
      "api-integration": () => import("./nl/api-integration"),
      "email-integration": () => import("./nl/email-integration"),
      "mcp-connector": () => import("./nl/mcp-connector"),
      "human-in-the-loop": () => import("./nl/human-in-the-loop"),
    },
  },
  ko: {
    nav: koNav,
    pages: {
      "getting-started": () => import("./ko/index"),
      flows: () => import("./ko/flows"),
      "api-integration": () => import("./ko/api-integration"),
      "email-integration": () => import("./ko/email-integration"),
      "mcp-connector": () => import("./ko/mcp-connector"),
      "human-in-the-loop": () => import("./ko/human-in-the-loop"),
    },
  },
  "pt-BR": {
    nav: ptBRNav,
    pages: {
      "getting-started": () => import("./pt-BR/index"),
      flows: () => import("./pt-BR/flows"),
      "api-integration": () => import("./pt-BR/api-integration"),
      "email-integration": () => import("./pt-BR/email-integration"),
      "mcp-connector": () => import("./pt-BR/mcp-connector"),
      "human-in-the-loop": () => import("./pt-BR/human-in-the-loop"),
    },
  },
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
  it: {
    nav: itNav,
    pages: {
      "getting-started": () => import("./it/index"),
      flows: () => import("./it/flows"),
      "api-integration": () => import("./it/api-integration"),
      "email-integration": () => import("./it/email-integration"),
      "mcp-connector": () => import("./it/mcp-connector"),
      "human-in-the-loop": () => import("./it/human-in-the-loop"),
    },
  },
  "zh-Hans": {
    nav: zhHansNav,
    pages: {
      "getting-started": () => import("./zh-Hans/index"),
      flows: () => import("./zh-Hans/flows"),
      "api-integration": () => import("./zh-Hans/api-integration"),
      "email-integration": () => import("./zh-Hans/email-integration"),
      "mcp-connector": () => import("./zh-Hans/mcp-connector"),
      "human-in-the-loop": () => import("./zh-Hans/human-in-the-loop"),
    },
  },
  pl: {
    nav: plNav,
    pages: {
      "getting-started": () => import("./pl/index"),
      flows: () => import("./pl/flows"),
      "api-integration": () => import("./pl/api-integration"),
      "email-integration": () => import("./pl/email-integration"),
      "mcp-connector": () => import("./pl/mcp-connector"),
      "human-in-the-loop": () => import("./pl/human-in-the-loop"),
    },
  },
  ja: {
    nav: jaNav,
    pages: {
      "getting-started": () => import("./ja/index"),
      flows: () => import("./ja/flows"),
      "api-integration": () => import("./ja/api-integration"),
      "email-integration": () => import("./ja/email-integration"),
      "mcp-connector": () => import("./ja/mcp-connector"),
      "human-in-the-loop": () => import("./ja/human-in-the-loop"),
    },
  },
  tr: {
    nav: trNav,
    pages: {
      "getting-started": () => import("./tr/index"),
      flows: () => import("./tr/flows"),
      "api-integration": () => import("./tr/api-integration"),
      "email-integration": () => import("./tr/email-integration"),
      "mcp-connector": () => import("./tr/mcp-connector"),
      "human-in-the-loop": () => import("./tr/human-in-the-loop"),
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
