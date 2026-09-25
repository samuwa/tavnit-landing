"use client";

import { useEffect, useRef } from "react";
import { Check, FileSpreadsheet, X } from "lucide-react";
import type { ToolCopy } from "@/lib/lite/copy";
import type { Locale } from "@/lib/locale";
import WhatNext from "@/components/lite/WhatNext";

/**
 * Shown once, right after a download. Two parts, in that order: the receipt
 * (what was downloaded, where it went), then "and then what?" with the
 * diagram and the way into the product. Closing is the corner X, Escape or
 * a click outside: a "stay here" button next to the two calls to action
 * competed with them and read like a third option.
 */
export default function AfterDownload({
  open,
  onClose,
  copy,
  locale,
  lead,
  downloaded,
  fileName,
  rows,
  columns,
  lineFields,
}: {
  open: boolean;
  onClose: () => void;
  copy: ToolCopy;
  locale: Locale;
  /** The lead under "and then what?", already filled. */
  lead: string;
  /** Name of the file that just downloaded, when known. */
  downloaded: string | null;
  fileName: string;
  rows: number;
  columns?: string[];
  lineFields?: string[];
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      aria-labelledby="lite-after-title"
      className="lite m-auto max-h-[92vh] w-[min(94vw,880px)] overflow-y-auto rounded-2xl border border-[var(--lite-line)] bg-white p-0 shadow-2xl backdrop:bg-[#1c2321]/60 backdrop:backdrop-blur-sm open:animate-[lite-pop_.2s_ease-out]"
      style={{ backgroundImage: "none" }}
    >
      {/* the receipt */}
      <div className="sticky top-0 z-10 flex items-center gap-3 border-b border-[var(--lite-line)] bg-white/95 px-6 py-4 backdrop-blur sm:px-8">
        <span className="lite-brand grid h-9 w-9 shrink-0 place-items-center rounded-full text-white shadow-sm shadow-[#3b82f6]/30">
          <Check size={18} strokeWidth={2.5} aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <p id="lite-after-title" className="font-heading text-base font-bold leading-tight">
            {copy.after.title}
          </p>
          {downloaded && (
            <p className="mt-0.5 flex min-w-0 items-center gap-1.5 text-xs text-[var(--lite-muted)]">
              <FileSpreadsheet size={13} className="shrink-0 text-[var(--lite-blue)]" aria-hidden />
              <span className="truncate font-medium text-[var(--lite-ink)]">{downloaded}</span>
              <span className="hidden shrink-0 sm:inline">· {copy.after.saved}</span>
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label={copy.after.close}
          className="grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-lg text-[var(--lite-muted)] transition-colors hover:bg-[#f3f6fa] hover:text-[var(--lite-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lite-blue)]/50"
        >
          <X size={18} aria-hidden />
        </button>
      </div>

      {/* and then what? */}
      <div className="px-6 pb-7 pt-6 sm:px-8 sm:pb-8">
        {open && (
          <WhatNext
            copy={copy.next}
            locale={locale}
            fileName={fileName}
            rows={rows}
            compact
            heading={copy.next.heading}
            lead={lead}
            columns={columns}
            lineFields={lineFields}
          />
        )}
      </div>
    </dialog>
  );
}
