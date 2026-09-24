import { liteOgImage, LITE_OG_SIZE } from "@/components/lite/og";
import { TOOL_COPY } from "@/lib/lite/copy";

export const alt = TOOL_COPY["receipt-to-excel"].en.title;
export const size = LITE_OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return liteOgImage({
    title: TOOL_COPY["receipt-to-excel"].en.h1,
    subtitle: "Free. Snap a receipt, get its items as a spreadsheet.",
    locale: "en",
  });
}
