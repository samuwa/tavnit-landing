"use client";

import { ReactNode, createContext, useContext } from "react";
import { useSheet, colLetter } from "./SheetProvider";

/* A SheetSection is one horizontal band of the workbook: a CSS grid that
   shares the global column template, draws its own gridlines, prints
   continuous row numbers down the left gutter, and fills any cell not
   covered by content with an empty paper cell — so the whole page reads as
   real graph paper. Content <Cell>s are placed on top via grid coordinates. */

interface SectionCtx {
  startRow: number;
  rows: number;
}
const SectionContext = createContext<SectionCtx>({ startRow: 1, rows: 1 });
export function useSection() {
  return useContext(SectionContext);
}

export default function SheetSection({
  id,
  startRow,
  rows,
  children,
  ariaLabelledby,
  className = "",
}: {
  id: string;
  startRow: number;
  rows: number;
  children: ReactNode;
  ariaLabelledby?: string;
  className?: string;
}) {
  const { cols, selection, select } = useSheet();

  const gutter: ReactNode[] = [];
  for (let i = 0; i < rows; i++) {
    const n = startRow + i;
    const hot = selection && n >= selection.rowStart && n <= selection.rowEnd;
    gutter.push(
      <div
        key={"g" + n}
        className={"sheet-cell sheet-rowhead" + (hot ? " hot" : "")}
        style={{ gridColumn: 1, gridRow: i + 1 }}
        aria-hidden
      >
        {n}
      </div>
    );
  }

  const fillers: ReactNode[] = [];
  for (let r = 0; r < rows; r++) {
    const absRow = startRow + r;
    for (let c = 0; c < cols; c++) {
      const col = c + 1;
      const selEmpty =
        selection &&
        selection.rowStart === absRow &&
        selection.rowEnd === absRow &&
        selection.colStart === col &&
        selection.colEnd === col;
      fillers.push(
        <div
          key={`f${r}-${c}`}
          className={"sheet-cell sheet-empty" + (selEmpty ? " is-selected" : "")}
          style={{ gridColumn: c + 2, gridRow: r + 1 }}
          data-cell=""
          data-r={absRow}
          data-c={col}
          data-rspan={1}
          data-cspan={1}
          data-kind="empty"
        />
      );
    }
  }

  // Clicking an empty graph-paper cell selects it (1×1).
  const onGridClick = (e: React.MouseEvent) => {
    const t = (e.target as HTMLElement).closest<HTMLElement>('[data-cell][data-kind="empty"]');
    if (!t) return;
    const col = Number(t.dataset.c);
    const absRow = Number(t.dataset.r);
    select({
      ref: colLetter(col) + absRow,
      formula: "",
      colStart: col,
      colEnd: col,
      rowStart: absRow,
      rowEnd: absRow,
    });
  };

  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledby}
      className={"sheet-section " + className}
      style={{ "--rows": rows } as React.CSSProperties}
      onClick={onGridClick}
    >
      <SectionContext.Provider value={{ startRow, rows }}>
        {gutter}
        {fillers}
        {children}
      </SectionContext.Provider>
    </section>
  );
}

/* Re-export for authoring convenience */
export { colLetter };
