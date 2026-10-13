import { liteOgImage, LITE_OG_SIZE } from "@/components/lite/og";
import { TOOL_COPY, toolOgSubtitle } from "@/lib/lite/copy";

export const alt = TOOL_COPY["invoice-line-items"].en.title;
export const size = LITE_OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return liteOgImage({
    title: TOOL_COPY["invoice-line-items"].en.h1,
    subtitle: toolOgSubtitle("invoice-line-items", "en"),
    locale: "en",
  });
}
