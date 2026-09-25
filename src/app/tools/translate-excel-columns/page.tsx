import LiteToolPage, { liteToolMetadata } from "@/components/lite/LiteToolPage";

/**
 * Free tool: translate columns (English). A spreadsheet through a fixed derived-field
 * Cleaner inside the "Tavnit Lite" org (see src/lib/lite/clean.ts); copy in
 * src/lib/lite/copy/translate-columns.ts. Twin: /es/herramientas/traducir-excel.
 */

export const metadata = liteToolMetadata("translate-columns", "en");

export default function TranslateColumnsPage() {
  return <LiteToolPage toolId="translate-columns" locale="en" />;
}
