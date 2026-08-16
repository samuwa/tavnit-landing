"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Bot, GitBranch, MonitorPlay, PackageCheck, ArrowRight, MousePointer2, Target } from "lucide-react";

/* Agent step log, in plain language: open → find → type → click → read */
const agentSteps = [
  { verb: "open", detail: "portal.acme-suppliers.com" },
  { verb: "find", detail: "the part search form" },
  { verb: "type", detail: 'part number "PN-4471"' },
  { verb: "click", detail: '"Search"' },
  { verb: "read", detail: "price & lead time from the results" },
];

/* Where the agent cursor hovers during each step (percent of the page area) */
const cursorPositions: { left: string; top: string; opacity: number }[] = [
  { left: "50%", top: "115%", opacity: 0 }, // 0 open — offscreen
  { left: "42%", top: "48%", opacity: 1 }, // 1 find — over the form
  { left: "28%", top: "44%", opacity: 1 }, // 2 type — over the input
  { left: "84%", top: "44%", opacity: 1 }, // 3 click — over the button
  { left: "72%", top: "82%", opacity: 1 }, // 4 read — over the result values
  { left: "72%", top: "82%", opacity: 0 }, // 5 done — fade out
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
  const finding = step === 1;
  const typing = step === 2;
  const filled = step >= 3;
  const clicked = step >= 4;
  const resultVisible = step >= 4;
  const captured = step >= 5;
  const cursor = cursorPositions[Math.min(step, cursorPositions.length - 1)];

  return (
    <div className="glass-card rounded-2xl overflow-hidden border border-[#3b82f6]/20 shadow-2xl shadow-[#3b82f6]/10">
      {/* Browser chrome */}
      <div className="flex items-center gap-3 px-4 py-2.5 bg-white/5 border-b border-white/10">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/60" />
        </div>
        <div className="flex-1 flex items-center gap-2 bg-black/30 rounded-md px-3 py-1 text-[11px] text-gray-400 font-mono truncate">
          {step >= 1 ? "portal.acme-suppliers.com/parts" : "about:blank"}
        </div>
        <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex-shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Live
        </span>
      </div>

      {/* The mission — so every step below reads as progress toward it */}
      <div className="flex items-center gap-2 px-4 sm:px-5 py-2.5 border-b border-white/10 bg-[#3b82f6]/[0.06] text-xs">
        <Target size={13} className="text-[#93c5fd] flex-shrink-0" />
        <span className="text-[#93c5fd] font-bold uppercase tracking-wider text-[10px]">Mission</span>
        <span className="text-gray-300 truncate">Get the price and lead time for part PN-4471</span>
      </div>

      {/* Page being operated */}
      <div className="relative p-4 sm:p-5 bg-[#0d0d20]/60 min-h-[150px]">
        <div className="h-2.5 w-24 rounded bg-white/10 mb-4" aria-hidden="true" />
        <div
          className={`flex gap-2 mb-4 rounded-xl transition-all duration-500 ${
            finding ? "ring-2 ring-[#3b82f6]/50 ring-offset-4 ring-offset-[#0d0d20]" : ""
          }`}
        >
          <div
            className={`flex-1 rounded-lg border px-3 py-2 text-xs font-mono transition-all duration-500 ${
              typing || filled
                ? "border-[#3b82f6]/50 bg-[#3b82f6]/10 text-white"
                : "border-white/10 bg-black/20 text-gray-600"
            }`}
          >
            {typing ? (
              <span className="agent-type">PN-4471</span>
            ) : filled ? (
              "PN-4471"
            ) : (
              "Part number"
            )}
          </div>
          <div
            className={`rounded-lg border px-4 py-2 text-xs font-semibold transition-all duration-300 ${
              clicked
                ? "border-transparent bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] text-white scale-95"
                : "border-white/10 bg-white/5 text-gray-400"
            }`}
          >
            Search
          </div>
        </div>
        <div
          className={`rounded-lg border border-white/10 bg-black/20 px-3 py-2.5 flex items-center justify-between text-xs transition-all duration-500 ${
            resultVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          <span className="text-gray-300 font-mono">PN-4471 · Hex bolt M8</span>
          <span className="flex gap-2 font-mono">
            <span
              className={`rounded px-1.5 py-0.5 transition-all duration-500 ${
                captured ? "bg-emerald-500/15 text-emerald-400" : "text-gray-400"
              }`}
            >
              $12.40
            </span>
            <span
              className={`rounded px-1.5 py-0.5 transition-all duration-500 ${
                captured ? "bg-emerald-500/15 text-emerald-400" : "text-gray-400"
              }`}
            >
              5 days
            </span>
          </span>
        </div>

        {/* The agent's cursor gliding to whatever it acts on */}
        <div
          className="absolute z-10 transition-all duration-1000 ease-in-out pointer-events-none"
          style={{ left: cursor.left, top: cursor.top, opacity: cursor.opacity }}
          aria-hidden="true"
        >
          <MousePointer2 size={18} className="text-white fill-white drop-shadow-[0_0_6px_rgba(59,130,246,0.9)]" />
          <span className="absolute -bottom-4 left-4 whitespace-nowrap rounded bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] px-1.5 py-0.5 text-[9px] font-bold text-white shadow-lg">
            Agent
          </span>
        </div>
      </div>

      {/* Agent step log */}
      <div className="px-4 sm:px-5 py-3.5 border-t border-white/10 bg-black/30">
        <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2.5">
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
                  done ? "text-gray-500" : current ? "text-white" : "text-gray-700"
                }`}
              >
                <span
                  className={`w-3.5 text-center flex-shrink-0 ${
                    done ? "text-emerald-400" : current ? "text-[#3b82f6]" : ""
                  }`}
                >
                  {done ? "✓" : current ? "▸" : "·"}
                </span>
                <span className={current ? "text-[#93c5fd] font-bold" : "text-[#3b82f6]/70"}>
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
        className={`px-4 sm:px-5 py-3.5 border-t border-white/10 bg-emerald-500/5 transition-all duration-500 ${
          outputVisible ? "opacity-100" : "opacity-40"
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            Structured output
          </span>
          <span
            className={`text-[10px] font-semibold transition-opacity duration-500 ${
              outputVisible ? "text-emerald-400 opacity-100" : "opacity-0"
            }`}
          >
            → delivered to Bucket
          </span>
        </div>
        <code
          className={`block font-mono text-[11px] leading-relaxed transition-all duration-500 ${
            outputVisible ? "text-emerald-300" : "text-gray-700"
          }`}
        >
          {'{ "part": "PN-4471", "unit_price": 12.40, "lead_time_days": 5 }'}
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
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3b82f6]/10 border border-[#3b82f6]/25 text-[#93c5fd] text-xs font-bold uppercase tracking-wider mb-5">
              <Bot size={14} />
              New · Agents
            </div>
            <h2
              id="agents-heading"
              className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight"
            >
              Extraction was step one.
              <br />
              Now your data <span className="text-[#93c5fd]">acts</span>.
            </h2>
            <p className="text-base md:text-lg text-gray-400 mb-8 max-w-[480px]">
              Describe a mission in plain language. A Tavnit Agent opens a real
              browser, works through the website, and brings back structured
              results — no scripts, no scrapers to maintain.
            </p>

            <div className="space-y-5 mb-8">
              {highlights.map((h) => (
                <div key={h.title} className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-lg bg-[#3b82f6]/10 text-[#3b82f6] flex items-center justify-center flex-shrink-0">
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

            <Link
              href="https://app.tavnit.io"
              className="inline-flex items-center gap-2 font-semibold text-[#3b82f6] hover:text-[#93c5fd] transition-colors group"
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
