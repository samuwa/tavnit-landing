import { liteOgImage, LITE_OG_SIZE } from "@/components/lite/og";
import { TOOL_COPY } from "@/lib/lite/copy";

export const alt = TOOL_COPY["number-format"].en.title;
export const size = LITE_OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return liteOgImage({
    title: TOOL_COPY["number-format"].en.h1,
    subtitle: "Free. Any column of numbers, one format: 1234.56, 1,234.56 or 1.234,56.",
    locale: "en",
  });
}
