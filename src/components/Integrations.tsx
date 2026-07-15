"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Mail, Zap, FileText, Send, Link2, ArrowRight, Plug } from "lucide-react";
import Link from "next/link";
import SheetSection from "./sheet/SheetSection";
import Cell from "./sheet/Cell";

/* ══════════════════════════════════════════
   DESKTOP-ONLY COMPONENTS
   ══════════════════════════════════════════ */

function DesktopFeatureTags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-1 mt-auto pt-5">
      {tags.map((t) => (
        <span key={t} className="bg-[#F0F2F5] border border-[#E7E9EE] rounded-md text-[#6B7686] font-medium px-2.5 py-1 text-[11px]">{t}</span>
      ))}
    </div>
  );
}

function DesktopCardLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="inline-flex items-center gap-1.5 font-semibold text-[#B9820A] hover:text-[#0E1C2B] transition-colors group/link text-sm mt-5">
      {label}
      <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
    </Link>
  );
}

function DesktopEmailSteps({ steps, numbered }: { steps: string[]; numbered?: boolean }) {
  return (
    <div className="space-y-2.5">
      {steps.map((step, i) => (
        <div key={i} className="flex items-start gap-3 text-sm text-[#1B2E44]">
          <span className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-[10px] ${numbered ? "bg-[#FFC53D] text-[#0E1C2B]" : "bg-[#E6F6F0] text-[#0C6B4C]"}`}>
            {numbered ? i + 1 : "✓"}
          </span>
          <span className="leading-snug">{step}</span>
        </div>
      ))}
    </div>
  );
}

const apiEndpoints = [
  { path: "/runs/process", desc: "Extract a document with a flow" },
  { path: "/collections/process", desc: "Auto-route mixed documents" },
  { path: "/splits/run", desc: "Split multi-document PDFs" },
  { path: "/buckets/write", desc: "Write up to 50,000 rows" },
];

function ApiDesktop() {
  return (
    <>
      <div className="bg-[#0E1C2B] rounded-lg overflow-hidden border border-[#1B2E44]">
        <div className="flex justify-between items-center px-4 py-2 border-b border-[#1B2E44]">
          <span className="text-[10px] font-bold text-[#FFC53D] uppercase tracking-widest">cURL</span>
          <span className="text-[10px] text-[#9FB0C4]">Quick Example</span>
        </div>
        <pre className="p-4 overflow-x-auto">
          <code className="font-mono text-[11px] leading-[1.7] text-[#17A67B] block whitespace-pre">{`curl -X POST /api/runs/process \\
  -H "X-API-Key: YOUR_KEY" \\
  -F "file=@invoice.pdf" \\
  -F "flow_id=YOUR_FLOW_ID"`}</code>
        </pre>
      </div>
      <div className="mt-4">
        <h4 className="text-xs font-bold text-[#6B7686] uppercase tracking-wider mb-2.5">More Endpoints</h4>
        <div className="space-y-1.5">
          {apiEndpoints.map((e) => (
            <div key={e.path} className="flex items-center gap-2.5 text-[12px]">
              <span className="px-1.5 py-0.5 rounded bg-[#FFF6DE] text-[#B9820A] font-mono font-bold text-[9px] flex-shrink-0">POST</span>
              <code className="font-mono text-[#1B2E44] flex-shrink-0">{e.path}</code>
              <span className="text-[#6B7686] truncate">— {e.desc}</span>
            </div>
          ))}
        </div>
      </div>
      <DesktopFeatureTags tags={["API key auth", "Multipart / JSON", "Python & JS examples", "Zapier · Make · n8n"]} />
      <DesktopCardLink href="/docs#api-integration" label="View API Docs" />
    </>
  );
}

function EmailDesktop() {
  return (
    <>
      <div className="space-y-5">
        <div>
          <h4 className="text-xs font-bold text-[#6B7686] uppercase tracking-wider mb-3">Email Trigger</h4>
          <DesktopEmailSteps steps={["Enable Email Trigger on your flow", "Copy your flow's unique email address", "Forward PDFs/images as attachments"]} numbered />
        </div>
        <div>
          <h4 className="text-xs font-bold text-[#6B7686] uppercase tracking-wider mb-3">Email Output</h4>
          <DesktopEmailSteps steps={["Configure recipient email in flow settings", "Receive JSON results automatically"]} />
        </div>
        <div>
          <h4 className="text-xs font-bold text-[#6B7686] uppercase tracking-wider mb-2.5">Accepted Attachments</h4>
          <div className="flex items-center flex-wrap gap-1.5 mb-2">
            {[".pdf", ".png", ".jpg", ".tiff", ".webp", "+ more"].map((ext) => (
              <span key={ext} className="px-2 py-0.5 rounded bg-[#F0F2F5] border border-[#C9CFD8] text-[#1B2E44] font-mono text-[10px]">{ext}</span>
            ))}
          </div>
          <p className="text-[12px] text-[#6B7686] leading-snug">
            Each attachment becomes its own run — forward a batch and get one result per
            document. Collections and Splitters have email addresses too, so mixed
            documents route themselves.
          </p>
        </div>
      </div>
      <DesktopFeatureTags tags={["Unique address per flow", "Works with Collections", "One run per attachment", "Auto replies"]} />
      <DesktopCardLink href="/docs#email-integration" label="Setup Email" />
    </>
  );
}

function WebhookDesktop() {
  return (
    <>
      <div className="p-4 bg-[#F0F2F5] rounded-lg border border-[#E7E9EE]">
        <div className="flex items-start justify-between">
          {[
            { icon: FileText, label: "Document processed" },
            { icon: Send, label: "Tavnit sends POST" },
            { icon: Link2, label: "Your URL receives data" },
          ].map((item, i) => (
            <div key={i} className="flex items-start flex-1">
              <div className="flex flex-col items-center gap-2 flex-1">
                <div className="w-10 h-10 rounded-full bg-white border border-[#C9CFD8] flex items-center justify-center text-[#B9820A] shadow-sm">
                  <item.icon size={18} />
                </div>
                <span className="text-[11px] text-[#6B7686] font-medium text-center leading-tight max-w-[90px]">{item.label}</span>
              </div>
              {i < 2 && (
                <div className="h-10 flex items-center flex-shrink-0" aria-hidden="true">
                  <ArrowRight size={16} className="text-[#B9820A]/50" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 bg-[#0E1C2B] rounded-lg overflow-hidden border border-[#1B2E44]">
        <div className="flex justify-between items-center px-4 py-2 border-b border-[#1B2E44]">
          <span className="text-[10px] font-bold text-[#FFC53D] uppercase tracking-widest">Payload</span>
          <span className="text-[10px] text-[#9FB0C4]">Sent to your URL</span>
        </div>
        <pre className="p-3.5 overflow-x-auto">
          <code className="font-mono text-[11px] leading-[1.6] text-[#17A67B] block whitespace-pre">{`{
  "vendor": "Acme Corp",
  "invoice_number": "INV-2043",
  "total": "1,420.00",
  "run_id": "4127a3f8-…",
  "flow_id": "9b2e51c0-…"
}`}</code>
        </pre>
      </div>
      <p className="text-[12px] text-[#6B7686] leading-snug mt-3">
        Your extracted fields arrive at the top level, alongside the run and flow
        IDs. Set the URL in your flow&apos;s settings — deliveries retry
        automatically on transient connection failures.
      </p>
      <DesktopFeatureTags tags={["Fires on completion", "JSON results", "Automatic retry", "Make & Zapier triggers"]} />
      <DesktopCardLink href="/docs#webhooks" label="Configure Webhooks" />
    </>
  );
}

function McpDesktop() {
  return (
    <>
      <div className="space-y-5">
        <div>
          <h4 className="text-xs font-bold text-[#6B7686] uppercase tracking-wider mb-3">Connect in Minutes</h4>
          <DesktopEmailSteps steps={["Generate a connector URL in Integrations", "Paste it into claude.ai, Cursor, or any MCP client", "Ask your assistant to run flows and query your data"]} numbered />
        </div>
        <div>
          <h4 className="text-xs font-bold text-[#6B7686] uppercase tracking-wider mb-3">What Your Assistant Can Do</h4>
          <DesktopEmailSteps steps={["Process documents through your flows", "Read and search your Buckets"]} />
        </div>
        <div>
          <h4 className="text-xs font-bold text-[#6B7686] uppercase tracking-wider mb-2.5">Try Asking</h4>
          <div className="space-y-1.5">
            {[
              "“Run this invoice through my Supplier Invoices flow”",
              "“What did we pay Acme Corp last quarter?”",
            ].map((prompt) => (
              <div key={prompt} className="px-3 py-1.5 rounded-lg bg-[#FFF6DE] border border-[#FFC53D]/40 text-[12px] text-[#1B2E44] italic">
                {prompt}
              </div>
            ))}
          </div>
        </div>
      </div>
      <DesktopFeatureTags tags={["claude.ai (Pro+)", "Cursor", "Any MCP client", "Org-scoped access"]} />
      <DesktopCardLink href="/docs#mcp-connector" label="Connect Your Assistant" />
    </>
  );
}

/* ══════════════════════════════════════════
   MOBILE CARD CONTENT (full info, no shortcuts)
   ══════════════════════════════════════════ */

function MobileEmailSteps({ steps, numbered }: { steps: string[]; numbered?: boolean }) {
  return (
    <div className="space-y-1.5">
      {steps.map((step, i) => (
        <div key={i} className="flex items-start gap-2 text-xs text-[#1B2E44]">
          <span className={`w-[18px] h-[18px] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-[9px] ${
            numbered ? "bg-[#FFC53D] text-[#0E1C2B]" : "bg-[#E6F6F0] text-[#0C6B4C]"
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
    <div className="glass-card rounded-lg p-5 border border-[#C9CFD8] flex flex-col h-full">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-[#FFF6DE] flex items-center justify-center text-[#B9820A] flex-shrink-0">
          <Code2 size={20} />
        </div>
        <div>
          <h3 className="text-base font-bold text-[#0E1C2B]">REST API</h3>
          <p className="text-[11px] text-[#6B7686]">Full programmatic control</p>
        </div>
      </div>

      <div className="bg-[#0E1C2B] rounded-lg overflow-hidden border border-[#1B2E44] mb-3">
        <div className="flex justify-between items-center px-3 py-1.5 border-b border-[#1B2E44]">
          <span className="text-[9px] font-bold text-[#FFC53D] uppercase tracking-widest">cURL</span>
          <span className="text-[9px] text-[#9FB0C4]">Quick Example</span>
        </div>
        <pre className="p-2.5 overflow-x-auto">
          <code className="font-mono text-[10px] leading-relaxed text-[#17A67B] block whitespace-pre-wrap break-all">{`curl -X POST /api/runs/process \\
  -H "X-API-Key: YOUR_KEY" \\
  -F "file=@invoice.pdf" \\
  -F "flow_id=YOUR_FLOW_ID"`}</code>
        </pre>
      </div>

      <div className="flex flex-wrap gap-1 mb-3">
        {["API key auth", "Multipart / JSON", "Real-time", "Python & JS SDKs"].map((t) => (
          <span key={t} className="bg-[#F0F2F5] border border-[#E7E9EE] rounded px-1.5 py-0.5 text-[9px] text-[#6B7686] font-medium">{t}</span>
        ))}
      </div>

      <Link href="/docs#api-integration" className="inline-flex items-center gap-1.5 font-semibold text-[#B9820A] text-xs mt-auto">
        View API Docs <ArrowRight size={12} />
      </Link>
    </div>
  );
}

function EmailMobileCard() {
  return (
    <div className="glass-card rounded-lg p-5 border border-[#C9CFD8] flex flex-col h-full">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-[#FFF6DE] flex items-center justify-center text-[#B9820A] flex-shrink-0">
          <Mail size={20} />
        </div>
        <div>
          <h3 className="text-base font-bold text-[#0E1C2B]">Email Integration</h3>
          <p className="text-[11px] text-[#6B7686]">Send & receive via email</p>
        </div>
      </div>

      <div className="space-y-3 mb-3">
        <div>
          <h4 className="text-[10px] font-bold text-[#6B7686] uppercase tracking-wider mb-1.5">Email Trigger</h4>
          <MobileEmailSteps steps={["Enable Email Trigger on your flow", "Copy your flow's unique email address", "Forward PDFs/images as attachments"]} numbered />
        </div>
        <div>
          <h4 className="text-[10px] font-bold text-[#6B7686] uppercase tracking-wider mb-1.5">Email Output</h4>
          <MobileEmailSteps steps={["Configure recipient email in flow settings", "Receive JSON results automatically"]} />
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mb-3">
        {["Unique email per flow", "Mixed doc routing", "One run per attachment", "Auto replies"].map((t) => (
          <span key={t} className="bg-[#F0F2F5] border border-[#E7E9EE] rounded px-1.5 py-0.5 text-[9px] text-[#6B7686] font-medium">{t}</span>
        ))}
      </div>

      <Link href="/docs#email-integration" className="inline-flex items-center gap-1.5 font-semibold text-[#B9820A] text-xs mt-auto">
        Setup Email <ArrowRight size={12} />
      </Link>
    </div>
  );
}

function WebhookMobileCard() {
  return (
    <div className="glass-card rounded-lg p-5 border border-[#C9CFD8] flex flex-col h-full">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-[#FFF6DE] flex items-center justify-center text-[#B9820A] flex-shrink-0">
          <Zap size={20} />
        </div>
        <div>
          <h3 className="text-base font-bold text-[#0E1C2B]">Webhooks</h3>
          <p className="text-[11px] text-[#6B7686]">Real-time notifications</p>
        </div>
      </div>

      <div className="p-3 bg-[#F0F2F5] rounded-lg border border-[#E7E9EE] mb-3">
        <div className="flex items-start justify-between">
          {[
            { icon: FileText, label: "Document processed" },
            { icon: Send, label: "Tavnit sends POST" },
            { icon: Link2, label: "Your URL receives data" },
          ].map((item, i) => (
            <div key={i} className="flex items-start flex-1">
              <div className="flex flex-col items-center gap-1.5 flex-1">
                <div className="w-8 h-8 rounded-full bg-white border border-[#C9CFD8] flex items-center justify-center text-[#B9820A]">
                  <item.icon size={14} />
                </div>
                <span className="text-[9px] text-[#6B7686] font-medium text-center leading-tight max-w-[74px]">{item.label}</span>
              </div>
              {i < 2 && (
                <div className="h-8 flex items-center flex-shrink-0" aria-hidden="true">
                  <ArrowRight size={12} className="text-[#B9820A]/50" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-start gap-2 text-xs text-[#1B2E44] mb-3">
        <span className="w-[18px] h-[18px] rounded-full bg-[#FFC53D] text-[#0E1C2B] text-[9px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">→</span>
        <span className="leading-snug">Configure webhook URL in flow settings</span>
      </div>

      <div className="flex flex-wrap gap-1 mb-3">
        {["Auto notifications", "JSON results", "Make & Zapier"].map((t) => (
          <span key={t} className="bg-[#F0F2F5] border border-[#E7E9EE] rounded px-1.5 py-0.5 text-[9px] text-[#6B7686] font-medium">{t}</span>
        ))}
      </div>

      <Link href="/docs#webhooks" className="inline-flex items-center gap-1.5 font-semibold text-[#B9820A] text-xs mt-auto">
        Configure Webhooks <ArrowRight size={12} />
      </Link>
    </div>
  );
}

function McpMobileCard() {
  return (
    <div className="glass-card rounded-lg p-5 border border-[#C9CFD8] flex flex-col h-full">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-[#FFF6DE] flex items-center justify-center text-[#B9820A] flex-shrink-0">
          <Plug size={20} />
        </div>
        <div>
          <h3 className="text-base font-bold text-[#0E1C2B]">MCP Connector</h3>
          <p className="text-[11px] text-[#6B7686]">Your AI assistant, connected</p>
        </div>
      </div>

      <div className="space-y-3 mb-3">
        <div>
          <h4 className="text-[10px] font-bold text-[#6B7686] uppercase tracking-wider mb-1.5">Connect in Minutes</h4>
          <MobileEmailSteps steps={["Generate a connector URL in Integrations", "Paste it into claude.ai, Cursor, or any MCP client", "Ask your assistant to run flows and query your data"]} numbered />
        </div>
        <div>
          <h4 className="text-[10px] font-bold text-[#6B7686] uppercase tracking-wider mb-1.5">What Your Assistant Can Do</h4>
          <MobileEmailSteps steps={["Process documents through your flows", "Read and search your Buckets"]} />
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mb-3">
        {["claude.ai (Pro+)", "Cursor", "Any MCP client", "Org-scoped access"].map((t) => (
          <span key={t} className="bg-[#F0F2F5] border border-[#E7E9EE] rounded px-1.5 py-0.5 text-[9px] text-[#6B7686] font-medium">{t}</span>
        ))}
      </div>

      <Link href="/docs#mcp-connector" className="inline-flex items-center gap-1.5 font-semibold text-[#B9820A] text-xs mt-auto">
        Connect Your Assistant <ArrowRight size={12} />
      </Link>
    </div>
  );
}

const mobileSlides = [ApiMobileCard, EmailMobileCard, WebhookMobileCard, McpMobileCard];

/* Desktop selector rail + detail panel */
const methods = [
  { id: "api", icon: Code2, title: "REST API", subtitle: "Full programmatic control", Content: ApiDesktop },
  { id: "email", icon: Mail, title: "Email Integration", subtitle: "Send & receive via email", Content: EmailDesktop },
  { id: "webhooks", icon: Zap, title: "Webhooks", subtitle: "Real-time notifications", Content: WebhookDesktop },
  { id: "mcp", icon: Plug, title: "MCP Connector", subtitle: "Your AI assistant, connected", Content: McpDesktop },
];

/* ══════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════ */

export const ROWS = 19;

export default function Integrations({ startRow }: { startRow: number }) {
  const [mobileActive, setMobileActive] = useState(0);
  const [desktopActive, setDesktopActive] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const ActiveContent = methods[desktopActive].Content;

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
    <SheetSection id="integrations" startRow={startRow} rows={ROWS} ariaLabelledby="integrations-heading">
      {/* ── Mobile: swipable carousel (one bare cell keeps the scroll/snap logic intact) ── */}
      <Cell c={1} span={12} r={2} rowSpan={16} variant="k-bare" interactive={false} className="md:hidden!">
        <div className="md:hidden">
          <div className="px-4 mb-5">
            <p className="text-xl font-bold text-[#0E1C2B] mb-1 text-center" aria-hidden="true">Multiple Ways to Integrate</p>
            <p className="text-xs text-[#6B7686] text-center">
              Choose the integration method that fits your workflow
            </p>
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
                  i === mobileActive ? "w-6 bg-[#FFC53D]" : "w-2 bg-[#C9CFD8]"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </Cell>

      {/* ── Desktop: heading, subtitle, then the selector rail + detail panel as sheet cells ── */}

      {/* Heading */}
      <Cell
        c={2}
        span={10}
        r={2}
        rowSpan={2}
        variant="k-title"
        className="justify-center text-center max-md:hidden!"
        formula="=INTEGRATE(api, email, webhooks, mcp)"
      >
        <h2 id="integrations-heading">Multiple Ways to Integrate</h2>
      </Cell>

      {/* Subtitle */}
      <Cell
        c={2}
        span={10}
        r={4}
        variant="k-sub"
        className="justify-center text-center max-md:hidden!"
        formula="=CHOOSE(method, your_workflow)"
      >
        <p className="max-w-[540px] mx-auto">
          Choose the integration method that fits your workflow
        </p>
      </Cell>

      {/* Selector rail + detail panel — one bare cell preserves the shared tab state & reveal */}
      <Cell c={2} span={10} r={6} rowSpan={13} variant="k-bare" interactive={false} className="max-md:hidden!">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 w-full">
          <motion.div
            className="grid grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] gap-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Selector rail */}
            <div className="flex flex-col gap-3" role="tablist" aria-label="Integration methods">
              {methods.map((m, i) => {
                const active = i === desktopActive;
                return (
                  <button
                    key={m.id}
                    role="tab"
                    id={`integration-tab-${m.id}`}
                    aria-selected={active}
                    aria-controls="integration-panel"
                    onClick={() => setDesktopActive(i)}
                    className={`glass-card rounded-lg px-4 py-3.5 flex items-center gap-3.5 text-left transition-all duration-300 cursor-pointer flex-1 ${
                      active
                        ? "border-[#0E1C2B] bg-[#FFF6DE] shadow-[inset_0_0_0_1px_#0E1C2B]"
                        : "hover:border-[#0E1C2B] hover:bg-[#FFF6DE]"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        active
                          ? "bg-[#FFC53D] text-[#0E1C2B] shadow-[0_2px_0_#B9820A]"
                          : "bg-[#FFF6DE] text-[#B9820A]"
                      }`}
                    >
                      <m.icon size={19} />
                    </div>
                    <div className="min-w-0">
                      <div className={`text-sm font-bold transition-colors ${active ? "text-[#0E1C2B]" : "text-[#1B2E44]"}`}>
                        {m.title}
                      </div>
                      <div className="text-xs text-[#6B7686] truncate">{m.subtitle}</div>
                    </div>
                    <ArrowRight
                      size={15}
                      className={`ml-auto flex-shrink-0 transition-all duration-300 ${
                        active ? "text-[#B9820A] opacity-100 translate-x-0" : "opacity-0 -translate-x-1"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Detail panel */}
            <div
              id="integration-panel"
              role="tabpanel"
              aria-labelledby={`integration-tab-${methods[desktopActive].id}`}
              className="glass-card rounded-lg p-6 lg:p-7 h-[520px] lg:h-[490px] overflow-y-auto overflow-x-hidden"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={methods[desktopActive].id}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col h-full"
                >
                  <ActiveContent />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </Cell>
    </SheetSection>
  );
}
