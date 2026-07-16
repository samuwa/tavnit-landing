"use client";

import { ReactNode, KeyboardEvent } from "react";
import { useSheet, scaleColumns, colLetter } from "./SheetProvider";
import { useSection } from "./SheetSection";

/* A content cell (optionally a merged range). Placed with a 12-base column
   start `c` and 12-base `span`, plus a section-local row `r` and `rowSpan`.
   Clicking it selects the cell: the formula bar shows its ref + formula and
   its column letters / row numbers light up. */

export interface CellProps {
  c?: number;         // 1-based start column, 12-base model (default 1)
  span?: number;      // width in 12ths (default 12 = full band)
  r: number;          // 1-based row within the section
  rowSpan?: number;   // height in rows (default 1)
  formula?: string;   // shown in the formula bar when selected
  variant?: string;   // extra classes: cell kind (see globals.css .k-*)
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
  interactive?: boolean; // if false, not focusable/selectable (default true)
  as?: "div";
  ariaLabel?: string;
}

export default function Cell({
  c = 1,
  span = 12,
  r,
  rowSpan = 1,
  formula,
  variant = "",
  className = "",
  children,
  onClick,
  interactive = true,
  ariaLabel,
}: CellProps) {
  const { cols, selection, select } = useSheet();
  const { startRow } = useSection();

  const { start, span: gridSpan } = scaleColumns(c, span, cols);
  const absRow = startRow + r - 1;
  const ref = colLetter(start) + absRow;
  const isSelected =
    selection &&
    selection.rowStart === absRow &&
    selection.colStart === start &&
    selection.rowEnd === absRow + rowSpan - 1 &&
    selection.colEnd === start + gridSpan - 1;

  const doSelect = () => {
    if (interactive) {
      select({
        ref,
        formula: formula ?? `=${colLetter(start)}${absRow}`,
        colStart: start,
        colEnd: start + gridSpan - 1,
        rowStart: absRow,
        rowEnd: absRow + rowSpan - 1,
      });
    }
    onClick?.();
  };

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      doSelect();
    }
  };

  return (
    <div
      className={
        "sheet-cell k-cell " +
        variant +
        " " +
        className +
        (isSelected ? " is-selected" : "")
      }
      style={{
        gridColumn: `${start + 1} / span ${gridSpan}`,
        gridRow: `${r} / span ${rowSpan}`,
      }}
      data-ref={ref}
      data-cell={interactive ? "" : undefined}
      data-r={absRow}
      data-c={start}
      data-rspan={rowSpan}
      data-cspan={gridSpan}
      data-kind="content"
      data-formula={formula ?? `=${colLetter(start)}${absRow}`}
      tabIndex={interactive ? 0 : undefined}
      role={interactive ? "gridcell" : undefined}
      aria-label={ariaLabel}
      onClick={doSelect}
      onKeyDown={interactive ? onKey : undefined}
    >
      {children}
    </div>
  );
}
