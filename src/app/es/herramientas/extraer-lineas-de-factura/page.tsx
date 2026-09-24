import LiteToolPage, { liteToolMetadata } from "@/components/lite/LiteToolPage";

/**
 * Herramienta gratis: extractor de líneas de factura (español). Mismo Flow
 * que /es/herramientas/factura-a-excel, página propia para las búsquedas de
 * "extraer líneas de factura". Gemela: /tools/invoice-line-item-extractor.
 */

export const metadata = liteToolMetadata("invoice-line-items", "es");

export default function ExtraerLineasDeFacturaPage() {
  return <LiteToolPage toolId="invoice-line-items" locale="es" />;
}
