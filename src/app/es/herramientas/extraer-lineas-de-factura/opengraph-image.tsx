import { liteOgImage, LITE_OG_SIZE } from "@/components/lite/og";
import { TOOL_COPY } from "@/lib/lite/copy";

export const alt = TOOL_COPY["invoice-line-items"].es.title;
export const size = LITE_OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return liteOgImage({
    title: TOOL_COPY["invoice-line-items"].es.h1,
    subtitle: "Gratis. Una fila por línea, el encabezado en cada fila. Sin plantillas.",
    locale: "es",
  });
}
