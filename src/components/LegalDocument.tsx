import Link from "next/link";
import MarketingPage from "@/components/MarketingPage";
import type { Locale } from "@/lib/locale";

/**
 * Shared shell for /privacy, /terms and their Spanish twins.
 *
 * Content rule for these pages: state only what is verifiable from this
 * workspace — the product's documented behaviour, published pricing, and the
 * roles and access model described in /docs. No backend implementation detail,
 * no named vendors, and no invented specifics such as retention periods,
 * jurisdiction or liability caps. Where a fact is not knowable here, the
 * section is omitted rather than filled with a plausible guess.
 *
 * The Spanish versions are translations offered for convenience and say so:
 * the English text governs if the two ever disagree, which is the standard
 * arrangement for a translated legal page and avoids maintaining two
 * authoritative texts.
 */

const COPY = {
  en: { home: "Home", homeHref: "/", updated: "Last updated:", breadcrumb: "Breadcrumb", readOther: "Leer en español" },
  es: { home: "Inicio", homeHref: "/es", updated: "Última actualización:", breadcrumb: "Ruta de navegación", readOther: "Read in English" },
} as const;

export default function LegalDocument({
  title,
  lastUpdated,
  intro,
  children,
  locale = "en",
  alternatePath,
}: {
  title: string;
  lastUpdated: string;
  intro: React.ReactNode;
  children: React.ReactNode;
  locale?: Locale;
  /** This document in the other language. */
  alternatePath?: string;
}) {
  const t = COPY[locale];
  return (
    <MarketingPage locale={locale} alternatePath={alternatePath}>
      <article className="max-w-[760px] mx-auto px-4 sm:px-6">
        <nav aria-label={t.breadcrumb} className="mb-6 text-sm text-gray-500 flex flex-wrap items-center gap-x-2">
          <Link href={t.homeHref} className="hover:text-gray-300 transition-colors">
            {t.home}
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-gray-400">{title}</span>
          {alternatePath && (
            <span className="ml-auto">
              <Link
                href={alternatePath}
                hrefLang={locale === "en" ? "es" : "en"}
                lang={locale === "en" ? "es" : "en"}
                className="hover:text-gray-300 transition-colors"
              >
                {t.readOther}
              </Link>
            </span>
          )}
        </nav>

        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3 tracking-tight">{title}</h1>
        <p className="text-sm text-gray-500 mb-8">
          {t.updated} <time dateTime={lastUpdated}>{lastUpdated}</time>
        </p>

        <p className="text-gray-400 leading-relaxed mb-10">{intro}</p>

        <div className="space-y-8 text-gray-400 leading-relaxed">{children}</div>
      </article>
    </MarketingPage>
  );
}

/** Section wrapper so headings stay consistent and land in the outline. */
export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-xl md:text-2xl font-bold text-white mb-3">{heading}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}
