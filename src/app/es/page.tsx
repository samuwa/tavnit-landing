import LocalizedHome, { localizedHomeMetadata } from "@/components/LocalizedHome";

/**
 * Spanish landing page.
 *
 * Tavnit's primary market is Spanish-speaking — Panama first, then the rest of
 * Latin America — and the product itself is fully bilingual, yet the site had
 * no Spanish at all. Search Console confirmed the gap: Panama is the top
 * country by clicks (all on the brand name) and there is not one Spanish
 * query in three months of data, because there was nothing for one to land on.
 *
 * It pairs with "/" via hreflang and is the entry point of the Spanish site:
 * use cases, integrations, guides and the demo form all have Spanish routes
 * (see src/lib/routes.ts). The docs have their own Spanish twin under
 * /es/documentacion. The page is the compact home (components/LocalizedHome)
 * the new languages share; the words are src/content/home/es.ts.
 */

export const metadata = localizedHomeMetadata("es");

export default function SpanishLandingPage() {
  return <LocalizedHome locale="es" />;
}
