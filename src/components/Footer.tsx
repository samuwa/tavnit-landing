import Image from "next/image";
import Link from "next/link";
import CookieSettingsLink from "@/components/CookieSettingsLink";
import { GITHUB_URL, LINKEDIN_URL, SUPPORT_EMAIL } from "@/lib/site";
import { docsForFooterColumn } from "@/components/docs/nav";
import { USE_CASES } from "@/lib/use-cases";
import { USE_CASES_ES, esUseCasePath } from "@/lib/use-cases.es";
import type { Locale } from "@/lib/locale";

/**
 * Site footer.
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
 * they do not (docs, legal): a Spanish visitor sent to an English page without
 * warning reads it as a broken site.
 */

type FooterLink = { label: string; href: string; external?: boolean };
type FooterColumn = { title: string; links: FooterLink[] };

const product: FooterLink[] = [
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Features", href: "/#features" },
  { label: "Agents", href: "/#agents" },
  { label: "Human in the Loop", href: "/#human-in-the-loop" },
  { label: "Pricing", href: "/pricing" },
];

/**
 * Derived, but capped.
 *
 * There are more use cases than belong in a footer column — every nav link
 * appears on every page, so listing all of them would spread link equity thin
 * across pages of very different value. The hub carries the full set; this
 * column carries the highest-demand document types plus a route to the rest.
 */
const useCases: FooterLink[] = [
  { label: "All use cases", href: "/use-cases" },
  ...USE_CASES.slice(0, 6).map((uc) => ({ label: uc.label, href: `/use-cases/${uc.slug}` })),
];

/**
 * Derived from DOC_SECTIONS rather than duplicated here.
 *
 * These were hardcoded lists, so adding /docs/flows to nav.ts put it in the
 * sidebar, sitemap and llms.txt but left it unlinked from the homepage — the
 * largest docs page reachable only from inside /docs. Deriving them means a new
 * section is linked the moment it exists.
 */
const documentation: FooterLink[] = docsForFooterColumn("documentation").map((s) => ({
  label: s.label,
  href: s.href,
}));

const integrationDocs: FooterLink[] = docsForFooterColumn("integrations")
  // /integrations/mcp supersedes the docs link in this column; the setup guide
  // is still reachable from that page and from the docs sidebar.
  .filter((s) => s.slug !== "mcp-connector")
  .map((s) => ({ label: s.label, href: s.href }));

const integrations: FooterLink[] = [
  // The hub and the MCP marketing page lead; the rest are documentation routes.
  { label: "All Integrations", href: "/integrations" },
  { label: "MCP Connector", href: "/integrations/mcp" },
  ...integrationDocs,
];

const company: FooterLink[] = [
  { label: "Guides", href: "/guides" },
  // The Spanish landing is linked site-wide so it is one click from every
  // page; without an internal link it would be reachable only via sitemap.
  { label: "Español", href: "/es" },
  { label: "LinkedIn", href: LINKEDIN_URL, external: true },
  { label: "GitHub", href: GITHUB_URL, external: true },
  { label: "Contact", href: `mailto:${SUPPORT_EMAIL}` },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

const COLUMNS_EN: FooterColumn[] = [
  { title: "Product", links: product },
  { title: "Use Cases", links: useCases },
  { title: "Documentation", links: documentation },
  { title: "Integrations", links: integrations },
  { title: "Company", links: company },
];

const COLUMNS_ES: FooterColumn[] = [
  {
    title: "Producto",
    links: [
      { label: "Cómo funciona", href: "/es#como-funciona" },
      { label: "Integraciones", href: "/es/integraciones" },
      { label: "Guías", href: "/es/guias" },
      { label: "Precios", href: "/pricing" },
      { label: "Agendar una demostración", href: "/es/agendar" },
    ],
  },
  {
    title: "Casos de uso",
    links: [
      { label: "Todos los casos de uso", href: "/es/casos-de-uso" },
      ...USE_CASES_ES.slice(0, 6).map((uc) => ({ label: uc.label, href: esUseCasePath(uc) })),
    ],
  },
  { title: "Documentación (en inglés)", links: documentation },
  {
    title: "Integraciones",
    links: [
      { label: "Todas las integraciones", href: "/es/integraciones" },
      { label: "Conector MCP", href: "/es/integraciones/mcp" },
      ...integrationDocs,
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "English", href: "/" },
      { label: "LinkedIn", href: LINKEDIN_URL, external: true },
      { label: "GitHub", href: GITHUB_URL, external: true },
      { label: "Contacto", href: `mailto:${SUPPORT_EMAIL}` },
      { label: "Política de privacidad (en inglés)", href: "/privacy" },
      { label: "Términos de servicio (en inglés)", href: "/terms" },
    ],
  },
];

const COLUMNS: Record<Locale, FooterColumn[]> = { en: COLUMNS_EN, es: COLUMNS_ES };

const TAGLINE: Record<Locale, string> = {
  en: "AI document operations — extract, clean, review, and act on data from any document.",
  es: "Operaciones documentales con IA — extrae, limpia, revisa y actúa sobre los datos de cualquier documento.",
};

const COPYRIGHT: Record<Locale, string> = {
  en: "© 2026 Tavnit. All rights reserved.",
  es: "© 2026 Tavnit. Todos los derechos reservados.",
};

export default function Footer({
  showPricing = true,
  locale = "en",
}: {
  /** False while Stripe self-serve is off platform-wide (platform_config). */
  showPricing?: boolean;
  locale?: Locale;
}) {
  const columns = COLUMNS[locale];
  const visibleColumns = showPricing
    ? columns
    : columns.map((c) => ({
        ...c,
        links: c.links.filter((l) => l.href !== "/pricing"),
      }));
  return (
    <footer className="py-10 pb-6 md:py-16 md:pb-8 bg-black/40 backdrop-blur-sm border-t border-white/5 text-gray-400">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-8 md:gap-10 mb-8 md:mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <div className="mb-6">
              <Image
                src="/assets/tavnit_logo.png"
                alt="Tavnit - AI Document Data Extraction Platform"
                width={174}
                height={60}
                className="h-[48px] md:h-[60px] w-auto"
              />
            </div>
            <p className="text-sm text-gray-500 leading-relaxed max-w-[300px]">{TAGLINE[locale]}</p>
          </div>

          {visibleColumns.map((column) => (
            <div key={column.title}>
              <h4 className="text-base font-semibold text-white mb-4 md:mb-6">{column.title}</h4>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-white transition-colors"
                      {...(link.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-gray-600">
          <p>{COPYRIGHT[locale]}</p>
          <p className="flex items-center gap-4">
            <CookieSettingsLink className="hover:text-gray-400 transition-colors" locale={locale} />
            <Link href={`mailto:${SUPPORT_EMAIL}`} className="hover:text-gray-400 transition-colors">
              {SUPPORT_EMAIL}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
