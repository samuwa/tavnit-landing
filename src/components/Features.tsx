"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutGrid, Sparkles, GitBranch, Lightbulb,
  Database, BarChart3, Users, Code2, UserCheck, Scissors,
} from "lucide-react";

const features = [
  { icon: Sparkles, title: "AI Extraction", desc: "Powered by multiple leading AI models to extract tables, metadata, handwriting, and complex layouts from any document. Includes confidence scoring, field-level validation, and support for multi-page and multi-language documents.", gradient: true, hero: true },
  { icon: LayoutGrid, title: "Flow Builder", desc: "No-code extraction pipelines with field hints, validation, and output mapping.", gradient: false, hero: false },
  { icon: GitBranch, title: "Smart Routing", desc: "Collections use AI vision to auto-route mixed documents to the right flow.", gradient: false, hero: false },
  { icon: Lightbulb, title: "AI Data Cleaning", desc: "Cleaners auto-format, categorize, validate, and enrich after extraction.", gradient: false, hero: false },
  { icon: UserCheck, title: "Human in the Loop", desc: "Flag extractions for manual review. Approve, reject, or correct before data moves downstream.", gradient: false, hero: false },
  { icon: Scissors, title: "Document Splitting", desc: "Split multi-page PDFs into separate documents and route each automatically.", gradient: false, hero: false },
  { icon: Database, title: "Buckets & Storage", desc: "Structured tables with custom columns, filters, charts, and CSV/JSON/Excel export.", gradient: false, hero: false },
  { icon: Users, title: "Teams & Roles", desc: "Owner, Admin, Member, Viewer roles with org-level permissions and unlimited seats.", gradient: false, hero: false },
  { icon: Code2, title: "API, Email & Webhooks", desc: "REST API, email triggers, webhook callbacks, and Zapier/Make compatibility.", gradient: false, hero: false },
  { icon: BarChart3, title: "Charts & Dashboards", desc: "Pin bar, line, pie, and scatter charts to track extraction trends and data quality.", gradient: false, hero: false },
];

/* Hero feature card — spans 2 columns on desktop */
function HeroFeatureCard({ f }: { f: typeof features[number] }) {
  return (
    <div className="group relative p-6 md:p-8 rounded-2xl glass-card border-[#667eea]/20 hover:border-[#667eea]/40 transition-all duration-300 h-full overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#667eea]/5 to-[#764ba2]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-5">
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white shadow-lg shadow-[#667eea]/20 flex items-center justify-center flex-shrink-0">
          <f.icon size={26} />
        </div>
        <div>
          <h3 className="text-lg md:text-xl font-bold text-white mb-1.5">{f.title}</h3>
          <p className="text-sm md:text-base text-gray-400 leading-relaxed">{f.desc}</p>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ f }: { f: typeof features[number] }) {
  return (
    <div className="group p-5 sm:p-6 rounded-2xl glass-card glass-card-hover hover:-translate-y-1 transition-all duration-300 h-full">
      <div className="flex items-center gap-3.5 mb-3">
        <div
          className={`w-9 h-9 md:w-10 md:h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
            f.gradient
              ? "bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white shadow-lg shadow-[#667eea]/20"
              : "bg-[#667eea]/10 text-[#667eea]"
          }`}
        >
          <f.icon size={20} />
        </div>
        <h3 className="text-sm md:text-base font-bold text-white">{f.title}</h3>
      </div>
      <p className="text-xs md:text-sm text-gray-400 leading-relaxed">{f.desc}</p>
    </div>
  );
}

/* Compact card for the marquee row */
function MarqueeCard({ f }: { f: typeof features[number] }) {
  return (
    <div className="glass-card rounded-xl p-4 border border-white/10 flex-shrink-0 w-[200px]">
      <div className="flex items-center gap-2.5 mb-2">
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
            f.gradient
              ? "bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white shadow-lg shadow-[#667eea]/20"
              : "bg-[#667eea]/10 text-[#667eea]"
          }`}
        >
          <f.icon size={16} />
        </div>
        <h3 className="text-xs font-bold text-white">{f.title}</h3>
      </div>
      <p className="text-[11px] text-gray-400 leading-relaxed">{f.desc}</p>
    </div>
  );
}

/* Speed: pixels per second */
const MARQUEE_SPEED = 30;
const PAUSE_AFTER_TOUCH_MS = 4000;

export default function Features() {
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const offsetRef = useRef(0);
  const isPausedRef = useRef(false);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [, forceRender] = useState(0);

  /* Measure how wide one set of cards is */
  const getSetWidth = useCallback(() => {
    const el = trackRef.current;
    if (!el) return 0;
    return features.length * (200 + 12);
  }, []);

  /* Animation loop */
  const animate = useCallback((time: number) => {
    if (!lastTimeRef.current) lastTimeRef.current = time;
    const delta = (time - lastTimeRef.current) / 1000;
    lastTimeRef.current = time;

    if (!isPausedRef.current) {
      offsetRef.current -= MARQUEE_SPEED * delta;
      const setWidth = getSetWidth();
      if (setWidth > 0 && Math.abs(offsetRef.current) >= setWidth) {
        offsetRef.current += setWidth;
      }
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${offsetRef.current}px)`;
      }
    }

    animRef.current = requestAnimationFrame(animate);
  }, [getSetWidth]);

  const pause = useCallback(() => {
    isPausedRef.current = true;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      isPausedRef.current = false;
      lastTimeRef.current = 0;
    }, PAUSE_AFTER_TOUCH_MS);
  }, []);

  useEffect(() => {
    animRef.current = requestAnimationFrame(animate);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, [animate]);

  const doubled = [...features, ...features];
  const heroFeature = features[0]; // AI Extraction
  const restFeatures = features.slice(1);

  return (
    <section className="py-16 md:py-24" id="features" aria-labelledby="features-heading">
      {/* ── Mobile: continuous marquee ── */}
      <div className="md:hidden">
        <div className="px-4 mb-5">
          <p className="text-xl font-bold text-white mb-1 text-center" aria-hidden="true">
            The Complete Document Automation Platform
          </p>
          <p className="text-xs text-gray-400 text-center">
            Extract, clean, review, store, and integrate — all in one pipeline
          </p>
        </div>

        <div
          className="overflow-hidden"
          onTouchStart={pause}
        >
          <div
            ref={trackRef}
            className="flex gap-3 will-change-transform"
            style={{ width: "max-content" }}
          >
            {doubled.map((f, i) => (
              <MarqueeCard key={`${f.title}-${i}`} f={f} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Desktop: Bento Grid ── */}
      <div className="hidden md:block max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-10 md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 id="features-heading" className="text-3xl md:text-4xl font-bold text-white mb-3">
            The Complete Document Automation Platform
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-[600px] mx-auto">
            Extract, clean, review, store, and integrate — all in one pipeline
          </p>
        </motion.div>

        {/* Bento layout: hero card on top spanning full width, then 3-col grid */}
        <div className="space-y-4 md:space-y-5">
          {/* Hero feature - full width */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <HeroFeatureCard f={heroFeature} />
          </motion.div>

          {/* Rest in 3-column grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {restFeatures.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
              >
                <FeatureCard f={f} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
