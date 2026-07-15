"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Sparkles, Wand2, ScanText, LayoutGrid, ArrowRight } from "lucide-react";

/* Fields appear one per step; the cleaning pass then normalizes the raw values */
const fields = [
  { name: "vendor", raw: "ACME CORP LLC.", clean: "Acme Corp", confidence: "99%", cleaned: true },
  { name: "invoice_number", raw: "INV-2043", clean: "INV-2043", confidence: "98%", cleaned: false },
  { name: "date", raw: "03/15/26", clean: "2026-03-15", confidence: "97%", cleaned: true },
  { name: "total", raw: "1.420,00", clean: "1,420.00", confidence: "99%", cleaned: true },
];

/* Step timeline: 0 = scanning · 1..4 = field i extracted · 5 = cleaning · 6 = complete */
const CLEAN_STEP = fields.length + 1;
const DONE_STEP = fields.length + 2;
const STEP_MS = 1100;
const DONE_HOLD_MS = 3200;

const highlights = [
  {
    icon: LayoutGrid,
    title: "No templates to build",
    desc: "Create a flow by describing what to capture, in plain language. Field hints and validation keep output consistent across layouts.",
  },
  {
    icon: ScanText,
    title: "Reads what humans read",
    desc: "Multi-page PDFs, photos, scans, handwriting, and mixed languages — powered by multiple leading AI models.",
  },
  {
    icon: Wand2,
    title: "Cleaned before it lands",
    desc: "Cleaners normalize dates and numbers, translate, convert currencies, and enrich values before anything is stored.",
  },
];

function StatusBadge({ step }: { step: number }) {
  if (step >= DONE_STEP) {
    return (
      <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E6F6F0] border border-[#17A67B]/40 text-[#0C6B4C] text-[10px] font-bold uppercase tracking-wider flex-shrink-0">
        Complete
      </span>
    );
  }
  if (step >= CLEAN_STEP) {
    return (
      <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FCEDE1] border border-[#B4530E]/40 text-[#B4530E] text-[10px] font-bold uppercase tracking-wider flex-shrink-0">
        <span className="w-1.5 h-1.5 rounded-full bg-[#B4530E] animate-pulse" />
        Cleaning
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FFF6DE] border border-[#FFC53D]/50 text-[#B9820A] text-[10px] font-bold uppercase tracking-wider flex-shrink-0">
      <span className="w-1.5 h-1.5 rounded-full bg-[#FFC53D] animate-pulse" />
      Extracting
    </span>
  );
}

function ExtractionDemo({ step }: { step: number }) {
  const cleaning = step >= CLEAN_STEP;
  const done = step >= DONE_STEP;

  return (
    <div className="glass-card rounded-lg overflow-hidden border border-[#C9CFD8] shadow-[0_8px_24px_rgba(14,28,43,0.08)]">
      {/* Run header */}
      <div className="flex items-center justify-between px-4 sm:px-5 py-3 bg-[#F0F2F5] border-b border-[#E7E9EE]">
        <div className="min-w-0">
          <div className="text-xs font-bold text-[#0E1C2B] truncate">Invoice_2043.pdf</div>
          <div className="text-[10px] text-[#6B7686]">Run #4127 · Flow: Supplier invoices</div>
        </div>
        <StatusBadge step={step} />
      </div>

      <div className="grid grid-cols-[1fr_1.4fr] gap-3 sm:gap-4 p-4 sm:p-5 bg-white">
        {/* Document with a scan line and field boxes lighting up */}
        <div className="relative rounded-lg border border-[#C9CFD8] bg-white p-3 overflow-hidden min-h-[190px]">
          {!done && (
            <div
              className="absolute left-0 right-0 h-8 bg-gradient-to-b from-transparent via-[#FFC53D]/40 to-transparent pointer-events-none"
              style={{
                animation: "extractionScan 2.2s ease-in-out infinite alternate",
              }}
            />
          )}
          <div className="h-2 w-14 rounded bg-[#C9CFD8] mb-3" aria-hidden="true" />
          <div className="space-y-2" aria-hidden="true">
            {fields.map((f, i) => (
              <div
                key={f.name}
                className={`rounded px-1.5 py-1 border text-[9px] font-mono truncate transition-all duration-500 ${
                  step > i
                    ? "border-[#17A67B]/60 bg-[#E6F6F0] text-[#0C6B4C]"
                    : "border-transparent bg-[#F0F2F5] text-transparent"
                }`}
              >
                {f.raw}
              </div>
            ))}
            <div className="h-1.5 w-full rounded bg-[#E7E9EE]" />
            <div className="h-1.5 w-4/5 rounded bg-[#E7E9EE]" />
            <div className="h-1.5 w-3/5 rounded bg-[#E7E9EE]" />
          </div>
        </div>

        {/* Structured fields panel */}
        <div className="rounded-lg border border-[#E7E9EE] bg-white overflow-hidden">
          <div className="px-3 py-1.5 bg-[#F0F2F5] text-[10px] font-bold text-[#6B7686] uppercase tracking-widest">
            Extracted fields
          </div>
          <div className="divide-y divide-[#E7E9EE]">
            {fields.map((f, i) => {
              const extracted = step > i;
              const showClean = cleaning && f.cleaned;
              return (
                <div
                  key={f.name}
                  className={`flex items-center justify-between gap-2 px-3 py-[7px] text-[11px] font-mono transition-all duration-500 ${
                    extracted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                  }`}
                >
                  <span className="text-[#6B7686] truncate">{f.name}</span>
                  <span className="flex items-center gap-2 min-w-0">
                    <span className={`truncate transition-colors duration-500 ${showClean ? "text-[#0C6B4C]" : "text-[#1B2E44]"}`}>
                      {showClean ? f.clean : f.raw}
                    </span>
                    <span
                      className={`px-1 py-px rounded text-[9px] font-bold flex-shrink-0 ${
                        extracted ? "bg-[#E6F6F0] text-[#0C6B4C]" : "bg-[#F0F2F5] text-[#6B7686]"
                      }`}
                    >
                      {f.confidence}
                    </span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Delivery strip */}
      <div
        className={`flex flex-wrap items-center justify-between gap-2 px-4 sm:px-5 py-3.5 border-t border-[#E7E9EE] transition-all duration-500 ${
          done ? "bg-[#E6F6F0] opacity-100" : "bg-[#F0F2F5] opacity-40"
        }`}
      >
        <span className={`text-[11px] font-semibold transition-colors duration-500 ${done ? "text-[#0C6B4C]" : "text-[#6B7686]"}`}>
          {done ? "✓ 4 fields · 99% avg confidence → Bucket · Invoices" : "Waiting for extraction…"}
        </span>
        <span className="flex gap-1.5">
          {["CSV", "JSON", "Excel"].map((fmt) => (
            <span
              key={fmt}
              className={`px-2 py-0.5 rounded border text-[9px] font-bold transition-all duration-500 ${
                done
                  ? "border-[#C9CFD8] bg-white text-[#1B2E44]"
                  : "border-[#E7E9EE] bg-white text-[#6B7686]"
              }`}
            >
              {fmt}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}

export default function ExtractionShowcase() {
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
    const delay = step >= DONE_STEP ? DONE_HOLD_MS : STEP_MS;
    const t = setTimeout(() => {
      setStep((s) => (s >= DONE_STEP ? 0 : s + 1));
    }, delay);
    return () => clearTimeout(t);
  }, [inView, step, reducedMotion]);

  const displayStep = reducedMotion ? DONE_STEP : step;

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 relative overflow-hidden"
      id="extraction"
      aria-labelledby="extraction-heading"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-[#FFF6DE] border border-[#FFC53D]/50 text-[#B9820A] font-mono text-[11px] sm:text-xs tracking-[0.14em] uppercase mb-5">
              <Sparkles size={14} />
              AI Extraction
            </div>
            <h2
              id="extraction-heading"
              className="text-3xl md:text-4xl font-bold text-[#0E1C2B] mb-4 leading-tight"
            >
              Any document in.
              <br />
              Clean, <span className="gradient-text">structured data</span> out.
            </h2>
            <p className="text-base md:text-lg text-[#6B7686] mb-8 max-w-[480px]">
              Tavnit reads your documents the way a person would — then hands
              you validated fields with a confidence score on every value,
              already cleaned and formatted.
            </p>

            <div className="space-y-5 mb-8">
              {highlights.map((h) => (
                <div key={h.title} className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-lg bg-[#FFF6DE] text-[#B9820A] flex items-center justify-center flex-shrink-0">
                    <h.icon size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm md:text-base font-bold text-[#0E1C2B] mb-0.5">
                      {h.title}
                    </h3>
                    <p className="text-xs md:text-sm text-[#6B7686] leading-relaxed">
                      {h.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="https://app.tavnit.io"
              className="inline-flex items-center gap-2 font-semibold text-[#B9820A] hover:text-[#0E1C2B] transition-colors group"
            >
              Create your first flow
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Live extraction demo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            aria-hidden="true"
          >
            <ExtractionDemo step={displayStep} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
