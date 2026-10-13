import type { UseCase } from "@/lib/use-cases";
import type { Guide } from "@/lib/guides";
import type { Integration } from "@/lib/integrations";
import type { Locale } from "@/lib/locales";

/** Languages whose use cases, guides and integrations pages are rendered
 *  from src/content (Spanish has its own pages and slugs under /es). */
export type ContentLocale = Exclude<Locale, "es">;

/**
 * Shapes of the per-language page content under src/content/ (see
 * src/content/README.md). Every file is plain data rendered by a shared
 * component; links are English site paths (`/use-cases`, `/docs/flows`)
 * that the component localises with `localizedPath()` (src/lib/routes.ts),
 * so a translation never edits a URL.
 *
 * Rich text: strings marked "rich" accept a tiny markup rendered by
 * components/RichText.tsx — `[label](/english/path)` for a link,
 * `**bold**` and `` `code` ``. Keep the markup, translate the words.
 */

/** A rich-text string (see the note above). */
export type Rich = string;

/** The compact home page (components/LocalizedHome.tsx): /es and the ten new languages. */
export interface HomeCopy {
  /** <title> (absolute, no brand suffix) and meta description. */
  title: string;
  description: string;
  /** schema.org WebPage name ("Tavnit en español"). The last breadcrumb is
   *  the language's native name, from the registry. */
  schemaName: string;
  breadcrumbHome: string;
  /** "Read this page in English" above the eyebrow; null hides it. */
  readInEnglish: string | null;
  eyebrow: string;
  h1: string;
  lede: string;
  ctaDemo: string;
  ctaTry: string;
  /** Section anchors (the header's "Product" link targets `howItWorks`). */
  ids: { howItWorks: string; useCases: string; integrations: string; faq: string };
  problemHeading: string;
  problems: string[];
  stepsHeading: string;
  /** Extract, review, act — icons are fixed by position. */
  steps: [{ title: string; body: string }, { title: string; body: string }, { title: string; body: string }];
  useCasesHeading: string;
  useCasesIntro: string;
  /** "{count}" is the number of use cases. */
  useCasesAll: string;
  integrationsHeading: string;
  /** Email, API, MCP, Buckets — icons are fixed by position. */
  integrations: [string, string, string, string];
  integrationsAll: string;
  faqHeading: string;
  faqs: { q: string; a: string }[];
  finalHeading: string;
  finalBody: string;
}

/** /use-cases hub page (components/UseCasesHub.tsx). */
export interface UseCasesHubCopy {
  title: string;
  description: string;
  ogTitle: string;
  breadcrumbHome: string;
  /** Breadcrumb label of the hub ("Use Cases"). */
  breadcrumb: string;
  h1: string;
  intro: string;
  introMore: string;
  notSeeingHeading: string;
  notSeeing: string;
  /** rich */
  notSeeingMore: Rich;
  finalHeading: string;
  finalBody: string;
  finalCta: string;
}

export interface UseCasesContent {
  hub: UseCasesHubCopy;
  /** `slug` and every `pipeline[].href` stay English (they are URLs). */
  items: UseCase[];
}

/** /guides hub page (components/GuidesHub.tsx). */
export interface GuidesHubCopy {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  breadcrumbHome: string;
  /** Breadcrumb label and schema name. */
  name: string;
  h1: string;
  intro: string;
  /** "{m}" is the reading time in minutes. */
  minRead: string;
  read: string;
}

export interface GuidesContent {
  hub: GuidesHubCopy;
  /** `slug`, dates, `readingMinutes` and every `href` stay as in English. */
  items: Guide[];
}

/** /integrations hub (components/IntegrationsHub.tsx). */
export interface IntegrationsHubCopy {
  title: string;
  description: string;
  ogTitle: string;
  breadcrumbHome: string;
  h1: string;
  intro: string;
  introMore: string;
  whichHeading: string;
  /** rich */
  which: Rich[];
  finalHeading: string;
  finalBody: string;
  finalCta: string;
}

/** /integrations/mcp (components/McpIntegration.tsx). */
export interface McpCopy {
  title: string;
  description: string;
  ogTitle: string;
  /** schema.org headline and name. */
  schemaHeadline: string;
  schemaName: string;
  breadcrumbHome: string;
  breadcrumbHub: string;
  breadcrumbSelf: string;
  badge: string;
  h1: string;
  lede: string;
  ledeMore: string;
  ctaStart: string;
  ctaSetup: string;
  problemHeading: string;
  problem: string[];
  compareHeading: string;
  compareCapability: string;
  compareChat: string;
  compareMcp: string;
  /** [row label, pasting into chat, through the connector] */
  compareRows: [string, string, string][];
  capabilitiesHeading: string;
  /** Icons are fixed by position (4). */
  capabilities: { title: string; body: string }[];
  askHeading: string;
  ask: string[];
  fitsHeading: string;
  fitsIntro: string;
  /** rich; one per Collections / Cleaners / HITL / Buckets. */
  fits: Rich[];
  scopeHeading: string;
  scopeCards: [{ title: string; body: string }, { title: string; body: string }];
  /** rich; "{mcpUrl}" is replaced with the server endpoint. */
  scopeMore: Rich;
  setupHeading: string;
  setupBody: string;
  setupLink: string;
  faqHeading: string;
  faqs: { q: string; a: string }[];
  finalHeading: string;
  finalBody: string;
  finalPricing: string;
  finalDemo: string;
}

export interface IntegrationsContent {
  hub: IntegrationsHubCopy;
  /** Cards of the hub: translate `label` and `summary`; `href` and `own` stay. */
  items: Integration[];
  mcp: McpCopy;
}

/** /enterprise (components/EnterpriseServices.tsx). */
export interface EnterpriseCopy {
  title: string;
  description: string;
  home: string;
  breadcrumbLabel: string;
  crumb: string;
  eyebrow: string;
  h1: string;
  lead: string;
  servicesHeading: string;
  /** Icons fixed by position (4); `links[].href` are site paths. */
  services: { title: string; body: string; links?: { label: string; href: string }[] }[];
  advisory: {
    eyebrow: string;
    heading: string;
    subheading: string;
    intro: string;
    scopeHeading: string;
    scope: { title: string; body: string }[];
    deliverablesHeading: string;
    deliverables: string;
  };
  ctaHeading: string;
  ctaBody: string;
  ctaButton: string;
  ctaEmail: string;
}
