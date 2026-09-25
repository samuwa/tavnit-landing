import LiteToolPage, { liteToolMetadata } from "@/components/lite/LiteToolPage";

/**
 * Free tool: translate columns (Spanish). A spreadsheet through a fixed derived-field
 * Cleaner inside the "Tavnit Lite" org (see src/lib/lite/clean.ts); copy in
 * src/lib/lite/copy/translate-columns.ts. Twin: /tools/translate-excel-columns.
 */

export const metadata = liteToolMetadata("translate-columns", "es");

export default function TraducirExcelPage() {
  return <LiteToolPage toolId="translate-columns" locale="es" />;
}
