"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  LayoutGrid, Database, Users, Plug, Check, BarChart3, ArrowRight,
} from "lucide-react";
import { reveal } from "@/lib/motion";

/* This section used to carry ten tabs, a miniature for every capability.
   Six of them (extraction, routing, cleaning, review, agents, API and
   webhooks) are what the "Follow one invoice" story above walks through,
   so here they said the same thing a second time. What is left is what
   the story cannot show: how a flow is built, working by chat, where the
   data lives, and who has access. */

/* ── Vignettes ──────────────────────────────────────────────
   One animated miniature per feature — a truthful sketch of
   what that part of the product actually does. Elements enter
   via .feat-cell with staggered animation-delay; the vignette
   remounts on selection so the sequence replays. */

const frame = "relative h-full overflow-hidden rounded-xl border border-tint/10 bg-well/30 p-5 font-mono text-[11px]";
/* Centered variant for list-shaped vignettes so they don't top-anchor in the tall panel */
const frameC = `${frame} flex flex-col justify-center`;
const chip = "rounded-md border border-tint/10 bg-tint/[0.06] px-2 py-1 text-tint/80";

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
      <p className="text-tint/45">New flow · describe what to capture</p>
      <div className="mt-1.5 rounded-lg border border-[#3b82f6]/30 bg-[#3b82f6]/[0.07] px-3 py-2 text-tint/80">
        &ldquo;Capture the vendor, dates, totals and every line item from our supplier invoices&rdquo;
      </div>
      <div className="mx-auto my-1.5 h-4 w-px bg-gradient-to-b from-tint/35 to-tint/10" />

      {/* Metadata fields: one value per document */}
      <p className="feat-cell text-[10px] uppercase tracking-wider text-tint/45" style={{ animationDelay: "0.4s" }}>
        Metadata fields <span className="normal-case tracking-normal text-tint/30">· one value per document</span>
      </p>
      <div className="mt-1.5 flex flex-wrap gap-1.5">
        {metaFields.map((f, i) => (
          <span key={f.k} className={`feat-cell ${chip}`} style={{ animationDelay: `${0.6 + i * 0.3}s` }}>
            {f.k}: <span className="text-accent-2">{f.t}</span>
          </span>
        ))}
      </div>

      {/* Table fields: one row per line item */}
      <p className="feat-cell mt-3 text-[10px] uppercase tracking-wider text-tint/45" style={{ animationDelay: "1.7s" }}>
        Table · line_items <span className="normal-case tracking-normal text-tint/30">· one row per line item</span>
      </p>
      <div className="feat-cell mt-1.5 overflow-hidden rounded-lg border border-tint/10" style={{ animationDelay: "1.9s" }}>
        <div className="grid grid-cols-[1.6fr_0.6fr_1fr_1fr] divide-x divide-tint/10 bg-tint/[0.07]">
          {columns.map((c, i) => (
            <span key={c} className="feat-cell truncate px-2 py-1 text-tint/60" style={{ animationDelay: `${2.1 + i * 0.25}s` }}>
              {c}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-[1.6fr_0.6fr_1fr_1fr] divide-x divide-tint/10 border-t border-tint/10">
          {sampleRow.map((v, i) => (
            <span key={i} className="feat-cell truncate px-2 py-1 text-tint/80" style={{ animationDelay: `${3.1 + i * 0.15}s` }}>
              {v}
            </span>
          ))}
        </div>
      </div>

      <p className="feat-cell mt-3 flex items-center gap-1.5 text-ok" style={{ animationDelay: "3.9s" }}>
        <Check size={12} /> Flow ready — no code written
      </p>
    </div>
  );
}

function McpVignette() {
  const toolCall = (label: string, delay: number) => (
    <div className="feat-cell flex w-fit items-center gap-1.5" style={{ animationDelay: `${delay}s` }}>
      <span className={`${chip} text-[10px]`}>⚙ {label}</span>
      <Check size={11} className="text-ok" />
    </div>
  );
  return (
    <div className={frameC}>
      <p className="text-tint/45">claude.ai · connected to Tavnit MCP</p>
      <div className="mt-2.5 space-y-2">
        <div className="ml-auto w-fit max-w-[85%] rounded-lg rounded-br-sm bg-[#3b82f6]/20 px-2.5 py-1.5 text-tint/85">
          Set up extraction for our freight invoices — and convert the totals to USD
        </div>
        {toolCall('create_flow("Freight Invoices")', 0.6)}
        {toolCall('create_cleaner("EUR → USD", field: total)', 1.3)}
        <div className="feat-cell w-fit max-w-[85%] rounded-lg rounded-bl-sm bg-tint/[0.06] px-2.5 py-1.5 text-tint/75" style={{ animationDelay: "2.0s" }}>
          Done — flow with 6 fields + line items, FX cleaner attached. Forward invoices to{" "}
          <span className="text-accent-2">freight@collect.tavnit.io</span>
        </div>
        <div className="feat-cell ml-auto w-fit max-w-[85%] rounded-lg rounded-br-sm bg-[#3b82f6]/20 px-2.5 py-1.5 text-tint/85" style={{ animationDelay: "2.7s" }}>
          How much freight spend this week?
        </div>
        {toolCall('query_bucket("Freight Invoices")', 3.3)}
        <div className="feat-cell w-fit max-w-[85%] rounded-lg rounded-bl-sm bg-tint/[0.06] px-2.5 py-1.5 text-tint/75" style={{ animationDelay: "3.9s" }}>
          <span className="text-fg">$48,211.90</span> across 12 invoices
        </div>
      </div>
    </div>
  );
}

function BucketsVignette() {
  const rows = [
    ["Nordwind GmbH", "NW-0412", "4,375.63"],
    ["Halden Marine", "HM-2210", "2,118.00"],
  ];
  const bars = [35, 60, 45, 80, 65, 95];
  return (
    <div className={frameC}>
      {/* Bucket toolbar */}
      <div className="flex items-center justify-between gap-2">
        <p className="text-tint/60 font-semibold">bucket: Invoices</p>
        <div className="flex items-center gap-1.5">
          <span className={`${chip} text-[10px]`}>CSV</span>
          <span className={`${chip} text-[10px]`}>Excel</span>
          <span
            className="feat-press flex items-center gap-1 rounded-md bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] px-2 py-1 text-[10px] font-semibold text-white"
            style={{ animationDelay: "2.2s" }}
          >
            <BarChart3 size={11} /> Analytics
          </span>
        </div>
      </div>

      {/* The bucket itself: an editable table extractions land in */}
      <div className="mt-2 overflow-hidden rounded-lg border border-tint/10">
        <div className="grid grid-cols-[1.4fr_1fr_0.9fr] divide-x divide-tint/10 bg-tint/[0.07] text-tint/50">
          {["vendor", "invoice_no", "total"].map((c) => (
            <span key={c} className="truncate px-2 py-1">{c}</span>
          ))}
        </div>
        {rows.map((r) => (
          <div key={r[1]} className="grid grid-cols-[1.4fr_1fr_0.9fr] divide-x divide-tint/10 border-t border-tint/10">
            {r.map((v, i) => (
              <span key={i} className="truncate px-2 py-1 text-tint/75">{v}</span>
            ))}
          </div>
        ))}
        {/* A fresh extraction drops in as a new row */}
        <div className="feat-cell grid grid-cols-[1.4fr_1fr_0.9fr] divide-x divide-tint/10 border-t border-tint/10 bg-[#3b82f6]/[0.08]" style={{ animationDelay: "0.7s" }}>
          <span className="truncate px-2 py-1 text-tint/90">Acme Corp</span>
          <span className="truncate px-2 py-1 text-tint/90">INV-2043</span>
          <span className="relative truncate px-2 py-1 text-tint/90">
            1,420.00
            <span className="feat-cell absolute inset-0.5 rounded border border-[#3b82f6]/60" style={{ animationDelay: "1.4s" }} aria-hidden="true" />
          </span>
        </div>
      </div>
      <p className="mt-1 flex items-center justify-between text-[9px] text-tint/35">
        <span>editable — click any cell</span>
        <span className="feat-cell" style={{ animationDelay: "0.9s" }}>+ 1 row from run #4128</span>
      </p>

      {/* Pressing Analytics opens the charts */}
      <div className="feat-cell mt-2.5 grid grid-cols-[1fr_auto] gap-4 rounded-lg border border-tint/10 bg-tint/[0.03] p-3" style={{ animationDelay: "2.6s" }}>
        <div className="flex flex-col">
          <p className="text-[10px] text-tint/45">spend by month</p>
          <div className="mt-1.5 flex h-14 flex-1 items-end gap-1.5">
            {bars.map((h, i) => (
              <div key={i} className="feat-bar w-full rounded-t bg-gradient-to-t from-[#3b82f6] to-[#6c42f0]" style={{ height: `${h}%`, animationDelay: `${2.8 + i * 0.12}s` }} />
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-center gap-1.5 text-right">
          <div>
            <p className="text-sm font-bold text-fg">$48,211.90</p>
            <p className="text-[9px] text-tint/40">total spend</p>
          </div>
          <div>
            <p className="text-sm font-bold text-fg">12</p>
            <p className="text-[9px] text-tint/40">rows this week</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TeamsVignette() {
  /* Role subtitles match the in-app docs verbatim */
  const roles = [
    { name: "Owner", sub: "full control", cls: "bg-[#3b82f6]/20 text-accent-2" },
    { name: "Admin", sub: "people & content", cls: "bg-[#6c42f0]/20 text-violet-2" },
    { name: "Member", sub: "run & view", cls: "bg-tint/10 text-tint/70" },
    { name: "Viewer", sub: "read-only", cls: "bg-tint/10 text-tint/50" },
  ];
  /* Descending staircase: each capability is open to fewer roles */
  const caps = [
    { label: "View runs & buckets", allowed: 4 },
    { label: "Trigger runs · review", allowed: 3 },
    { label: "Build flows · invite team", allowed: 2 },
    { label: "Billing & org settings", allowed: 1 },
  ];
  return (
    <div className={frameC}>
      <p className="text-tint/45">My Organization · four roles, org-wide permissions</p>
      <div className="mt-2.5 overflow-hidden rounded-lg border border-tint/10">
        {/* Role headers */}
        <div className="grid grid-cols-[1.5fr_repeat(4,1fr)] divide-x divide-tint/10 bg-tint/[0.06]">
          <span className="px-2 py-1.5" aria-hidden="true" />
          {roles.map((r, i) => (
            <div key={r.name} className="feat-cell px-1 py-1.5 text-center" style={{ animationDelay: `${0.3 + i * 0.15}s` }}>
              <span className={`inline-block rounded px-1.5 py-0.5 text-[10px] font-semibold ${r.cls}`}>{r.name}</span>
              <p className="mt-0.5 text-[8px] leading-tight text-tint/40">{r.sub}</p>
            </div>
          ))}
        </div>
        {/* Capability rows — checks draw a staircase toward Owner */}
        {caps.map((c, ri) => (
          <div key={c.label} className="grid grid-cols-[1.5fr_repeat(4,1fr)] items-center divide-x divide-tint/10 border-t border-tint/10">
            <span className="truncate px-2 py-1.5 text-tint/70">{c.label}</span>
            {roles.map((r, ci) => (
              <span key={r.name} className="px-1 py-1.5 text-center">
                {ci < c.allowed ? (
                  <Check
                    size={12}
                    className="feat-cell inline-block text-ok"
                    style={{ animationDelay: `${1.1 + ri * 0.4}s` }}
                  />
                ) : (
                  <span className="text-tint/20">—</span>
                )}
              </span>
            ))}
          </div>
        ))}
      </div>
      <p className="feat-cell mt-3 text-center text-[10px] text-tint/40" style={{ animationDelay: "3.0s" }}>
        Unlimited seats — invite the whole team, pay for usage
      </p>
    </div>
  );
}

/* ── Feature registry ─────────────────────────────────────── */

const features = [
  {
    icon: LayoutGrid,
    question: "How you build it",
    title: "Flow Builder",
    desc: "Describe what to capture in plain language and Tavnit builds the schema: metadata fields for single values like vendor and total, table fields for line items. No code.",
    href: "/docs/flows",
    Vignette: FlowBuilderVignette,
  },
  {
    icon: Plug,
    question: "How you talk to it",
    title: "MCP Connector",
    desc: "Add Tavnit to claude.ai, Cursor, or any MCP client. Your AI assistant can build flows, attach cleaners, run extractions, and query your data.",
    href: "/integrations/mcp",
    Vignette: McpVignette,
  },
  {
    icon: Database,
    question: "Where the data lives",
    title: "Buckets & Analytics",
    desc: "Editable tables where extracted data lands. Fix a cell in place, export CSV or Excel, search columns semantically, and open built-in analytics with one click.",
    href: "/docs/buckets",
    Vignette: BucketsVignette,
  },
  {
    icon: Users,
    question: "Who can touch it",
    title: "Teams & Roles",
    desc: "Four roles with clear boundaries: Owners control billing and settings, Admins manage people and content, Members run and view, Viewers read only. Unlimited seats.",
    href: "/docs/user-roles",
    Vignette: TeamsVignette,
  },
];

/** How long a capability stays up before the section moves to the next. */
const DWELL = 8;

/**
 * Four capabilities, one on stage at a time: tabs across the top, then a
 * single panel with the capability's miniature beside what it is.
 *
 * Two earlier layouts missed in opposite directions. A list of four names
 * next to one tall panel left most of the section empty. Four full cards,
 * each with its own miniature, filled it and made it the heaviest block on
 * the page. This keeps one miniature moving and the section short.
 *
 * It moves on by itself (the active tab fills as it waits) until the
 * visitor picks a tab; it holds while the pointer is over the panel, and
 * does not run off screen.
 */
export default function Features() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [active, setActive] = useState(0);
  const [picked, setPicked] = useState(false);
  const [held, setHeld] = useState(false);
  const f = features[active];
  const touring = inView && !picked && !held;

  return (
    <section className="py-16 md:py-24" id="features" aria-labelledby="features-heading">
      <div className="mx-auto max-w-[1100px] px-4 sm:px-6">
        <motion.div className="mb-7 text-center md:mb-9" {...reveal()}>
          <h2 id="features-heading" className="mb-2 text-3xl font-bold text-fg md:text-4xl">
            What surrounds the pipeline
          </h2>
          <p className="mx-auto max-w-[640px] text-base text-fg-4 md:text-lg">
            How you build it, how you talk to it, where the data lives and who can touch it
          </p>
        </motion.div>

        <motion.div ref={ref} {...reveal(0.08)}>
          <div role="tablist" aria-label="More in Tavnit Pro" className="mb-4 grid grid-cols-2 gap-2 md:grid-cols-4">
            {features.map((t, i) => (
              <button
                key={t.title}
                role="tab"
                type="button"
                aria-selected={i === active}
                onClick={() => {
                  setPicked(true);
                  setActive(i);
                }}
                className={`press relative flex cursor-pointer items-center gap-2.5 overflow-hidden rounded-xl border px-3.5 py-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]/50 ${
                  i === active ? "border-[#3b82f6]/45 bg-[#3b82f6]/[0.07] text-fg" : "border-tint/10 text-fg-4 hover:border-tint/25 hover:text-fg-2"
                }`}
              >
                <t.icon size={16} className={`shrink-0 ${i === active ? "text-accent" : "text-fg-5"}`} aria-hidden />
                <span className="min-w-0">
                  <span className="block truncate text-[10px] font-semibold uppercase tracking-[0.12em] text-fg-5">{t.question}</span>
                  <span className="block truncate text-sm font-semibold">{t.title}</span>
                </span>
                {/* How long until the section moves on */}
                {i === active && touring && (
                  <motion.span
                    key={`dwell-${active}`}
                    className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-accent"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: DWELL, ease: "linear" }}
                    onAnimationComplete={() => setActive((a) => (a + 1) % features.length)}
                    aria-hidden
                  />
                )}
              </button>
            ))}
          </div>

          <div
            role="tabpanel"
            aria-label={f.title}
            onPointerEnter={(e) => e.pointerType === "mouse" && setHeld(true)}
            onPointerLeave={() => setHeld(false)}
            className="glass-card grid overflow-hidden rounded-2xl md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]"
          >
            <div className="h-[300px] p-3 md:h-[330px] md:pr-0" aria-hidden="true">
              {inView && <f.Vignette key={active} />}
            </div>
            {/* All four are in the page (stacked in one cell, one showing):
                a crawler reads every capability and follows every link. */}
            <div className="grid">
              {features.map((t, i) => (
                <div
                  key={t.title}
                  inert={i !== active}
                  className={`col-start-1 row-start-1 flex flex-col justify-center p-5 sm:p-7 md:p-8 ${
                    i === active ? "story-rise" : "pointer-events-none opacity-0"
                  }`}
                >
                  <p className="mb-2.5 flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-fg-4">
                    <span className="h-px w-5 bg-gradient-to-r from-[#3b82f6] to-[#6c42f0]" aria-hidden />
                    {t.question}
                  </p>
                  <h3 className="mb-3 text-2xl font-bold text-fg">{t.title}</h3>
                  <p className="mb-5 text-[15px] leading-relaxed text-fg-4">{t.desc}</p>
                  <Link
                    href={t.href}
                    className="group inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-2"
                  >
                    Read more
                    <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
