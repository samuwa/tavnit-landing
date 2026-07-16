"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutGrid, Sparkles, GitBranch, Lightbulb,
  Database, Users, Code2, UserCheck, Bot, Plug,
} from "lucide-react";
import SheetSection from "./sheet/SheetSection";
import Cell from "./sheet/Cell";

const features = [
  { icon: Sparkles, title: "AI Extraction", desc: "Powered by multiple leading AI models to extract tables, metadata, handwriting, and complex layouts from any document. Includes confidence scoring, field-level validation, and support for multi-page and multi-language documents.", gradient: true, hero: true, accent: "gold" },
  { icon: LayoutGrid, title: "Flow Builder", desc: "No-code extraction pipelines with field hints, validation, and output mapping.", gradient: false, hero: false, accent: "gold" },
  { icon: GitBranch, title: "Routing & Splitting", desc: "Collections auto-route mixed documents to the right flow. Splitters break multi-document PDFs apart first.", gradient: false, hero: false, accent: "jade" },
  { icon: Lightbulb, title: "AI Data Cleaning", desc: "Cleaners format, translate, convert currencies and units, calculate fields, match against reference data — even classify HS tariff codes.", gradient: false, hero: false, accent: "raw" },
  { icon: Bot, title: "AI Agents", desc: "Browser-automation agents act on extracted data across the web — watch every session live.", gradient: false, hero: false, accent: "ink" },
  { icon: UserCheck, title: "Human in the Loop", desc: "Pause runs for review. Edit results in place, approve or reject — every action in an append-only audit trail.", gradient: false, hero: false, accent: "gold" },
  { icon: Plug, title: "MCP Connector", desc: "Add Tavnit to claude.ai, Cursor, or any MCP client — your AI assistant can run flows and query your data.", gradient: false, hero: false, accent: "jade" },
  { icon: Database, title: "Buckets & Analytics", desc: "Structured tables with charts, filters, CSV/Excel export, and AI-powered semantic search across columns.", gradient: false, hero: false, accent: "raw" },
  { icon: Code2, title: "API, Email & Webhooks", desc: "REST API, email triggers, webhook callbacks, PDF form filling, and Zapier/Make compatibility.", gradient: false, hero: false, accent: "ink" },
  { icon: Users, title: "Teams & Roles", desc: "Owner, Admin, Member, Viewer roles with org-level permissions and unlimited seats.", gradient: false, hero: false, accent: "gold" },
];

/* Icon accent chips — alternate gold-deep / jade / raw / ink for variety */
const accentClasses: Record<string, string> = {
  gold: "bg-[#FFF6DE] text-[#B9820A]",
  jade: "bg-[#E6F6F0] text-[#0C6B4C]",
  raw: "bg-[#FCEDE1] text-[#B4530E]",
  ink: "bg-[#F0F2F5] text-[#0E1C2B]",
};

/* Playful formula-bar strings for each non-hero feature card (restFeatures order) */
const cardFormulas = [
  "=BUILD(flow, no_code)",
  "=ROUTE(mixed_docs → flow)",
  "=CLEAN(format, translate, convert)",
  "=AGENT.RUN(browser, live)",
  "=REVIEW(pause → approve | reject)",
  "=CONNECT(claude.ai, cursor)",
  "=QUERY(buckets, semantic)",
  "=WEBHOOK(on_extract)",
  "=GRANT(role, seats)",
];

/* Hero feature card — spans 2 columns on desktop */
function HeroFeatureCard({ f }: { f: typeof features[number] }) {
  return (
    <div className="group relative p-6 md:p-8 rounded-lg glass-card border-[#FFC53D]/60 hover:border-[#B9820A]/60 transition-all duration-300 h-full overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFF6DE]/80 to-[#FFF6DE]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-5">
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-[#FFC53D] text-[#0E1C2B] shadow-[0_2px_0_#B9820A] flex items-center justify-center flex-shrink-0">
          <f.icon size={26} />
        </div>
        <div>
          <h3 className="text-lg md:text-xl font-bold text-[#0E1C2B] mb-1.5">{f.title}</h3>
          <p className="text-sm md:text-base text-[#6B7686] leading-relaxed">{f.desc}</p>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ f }: { f: typeof features[number] }) {
  return (
    <div className="group p-5 sm:p-6 rounded-lg glass-card glass-card-hover hover:-translate-y-1 transition-all duration-300 h-full">
      <div className="flex items-center gap-3.5 mb-3">
        <div
          className={`w-9 h-9 md:w-10 md:h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
            f.gradient
              ? "bg-[#FFC53D] text-[#0E1C2B] shadow-[0_2px_0_#B9820A]"
              : accentClasses[f.accent]
          }`}
        >
          <f.icon size={20} />
        </div>
        <h3 className="text-sm md:text-base font-bold text-[#0E1C2B]">{f.title}</h3>
      </div>
      <p className="text-xs md:text-sm text-[#6B7686] leading-relaxed">{f.desc}</p>
    </div>
  );
}

/* Compact card for the marquee row */
function MarqueeCard({ f }: { f: typeof features[number] }) {
  return (
    <div className="glass-card rounded-lg p-4 border border-[#C9CFD8] flex-shrink-0 w-[200px]">
      <div className="flex items-center gap-2.5 mb-2">
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
            f.gradient
              ? "bg-[#FFC53D] text-[#0E1C2B] shadow-[0_2px_0_#B9820A]"
              : accentClasses[f.accent]
          }`}
        >
          <f.icon size={16} />
        </div>
        <h3 className="text-xs font-bold text-[#0E1C2B]">{f.title}</h3>
      </div>
      <p className="text-[11px] text-[#6B7686] leading-relaxed">{f.desc}</p>
    </div>
  );
}

/* Speed: pixels per second */
const MARQUEE_SPEED = 30;
const PAUSE_AFTER_TOUCH_MS = 4000;

export const ROWS = 25;

export default function Features({ startRow }: { startRow: number }) {
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
    <SheetSection id="features" startRow={startRow} rows={ROWS} ariaLabelledby="features-heading">
      {/* ── Mobile: continuous marquee (one bare cell keeps the rAF animation intact) ── */}
      <Cell c={1} span={12} r={2} rowSpan={5} variant="k-bare" interactive={false} className="md:hidden!">
        <div className="md:hidden">
          <div className="px-4 mb-5">
            <p className="text-xl font-bold text-[#0E1C2B] mb-1 text-center" aria-hidden="true">
              The Complete Document Automation Platform
            </p>
            <p className="text-xs text-[#6B7686] text-center">
              Extract, clean, review, store, and act — all in one pipeline
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
      </Cell>

      {/* ── Desktop: heading, subtitle, hero feature, then a card grid — as sheet cells ── */}

      {/* Heading */}
      <Cell
        c={2}
        span={10}
        r={2}
        rowSpan={2}
        variant="k-title"
        className="justify-center text-center max-md:hidden!"
        formula="=FEATURES(platform)"
      >
        <motion.h2
          id="features-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          The Complete Document Automation Platform
        </motion.h2>
      </Cell>

      {/* Subtitle */}
      <Cell
        c={2}
        span={10}
        r={4}
        variant="k-sub"
        className="justify-center text-center max-md:hidden!"
        formula="=PIPELINE(extract → clean → review → store → act)"
      >
        <motion.p
          className="max-w-[600px] mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Extract, clean, review, store, and act — all in one pipeline
        </motion.p>
      </Cell>

      {/* Hero feature — full width bento card */}
      <Cell
        c={2}
        span={10}
        r={6}
        rowSpan={4}
        variant="k-bare"
        className="max-md:hidden!"
        formula="=EXTRACT(tables, metadata, handwriting)"
      >
        <motion.div
          className="w-full h-full"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <HeroFeatureCard f={heroFeature} />
        </motion.div>
      </Cell>

      {/* Rest of the features — two cards across, one sheet cell each */}
      {restFeatures.map((f, i) => (
        <Cell
          key={f.title}
          c={i % 2 === 0 ? 2 : 7}
          span={5}
          r={11 + Math.floor(i / 2) * 3}
          rowSpan={3}
          variant="k-bare"
          className="max-md:hidden!"
          formula={cardFormulas[i]}
        >
          <motion.div
            className="w-full h-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
          >
            <FeatureCard f={f} />
          </motion.div>
        </Cell>
      ))}
    </SheetSection>
  );
}
