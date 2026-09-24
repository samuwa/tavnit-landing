import LiteToolPage, { liteToolMetadata } from "@/components/lite/LiteToolPage";

/**
 * Free tool: invoice → Excel (English). The page is a fixed Flow inside the
 * "Tavnit Lite" org; everything visible lives in src/lib/lite/copy.ts and
 * the security in src/app/api/lite. Spanish twin: /es/herramientas/factura-a-excel.
 */

export const metadata = liteToolMetadata("invoice-to-excel", "en");

export default function InvoiceToExcelPage() {
  return <LiteToolPage toolId="invoice-to-excel" locale="en" />;
}
