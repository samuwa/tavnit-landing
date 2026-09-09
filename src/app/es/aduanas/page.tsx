import EsUseCasePage, { esUseCaseMetadata } from "@/components/EsUseCasePage";
import { USE_CASE_ES_BY_SLUG } from "@/lib/use-cases.es";

/**
 * Spanish customs page — the Spanish twin of /use-cases/customs-trade.
 *
 * This is the one page where the Spanish version is not a translation but the
 * primary: the HS classifier is built over Panama's Arancel Nacional, and the
 * buyers — corredores de aduana, agencias, importadores — search in Spanish.
 * Nobody else is writing about automating classification against the VII
 * Enmienda; this page is meant to own that query space.
 *
 * It keeps its own URL rather than moving under /es/casos-de-uso/: it was the
 * first Spanish page live, is already submitted for indexing and linked
 * externally, and a redirect would spend that for nothing. The content lives
 * in src/lib/use-cases.es.ts with the other Spanish use cases.
 */

const uc = USE_CASE_ES_BY_SLUG["customs-trade"];

export const metadata = esUseCaseMetadata(uc);

export default function SpanishCustomsPage() {
  return <EsUseCasePage uc={uc} />;
}
