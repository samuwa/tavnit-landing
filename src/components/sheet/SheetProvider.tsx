"use client";

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";

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
