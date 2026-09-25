import LiteToolPage, { liteToolMetadata } from "@/components/lite/LiteToolPage";

/**
 * Free tool: number format (Spanish). A spreadsheet through a fixed
 * Cleaner inside the "Tavnit Lite" org (see src/lib/lite/clean.ts); copy in
 * src/lib/lite/copy/number-format.ts. Twin: /tools/fix-number-format-excel.
 */

export const metadata = liteToolMetadata("number-format", "es");

export default function ConvertirComasPage() {
  return <LiteToolPage toolId="number-format" locale="es" />;
}
