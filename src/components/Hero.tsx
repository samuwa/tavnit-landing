"use client";

import { trackEvent } from "@/lib/analytics";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Play } from "lucide-react";
import HeroAnimation from "./HeroAnimation";

/**
 * No entrance animation here on purpose. This is the first thing on the page
 * and it is what Lighthouse measures as LCP: the framer-motion fade-ins it used
 * to have rendered the H1, the mock-up and the CTAs at opacity 0 in the server
 * HTML, so nothing became visible until the client bundle had downloaded and
 * hydrated. On a throttled phone that put LCP at ~5 s for a page that is
 * otherwise light. Sections below the fold keep their whileInView reveals; the
 * "... In Seconds" line keeps its CSS-only typing effect.
 */
export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-16" id="hero" aria-labelledby="hero-heading">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col items-center text-center py-4 md:py-8 w-full">
        <div>
          <h1 id="hero-heading" className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-extrabold leading-tight tracking-tight text-white">
            <span>Documents to <span className="gradient-text">Structured Data</span></span>
            <span className="sr-only"> — AI-Powered PDF Extraction In Seconds</span>
          </h1>
        </div>

        {/* Animation */}
        <div className="w-full my-4 md:my-8" aria-hidden="true">
          <HeroAnimation />
        </div>

        {/* Typing Effect */}
        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-extrabold leading-tight tracking-tight mb-6 text-white" aria-hidden="true">
          <span className="typing-text">... In Seconds</span>
        </div>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-gray-400 max-w-[540px] mb-8">
          Extract, clean, and store data from any document — then review it with your team and let AI agents act on it. No code required.
        </p>

        {/* CTAs */}
        <div className="flex flex-col items-center gap-5">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto justify-center">
            <Link
              href="https://app.tavnit.io"
              onClick={() => trackEvent("cta_click", { cta: "start_free_trial", location: "hero" })}
              className="hero-cta-primary inline-flex items-center justify-center gap-2 px-7 py-3.5 sm:px-9 sm:py-4 bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] text-white rounded-xl text-base sm:text-lg font-bold hover:-translate-y-0.5 transition-all shadow-lg shadow-[#3b82f6]/25 hover:shadow-xl hover:shadow-[#3b82f6]/30"
            >
              Start Free Trial
              <ArrowRight size={20} />
            </Link>
            <Link
              href="https://demo.tavnit.io"
              onClick={() => trackEvent("cta_click", { cta: "live_demo", location: "hero" })}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 border border-white/15 text-gray-300 rounded-xl text-base sm:text-lg font-medium hover:bg-white/5 hover:text-white hover:border-white/30 hover:-translate-y-0.5 transition-all"
            >
              <Play size={18} />
              Try the Live Demo
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs sm:text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-500/70" />
              Free credits to start
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-500/70" />
              100,000+ documents processed
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-500/70" />
              Setup in under 5 minutes
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
