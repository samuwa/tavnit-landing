import LiteToolPage, { liteToolMetadata } from "@/components/lite/LiteToolPage";

/**
 * Herramienta gratis: BL (conocimiento de embarque) → Excel (español). Un
 * Flow fijo dentro de la org "Tavnit Lite"; todo lo visible vive en
 * src/lib/lite/copy y la seguridad en src/app/api/lite. Gemela en inglés:
 * /tools/bill-of-lading-to-excel.
 */

export const metadata = liteToolMetadata("bill-of-lading-to-excel", "es");

export default function BlAExcelPage() {
  return <LiteToolPage toolId="bill-of-lading-to-excel" locale="es" />;
}
