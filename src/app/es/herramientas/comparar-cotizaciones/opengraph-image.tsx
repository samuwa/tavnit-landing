import { liteOgImage, LITE_OG_SIZE } from "@/components/lite/og";
import { TOOL_COPY } from "@/lib/lite/copy";

export const alt = TOOL_COPY["quote-comparison"].es.title;
export const size = LITE_OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return liteOgImage({
    title: TOOL_COPY["quote-comparison"].es.h1,
    subtitle: "Gratis. Dos o tres cotizaciones, una sola tabla, la más barata por línea marcada.",
    locale: "es",
  });
}
