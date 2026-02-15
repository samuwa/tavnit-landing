"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "framer-motion";
import { LayoutDashboard, FileSearch, Table2 } from "lucide-react";


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
  },
  {
    src: "/assets/extraction.png",
    alt: "Flow Details - Document Extraction",
    label: "Run Details",
    icon: FileSearch,
    desc: "Inspect extracted fields, confidence scores, and export results instantly.",
  },
  {
    src: "/assets/buckets.png",
    alt: "Buckets - Tabulation View",
    label: "Buckets",
    icon: Table2,
    desc: "Browse, filter, and export structured data across all documents.",
  },
];

export default function PlatformOverview() {
  return (
    <section className="py-12" id="platform-overview">
      {/* ── Header — z-10 so animation can't cover it ── */}
      <motion.div
        className="relative z-10 text-center mb-8 md:mb-14 px-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Platform Overview
        </h2>
        <p className="text-base md:text-lg text-gray-400 max-w-[520px] mx-auto">
          From dashboard to extraction to tabulation — see how Tavnit
          streamlines your workflow
        </p>
      </motion.div>

      {/* ── Two-column layout ── */}
      <div className="px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center lg:gap-20 gap-10">
          {/* Left — descriptions */}
          <motion.div
            className="space-y-8 lg:w-[360px] lg:shrink-0"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {screenshots.map((s) => (
              <div key={s.label} className="flex gap-4 items-start">
                <div className="w-11 h-11 rounded-lg bg-[#667eea]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <s.icon size={22} className="text-[#667eea]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {s.label}
                  </h3>
                  <p className="text-base text-gray-400 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Right — Card Swap animation */}
          <motion.div
            className="relative overflow-visible w-full h-[300px] sm:h-[380px] lg:shrink-0 lg:w-[660px] lg:h-[500px]"
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
                    <div className="relative z-10 px-3 py-1.5 bg-black border-b border-white/10 shrink-0 flex items-center gap-1.5">
                      <s.icon size={11} className="text-white/60" />
                      <span className="text-[11px] font-medium tracking-wide text-white/90">
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
        </div>
      </div>
    </section>
  );
}
