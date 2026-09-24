import { liteOgImage, LITE_OG_SIZE } from "@/components/lite/og";
import { TOOL_COPY } from "@/lib/lite/copy";

export const alt = TOOL_COPY["bill-of-lading-to-excel"].es.title;
export const size = LITE_OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return liteOgImage({
    title: TOOL_COPY["bill-of-lading-to-excel"].es.h1,
    subtitle: "Gratis. Sin plantillas. Partes, buque, puertos y una fila por contenedor.",
    locale: "es",
  });
}
