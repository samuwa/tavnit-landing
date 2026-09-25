"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Mail,
  MailCheck,
  Zap,
  FileText,
  Send,
  Link2,
  ArrowRight,
  Plug,
  Upload,
  Workflow,
  Database,
  Bot,
  FilePen,
  FileSpreadsheet,
  X,
  type LucideIcon,
} from "lucide-react";
import SectionEyebrow from "@/components/SectionEyebrow";
import Link from "next/link";
import Image from "next/image";

/* ══════════════════════════════════════════
   MOBILE CARD CONTENT (full info, no shortcuts)
   ══════════════════════════════════════════ */

function MobileEmailSteps({ steps, numbered }: { steps: string[]; numbered?: boolean }) {
  return (
    <div className="space-y-1.5">
      {steps.map((step, i) => (
        <div key={i} className="flex items-start gap-2 text-xs text-fg-3">
          <span className={`w-[18px] h-[18px] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 font-semibold text-[9px] ${
            numbered ? "border border-tint/15 text-fg-4" : "bg-gradient-to-br from-[#3b82f6] to-[#6c42f0] text-white"
          }`}>
            {numbered ? i + 1 : "✓"}
          </span>
          <span className="leading-snug">{step}</span>
        </div>
      ))}
    </div>
  );
}

function ApiMobileCard() {
  return (
    <div className="glass-card rounded-xl p-5 border border-tint/10 flex flex-col h-full">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-[#3b82f6]/10 flex items-center justify-center text-accent flex-shrink-0">
          <Code2 size={20} />
        </div>
        <div>
          <h3 className="text-base font-bold text-fg">REST API</h3>
          <p className="text-[11px] text-fg-4">Full programmatic control</p>
        </div>
      </div>

      <div className="bg-well/40 rounded-lg overflow-hidden border border-tint/5 mb-3">
        <div className="flex justify-between items-center px-3 py-1.5 border-b border-tint/5">
          <span className="text-[9px] font-bold text-accent uppercase tracking-widest">cURL</span>
          <span className="text-[9px] text-fg-5">Quick Example</span>
        </div>
        <pre className="p-2.5 overflow-x-auto">
          <code className="font-mono text-[10px] leading-relaxed text-ok block whitespace-pre-wrap break-all">{`curl -X POST /api/runs/process \\
  -H "X-API-Key: YOUR_KEY" \\
  -F "file=@invoice.pdf" \\
  -F "flow_id=YOUR_FLOW_ID"`}</code>
        </pre>
      </div>

      <div className="flex flex-wrap gap-1 mb-3">
        {["API key auth", "Multipart / JSON", "Real-time", "Python & JS SDKs"].map((t) => (
          <span key={t} className="bg-tint/5 border border-tint/10 rounded px-1.5 py-0.5 text-[9px] text-fg-4 font-medium">{t}</span>
        ))}
      </div>

      <Link href="/docs/api-integration" className="inline-flex items-center gap-1.5 font-semibold text-accent text-xs mt-auto">
        View API Docs <ArrowRight size={12} />
      </Link>
    </div>
  );
}

function EmailMobileCard() {
  return (
    <div className="glass-card rounded-xl p-5 border border-tint/10 flex flex-col h-full">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-[#3b82f6]/10 flex items-center justify-center text-accent flex-shrink-0">
          <Mail size={20} />
        </div>
        <div>
          <h3 className="text-base font-bold text-fg">Email Integration</h3>
          <p className="text-[11px] text-fg-4">Send & receive via email</p>
        </div>
      </div>

      <div className="space-y-3 mb-3">
        <div>
          <h4 className="text-[10px] font-bold text-fg-5 uppercase tracking-wider mb-1.5">Email Trigger</h4>
          <MobileEmailSteps steps={["Enable Email Trigger on your flow", "Copy your flow's unique email address", "Forward PDFs/images as attachments"]} numbered />
        </div>
        <div>
          <h4 className="text-[10px] font-bold text-fg-5 uppercase tracking-wider mb-1.5">Email Output</h4>
          <MobileEmailSteps steps={["Configure recipient email in flow settings", "Receive JSON results automatically"]} />
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mb-3">
        {["Unique email per flow", "Mixed doc routing", "One run per attachment", "Auto replies"].map((t) => (
          <span key={t} className="bg-tint/5 border border-tint/10 rounded px-1.5 py-0.5 text-[9px] text-fg-4 font-medium">{t}</span>
        ))}
      </div>

      <Link href="/docs/email-integration" className="inline-flex items-center gap-1.5 font-semibold text-accent text-xs mt-auto">
        Setup Email <ArrowRight size={12} />
      </Link>
    </div>
  );
}

function WebhookMobileCard() {
  return (
    <div className="glass-card rounded-xl p-5 border border-tint/10 flex flex-col h-full">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-[#3b82f6]/10 flex items-center justify-center text-accent flex-shrink-0">
          <Zap size={20} />
        </div>
        <div>
          <h3 className="text-base font-bold text-fg">Webhooks</h3>
          <p className="text-[11px] text-fg-4">Real-time notifications</p>
        </div>
      </div>

      <div className="p-3 bg-tint/3 rounded-xl border border-tint/5 mb-3">
        <div className="flex items-start justify-between">
          {[
            { icon: FileText, label: "Document processed" },
            { icon: Send, label: "Tavnit sends POST" },
            { icon: Link2, label: "Your URL receives data" },
          ].map((item, i) => (
            <div key={i} className="flex items-start flex-1">
              <div className="flex flex-col items-center gap-1.5 flex-1">
                <div className="w-8 h-8 rounded-full bg-tint/5 border border-tint/10 flex items-center justify-center text-accent">
                  <item.icon size={14} />
                </div>
                <span className="text-[9px] text-fg-4 font-medium text-center leading-tight max-w-[74px]">{item.label}</span>
              </div>
              {i < 2 && (
                <div className="h-8 flex items-center flex-shrink-0" aria-hidden="true">
                  <ArrowRight size={12} className="text-accent/50" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-start gap-2 text-xs text-fg-3 mb-3">
        <span className="w-[18px] h-[18px] rounded-full bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] text-white text-[9px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">→</span>
        <span className="leading-snug">Configure webhook URL in flow settings</span>
      </div>

      <div className="flex flex-wrap gap-1 mb-3">
        {["Auto notifications", "JSON results", "Make & Zapier"].map((t) => (
          <span key={t} className="bg-tint/5 border border-tint/10 rounded px-1.5 py-0.5 text-[9px] text-fg-4 font-medium">{t}</span>
        ))}
      </div>

      <Link href="/docs/webhooks" className="inline-flex items-center gap-1.5 font-semibold text-accent text-xs mt-auto">
        Configure Webhooks <ArrowRight size={12} />
      </Link>
    </div>
  );
}

function McpMobileCard() {
  return (
    <div className="glass-card rounded-xl p-5 border border-tint/10 flex flex-col h-full">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-[#3b82f6]/10 flex items-center justify-center text-accent flex-shrink-0">
          <Plug size={20} />
        </div>
        <div>
          <h3 className="text-base font-bold text-fg">MCP Connector</h3>
          <p className="text-[11px] text-fg-4">Your AI assistant, connected</p>
        </div>
      </div>

      <div className="space-y-3 mb-3">
        <div>
          <h4 className="text-[10px] font-bold text-fg-5 uppercase tracking-wider mb-1.5">Connect in Minutes</h4>
          <MobileEmailSteps steps={["Generate a connector URL in Integrations", "Paste it into claude.ai, Cursor, or any MCP client", "Ask your assistant to run flows and query your data"]} numbered />
        </div>
        <div>
          <h4 className="text-[10px] font-bold text-fg-5 uppercase tracking-wider mb-1.5">What Your Assistant Can Do</h4>
          <MobileEmailSteps steps={["Process documents through your flows", "Read and search your Buckets"]} />
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mb-3">
        {["claude.ai (Pro+)", "Cursor", "Any MCP client", "Org-scoped access"].map((t) => (
          <span key={t} className="bg-tint/5 border border-tint/10 rounded px-1.5 py-0.5 text-[9px] text-fg-4 font-medium">{t}</span>
        ))}
      </div>

      <Link href="/integrations/mcp" className="inline-flex items-center gap-1.5 font-semibold text-accent text-xs mt-auto">
        Connect Your Assistant <ArrowRight size={12} />
      </Link>
    </div>
  );
}

function SimpleMobileCard({ icon: Icon, title, subtitle, body, tags, href, cta }: { icon: LucideIcon; title: string; subtitle: string; body: string; tags: string[]; href: string; cta: string }) {
  return (
    <div className="glass-card rounded-xl p-5 border border-tint/10 flex flex-col h-full">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl border border-tint/10 flex items-center justify-center text-fg-3 flex-shrink-0">
          <Icon size={20} />
        </div>
        <div>
          <h3 className="text-base font-bold text-fg">{title}</h3>
          <p className="text-[11px] text-fg-4">{subtitle}</p>
        </div>
      </div>
      <p className="text-xs leading-relaxed text-fg-3">{body}</p>
      <div className="mt-auto flex flex-wrap gap-1 pt-4">
        {tags.map((t) => (
          <span key={t} className="rounded-full border border-tint/10 px-2 py-0.5 text-[10px] font-medium text-fg-4">{t}</span>
        ))}
      </div>
      <Link href={href} className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-fg-2">
        {cta} <ArrowRight size={12} />
      </Link>
    </div>
  );
}

function NoCodeMobileCard() {
  return (
    <SimpleMobileCard
      icon={Workflow}
      title="No-code tools"
      subtitle="Zapier, Make, n8n, Power Automate"
      body="An HTTP step sends a document to the API; the Flow's webhook starts the next step with the rows. No native app to install."
      tags={["Zapier", "Make", "n8n", "Power Automate"]}
      href="/docs/api-integration"
      cta="API and recipes"
    />
  );
}

function BucketsMobileCard() {
  return (
    <SimpleMobileCard
      icon={Database}
      title="Buckets"
      subtitle="Store, query and chat with results"
      body="Flows write rows to a Bucket automatically. Edit, export to Excel or CSV, ask questions in plain language, or read it by API."
      tags={["Auto-export", "Chat", "Read / write API", "Excel · CSV"]}
      href="/docs/buckets"
      cta="About Buckets"
    />
  );
}

const mobileSlides = [ApiMobileCard, EmailMobileCard, WebhookMobileCard, McpMobileCard, NoCodeMobileCard, BucketsMobileCard];

/* Desktop selector rail + detail panel */

/* ══════════════════════════════════════════
   THE MAP: every way in, every way out
   ══════════════════════════════════════════ */

type Route = { id: string; icon: LucideIcon; label: string; note: string };
const IN: Route[] = [
  { id: "upload", icon: Upload, label: "Upload", note: "In the app" },
  { id: "email-in", icon: Mail, label: "Email", note: "An address per Flow" },
  { id: "api", icon: Code2, label: "REST API", note: "Multipart or base64" },
  { id: "mcp", icon: Plug, label: "MCP", note: "claude.ai, Cursor" },
  { id: "nocode", icon: Workflow, label: "No-code", note: "Zapier · Make · n8n" },
];
const OUT: Route[] = [
  { id: "webhooks", icon: Zap, label: "Webhooks", note: "JSON on completion" },
  { id: "email-out", icon: MailCheck, label: "Email", note: "rows.csv attached" },
  { id: "buckets", icon: Database, label: "Buckets", note: "Query, chat, API" },
  { id: "agents", icon: Bot, label: "Agents", note: "Act in a browser" },
  { id: "forms", icon: FilePen, label: "PDF forms", note: "Filled from a run" },
  { id: "export", icon: FileSpreadsheet, label: "Excel · CSV", note: "One-click export" },
];

/** What the centre of the diagram says about each route: short enough to fit, true to the product. */
type Detail = { title: string; lead: string; points: string[]; code?: string; tags: string[]; href?: string; cta?: string };
const DETAILS: Record<string, Detail> = {
  upload: {
    title: "Upload in the app",
    lead: "Open a Flow and drop the files: PDFs, photos, scans or spreadsheets, one or a batch.",
    points: ["Each file becomes its own run", "Results appear as each one finishes", "Collections route mixed files to the right Flow"],
    tags: ["PDF · images · Excel", "Batch upload"],
    href: "/docs/getting-started",
    cta: "Getting started",
  },
  "email-in": {
    title: "Email in",
    lead: "Every Flow, Collection and Splitter has its own address. Forward the email; each attachment becomes a run.",
    points: ["Turn on the email trigger and copy the address", "Forward or auto-forward from any inbox", "Allow-list senders if you need to"],
    tags: [".pdf .png .jpg .tiff", "One run per attachment"],
    href: "/docs/email-integration",
    cta: "Set up email",
  },
  api: {
    title: "REST API",
    lead: "Send documents from your own systems with an API key; poll or receive a webhook when the run is done.",
    points: ["Collections, Splitters and Matchers have endpoints too", "Read and write Buckets in bulk"],
    code: `curl -X POST /api/runs/process \\
  -H "X-API-Key: YOUR_KEY" \\
  -F "file=@invoice.pdf" -F "flow_id=…"`,
    tags: ["Multipart / base64", "Python & JS examples"],
    href: "/docs/api-integration",
    cta: "API docs",
  },
  mcp: {
    title: "MCP connector",
    lead: "Add Tavnit to claude.ai, Cursor or any MCP client and work by chat.",
    points: ["Build Flows and attach cleaning rules", "Run documents through them", "Query the extracted data: “What did we pay Acme last quarter?”"],
    tags: ["claude.ai", "Cursor", "Org-scoped access"],
    href: "/integrations/mcp",
    cta: "Connect your assistant",
  },
  nocode: {
    title: "No-code tools",
    lead: "Zapier, Make, n8n and Power Automate use the same API and webhooks. Nothing native to install or maintain.",
    points: ["In: an HTTP step posts the file to the API", "Out: the Flow's webhook triggers your scenario", "Map the fields to Sheets, your ERP, Slack, a CRM"],
    tags: ["Zapier", "Make", "n8n", "Power Automate"],
    href: "/docs/api-integration",
    cta: "API and recipes",
  },
  webhooks: {
    title: "Webhooks",
    lead: "The moment a run finishes, Tavnit POSTs its rows and run_id to your URL.",
    points: ["Set the URL in the Flow's settings", "Fields at the top level, typed", "Retries on transient failures; waits for approval when review is on"],
    code: `{ "run_id": "90450e5e…", "flow_id": "…",
  "rows": [ { "vendor": "Acme", "total": 1420 } ] }`,
    tags: ["JSON", "Automatic retry"],
    href: "/docs/webhooks",
    cta: "Configure webhooks",
  },
  "email-out": {
    title: "Email out",
    lead: "Results go by email to whoever needs them, with the rows attached as rows.csv.",
    points: ["Set the recipients on the Flow", "Subject names the Flow, file and run", "With review on, it waits for the approval"],
    tags: ["rows.csv attached", "Any recipient"],
    href: "/docs/email-integration",
    cta: "Email output",
  },
  buckets: {
    title: "Buckets",
    lead: "Structured storage your Flows write to on their own: one row per line, in the schema they extracted.",
    points: ["Edit rows in place, export to Excel or CSV", "Ask in plain language; the database does the maths", "Read or write it by API"],
    tags: ["Auto-export", "Chat", "Read / write API"],
    href: "/docs/buckets",
    cta: "About Buckets",
  },
  agents: {
    title: "Agents",
    lead: "Where there is no API, an Agent opens a real browser and does the steps you describe in plain language.",
    points: ["Starts when a Flow finishes, with the fields as inputs", "Credentials stay in a vault", "Returns typed results by email, webhook or Bucket"],
    tags: ["Supplier portals", "Live view"],
    href: "/docs/agents",
    cta: "About Agents",
  },
  forms: {
    title: "PDF forms",
    lead: "Some results belong on a form, not in a table. Tavnit fills a PDF form template from a run.",
    points: ["Upload the blank form once", "Map its fields to the Flow's fields", "Fill it from any finished run"],
    tags: ["Form templates", "Field mapping"],
  },
  export: {
    title: "Excel and CSV",
    lead: "Every run and every Bucket downloads as a spreadsheet, columns in your Flow's order, numbers as numbers.",
    points: ["A single run, from its result table", "A whole Bucket, after filtering or editing", "Or let the email output attach rows.csv"],
    tags: [".xlsx", "CSV", "JSON via API"],
    href: "/docs/buckets",
    cta: "About Buckets",
  },
};

function RouteChip({ r, active, onSelect }: { r: Route; active: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={`group flex w-[196px] cursor-pointer items-center gap-2.5 rounded-xl border px-2 py-1.5 text-left backdrop-blur transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]/50 ${
        active ? "border-[#3b82f6]/40 bg-bg shadow-[0_6px_18px_-10px_rgba(76,99,246,0.55)]" : "border-tint/10 bg-bg/70 hover:border-tint/25"
      }`}
    >
      <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg transition-colors ${active ? "bg-gradient-to-br from-[#3b82f6] to-[#6c42f0] text-white" : "border border-tint/10 bg-bg text-fg-3 group-hover:text-fg"}`}>
        <r.icon size={15} strokeWidth={1.9} />
      </span>
      <span className="min-w-0">
        <span className="block text-[13px] font-semibold leading-tight text-fg">{r.label}</span>
        <span className="block truncate text-[11px] leading-tight text-fg-5">{r.note}</span>
      </span>
    </button>
  );
}

/** One side of the diagram: the routes, each with its own hairline into a spine that meets the centre. */
function RouteColumn({ title, routes, side, active, onSelect }: { title: string; routes: Route[]; side: "in" | "out"; active: string; onSelect: (id: string) => void }) {
  const color = side === "in" ? "#3b82f6" : "#6c42f0";
  return (
    <div className="w-full">
      <p className={`mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-fg-5 ${side === "out" ? "text-right" : ""}`}>{title}</p>
      <div className="relative flex w-full flex-col gap-2.5">
        {routes.map((r) => {
          const on = r.id === active;
          return (
            <div key={r.id} className={`flex items-center ${side === "out" ? "flex-row-reverse" : ""}`}>
              <RouteChip r={r} active={on} onSelect={() => onSelect(r.id)} />
              <span
                className="h-px flex-1 transition-all duration-300"
                style={{
                  background: on
                    ? `linear-gradient(${side === "in" ? "90deg" : "270deg"}, ${color}55, ${color})`
                    : `linear-gradient(${side === "in" ? "90deg" : "270deg"}, rgba(127,127,127,0.12), ${color}40)`,
                  height: on ? 2 : 1,
                }}
                aria-hidden
              />
            </div>
          );
        })}
        <span className={`absolute top-[23px] bottom-[23px] w-px ${side === "in" ? "right-0" : "left-0"}`} style={{ background: `${color}55` }} aria-hidden />
      </div>
    </div>
  );
}

/**
 * The Tavnit chip in the middle of the diagram. Closed, it is the chip.
 * When a route is chosen it opens: the same dark body grows from the centre
 * into a card that explains that route (one shared layout id, so it is one
 * element changing shape, not a panel appearing). The X, Escape or choosing
 * the same route again closes it back into the chip.
 */
function FlowCore({ id, onClose }: { id: string | null; onClose: () => void }) {
  const d = id ? DETAILS[id] : null;
  useEffect(() => {
    if (!id) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [id, onClose]);

  const mark = (size: number) => (
    <span className="relative block overflow-hidden" style={{ height: size, width: Math.round(size * (390 / 444)) }} aria-hidden>
      <Image src="/assets/tavnit_logo.png" alt="" width={1287} height={444} className="absolute left-0 top-0 w-auto max-w-none [filter:brightness(0)_invert(1)]" style={{ height: size }} />
    </span>
  );

  return (
    <div className="relative flex h-full flex-col items-center justify-center">
      <AnimatePresence initial={false} mode="popLayout">
        {!d ? (
          <motion.div key="chip" className="flex flex-col items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="relative">
              {/* the pins, top and bottom, like a chip on a board */}
              {[0, 1, 2, 3, 4].map((i) => (
                <span key={i} aria-hidden>
                  <span className="absolute -top-[6px] h-2 w-[5px] rounded-[1.5px] bg-[#b9c1c8]" style={{ left: 13 + i * 13.5 - 2.5 }} />
                  <span className="absolute -bottom-[6px] h-2 w-[5px] rounded-[1.5px] bg-[#b9c1c8]" style={{ left: 13 + i * 13.5 - 2.5 }} />
                </span>
              ))}
              <motion.div
                layoutId="flow-core"
                className="relative grid h-20 w-20 place-items-center overflow-hidden bg-gradient-to-b from-[#262c31] to-[#15191c] shadow-[0_10px_24px_-8px_rgba(28,35,33,0.45)] ring-1 ring-white/10"
                style={{ borderRadius: 18 }}
                transition={{ type: "spring", stiffness: 260, damping: 30 }}
              >
                <span className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent to-50%" aria-hidden />
                <span className="absolute inset-[9px] rounded-[11px] ring-1 ring-white/[0.07]" aria-hidden />
                {mark(32)}
              </motion.div>
            </div>
            <p className="mt-3 text-sm font-bold text-fg">Your Flow</p>
          </motion.div>
        ) : (
          // The wrapper centres the card (framer owns the card's transform
          // during the layout animation, so centring cannot live on it).
          <motion.div key="open" className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            layoutId="flow-core"
            role="dialog"
            aria-label={d.title}
            className="relative w-[440px] overflow-hidden bg-bg text-fg shadow-[0_28px_60px_-28px_rgba(76,99,246,0.55)] ring-1 ring-[#3b82f6]/25"
            style={{ borderRadius: 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
          >
            <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#3b82f6] to-[#6c42f0]" aria-hidden />
            <span className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#6c42f0]/10 blur-3xl" aria-hidden />
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.15 } }} exit={{ opacity: 0, transition: { duration: 0.08 } }} className="relative p-6">
              <div className="flex items-start gap-3">
                <span className="relative grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-[10px] bg-gradient-to-b from-[#262c31] to-[#15191c] ring-1 ring-white/10">
                  <span className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent to-50%" aria-hidden />
                  {mark(18)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-fg-5">Your Flow</p>
                  <h3 className="text-lg font-bold leading-tight tracking-tight text-fg">{d.title}</h3>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="grid h-8 w-8 shrink-0 cursor-pointer place-items-center rounded-lg text-fg-5 transition-colors hover:bg-tint/[0.06] hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]/50"
                >
                  <X size={16} />
                </button>
              </div>
              <p className="mt-3 text-[13px] leading-relaxed text-fg-3">{d.lead}</p>
              {d.code && (
                <pre className="mt-3 overflow-x-auto rounded-lg bg-well/40 px-3 py-2.5 ring-1 ring-tint/10">
                  <code className="block whitespace-pre font-mono text-[10.5px] leading-[1.6] text-ok">{d.code}</code>
                </pre>
              )}
              <ul className="mt-3 space-y-1.5">
                {d.points.map((pt) => (
                  <li key={pt} className="flex gap-2 text-[12.5px] leading-snug text-fg-3">
                    <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#6c42f0]" aria-hidden />
                    {pt}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap items-center gap-1.5">
                {d.tags.map((t) => (
                  <span key={t} className="rounded-full px-2 py-0.5 text-[10.5px] font-medium text-fg-4 ring-1 ring-tint/10">{t}</span>
                ))}
                {d.href && d.cta && (
                  <Link href={d.href} className="group ml-auto inline-flex items-center gap-1 text-[12.5px] font-semibold text-fg-2 hover:text-fg">
                    {d.cta}
                    <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                  </Link>
                )}
              </div>
            </motion.div>
          </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Documents in on the left, results out on the right, Tavnit in the middle: choose a route and the chip opens to explain it. */
function IntegrationDiagram() {
  const [active, setActive] = useState<string | null>(null);
  const close = useCallback(() => setActive(null), []);
  const choose = (id: string) => setActive((cur) => (cur === id ? null : id));
  return (
    <div className="glass-card relative overflow-hidden rounded-2xl px-6 py-8 lg:px-10">
      <div className="grid min-h-[380px] grid-cols-[minmax(250px,1fr)_120px_minmax(250px,1fr)] items-center">
        <RouteColumn title="Documents in" routes={IN} side="in" active={active ?? ""} onSelect={choose} />
        <div className="relative flex h-full items-center pt-7">
          <span className="absolute left-0 right-1/2 top-1/2 mt-3.5 h-px bg-[#3b82f6]/55" aria-hidden />
          <span className="absolute left-1/2 right-0 top-1/2 mt-3.5 h-px bg-[#6c42f0]/55" aria-hidden />
          <div className="relative z-10 w-full self-stretch">
            <FlowCore id={active} onClose={close} />
          </div>
        </div>
        <RouteColumn title="Results out" routes={OUT} side="out" active={active ?? ""} onSelect={choose} />
      </div>
      <p className="mt-6 text-center text-[12px] text-fg-5">
        {active ? (
          <>Every route runs the same Flow: the same schema, cleaning rules and review.</>
        ) : (
          <>
            <span className="font-semibold text-fg-3">Pick any route</span> to see how it works. Every one runs the same Flow.
          </>
        )}
      </p>
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════ */

export default function Integrations() {
  const [mobileActive, setMobileActive] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el || !el.children.length) return;
    const first = el.children[0] as HTMLElement;
    const cardWidth = first.offsetWidth + 12;
    const idx = Math.round(el.scrollLeft / cardWidth);
    setMobileActive(Math.min(Math.max(idx, 0), mobileSlides.length - 1));
  }, []);

  const scrollToCard = useCallback((idx: number) => {
    const el = scrollRef.current;
    if (!el || !el.children[idx]) return;
    const child = el.children[idx] as HTMLElement;
    const scrollLeft = child.offsetLeft - (el.offsetWidth - child.offsetWidth) / 2;
    el.scrollTo({ left: scrollLeft, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <section className="py-16 md:py-24" id="integrations" aria-labelledby="integrations-heading">
      {/* ── Phones and tablets: swipable carousel (the diagram needs ~1000px) ── */}
      <div className="lg:hidden">
        <div className="px-4 mb-5">
          <SectionEyebrow align="center" className="mb-3">Integrations</SectionEyebrow>
          <p className="text-xl font-bold text-fg mb-1 text-center" aria-hidden="true">Multiple Ways to Integrate</p>
          <p className="text-xs text-fg-4 text-center">
            Five ways in, six ways out, all through the same Flow
          </p>
        </div>
        <div className="mx-4 mb-5 grid grid-cols-2 gap-3 rounded-xl border border-tint/10 p-4">
          {([["Documents in", IN], ["Results out", OUT]] as const).map(([title, list]) => (
            <div key={title}>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-fg-5">{title}</p>
              <ul className="space-y-1.5">
                {list.map((r) => (
                  <li key={r.label} className="flex items-center gap-2 text-xs text-fg-3">
                    <r.icon size={13} className="shrink-0 text-fg-4" />
                    {r.label}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          ref={scrollRef}
          className="mobile-carousel flex gap-3 px-4 pb-2"
          style={{
            overflowX: "auto",
            overflowY: "hidden",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          } as React.CSSProperties}
        >
          {mobileSlides.map((Slide, i) => (
            <div
              key={i}
              className="flex-none snap-center"
              style={{ width: "calc(100vw - 4rem)" }}
            >
              <Slide />
            </div>
          ))}
          <div className="flex-none w-4" aria-hidden />
        </div>

        <div className="flex justify-center items-center gap-2 mt-4">
          {mobileSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToCard(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === mobileActive ? "w-6 bg-[#3b82f6]" : "w-2 bg-fg-6"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ── Desktop: selector rail + detail panel ── */}
      <div className="hidden lg:block max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <SectionEyebrow align="center">Integrations</SectionEyebrow>
          <h2 id="integrations-heading" className="text-2xl md:text-4xl font-bold tracking-tight text-fg mb-1 md:mb-3">Multiple Ways to Integrate</h2>
          <p className="text-sm md:text-lg text-fg-4 max-w-[600px] mx-auto">
            Five ways in, six ways out, and every one runs the same Flow: your schema,
            cleaning rules and review apply however a document arrives.
          </p>
        </div>


        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <IntegrationDiagram />
        </motion.div>

        {/*
          Routes the section to the real page. Without this the homepage's
          integrations block dead-ends into /docs — setup instructions written
          for existing customers — with no path to the hub for someone still
          evaluating.
        */}
        <div className="text-center mt-8">
          <Link
            href="/integrations"
            className="group inline-flex h-11 items-center gap-2 rounded-full border border-tint/10 px-5 text-sm font-semibold text-fg-2 transition-colors hover:border-tint/25 hover:text-fg"
          >
            See all integrations
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
