"use client";

import { useSheet } from "./SheetProvider";
import { SHEET_SECTIONS } from "../sheetSections";
import useActiveSection from "../useActiveSection";

/* The formula bar: a name box (current cell reference), the fx marker, and
   the formula. When a cell is selected it shows that cell's ref + formula;
   otherwise it falls back to the section currently in view, so it stays
   alive as you scroll. */

function FormulaText({ formula }: { formula: string }) {
  const idx = formula.indexOf("//");
  if (idx === -1) return <>{formula}</>;
  return (
    <>
      {formula.slice(0, idx)}
      <span className="text-[#6B7686]">{formula.slice(idx)}</span>
    </>
  );
}

export default function FormulaBar() {
  const { selection } = useSheet();
  const active = useActiveSection();
  const fallback = SHEET_SECTIONS[active] ?? SHEET_SECTIONS[0];

  const ref = selection ? selection.ref : fallback.cellRef;
  const formula = selection ? selection.formula : fallback.formula;

  return (
    <div className="sheet-formulabar">
      <div className="sheet-namebox">{ref}</div>
      <div className="sheet-fx">fx</div>
      <div className="sheet-formula">
        <span className="truncate">
          <FormulaText formula={formula} />
        </span>
      </div>
    </div>
  );
}
