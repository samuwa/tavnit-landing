import type { Metadata } from "next";
import MarketingPage from "@/components/MarketingPage";
import UseCaseArticle from "@/components/UseCaseArticle";
import { buildLocalizedPageSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
import { EN_LOCALE_OG, ES_LOCALE_OG, languageAlternates } from "@/lib/locale";
import { USE_CASES_ES, esUseCasePath, type UseCaseEs } from "@/lib/use-cases.es";
import { isStripeEnabled } from "@/lib/platform";

/**
 * Metadata and body for one Spanish use-case page.
 *
 * Two routes render these pages — /es/casos-de-uso/[slug] and /es/aduanas,
 * which kept its original URL — so the shared parts live here and each route
 * is a thin wrapper. Keeping them in one place is also what guarantees the
 * hreflang pair matches: both sides call languageAlternates() with the same
 * two paths.
 */

export function esUseCaseMetadata(uc: UseCaseEs): Metadata {
  const path = esUseCasePath(uc);
  const enPath = `/use-cases/${uc.slug}`;
  return {
    title: uc.title,
    description: uc.description,
    alternates: {
      canonical: path,
      languages: languageAlternates(enPath, path),
    },
    openGraph: {
      type: "article",
      url: path,
      title: uc.title,
      description: uc.description,
      siteName: "Tavnit",
      locale: ES_LOCALE_OG,
      alternateLocale: [EN_LOCALE_OG],
      images: ["/opengraph-image"],
    },
  };
}

export default async function EsUseCasePage({ uc }: { uc: UseCaseEs }) {
  const path = esUseCasePath(uc);
  const enPath = `/use-cases/${uc.slug}`;
  const stripeOn = await isStripeEnabled();
  const others = USE_CASES_ES.filter((u) => u.slug !== uc.slug)
    .slice(0, 3)
    .map((o) => ({ label: o.label, badge: o.badge, href: esUseCasePath(o) }));

  return (
    <MarketingPage locale="es" alternatePath={enPath}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildLocalizedPageSchema({
              path,
              name: uc.label,
              headline: uc.title,
              description: uc.description,
              inLanguage: "es-PA",
              breadcrumb: [
                { name: "Inicio", url: `${SITE_URL}/es` },
                { name: "Casos de uso", url: `${SITE_URL}/es/casos-de-uso` },
                { name: uc.label, url: `${SITE_URL}${path}` },
              ],
              faqs: uc.faqs,
            }),
          ),
        }}
      />
      <UseCaseArticle
        uc={uc}
        locale="es"
        homeHref="/es"
        hubHref="/es/casos-de-uso"
        alternateHref={enPath}
        others={others}
        stripeOn={stripeOn}
      />
    </MarketingPage>
  );
}
