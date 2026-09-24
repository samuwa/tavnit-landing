import LiteToolPage, { liteToolMetadata } from "@/components/lite/LiteToolPage";

/**
 * Free tool: split a scanned PDF into its documents (English). A fixed
 * Splitter inside the "Tavnit Lite" org; everything visible lives in
 * src/lib/lite/copy/split-scanned-pdf.ts. Spanish twin:
 * /es/herramientas/separar-pdf-escaneado.
 */

export const metadata = liteToolMetadata("split-scanned-pdf", "en");

export default function SplitScannedPdfPage() {
  return <LiteToolPage toolId="split-scanned-pdf" locale="en" />;
}
