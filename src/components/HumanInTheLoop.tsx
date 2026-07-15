"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import {
  ClipboardCheck,
  BellRing,
  PencilLine,
  History,
  SlidersHorizontal,
  Check,
  X,
} from "lucide-react";
import SheetSection from "./sheet/SheetSection";
import Cell from "./sheet/Cell";

const highlights = [
  {
    icon: BellRing,
    title: "Named reviewers",
    desc: "Assign reviewers per flow — they get an email the moment a run needs eyes.",
    iconFormula: "=NOTIFY(reviewer)",
    formula: "=ASSIGN(reviewer, flow)",
  },
  {
    icon: PencilLine,
    title: "Edit in place",
    desc: "Correct cells, add rows, or fix columns right in the review screen — no re-processing.",
    iconFormula: "=EDIT(cell)",
    formula: "=EDIT(cell, inline=TRUE)",
  },
  {
    icon: SlidersHorizontal,
    title: "Review only what needs it",
    desc: "Pause every run, or let Cleaner rules trigger review only when a value looks off.",
    iconFormula: "=RULE()",
    formula: "=IF(value.looks_off, review, pass)",
  },
  {
    icon: History,
    title: "Append-only audit trail",
    desc: "Every view, edit, approval, and rejection is recorded permanently. Nothing changes silently.",
    iconFormula: "=LOG()",
    formula: "=APPEND.ONLY(audit_trail)",
  },
];

const auditEvents = [
  { label: "Reviewer notified", time: "09:41" },
  { label: "Maria opened the run", time: "09:52" },
  { label: "Cell edited · total_amount", time: "09:53", edit: true },
  { label: "Approved by Maria", time: "09:54", approved: true },
];

function ReviewDemo() {
  return (
    <div className="glass-card rounded-lg overflow-hidden border border-[#C9CFD8] shadow-[0_8px_24px_rgba(14,28,43,0.08)]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-5 py-3 bg-[#F0F2F5] border-b border-[#E7E9EE]">
        <div className="min-w-0">
          <div className="text-xs font-bold text-[#0E1C2B] truncate">Invoice_2043.pdf</div>
          <div className="text-[10px] text-[#6B7686]">Run #4128 · Flow: Supplier invoices</div>
        </div>
        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] bg-[#FFF6DE] border border-[#FFC53D]/50 text-[#B9820A] text-[10px] font-bold uppercase tracking-wider flex-shrink-0">
          Awaiting approval
        </span>
      </div>

      {/* Editable grid */}
      <div className="p-4 sm:p-5 bg-white">
        <div className="rounded-md border border-[#C9CFD8] overflow-hidden text-[11px] font-mono">
          <div className="grid grid-cols-3 bg-[#F0F2F5] text-[#6B7686] font-sans font-bold text-[10px] uppercase tracking-wider">
            <div className="px-3 py-2">Vendor</div>
            <div className="px-3 py-2">Invoice #</div>
            <div className="px-3 py-2">Total</div>
          </div>
          <div className="grid grid-cols-3 border-t border-[#E7E9EE] text-[#1B2E44]">
            <div className="px-3 py-2 truncate">Acme Corp</div>
            <div className="px-3 py-2 truncate">INV-2043</div>
            <div className="px-3 py-2 bg-[#E6F6F0] border border-[#17A67B]/40 rounded-sm">
              <span className="text-[#6B7686] line-through mr-1.5">1,240.00</span>
              <span className="text-[#0C6B4C]">1,420.00</span>
            </div>
          </div>
          <div className="grid grid-cols-3 border-t border-[#E7E9EE] text-[#6B7686]">
            <div className="px-3 py-2 truncate">Acme Corp</div>
            <div className="px-3 py-2 truncate">INV-2044</div>
            <div className="px-3 py-2">380.50</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2.5 mt-4">
          <button
            tabIndex={-1}
            aria-hidden="true"
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-md bg-[#17A67B] text-white text-xs font-bold shadow-[0_2px_0_#0C6B4C] pointer-events-none"
          >
            <Check size={14} />
            Approve run
          </button>
          <button
            tabIndex={-1}
            aria-hidden="true"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-md bg-white border border-[#B4530E]/40 text-[#B4530E] text-xs font-semibold pointer-events-none"
          >
            <X size={14} />
            Reject
          </button>
        </div>
      </div>

      {/* Audit trail */}
      <div className="px-4 sm:px-5 py-3.5 border-t border-[#E7E9EE] bg-[#F0F2F5]">
        <div className="font-mono text-[10px] font-bold text-[#6B7686] uppercase tracking-widest mb-2.5">
          Audit trail · append-only
        </div>
        <div className="divide-y divide-[#E7E9EE]">
          {auditEvents.map((e, i) => (
            <motion.div
              key={e.label}
              className="flex items-center gap-2.5 text-[11px] py-1.5"
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.15 }}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                  e.approved
                    ? "bg-[#17A67B]"
                    : e.edit
                      ? "bg-[#FFC53D]"
                      : "bg-[#C9CFD8]"
                }`}
              />
              <span className={e.approved ? "text-[#0C6B4C] font-semibold" : "text-[#1B2E44]"}>
                {e.label}
              </span>
              <span className="text-[#6B7686] ml-auto font-mono">{e.time}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const ROWS = 27;

export default function HumanInTheLoop({ startRow }: { startRow: number }) {
  return (
    <SheetSection
      id="human-in-the-loop"
      startRow={startRow}
      rows={ROWS}
      ariaLabelledby="hitl-heading"
    >
      {/* Eyebrow */}
      <Cell c={2} span={8} r={2} variant="k-eyebrow" formula="=HUMAN.IN.LOOP()">
        <motion.span
          className="inline-flex items-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <ClipboardCheck size={14} />
          Human in the Loop
        </motion.span>
      </Cell>

      {/* Heading */}
      <Cell c={2} span={10} r={3} rowSpan={3} variant="k-title" formula="=IF(reviewed, ship, hold)">
        <motion.h2
          id="hitl-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          AI does the work.
          <br />
          Your team has the <span className="gradient-text">final say</span>.
        </motion.h2>
      </Cell>

      {/* Body */}
      <Cell c={2} span={8} r={6} rowSpan={2} variant="k-sub" formula="=PAUSE(run, until=approved)">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Turn on review for any flow and runs pause before anything moves
          downstream. Reviewers fix mistakes in place and approve with one
          click — with a complete record of who did what.
        </motion.p>
      </Cell>

      {/* Feature rows */}
      {highlights.map((h, i) => {
        const fRow = 9 + i * 2;
        return (
          <Fragment key={h.title}>
            <Cell
              c={2}
              span={1}
              r={fRow}
              rowSpan={2}
              variant="k-clean"
              className="justify-center"
              formula={h.iconFormula}
            >
              <motion.span
                className="inline-flex items-center justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h.icon size={18} />
              </motion.span>
            </Cell>
            <Cell c={4} span={8} r={fRow} rowSpan={2} formula={h.formula}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-sm md:text-base font-bold text-[#0E1C2B] mb-0.5">
                  {h.title}
                </h3>
                <p className="text-xs md:text-sm text-[#6B7686] leading-relaxed">
                  {h.desc}
                </p>
              </motion.div>
            </Cell>
          </Fragment>
        );
      })}

      {/* Review demo */}
      <Cell c={2} span={10} r={18} rowSpan={10} variant="k-bare" interactive={false}>
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          aria-hidden="true"
        >
          <ReviewDemo />
        </motion.div>
      </Cell>
    </SheetSection>
  );
}
