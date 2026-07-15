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
  const { cols, selection } = useSheet();

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
    for (let c = 0; c < cols; c++) {
      fillers.push(
        <div
          key={`f${r}-${c}`}
          className="sheet-cell sheet-empty"
          style={{ gridColumn: c + 2, gridRow: r + 1 }}
          aria-hidden
        />
      );
    }
  }

  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledby}
      className={"sheet-section " + className}
      style={{ "--rows": rows } as React.CSSProperties}
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
