"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FileText } from "lucide-react";
import { SHEET_SECTIONS } from "./sheetSections";
import useActiveSection from "./useActiveSection";
import { useViewMode } from "./view/ViewModeProvider";

/* The bottom sheet-tab bar is the spreadsheet's navigator: brand on the left,
   the scrollable section tabs in the middle, and the primary actions
   (view-as-document toggle, Get Started) pinned on the right — plus the
   status bar. This replaces a top nav entirely, keeping the view on-theme. */

export default function SheetTabs() {
  const active = useActiveSection();
  const { toggle } = useViewMode();
  const barRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const lastUserInteraction = useRef(0);
  const [plusNote, setPlusNote] = useState(false);
  const plusTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Don't auto-scroll the bar out from under a finger/wheel that's using it
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const mark = () => {
      lastUserInteraction.current = Date.now();
    };
    bar.addEventListener("pointerdown", mark, { passive: true });
    bar.addEventListener("touchstart", mark, { passive: true });
    bar.addEventListener("wheel", mark, { passive: true });
    return () => {
      bar.removeEventListener("pointerdown", mark);
      bar.removeEventListener("touchstart", mark);
      bar.removeEventListener("wheel", mark);
    };
  }, []);

  // Keep the active tab visible inside the horizontally scrollable bar
  useEffect(() => {
    const bar = barRef.current;
    const tab = tabRefs.current[active];
    if (!bar || !tab) return;
    if (Date.now() - lastUserInteraction.current < 1500) return;
    const left = tab.offsetLeft;
    const right = left + tab.offsetWidth;
    if (left < bar.scrollLeft) {
      bar.scrollTo({ left: left - 24, behavior: "smooth" });
    } else if (right > bar.scrollLeft + bar.clientWidth) {
      bar.scrollTo({ left: right - bar.clientWidth + 24, behavior: "smooth" });
    }
  }, [active]);

  useEffect(() => {
    return () => {
      if (plusTimer.current) clearTimeout(plusTimer.current);
    };
  }, []);

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onPlus = () => {
    setPlusNote(true);
    if (plusTimer.current) clearTimeout(plusTimer.current);
    plusTimer.current = setTimeout(() => setPlusNote(false), 2200);
  };

  const section = SHEET_SECTIONS[active] ?? SHEET_SECTIONS[0];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* "+" easter-egg note */}
      {plusNote && (
        <div className="absolute -top-9 right-3 bg-[#0E1C2B] text-[#E6F6F0] font-mono text-[11px] px-3 py-2 rounded-md shadow-lg">
          =NEW_SHEET()&nbsp;&nbsp;<span className="text-[#8FA1B6]">{"// your data would live here"}</span>
        </div>
      )}

      {/* Tab / toolbar row */}
      <div className="flex items-stretch bg-[#EDEFF2] border-t border-[#C9CFD8] h-[40px]">
        {/* Brand */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex-none flex items-center gap-2 pl-3 pr-3 border-r border-[#C9CFD8] hover:bg-[#E4E7EC] transition-colors"
          aria-label="Tavnit — back to top"
        >
          <Image src="/assets/tavnit_logo.png" alt="Tavnit" width={150} height={52} className="h-5 w-auto" priority />
        </button>

        {/* Scrollable section tabs */}
        <div
          ref={barRef}
          className="flex items-stretch overflow-x-auto mobile-carousel [scrollbar-width:none] flex-1 min-w-0"
        >
          {SHEET_SECTIONS.map((s, i) => (
            <button
              key={s.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              onClick={() => goTo(s.id)}
              className={`flex items-center gap-[7px] px-4 text-[13px] whitespace-nowrap border-r border-[#C9CFD8] cursor-pointer transition-colors ${
                i === active
                  ? "bg-[#FBFBF9] text-[#0E1C2B] font-semibold shadow-[inset_0_2px_0_#FFC53D]"
                  : "text-[#6B7686] hover:text-[#0E1C2B] bg-transparent"
              }`}
              aria-current={i === active ? "true" : undefined}
            >
              <span
                className={`w-2 h-2 rounded-[2px] ${i === active ? "bg-[#FFC53D]" : "bg-[#C9CFD8]"}`}
                aria-hidden
              />
              {s.tab}
            </button>
          ))}
          <button
            onClick={onPlus}
            className="flex items-center px-4 text-[#C9CFD8] font-bold text-[13px] hover:text-[#6B7686] transition-colors"
            aria-label="New sheet"
          >
            ＋
          </button>
        </div>

        {/* Pinned actions */}
        <div className="flex-none flex items-center gap-2 px-2 border-l border-[#C9CFD8] bg-[#EDEFF2]">
          <Link
            href="/docs"
            className="hidden md:inline-flex items-center px-2 text-[13px] text-[#6B7686] hover:text-[#0E1C2B] transition-colors"
          >
            Docs
          </Link>
          <button
            onClick={toggle}
            title="View the source document"
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-white text-[#1B2E44] text-[12.5px] font-semibold shadow-[inset_0_0_0_1px_#C9CFD8] hover:bg-[#FFF6DE] hover:shadow-[inset_0_0_0_1px_#0E1C2B] transition-all"
          >
            <FileText size={14} />
            <span className="hidden sm:inline">Document</span>
          </button>
          <Link
            href="https://app.tavnit.io"
            className="inline-flex items-center px-3 py-1.5 rounded-md bg-[#FFC53D] text-[#0E1C2B] text-[12.5px] font-semibold shadow-[0_2px_0_#B9820A] hover:brightness-105 active:translate-y-px active:shadow-none transition-all"
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Status bar */}
      <div className="hidden sm:flex items-center gap-5 bg-[#0E1C2B] text-[#8FA1B6] h-[26px] px-4 font-mono text-[11px]">
        <span>
          Cell: <b className="text-[#CBD6E3] font-medium">{section.cellRef}</b>
        </span>
        <span>
          Sum: <b className="text-[#CBD6E3] font-medium">∞</b>
        </span>
        <span>
          Count: <b className="text-[#CBD6E3] font-medium">{active + 1}/{SHEET_SECTIONS.length}</b>
        </span>
        <span className="flex-1" />
        <span>Tavnit • documents → data • © 2026</span>
      </div>
    </div>
  );
}
