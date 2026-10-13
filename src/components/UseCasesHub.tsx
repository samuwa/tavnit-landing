import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MarketingPage from "@/components/MarketingPage";
import RichText from "@/components/RichText";
import { buildLocalizedPageSchema, buildUseCasesHubSchema } from "@/lib/schema";
import { APP_URL, SITE_URL } from "@/lib/site";
import { hreflangOf, localeHome } from "@/lib/locales";
import { localizedPath, pageAlternates, pageOgLocales } from "@/lib/routes";
import { USE_CASE_CONTENT } from "@/content/use-cases";
import type { ContentLocale } from "@/content/types";

/**
 * The /use-cases hub, English and the new languages (/es/casos-de-uso is
 * its own page). Words from src/content/use-cases/<code>.ts.
 */

const EN_PATH = "/use-cases";

export function metadataForUseCasesHub(locale: ContentLocale): Metadata {
  const { hub } = USE_CASE_CONTENT[locale];
  return {
    title: hub.title,
    description: hub.description,
    alternates: pageAlternates(EN_PATH, locale),
    openGraph: {
      type: "website",
      url: localizedPath(EN_PATH, locale),
      title: hub.ogTitle,
      description: hub.description,
      siteName: "Tavnit",
      ...pageOgLocales(EN_PATH, locale),
      images: ["/opengraph-image"],
    },
  };
}

export default function UseCasesHub({ locale }: { locale: ContentLocale }) {
  const { hub, items } = USE_CASE_CONTENT[locale];
  const path = localizedPath(EN_PATH, locale);
  const home = localeHome(locale);
  const href = (slug: string) => localizedPath(`/use-cases/${slug}`, locale);
  const schema =
    locale === "en"
      ? buildUseCasesHubSchema(items.map((u) => ({ label: u.label, slug: u.slug })))
      : buildLocalizedPageSchema({
          path,
          name: hub.h1,
          headline: hub.title,
          description: hub.description,
          inLanguage: hreflangOf(locale),
          breadcrumb: [
            { name: hub.breadcrumbHome, url: `${SITE_URL}${home}` },
            { name: hub.breadcrumb, url: `${SITE_URL}${path}` },
          ],
          items: items.map((u) => ({ name: u.label, url: `${SITE_URL}${href(u.slug)}` })),
        });

  return (
    <MarketingPage locale={locale} enPath={EN_PATH}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="max-w-[900px] mx-auto px-4 sm:px-6">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-fg-5">
          <Link href={home} className="hover:text-fg-3 transition-colors">{hub.breadcrumbHome}</Link>
          <span className="mx-2" aria-hidden="true">/</span>
          <span className="text-fg-4">{hub.breadcrumb}</span>
        </nav>

        <h1 className="text-3xl md:text-5xl font-extrabold text-fg mb-5 tracking-tight">{hub.h1}</h1>
        <p className="text-lg text-fg-3 leading-relaxed mb-4">{hub.intro}</p>
        <p className="text-fg-4 leading-relaxed mb-12">{hub.introMore}</p>

        <div className="grid sm:grid-cols-2 gap-4 mb-14">
          {items.map((uc) => (
            <Link
              key={uc.slug}
              href={href(uc.slug)}
              className="glass-card glass-card-hover rounded-xl p-5 flex flex-col transition-all"
            >
              <span className="text-[11px] font-semibold text-accent-2 uppercase tracking-wider mb-2">{uc.badge}</span>
              <div className="flex items-start justify-between gap-3 mb-2">
                <h2 className="text-base font-semibold text-fg">{uc.label}</h2>
                <ArrowRight size={16} className="text-accent flex-shrink-0 mt-1" />
              </div>
              <p className="text-sm text-fg-4 leading-relaxed">{uc.summary}</p>
            </Link>
          ))}
        </div>

        <section className="mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-fg mb-4">{hub.notSeeingHeading}</h2>
          <p className="text-fg-4 leading-relaxed mb-3">{hub.notSeeing}</p>
          <p className="text-fg-4 leading-relaxed">
            <RichText text={hub.notSeeingMore} locale={locale} />
          </p>
        </section>

        <div className="glass-card rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-fg mb-3">{hub.finalHeading}</h2>
          <p className="text-fg-4 mb-6 max-w-[520px] mx-auto leading-relaxed">{hub.finalBody}</p>
          <Link
            href={APP_URL}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] text-white font-semibold shadow-md hover:-translate-y-0.5 transition-all"
          >
            {hub.finalCta} <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </MarketingPage>
  );
}
