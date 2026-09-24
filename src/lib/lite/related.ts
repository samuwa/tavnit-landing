import type { Locale } from "@/lib/locale";
import { GUIDES } from "@/lib/guides";
import { GUIDE_ES_BY_SLUG, esGuidePath } from "@/lib/guides.es";
import { USE_CASES } from "@/lib/use-cases";
import { USE_CASES_ES, esUseCasePath } from "@/lib/use-cases.es";
import { LITE_TOOLS, LITE_TOOL_IDS, type LiteToolId } from "@/lib/lite/tools";
import { TOOL_COPY } from "@/lib/lite/copy";

/**
 * Links between the free tools and the pages that sell the product.
 *
 * Search Console shows the non-brand demand landing on PO matching and
 * customs, and the tools are built to rank for exactly those searches — but
 * a tool page that links only to its hub and the legal pages is a dead end
 * for the visitor and for Google. Each tool declares its use case and guide
 * in the registry (`related`, English slugs); this module resolves them per
 * language in both directions, so the pairing is declared once.
 */

export interface RelatedLink {
  href: string;
  label: string;
}

/** The use case and guide a tool page should send readers to. */
export function pagesForTool(id: LiteToolId, locale: Locale): { useCase?: RelatedLink; guide?: RelatedLink } {
  const rel = LITE_TOOLS[id].related;
  if (!rel) return {};
  const out: { useCase?: RelatedLink; guide?: RelatedLink } = {};
  if (rel.useCase) {
    if (locale === "es") {
      const es = USE_CASES_ES.find((u) => u.slug === rel.useCase);
      if (es) out.useCase = { href: esUseCasePath(es), label: es.label };
    } else {
      const en = USE_CASES.find((u) => u.slug === rel.useCase);
      if (en) out.useCase = { href: `/use-cases/${en.slug}`, label: en.label };
    }
  }
  if (rel.guide) {
    if (locale === "es") {
      const es = GUIDE_ES_BY_SLUG[rel.guide];
      if (es) out.guide = { href: esGuidePath(es), label: es.h1 };
    } else {
      const en = GUIDES.find((g) => g.slug === rel.guide);
      if (en) out.guide = { href: `/guides/${en.slug}`, label: en.h1 };
    }
  }
  return out;
}

function toolLink(id: LiteToolId, locale: Locale): RelatedLink {
  return { href: LITE_TOOLS[id].paths[locale], label: TOOL_COPY[id][locale].label };
}

/** Free tools to offer on a use-case page (English slug). */
export function toolsForUseCase(slug: string, locale: Locale): RelatedLink[] {
  return LITE_TOOL_IDS.filter((id) => LITE_TOOLS[id].related?.useCase === slug).map((id) => toolLink(id, locale));
}

/** Free tools to offer on a guide (English slug). */
export function toolsForGuide(slug: string, locale: Locale): RelatedLink[] {
  return LITE_TOOL_IDS.filter((id) => LITE_TOOLS[id].related?.guide === slug).map((id) => toolLink(id, locale));
}
