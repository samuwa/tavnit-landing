/**
 * Single source of truth for site-wide constants used by metadata, schema,
 * sitemap, robots and the machine-readable files (llms.txt, pricing.md).
 *
 * Anything that appears in more than one of those places belongs here, so a
 * value can never drift between the rendered page and its structured data.
 */

export const SITE_URL = "https://tavnit.io";
export const APP_URL = "https://app.tavnit.io";
export const MCP_URL = "https://mcp.tavnit.io";

export const SITE_NAME = "Tavnit";
export const SUPPORT_EMAIL = "support@tavnit.io";
/** Where prospects send demo documents and scheduling requests (sales lead's
 *  inbox — Arie; switch to samuel@tavnit.io here if ownership changes). */
export const SALES_EMAIL = "arie@tavnit.io";
/** Everyone notified when a meeting is requested on /schedule. */
export const SALES_NOTIFY_EMAILS = [SALES_EMAIL, "samuel@tavnit.io"] as const;
export const GITHUB_URL = "https://github.com/tavnit";
export const LINKEDIN_URL = "https://www.linkedin.com/company/tavnit-io";
export const TWITTER_HANDLE = "@tavnit_io";

/**
 * Profiles emitted as Organization.sameAs.
 *
 * These are entity-resolution signals: they tell Google that tavnit.io and the
 * LinkedIn/GitHub accounts are the same organisation, which helps it build a
 * confident entity rather than treating the brand name as an ambiguous string.
 * Only list profiles that genuinely belong to Tavnit and actually resolve — a
 * dead sameAs is worse than an absent one.
 */
export const SOCIAL_PROFILES = [LINKEDIN_URL, GITHUB_URL];

export const SITE_DESCRIPTION =
  "Extract structured data from PDFs with AI, clean it, review it with your team, then let AI agents act on it. REST API, webhooks and an MCP connector.";

/** Feature list reused by SoftwareApplication schema and llms.txt. */
export const FEATURES = [
  "AI-Powered Document Extraction",
  "AI Browser Automation Agents",
  "Human-in-the-Loop Review with Audit Trail",
  "MCP Connector for AI Assistants",
  "Smart Document Routing with Collections",
  "Document Splitting",
  "AI Data Cleaning with Cleaners",
  "Built-in Data Storage with Buckets",
  "Charts and Data Visualization",
  "PDF Form Filling",
  "REST API and SDKs",
  "Email Triggers",
  "Webhook Notifications",
] as const;

export type PricingTier = {
  name: string;
  monthlyUsd: number;
  /** Total monthly credits (base + bonus). */
  credits: number;
  baseCredits: number;
  bonusCredits: number;
  featured: boolean;
};

/**
 * Single source of truth for pricing.
 *
 * Consumed by the homepage pricing section, the /pricing route, the
 * SoftwareApplication offers in JSON-LD, and the machine-readable /pricing.md.
 * Values are transcribed from what the site actually displays — do not edit one
 * consumer in isolation.
 *
 * Still worth confirming against billing code in tavnit-flask before treating
 * /pricing.md as authoritative: AI agents parse that file to compare tools, so
 * an error there propagates further than an error in a React component.
 */
export const PRICING: PricingTier[] = [
  { name: "Starter", monthlyUsd: 16, credits: 100, baseCredits: 100, bonusCredits: 0, featured: false },
  { name: "Growth", monthlyUsd: 77, credits: 550, baseCredits: 450, bonusCredits: 100, featured: false },
  { name: "Pro", monthlyUsd: 138, credits: 1150, baseCredits: 850, bonusCredits: 300, featured: false },
  { name: "Enterprise", monthlyUsd: 599, credits: 6000, baseCredits: 4000, bonusCredits: 2000, featured: true },
];

/** 1 credit = 1 page of extraction and cleaning. */
export const CREDIT_UNIT = "1 credit = 1 page";

/** Top-up pricing for credits beyond a plan's monthly allowance. */
export const EXTRA_CREDIT_USD = 0.16;
export const EXTRA_CREDIT_MINIMUM = 50;

/** Included on every plan, regardless of tier. */
export const INCLUDED_FEATURES = [
  "Unlimited flows",
  "Unlimited team members",
  "AI field discovery",
  "CSV exports",
  "API & webhook access",
  "Email triggers",
  "Data cleaning with Cleaners",
  "Direct database queries (JSONB)",
] as const;
