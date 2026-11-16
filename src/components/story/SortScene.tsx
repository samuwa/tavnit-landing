"use client";

import { motion, useTransform } from "framer-motion";
import { Scissors } from "lucide-react";
import { ramp, type SceneProps, type P } from "./shared";

/**
 * Stop 2: the scan that just arrived holds three documents. The six pages
 * are laid out; a scan passes over them and marks the two places where one
 * document ends and the next begins; the three parts come apart, are named,
 * and each drops down a line into the Flow built for its kind. The invoice
 * the story follows is the one left lit.
 *
 * (It used to be three cards sliding out of a pile, which showed that
 * something was split but not how: the cut points are the feature.)
 */

const PARTS = [
  { type: "Invoice", pages: [1, 2], flow: "Supplier invoices", ours: true, look: "invoice" },
  { type: "Packing list", pages: [3, 4], flow: "Packing lists", ours: false, look: "table" },
  { type: "Bill of lading", pages: [5, 6], flow: "Bills of lading", ours: false, look: "form" },
] as const;

/** One page of the scan: enough detail to tell the three kinds apart. */
function Page({ n, look }: { n: number; look: "invoice" | "table" | "form" }) {
  return (
    <span className="relative block h-[64px] w-[48px] shrink-0 rounded-[4px] bg-[#fdfcf8] p-[5px] shadow-[0_6px_14px_-8px_rgba(16,24,40,0.6)] ring-1 ring-black/10">
      {look === "invoice" && (
        <>
          <span className="block h-[3px] w-[18px] rounded bg-[#1c2321]/70" />
          <span className="mt-[5px] block h-[2px] rounded bg-[#1c2321]/20" />
          <span className="mt-[3px] block h-[2px] rounded bg-[#1c2321]/20" />
          <span className="mt-[3px] block h-[2px] w-[26px] rounded bg-[#1c2321]/20" />
          <span className="mt-[7px] ml-auto block h-[3px] w-[14px] rounded bg-[#3b82f6]/80" />
        </>
      )}
      {look === "table" && (
        <>
          <span className="block h-[3px] w-[22px] rounded bg-[#1c2321]/70" />
          <span className="mt-[5px] grid grid-cols-3 gap-[2px]">
            {Array.from({ length: 12 }, (_, i) => (
              <span key={i} className="h-[4px] rounded-[1px] bg-[#1c2321]/15" />
            ))}
          </span>
        </>
      )}
      {look === "form" && (
        <>
          <span className="flex gap-[3px]">
            <span className="h-[12px] flex-1 rounded-[2px] ring-1 ring-[#1c2321]/25" />
            <span className="h-[12px] flex-1 rounded-[2px] ring-1 ring-[#1c2321]/25" />
          </span>
          <span className="mt-[4px] block h-[2px] rounded bg-[#1c2321]/20" />
          <span className="mt-[3px] block h-[2px] w-[24px] rounded bg-[#1c2321]/20" />
          <span className="mt-[5px] block h-[10px] rounded-[2px] ring-1 ring-[#1c2321]/25" />
        </>
      )}
      <span className="absolute bottom-[3px] right-[4px] font-mono text-[6.5px] text-[#6b7672]">{n}</span>
    </span>
  );
}

function Part({ p, index }: { p: P; index: number }) {
  const part = PARTS[index];
  // Before the cut the three sit together as one scan.
  const x = useTransform(p, (v) => (1 - ramp(v, 0.3, 0.46)) * (1 - index) * 22);
  const name = useTransform(p, (v) => ramp(v, 0.4, 0.5));
  const nameY = useTransform(p, (v) => (1 - ramp(v, 0.4, 0.5)) * -6);
  const line = useTransform(p, (v) => ramp(v, 0.52 + index * 0.07, 0.66 + index * 0.07));
  const flow = useTransform(p, (v) => 0.3 + 0.7 * ramp(v, 0.64 + index * 0.07, 0.72 + index * 0.07));
  const flowY = useTransform(p, (v) => (1 - ramp(v, 0.64 + index * 0.07, 0.72 + index * 0.07)) * 6);
  const rest = useTransform(p, (v) => (part.ours ? 1 : 1 - 0.6 * ramp(v, 0.88, 0.97)));
  const ours = useTransform(p, (v) => (part.ours ? ramp(v, 0.88, 0.97) : 0));

  return (
    <motion.div className="flex flex-col items-center" style={{ opacity: rest }}>
      <motion.div className="flex gap-[5px]" style={{ x }}>
        {part.pages.map((n) => (
          <Page key={n} n={n} look={part.look} />
        ))}
      </motion.div>

      <motion.div className="mt-2.5 text-center" style={{ opacity: name, y: nameY }}>
        <span className="block text-[12px] font-semibold leading-tight text-fg">{part.type}</span>
        <span className="block font-mono text-[9.5px] text-fg-5">
          pages {part.pages[0]}–{part.pages[1]}
        </span>
      </motion.div>

      <div className="relative my-1.5 h-[30px] w-px">
        <motion.span className="absolute inset-0 origin-top bg-gradient-to-b from-[#3b82f6] to-[#6c42f0]" style={{ scaleY: line }} />
      </div>

      <motion.div
        className="relative w-full rounded-lg border border-tint/10 bg-panel/95 px-2.5 py-2 text-center shadow-(--shadow-card)"
        style={{ opacity: flow, y: flowY }}
      >
        <motion.span className="absolute inset-0 rounded-lg ring-[1.5px] ring-[#3b82f6]/70" style={{ opacity: ours }} />
        <span className="block text-[9px] font-semibold uppercase tracking-[0.14em] text-fg-5">Flow</span>
        <span className="block truncate text-[11.5px] font-semibold text-fg-2">{part.flow}</span>
      </motion.div>
    </motion.div>
  );
}

/** Where one document ends and the next begins. */
function Cut({ p, at, left }: { p: P; at: number; left: string }) {
  const opacity = useTransform(p, (v) => ramp(v, at, at + 0.04) * (1 - ramp(v, 0.36, 0.46)));
  const scaleY = useTransform(p, (v) => ramp(v, at, at + 0.06));
  return (
    <motion.div className="absolute top-[-8px] flex h-[80px] -translate-x-1/2 flex-col items-center" style={{ left, opacity }}>
      <Scissors size={11} className="rotate-90 text-accent" />
      <motion.span className="mt-0.5 w-px flex-1 origin-top border-l border-dashed border-accent" style={{ scaleY }} />
    </motion.div>
  );
}

export default function SortScene({ p }: SceneProps) {
  // The scan: a band of light crossing the six pages, left to right.
  const scanX = useTransform(p, (v) => `${ramp(v, 0.03, 0.28) * 100}%`);
  const scan = useTransform(p, (v) => ramp(v, 0.03, 0.06) * (1 - ramp(v, 0.26, 0.3)));
  const file = useTransform(p, (v) => 1 - ramp(v, 0.34, 0.44));
  const title = useTransform(p, (v) => ramp(v, 0.34, 0.46));

  return (
    <div className="mx-auto max-w-[500px]" aria-hidden="true">
      <div className="relative mb-4 h-[18px] text-center">
        <motion.span className="absolute inset-0 font-mono text-[11px] text-fg-4" style={{ opacity: file }}>
          shipment-0412.pdf · 6 pages
        </motion.span>
        <motion.span className="absolute inset-0 text-[10px] font-semibold uppercase tracking-[0.16em] text-fg-4" style={{ opacity: title }}>
          Splitter · 3 documents found
        </motion.span>
      </div>

      <div className="relative grid grid-cols-3 gap-3">
        {PARTS.map((part, i) => (
          <Part key={part.type} p={p} index={i} />
        ))}

        {/* The scan and the two cuts sit over the row of pages. */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[64px]">
          <motion.div className="absolute inset-y-[-6px] left-0 w-full" style={{ x: scanX, opacity: scan }}>
            <span className="absolute inset-y-0 left-0 w-[2px] -translate-x-1/2 bg-[#3b82f6] shadow-[0_0_14px_2px_rgba(59,130,246,0.7)]" />
            <span className="absolute inset-y-0 right-full w-[70px] bg-gradient-to-l from-[#3b82f6]/25 to-transparent" />
          </motion.div>
          <Cut p={p} at={0.12} left="33.33%" />
          <Cut p={p} at={0.21} left="66.66%" />
        </div>
      </div>
    </div>
  );
}
