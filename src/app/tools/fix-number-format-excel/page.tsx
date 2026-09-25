import LiteToolPage, { liteToolMetadata } from "@/components/lite/LiteToolPage";

/**
 * Free tool: number format (English). A spreadsheet through a fixed
 * Cleaner inside the "Tavnit Lite" org (see src/lib/lite/clean.ts); copy in
 * src/lib/lite/copy/number-format.ts. Twin: /es/herramientas/convertir-comas-a-puntos-excel.
 */

export const metadata = liteToolMetadata("number-format", "en");

export default function FixNumberFormatPage() {
  return <LiteToolPage toolId="number-format" locale="en" />;
}
