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
 * The use-case links exist because Search Console shows almost all non-brand
 * demand landing on PO matching and customs/HS classification; the homepage
 * mentioned neither above the fold.
 */

const USE_CASE_LINKS: { label: string; href: string }[] = [
  { label: "Invoices", href: "/use-cases/invoice-processing" },
  { label: "PO matching", href: "/use-cases/purchase-orders" },
  { label: "Customs & HS codes", href: "/use-cases/customs-trade" },
  { label: "Contracts", href: "/use-cases/contract-analysis" },
];

export default function Hero({ documentsProcessed }: { documentsProcessed: string }) {
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
          Extract, clean, and store data from any document — then review it with your team and let AI agents act on it. No code required.
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

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs sm:text-sm text-fg-5">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-ok/70" />
              Free credits to start
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-ok/70" />
              {documentsProcessed} documents processed
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-ok/70" />
              Setup in under 5 minutes
            </span>
          </div>

          {/* Use cases with real search demand */}
          <p className="text-xs sm:text-sm text-fg-5">
            <span className="mr-1">Built for</span>
            {USE_CASE_LINKS.map(({ label, href }, i) => (
              <span key={href}>
                {i > 0 && <span aria-hidden="true"> · </span>}
                <Link
                  href={href}
                  onClick={() => trackEvent("cta_click", { cta: "use_case_link", location: "hero", href })}
                  className="text-fg-3 hover:text-fg underline underline-offset-4 decoration-tint/20 hover:decoration-tint/60 transition-colors"
                >
                  {label}
                </Link>
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
