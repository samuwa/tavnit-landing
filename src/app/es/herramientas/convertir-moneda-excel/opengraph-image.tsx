import { liteOgImage, LITE_OG_SIZE } from "@/components/lite/og";
import { TOOL_COPY } from "@/lib/lite/copy";

export const alt = TOOL_COPY["currency-converter"].es.title;
export const size = LITE_OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return liteOgImage({
    title: TOOL_COPY["currency-converter"].es.h1,
    subtitle: "Gratis. Cualquier columna de precios, convertida con la tasa de referencia del día.",
    locale: "es",
  });
}
