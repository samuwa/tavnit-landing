import type { SplitSegment } from "@/lib/lite/product";

/** What the page sees of a Splitter result, and how a cut file is named. */

export interface SegmentView {
  index: number;
  title: string | null;
  type: string | null;
  description: string | null;
  reason: string | null;
  from: number | null;
  to: number | null;
  hasFile: boolean;
}

export function toView(segments: SplitSegment[] | null): SegmentView[] {
  return (segments ?? []).map((s, i) => ({
    index: i,
    title: s.title ?? null,
    type: s.matched_doc_title ?? null,
    description: s.description ?? null,
    reason: s.reason ?? null,
    from: typeof s.start_page === "number" ? s.start_page : null,
    to: typeof s.end_page === "number" ? s.end_page : null,
    hasFile: typeof s.file_path === "string" && s.file_path.length > 0,
  }));
}

export function segmentName(base: string, index: number, type: string | null, ext: string): string {
  const stem = base.replace(/\.[^.]*$/, "").replace(/[^\p{L}\p{N} ._-]/gu, "").trim() || "document";
  const kind = (type || "").replace(/[^\p{L}\p{N} _-]/gu, "").trim();
  return `${stem} - ${String(index + 1).padStart(2, "0")}${kind ? ` ${kind}` : ""}.${ext}`.slice(0, 120);
}
