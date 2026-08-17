"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  LayoutDashboard,
  Workflow,
  History,
  Table2,
  AudioLines,
  Waypoints,
  AppWindow,
  ChevronDown,
} from "lucide-react";

/* Auto-tour timing */
const ADVANCE_MS = 6000;

type Leaf = {
  key: string;
  label: string;
  chip: string;
  route: string;
  src: string;
  alt: string;
  desc: string;
};

type Group = {
  key: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  pages: Leaf[];
};

const groups: Group[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    pages: [
      {
        key: "dashboard",
        label: "Dashboard",
        chip: "Dashboard",
        route: "/dashboard",
        src: "/assets/tour2-dashboard.jpg",
        alt: "Tavnit dashboard showing documents processed, active flows, extracted pages, available credits, and recent runs",
        desc: "Documents processed, credits left, and every recent run — the morning check-in screen.",
      },
    ],
  },
  {
    key: "flows",
    label: "Flows",
    icon: Workflow,
    pages: [
      {
        key: "flows",
        label: "All Flows",
        chip: "Flows",
        route: "/flows",
        src: "/assets/tour2-flows.jpg",
        alt: "Flows library with a reusable Invoice Processor extraction workflow",
        desc: "A flow is a reusable extractor for one document type. Build it once, run it on every file that follows.",
      },
      {
        key: "flow-details",
        label: "Flow Details",
        chip: "Flow Details",
        route: "/flows/f6dfcbe7",
        src: "/assets/tour2-flow-details-b.jpg",
        alt: "Flow details page showing the Invoice Processor schema with metadata and table fields side by side, plus triggers, cleaners, and outputs",
        desc: "Every field the extractor captures — plus triggers, cleaners, and outputs — editable in place.",
      },
    ],
  },
  {
    key: "runs",
    label: "Runs",
    icon: History,
    pages: [
      {
        key: "runs",
        label: "All Runs",
        chip: "Runs",
        route: "/runs",
        src: "/assets/tour2-runs.jpg",
        alt: "Runs history listing every processed document with flow, trigger, source, status, and date",
        desc: "Who ran what, when, and how it ended — every document accounted for.",
      },
      {
        key: "run-details",
        label: "Run Details",
        chip: "Run Details",
        route: "/runs/2dd822b3",
        src: "/assets/tour2-run-details.jpg",
        alt: "Run details page with pages processed, credits used, and a table of extracted rows",
        desc: "Pages processed, credits used, and the extracted table — cleaned, pivoted, or raw.",
      },
    ],
  },
  {
    key: "buckets",
    label: "Buckets",
    icon: Table2,
    pages: [
      {
        key: "buckets",
        label: "Buckets",
        chip: "Buckets",
        route: "/buckets/data-set",
        src: "/assets/tour2-bucket.jpg",
        alt: "A bucket holding 1,339 extracted rows in a spreadsheet view with filter, sort, formula, graph, and export tools",
        desc: "Extracted rows accumulate in spreadsheet-style buckets — filter, sort, chart, and export anytime.",
      },
    ],
  },
  {
    key: "signals",
    label: "Signals",
    icon: AudioLines,
    pages: [
      {
        key: "signals",
        label: "All Signals",
        chip: "Signals",
        route: "/signals",
        src: "/assets/tour2-signals.jpg",
        alt: "Signals page with a Customer Service signal that structures audio conversations into data",
        desc: "Signals turn audio into data. Define what to capture from a call once — every recording that follows becomes rows.",
      },
      {
        key: "wave-conversation",
        label: "Wave · Conversation",
        chip: "Conversation",
        route: "/waves/23648877?tab=conversation",
        src: "/assets/tour2-wave-conversation.jpg",
        alt: "Wave conversation view with a per-speaker waveform and a transcript tagged with sentiment and extracted values",
        desc: "Each call transcribed into speaker turns — tagged with sentiment and extracted values inline.",
      },
      {
        key: "wave-results",
        label: "Wave · Results",
        chip: "Results",
        route: "/waves/23648877?tab=results",
        src: "/assets/tour2-wave-results.jpg",
        alt: "Wave results view structuring the call into rows with interaction type, turn, timestamp, and speaker",
        desc: "The same call as rows — interaction type, turn, timestamp, speaker — ready to filter and export.",
      },
    ],
  },
  {
    key: "pipeline-map",
    label: "Pipeline Map",
    icon: Waypoints,
    pages: [
      {
        key: "pipeline-map",
        label: "Pipeline Map",
        chip: "Pipeline Map",
        route: "/pipeline-map",
        src: "/assets/tour2-pipeline-map.jpg",
        alt: "Pipeline map in columns view showing splitters, collections, flows, cleaners, and buckets connected across stages",
        desc: "Every source, flow, and destination on one live map of your document operation.",
      },
    ],
  },
];

/* Flat tour order with back-references to the owning group */
const leaves: (Leaf & { groupIndex: number })[] = groups.flatMap((g, gi) =>
  g.pages.map((p) => ({ ...p, groupIndex: gi }))
);

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
      setActive((i) => (i + 1) % leaves.length);
    }, ADVANCE_MS);
    return () => clearTimeout(t);
  }, [active, touring, paused, inView, reducedMotion]);

  const select = useCallback((i: number) => {
    setActive(i);
    setTouring(false);
  }, []);

  /* Keep the active chip visible when the sidebar collapses to a horizontal
     row. Scroll the strip itself, never scrollIntoView — that scrolls every
     ancestor too, yanking the page down to this section on mobile load. */
  useEffect(() => {
    const list = tablistRef.current;
    if (!list || list.scrollWidth <= list.clientWidth) return;
    const btn = list.querySelectorAll<HTMLButtonElement>("[role=tab]")[active];
    if (!btn) return;
    const listRect = list.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    const left = btnRect.left - listRect.left + list.scrollLeft - (list.clientWidth - btnRect.width) / 2;
    list.scrollTo({ left, behavior: "smooth" });
  }, [active]);

  /* Arrow-key navigation across all leaf tabs */
  const onTablistKeyDown = (e: React.KeyboardEvent) => {
    const dir =
      e.key === "ArrowDown" || e.key === "ArrowRight"
        ? 1
        : e.key === "ArrowUp" || e.key === "ArrowLeft"
          ? -1
          : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (active + dir + leaves.length) % leaves.length;
    select(next);
    const buttons = tablistRef.current?.querySelectorAll<HTMLButtonElement>("[role=tab]");
    buttons?.[next]?.focus();
  };

  const page = leaves[active];
  const activeGroup = page.groupIndex;
  const showProgress = touring && inView && !paused && !reducedMotion;

  /* First leaf index of each group, for parent-row clicks */
  const groupStart = groups.map((g, gi) => leaves.findIndex((l) => l.groupIndex === gi));

  const progressBar = (
    <span
      key={active}
      className="absolute left-0 bottom-0 h-[2px] rounded-full bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] platform-progress"
      aria-hidden="true"
    />
  );

  const description = (leaf: Leaf, isActive: boolean) => (
    <span
      className={`hidden lg:block overflow-hidden transition-all duration-300 ${
        isActive ? "max-h-24 opacity-100 mt-1" : "max-h-0 opacity-0"
      }`}
    >
      <span className="block text-xs leading-relaxed text-gray-400 font-normal">
        {leaf.desc}
      </span>
    </span>
  );

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
            Real screens, real data. From first upload to finished table — and
            every call recording in between.
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
              className="flex-1 max-w-[360px] mx-auto bg-black/30 rounded-md px-3 py-1 text-[11px] text-gray-400 font-mono truncate text-center"
              aria-hidden="true"
            >
              app.tavnit.io<span className="text-gray-200">{page.route}</span>
            </div>
            <div className="w-[52px]" aria-hidden="true" />
          </div>

          <div className="lg:grid lg:grid-cols-[250px_1fr]">
            {/* Sidebar — mirrors the app's own navigation, with sub-pages */}
            <div
              ref={tablistRef}
              role="tablist"
              aria-label="Tavnit app pages"
              aria-orientation="vertical"
              onKeyDown={onTablistKeyDown}
              className="flex lg:flex-col bg-[#0b0d18]/80 border-b lg:border-b-0 lg:border-r border-white/10 overflow-x-auto lg:overflow-visible p-2 lg:py-3 gap-1"
            >
              {groups.map((g, gi) => {
                const isSingle = g.pages.length === 1;
                const groupActive = gi === activeGroup;

                if (isSingle) {
                  const li = groupStart[gi];
                  const leaf = leaves[li];
                  const isActive = li === active;
                  return (
                    <button
                      key={g.key}
                      role="tab"
                      id={`platform-tab-${leaf.key}`}
                      aria-selected={isActive}
                      aria-controls="platform-screen"
                      tabIndex={isActive ? 0 : -1}
                      onClick={() => select(li)}
                      className={`relative shrink-0 text-left rounded-lg px-3 py-2 transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#93c5fd] ${
                        isActive
                          ? "bg-[#3b82f6]/15 text-white"
                          : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <g.icon
                          size={15}
                          className={isActive ? "text-[#93c5fd]" : "text-gray-500"}
                          aria-hidden="true"
                        />
                        <span className="text-sm font-semibold whitespace-nowrap">
                          {g.label}
                        </span>
                      </span>
                      {description(leaf, isActive)}
                      {isActive && showProgress && progressBar}
                    </button>
                  );
                }

                /* Group with sub-pages: parent row + expandable children */
                return (
                  <div key={g.key} className="shrink-0 flex lg:block gap-1">
                    <button
                      type="button"
                      aria-expanded={groupActive}
                      onClick={() => select(groupStart[gi])}
                      className={`hidden lg:block w-full shrink-0 text-left rounded-lg px-3 py-2 transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#93c5fd] ${
                        groupActive
                          ? "text-white"
                          : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <g.icon
                          size={15}
                          className={groupActive ? "text-[#93c5fd]" : "text-gray-500"}
                          aria-hidden="true"
                        />
                        <span className="text-sm font-semibold whitespace-nowrap">
                          {g.label}
                        </span>
                        <ChevronDown
                          size={13}
                          className={`ml-auto hidden lg:block text-gray-500 transition-transform duration-300 ${
                            groupActive ? "rotate-180" : ""
                          }`}
                          aria-hidden="true"
                        />
                      </span>
                    </button>

                    {/* Children: always visible as chips on mobile, accordion on desktop */}
                    <div
                      className={`flex lg:block gap-1 lg:ml-[17px] lg:border-l lg:border-white/10 lg:pl-2 lg:overflow-hidden lg:transition-all lg:duration-300 ${
                        groupActive
                          ? "lg:max-h-72 lg:opacity-100 lg:mt-0.5"
                          : "lg:max-h-0 lg:opacity-0"
                      }`}
                    >
                      {g.pages.map((leaf) => {
                        const li = leaves.findIndex((l) => l.key === leaf.key);
                        const isActive = li === active;
                        return (
                          <button
                            key={leaf.key}
                            role="tab"
                            id={`platform-tab-${leaf.key}`}
                            aria-selected={isActive}
                            aria-controls="platform-screen"
                            tabIndex={isActive ? 0 : -1}
                            onClick={() => select(li)}
                            className={`relative lg:w-full shrink-0 text-left rounded-md px-2.5 py-1.5 lg:mb-0.5 transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#93c5fd] ${
                              isActive
                                ? "bg-[#3b82f6]/15 text-white"
                                : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                            }`}
                          >
                            <span className="text-[13px] font-medium whitespace-nowrap">
                              {leaf.label}
                            </span>
                            {description(leaf, isActive)}
                            {isActive && showProgress && progressBar}
                          </button>
                        );
                      })}
                    </div>
                  </div>
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
              {leaves.map((leaf, i) => (
                <Image
                  key={leaf.key}
                  src={leaf.src}
                  alt={i === active ? leaf.alt : ""}
                  fill
                  sizes="(max-width: 1024px) 100vw, 920px"
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
          <span className="font-semibold text-gray-200">{page.chip}.</span>{" "}
          {page.desc}
        </p>
      </div>
    </section>
  );
}
