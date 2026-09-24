import LiteToolPage, { liteToolMetadata } from "@/components/lite/LiteToolPage";

/**
 * Herramienta gratis: comparar cotizaciones (español). Dos o tres
 * cotizaciones pasan por un Flow fijo de la org "Tavnit Lite" y un Matcher
 * empareja las líneas; todo lo visible vive en
 * src/lib/lite/copy/quote-comparison.ts. Gemela en inglés: /tools/compare-supplier-quotes.
 */

export const metadata = liteToolMetadata("quote-comparison", "es");

export default function CompararCotizacionesPage() {
  return <LiteToolPage toolId="quote-comparison" locale="es" />;
}
