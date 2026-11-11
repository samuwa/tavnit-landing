import LiteToolPage, { liteToolMetadata } from "@/components/lite/LiteToolPage";

/**
 * Herramienta gratis: el extractor a la medida (español). El visitante arma
 * su propia herramienta con un documento de ejemplo —la IA propone las
 * columnas— y queda guardada para él como un Flow en la org "Tavnit Lite".
 * Gemela de /tools/custom-extractor.
 */

export const metadata = liteToolMetadata("custom-extractor", "es");

export default function ExtractorALaMedidaPage() {
  return <LiteToolPage toolId="custom-extractor" locale="es" />;
}
