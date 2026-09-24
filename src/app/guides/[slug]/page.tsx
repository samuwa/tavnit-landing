import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MarketingPage from "@/components/MarketingPage";
import GuideArticle from "@/components/GuideArticle";
import { buildGuideSchema } from "@/lib/schema";
import { GUIDES, GUIDE_BY_SLUG } from "@/lib/guides";
import { GUIDE_ES_BY_SLUG, esGuidePath } from "@/lib/guides.es";
import { languageAlternates } from "@/lib/locale";

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const g = GUIDE_BY_SLUG[slug];
  if (!g) return {};
  const path = `/guides/${g.slug}`;
  const es = GUIDE_ES_BY_SLUG[g.slug];
  return {
    title: g.title,
    description: g.description,
    alternates: {
      canonical: path,
      ...(es ? { languages: languageAlternates(path, esGuidePath(es)) } : {}),
    },
    openGraph: {
      type: "article",
      url: path,
      title: g.title,
      description: g.description,
      siteName: "Tavnit",
      locale: "en_US",
      ...(es ? { alternateLocale: ["es_PA"] } : {}),
      publishedTime: g.published,
      modifiedTime: g.updated,
      images: ["/opengraph-image"],
    },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const g = GUIDE_BY_SLUG[slug];
  if (!g) notFound();

  const es = GUIDE_ES_BY_SLUG[g.slug];
  const others = GUIDES.filter((o) => o.slug !== g.slug).map((o) => ({
    h1: o.h1,
    readingMinutes: o.readingMinutes,
    href: `/guides/${o.slug}`,
  }));

  return (
    <MarketingPage alternatePath={es ? esGuidePath(es) : undefined}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildGuideSchema({
              slug: g.slug,
              headline: g.h1,
              description: g.description,
              datePublished: g.published,
              dateModified: g.updated,
              faqs: g.faqs,
            }),
          ),
        }}
      />
      <GuideArticle g={g} locale="en" alternateHref={es ? esGuidePath(es) : "/es"} others={others} />
    </MarketingPage>
  );
}
