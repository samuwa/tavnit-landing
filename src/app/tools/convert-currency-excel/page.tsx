import LiteToolPage, { liteToolMetadata } from "@/components/lite/LiteToolPage";

/**
 * Free tool: currency converter (English). A spreadsheet through a fixed derived-field
 * Cleaner inside the "Tavnit Lite" org (see src/lib/lite/clean.ts); copy in
 * src/lib/lite/copy/currency-converter.ts. Twin: /es/herramientas/convertir-moneda-excel.
 */

export const metadata = liteToolMetadata("currency-converter", "en");

export default function ConvertCurrencyPage() {
  return <LiteToolPage toolId="currency-converter" locale="en" />;
}
