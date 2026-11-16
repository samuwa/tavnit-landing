"use client";

import { motion, useTransform } from "framer-motion";
import { Check, WandSparkles } from "lucide-react";
import Record, { RecordBadge, RULES } from "./Record";
import { Panel, RECORD_FRAME, ramp, Switch, useGate, type P, type SceneProps } from "./shared";

/**
 * Stop 4: the Flow's Cleaners run, one after another, and the values in the
 * record change in place. Each rule is a switch: off, its value goes back
 * to what was printed.
 */

function RuleRow({ p, rule, on, onToggle }: { p: P; rule: (typeof RULES)[number]; on: boolean; onToggle: () => void }) {
  const gate = useGate(on);
  // Lit while the rule is running, ticked once it has run.
  const running = useTransform(() => {
    const v = p.get();
    return gate.get() * ramp(v, rule.at, rule.at + 0.03) * (1 - ramp(v, rule.at + 0.13, rule.at + 0.17));
  });
  const applied = useTransform(() => Math.min(ramp(p.get(), rule.at + 0.11, rule.at + 0.17), gate.get()));

  return (
    <div className="relative flex items-center justify-between gap-3 px-3.5 py-[11px]">
      <motion.div className="absolute inset-0 bg-[#3b82f6]/[0.08]" style={{ opacity: running }} aria-hidden="true" />
      <div className="relative flex min-w-0 items-center gap-2.5">
        <span className="relative grid h-7 w-7 shrink-0 place-items-center rounded-md border border-tint/15 text-fg-4" aria-hidden="true">
          <WandSparkles size={13} />
          <motion.span className="absolute inset-0 grid place-items-center rounded-md bg-panel" style={{ opacity: applied }}>
            <span className="absolute inset-0 rounded-md bg-emerald-500/15" />
            <Check size={13} strokeWidth={2.5} className="relative text-ok" />
          </motion.span>
        </span>
        <span className="min-w-0">
          <span className={`block truncate text-[12.5px] font-semibold transition-colors duration-200 ${on ? "text-fg-2" : "text-fg-5 line-through"}`}>
            {rule.label}
          </span>
          <span className="block font-mono text-[10px] text-fg-5">{rule.target}</span>
        </span>
      </div>
      <span className="relative">
        <Switch on={on} onToggle={onToggle} label={rule.label} />
      </span>
    </div>
  );
}

export default function CleanScene({ p, story }: SceneProps) {
  return (
    <div className={RECORD_FRAME}>
      <Panel title="Cleaners" right={<span className="shrink-0 text-[10px] text-fg-5">Supplier invoices</span>}>
        <div className="divide-y divide-tint/[0.07]">
          {RULES.map((rule) => (
            <RuleRow key={rule.id} p={p} rule={rule} on={!story.rulesOff.has(rule.id)} onToggle={() => story.toggleRule(rule.id)} />
          ))}
        </div>
      </Panel>

      <Record p={p} mode="clean" rulesOff={story.rulesOff} badge={<RecordBadge tone="busy">Cleaning</RecordBadge>} />
    </div>
  );
}
