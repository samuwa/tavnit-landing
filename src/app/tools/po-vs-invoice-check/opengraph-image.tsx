import { liteOgImage, LITE_OG_SIZE } from "@/components/lite/og";
import { TOOL_COPY } from "@/lib/lite/copy";

export const alt = TOOL_COPY["po-invoice-check"].en.title;
export const size = LITE_OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return liteOgImage({
    title: TOOL_COPY["po-invoice-check"].en.h1,
    subtitle: "Free. Every PO line against the invoice: price, quantity, missing and extra lines.",
    locale: "en",
  });
}
