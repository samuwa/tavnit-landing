import {
  APP_URL,
  CREDIT_UNIT,
  FEATURES,
  SOCIAL_PROFILES,
  MCP_URL,
  PRICING,
  SITE_NAME,
  SITE_URL,
  SUPPORT_EMAIL,
} from "./site";
import { faqs } from "./faqs";
import { DOC_BY_SLUG, DOC_SECTIONS, type DocSlug } from "@/components/docs/nav";

/**
 * JSON-LD builders.
 *
 * All @id values are absolute and stable so nodes can reference each other
 * across pages. Dates are stamped at build time rather than hardcoded, so
 * dateModified reflects the last deploy instead of rotting in source.
 */

const BUILD_DATE = new Date().toISOString();

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const SOFTWARE_ID = `${SITE_URL}/#software`;

function organization() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/assets/tavnit_logo.png`,
      width: 1287,
      height: 444,
    },
    description:
      "AI document pipeline — extract structured data from documents, clean and enrich it, route it through human review, and let AI browser agents act on it.",
    contactPoint: {
      "@type": "ContactPoint",
      email: SUPPORT_EMAIL,
      contactType: "customer support",
      availableLanguage: "English",
    },
    sameAs: SOCIAL_PROFILES,
  };
}

function website() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "AI document pipeline: extract, review, act. From PDF to clean structured data, with human review and AI agents.",
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
  };
}

function softwareApplication() {
  const prices = PRICING.map((t) => t.monthlyUsd);
  return {
    "@type": "SoftwareApplication",
    "@id": SOFTWARE_ID,
    name: SITE_NAME,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Intelligent Document Processing",
    operatingSystem: "Web",
    url: APP_URL,
    publisher: { "@id": ORG_ID },
    description:
      "AI document pipeline. Extract structured data from PDFs and images, clean and enrich it with Cleaners, route it through human review with a full audit trail, and let AI browser agents act on it. REST API, webhooks, and an MCP connector for claude.ai and Cursor.",
    featureList: [...FEATURES],
    softwareHelp: { "@id": `${SITE_URL}/docs#webpage` },
    offers: PRICING.map((tier) => ({
      "@type": "Offer",
      name: tier.name,
      price: String(tier.monthlyUsd),
      priceCurrency: "USD",
      description: `${tier.credits.toLocaleString("en-US")} credits per month (${CREDIT_UNIT}).`,
      category: "subscription",
      url: `${SITE_URL}/pricing`,
      availability: "https://schema.org/InStock",
    })),
    image: `${SITE_URL}/opengraph-image`,
    screenshot: `${SITE_URL}/opengraph-image`,
    potentialAction: {
      "@type": "UseAction",
      target: MCP_URL,
      name: "Connect via MCP",
    },
    additionalProperty: {
      "@type": "PropertyValue",
      name: "Lowest monthly price (USD)",
      value: String(Math.min(...prices)),
    },
  };
}

function breadcrumbs(trail: { name: string; url: string }[], pageUrl: string) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

function faqPage() {
  return {
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}

/**
 * Site-wide entities, emitted from the root layout on every route.
 *
 * Deliberately excludes WebPage, BreadcrumbList and FAQPage: those describe a
 * *specific* page, so emitting them from the root layout would put homepage FAQ
 * markup on /docs, describing content that page does not show. Schema that
 * disagrees with visible content is a Google structured-data violation.
 */
export function siteSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [organization(), website(), softwareApplication()],
  };
}

/** Page-level nodes for the homepage only. */
export function homeSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: `${SITE_URL}/`,
        name: "Tavnit — AI Document Pipeline: Extract, Review, Act",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": SOFTWARE_ID },
        primaryImageOfPage: `${SITE_URL}/opengraph-image`,
        description:
          "Extract structured data from PDFs with AI, review it with your team, and let AI browser agents act on it.",
        inLanguage: "en-US",
        datePublished: "2024-01-01",
        dateModified: BUILD_DATE,
      },
      breadcrumbs([{ name: "Home", url: SITE_URL }], `${SITE_URL}/`),
      faqPage(),
    ],
  };
}

/** Graph for /pricing: the offer catalogue plus its own pricing FAQ. */
export function pricingSchema(faqs: { q: string; a: string }[]) {
  const url = `${SITE_URL}/pricing`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: "Tavnit Pricing",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": SOFTWARE_ID },
        description:
          "Credit-based pricing for AI document extraction. 1 credit = 1 page, with unlimited flows and team members on every plan.",
        inLanguage: "en-US",
        dateModified: BUILD_DATE,
      },
      {
        "@type": "AggregateOffer",
        "@id": `${url}#offers`,
        itemOffered: { "@id": SOFTWARE_ID },
        priceCurrency: "USD",
        lowPrice: String(Math.min(...PRICING.map((t) => t.monthlyUsd))),
        highPrice: String(Math.max(...PRICING.map((t) => t.monthlyUsd))),
        offerCount: String(PRICING.length),
        offers: PRICING.map((tier) => ({
          "@type": "Offer",
          name: tier.name,
          price: String(tier.monthlyUsd),
          priceCurrency: "USD",
          url,
          availability: "https://schema.org/InStock",
          description: `${tier.credits.toLocaleString("en-US")} credits per month (${CREDIT_UNIT}).`,
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
      breadcrumbs(
        [
          { name: "Home", url: SITE_URL },
          { name: "Pricing", url },
        ],
        url,
      ),
    ],
  };
}

/** Graph for the legal pages. */
export function legalSchema(name: string, path: string, description: string) {
  const url = `${SITE_URL}${path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name,
        isPartOf: { "@id": WEBSITE_ID },
        publisher: { "@id": ORG_ID },
        description,
        inLanguage: "en-US",
        dateModified: BUILD_DATE,
      },
      breadcrumbs(
        [
          { name: "Home", url: SITE_URL },
          { name, url },
        ],
        url,
      ),
    ],
  };
}

/**
 * Docs-wide graph, emitted once from the docs layout.
 *
 * The ItemList enumerates every documentation route so crawlers see the full
 * set as a related collection rather than 13 unconnected pages.
 */
export function docsRootSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/docs#index`,
        name: "Tavnit Documentation",
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        numberOfItems: DOC_SECTIONS.length,
        itemListElement: DOC_SECTIONS.map((section, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: section.label,
          item: `${SITE_URL}${section.href}`,
        })),
      },
    ],
  };
}

/**
 * A step-by-step procedure a docs page actually renders on screen.
 *
 * Only pass this when the page visibly shows the numbered steps: HowTo markup
 * that describes steps the reader cannot see is a structured-data violation,
 * the same rule that keeps FAQPage off pages without a visible Q&A.
 */
export type DocsHowTo = {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
};

/**
 * Per-page docs graph. TechArticle signals developer documentation, and the
 * BreadcrumbList gives each section its own Home > Docs > Section trail.
 *
 * `howTo` adds a HowTo node for pages whose primary job is a setup procedure;
 * `primaryImage` promotes a page's lead screenshot to an ImageObject so the
 * screenshot is addressable as an entity rather than an anonymous <img>.
 */
export function docsPageSchema(
  slug: DocSlug,
  options: { howTo?: DocsHowTo; primaryImage?: { url: string; caption: string; width: number; height: number } } = {},
) {
  const section = DOC_BY_SLUG[slug];
  const url = `${SITE_URL}${section.href}`;
  const isRoot = section.href === "/docs";

  const trail = isRoot
    ? [
        { name: "Home", url: SITE_URL },
        { name: "Docs", url },
      ]
    : [
        { name: "Home", url: SITE_URL },
        { name: "Docs", url: `${SITE_URL}/docs` },
        { name: section.label, url },
      ];

  const image = options.primaryImage
    ? {
        "@type": "ImageObject",
        "@id": `${url}#primaryimage`,
        url: `${SITE_URL}${options.primaryImage.url}`,
        contentUrl: `${SITE_URL}${options.primaryImage.url}`,
        caption: options.primaryImage.caption,
        width: options.primaryImage.width,
        height: options.primaryImage.height,
      }
    : null;

  const howTo = options.howTo
    ? {
        "@type": "HowTo",
        "@id": `${url}#howto`,
        name: options.howTo.name,
        description: options.howTo.description,
        isPartOf: { "@id": `${url}#webpage` },
        // No per-step `url`: the steps render as a list rather than as
        // individually anchored sections, and a fragment that resolves to
        // nothing is worse than an absent optional property.
        step: options.howTo.steps.map((step, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: step.name,
          text: step.text,
        })),
      }
    : null;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["WebPage", "TechArticle"],
        "@id": `${url}#webpage`,
        url,
        name: section.heading,
        headline: section.title,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": SOFTWARE_ID },
        description: section.description,
        inLanguage: "en-US",
        datePublished: "2024-01-01",
        dateModified: BUILD_DATE,
        author: { "@id": ORG_ID },
        publisher: { "@id": ORG_ID },
        proficiencyLevel: "Beginner",
        isPartOfCollection: { "@id": `${SITE_URL}/docs#index` },
        ...(image ? { primaryImageOfPage: { "@id": `${url}#primaryimage` } } : {}),
      },
      ...(image ? [image] : []),
      ...(howTo ? [howTo] : []),
      breadcrumbs(trail, url),
    ],
  };
}
