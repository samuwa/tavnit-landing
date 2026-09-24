import LiteToolPage, { liteToolMetadata } from "@/components/lite/LiteToolPage";

/**
 * Herramienta gratis: comparar factura con orden de compra (español).
 * Gemela de /tools/po-vs-invoice-check; el par hreflang sale del registro
 * en src/lib/lite/defs/po-invoice-check.ts.
 */

export const metadata = liteToolMetadata("po-invoice-check", "es");

export default function CompararFacturaConOrdenDeCompraPage() {
  return <LiteToolPage toolId="po-invoice-check" locale="es" />;
}
