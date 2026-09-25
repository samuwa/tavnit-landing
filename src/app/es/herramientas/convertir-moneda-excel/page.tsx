import LiteToolPage, { liteToolMetadata } from "@/components/lite/LiteToolPage";

/**
 * Free tool: currency converter (Spanish). A spreadsheet through a fixed derived-field
 * Cleaner inside the "Tavnit Lite" org (see src/lib/lite/clean.ts); copy in
 * src/lib/lite/copy/currency-converter.ts. Twin: /tools/convert-currency-excel.
 */

export const metadata = liteToolMetadata("currency-converter", "es");

export default function ConvertirMonedaPage() {
  return <LiteToolPage toolId="currency-converter" locale="es" />;
}
