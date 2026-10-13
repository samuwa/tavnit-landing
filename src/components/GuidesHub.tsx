import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import MarketingPage from "@/components/MarketingPage";
import { buildLocalizedPageSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
import { hreflangOf, localeHome } from "@/lib/locales";
import { localizedPath, pageAlternates, pageOgLocales } from "@/lib/routes";
import { GUIDE_CONTENT } from "@/content/guides";
import type { ContentLocale } from "@/content/types";

/**
 * The /guides hub, English and the new languages (/es/guias is its own
 * page). Words from src/content/guides/<code>.ts.
 */

const EN_PATH = "/guides";

export function guidesHubMetadata(locale: ContentLocale): Metadata {
  const { hub } = GUIDE_CONTENT[locale];
  return {
    title: hub.title,
    description: hub.description,
    alternates: pageAlternates(EN_PATH, locale),
    openGraph: {
      type: "website",
      url: localizedPath(EN_PATH, locale),
      title: hub.ogTitle,
      description: hub.ogDescription,
      siteName: "Tavnit",
      ...pageOgLocales(EN_PATH, locale),
      images: ["/opengraph-image"],
    },
  };
}

export default function GuidesHub({ locale }: { locale: ContentLocale }) {
  const { hub, items } = GUIDE_CONTENT[locale];
  const path = localizedPath(EN_PATH, locale);
  const home = localeHome(locale);

  return (
    <MarketingPage locale={locale} enPath={EN_PATH}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildLocalizedPageSchema({
              path,
              name: hub.name,
              headline: hub.h1,
              description: hub.description,
              inLanguage: hreflangOf(locale),
              breadcrumb: [
                { name: hub.breadcrumbHome, url: locale === "en" ? SITE_URL : `${SITE_URL}${home}` },
                { name: hub.name, url: `${SITE_URL}${path}` },
              ],
            }),
          ),
        }}
      />

      <div className="max-w-[860px] mx-auto px-4 sm:px-6">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-fg-5">
          <Link href={home} className="hover:text-fg-3 transition-colors">{hub.breadcrumbHome}</Link>
          <span className="mx-2" aria-hidden="true">/</span>
          <span className="text-fg-4">{hub.name}</span>
        </nav>

        <h1 className="text-3xl md:text-5xl font-extrabold text-fg mb-5 tracking-tight leading-tight">{hub.h1}</h1>
        <p className="text-lg text-fg-3 leading-relaxed mb-12 max-w-[680px]">{hub.intro}</p>

        <div className="space-y-4">
          {items.map((g) => (
            <Link
              key={g.slug}
              href={localizedPath(`/guides/${g.slug}`, locale)}
              className="glass-card glass-card-hover rounded-2xl p-6 block transition-all"
            >
              <h2 className="text-xl font-bold text-fg mb-2">{g.h1}</h2>
              <p className="text-sm text-fg-4 leading-relaxed mb-3">{g.description}</p>
              <span className="inline-flex items-center gap-4 text-xs text-fg-5">
                <span className="inline-flex items-center gap-1">
                  <Clock size={13} /> {hub.minRead.replace("{m}", String(g.readingMinutes))}
                </span>
                <span className="inline-flex items-center gap-1 text-accent font-medium">
                  {hub.read} <ArrowRight size={13} />
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </MarketingPage>
  );
}
