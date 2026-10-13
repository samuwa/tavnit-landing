import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MarketingPage from "@/components/MarketingPage";
import UseCaseArticle from "@/components/UseCaseArticle";
import { buildLocalizedPageSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
import { hreflangOf, localeFromSegment, localeHome } from "@/lib/locales";
import { localizedPath, pageAlternates, pageOgLocales } from "@/lib/routes";
import { isStripeEnabled } from "@/lib/platform";
import { USE_CASE_CONTENT } from "@/content/use-cases";
import { pageLocale, type LangParams } from "../../_locale";

/**
 * One use-case page in a new language: /<lang>/use-cases/<English slug>,
 * rendered from src/content/use-cases/<code>.ts by the shared article.
 */

type Params = LangParams & { slug: string };

export const dynamicParams = false;

export function generateStaticParams({ params }: { params: LangParams }): { slug: string }[] {
  const locale = localeFromSegment(params.lang);
  return locale ? USE_CASE_CONTENT[locale].items.map((u) => ({ slug: u.slug })) : [];
}

async function load(params: Promise<Params>) {
  const locale = await pageLocale(params);
  const { slug } = await params;
  const content = USE_CASE_CONTENT[locale];
  const uc = content.items.find((u) => u.slug === slug);
  return { locale, content, uc };
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale, uc } = await load(params);
  if (!uc) return {};
  const enPath = `/use-cases/${uc.slug}`;
  return {
    title: uc.title,
    description: uc.description,
    alternates: pageAlternates(enPath, locale),
    openGraph: {
      type: "article",
      url: localizedPath(enPath, locale),
      title: uc.title,
      description: uc.description,
      siteName: "Tavnit",
      ...pageOgLocales(enPath, locale),
      images: ["/opengraph-image"],
    },
  };
}

export default async function LangUseCasePage({ params }: { params: Promise<Params> }) {
  const { locale, content, uc } = await load(params);
  if (!uc) notFound();
  const stripeOn = await isStripeEnabled();
  const enPath = `/use-cases/${uc.slug}`;
  const path = localizedPath(enPath, locale);
  const home = localeHome(locale);
  const hubPath = localizedPath("/use-cases", locale);
  const others = content.items
    .filter((u) => u.slug !== uc.slug)
    .slice(0, 3)
    .map((o) => ({ label: o.label, badge: o.badge, href: localizedPath(`/use-cases/${o.slug}`, locale) }));

  return (
    <MarketingPage locale={locale} enPath={enPath}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildLocalizedPageSchema({
              path,
              name: uc.label,
              headline: uc.title,
              description: uc.description,
              inLanguage: hreflangOf(locale),
              breadcrumb: [
                { name: content.hub.breadcrumbHome, url: `${SITE_URL}${home}` },
                { name: content.hub.breadcrumb, url: `${SITE_URL}${hubPath}` },
                { name: uc.label, url: `${SITE_URL}${path}` },
              ],
              faqs: uc.faqs,
            }),
          ),
        }}
      />
      <UseCaseArticle
        uc={uc}
        locale={locale}
        homeHref={home}
        hubHref={hubPath}
        alternateHref={enPath}
        others={others}
        stripeOn={stripeOn}
      />
    </MarketingPage>
  );
}
