import { liteOgImage, LITE_OG_SIZE } from "@/components/lite/og";
import { TOOL_COPY } from "@/lib/lite/copy";

export const alt = TOOL_COPY["custom-extractor"].es.title;
export const size = LITE_OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return liteOgImage({
    title: TOOL_COPY["custom-extractor"].es.h1,
    subtitle: "Gratis. Subes un ejemplo, la IA propone las columnas y tu herramienta queda guardada.",
    locale: "es",
  });
}
