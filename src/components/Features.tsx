"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutGrid, Sparkles, GitBranch, Lightbulb,
  Database, BarChart3, Users, Code2, Clock,
} from "lucide-react";

const features = [
  { icon: LayoutGrid, title: "Flow Builder", desc: "No-code extraction pipelines with Cleaners and Buckets built in.", gradient: false },
  { icon: Sparkles, title: "AI Extraction", desc: "Confidence scoring for tables, handwriting, and complex layouts.", gradient: true },
  { icon: GitBranch, title: "Smart Routing", desc: "AI-powered Collections route mixed documents to the right flow.", gradient: false },
  { icon: Lightbulb, title: "AI Data Cleaning", desc: "Auto-format, categorize, and validate with Cleaners after extraction.", gradient: false },
  { icon: Database, title: "Data Storage", desc: "Buckets with custom columns, charts, and CSV/JSON export.", gradient: false },
  { icon: BarChart3, title: "Charts & Analytics", desc: "Bar, line, pie, and scatter charts from your extracted data.", gradient: false },
  { icon: Users, title: "Team Collaboration", desc: "Roles, invite codes, audit logs, and unlimited members.", gradient: false },
  { icon: Code2, title: "Developer APIs", desc: "REST API, webhooks, email triggers, and SDKs.", gradient: false },
  { icon: Clock, title: "Flexible Billing", desc: "Monthly plans with credits. Buy extra anytime at base rate.", gradient: false },
];

function FeatureCard({ f }: { f: typeof features[number] }) {
  return (
    <div className="group p-5 sm:p-6 md:p-8 rounded-2xl glass-card glass-card-hover hover:-translate-y-1 transition-all duration-300 h-full">
      <div className="flex items-center gap-4 mb-4">
        <div
          className={`w-9 h-9 md:w-10 md:h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
            f.gradient
              ? "bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white shadow-lg shadow-[#667eea]/20"
              : "bg-[#667eea]/10 text-[#667eea]"
          }`}
        >
          <f.icon size={22} />
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
    // We render cards twice; each set has features.length children
    // Each card is 200px + gap (12px)
    return features.length * (200 + 12);
  }, []);

  /* Animation loop */
  const animate = useCallback((time: number) => {
    if (!lastTimeRef.current) lastTimeRef.current = time;
    const delta = (time - lastTimeRef.current) / 1000; // seconds
    lastTimeRef.current = time;

    if (!isPausedRef.current) {
      offsetRef.current -= MARQUEE_SPEED * delta;
      const setWidth = getSetWidth();
      // Loop: when we've scrolled past one full set, reset
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
      lastTimeRef.current = 0; // reset delta so no jump
    }, PAUSE_AFTER_TOUCH_MS);
  }, []);

  useEffect(() => {
    animRef.current = requestAnimationFrame(animate);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, [animate]);

  /* Duplicate cards for seamless loop */
  const doubled = [...features, ...features];

  return (
    <section className="py-12" id="features">
      {/* ── Mobile: continuous marquee ── */}
      <div className="md:hidden">
        <div className="px-4 mb-5">
          <h2 className="text-xl font-bold text-white mb-1 text-center">
            Everything You Need to Automate Document Processing
          </h2>
          <p className="text-xs text-gray-400 text-center">
            Powerful features designed for teams and developers
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

      {/* ── Desktop: Grid (unchanged) ── */}
      <div className="hidden md:block max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Everything You Need to Automate Document Processing
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-[600px] mx-auto">
            Powerful features designed for teams and developers
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-12">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <FeatureCard f={f} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
