import LiteToolPage, { liteToolMetadata } from "@/components/lite/LiteToolPage";

/**
 * Free tool: PO vs invoice check (English). Two documents through one Flow
 * in the "Tavnit Lite" org, then its Matcher pairs the lines; everything
 * visible lives in src/lib/lite/copy/po-invoice-check.ts. Spanish twin:
 * /es/herramientas/comparar-factura-con-orden-de-compra.
 */

export const metadata = liteToolMetadata("po-invoice-check", "en");

export default function PoVsInvoiceCheckPage() {
  return <LiteToolPage toolId="po-invoice-check" locale="en" />;
}
