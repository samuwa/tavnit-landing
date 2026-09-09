import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MarketingPage from "@/components/MarketingPage";
import GuideArticle from "@/components/GuideArticle";
import { buildGuideSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
import { GUIDES_ES, GUIDE_ES_BY_SLUG_ES, esGuidePath } from "@/lib/guides.es";
import { EN_LOCALE_OG, ES_LOCALE_OG, languageAlternates } from "@/lib/locale";

export function generateStaticParams() {
  return GUIDES_ES.map((g) => ({ slug: g.slugEs }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const g = GUIDE_ES_BY_SLUG_ES[slug];
  if (!g) return {};
  const path = esGuidePath(g);
  return {
    title: g.title,
    description: g.description,
    alternates: {
      canonical: path,
      languages: languageAlternates(`/guides/${g.slug}`, path),
    },
    openGraph: {
      type: "article",
      url: path,
      title: g.title,
      description: g.description,
      siteName: "Tavnit",
      locale: ES_LOCALE_OG,
      alternateLocale: [EN_LOCALE_OG],
      publishedTime: g.published,
      modifiedTime: g.updated,
      images: ["/opengraph-image"],
    },
  };
}

export default async function SpanishGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const g = GUIDE_ES_BY_SLUG_ES[slug];
  if (!g) notFound();

  const path = esGuidePath(g);
  const enPath = `/guides/${g.slug}`;
  const others = GUIDES_ES.filter((o) => o.slug !== g.slug).map((o) => ({
    h1: o.h1,
    readingMinutes: o.readingMinutes,
    href: esGuidePath(o),
  }));

  return (
    <MarketingPage locale="es" alternatePath={enPath}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildGuideSchema({
              slug: g.slug,
              path,
              inLanguage: "es-PA",
              headline: g.h1,
              description: g.description,
              datePublished: g.published,
              faqs: g.faqs,
              breadcrumb: [
                { name: "Inicio", url: `${SITE_URL}/es` },
                { name: "Guías", url: `${SITE_URL}/es/guias` },
                { name: g.h1, url: `${SITE_URL}${path}` },
              ],
            }),
          ),
        }}
      />
      <GuideArticle g={g} locale="es" alternateHref={enPath} others={others} />
    </MarketingPage>
  );
}
