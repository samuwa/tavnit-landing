"use client";

import { createContext, useContext, useEffect, useRef, useState, useCallback, ReactNode } from "react";

/* The whole landing page is rendered as one workbook. This provider holds
   the currently-selected cell (drives the formula bar, column-letter and
   row-number highlights) and the responsive content-column count. Authors
   always place cells in a 12-column model; the framework rescales spans to
   the active column count. */

export interface Selection {
  ref: string;        // e.g. "C14"
  formula: string;    // playful =FORMULA() shown in the formula bar
  colStart: number;   // 1-based, in the ACTIVE column count
  colEnd: number;
  rowStart: number;   // absolute row number
  rowEnd: number;
}

interface SheetCtx {
  cols: number;
  selection: Selection | null;
  select: (s: Selection) => void;
}

const Ctx = createContext<SheetCtx>({
  cols: 12,
  selection: null,
  select: () => {},
});

export function useSheet() {
  return useContext(Ctx);
}

function columnsForWidth(w: number): number {
  if (w < 640) return 6;
  if (w < 1024) return 8;
  return 12;
}

export default function SheetProvider({ children }: { children: ReactNode }) {
  const [cols, setCols] = useState(12);
  const [selection, setSelection] = useState<Selection | null>(null);

  useEffect(() => {
    const onResize = () => setCols(columnsForWidth(window.innerWidth));
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const select = useCallback((s: Selection) => setSelection(s), []);

  // Latest selection/cols for the (stable) keyboard handler.
  const selRef = useRef<Selection | null>(selection);
  selRef.current = selection;
  const colsRef = useRef(cols);
  colsRef.current = cols;

  /* Move the selection to the cell covering absolute (R, C): prefer a content
     cell, else the empty cell at that exact coordinate. Scrolls it into view. */
  const moveTo = useCallback((R: number, C: number) => {
    const arr = Array.from(document.querySelectorAll<HTMLElement>("[data-cell]"));
    const covers = (el: HTMLElement) => {
      const r = Number(el.dataset.r);
      const c = Number(el.dataset.c);
      const rs = Number(el.dataset.rspan || 1);
      const cs = Number(el.dataset.cspan || 1);
      return R >= r && R <= r + rs - 1 && C >= c && C <= c + cs - 1;
    };
    const el =
      arr.find((x) => x.dataset.kind === "content" && covers(x)) ||
      arr.find((x) => x.dataset.kind === "empty" && Number(x.dataset.r) === R && Number(x.dataset.c) === C) ||
      null;
    if (!el) return;
    const r = Number(el.dataset.r);
    const c = Number(el.dataset.c);
    const rs = Number(el.dataset.rspan || 1);
    const cs = Number(el.dataset.cspan || 1);
    setSelection({
      ref: el.dataset.ref || colLetter(c) + r,
      formula: el.dataset.formula ?? "",
      colStart: c,
      colEnd: c + cs - 1,
      rowStart: r,
      rowEnd: r + rs - 1,
    });
    el.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, []);

  // Arrow-key navigation across cells (once a cell is selected).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const sel = selRef.current;
      if (!sel) return;
      const ae = document.activeElement as HTMLElement | null;
      if (ae && (ae.tagName === "INPUT" || ae.tagName === "TEXTAREA" || ae.isContentEditable)) return;
      let R = 0;
      let C = 0;
      switch (e.key) {
        case "ArrowRight": R = sel.rowStart; C = sel.colEnd + 1; break;
        case "ArrowLeft": R = sel.rowStart; C = sel.colStart - 1; break;
        case "ArrowDown": R = sel.rowEnd + 1; C = sel.colStart; break;
        case "ArrowUp": R = sel.rowStart - 1; C = sel.colStart; break;
        default: return;
      }
      e.preventDefault();
      if (C < 1 || C > colsRef.current || R < 1) return;
      moveTo(R, C);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [moveTo]);

  return <Ctx.Provider value={{ cols, selection, select }}>{children}</Ctx.Provider>;
}

/* ---- shared geometry helpers (12-base → active-column grid) ---- */

export const TOTAL_MODEL_COLS = 12;

/** Column letter for a 1-based active-column index. */
export function colLetter(i: number): string {
  return String.fromCharCode(64 + i);
}

/** Convert a 12-base start/span into active-column grid coordinates.
    Returns { start, span } in the ACTIVE column count (1-based, content
    columns only — the caller adds +1 for the gutter track). */
export function scaleColumns(c12: number, span12: number, cols: number) {
  const f0 = (c12 - 1) / TOTAL_MODEL_COLS;
  const f1 = (c12 - 1 + span12) / TOTAL_MODEL_COLS;
  const start = Math.min(Math.max(Math.round(f0 * cols) + 1, 1), cols);
  const endExclusive = Math.min(Math.max(Math.round(f1 * cols) + 1, start + 1), cols + 1);
  return { start, span: Math.max(1, endExclusive - start) };
}
