import { liteOgImage, LITE_OG_SIZE } from "@/components/lite/og";
import { TOOL_COPY } from "@/lib/lite/copy";

export const alt = TOOL_COPY["receipt-to-excel"].es.title;
export const size = LITE_OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return liteOgImage({
    title: TOOL_COPY["receipt-to-excel"].es.h1,
    subtitle: "Gratis. Una foto del recibo y sus líneas quedan en una hoja de cálculo.",
    locale: "es",
  });
}
