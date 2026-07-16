"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Search, Check } from "lucide-react";

/* ══════════════════════════════════════════
   Shared demo-loop hook + card chrome
   Matches the Extraction / HITL / Agents showcase cards.
   ══════════════════════════════════════════ */

function useDemoLoop(lastStep: number, stepMs = 1200, holdMs = 3200) {
  const [step, setStep] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  useEffect(() => {
    if (!inView || reducedMotion) return;
    const delay = step >= lastStep ? holdMs : stepMs;
    const t = setTimeout(() => {
      setStep((s) => (s >= lastStep ? 0 : s + 1));
    }, delay);
    return () => clearTimeout(t);
  }, [inView, step, reducedMotion, lastStep, stepMs, holdMs]);

  return { ref, step: reducedMotion ? lastStep : step };
}

function StatusPill({ label, tone }: { label: string; tone: "working" | "done" }) {
  return tone === "done" ? (
    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E6F6F0] border border-[#17A67B]/40 text-[#0C6B4C] text-[10px] font-bold uppercase tracking-wider flex-shrink-0">
      {label}
    </span>
  ) : (
    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FFF6DE] border border-[#FFC53D]/50 text-[#B9820A] text-[10px] font-bold uppercase tracking-wider flex-shrink-0">
      <span className="w-1.5 h-1.5 rounded-full bg-[#B9820A] animate-pulse" />
      {label}
    </span>
  );
}

function DemoShell({
  title,
  subtitle,
  status,
  tone,
  footer,
  children,
  demoRef,
}: {
  title: string;
  subtitle: string;
  status: string;
  tone: "working" | "done";
  footer: React.ReactNode;
  children: React.ReactNode;
  demoRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      ref={demoRef}
      className="glass-card rounded-lg overflow-hidden border border-[#C9CFD8] shadow-[0_8px_24px_rgba(14,28,43,0.08)] w-full h-[360px] flex flex-col"
      aria-hidden="true"
    >
      <div className="flex items-center justify-between px-4 py-3 bg-[#F0F2F5] border-b border-[#E7E9EE] flex-shrink-0">
        <div className="min-w-0">
          <div className="text-xs font-bold text-[#0E1C2B] truncate">{title}</div>
          <div className="text-[10px] text-[#6B7686] truncate">{subtitle}</div>
        </div>
        <StatusPill label={status} tone={tone} />
      </div>
      <div className="flex-1 min-h-0 p-4 bg-white">{children}</div>
      <div className="px-4 py-2.5 border-t border-[#E7E9EE] bg-[#F0F2F5] text-[11px] flex items-center justify-between gap-2 flex-shrink-0">
        {footer}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   1 · Invoice Processing — the queue drains
   ══════════════════════════════════════════ */

const invoices = [
  { id: "INV-2047", vendor: "Acme Corp", total: 1420.0 },
  { id: "INV-2048", vendor: "Northwind", total: 863.2 },
  { id: "INV-2049", vendor: "Globex", total: 2410.75 },
  { id: "INV-2050", vendor: "Initech", total: 590.0 },
];

const money = (n: number) =>
  n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function InvoiceDemo() {
  const LAST = invoices.length + 1; // one step per invoice + done hold
  const { ref, step } = useDemoLoop(LAST);
  const processed = Math.min(step, invoices.length);
  const done = step >= LAST;
  const runningTotal = invoices.slice(0, processed).reduce((s, i) => s + i.total, 0);

  return (
    <DemoShell
      demoRef={ref}
      title="invoices@tavnit.flow"
      subtitle="Flow: Supplier invoices · Email trigger"
      status={done ? "Batch complete" : "Processing"}
      tone={done ? "done" : "working"}
      footer={
        <>
          <span className={done ? "text-[#0C6B4C] font-semibold" : "text-[#6B7686]"}>
            {done ? "✓" : ""} {processed} of {invoices.length} processed · 0 errors
          </span>
          <span className="font-mono text-[#1B2E44]">${money(runningTotal)}</span>
        </>
      }
    >
      <div className="grid grid-cols-[1fr_1.4fr] gap-3 h-full">
        {/* Inbox queue */}
        <div className="rounded-lg border border-[#E7E9EE] bg-[#FBFBF9] p-2.5 overflow-hidden">
          <div className="text-[9px] font-bold text-[#6B7686] uppercase tracking-widest mb-2">Inbox</div>
          <div className="space-y-1.5">
            {invoices.map((inv, i) => {
              const isDone = processed > i;
              const isCurrent = !done && processed === i;
              return (
                <div
                  key={inv.id}
                  className={`rounded-md border px-2 py-1.5 text-[10px] font-mono flex items-center justify-between transition-all duration-500 ${
                    isDone
                      ? "border-[#E7E9EE] bg-white text-[#6B7686] opacity-50"
                      : isCurrent
                        ? "border-[#FFC53D] bg-[#FFF6DE] text-[#0E1C2B]"
                        : "border-[#B4530E]/25 bg-[#FCEDE1] text-[#B4530E]"
                  }`}
                >
                  <span>{inv.id}</span>
                  {isDone ? (
                    <Check size={11} className="text-[#17A67B]" />
                  ) : isCurrent ? (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B9820A] animate-pulse" />
                  ) : (
                    <span className="text-[#B4530E]/60">·</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bucket table */}
        <div className="rounded-lg border border-[#E7E9EE] bg-white overflow-hidden flex flex-col">
          <div className="px-2.5 py-1.5 bg-[#F0F2F5] text-[9px] font-bold text-[#6B7686] uppercase tracking-widest">
            Bucket · Invoices
          </div>
          <div className="grid grid-cols-[1fr_auto] px-2.5 py-1 text-[9px] font-sans font-bold text-[#6B7686] uppercase tracking-wider border-b border-[#E7E9EE]">
            <span>Vendor</span>
            <span>Total</span>
          </div>
          <div className="divide-y divide-[#E7E9EE]">
            {invoices.map((inv, i) => (
              <div
                key={inv.id}
                className={`grid grid-cols-[1fr_auto] gap-2 px-2.5 py-[6.5px] text-[10.5px] font-mono transition-all duration-500 ${
                  processed > i ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                }`}
              >
                <span className="text-[#1B2E44] truncate">{inv.vendor}</span>
                <span className="text-[#0C6B4C]">${money(inv.total)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DemoShell>
  );
}

/* ══════════════════════════════════════════
   2 · Contract Analysis — ask the portfolio
   ══════════════════════════════════════════ */

const clauses = [
  { term: "parties", value: "Acme ↔ Vertex" },
  { term: "effective", value: "2026-01-01" },
  { term: "renewal", value: "Automatic" },
  { term: "term", value: "12 months" },
];

const queryResults = [
  { name: "MSA — Acme Corp", renews: "2026-07-30" },
  { name: "SaaS — Vertex Ltd", renews: "2026-08-15" },
  { name: "NDA — Globex Inc", renews: "2026-09-02" },
];

const QUERY = "renewal date in Q3";

export function ContractDemo() {
  /* steps 0-3: extract clauses · 4: type query · 5: results · 6: done hold */
  const LAST = 6;
  const { ref, step } = useDemoLoop(LAST, 1150);
  const querying = step >= 4;
  const results = step >= 5;
  const done = step >= LAST;

  return (
    <DemoShell
      demoRef={ref}
      title={querying ? "Bucket · Contracts" : "MSA_Acme_2026.pdf"}
      subtitle={querying ? "412 contracts indexed" : "Flow: Contract terms · 24 pages"}
      status={done ? "3 matches" : querying ? "Searching" : "Extracting"}
      tone={done ? "done" : "working"}
      footer={
        <>
          <span className={done ? "text-[#0C6B4C] font-semibold" : "text-[#6B7686]"}>
            {done ? "✓ 3 renewals found across 412 contracts" : querying ? "Querying portfolio…" : "Extracting key terms…"}
          </span>
          <span className="font-mono text-[#6B7686]">{done ? "AI Search" : `${Math.min(step, 4)}/4 terms`}</span>
        </>
      }
    >
      <AnimatePresence mode="wait">
        {!querying ? (
          /* Phase A — clause extraction */
          <motion.div
            key="extract"
            className="grid grid-cols-[1.2fr_1fr] gap-3 h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="rounded-lg border border-[#B4530E]/20 bg-[#FCEDE1] p-3 overflow-hidden">
              <div className="h-2 w-20 rounded bg-[#B4530E]/25 mb-3" />
              <div className="space-y-2">
                {clauses.map((c, i) => (
                  <div key={c.term} className="space-y-1">
                    <div
                      className={`h-1.5 rounded transition-all duration-500 ${
                        step > i ? "bg-[#FFC53D]" : "bg-[#B4530E]/15"
                      }`}
                      style={{ width: `${88 - i * 9}%` }}
                    />
                    <div className="h-1.5 w-3/5 rounded bg-[#B4530E]/15" />
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="text-[9px] font-bold text-[#6B7686] uppercase tracking-widest mb-2">Key terms</div>
              {clauses.map((c, i) => (
                <div
                  key={c.term}
                  className={`rounded-md border border-[#17A67B]/25 bg-[#E6F6F0] px-2.5 py-1.5 flex items-center justify-between text-[10.5px] font-mono transition-all duration-500 ${
                    step > i ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
                  }`}
                >
                  <span className="text-[#B9820A]">{c.term}</span>
                  <span className="text-[#1B2E44]">{c.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          /* Phase B — query the whole portfolio */
          <motion.div
            key="query"
            className="flex flex-col h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-2 rounded-lg border border-[#FFC53D] bg-[#FFF6DE] px-3 py-2 mb-3">
              <Search size={13} className="text-[#B9820A] flex-shrink-0" />
              <span className="font-mono text-[11px] text-[#0E1C2B]">
                {QUERY}
                {!results && <span className="animate-pulse text-[#B9820A]">▎</span>}
              </span>
            </div>
            <div className="space-y-1.5">
              {queryResults.map((r, i) => (
                <div
                  key={r.name}
                  className={`rounded-md border px-3 py-2 flex items-center justify-between text-[11px] transition-all duration-500 ${
                    results
                      ? "border-[#17A67B]/30 bg-[#E6F6F0] opacity-100 translate-y-0"
                      : "border-[#E7E9EE] bg-white opacity-0 translate-y-2"
                  }`}
                  style={{ transitionDelay: results ? `${i * 130}ms` : "0ms" }}
                >
                  <span className="text-[#1B2E44] truncate">{r.name}</span>
                  <span className="font-mono text-[#0C6B4C] flex-shrink-0">{r.renews}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </DemoShell>
  );
}

/* ══════════════════════════════════════════
   3 · Resume Extraction — every CV becomes the same clean record
   ══════════════════════════════════════════ */

const resumeFields = [
  { name: "name", value: "Maria Chen" },
  { name: "experience", value: "6 years" },
  { name: "education", value: "BSc Computer Science" },
];

const skills = [
  { label: "React", category: "Frontend", tone: "bg-[#E6F6F0] text-[#0C6B4C] border-[#17A67B]/30" },
  { label: "Node.js", category: "Backend", tone: "bg-[#FFF6DE] text-[#B9820A] border-[#FFC53D]/50" },
  { label: "SQL", category: "Data", tone: "bg-[#FCEDE1] text-[#B4530E] border-[#B4530E]/30" },
  { label: "Figma", category: "Design", tone: "bg-[#F0F2F5] text-[#1B2E44] border-[#C9CFD8]" },
];

export function ResumeDemo() {
  /* steps 0-2: fields extract · 3: skills found · 4: Cleaner categorizes · 5: saved + hold */
  const LAST = 5;
  const { ref, step } = useDemoLoop(LAST, 1250);
  const skillsFound = step >= 3;
  const categorized = step >= 4;
  const done = step >= LAST;

  return (
    <DemoShell
      demoRef={ref}
      title="CV_Maria_Chen.pdf"
      subtitle="Flow: Resume intake · Cleaner: skill categories"
      status={done ? "Saved" : categorized ? "Categorizing" : "Extracting"}
      tone={done ? "done" : "working"}
      footer={
        <>
          <span className={done ? "text-[#0C6B4C] font-semibold" : "text-[#6B7686]"}>
            {done ? "✓ Added to Bucket · Candidates" : "Same fields from every resume format…"}
          </span>
          <span className="font-mono text-[#6B7686]">resume 47 of 132</span>
        </>
      }
    >
      <div className="grid grid-cols-[1fr_1.5fr] gap-3 h-full">
        {/* Resume document */}
        <div className="rounded-lg border border-[#B4530E]/20 bg-[#FCEDE1] p-3 overflow-hidden">
          <div className="flex items-center gap-2 mb-3">
            <div
              className={`w-7 h-7 rounded-full flex-shrink-0 transition-colors duration-500 ${
                step >= 1 ? "bg-[#FFC53D]" : "bg-[#B4530E]/20"
              }`}
            />
            <div
              className={`h-2 w-16 rounded transition-colors duration-500 ${
                step >= 1 ? "bg-[#FFC53D]" : "bg-[#B4530E]/20"
              }`}
            />
          </div>
          <div className="space-y-2" aria-hidden="true">
            <div className={`h-1.5 w-full rounded transition-colors duration-500 ${step >= 2 ? "bg-[#FFC53D]" : "bg-[#B4530E]/15"}`} />
            <div className={`h-1.5 w-4/5 rounded transition-colors duration-500 ${step >= 2 ? "bg-[#FFC53D]" : "bg-[#B4530E]/15"}`} />
            <div className="h-1.5 w-3/5 rounded bg-[#B4530E]/15" />
            <div className="h-2 w-12 rounded bg-[#B4530E]/20 !mt-3" />
            <div className={`h-1.5 w-full rounded transition-colors duration-500 ${skillsFound ? "bg-[#FFC53D]" : "bg-[#B4530E]/15"}`} />
            <div className={`h-1.5 w-2/3 rounded transition-colors duration-500 ${skillsFound ? "bg-[#FFC53D]" : "bg-[#B4530E]/15"}`} />
            <div className="h-1.5 w-4/5 rounded bg-[#B4530E]/15" />
            <div className="h-1.5 w-1/2 rounded bg-[#B4530E]/15" />
          </div>
        </div>

        {/* Extracted record */}
        <div className="rounded-lg border border-[#E7E9EE] bg-white overflow-hidden flex flex-col">
          <div className="px-2.5 py-1.5 bg-[#F0F2F5] text-[9px] font-bold text-[#6B7686] uppercase tracking-widest">
            Extracted fields
          </div>
          <div className="divide-y divide-[#E7E9EE]">
            {resumeFields.map((f, i) => (
              <div
                key={f.name}
                className={`flex items-center justify-between gap-2 px-2.5 py-[6.5px] text-[10.5px] font-mono transition-all duration-500 ${
                  step > i ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                }`}
              >
                <span className="text-[#B9820A]">{f.name}</span>
                <span className="text-[#0C6B4C] truncate">{f.value}</span>
              </div>
            ))}
          </div>
          <div className="px-2.5 pt-2 pb-1 text-[9px] font-bold text-[#6B7686] uppercase tracking-widest flex items-center justify-between">
            <span>skills</span>
            <span
              className={`normal-case font-mono font-normal transition-opacity duration-500 ${
                categorized ? "text-[#0C6B4C] opacity-100" : "opacity-0"
              }`}
            >
              ✓ categorized by Cleaner
            </span>
          </div>
          <div className="px-2.5 pb-2.5 flex flex-wrap gap-1.5">
            {skills.map((s, i) => (
              <span
                key={s.label}
                className={`px-1.5 py-1 rounded border font-mono text-[9px] transition-all duration-500 ${
                  !skillsFound
                    ? "opacity-0 translate-y-1 border-[#E7E9EE] bg-[#F0F2F5] text-[#6B7686]"
                    : categorized
                      ? `opacity-100 translate-y-0 ${s.tone}`
                      : "opacity-100 translate-y-0 border-[#E7E9EE] bg-[#F0F2F5] text-[#6B7686]"
                }`}
                style={{ transitionDelay: skillsFound && !categorized ? `${i * 90}ms` : "0ms" }}
              >
                {s.label}
                <span
                  className={`ml-1 transition-all duration-500 ${
                    categorized ? "opacity-70 inline" : "opacity-0 hidden"
                  }`}
                >
                  · {s.category}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </DemoShell>
  );
}

/* ══════════════════════════════════════════
   4 · Expense Reports — receipt to reimbursed
   ══════════════════════════════════════════ */

const receipts = [
  { merchant: "Cafe Rio", amount: 18.4, category: "Meals", tone: "bg-[#FFF6DE] text-[#B9820A] border-[#FFC53D]/50" },
  { merchant: "Uber", amount: 32.75, category: "Travel", tone: "bg-[#E6F6F0] text-[#0C6B4C] border-[#17A67B]/30" },
  { merchant: "Office Depot", amount: 64.9, category: "Supplies", tone: "bg-[#FCEDE1] text-[#B4530E] border-[#B4530E]/30" },
];

export function ExpenseDemo() {
  /* steps 0-2: receipts process · 3: report ready · 4: done hold */
  const LAST = 4;
  const { ref, step } = useDemoLoop(LAST, 1250);
  const processed = Math.min(step, receipts.length);
  const reportReady = step >= 3;
  const done = step >= LAST;
  const total = receipts.slice(0, processed).reduce((s, r) => s + r.amount, 0);

  return (
    <DemoShell
      demoRef={ref}
      title="Expense report · March"
      subtitle="Flow: Receipts · Cleaner: auto-category"
      status={done ? "Approved" : reportReady ? "Review" : "Processing"}
      tone={done ? "done" : "working"}
      footer={
        <>
          <span className={done ? "text-[#0C6B4C] font-semibold" : "text-[#6B7686]"}>
            {done ? "✓ Report approved — saved to Bucket" : `${processed} of ${receipts.length} receipts captured`}
          </span>
          <span className="font-mono text-[#1B2E44]">${money(total)}</span>
        </>
      }
    >
      <div className="grid grid-cols-[1fr_1.5fr] gap-3 h-full">
        {/* Receipt stack */}
        <div className="space-y-2">
          <div className="text-[9px] font-bold text-[#6B7686] uppercase tracking-widest">Receipts</div>
          {receipts.map((r, i) => {
            const isDone = processed > i;
            const isCurrent = !reportReady && processed === i;
            return (
              <div
                key={r.merchant}
                className={`rounded-md border px-2.5 py-2 transition-all duration-500 ${
                  isDone
                    ? "border-[#E7E9EE] bg-white opacity-50"
                    : isCurrent
                      ? "border-[#FFC53D] bg-[#FFF6DE]"
                      : "border-[#B4530E]/25 bg-[#FCEDE1]"
                }`}
              >
                <div className="font-mono text-[10px] text-[#1B2E44] mb-1 truncate">{r.merchant.toUpperCase()} #{442 + i}</div>
                <div className="h-1 w-4/5 rounded bg-[#B4530E]/15 mb-1" />
                <div className="h-1 w-3/5 rounded bg-[#B4530E]/15" />
              </div>
            );
          })}
        </div>

        {/* Report rows */}
        <div className="rounded-lg border border-[#E7E9EE] bg-white overflow-hidden flex flex-col">
          <div className="px-2.5 py-1.5 bg-[#F0F2F5] text-[9px] font-bold text-[#6B7686] uppercase tracking-widest">
            Report lines
          </div>
          <div className="divide-y divide-[#E7E9EE]">
            {receipts.map((r, i) => (
              <div
                key={r.merchant}
                className={`flex items-center gap-2 px-2.5 py-[7px] text-[10.5px] font-mono transition-all duration-500 ${
                  processed > i ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                }`}
              >
                <span className="text-[#1B2E44] truncate flex-1">{r.merchant}</span>
                <span className={`px-1.5 py-0.5 rounded border text-[9px] font-bold flex-shrink-0 ${r.tone}`}>
                  {r.category}
                </span>
                <span className="text-[#1B2E44] w-[52px] text-right flex-shrink-0">${money(r.amount)}</span>
              </div>
            ))}
          </div>
          <div
            className={`mt-auto px-2.5 py-2 border-t border-[#E7E9EE] flex items-center justify-between text-[10.5px] font-mono transition-all duration-500 ${
              reportReady ? "opacity-100" : "opacity-30"
            }`}
          >
            <span className={reportReady ? "text-[#0C6B4C] font-bold" : "text-[#6B7686]"}>
              {done ? "✓ Approved" : "Total"}
            </span>
            <span className={reportReady ? "text-[#0C6B4C] font-bold" : "text-[#6B7686]"}>
              ${money(receipts.reduce((s, r) => s + r.amount, 0))}
            </span>
          </div>
        </div>
      </div>
    </DemoShell>
  );
}
