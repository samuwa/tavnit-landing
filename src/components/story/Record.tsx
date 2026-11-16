"use client";

import { useEffect } from "react";
import { animate, motion, useMotionTemplate, useMotionValue, useTransform } from "framer-motion";
import { EASE_OUT, Panel, ramp, useGate, type P } from "./shared";

/**
 * The record: what the invoice becomes. It is the one thing that stays on
 * stage from extraction to approval. Values fly into it as they are read,
 * change in place as they are cleaned, and it is this same panel that is
 * approved. Three stops render it in the same spot, so it reads as one
 * object with a history rather than three mock-ups.
 */

export const RULES = [
  { id: "date", label: "Format date", target: "date", at: 0.06 },
  { id: "number", label: "Number format", target: "total", at: 0.28 },
  { id: "translate", label: "Translate", target: "line_items", at: 0.5 },
  { id: "match", label: "Match to your vendors", target: "vendor", at: 0.72 },
];

type Field = { name: string; raw: string; clean?: string; rule?: string; readAt: number };

const FIELDS: Field[] = [
  { name: "vendor", raw: "Northwind Freight GmbH", clean: "V-0192", rule: "match", readAt: 0.08 },
  { name: "invoice_no", raw: "NW-2026-0412", readAt: 0.16 },
  { name: "date", raw: "11.04.2026", clean: "2026-04-11", rule: "date", readAt: 0.24 },
  { name: "po_number", raw: "PO-8817", readAt: 0.36 },
  { name: "line_items", raw: "Seefracht HAM–NYC +2", clean: "Ocean freight HAM–NYC +2", rule: "translate", readAt: 0.6 },
  { name: "total", raw: "3.285,00", clean: "3285.00", rule: "number", readAt: 0.86 },
];

/** When the lens, sweeping on its own, reaches each value. */
export const READ_ORDER = FIELDS.map((f) => ({ name: f.name, at: f.readAt, text: f.raw }));

/**
 * extract: values appear as they land from the paper, as printed.
 * clean:   everything is there; values change as each rule runs.
 * settled: cleaned, as the visitor's rules left it.
 */
type Mode = "extract" | "clean" | "settled";

function Row({
  field,
  p,
  mode,
  landed,
  ruleOn,
  flagged,
}: {
  field: Field;
  p: P;
  mode: Mode;
  landed: boolean;
  ruleOn: boolean;
  flagged: boolean;
}) {
  const rule = RULES.find((r) => r.id === field.rule);
  const gate = useGate(ruleOn);

  // Extract: the row is there once its value has landed from the paper.
  const arrived = useMotionValue(0);
  useEffect(() => {
    const move = animate(arrived, landed ? 1 : 0, { duration: landed ? 0.25 : 0, ease: EASE_OUT });
    return () => move.stop();
  }, [landed, arrived]);
  const shown = useTransform(() => {
    const here = arrived.get();
    return mode === "extract" ? here : 1;
  });

  // How cleaned the value is, 0 (as printed) → 1.
  const t = useTransform(() => {
    const on = gate.get();
    const v = p.get();
    if (!rule || mode === "extract") return 0;
    return mode === "clean" ? Math.min(ramp(v, rule.at, rule.at + 0.15), on) : on;
  });
  const rawOpacity = useTransform(t, [0, 0.6], [1, 0]);
  const rawY = useTransform(t, [0, 1], [0, -10]);
  const blur = useTransform(t, [0, 0.6], [0, 4]);
  const rawFilter = useMotionTemplate`blur(${blur}px)`;
  const cleanOpacity = useTransform(t, [0.35, 1], [0, 1]);
  const cleanY = useTransform(t, [0.35, 1], [10, 0]);

  // While its rule runs, a band of light crosses the row.
  const sweep = useTransform(() => {
    const on = gate.get();
    const v = p.get();
    return rule && mode === "clean" ? ramp(v, rule.at - 0.01, rule.at + 0.16) * on : 0;
  });
  const sweepX = useTransform(sweep, (k) => `${-110 + 320 * k}%`);
  const sweepOpacity = useTransform(sweep, (k) => Math.sin(Math.PI * k));

  return (
    <div className="relative overflow-hidden">
      {/* Just landed: the row answers. */}
      {mode === "extract" && landed && <span className="story-flash pointer-events-none absolute inset-0" />}
      <motion.span
        className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-emerald-400/25 to-transparent"
        style={{ x: sweepX, opacity: sweepOpacity }}
      />
      <span
        className={`pointer-events-none absolute inset-x-1.5 inset-y-0.5 rounded-md ring-1 ring-[#3b82f6]/55 transition-opacity duration-300 ${
          flagged ? "opacity-100" : "opacity-0"
        }`}
      />
      <div className="relative flex items-center justify-between gap-3 px-3.5 py-[7px] font-mono text-[11px]">
        <span className="shrink-0 text-accent/85">{field.name}</span>
        <motion.span className="relative h-[16px] min-w-0 flex-1 text-right" style={{ opacity: shown }}>
          <motion.span
            data-field={field.name}
            className="absolute right-0 top-0 max-w-full truncate text-fg-2"
            style={{ opacity: rawOpacity, y: rawY, filter: rawFilter }}
          >
            {field.raw}
          </motion.span>
          {field.clean && (
            <motion.span className="absolute inset-0 truncate font-semibold text-ok" style={{ opacity: cleanOpacity, y: cleanY }}>
              {field.clean}
            </motion.span>
          )}
        </motion.span>
      </div>
    </div>
  );
}

export default function Record({
  p,
  mode,
  badge,
  landed,
  rulesOff,
  flag,
}: {
  p: P;
  mode: Mode;
  /** What is happening to the record right now, top right. */
  badge: React.ReactNode;
  /** Extract: fields whose value has landed from the paper. */
  landed?: ReadonlySet<string>;
  /** Cleaner rules the visitor switched off. */
  rulesOff: ReadonlySet<string>;
  /** A field to point at (the one the review is about). */
  flag?: string;
}) {
  return (
    <Panel title="Run #4128" right={badge}>
      <div className="divide-y divide-tint/[0.07]" aria-hidden="true">
        {FIELDS.map((f) => (
          <Row
            key={f.name}
            field={f}
            p={p}
            mode={mode}
            landed={landed?.has(f.name) ?? false}
            ruleOn={!f.rule || !rulesOff.has(f.rule)}
            flagged={flag === f.name}
          />
        ))}
      </div>
    </Panel>
  );
}

/** The small status text at the top right of the record. */
export function RecordBadge({ tone = "quiet", children }: { tone?: "quiet" | "busy" | "wait" | "ok"; children: React.ReactNode }) {
  const look = {
    quiet: "text-fg-5",
    busy: "text-accent",
    wait: "text-amber-500",
    ok: "text-ok",
  }[tone];
  return <span className={`shrink-0 text-[10px] font-semibold uppercase tracking-[0.1em] transition-colors duration-300 ${look}`}>{children}</span>;
}
