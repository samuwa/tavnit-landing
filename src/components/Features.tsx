"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutGrid, Sparkles, GitBranch, Lightbulb,
  Database, Users, Code2, UserCheck, Bot, Plug, Check, Scissors,
} from "lucide-react";

/* ── Vignettes ──────────────────────────────────────────────
   One animated miniature per feature — a truthful sketch of
   what that part of the product actually does. Elements enter
   via .feat-cell with staggered animation-delay; the vignette
   remounts on selection so the sequence replays. */

const frame = "relative h-full overflow-hidden rounded-xl border border-white/10 bg-black/30 p-5 font-mono text-[11px]";
/* Centered variant for list-shaped vignettes so they don't top-anchor in the tall panel */
const frameC = `${frame} flex flex-col justify-center`;
const chip = "rounded-md border border-white/10 bg-white/[0.06] px-2 py-1 text-white/80";
const conf = "rounded px-1.5 py-0.5 text-[10px] font-semibold bg-emerald-500/15 text-emerald-400";

function ExtractionVignette() {
  const fields = [
    { k: "vendor", v: "Acme Corp", c: "99%" },
    { k: "invoice_number", v: "INV-2043", c: "98%" },
    { k: "date", v: "2026-03-15", c: "97%" },
    { k: "total", v: "1,420.00", c: "99%" },
  ];
  return (
    <div className={`${frame} grid grid-cols-2 gap-4`}>
      <div className="relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.03] p-3">
        <p className="text-white/45">invoice_2043.pdf</p>
        <div className="mt-3 space-y-2">
          {[100, 75, 90, 60, 85].map((w, i) => (
            <div key={i} className="h-1.5 rounded bg-white/15" style={{ width: `${w}%` }} />
          ))}
        </div>
        <div className="mt-4 space-y-2">
          {[80, 95, 70].map((w, i) => (
            <div key={i} className="h-1.5 rounded bg-white/10" style={{ width: `${w}%` }} />
          ))}
        </div>
        <div className="feat-scan" />
      </div>
      <div>
        <p className="text-white/45 uppercase tracking-wider text-[10px]">Extracted fields</p>
        <div className="mt-2 space-y-2">
          {fields.map((f, i) => (
            <div key={f.k} className="feat-cell flex items-center justify-between gap-2 rounded-md border border-white/10 bg-white/[0.05] px-2.5 py-1.5" style={{ animationDelay: `${0.4 + i * 0.35}s` }}>
              <span className="text-[#93c5fd]">{f.k}</span>
              <span className="flex items-center gap-2 text-white/85">
                {f.v}
                <span className={conf}>{f.c}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FlowBuilderVignette() {
  const metaFields = [
    { k: "vendor", t: "text" },
    { k: "invoice_date", t: "date" },
    { k: "total", t: "currency" },
  ];
  const columns = ["description", "qty", "unit_price", "amount"];
  const sampleRow = ["Ocean freight", "2", "1,240.00", "2,480.00"];
  return (
    <div className={frameC}>
      <p className="text-white/45">New flow · describe what to capture</p>
      <div className="mt-1.5 rounded-lg border border-[#3b82f6]/30 bg-[#3b82f6]/[0.07] px-3 py-2 text-white/80">
        &ldquo;Capture the vendor, dates, totals and every line item from our supplier invoices&rdquo;
      </div>
      <div className="mx-auto my-1.5 h-4 w-px bg-gradient-to-b from-white/35 to-white/10" />

      {/* Metadata fields: one value per document */}
      <p className="feat-cell text-[10px] uppercase tracking-wider text-white/45" style={{ animationDelay: "0.4s" }}>
        Metadata fields <span className="normal-case tracking-normal text-white/30">· one value per document</span>
      </p>
      <div className="mt-1.5 flex flex-wrap gap-1.5">
        {metaFields.map((f, i) => (
          <span key={f.k} className={`feat-cell ${chip}`} style={{ animationDelay: `${0.6 + i * 0.3}s` }}>
            {f.k}: <span className="text-[#93c5fd]">{f.t}</span>
          </span>
        ))}
      </div>

      {/* Table fields: one row per line item */}
      <p className="feat-cell mt-3 text-[10px] uppercase tracking-wider text-white/45" style={{ animationDelay: "1.7s" }}>
        Table · line_items <span className="normal-case tracking-normal text-white/30">· one row per line item</span>
      </p>
      <div className="feat-cell mt-1.5 overflow-hidden rounded-lg border border-white/10" style={{ animationDelay: "1.9s" }}>
        <div className="grid grid-cols-[1.6fr_0.6fr_1fr_1fr] divide-x divide-white/10 bg-white/[0.07]">
          {columns.map((c, i) => (
            <span key={c} className="feat-cell truncate px-2 py-1 text-white/60" style={{ animationDelay: `${2.1 + i * 0.25}s` }}>
              {c}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-[1.6fr_0.6fr_1fr_1fr] divide-x divide-white/10 border-t border-white/10">
          {sampleRow.map((v, i) => (
            <span key={i} className="feat-cell truncate px-2 py-1 text-white/80" style={{ animationDelay: `${3.1 + i * 0.15}s` }}>
              {v}
            </span>
          ))}
        </div>
      </div>

      <p className="feat-cell mt-3 flex items-center gap-1.5 text-emerald-400" style={{ animationDelay: "3.9s" }}>
        <Check size={12} /> Flow ready — no code written
      </p>
    </div>
  );
}

function RoutingVignette() {
  const docs = [
    { type: "invoice", pages: "pp. 1–3", fromX: "110%", badge: "bg-[#3b82f6]/15 text-[#93c5fd]", delay: 1.0 },
    { type: "purchase order", pages: "pp. 4–6", fromX: "0%", badge: "bg-[#6c42f0]/20 text-[#c4b5fd]", delay: 1.25 },
    { type: "invoice", pages: "pp. 7–9", fromX: "-110%", badge: "bg-[#3b82f6]/15 text-[#93c5fd]", delay: 1.5 },
  ];
  return (
    <div className={frameC}>
      {/* One mixed scan, page edges stacked behind it */}
      <div className="relative mx-auto w-60">
        <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-lg border border-white/10 bg-white/[0.02]" aria-hidden="true" />
        <div className="absolute inset-0 translate-x-1 translate-y-1 rounded-lg border border-white/10 bg-white/[0.03]" aria-hidden="true" />
        <div className="relative flex items-baseline justify-between rounded-lg border border-white/15 bg-[#131327] px-3 py-2">
          <span className="text-white/80">scans_batch.pdf</span>
          <span className="text-[10px] text-white/40">9 pages</span>
        </div>
      </div>

      <p className="feat-cell mx-auto mt-3 flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-white/45" style={{ animationDelay: "0.5s" }}>
        <Scissors size={11} className="text-[#93c5fd]" /> Splitter · 3 documents found
      </p>

      {/* The stack splits into typed documents */}
      <div className="mt-2 grid grid-cols-3 gap-2">
        {docs.map((d) => (
          <div
            key={d.pages}
            className="feat-split rounded-lg border border-white/10 bg-white/[0.04] px-2 py-1.5 text-center"
            style={{ "--from-x": d.fromX, animationDelay: `${d.delay}s` } as React.CSSProperties}
          >
            <span className={`inline-block rounded px-1.5 py-0.5 text-[10px] font-semibold ${d.badge}`}>{d.type}</span>
            <p className="mt-1 text-[10px] text-white/45">{d.pages}</p>
          </div>
        ))}
      </div>

      <p className="feat-cell mx-auto mt-3 flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-white/45" style={{ animationDelay: "2.2s" }}>
        <GitBranch size={11} className="text-[#93c5fd]" /> Collection · each routed to its flow
      </p>

      {/* Each document lands in the right flow */}
      <div className="mt-2 grid grid-cols-2 gap-3">
        <div className="feat-cell rounded-lg border border-[#3b82f6]/25 bg-[#3b82f6]/[0.05] p-2.5" style={{ animationDelay: "2.5s" }}>
          <p className="text-white/60 font-semibold">Invoice Processor flow</p>
          <div className="mt-1.5 space-y-1.5">
            <div className="feat-cell flex items-center justify-between rounded bg-white/[0.07] px-2 py-1 text-white/75" style={{ animationDelay: "2.9s" }}>
              <span>invoice · pp. 1–3</span>
              <Check size={11} className="text-emerald-400" />
            </div>
            <div className="feat-cell flex items-center justify-between rounded bg-white/[0.07] px-2 py-1 text-white/75" style={{ animationDelay: "3.5s" }}>
              <span>invoice · pp. 7–9</span>
              <Check size={11} className="text-emerald-400" />
            </div>
          </div>
        </div>
        <div className="feat-cell rounded-lg border border-[#6c42f0]/30 bg-[#6c42f0]/[0.06] p-2.5" style={{ animationDelay: "2.5s" }}>
          <p className="text-white/60 font-semibold">Purchase Order flow</p>
          <div className="mt-1.5 space-y-1.5">
            <div className="feat-cell flex items-center justify-between rounded bg-white/[0.07] px-2 py-1 text-white/75" style={{ animationDelay: "3.2s" }}>
              <span>purchase order · pp. 4–6</span>
              <Check size={11} className="text-emerald-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CleaningVignette() {
  const rows = [
    { dirty: "acme CORP.", clean: "Acme Corp" },
    { dirty: "07/16/26", clean: "2026-07-16" },
    { dirty: "1.240,00 EUR", clean: "$1,352.40" },
    { dirty: "8471.30", clean: "HS 8471.30 · laptops" },
  ];
  return (
    <div className={frameC}>
      <p className="text-white/45">Cleaners · normalize before anything is stored</p>
      <div className="mt-3 space-y-2.5">
        {rows.map((r, i) => (
          <div key={r.dirty} className="grid grid-cols-[1fr_20px_1.3fr] items-center gap-2">
            <span className="truncate text-white/40 line-through decoration-white/25">{r.dirty}</span>
            <span className="text-white/30">→</span>
            <span className="feat-cell truncate text-white/85" style={{ animationDelay: `${0.4 + i * 0.4}s` }}>{r.clean}</span>
          </div>
        ))}
      </div>
      <p className="feat-cell mt-3 flex items-center gap-1.5 text-emerald-400" style={{ animationDelay: "2.2s" }}>
        <Check size={12} /> Formatted, converted, classified
      </p>
    </div>
  );
}

function AgentsVignette() {
  const formFields = [
    { label: "invoice number", value: "INV-2043", delay: 0.5 },
    { label: "amount", value: "$1,420.00", delay: 1.0 },
    { label: "remittance file", value: "remittance_INV-2043.pdf", delay: 1.5 },
  ];
  return (
    <div className={`${frame} flex flex-col p-0`}>
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2">
        <span className="size-2 rounded-full bg-white/15" />
        <span className="size-2 rounded-full bg-white/15" />
        <span className="size-2 rounded-full bg-white/15" />
        <span className="ml-1 flex-1 truncate rounded bg-white/[0.06] px-2 py-0.5 text-[10px] text-white/45">vendor-portal.example.com/payments/new · live session</span>
      </div>
      <div className="flex flex-1 flex-col justify-center gap-4 p-4 lg:flex-row lg:items-center">
        {/* The portal form the agent fills out */}
        <div className="flex-1 rounded-lg border border-white/10 bg-white/[0.03] p-3">
          <p className="text-white/45">Payment submission form</p>
          <div className="mt-2.5 space-y-2">
            {formFields.map((f) => (
              <div key={f.label}>
                <p className="text-[10px] text-white/40">{f.label}</p>
                <div className="mt-0.5 rounded border border-white/15 bg-black/40 px-2 py-1.5">
                  <span className="feat-cell inline-block text-white/85" style={{ animationDelay: `${f.delay}s` }}>
                    {f.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="feat-press mt-3 inline-block rounded-md bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] px-3 py-1.5 font-semibold text-white" style={{ animationDelay: "2.2s" }}>
            Submit payment
          </div>
        </div>

        {/* What the agent brings back */}
        <div className="flex-1">
          <div className="feat-cell rounded-md border border-emerald-500/25 bg-emerald-500/[0.08] px-2.5 py-1.5 text-emerald-400" style={{ animationDelay: "2.8s" }}>
            <span className="flex items-center gap-1.5"><Check size={12} /> Form submitted</span>
          </div>
          <p className="feat-cell mt-3 text-[10px] uppercase tracking-wider text-white/45" style={{ animationDelay: "3.2s" }}>
            Captured back to your run
          </p>
          <div className="mt-1.5 space-y-1.5">
            <div className="feat-cell flex items-center justify-between rounded-md border border-white/10 bg-white/[0.05] px-2.5 py-1.5" style={{ animationDelay: "3.4s" }}>
              <span className="text-[#93c5fd]">submission_no</span>
              <span className="text-white/85">PAY-88231</span>
            </div>
            <div className="feat-cell flex items-center justify-between rounded-md border border-white/10 bg-white/[0.05] px-2.5 py-1.5" style={{ animationDelay: "3.7s" }}>
              <span className="text-[#93c5fd]">portal_status</span>
              <span className="text-emerald-400">accepted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HitlVignette() {
  return (
    <div className={frameC}>
      <p className="text-white/45">Run #4127 · paused for review</p>
      <div className="mt-2.5 space-y-2">
        <div className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.05] px-2.5 py-1.5">
          <span className="text-[#93c5fd]">vendor</span>
          <span className="text-white/85">Acme Corp</span>
        </div>
        <div className="flex items-center justify-between rounded-md border border-amber-400/30 bg-amber-400/[0.07] px-2.5 py-1.5">
          <span className="text-[#93c5fd]">total</span>
          <span className="flex items-center gap-2">
            <span className="text-white/40 line-through">1,240.00</span>
            <span className="feat-cell text-white/90" style={{ animationDelay: "0.8s" }}>1,420.00</span>
          </span>
        </div>
      </div>
      <div className="feat-cell mt-3 flex items-center gap-2" style={{ animationDelay: "1.6s" }}>
        <span className="rounded-md bg-emerald-500/15 px-2.5 py-1 font-semibold text-emerald-400">Approve</span>
        <span className="rounded-md border border-white/10 px-2.5 py-1 text-white/50">Reject</span>
      </div>
      <p className="feat-cell mt-3 border-l-2 border-white/15 pl-2 text-[10px] text-white/40" style={{ animationDelay: "2.4s" }}>
        audit · sam@ edited total, approved · 09:41
      </p>
    </div>
  );
}

function McpVignette() {
  return (
    <div className={frameC}>
      <p className="text-white/45">claude.ai · connected to Tavnit MCP</p>
      <div className="mt-2.5 space-y-2.5">
        <div className="ml-auto w-fit max-w-[85%] rounded-lg rounded-br-sm bg-[#3b82f6]/20 px-3 py-2 text-white/85">
          Pull this week&apos;s supplier invoices into a table
        </div>
        <div className="feat-cell w-fit" style={{ animationDelay: "0.7s" }}>
          <span className={chip}>⚙ run_flow(&ldquo;Invoice Processor&rdquo;)</span>
        </div>
        <div className="feat-cell w-fit max-w-[85%] rounded-lg rounded-bl-sm bg-white/[0.06] px-3 py-2 text-white/75" style={{ animationDelay: "1.6s" }}>
          Done — 12 documents extracted into <span className="text-[#93c5fd]">Invoices</span>. Total spend: <span className="text-white">$48,211.90</span>
        </div>
      </div>
    </div>
  );
}

function BucketsVignette() {
  const bars = [35, 60, 45, 80, 65, 95];
  return (
    <div className={`${frame} grid grid-cols-2 gap-4`}>
      <div>
        <p className="text-white/45">bucket: Invoices</p>
        <div className="mt-2 space-y-1.5">
          {["Acme Corp · 1,420.00", "Nordwind · 4,375.63", "Halden · 2,118.00"].map((r, i) => (
            <div key={r} className="feat-cell rounded bg-white/[0.06] px-2 py-1 text-white/70" style={{ animationDelay: `${0.3 + i * 0.25}s` }}>{r}</div>
          ))}
        </div>
        <div className="mt-2.5 flex gap-1.5">
          {["CSV", "Excel"].map((e, i) => (
            <span key={e} className={`feat-cell ${chip} text-[10px]`} style={{ animationDelay: `${1.3 + i * 0.2}s` }}>{e}</span>
          ))}
        </div>
      </div>
      <div className="flex flex-col">
        <p className="text-white/45">spend by month</p>
        <div className="mt-2 flex flex-1 items-end gap-2">
          {bars.map((h, i) => (
            <div key={i} className="feat-bar w-full rounded-t bg-gradient-to-t from-[#3b82f6] to-[#6c42f0]" style={{ height: `${h}%`, animationDelay: `${0.5 + i * 0.15}s` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ApiVignette() {
  const lines = [
    { l: "POST /api/v1/runs", r: "201 created", ok: true },
    { l: "email → invoices@collect.tavnit.io", r: "queued", ok: true },
    { l: "webhook → erp.example.com/ap", r: "200 ok", ok: true },
    { l: "fill → payment_order.pdf", r: "done", ok: true },
  ];
  return (
    <div className={frameC}>
      <p className="text-white/45">Every way in — and out</p>
      <div className="mt-2.5 space-y-2">
        {lines.map((x, i) => (
          <div key={x.l} className="feat-cell flex items-center justify-between gap-3 rounded-md border border-white/10 bg-white/[0.05] px-2.5 py-1.5" style={{ animationDelay: `${0.3 + i * 0.45}s` }}>
            <span className="truncate text-white/75">{x.l}</span>
            <span className="shrink-0 text-emerald-400">{x.r}</span>
          </div>
        ))}
      </div>
      <p className="feat-cell mt-3 text-[10px] text-white/40" style={{ animationDelay: "2.3s" }}>
        REST · email triggers · webhooks · Zapier / Make
      </p>
    </div>
  );
}

function TeamsVignette() {
  const members = [
    { n: "sam@", role: "Owner", cls: "bg-[#3b82f6]/20 text-[#93c5fd]" },
    { n: "dana@", role: "Admin", cls: "bg-[#6c42f0]/20 text-[#c4b5fd]" },
    { n: "leo@", role: "Member", cls: "bg-white/10 text-white/70" },
    { n: "auditor@", role: "Viewer", cls: "bg-white/10 text-white/50" },
  ];
  return (
    <div className={frameC}>
      <p className="text-white/45">My Organization · unlimited seats</p>
      <div className="mt-2.5 space-y-2">
        {members.map((m, i) => (
          <div key={m.n} className="feat-cell flex items-center justify-between rounded-md border border-white/10 bg-white/[0.05] px-2.5 py-1.5" style={{ animationDelay: `${0.3 + i * 0.35}s` }}>
            <span className="text-white/80">{m.n}</span>
            <span className={`rounded px-2 py-0.5 text-[10px] font-semibold ${m.cls}`}>{m.role}</span>
          </div>
        ))}
      </div>
      <p className="feat-cell mt-3 text-[10px] text-white/40" style={{ animationDelay: "1.9s" }}>
        Org-level permissions on flows, buckets and review queues
      </p>
    </div>
  );
}

/* ── Feature registry ─────────────────────────────────────── */

const features = [
  { icon: Sparkles, title: "AI Extraction", desc: "Multiple leading AI models pull tables, metadata, handwriting, and complex layouts out of any document — with a confidence score on every field.", Vignette: ExtractionVignette },
  { icon: LayoutGrid, title: "Flow Builder", desc: "Describe what to capture in plain language and Tavnit builds the schema — metadata fields for single values like vendor and total, table fields for line items. No code.", Vignette: FlowBuilderVignette },
  { icon: GitBranch, title: "Routing & Splitting", desc: "Splitters break multi-document PDFs apart, then Collections route each document to the right flow automatically.", Vignette: RoutingVignette },
  { icon: Lightbulb, title: "AI Data Cleaning", desc: "Cleaners format, translate, convert currencies and units, calculate fields, match reference data — even classify HS tariff codes.", Vignette: CleaningVignette },
  { icon: Bot, title: "AI Agents", desc: "Browser-automation agents act on extracted data across the web — and you can watch every session live.", Vignette: AgentsVignette },
  { icon: UserCheck, title: "Human in the Loop", desc: "Pause runs for review. Edit results in place, approve or reject — every action lands in an append-only audit trail.", Vignette: HitlVignette },
  { icon: Plug, title: "MCP Connector", desc: "Add Tavnit to claude.ai, Cursor, or any MCP client — your AI assistant can run flows and query your data.", Vignette: McpVignette },
  { icon: Database, title: "Buckets & Analytics", desc: "Structured tables with charts, filters, CSV/Excel export, and AI-powered semantic search across columns.", Vignette: BucketsVignette },
  { icon: Code2, title: "API, Email & Webhooks", desc: "REST API, email triggers, webhook callbacks, PDF form filling, and Zapier/Make compatibility.", Vignette: ApiVignette },
  { icon: Users, title: "Teams & Roles", desc: "Owner, Admin, Member, and Viewer roles with org-level permissions and unlimited seats.", Vignette: TeamsVignette },
];

/* Compact card for the mobile marquee row */
function MarqueeCard({ f }: { f: typeof features[number] }) {
  return (
    <div className="glass-card rounded-xl p-4 border border-white/10 flex-shrink-0 w-[200px]">
      <div className="flex items-center gap-2.5 mb-2">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#3b82f6]/10 text-[#3b82f6]">
          <f.icon size={16} />
        </div>
        <h3 className="text-xs font-bold text-white">{f.title}</h3>
      </div>
      <p className="text-[11px] text-gray-400 leading-relaxed">{f.desc}</p>
    </div>
  );
}

/* Speed: pixels per second */
const MARQUEE_SPEED = 30;
const PAUSE_AFTER_TOUCH_MS = 4000;
const AUTO_ADVANCE_MS = 5000;

export default function Features() {
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const offsetRef = useRef(0);
  const isPausedRef = useRef(false);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Desktop showcase state. Auto-tours until the user picks a
     feature themselves; from then on the selection is theirs. */
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [interacted, setInteracted] = useState(false);

  const select = useCallback((i: number) => {
    setInteracted(true);
    setActive(i);
  }, []);

  useEffect(() => {
    if (paused || interacted) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setActive((a) => (a + 1) % features.length), AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [paused, interacted]);

  /* Measure how wide one set of cards is */
  const getSetWidth = useCallback(() => {
    const el = trackRef.current;
    if (!el) return 0;
    return features.length * (200 + 12);
  }, []);

  /* Mobile marquee animation loop */
  const animate = useCallback((time: number) => {
    if (!lastTimeRef.current) lastTimeRef.current = time;
    const delta = (time - lastTimeRef.current) / 1000;
    lastTimeRef.current = time;

    if (!isPausedRef.current) {
      offsetRef.current -= MARQUEE_SPEED * delta;
      const setWidth = getSetWidth();
      if (setWidth > 0 && Math.abs(offsetRef.current) >= setWidth) {
        offsetRef.current += setWidth;
      }
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${offsetRef.current}px)`;
      }
    }

    animRef.current = requestAnimationFrame(animate);
  }, [getSetWidth]);

  const pauseMarquee = useCallback(() => {
    isPausedRef.current = true;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      isPausedRef.current = false;
      lastTimeRef.current = 0;
    }, PAUSE_AFTER_TOUCH_MS);
  }, []);

  useEffect(() => {
    animRef.current = requestAnimationFrame(animate);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, [animate]);

  const doubled = [...features, ...features];
  const current = features[active];

  return (
    <section className="py-16 md:py-24" id="features" aria-labelledby="features-heading">
      {/* ── Mobile: continuous marquee ── */}
      <div className="md:hidden">
        <div className="px-4 mb-5">
          <p className="text-xl font-bold text-white mb-1 text-center" aria-hidden="true">
            The Complete Document Automation Platform
          </p>
          <p className="text-xs text-gray-400 text-center">
            Extract, clean, review, store, and act — all in one pipeline
          </p>
        </div>

        <div className="overflow-hidden" onTouchStart={pauseMarquee}>
          <div
            ref={trackRef}
            className="flex gap-3 will-change-transform"
            style={{ width: "max-content" }}
          >
            {doubled.map((f, i) => (
              <MarqueeCard key={`${f.title}-${i}`} f={f} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Desktop: feature switcher with live vignettes ── */}
      <div className="hidden md:block max-w-[1100px] mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 id="features-heading" className="text-3xl md:text-4xl font-bold text-white mb-2">
            The Complete Document Automation Platform
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-[600px] mx-auto">
            Extract, clean, review, store, and act — all in one pipeline
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-[270px_1fr] gap-6 items-stretch"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Feature list */}
          <div role="tablist" aria-label="Platform capabilities" className="flex flex-col justify-between gap-1">
            {features.map((f, i) => (
              <button
                key={f.title}
                role="tab"
                aria-selected={i === active}
                onClick={() => select(i)}
                className={`group relative flex items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#93c5fd] ${
                  i === active ? "bg-white/[0.07] text-white" : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <span
                  className={`absolute left-0 top-1/2 -translate-y-1/2 h-6 w-[3px] rounded-full bg-gradient-to-b from-[#3b82f6] to-[#6c42f0] transition-opacity duration-200 ${
                    i === active ? "opacity-100" : "opacity-0"
                  }`}
                  aria-hidden="true"
                />
                <f.icon
                  size={17}
                  className={`shrink-0 transition-colors duration-200 ${i === active ? "text-[#3b82f6]" : "text-gray-500 group-hover:text-gray-300"}`}
                />
                <span className="text-sm font-semibold">{f.title}</span>
              </button>
            ))}
          </div>

          {/* Vignette panel */}
          <div className="glass-card rounded-2xl border border-[#3b82f6]/20 shadow-2xl shadow-[#3b82f6]/10 p-5 flex flex-col min-h-[440px]">
            <div key={active} className="flex-1 min-h-0" role="tabpanel" aria-label={current.title}>
              <current.Vignette />
            </div>
            <div className="pt-4 shrink-0">
              <h3 className="text-base font-bold text-white mb-1">{current.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{current.desc}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
