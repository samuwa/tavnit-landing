import LiteToolPage, { liteToolMetadata } from "@/components/lite/LiteToolPage";

/**
 * Free tool: date format (English). A spreadsheet through a fixed
 * Cleaner inside the "Tavnit Lite" org (see src/lib/lite/clean.ts); copy in
 * src/lib/lite/copy/date-format.ts. Twin: /es/herramientas/cambiar-formato-de-fecha-excel.
 */

export const metadata = liteToolMetadata("date-format", "en");

export default function FixDateFormatPage() {
  return <LiteToolPage toolId="date-format" locale="en" />;
}
