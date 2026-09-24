import LiteToolPage, { liteToolMetadata } from "@/components/lite/LiteToolPage";

/**
 * Herramienta gratis: separar un PDF escaneado en sus documentos (español).
 * Gemela de /tools/split-scanned-pdf; el par hreflang sale del registro.
 */

export const metadata = liteToolMetadata("split-scanned-pdf", "es");

export default function SepararPdfEscaneadoPage() {
  return <LiteToolPage toolId="split-scanned-pdf" locale="es" />;
}
