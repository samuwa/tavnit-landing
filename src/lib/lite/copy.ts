import { LOCALE_CODES, type Locale } from "@/lib/locales";
import { LITE_LIMITS, LITE_TOOL_IDS, type LiteToolId } from "@/lib/lite/tools";
import { buildToolCopy, type HubCopy, type RelatedCopy, type ShellCopy, type ToolCopy } from "@/lib/lite/copy-base";
import { localizedPath } from "@/lib/routes";
import { LITE_COPY } from "@/content/tools";

/**
 * Copy for the free tools, assembled from one file per language
 * (src/content/tools/<code>.ts). The base is one complete tool written with
 * document tokens; each tool supplies its words and only the strings that
 * differ. Site links inside the copy (`href`) are English paths: for the new
 * languages they are localised here, so a translation never edits a URL.
 */

export type { HubCopy, RelatedCopy, ShellCopy, ToolCopy, ToolCopyDef } from "@/lib/lite/copy-base";
export { AUTH_SIGNUP_CTA_APP } from "@/lib/lite/copy-base";

/** Every `href` in a copy tree, through localizedPath (new languages only). */
function localizeHrefs<T>(node: T, locale: Locale): T {
  if (locale === "en" || locale === "es") return node;
  if (Array.isArray(node)) return node.map((n) => localizeHrefs(n, locale)) as T;
  if (node && typeof node === "object") {
    return Object.fromEntries(
      Object.entries(node as Record<string, unknown>).map(([k, v]) => [
        k,
        k === "href" && typeof v === "string" ? localizedPath(v, locale) : localizeHrefs(v, locale),
      ]),
    ) as T;
  }
  return node;
}

function byLocale<T>(pick: (locale: Locale) => T): Record<Locale, T> {
  return Object.fromEntries(LOCALE_CODES.map((l) => [l, pick(l)])) as Record<Locale, T>;
}

export const TOOL_COPY: Record<LiteToolId, Record<Locale, ToolCopy>> = Object.fromEntries(
  LITE_TOOL_IDS.map((id) => [
    id,
    byLocale((l) => localizeHrefs(buildToolCopy(LITE_COPY[l].base, LITE_COPY[l].tools[id], LITE_LIMITS.runsPerDay), l)),
  ]),
) as Record<LiteToolId, Record<Locale, ToolCopy>>;

/** The base copy per language (the header's sign-in dialog reads its `auth`). */
export const BASE_COPY: Record<Locale, ToolCopy> = byLocale((l) => LITE_COPY[l].base);

export const HUB_COPY: Record<Locale, HubCopy> = byLocale((l) => LITE_COPY[l].hub);

export const SHELL_COPY: Record<Locale, ShellCopy> = byLocale((l) => LITE_COPY[l].shell);

export const RELATED_COPY: Record<Locale, RelatedCopy> = byLocale((l) => LITE_COPY[l].related);

/** Subtitle of a tool's social card. */
export function toolOgSubtitle(id: LiteToolId, locale: Locale): string {
  return LITE_COPY[locale].og[id];
}
