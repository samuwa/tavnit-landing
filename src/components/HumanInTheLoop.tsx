"use client";

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

const highlights = [
  {
    icon: BellRing,
    title: "Named reviewers",
    desc: "Assign reviewers per flow — they get an email the moment a run needs eyes.",
  },
  {
    icon: PencilLine,
    title: "Edit in place",
    desc: "Correct cells, add rows, or fix columns right in the review screen — no re-processing.",
  },
  {
    icon: SlidersHorizontal,
    title: "Review only what needs it",
    desc: "Pause every run, or let Cleaner rules trigger review only when a value looks off.",
  },
  {
    icon: History,
    title: "Append-only audit trail",
    desc: "Every view, edit, approval, and rejection is recorded permanently. Nothing changes silently.",
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
    <div className="glass-card rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/30">
      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-5 py-3 bg-white/5 border-b border-white/10">
        <div className="min-w-0">
          <div className="text-xs font-bold text-white truncate">Invoice_2043.pdf</div>
          <div className="text-[10px] text-gray-500">Run #4128 · Flow: Supplier invoices</div>
        </div>
        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-[10px] font-bold uppercase tracking-wider flex-shrink-0">
          Awaiting approval
        </span>
      </div>

      {/* Editable grid */}
      <div className="p-4 sm:p-5 bg-[#0d0d20]/60">
        <div className="rounded-lg border border-white/10 overflow-hidden text-[11px] font-mono">
          <div className="grid grid-cols-3 bg-white/5 text-gray-500 font-sans font-bold text-[10px] uppercase tracking-wider">
            <div className="px-3 py-2">Vendor</div>
            <div className="px-3 py-2">Invoice #</div>
            <div className="px-3 py-2">Total</div>
          </div>
          <div className="grid grid-cols-3 border-t border-white/5 text-gray-300">
            <div className="px-3 py-2 truncate">Acme Corp</div>
            <div className="px-3 py-2 truncate">INV-2043</div>
            <div className="px-3 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-sm">
              <span className="text-gray-600 line-through mr-1.5">1,240.00</span>
              <span className="text-emerald-300">1,420.00</span>
            </div>
          </div>
          <div className="grid grid-cols-3 border-t border-white/5 text-gray-400">
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
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-lg bg-emerald-500/90 text-white text-xs font-bold pointer-events-none"
          >
            <Check size={14} />
            Approve run
          </button>
          <button
            tabIndex={-1}
            aria-hidden="true"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg border border-red-500/30 text-red-400 text-xs font-semibold pointer-events-none"
          >
            <X size={14} />
            Reject
          </button>
        </div>
      </div>

      {/* Audit trail */}
      <div className="px-4 sm:px-5 py-3.5 border-t border-white/10 bg-black/30">
        <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2.5">
          Audit trail · append-only
        </div>
        <div className="space-y-1.5">
          {auditEvents.map((e, i) => (
            <motion.div
              key={e.label}
              className="flex items-center gap-2.5 text-[11px]"
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.15 }}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                  e.approved
                    ? "bg-emerald-400"
                    : e.edit
                      ? "bg-amber-400"
                      : "bg-[#667eea]/60"
                }`}
              />
              <span className={e.approved ? "text-emerald-300 font-semibold" : "text-gray-400"}>
                {e.label}
              </span>
              <span className="text-gray-600 ml-auto font-mono">{e.time}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HumanInTheLoop() {
  return (
    <section
      className="py-16 md:py-24 relative overflow-hidden"
      id="human-in-the-loop"
      aria-labelledby="hitl-heading"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Review demo — first on desktop, second on mobile */}
          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            aria-hidden="true"
          >
            <ReviewDemo />
          </motion.div>

          {/* Copy */}
          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-5">
              <ClipboardCheck size={14} />
              Human in the Loop
            </div>
            <h2
              id="hitl-heading"
              className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight"
            >
              AI does the work.
              <br />
              Your team has the <span className="gradient-text">final say</span>.
            </h2>
            <p className="text-base md:text-lg text-gray-400 mb-8 max-w-[480px]">
              Turn on review for any flow and runs pause before anything moves
              downstream. Reviewers fix mistakes in place and approve with one
              click — with a complete record of who did what.
            </p>

            <div className="space-y-5">
              {highlights.map((h) => (
                <div key={h.title} className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0">
                    <h.icon size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm md:text-base font-bold text-white mb-0.5">
                      {h.title}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
                      {h.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
