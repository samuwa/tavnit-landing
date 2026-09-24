import { liteOgImage, LITE_OG_SIZE } from "@/components/lite/og";
import { TOOL_COPY } from "@/lib/lite/copy";

export const alt = TOOL_COPY["po-invoice-check"].es.title;
export const size = LITE_OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return liteOgImage({
    title: TOOL_COPY["po-invoice-check"].es.h1,
    subtitle: "Gratis. Cada línea de la OC contra la factura: precio, cantidad, faltantes y extras.",
    locale: "es",
  });
}
