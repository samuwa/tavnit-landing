import LiteToolPage, { liteToolMetadata } from "@/components/lite/LiteToolPage";

/**
 * Free tool: date format (Spanish). A spreadsheet through a fixed
 * Cleaner inside the "Tavnit Lite" org (see src/lib/lite/clean.ts); copy in
 * src/lib/lite/copy/date-format.ts. Twin: /tools/fix-date-format-excel.
 */

export const metadata = liteToolMetadata("date-format", "es");

export default function CambiarFormatoFechaPage() {
  return <LiteToolPage toolId="date-format" locale="es" />;
}
