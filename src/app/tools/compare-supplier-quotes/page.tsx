import LiteToolPage, { liteToolMetadata } from "@/components/lite/LiteToolPage";

/**
 * Free tool: compare supplier quotes (English). Two or three quotes through
 * a fixed Flow inside the "Tavnit Lite" org, then a Matcher pairs the lines;
 * everything visible lives in src/lib/lite/copy/quote-comparison.ts.
 * Spanish twin: /es/herramientas/comparar-cotizaciones.
 */

export const metadata = liteToolMetadata("quote-comparison", "en");

export default function CompareSupplierQuotesPage() {
  return <LiteToolPage toolId="quote-comparison" locale="en" />;
}
