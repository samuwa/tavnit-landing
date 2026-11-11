import { liteOgImage, LITE_OG_SIZE } from "@/components/lite/og";
import { TOOL_COPY } from "@/lib/lite/copy";

export const alt = TOOL_COPY["custom-extractor"].en.title;
export const size = LITE_OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return liteOgImage({
    title: TOOL_COPY["custom-extractor"].en.h1,
    subtitle: "Free. Upload a sample, the AI suggests the columns, your tool is saved.",
    locale: "en",
  });
}
