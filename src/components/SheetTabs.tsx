"use client";

import { useEffect, useRef, useState } from "react";
import { SHEET_SECTIONS } from "./sheetSections";
import useActiveSection from "./useActiveSection";

export default function SheetTabs() {
  const active = useActiveSection();
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

      {/* Sheet tabs */}
      <div
        ref={barRef}
        className="flex items-stretch bg-[#EDEFF2] border-t border-[#C9CFD8] h-[38px] pl-2 overflow-x-auto mobile-carousel [scrollbar-width:none]"
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
