import LiteToolPage, { liteToolMetadata } from "@/components/lite/LiteToolPage";

/**
 * Herramienta gratis: factura → Excel (español). Gemela de
 * /tools/invoice-to-excel; el par hreflang sale del registro en
 * src/lib/lite/tools.ts para que ambos lados declaren las mismas URLs.
 */

export const metadata = liteToolMetadata("invoice-to-excel", "es");

export default function FacturaAExcelPage() {
  return <LiteToolPage toolId="invoice-to-excel" locale="es" />;
}
