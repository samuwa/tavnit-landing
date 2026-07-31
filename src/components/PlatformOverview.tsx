"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  LayoutDashboard,
  Workflow,
  FileSearch,
  Table2,
  Waypoints,
  History,
  AppWindow,
} from "lucide-react";

/* Auto-tour timing */
const ADVANCE_MS = 6000;

const pages = [
  {
    key: "dashboard",
    label: "Dashboard",
    route: "/dashboard",
    icon: LayoutDashboard,
    src: "/assets/tour2-dashboard.jpg",
    alt: "Tavnit dashboard showing documents processed, active flows, extracted pages, available credits, and recent runs",
    title: "Your operation at a glance",
    desc: "Documents processed, credits left, and every recent run — the morning check-in screen.",
  },
  {
    key: "flows",
    label: "Flows",
    route: "/flows",
    icon: Workflow,
    src: "/assets/tour2-flows.jpg",
    alt: "Flows library with a reusable Invoice Processor extraction workflow",
    title: "Teach it once",
    desc: "A flow is a reusable extractor for one document type. Build it once, run it on every file that follows.",
  },
  {
    key: "run-details",
    label: "Run Details",
    route: "/runs/2dd822b3",
    icon: FileSearch,
    src: "/assets/tour2-run-details.jpg",
    alt: "Run details page with pages processed, credits used, and a table of extracted rows",
    title: "Watch every extraction",
    desc: "Each run shows pages processed, credits used, and the extracted table — cleaned, pivoted, or raw.",
  },
  {
    key: "buckets",
    label: "Buckets",
    route: "/buckets/data-set",
    icon: Table2,
    src: "/assets/tour2-bucket.jpg",
    alt: "A bucket holding 1,339 extracted rows in a spreadsheet view with filter, sort, formula, graph, and export tools",
    title: "Data lands in tables",
    desc: "Extracted rows accumulate in spreadsheet-style buckets — filter, sort, chart, and export anytime.",
  },
  {
    key: "pipeline-map",
    label: "Pipeline Map",
    route: "/pipeline-map",
    icon: Waypoints,
    src: "/assets/tour2-pipeline-map.jpg",
    alt: "Pipeline map in columns view showing splitters, collections, flows, cleaners, and buckets connected across stages",
    title: "See the whole pipeline",
    desc: "Every source, flow, and destination on one live map of your document operation.",
  },
  {
    key: "runs",
    label: "Runs",
    route: "/runs",
    icon: History,
    src: "/assets/tour2-runs.jpg",
    alt: "Runs history listing every processed document with flow, trigger, source, status, and date",
    title: "A full audit trail",
    desc: "Who ran what, when, and how it ended — every document accounted for.",
  },
];

export default function PlatformOverview() {
  const [active, setActive] = useState(0);
  const [touring, setTouring] = useState(true); // auto-advance until the user takes over
  const [paused, setPaused] = useState(false); // hover/focus pause
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const tablistRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  /* Only run the tour while the section is on screen */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || reducedMotion) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  useEffect(() => {
    if (!touring || paused || !inView || reducedMotion) return;
    const t = setTimeout(() => {
      setActive((i) => (i + 1) % pages.length);
    }, ADVANCE_MS);
    return () => clearTimeout(t);
  }, [active, touring, paused, inView, reducedMotion]);

  const select = useCallback((i: number) => {
    setActive(i);
    setTouring(false);
  }, []);

  /* Keep the active chip visible when the sidebar collapses to a horizontal row */
  useEffect(() => {
    const list = tablistRef.current;
    if (!list || list.scrollWidth <= list.clientWidth) return;
    const buttons = list.querySelectorAll<HTMLButtonElement>("[role=tab]");
    buttons[active]?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [active]);

  /* Arrow-key navigation within the page list */
  const onTablistKeyDown = (e: React.KeyboardEvent) => {
    const dir =
      e.key === "ArrowDown" || e.key === "ArrowRight"
        ? 1
        : e.key === "ArrowUp" || e.key === "ArrowLeft"
          ? -1
          : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (active + dir + pages.length) % pages.length;
    select(next);
    const buttons = tablistRef.current?.querySelectorAll<HTMLButtonElement>("[role=tab]");
    buttons?.[next]?.focus();
  };

  const page = pages[active];
  const showProgress = touring && inView && !paused && !reducedMotion;

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24"
      id="platform-overview"
      aria-labelledby="platform-overview-heading"
    >
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* ── Header ── */}
        <motion.div
          className="text-center mb-10 md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3b82f6]/10 border border-[#3b82f6]/25 text-[#93c5fd] text-xs font-bold uppercase tracking-wider mb-5">
            <AppWindow size={14} />
            Platform tour
          </div>
          <h2
            id="platform-overview-heading"
            className="text-3xl md:text-4xl font-bold text-white mb-3"
          >
            The whole operation, <span className="text-[#93c5fd]">one workspace</span>
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-[560px] mx-auto">
            Real screens, real data. Six stops from first upload to finished
            table — no mockups.
          </p>
        </motion.div>

        {/* ── App replica ── */}
        <motion.div
          className="glass-card rounded-2xl overflow-hidden border border-[#3b82f6]/20 shadow-2xl shadow-[#3b82f6]/10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Window chrome */}
          <div className="flex items-center gap-3 px-4 py-2.5 bg-white/5 border-b border-white/10">
            <div className="flex gap-1.5" aria-hidden="true">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/60" />
            </div>
            <div
              className="flex-1 max-w-[340px] mx-auto bg-black/30 rounded-md px-3 py-1 text-[11px] text-gray-400 font-mono truncate text-center"
              aria-hidden="true"
            >
              app.tavnit.io<span className="text-gray-200">{page.route}</span>
            </div>
            <div className="w-[52px]" aria-hidden="true" />
          </div>

          <div className="lg:grid lg:grid-cols-[240px_1fr]">
            {/* Sidebar — mirrors the app's own navigation */}
            <div
              ref={tablistRef}
              role="tablist"
              aria-label="Tavnit app pages"
              aria-orientation="vertical"
              onKeyDown={onTablistKeyDown}
              className="flex lg:flex-col bg-[#0b0d18]/80 border-b lg:border-b-0 lg:border-r border-white/10 overflow-x-auto lg:overflow-visible p-2 lg:py-4 gap-1"
            >
              {pages.map((p, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={p.key}
                    role="tab"
                    id={`platform-tab-${p.key}`}
                    aria-selected={isActive}
                    aria-controls="platform-screen"
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => select(i)}
                    className={`relative shrink-0 lg:w-auto text-left rounded-lg px-3 py-2.5 transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#93c5fd] ${
                      isActive
                        ? "bg-[#3b82f6]/15 text-white"
                        : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <p.icon
                        size={16}
                        className={isActive ? "text-[#93c5fd]" : "text-gray-500"}
                        aria-hidden="true"
                      />
                      <span className="text-sm font-semibold whitespace-nowrap">
                        {p.label}
                      </span>
                    </span>
                    {/* Description unfolds under the active item on desktop */}
                    <span
                      className={`hidden lg:block overflow-hidden transition-all duration-300 ${
                        isActive ? "max-h-24 opacity-100 mt-1.5" : "max-h-0 opacity-0"
                      }`}
                    >
                      <span className="block text-xs leading-relaxed text-gray-400 font-normal">
                        {p.desc}
                      </span>
                    </span>
                    {/* Auto-tour progress along the active item */}
                    {isActive && showProgress && (
                      <span
                        key={active}
                        className="absolute left-0 bottom-0 h-[2px] rounded-full bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] platform-progress"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Screen */}
            <div
              id="platform-screen"
              role="tabpanel"
              aria-labelledby={`platform-tab-${page.key}`}
              className="relative aspect-[1327/801] bg-[#0d0f1c]"
            >
              {pages.map((p, i) => (
                <Image
                  key={p.key}
                  src={p.src}
                  alt={i === active ? p.alt : ""}
                  fill
                  sizes="(max-width: 1024px) 100vw, 930px"
                  className={`object-contain transition-opacity duration-500 ${
                    i === active ? "opacity-100" : "opacity-0"
                  }`}
                  priority={i === 0}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Caption for mobile, where the sidebar collapses to chips */}
        <p className="lg:hidden text-center text-sm text-gray-400 mt-4 px-4" aria-live="polite">
          <span className="font-semibold text-gray-200">{page.title}.</span>{" "}
          {page.desc}
        </p>
      </div>
    </section>
  );
}
