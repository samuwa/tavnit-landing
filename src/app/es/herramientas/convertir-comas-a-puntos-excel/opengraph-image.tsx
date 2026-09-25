import { liteOgImage, LITE_OG_SIZE } from "@/components/lite/og";
import { TOOL_COPY } from "@/lib/lite/copy";

export const alt = TOOL_COPY["number-format"].es.title;
export const size = LITE_OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return liteOgImage({
    title: TOOL_COPY["number-format"].es.h1,
    subtitle: "Gratis. Cualquier columna de números, un solo formato: 1234.56, 1,234.56 o 1.234,56.",
    locale: "es",
  });
}
