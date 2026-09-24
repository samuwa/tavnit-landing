import LiteToolPage, { liteToolMetadata } from "@/components/lite/LiteToolPage";

/**
 * Free tool: bill of lading → Excel (English). A fixed Flow inside the
 * "Tavnit Lite" org; everything visible lives in src/lib/lite/copy and the
 * security in src/app/api/lite. Spanish twin: /es/herramientas/bl-a-excel.
 */

export const metadata = liteToolMetadata("bill-of-lading-to-excel", "en");

export default function BillOfLadingToExcelPage() {
  return <LiteToolPage toolId="bill-of-lading-to-excel" locale="en" />;
}
