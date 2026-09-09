import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EsUseCasePage, { esUseCaseMetadata } from "@/components/EsUseCasePage";
import { USE_CASES_ES, USE_CASE_ES_BY_SLUG_ES } from "@/lib/use-cases.es";

/**
 * Spanish use-case pages under /es/casos-de-uso/<slug-es>.
 *
 * Slugs are Spanish on purpose: the URL is visible in the SERP and a Spanish
 * searcher reads /es/casos-de-uso/ordenes-de-compra as a page for them in a
 * way /es/use-cases/purchase-orders is not. The English slug stays in the data
 * as the pairing key. Customs is served from /es/aduanas (see use-cases.es.ts)
 * and is excluded here so the same content is never reachable at two URLs.
 */

export function generateStaticParams() {
  return USE_CASES_ES.filter((u) => !u.path).map((u) => ({ slug: u.slugEs }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const uc = USE_CASE_ES_BY_SLUG_ES[slug];
  return uc ? esUseCaseMetadata(uc) : {};
}

export default async function SpanishUseCasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const uc = USE_CASE_ES_BY_SLUG_ES[slug];
  if (!uc) notFound();
  return <EsUseCasePage uc={uc} />;
}
