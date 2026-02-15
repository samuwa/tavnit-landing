"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Code2, Mail, Zap, FileText, Send, Link2, ArrowRight } from "lucide-react";
import Link from "next/link";

/* ══════════════════════════════════════════
   DESKTOP-ONLY COMPONENTS (unchanged)
   ══════════════════════════════════════════ */

function GradientBar() {
  return (
    <div className="h-1 bg-gradient-to-r from-[#667eea] to-[#764ba2] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
  );
}

function DesktopCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="group glass-card rounded-2xl flex flex-col relative overflow-hidden hover:border-[#667eea]/30 hover:shadow-xl hover:shadow-[#667eea]/5 hover:-translate-y-1 transition-all duration-300 h-full">
      <GradientBar />
      <div className="p-6 lg:p-7 flex flex-col flex-1">{children}</div>
    </div>
  );
}

function DesktopCardHeader({ icon: Icon, title, subtitle }: { icon: typeof Code2; title: string; subtitle: string }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="w-12 h-12 rounded-xl bg-[#667eea]/10 flex items-center justify-center text-[#667eea] group-hover:bg-gradient-to-r group-hover:from-[#667eea] group-hover:to-[#764ba2] group-hover:text-white transition-all duration-300 flex-shrink-0">
        <Icon size={24} />
      </div>
      <div>
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <p className="text-sm text-gray-400">{subtitle}</p>
      </div>
    </div>
  );
}

function DesktopFeatureTags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-1 mt-auto pt-5">
      {tags.map((t) => (
        <span key={t} className="bg-white/5 border border-white/10 rounded-md text-gray-400 font-medium px-2.5 py-1 text-[11px]">{t}</span>
      ))}
    </div>
  );
}

function DesktopCardLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="inline-flex items-center gap-1.5 font-semibold text-[#667eea] hover:text-[#a78bfa] transition-colors group/link text-sm mt-5">
      {label}
      <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
    </Link>
  );
}

function DesktopEmailSteps({ steps, numbered }: { steps: string[]; numbered?: boolean }) {
  return (
    <div className="space-y-2.5">
      {steps.map((step, i) => (
        <div key={i} className="flex items-start gap-3 text-sm text-gray-300">
          <span className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-[10px] ${numbered ? "bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white" : "bg-emerald-500/20 text-emerald-400"}`}>
            {numbered ? i + 1 : "✓"}
          </span>
          <span className="leading-snug">{step}</span>
        </div>
      ))}
    </div>
  );
}

function ApiDesktop() {
  return (
    <>
      <DesktopCardHeader icon={Code2} title="REST API" subtitle="Full programmatic control" />
      <div className="bg-black/40 rounded-lg overflow-hidden border border-white/5">
        <div className="flex justify-between items-center px-4 py-2 border-b border-white/5">
          <span className="text-[10px] font-bold text-[#667eea] uppercase tracking-widest">cURL</span>
          <span className="text-[10px] text-gray-500">Quick Example</span>
        </div>
        <pre className="p-4 overflow-x-auto">
          <code className="font-mono text-[11px] leading-[1.7] text-emerald-400 block whitespace-pre">{`curl -X POST /api/runs/process \\
  -H "X-API-Key: YOUR_KEY" \\
  -F "file=@invoice.pdf" \\
  -F "flow_id=YOUR_FLOW_ID"`}</code>
        </pre>
      </div>
      <Link href="/docs#api-integration" className="flex items-center justify-center gap-2 w-full py-2.5 mt-4 bg-white/5 border border-white/10 rounded-lg text-gray-300 text-sm font-medium hover:bg-white/10 hover:border-[#667eea]/30 hover:text-white transition-all">
        <FileText size={14} />
        View Full Examples
      </Link>
      <DesktopFeatureTags tags={["API key auth", "Multipart / JSON", "Real-time", "Python & JS SDKs"]} />
      <DesktopCardLink href="/docs#api-integration" label="View API Docs" />
    </>
  );
}

function EmailDesktop() {
  return (
    <>
      <DesktopCardHeader icon={Mail} title="Email Integration" subtitle="Send & receive via email" />
      <div className="space-y-5">
        <div>
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Email Trigger</h4>
          <DesktopEmailSteps steps={["Enable Email Trigger on your flow", "Copy your flow's unique email address", "Forward PDFs/images as attachments"]} numbered />
        </div>
        <div>
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Email Output</h4>
          <DesktopEmailSteps steps={["Configure recipient email in flow settings", "Receive JSON results automatically"]} />
        </div>
      </div>
      <DesktopFeatureTags tags={["Unique email per flow", "Mixed doc routing", "One run per attachment", "Auto replies"]} />
      <DesktopCardLink href="/docs#email-integration" label="Setup Email" />
    </>
  );
}

function WebhookDesktop() {
  return (
    <>
      <DesktopCardHeader icon={Zap} title="Webhooks" subtitle="Real-time notifications" />
      <div className="p-5 bg-white/3 rounded-xl border border-white/5">
        <div className="flex items-center justify-between">
          {[
            { icon: FileText, label: "Document processed" },
            { icon: Send, label: "Tavnit sends POST" },
            { icon: Link2, label: "Your URL receives data" },
          ].map((item, i) => (
            <div key={i} className="flex items-center">
              <div className="flex flex-col items-center gap-2 w-[80px]">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#667eea] shadow-sm">
                  <item.icon size={18} />
                </div>
                <span className="text-[11px] text-gray-400 font-medium text-center leading-tight">{item.label}</span>
              </div>
              {i < 2 && <ArrowRight size={16} className="text-[#667eea]/50 mx-1 flex-shrink-0 -mt-5" />}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-start gap-3 text-sm text-gray-300 mt-5">
        <span className="w-5 h-5 rounded-full bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">→</span>
        <span className="leading-snug">Configure webhook URL in flow settings</span>
      </div>
      <DesktopFeatureTags tags={["Auto notifications", "JSON results", "Make & Zapier"]} />
      <DesktopCardLink href="/docs#webhooks" label="Configure Webhooks" />
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
        <div key={i} className="flex items-start gap-2 text-xs text-gray-300">
          <span className={`w-[18px] h-[18px] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-[9px] ${
            numbered ? "bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white" : "bg-emerald-500/20 text-emerald-400"
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
    <div className="glass-card rounded-xl p-5 border border-white/10 flex flex-col h-full">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-[#667eea]/10 flex items-center justify-center text-[#667eea] flex-shrink-0">
          <Code2 size={20} />
        </div>
        <div>
          <h3 className="text-base font-bold text-white">REST API</h3>
          <p className="text-[11px] text-gray-400">Full programmatic control</p>
        </div>
      </div>

      <div className="bg-black/40 rounded-lg overflow-hidden border border-white/5 mb-3">
        <div className="flex justify-between items-center px-3 py-1.5 border-b border-white/5">
          <span className="text-[9px] font-bold text-[#667eea] uppercase tracking-widest">cURL</span>
          <span className="text-[9px] text-gray-500">Quick Example</span>
        </div>
        <pre className="p-2.5 overflow-x-auto">
          <code className="font-mono text-[10px] leading-relaxed text-emerald-400 block whitespace-pre-wrap break-all">{`curl -X POST /api/runs/process \\
  -H "X-API-Key: YOUR_KEY" \\
  -F "file=@invoice.pdf" \\
  -F "flow_id=YOUR_FLOW_ID"`}</code>
        </pre>
      </div>

      <div className="flex flex-wrap gap-1 mb-3">
        {["API key auth", "Multipart / JSON", "Real-time", "Python & JS SDKs"].map((t) => (
          <span key={t} className="bg-white/5 border border-white/10 rounded px-1.5 py-0.5 text-[9px] text-gray-400 font-medium">{t}</span>
        ))}
      </div>

      <Link href="/docs#api-integration" className="inline-flex items-center gap-1.5 font-semibold text-[#667eea] text-xs mt-auto">
        View API Docs <ArrowRight size={12} />
      </Link>
    </div>
  );
}

function EmailMobileCard() {
  return (
    <div className="glass-card rounded-xl p-5 border border-white/10 flex flex-col h-full">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-[#667eea]/10 flex items-center justify-center text-[#667eea] flex-shrink-0">
          <Mail size={20} />
        </div>
        <div>
          <h3 className="text-base font-bold text-white">Email Integration</h3>
          <p className="text-[11px] text-gray-400">Send & receive via email</p>
        </div>
      </div>

      <div className="space-y-3 mb-3">
        <div>
          <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Email Trigger</h4>
          <MobileEmailSteps steps={["Enable Email Trigger on your flow", "Copy your flow's unique email address", "Forward PDFs/images as attachments"]} numbered />
        </div>
        <div>
          <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Email Output</h4>
          <MobileEmailSteps steps={["Configure recipient email in flow settings", "Receive JSON results automatically"]} />
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mb-3">
        {["Unique email per flow", "Mixed doc routing", "One run per attachment", "Auto replies"].map((t) => (
          <span key={t} className="bg-white/5 border border-white/10 rounded px-1.5 py-0.5 text-[9px] text-gray-400 font-medium">{t}</span>
        ))}
      </div>

      <Link href="/docs#email-integration" className="inline-flex items-center gap-1.5 font-semibold text-[#667eea] text-xs mt-auto">
        Setup Email <ArrowRight size={12} />
      </Link>
    </div>
  );
}

function WebhookMobileCard() {
  return (
    <div className="glass-card rounded-xl p-5 border border-white/10 flex flex-col h-full">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-[#667eea]/10 flex items-center justify-center text-[#667eea] flex-shrink-0">
          <Zap size={20} />
        </div>
        <div>
          <h3 className="text-base font-bold text-white">Webhooks</h3>
          <p className="text-[11px] text-gray-400">Real-time notifications</p>
        </div>
      </div>

      <div className="p-3 bg-white/3 rounded-xl border border-white/5 mb-3">
        <div className="flex items-center justify-between">
          {[
            { icon: FileText, label: "Document processed" },
            { icon: Send, label: "Tavnit sends POST" },
            { icon: Link2, label: "Your URL receives data" },
          ].map((item, i) => (
            <div key={i} className="flex items-center">
              <div className="flex flex-col items-center gap-1.5 w-[70px]">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#667eea]">
                  <item.icon size={14} />
                </div>
                <span className="text-[9px] text-gray-400 font-medium text-center leading-tight">{item.label}</span>
              </div>
              {i < 2 && <ArrowRight size={12} className="text-[#667eea]/50 mx-0.5 flex-shrink-0 -mt-3" />}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-start gap-2 text-xs text-gray-300 mb-3">
        <span className="w-[18px] h-[18px] rounded-full bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white text-[9px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">→</span>
        <span className="leading-snug">Configure webhook URL in flow settings</span>
      </div>

      <div className="flex flex-wrap gap-1 mb-3">
        {["Auto notifications", "JSON results", "Make & Zapier"].map((t) => (
          <span key={t} className="bg-white/5 border border-white/10 rounded px-1.5 py-0.5 text-[9px] text-gray-400 font-medium">{t}</span>
        ))}
      </div>

      <Link href="/docs#webhooks" className="inline-flex items-center gap-1.5 font-semibold text-[#667eea] text-xs mt-auto">
        Configure Webhooks <ArrowRight size={12} />
      </Link>
    </div>
  );
}

const mobileSlides = [ApiMobileCard, EmailMobileCard, WebhookMobileCard];

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
    <section className="py-12" id="integrations">
      {/* ── Mobile: swipable carousel ── */}
      <div className="md:hidden">
        <div className="px-4 mb-5">
          <h2 className="text-xl font-bold text-white mb-1 text-center">Multiple Ways to Integrate</h2>
          <p className="text-xs text-gray-400 text-center">
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
                i === mobileActive ? "w-6 bg-[#667eea]" : "w-2 bg-gray-600"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ── Desktop: 3-column grid ── */}
      <div className="hidden md:block max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-6 md:mb-14">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-1 md:mb-3">Multiple Ways to Integrate</h2>
          <p className="text-sm md:text-lg text-gray-400 max-w-[540px] mx-auto">
            Choose the integration method that fits your workflow
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <DesktopCard><ApiDesktop /></DesktopCard>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <DesktopCard><EmailDesktop /></DesktopCard>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <DesktopCard><WebhookDesktop /></DesktopCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
