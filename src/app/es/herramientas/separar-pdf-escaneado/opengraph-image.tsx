import { liteOgImage, LITE_OG_SIZE } from "@/components/lite/og";
import { TOOL_COPY, toolOgSubtitle } from "@/lib/lite/copy";

export const alt = TOOL_COPY["split-scanned-pdf"].es.title;
export const size = LITE_OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return liteOgImage({
    title: TOOL_COPY["split-scanned-pdf"].es.h1,
    subtitle: toolOgSubtitle("split-scanned-pdf", "es"),
    locale: "es",
  });
}
