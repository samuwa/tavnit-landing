"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroAnimation from "./HeroAnimation";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-16" id="hero">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col items-center text-center py-4 md:py-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold leading-tight tracking-tight text-white">
            Documents to <span className="gradient-text">Structured Data</span>
          </h1>
          <p className="sr-only">
            AI-powered document extraction that converts PDFs, invoices, contracts, and receipts into clean, structured data — automatically.
          </p>
        </motion.div>

        {/* Animation */}
        <motion.div
          className="w-full my-4 md:my-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <HeroAnimation />
        </motion.div>

        {/* Typing Effect */}
        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold leading-tight tracking-tight mb-6 md:mb-10 text-white">
          <span className="typing-text">... In Seconds</span>
        </div>

        {/* CTAs */}
        <motion.div
          className="flex flex-col items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto justify-center">
            <Link
              href="https://app.tavnit.io"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white rounded-lg text-base sm:text-lg font-semibold hover:-translate-y-0.5 transition-all shadow-lg hover:shadow-xl hover:shadow-[#667eea]/20"
            >
              Start Free Trial
              <ArrowRight size={20} />
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 border-2 border-white/20 text-white rounded-lg text-base sm:text-lg font-semibold hover:bg-white/10 hover:border-white/40 hover:-translate-y-0.5 transition-all backdrop-blur-sm"
            >
              See How It Works
            </Link>
          </div>
          <div className="flex gap-4 text-xs sm:text-sm text-gray-400">
            <span>10,000+ documents processed</span>
            <span className="text-gray-600">|</span>
            <span>500+ teams</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
