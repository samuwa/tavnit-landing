import { liteOgImage, LITE_OG_SIZE } from "@/components/lite/og";
import { TOOL_COPY } from "@/lib/lite/copy";

export const alt = TOOL_COPY["translate-columns"].es.title;
export const size = LITE_OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return liteOgImage({
    title: TOOL_COPY["translate-columns"].es.h1,
    subtitle: "Gratis. Cualquier columna de texto, traducida al inglés, español, portugués, francés, alemán o chino.",
    locale: "es",
  });
}
