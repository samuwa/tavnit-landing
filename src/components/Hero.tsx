"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import HeroAnimation from "./HeroAnimation";
import SheetSection from "./sheet/SheetSection";
import Cell from "./sheet/Cell";

export const ROWS = 21;

export default function Hero({ startRow }: { startRow: number }) {
  return (
    <SheetSection id="hero" startRow={startRow} rows={ROWS} ariaLabelledby="hero-heading">
      {/* Eyebrow */}
      <Cell c={2} span={8} r={2} variant="k-eyebrow" formula='="the boring part, automated"'>
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          Tavnit.io — document data pipeline
        </motion.span>
      </Cell>

      {/* Headline */}
      <Cell
        c={2}
        span={9}
        r={3}
        rowSpan={3}
        variant="k-hero"
        formula="=TAVNIT(anything.pdf)  → structured data"
      >
        <motion.h1
          id="hero-heading"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Documents to <span className="gradient-text">Structured Data</span>
          <span className="sr-only"> — AI-Powered PDF Extraction In Seconds</span>
        </motion.h1>
      </Cell>

      {/* PDF → table extraction animation */}
      <Cell c={2} span={10} r={7} rowSpan={9} variant="k-bare" interactive={false}>
        <motion.div
          className="w-full h-full"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          aria-hidden="true"
        >
          <HeroAnimation />
        </motion.div>
      </Cell>

      {/* Typing headline */}
      <Cell c={2} span={7} r={16} rowSpan={2} variant="k-hero" formula='=CONCAT(result, " ... In Seconds")'>
        <span aria-hidden="true">
          <span className="typing-text">... In Seconds</span>
        </span>
      </Cell>

      {/* Subtitle */}
      <Cell c={2} span={7} r={18} rowSpan={2} variant="k-sub" formula='="no code required"'>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}>
          Extract, clean, and store data from any document — then review it with your team and let AI agents act on it. No code required.
        </motion.p>
      </Cell>

      {/* CTAs */}
      <Cell c={2} span={3} r={20} variant="k-bare" interactive={false} formula="=SIGNUP()">
        <Link
          href="https://app.tavnit.io"
          className="hero-cta-primary w-full h-full inline-flex items-center justify-center gap-2 bg-[#FFC53D] text-[#0E1C2B] text-[15px] font-bold shadow-[inset_0_0_0_1px_#B9820A] hover:brightness-105 transition-all"
        >
          Start Free Trial
          <ArrowRight size={18} />
        </Link>
      </Cell>
      <Cell c={5} span={3} r={20} variant="k-bare" interactive={false} formula='=HYPERLINK("#how-it-works")'>
        <Link
          href="#how-it-works"
          className="w-full h-full inline-flex items-center justify-center gap-2 bg-white text-[#1B2E44] text-[15px] font-semibold shadow-[inset_0_0_0_1px_#C9CFD8] hover:bg-[#FFF6DE] hover:shadow-[inset_0_0_0_1px_#0E1C2B] transition-all"
        >
          See How It Works
        </Link>
      </Cell>

      {/* Trust indicators */}
      <Cell c={2} span={9} r={21} variant="k-muted" formula='="try it, it is actually real"'>
        <span className="flex flex-wrap gap-x-5 gap-y-1 text-xs sm:text-sm text-[#6B7686]">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 size={14} className="text-[#17A67B]" />
            Free credits to start
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 size={14} className="text-[#17A67B]" />
            100,000+ documents processed
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 size={14} className="text-[#17A67B]" />
            Setup in under 5 minutes
          </span>
        </span>
      </Cell>
    </SheetSection>
  );
}
