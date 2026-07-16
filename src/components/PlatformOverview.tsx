"use client";

import { Fragment } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "framer-motion";
import { LayoutDashboard, FileSearch, Table2 } from "lucide-react";
import SheetSection from "./sheet/SheetSection";
import Cell from "./sheet/Cell";


const CardSwap = dynamic(
  () => import("@/components/CardSwap").then((mod) => mod.default),
  { ssr: false }
);
const CardComponent = dynamic(
  () =>
    import("@/components/CardSwap").then((mod) => {
      const C = mod.Card;
      return { default: C };
    }),
  { ssr: false }
);

const screenshots = [
  {
    src: "/assets/dashboard.png",
    alt: "Tavnit Dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    desc: "Track documents, active flows, and recent runs from a single view.",
    formula: "=DASHBOARD(documents, flows, runs)",
    descFormula: "=VIEW(everything, one_glance)",
  },
  {
    src: "/assets/extraction.png",
    alt: "Flow Details - Document Extraction",
    label: "Run Details",
    icon: FileSearch,
    desc: "Inspect extracted fields, confidence scores, and export results instantly.",
    formula: "=DRILLDOWN(run_id)",
    descFormula: "=INSPECT(fields, confidence)",
  },
  {
    src: "/assets/buckets.png",
    alt: "Buckets - Tabulation View",
    label: "Buckets",
    icon: Table2,
    desc: "Browse, filter, and export structured data across all documents.",
    formula: "=PIVOT(structured_data)",
    descFormula: '=FILTER(rows, "anything")',
  },
];

export const ROWS = 19;

export default function PlatformOverview({ startRow }: { startRow: number }) {
  return (
    <SheetSection
      id="platform-overview"
      startRow={startRow}
      rows={ROWS}
      ariaLabelledby="platform-overview-heading"
    >
      {/* ── Header — z-10 so animation can't cover it ── */}
      <Cell
        c={2}
        span={8}
        r={2}
        rowSpan={2}
        variant="k-title"
        className="relative z-10"
        formula="=TOUR(Tavnit, start → finish)"
      >
        <motion.h2
          id="platform-overview-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Platform Overview
        </motion.h2>
      </Cell>

      <Cell
        c={2}
        span={8}
        r={4}
        rowSpan={2}
        variant="k-sub"
        className="relative z-10"
        formula='="the boring workflow, streamlined"'
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          From dashboard to extraction to tabulation — see how Tavnit
          streamlines your workflow
        </motion.p>
      </Cell>

      {/* ── Left — feature descriptions laid into cells ── */}
      {screenshots.map((s, i) => {
        const labelRow = 7 + i * 4;
        return (
          <Fragment key={s.label}>
            <Cell
              c={2}
              span={4}
              r={labelRow}
              variant="k-strong"
              formula={s.formula}
            >
              <motion.span
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className="w-11 h-11 rounded-lg bg-[#FFF6DE] border border-[#FFC53D]/50 flex items-center justify-center shrink-0">
                  <s.icon size={22} className="text-[#B9820A]" />
                </span>
                <h3>{s.label}</h3>
              </motion.span>
            </Cell>

            <Cell
              c={2}
              span={4}
              r={labelRow + 1}
              rowSpan={2}
              variant="k-muted"
              formula={s.descFormula}
            >
              <motion.p
                className="leading-relaxed"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {s.desc}
              </motion.p>
            </Cell>
          </Fragment>
        );
      })}

      {/* ── Right — Card Swap 3D animation (untouched) ── */}
      <Cell c={6} span={6} r={7} rowSpan={12} variant="k-bare" interactive={false}>
        <motion.div
          className="relative overflow-visible w-full h-[360px] sm:h-[420px] lg:shrink-0 lg:w-[660px] lg:h-[500px]"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <CardSwap
            cardDistance={55}
            verticalDistance={70}
            delay={5000}
            pauseOnHover={true}
            width={640}
            height={450}
            skewAmount={5}
          >
            {screenshots.map((s) => (
              <CardComponent key={s.label}>
                <div className="flex flex-col w-full h-full">
                  <div className="relative z-10 px-3 py-1.5 bg-[#0E1C2B] border-b border-[#1B2E44] shrink-0 flex items-center gap-1.5">
                    <s.icon size={11} className="text-[#9FB0C4]" />
                    <span className="text-[11px] font-medium tracking-wide text-[#EAF0F7]">
                      {s.label}
                    </span>
                  </div>
                  <div className="relative flex-1 min-h-0">
                    <Image
                      src={s.src}
                      alt={s.alt}
                      fill
                      className="object-cover object-top"
                      sizes="640px"
                    />
                  </div>
                </div>
              </CardComponent>
            ))}
          </CardSwap>
        </motion.div>
      </Cell>
    </SheetSection>
  );
}
