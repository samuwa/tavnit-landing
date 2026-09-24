import { liteOgImage, LITE_OG_SIZE } from "@/components/lite/og";
import { TOOL_COPY } from "@/lib/lite/copy";

export const alt = TOOL_COPY["invoice-to-excel"].en.title;
export const size = LITE_OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return liteOgImage({
    title: TOOL_COPY["invoice-to-excel"].en.h1,
    subtitle: "Free. No templates. Your invoice's line items as a spreadsheet.",
    locale: "en",
  });
}
