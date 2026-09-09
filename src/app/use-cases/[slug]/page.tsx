import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MarketingPage from "@/components/MarketingPage";
import UseCaseArticle from "@/components/UseCaseArticle";
import { buildUseCasePageSchema } from "@/lib/schema";
import { USE_CASES, USE_CASE_BY_SLUG } from "@/lib/use-cases";
import { USE_CASE_ES_BY_SLUG, esUseCasePath } from "@/lib/use-cases.es";
import { languageAlternates } from "@/lib/locale";
import { isStripeEnabled } from "@/lib/platform";

/**
 * One route per document type, rendered from src/lib/use-cases.ts.
 *
 * A shared template is only safe because the data is not a template: `fields`
 * and `gotchas` carry information specific to each document type — why line
 * items break on invoices, why two-column layouts break resumes, why HS
 * classification is the hard part of customs. Swap those for generic filler and
 * this becomes six doorway pages, which is worse than having none.
 */

export function generateStaticParams() {
  return USE_CASES.map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const uc = USE_CASE_BY_SLUG[slug];
  if (!uc) return {};
  const path = `/use-cases/${uc.slug}`;
  const es = USE_CASE_ES_BY_SLUG[uc.slug];
  return {
    title: uc.title,
    description: uc.description,
    alternates: {
      canonical: path,
      // The pair must be reciprocal — the Spanish page declares the same
      // URLs via the same helper — or Google drops it.
      ...(es ? { languages: languageAlternates(path, esUseCasePath(es)) } : {}),
    },
    openGraph: {
      type: "article",
      url: path,
      title: uc.title,
      description: uc.description,
      siteName: "Tavnit",
      locale: "en_US",
      ...(es ? { alternateLocale: ["es_PA"] } : {}),
      images: ["/opengraph-image"],
    },
  };
}

export default async function UseCasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const uc = USE_CASE_BY_SLUG[slug];
  if (!uc) notFound();

  // /pricing 307s to the homepage while Stripe self-serve is off. Header and
  // Footer already hide their pricing links in that state; the CTA here did
  // not, so every use-case page carried an internal link into a redirect.
  const stripeOn = await isStripeEnabled();
  const es = USE_CASE_ES_BY_SLUG[uc.slug];

  const others = USE_CASES.filter((u) => u.slug !== uc.slug)
    .slice(0, 3)
    .map((o) => ({ label: o.label, badge: o.badge, href: `/use-cases/${o.slug}` }));

  return (
    <MarketingPage alternatePath={es ? esUseCasePath(es) : undefined}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildUseCasePageSchema({
              label: uc.label,
              slug: uc.slug,
              headline: uc.title,
              description: uc.description,
              faqs: uc.faqs,
            }),
          ),
        }}
      />
      <UseCaseArticle
        uc={uc}
        locale="en"
        homeHref="/"
        hubHref="/use-cases"
        alternateHref={es ? esUseCasePath(es) : "/es"}
        others={others}
        stripeOn={stripeOn}
      />
    </MarketingPage>
  );
}
