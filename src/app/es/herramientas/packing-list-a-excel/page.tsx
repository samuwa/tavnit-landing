import LiteToolPage, { liteToolMetadata } from "@/components/lite/LiteToolPage";

/**
 * Herramienta gratis: packing list → Excel (español). Gemela de
 * /tools/packing-list-to-excel; el par hreflang sale del registro en
 * src/lib/lite/tools.ts para que ambos lados declaren las mismas URLs.
 */

export const metadata = liteToolMetadata("packing-list-to-excel", "es");

export default function PackingListAExcelPage() {
  return <LiteToolPage toolId="packing-list-to-excel" locale="es" />;
}
