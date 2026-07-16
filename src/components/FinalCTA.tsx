"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap, Mail, Code2, Plug } from "lucide-react";
import SheetSection from "./sheet/SheetSection";
import Cell from "./sheet/Cell";

export const ROWS = 13;

export default function FinalCTA({ startRow }: { startRow: number }) {
  return (
    <SheetSection
      id="get-started"
      startRow={startRow}
      rows={ROWS}
      ariaLabelledby="cta-heading"
      className="final-cta-section"
    >
      {/* Heading */}
      <Cell
        c={2}
        span={10}
        r={2}
        rowSpan={3}
        variant="k-title"
        className="justify-center text-center"
        formula="=STOP(retyping) + START(automating)"
      >
        <motion.h2
          id="cta-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Stop Re-Typing.<br className="sm:hidden" /> Start Automating.
        </motion.h2>
      </Cell>

      {/* Body */}
      <Cell
        c={3}
        span={8}
        r={6}
        rowSpan={2}
        variant="k-sub"
        className="justify-center text-center"
        formula="=UPLOAD(doc) → EXTRACT() → REVIEW()"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Create your first extraction flow in minutes. Upload a document and
          watch structured data appear — cleaned, reviewed, and ready to act.
        </motion.p>
      </Cell>

      {/* CTAs */}
      <Cell c={3} span={4} r={9} variant="k-bare" interactive={false} formula="=SIGNUP()">
        <motion.div
          className="w-full h-full"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Link
            href="https://app.tavnit.io"
            className="hero-cta-primary w-full h-full inline-flex items-center justify-center gap-2 bg-[#FFC53D] text-[#0E1C2B] text-[15px] font-bold shadow-[inset_0_0_0_1px_#B9820A] hover:brightness-105 transition-all"
          >
            Get Started Free
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </Cell>
      <Cell c={7} span={4} r={9} variant="k-bare" interactive={false} formula='=HYPERLINK("/docs")'>
        <motion.div
          className="w-full h-full"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Link
            href="/docs"
            className="w-full h-full inline-flex items-center justify-center gap-2 bg-white text-[#1B2E44] text-[15px] font-medium shadow-[inset_0_0_0_1px_#C9CFD8] hover:bg-[#FFF6DE] hover:text-[#0E1C2B] hover:shadow-[inset_0_0_0_1px_#0E1C2B] transition-all"
          >
            View Documentation
          </Link>
        </motion.div>
      </Cell>

      {/* Integration strip */}
      <Cell
        c={2}
        span={10}
        r={11}
        rowSpan={2}
        variant="k-muted"
        className="justify-center"
        formula="=INTEGRATE(REST, Email, Webhooks, MCP)"
      >
        <motion.div
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[#6B7686] text-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2">
            <Code2 size={16} className="text-[#6B7686]" />
            <span>REST API</span>
          </div>
          <div className="w-px h-4 bg-[#E7E9EE] hidden sm:block" />
          <div className="flex items-center gap-2">
            <Mail size={16} className="text-[#6B7686]" />
            <span>Email Triggers</span>
          </div>
          <div className="w-px h-4 bg-[#E7E9EE] hidden sm:block" />
          <div className="flex items-center gap-2">
            <Zap size={16} className="text-[#6B7686]" />
            <span>Webhooks</span>
          </div>
          <div className="w-px h-4 bg-[#E7E9EE] hidden sm:block" />
          <div className="flex items-center gap-2">
            <Plug size={16} className="text-[#6B7686]" />
            <span>MCP Connector</span>
          </div>
        </motion.div>
      </Cell>
    </SheetSection>
  );
}
