"use client";

import { trackEvent } from "@/lib/analytics";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Play } from "lucide-react";
import HeroAnimation from "./HeroAnimation";

/**
 * The mock-up sits between "Documents to Structured Data" and "... In
 * Seconds" on purpose: the animation is the sentence's middle, the document
 * turning into the table. An attempt to move it below the CTAs so the copy
 * fit above the fold left the mock-up cut off at the bottom of the viewport
 * and broke that reading — reverted the same day.
 *
 * The entrance fade is CSS (.hero-enter in globals.css), not framer-motion:
 * it starts on first paint instead of after hydration, so LCP does not wait
 * for the JS bundle.
 *
 * Under the headline, three things only: one line of what it does, the two
 * CTAs, one line of proof. It used to carry five stacked blocks (a two-part
 * subtitle, three trust chips, a "Built for" row of links) competing for
 * the eye. The use-case links it had still live in the use-cases section
 * and the footer, so the homepage keeps linking to PO matching and customs.
 */

/** Stated figure, set by the team (not read from the database). */
const DOCUMENTS_PROCESSED = "100,000+";

export default function Hero() {
  return (
    <section className="relative min-h-svh flex items-center justify-center overflow-hidden pt-20 md:pt-16" id="hero" aria-labelledby="hero-heading">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col items-center text-center py-4 md:py-[clamp(0.5rem,1.5svh,2rem)] w-full">
        <div className="hero-enter">
          <h1 id="hero-heading" className="text-3xl sm:text-4xl md:text-[clamp(2rem,5svh,3rem)] lg:text-[clamp(2.25rem,5svh,3.5rem)] font-extrabold leading-tight tracking-tight text-fg">
            <span>Documents to <span className="gradient-text">Structured Data</span></span>
            <span className="sr-only"> — AI-Powered PDF Extraction In Seconds</span>
          </h1>
        </div>

        {/* Animation */}
        <div
          className="hero-enter w-full my-4 md:my-[clamp(0.5rem,2svh,2rem)]"
          style={{ "--hero-delay": "0.15s" } as React.CSSProperties}
          aria-hidden="true"
        >
          <HeroAnimation />
        </div>

        {/* Typing Effect: completes the headline, decorative for AT */}
        <div className="text-3xl sm:text-4xl md:text-[clamp(2rem,5svh,3rem)] lg:text-[clamp(2.25rem,5svh,3.5rem)] font-extrabold leading-tight tracking-tight mb-6 md:mb-[clamp(0.75rem,2svh,1.5rem)] text-fg" aria-hidden="true">
          <span className="typing-text">... In Seconds</span>
        </div>

        {/* Subtitle */}
        <p
          className="hero-enter text-base sm:text-lg text-fg-4 max-w-[560px] mb-8 md:mb-[clamp(1rem,2.5svh,2rem)]"
          style={{ "--hero-delay": "0.3s" } as React.CSSProperties}
        >
          Extract data from any document, review it with your team, and let AI act on it.
        </p>

        {/* CTAs */}
        <div
          className="hero-enter flex flex-col items-center gap-4"
          style={{ "--hero-delay": "0.4s" } as React.CSSProperties}
        >
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto justify-center">
            <Link
              href="https://app.tavnit.io"
              onClick={() => trackEvent("cta_click", { cta: "start_free_trial", location: "hero" })}
              className="hero-cta-primary group inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-[15px] font-semibold tracking-[-0.01em] text-white"
            >
              Start Free Trial
              <ArrowRight size={16} strokeWidth={2.25} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="https://demo.tavnit.io"
              onClick={() => trackEvent("cta_click", { cta: "live_demo", location: "hero" })}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-12 items-center justify-center gap-3 rounded-full border border-tint/10 bg-bg/60 pl-1.5 pr-6 text-[15px] font-semibold tracking-[-0.01em] text-fg-2 backdrop-blur transition-colors hover:border-tint/25 hover:text-fg"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-tint/[0.06] ring-1 ring-inset ring-tint/10 transition-colors group-hover:bg-tint/10">
                <Play size={13} className="translate-x-px fill-current" />
              </span>
              Try the Live Demo
            </Link>
          </div>

          {/* Proof */}
          <p className="flex items-center gap-1.5 text-xs sm:text-sm text-fg-5">
            <CheckCircle2 size={14} className="text-ok/70" aria-hidden />
            {DOCUMENTS_PROCESSED} documents processed
            <span aria-hidden="true">·</span>
            No code required
          </p>
        </div>
      </div>
    </section>
  );
}
