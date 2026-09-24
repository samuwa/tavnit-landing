import LiteToolPage, { liteToolMetadata } from "@/components/lite/LiteToolPage";

/**
 * Free tool: invoice line item extractor (English). Same Flow as
 * /tools/invoice-to-excel, a page of its own for the "line item extraction"
 * searches. Spanish twin: /es/herramientas/extraer-lineas-de-factura.
 */

export const metadata = liteToolMetadata("invoice-line-items", "en");

export default function InvoiceLineItemExtractorPage() {
  return <LiteToolPage toolId="invoice-line-items" locale="en" />;
}
