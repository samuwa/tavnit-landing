import LiteToolPage, { liteToolMetadata } from "@/components/lite/LiteToolPage";

/**
 * Free tool: the Custom Tool (English). The visitor builds their own
 * extractor from a sample document — the AI suggests the columns — and it
 * is saved for them as a Flow in the "Tavnit Lite" org (src/lib/lite/custom.ts,
 * src/app/api/lite/custom). Spanish twin: /es/herramientas/extractor-a-la-medida.
 */

export const metadata = liteToolMetadata("custom-extractor", "en");

export default function CustomExtractorPage() {
  return <LiteToolPage toolId="custom-extractor" locale="en" />;
}
