import { LITE_HUB_PATHS, LITE_TOOLS, LITE_TOOL_IDS } from "@/lib/lite/tools";
import { TOOL_COPY } from "@/lib/lite/copy";
import Logo from "@/components/Logo";
import Link from "next/link";
import { ArrowRight, Github, Linkedin } from "lucide-react";
import CookieSettingsLink from "@/components/CookieSettingsLink";
import { GITHUB_URL, LINKEDIN_URL, SUPPORT_EMAIL } from "@/lib/site";
import { docsForFooterColumn, type DocSlug } from "@/components/docs/nav";
import { USE_CASES } from "@/lib/use-cases";
import { USE_CASES_ES, esUseCasePath } from "@/lib/use-cases.es";
import type { Locale } from "@/lib/locale";

/**
 * Site footer.
 *
 * Layout (2026-09-24 redesign): the brand block with the two calls to action
 * and the social icons on the left; four short columns on the right
 * (product, free tools, use cases, resources); the documentation sections as
 * one compact row of links (they are the long tail, kept for crawlers and
 * for people looking for a specific page, without a ten-row column); legal,
 * language and contact in the bottom bar. Seven equal columns did not fit,
 * wrapped labels onto two lines and pushed "Company" to a row of its own.
 *
 * This is the primary internal-linking surface. The previous version had four
 * columns of same-page "#anchor" links plus a GitHub URL — so a crawler landing
 * on the homepage found almost no routes to follow, and the documentation pages
 * were reachable only from inside /docs.
 *
 * Two rules here:
 *  - All links are root-relative ("/#features", not "#features") so they resolve
 *    correctly from /pricing, /docs/* and the legal pages.
 *  - The same columns render on mobile and desktop. The old markup duplicated
 *    the list into a mobile-only "Quick Links" block and desktop-only columns,
 *    which meant mobile users never saw Connect, and the two lists drifted.
 *
 * The Spanish footer links Spanish routes where they exist and says so where
 * they do not (docs): a Spanish visitor sent to an English page without
 * warning reads it as a broken site.
 */

type FooterLink = { label: string; href: string; external?: boolean };
type FooterColumn = { title: string; links: FooterLink[]; more?: FooterLink };

/** Free tools: the hub, then the tools, capped; the hub has the rest. */
const FREE_TOOLS_SHOWN = 5;
function freeTools(locale: Locale): FooterColumn {
  const all = LITE_TOOL_IDS.map((id) => ({ label: TOOL_COPY[id][locale].label, href: LITE_TOOLS[id].paths[locale] }));
  return {
    title: locale === "es" ? "Herramientas gratis" : "Free tools",
    links: all.slice(0, FREE_TOOLS_SHOWN),
    more:
      all.length > FREE_TOOLS_SHOWN
        ? { label: locale === "es" ? `Ver las ${all.length}` : `See all ${all.length}`, href: LITE_HUB_PATHS[locale] }
        : undefined,
  };
}

/**
 * Use cases: derived, but capped. Every footer link appears on every page, so
 * listing all of them would spread link equity thin; the hub carries the set.
 */
const USE_CASES_SHOWN = 5;

/**
 * Documentation sections, derived from the docs nav so a new page is linked
 * the day it exists, laid out in four themed lists (any section not placed
 * below lands in the last one). Thirteen links in a plain four-column grid
 * always left one alone on its own row.
 */
const DOC_GROUPS: DocSlug[][] = [
  ["getting-started", "flows", "collections", "splitters"],
  ["cleaners", "human-in-the-loop", "agents", "pipeline-map"],
  ["buckets", "user-roles"],
  ["email-integration", "api-integration", "webhooks"],
];
const DOC_SECTIONS_ALL = [...docsForFooterColumn("documentation"), ...docsForFooterColumn("integrations")].filter((s) => s.slug !== "mcp-connector");
const placed = new Set(DOC_GROUPS.flat());
const DOCS: FooterLink[][] = DOC_GROUPS.map((group, i) => [
  ...group.flatMap((slug) => DOC_SECTIONS_ALL.filter((s) => s.slug === slug)),
  ...(i === DOC_GROUPS.length - 1 ? DOC_SECTIONS_ALL.filter((s) => !placed.has(s.slug)) : []),
].map((s) => ({ label: s.label, href: s.href })));

const COLUMNS: Record<Locale, FooterColumn[]> = {
  en: [
    {
      title: "Product",
      links: [
        { label: "How it works", href: "/#how-it-works" },
        { label: "Features", href: "/#features" },
        { label: "Agents", href: "/#agents" },
        { label: "Human in the loop", href: "/#human-in-the-loop" },
        { label: "Pricing", href: "/pricing" },
      ],
    },
    freeTools("en"),
    {
      title: "Use cases",
      links: USE_CASES.slice(0, USE_CASES_SHOWN).map((uc) => ({ label: uc.label, href: `/use-cases/${uc.slug}` })),
      more: { label: "All use cases", href: "/use-cases" },
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: "/docs" },
        { label: "Integrations", href: "/integrations" },
        { label: "MCP connector", href: "/integrations/mcp" },
        { label: "Guides", href: "/guides" },
        { label: "Book a demo", href: "/schedule" },
      ],
    },
  ],
  es: [
    {
      title: "Producto",
      links: [
        { label: "Cómo funciona", href: "/es#como-funciona" },
        { label: "Integraciones", href: "/es/integraciones" },
        { label: "Conector MCP", href: "/es/integraciones/mcp" },
        { label: "Precios", href: "/pricing" },
      ],
    },
    freeTools("es"),
    {
      title: "Casos de uso",
      links: USE_CASES_ES.slice(0, USE_CASES_SHOWN).map((uc) => ({ label: uc.label, href: esUseCasePath(uc) })),
      more: { label: "Todos los casos de uso", href: "/es/casos-de-uso" },
    },
    {
      title: "Recursos",
      links: [
        { label: "Documentación", href: "/docs" },
        { label: "Guías", href: "/es/guias" },
        { label: "Agendar una demostración", href: "/es/agendar" },
      ],
    },
  ],
};

const T: Record<
  Locale,
  { tagline: string; start: string; demo: string; demoHref: string; docs: string; docsLead: string; copyright: string; privacy: string; privacyHref: string; terms: string; termsHref: string; other: string; otherHref: string }
> = {
  en: {
    tagline: "AI document operations: extract, clean, review and act on the data in any document.",
    start: "Get started",
    demo: "Book a demo",
    demoHref: "/schedule",
    docs: "Documentation",
    docsLead: "How each piece works, from your first Flow to the API.",
    copyright: "© 2026 Tavnit",
    privacy: "Privacy",
    privacyHref: "/privacy",
    terms: "Terms",
    termsHref: "/terms",
    other: "Español",
    otherHref: "/es",
  },
  es: {
    tagline: "Operaciones documentales con IA: extrae, limpia, revisa y actúa sobre los datos de cualquier documento.",
    start: "Empezar",
    demo: "Agendar demo",
    demoHref: "/es/agendar",
    docs: "Documentación",
    docsLead: "Cómo funciona cada pieza, del primer Flow al API. En inglés.",
    copyright: "© 2026 Tavnit",
    privacy: "Privacidad",
    privacyHref: "/es/privacidad",
    terms: "Términos",
    termsHref: "/es/terminos",
    other: "English",
    otherHref: "/",
  },
};

const LINK = "text-sm text-fg-5 transition-colors hover:text-fg";

export default function Footer({
  showPricing = true,
  locale = "en",
}: {
  /** False while Stripe self-serve is off platform-wide (platform_config). */
  showPricing?: boolean;
  locale?: Locale;
}) {
  const t = T[locale];
  const columns = COLUMNS[locale].map((c) => (showPricing ? c : { ...c, links: c.links.filter((l) => l.href !== "/pricing") }));
  return (
    <footer className="border-t border-tint/5 bg-well/40 pb-8 pt-14 text-fg-4 backdrop-blur-sm md:pt-20">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Logo height={40} alt="Tavnit - AI Document Data Extraction Platform" />
            <p className="mt-5 max-w-[320px] text-sm leading-relaxed text-fg-5">{t.tagline}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="https://app.tavnit.io"
                className="inline-flex min-h-10 items-center rounded-lg bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] px-4 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                {t.start}
              </Link>
              <Link href={t.demoHref} className="inline-flex min-h-10 items-center rounded-lg border border-tint/15 px-4 text-sm font-semibold text-fg transition-colors hover:border-tint/40">
                {t.demo}
              </Link>
            </div>
            <div className="mt-6 flex items-center gap-2">
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="grid h-9 w-9 place-items-center rounded-lg border border-tint/10 text-fg-5 transition-colors hover:border-tint/30 hover:text-fg">
                <Linkedin size={16} aria-hidden />
              </a>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="grid h-9 w-9 place-items-center rounded-lg border border-tint/10 text-fg-5 transition-colors hover:border-tint/30 hover:text-fg">
                <Github size={16} aria-hidden />
              </a>
            </div>
          </div>

          {/* Four short columns */}
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:col-span-8">
            {columns.map((column) => (
              <div key={column.title}>
                <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-fg">{column.title}</h4>
                <ul className="space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className={LINK}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                  {column.more && (
                    <li>
                      <Link href={column.more.href} className="inline-flex items-center gap-1 text-sm font-medium text-fg-4 transition-colors hover:text-fg">
                        {column.more.label}
                        <ArrowRight size={13} aria-hidden />
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* The documentation: same grid as the columns above, so it lines up with them */}
        <div className="mt-14 grid gap-6 border-t border-tint/5 pt-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.12em] text-fg">{t.docs}</h4>
            <p className="mt-2 max-w-[320px] text-sm leading-relaxed text-fg-6">{t.docsLead}</p>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4 lg:col-span-8">
            {DOCS.map((group, i) => (
              <ul key={i} className="space-y-2.5">
                {group.map((d) => (
                  <li key={d.href}>
                    <Link href={d.href} className={LINK}>
                      {d.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col gap-3 border-t border-tint/5 pt-6 text-xs text-fg-6 sm:flex-row sm:items-center sm:justify-between">
          <p>{t.copyright}</p>
          <p className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href={t.privacyHref} className="transition-colors hover:text-fg-4">{t.privacy}</Link>
            <Link href={t.termsHref} className="transition-colors hover:text-fg-4">{t.terms}</Link>
            <CookieSettingsLink className="transition-colors hover:text-fg-4" locale={locale} />
            <Link href={`mailto:${SUPPORT_EMAIL}`} className="transition-colors hover:text-fg-4">{SUPPORT_EMAIL}</Link>
            <Link href={t.otherHref} className="font-semibold transition-colors hover:text-fg-4">{t.other}</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
