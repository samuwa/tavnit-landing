"use client";

import { motion } from "framer-motion";
import { trackEvent } from "@/lib/analytics";
import Link from "next/link";
import { ArrowRight, Zap, Mail, Code2, Plug } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="final-cta-section relative py-20 md:py-32 overflow-hidden" aria-labelledby="cta-heading">
      {/* Radial spotlight */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#3b82f6]/10 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-[#3b82f6]/8 blur-[120px]" />

      <div className="max-w-[800px] mx-auto px-4 sm:px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 id="cta-heading" className="text-2xl sm:text-4xl md:text-5xl font-bold text-fg mb-4 sm:mb-6 leading-tight">
            Stop Re-Typing.<br className="sm:hidden" /> Start Automating.
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-fg-3 mb-8 md:mb-10 max-w-[560px] mx-auto">
            Create your first extraction flow in minutes. Upload a document and
            watch structured data appear — cleaned, reviewed, and ready to act.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8">
            <Link
              href="https://app.tavnit.io"
              onClick={() => trackEvent("cta_click", { cta: "get_started", location: "final_cta" })}
              className="hero-cta-primary inline-flex items-center justify-center gap-2 px-7 py-3.5 sm:px-9 sm:py-4 bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] text-white rounded-xl text-base sm:text-lg font-bold hover:-translate-y-0.5 transition-all shadow-lg shadow-[#3b82f6]/25 hover:shadow-xl hover:shadow-[#3b82f6]/30"
            >
              Get Started Free
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/schedule"
              onClick={() => trackEvent("cta_click", { cta: "book_demo", location: "final_cta" })}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 border border-tint/15 text-fg-3 rounded-xl text-base sm:text-lg font-medium hover:bg-tint/5 hover:text-fg hover:border-tint/30 hover:-translate-y-0.5 transition-all"
            >
              Book a Demo
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 border border-tint/15 text-fg-3 rounded-xl text-base sm:text-lg font-medium hover:bg-tint/5 hover:text-fg hover:border-tint/30 hover:-translate-y-0.5 transition-all"
            >
              View Documentation
            </Link>
          </div>

          {/* Integration strip */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-fg-5 text-sm">
            <div className="flex items-center gap-2">
              <Code2 size={16} className="text-fg-5" />
              <span>REST API</span>
            </div>
            <div className="w-px h-4 bg-tint/10 hidden sm:block" />
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-fg-5" />
              <span>Email Triggers</span>
            </div>
            <div className="w-px h-4 bg-tint/10 hidden sm:block" />
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-fg-5" />
              <span>Webhooks</span>
            </div>
            <div className="w-px h-4 bg-tint/10 hidden sm:block" />
            <div className="flex items-center gap-2">
              <Plug size={16} className="text-fg-5" />
              <span>MCP Connector</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
