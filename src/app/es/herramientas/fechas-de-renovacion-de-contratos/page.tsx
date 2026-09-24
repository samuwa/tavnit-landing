import LiteToolPage, { liteToolMetadata } from "@/components/lite/LiteToolPage";

/**
 * Herramienta gratis: fechas clave de un contrato (español). Un Flow solo de
 * encabezado dentro de la org "Tavnit Lite"; todo lo visible está en
 * src/lib/lite/copy/contract-dates.ts. Gemela en inglés:
 * /tools/contract-renewal-date-extractor.
 */

export const metadata = liteToolMetadata("contract-dates", "es");

export default function FechasDeContratosPage() {
  return <LiteToolPage toolId="contract-dates" locale="es" />;
}
