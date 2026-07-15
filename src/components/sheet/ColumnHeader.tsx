"use client";

import { useSheet, colLetter } from "./SheetProvider";

/* Sticky column-header row (the A / B / C … letters), pinned under the nav
   and formula bar. Uses the same grid template as every SheetSection so the
   letters line up with the columns below. The letter(s) covering the
   selected cell light up gold. */

export default function ColumnHeader() {
  const { cols, selection } = useSheet();

  const letters = [];
  for (let i = 1; i <= cols; i++) {
    const hot = selection && i >= selection.colStart && i <= selection.colEnd;
    letters.push(
      <div key={i} className={"sheet-colhead" + (hot ? " hot" : "")}>
        {colLetter(i)}
      </div>
    );
  }

  return (
    <div className="sheet-colheader" aria-hidden>
      <div className="sheet-corner" />
      {letters}
    </div>
  );
}
