import { liteOgImage, LITE_OG_SIZE } from "@/components/lite/og";
import RootOpengraphImage from "@/app/opengraph-image";
import { engineLocale } from "@/lib/locales";
import { TOOL_COPY, toolOgSubtitle } from "@/lib/lite/copy";
import { LITE_TOOL_IDS, liteToolByEnSlug, liteToolSlug } from "@/lib/lite/tools";
import { pageLocale, type LangParams } from "../../_locale";

/**
 * Social card of a free tool in a new language: the same drawn sheet as the
 * English and Spanish cards, in the page's words. Chinese, Japanese and
 * Korean get the generic site card instead: next/og ships no CJK font, and
 * none is loaded here, so their titles would render as empty boxes.
 */

export const alt = "Tavnit — free AI document tools";
export const size = LITE_OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams(): { tool: string }[] {
  return LITE_TOOL_IDS.map((id) => ({ tool: liteToolSlug(id) }));
}

const NO_FONT = new Set(["zh-Hans", "ja", "ko"]);

export default async function OpengraphImage({ params }: { params: Promise<LangParams & { tool: string }> }) {
  const locale = await pageLocale(params);
  const id = liteToolByEnSlug((await params).tool);
  if (!id || NO_FONT.has(locale)) return RootOpengraphImage();
  return liteOgImage({
    title: TOOL_COPY[id][locale].h1,
    subtitle: toolOgSubtitle(id, locale),
    locale: engineLocale(locale),
  });
}
