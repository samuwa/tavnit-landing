import { liteOgImage, LITE_OG_SIZE } from "@/components/lite/og";
import { TOOL_COPY } from "@/lib/lite/copy";

export const alt = TOOL_COPY["split-scanned-pdf"].en.title;
export const size = LITE_OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return liteOgImage({
    title: TOOL_COPY["split-scanned-pdf"].en.h1,
    subtitle: "Free. One scan in, every document out, each one classified.",
    locale: "en",
  });
}
