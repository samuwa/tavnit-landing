import LiteToolPage, { liteToolMetadata } from "@/components/lite/LiteToolPage";

/**
 * Free tool: packing list → Excel (English). A fixed Flow inside the
 * "Tavnit Lite" org; everything visible lives in src/lib/lite/copy and the
 * security in src/app/api/lite. Spanish twin: /es/herramientas/packing-list-a-excel.
 */

export const metadata = liteToolMetadata("packing-list-to-excel", "en");

export default function PackingListToExcelPage() {
  return <LiteToolPage toolId="packing-list-to-excel" locale="en" />;
}
