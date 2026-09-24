import { liteOgImage, LITE_OG_SIZE } from "@/components/lite/og";
import { TOOL_COPY } from "@/lib/lite/copy";

export const alt = TOOL_COPY["contract-dates"].es.title;
export const size = LITE_OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return liteOgImage({
    title: TOOL_COPY["contract-dates"].es.h1,
    subtitle: "Gratis. Partes, vigencia, renovación automática y fecha límite de aviso, en una fila.",
    locale: "es",
  });
}
