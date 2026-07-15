"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import HeroAnimation from "./HeroAnimation";

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-[calc(var(--chrome-top)+12px)] pb-[var(--chrome-bottom)]"
      id="hero"
      aria-labelledby="hero-heading"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col items-center text-center py-4 md:py-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 id="hero-heading" className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold leading-tight tracking-tight text-[#0E1C2B]">
            <span>Documents to <span className="gradient-text">Structured Data</span></span>
            <span className="sr-only"> — AI-Powered PDF Extraction In Seconds</span>
          </h1>
        </motion.div>

        {/* Animation */}
        <motion.div
          className="w-full my-4 md:my-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          aria-hidden="true"
        >
          <HeroAnimation />
        </motion.div>

        {/* Typing Effect */}
        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold leading-tight tracking-tight mb-6 text-[#0E1C2B] font-heading" aria-hidden="true">
          <span className="typing-text">... In Seconds</span>
        </div>

        {/* Subtitle */}
        <motion.p
          className="text-base sm:text-lg text-[#6B7686] max-w-[540px] mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Extract, clean, and store data from any document — then review it with your team and let AI agents act on it. No code required.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col items-center gap-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto justify-center">
            <Link
              href="https://app.tavnit.io"
              className="hero-cta-primary inline-flex items-center justify-center gap-2 px-7 py-3.5 sm:px-9 sm:py-4 bg-[#FFC53D] text-[#0E1C2B] rounded-lg text-base sm:text-lg font-bold shadow-[0_2px_0_#B9820A] hover:-translate-y-0.5 hover:brightness-105 transition-all"
            >
              Start Free Trial
              <ArrowRight size={20} />
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-white border border-[#C9CFD8] text-[#1B2E44] rounded-lg text-base sm:text-lg font-medium hover:bg-[#FFF6DE] hover:border-[#0E1C2B] hover:-translate-y-0.5 transition-all"
            >
              See How It Works
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs sm:text-sm text-[#6B7686]">
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}
