"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { GitBranch, MonitorPlay, PackageCheck, ArrowRight, MousePointer2, Target } from "lucide-react";
import SectionEyebrow from "@/components/SectionEyebrow";

/* The fields a flow already extracted — the agent's working material.
   Each one is typed into the matching form field during its step. */
const extractedFields = [
  { key: "vendor", value: "Acme Corp", label: "Vendor name", width: "9ch" },
  { key: "invoice_no", value: "INV-2043", label: "Invoice number", width: "8ch" },
  { key: "total", value: "$1,420.00", label: "Amount (USD)", width: "9ch" },
];

/* Agent step log, in plain language: open → fill ×3 → click → read */
const agentSteps = [
  { verb: "open", detail: "the supplier payment portal" },
  { verb: "fill", detail: "Vendor name ← extracted vendor" },
  { verb: "fill", detail: "Invoice number ← extracted invoice_no" },
  { verb: "fill", detail: "Amount ← extracted total" },
  { verb: "click", detail: '"Submit payment"' },
  { verb: "read", detail: "the confirmation number" },
];

/* Where the agent cursor hovers during each step (percent of the page area) */
const cursorPositions: { left: string; top: string; opacity: number }[] = [
  { left: "50%", top: "115%", opacity: 0 }, // 0 open — offscreen
  { left: "18%", top: "48%", opacity: 1 }, // 1 fill vendor
  { left: "51%", top: "48%", opacity: 1 }, // 2 fill invoice number
  { left: "84%", top: "48%", opacity: 1 }, // 3 fill amount
  { left: "17%", top: "84%", opacity: 1 }, // 4 click submit
  { left: "68%", top: "84%", opacity: 1 }, // 5 read confirmation
  { left: "68%", top: "84%", opacity: 0 }, // 6 done — fade out
];

/* Timeline: one tick per step, then the output panel holds, then loop */
const STEP_MS = 1200;
const OUTPUT_HOLD_MS = 3200;

const highlights = [
  {
    icon: GitBranch,
    title: "Chain to any flow",
    desc: "A finished extraction can launch an agent automatically, feeding extracted fields in as inputs.",
  },
  {
    icon: MonitorPlay,
    title: "Watch it work, live",
    desc: "Every run streams a live view of the browser session — follow each step as it happens.",
  },
  {
    icon: PackageCheck,
    title: "Typed results, delivered",
    desc: "Agents return data that matches your schema, delivered by email, webhook, or straight into a Bucket.",
  },
];

function BrowserDemo({ step }: { step: number }) {
  const outputVisible = step >= agentSteps.length;
  const clicked = step >= 5;
  const confirmationVisible = step >= 5;
  const captured = step >= 6;
  const cursor = cursorPositions[Math.min(step, cursorPositions.length - 1)];

  return (
    <div className="glass-card rounded-2xl overflow-hidden border border-[#3b82f6]/20 shadow-2xl shadow-[#3b82f6]/10">
      {/* Browser chrome */}
      <div className="flex items-center gap-3 px-4 py-2.5 bg-tint/5 border-b border-tint/10">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/60" />
        </div>
        <div className="flex-1 flex items-center gap-2 bg-well/30 rounded-md px-3 py-1 text-[11px] text-fg-4 font-mono truncate">
          {step >= 1 ? "portal.acme-suppliers.com/payments/new" : "about:blank"}
        </div>
        <span className="flex items-center gap-1.5 text-[10px] font-bold text-ok uppercase tracking-wider flex-shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Live
        </span>
      </div>

      {/* The mission — so every step below reads as progress toward it */}
      <div className="flex items-center gap-2 px-4 sm:px-5 py-2.5 border-b border-tint/10 bg-[#3b82f6]/[0.06] text-xs">
        <Target size={13} className="text-accent-2 flex-shrink-0" />
        <span className="text-accent-2 font-bold uppercase tracking-wider text-[10px]">Mission</span>
        <span className="text-fg-3 truncate">Submit invoice INV-2043 for payment on the supplier portal</span>
      </div>

      {/* What the flow extracted — the agent's inputs. Each chip lights
          up while its value is being typed into the form below. */}
      <div className="px-4 sm:px-5 py-2.5 border-b border-tint/10 bg-well/20">
        <div className="text-[10px] font-bold text-fg-5 uppercase tracking-widest mb-1.5">
          Extracted by your flow · invoice_2043.pdf
        </div>
        <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
          {extractedFields.map((f, i) => {
            const inUse = step === i + 1;
            const used = step > i + 1;
            return (
              <span
                key={f.key}
                className={`rounded-md border px-2 py-1 transition-all duration-300 ${
                  inUse
                    ? "border-[#3b82f6]/60 bg-[#3b82f6]/15 text-fg"
                    : used
                      ? "border-tint/10 bg-tint/[0.04] text-fg-5"
                      : "border-tint/10 bg-tint/[0.06] text-fg-3"
                }`}
              >
                {f.key}: <span className={inUse ? "text-accent-2" : ""}>{f.value}</span>
                {used && <span className="ml-1 text-ok">✓</span>}
              </span>
            );
          })}
        </div>
      </div>

      {/* The portal form being filled with those fields */}
      <div className="relative p-4 sm:p-5 bg-panel/60 min-h-[150px]">
        <div className="h-2.5 w-28 rounded bg-tint/10 mb-3.5" aria-hidden="true" />
        <div className="grid grid-cols-3 gap-2 mb-3.5">
          {extractedFields.map((f, i) => {
            const typing = step === i + 1;
            const filled = step > i + 1;
            return (
              <div key={f.key}>
                <p className="text-[9px] text-fg-5 mb-1 truncate">{f.label}</p>
                <div
                  className={`rounded-lg border px-2.5 py-2 text-[11px] font-mono truncate transition-all duration-500 ${
                    typing || filled
                      ? "border-[#3b82f6]/50 bg-[#3b82f6]/10 text-fg"
                      : "border-tint/10 bg-well/20 text-fg-6"
                  }`}
                >
                  {typing ? (
                    <span className="agent-type" style={{ "--type-w": f.width } as React.CSSProperties}>
                      {f.value}
                    </span>
                  ) : filled ? (
                    f.value
                  ) : (
                    <span aria-hidden="true">&nbsp;</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-3">
          <div
            className={`rounded-lg border px-4 py-2 text-xs font-semibold transition-all duration-300 ${
              clicked
                ? "border-transparent bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] text-white scale-95"
                : "border-tint/10 bg-tint/5 text-fg-4"
            }`}
          >
            Submit payment
          </div>
          <div
            className={`flex items-center gap-2 text-[11px] font-mono transition-all duration-500 ${
              confirmationVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            <span className="text-ok">✓</span>
            <span className="text-fg-3">Payment received —</span>
            <span
              className={`rounded px-1.5 py-0.5 transition-all duration-500 ${
                captured ? "bg-emerald-500/15 text-ok" : "text-fg-4"
              }`}
            >
              confirmation PAY-88231
            </span>
          </div>
        </div>

        {/* The agent's cursor gliding to whatever it acts on */}
        <div
          className="absolute z-10 transition-all duration-1000 ease-in-out pointer-events-none"
          style={{ left: cursor.left, top: cursor.top, opacity: cursor.opacity }}
          aria-hidden="true"
        >
          <MousePointer2 size={18} className="text-fg fill-fg drop-shadow-[0_0_6px_rgba(59,130,246,0.9)]" />
          <span className="absolute -bottom-4 left-4 whitespace-nowrap rounded bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] px-1.5 py-0.5 text-[9px] font-bold text-white shadow-lg">
            Agent
          </span>
        </div>
      </div>

      {/* Agent step log */}
      <div className="px-4 sm:px-5 py-3.5 border-t border-tint/10 bg-well/30">
        <div className="text-[10px] font-bold text-fg-5 uppercase tracking-widest mb-2.5">
          Agent steps
        </div>
        <div className="space-y-1.5 font-mono text-[11px]" aria-live="off">
          {agentSteps.map((s, i) => {
            const done = step > i;
            const current = step === i;
            return (
              <div
                key={s.verb + i}
                className={`flex items-center gap-2 transition-all duration-300 ${
                  done ? "text-fg-5" : current ? "text-fg" : "text-fg-6"
                }`}
              >
                <span
                  className={`w-3.5 text-center flex-shrink-0 ${
                    done ? "text-ok" : current ? "text-accent" : ""
                  }`}
                >
                  {done ? "✓" : current ? "▸" : "·"}
                </span>
                <span className={current ? "text-accent-2 font-bold" : "text-accent/70"}>
                  {s.verb}
                </span>
                <span className="truncate">{s.detail}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Typed output */}
      <div
        className={`px-4 sm:px-5 py-3.5 border-t border-tint/10 bg-emerald-500/5 transition-all duration-500 ${
          outputVisible ? "opacity-100" : "opacity-40"
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold text-fg-5 uppercase tracking-widest">
            Structured output
          </span>
          <span
            className={`text-[10px] font-semibold transition-opacity duration-500 ${
              outputVisible ? "text-ok opacity-100" : "opacity-0"
            }`}
          >
            → delivered to Bucket
          </span>
        </div>
        <code
          className={`block font-mono text-[11px] leading-relaxed transition-all duration-500 ${
            outputVisible ? "text-ok" : "text-fg-6"
          }`}
        >
          {'{ "invoice": "INV-2043", "confirmation": "PAY-88231", "status": "accepted" }'}
        </code>
      </div>
    </div>
  );
}

export default function AgentsShowcase() {
  const [step, setStep] = useState(0);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  /* Freeze at the finished state for reduced motion */
  const reducedMotion = useReducedMotion();

  /* Only animate while visible */
  useEffect(() => {
    const el = sectionRef.current;
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
    const delay = step >= agentSteps.length ? OUTPUT_HOLD_MS : STEP_MS;
    const t = setTimeout(() => {
      setStep((s) => (s >= agentSteps.length ? 0 : s + 1));
    }, delay);
    return () => clearTimeout(t);
  }, [inView, step, reducedMotion]);

  const displayStep = reducedMotion ? agentSteps.length : step;

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 relative overflow-hidden"
      id="agents"
      aria-labelledby="agents-heading"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center [&>*]:min-w-0">
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <SectionEyebrow isNew>Agents</SectionEyebrow>
            <h2
              id="agents-heading"
              className="text-3xl md:text-4xl font-bold text-fg mb-4 leading-tight"
            >
              Extraction was step one.
              <br />
              Now your data <span className="text-accent-2">acts</span>.
            </h2>
            <p className="text-base md:text-lg text-fg-4 mb-8 max-w-[480px]">
              Describe a mission in plain language. A Tavnit Agent opens a real
              browser, works through the website, and brings back structured
              results — no scripts, no scrapers to maintain.
            </p>

            <div className="space-y-5 mb-8">
              {highlights.map((h) => (
                <div key={h.title} className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-lg bg-[#3b82f6]/10 text-accent flex items-center justify-center flex-shrink-0">
                    <h.icon size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm md:text-base font-bold text-fg mb-0.5">
                      {h.title}
                    </h3>
                    <p className="text-xs md:text-sm text-fg-4 leading-relaxed">
                      {h.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="https://app.tavnit.io"
              className="inline-flex items-center gap-2 font-semibold text-accent hover:text-accent-2 transition-colors group"
            >
              Create your first agent
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Live browser demo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            aria-hidden="true"
          >
            <BrowserDemo step={displayStep} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
