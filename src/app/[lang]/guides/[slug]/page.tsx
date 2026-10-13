import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MarketingPage from "@/components/MarketingPage";
import GuideArticle from "@/components/GuideArticle";
import { buildGuideSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
import { hreflangOf, localeFromSegment, localeHome } from "@/lib/locales";
import { localizedPath, pageAlternates, pageOgLocales } from "@/lib/routes";
import { GUIDE_CONTENT } from "@/content/guides";
import { pageLocale, type LangParams } from "../../_locale";

/**
 * One guide in a new language: /<lang>/guides/<English slug>, rendered from
 * src/content/guides/<code>.ts by the shared article.
 */

type Params = LangParams & { slug: string };

export const dynamicParams = false;

export function generateStaticParams({ params }: { params: LangParams }): { slug: string }[] {
  const locale = localeFromSegment(params.lang);
  return locale ? GUIDE_CONTENT[locale].items.map((g) => ({ slug: g.slug })) : [];
}

async function load(params: Promise<Params>) {
  const locale = await pageLocale(params);
  const { slug } = await params;
  const content = GUIDE_CONTENT[locale];
  const g = content.items.find((x) => x.slug === slug);
  return { locale, content, g };
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale, g } = await load(params);
  if (!g) return {};
  const enPath = `/guides/${g.slug}`;
  return {
    title: g.title,
    description: g.description,
    alternates: pageAlternates(enPath, locale),
    openGraph: {
      type: "article",
      url: localizedPath(enPath, locale),
      title: g.title,
      description: g.description,
      siteName: "Tavnit",
      ...pageOgLocales(enPath, locale),
      publishedTime: g.published,
      modifiedTime: g.updated,
      images: ["/opengraph-image"],
    },
  };
}

export default async function LangGuidePage({ params }: { params: Promise<Params> }) {
  const { locale, content, g } = await load(params);
  if (!g) notFound();
  const enPath = `/guides/${g.slug}`;
  const path = localizedPath(enPath, locale);
  const others = content.items
    .filter((o) => o.slug !== g.slug)
    .map((o) => ({ h1: o.h1, readingMinutes: o.readingMinutes, href: localizedPath(`/guides/${o.slug}`, locale) }));

  return (
    <MarketingPage locale={locale} enPath={enPath}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildGuideSchema({
              slug: g.slug,
              path,
              inLanguage: hreflangOf(locale),
              headline: g.h1,
              description: g.description,
              datePublished: g.published,
              dateModified: g.updated,
              faqs: g.faqs,
              breadcrumb: [
                { name: content.hub.breadcrumbHome, url: `${SITE_URL}${localeHome(locale)}` },
                { name: content.hub.name, url: `${SITE_URL}${localizedPath("/guides", locale)}` },
                { name: g.h1, url: `${SITE_URL}${path}` },
              ],
            }),
          ),
        }}
      />
      <GuideArticle g={g} locale={locale} alternateHref={enPath} others={others} />
    </MarketingPage>
  );
}
