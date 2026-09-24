import LiteToolPage, { liteToolMetadata } from "@/components/lite/LiteToolPage";

/**
 * Free tool: receipt → Excel (English). A fixed Flow inside the "Tavnit
 * Lite" org; copy in src/lib/lite/copy/receipt-to-excel.ts. Spanish twin:
 * /es/herramientas/recibos-a-excel.
 */

export const metadata = liteToolMetadata("receipt-to-excel", "en");

export default function ReceiptToExcelPage() {
  return <LiteToolPage toolId="receipt-to-excel" locale="en" />;
}
