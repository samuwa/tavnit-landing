import LiteToolPage, { liteToolMetadata } from "@/components/lite/LiteToolPage";

/**
 * Herramienta gratis: recibos → Excel (español). Un Flow fijo dentro de la
 * org "Tavnit Lite"; el texto vive en src/lib/lite/copy/receipt-to-excel.ts.
 * Gemela en inglés: /tools/receipt-to-excel.
 */

export const metadata = liteToolMetadata("receipt-to-excel", "es");

export default function RecibosAExcelPage() {
  return <LiteToolPage toolId="receipt-to-excel" locale="es" />;
}
