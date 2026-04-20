"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap, Mail, Code2 } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="final-cta-section relative py-20 md:py-32 overflow-hidden" aria-labelledby="cta-heading">
      {/* Radial spotlight */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#667eea]/10 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-[#667eea]/8 blur-[120px]" />

      <div className="max-w-[800px] mx-auto px-4 sm:px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 id="cta-heading" className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Stop Re-Typing.<br className="sm:hidden" /> Start Extracting.
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 md:mb-10 max-w-[560px] mx-auto">
            Create your first extraction flow in minutes. Upload a document and
            watch structured data appear — cleaned, validated, and ready to use.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8">
            <Link
              href="https://app.tavnit.io"
              className="hero-cta-primary inline-flex items-center justify-center gap-2 px-7 py-3.5 sm:px-9 sm:py-4 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white rounded-xl text-base sm:text-lg font-bold hover:-translate-y-0.5 transition-all shadow-lg shadow-[#667eea]/25 hover:shadow-xl hover:shadow-[#667eea]/30"
            >
              Get Started Free
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 border border-white/15 text-gray-300 rounded-xl text-base sm:text-lg font-medium hover:bg-white/5 hover:text-white hover:border-white/30 hover:-translate-y-0.5 transition-all"
            >
              View Documentation
            </Link>
          </div>

          {/* Integration strip */}
          <div className="flex items-center justify-center gap-6 text-gray-500 text-sm">
            <div className="flex items-center gap-2">
              <Code2 size={16} className="text-gray-500" />
              <span>REST API</span>
            </div>
            <div className="w-px h-4 bg-white/10" />
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-gray-500" />
              <span>Email Triggers</span>
            </div>
            <div className="w-px h-4 bg-white/10" />
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-gray-500" />
              <span>Webhooks</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
