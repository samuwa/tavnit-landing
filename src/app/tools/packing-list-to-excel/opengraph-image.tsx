import { liteOgImage, LITE_OG_SIZE } from "@/components/lite/og";
import { TOOL_COPY } from "@/lib/lite/copy";

export const alt = TOOL_COPY["packing-list-to-excel"].en.title;
export const size = LITE_OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return liteOgImage({
    title: TOOL_COPY["packing-list-to-excel"].en.h1,
    subtitle: "Free. No templates. Every line of your packing list as a spreadsheet.",
    locale: "en",
  });
}
