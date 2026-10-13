import type { ComponentType } from "react";
import type { DocGroup, DocSlug } from "@/components/docs/nav";
import type { DocsHowTo } from "@/lib/schema";

/**
 * Localized docs for the ten new languages (src/app/[lang]/docs). Only these
 * six pages are translated; every other docs page stays English-only and the
 * localized sidebar links to its English URL (marked "EN"). See README.md.
 */
export const TRANSLATED_DOC_SLUGS = [
  "getting-started",
  "flows",
  "api-integration",
  "email-integration",
  "mcp-connector",
  "human-in-the-loop",
] as const satisfies readonly DocSlug[];

export type TranslatedDocSlug = (typeof TRANSLATED_DOC_SLUGS)[number];

/** File name of each page module under src/content/docs/<code>/. */
export const DOC_FILE: Record<TranslatedDocSlug, string> = {
  "getting-started": "index",
  flows: "flows",
  "api-integration": "api-integration",
  "email-integration": "email-integration",
  "mcp-connector": "mcp-connector",
  "human-in-the-loop": "human-in-the-loop",
};

/** The localized twin of one DocSection (components/docs/nav.ts): SEO strings and the on-page title. */
export interface DocsPageCopy {
  /** On-page <h1>, and the page's name in JSON-LD. */
  heading: string;
  /** <title>, emitted verbatim (no "| Tavnit" suffix): keep it under ~60 characters. */
  title: string;
  /** <meta name="description">: keep it under ~160 characters. */
  description: string;
}

/** Interface strings of the docs shell and the shared docs UI (components/docs/ui.tsx). */
export interface DocsChrome {
  back: string;
  toggle: string;
  goHome: string;
  contents: string;
  close: string;
  /** aria-label of the sidebar <nav>. */
  nav: string;
  /** aria-label of the language menu button. */
  languages: string;
  /** Tooltip / screen-reader text of the "EN" badge on untranslated pages. */
  englishOnly: string;
  copy: string;
  copied: string;
  /** aria-label of the Related block. */
  related: string;
  /** Eyebrow of the Related block. */
  keepReading: string;
}

/** One language's docs strings: src/content/docs/<code>/nav.ts. */
export interface DocsNavCopy {
  /** "Documentation" in the language: breadcrumbs, the root ItemList. */
  docsName: string;
  /** "Home" in the language: first breadcrumb. */
  home: string;
  /** Layout default description (each page overrides it). */
  description: string;
  chrome: DocsChrome;
  groupLabels: Record<DocGroup, string>;
  /**
   * Sidebar label of EVERY docs page, translated or not (untranslated pages
   * link to English with an "EN" badge). Product nouns stay English.
   */
  labels: Record<DocSlug, string>;
  /** Title strings of the six translated pages. */
  pages: Record<TranslatedDocSlug, DocsPageCopy>;
}

/** JSON-LD data a page module may export as `schema` (only when the English page has it). */
export interface DocsPageSchemaData {
  /** Must mirror numbered steps the page visibly renders. */
  howTo?: DocsHowTo;
  primaryImage?: { url: string; caption: string; width: number; height: number };
}

/** What a page module (src/content/docs/<code>/<file>.tsx) exports. */
export interface DocsPageModule {
  default: ComponentType;
  schema?: DocsPageSchemaData;
}

export interface DocsLocaleContent {
  nav: DocsNavCopy;
  /** The translated pages of this language (dynamic imports: one chunk per page). */
  pages: Partial<Record<TranslatedDocSlug, () => Promise<DocsPageModule>>>;
}
