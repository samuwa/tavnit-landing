"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Check, Loader2, Maximize, Minus, Plus, Route, type LucideIcon } from "lucide-react";
import { Fit } from "./shared";

/**
 * The closing frame's picture: what the visitor put together, drawn as a
 * Pipeline in Tavnit Pro (the canvas where features are chained, not the
 * read-only Pipeline Map) and shown the way the product shows one running:
 * a node lights up, the connection into it flows, it is ticked, the next
 * one starts.
 *
 * The node is the product's: a spine on its left edge, the kind of node in
 * small capitals, its name, a line saying what it is set up to do, ports on
 * both sides, curved connections with an arrowhead. The palette is not: the
 * product gives every kind of node its own hue, and here there is one
 * accent on neutral cards. This frame is a statement of what was built, and
 * six colours made it read as a legend.
 *
 * Geometry is fixed (node size, column and row pitch) so the connections
 * are drawn without measuring; the whole canvas is then scaled to the width
 * there is. On phones the nodes are listed in order instead.
 */

export type PipeNode = {
  /** The kind of node, as the canvas labels it ("Flow", "Bucket write"). */
  kind: string;
  title: string;
  /** What it is configured to do. */
  detail: string;
  icon: LucideIcon;
};

const W = 212;
const H = 66;
const COL = W + 66;
const ROW = H + 14;
const PAD = 30;
const ACCENT = "#6366F1";

type State = "pending" | "running" | "done";

function Node({
  node,
  state,
  x,
  y,
  input = true,
  output = true,
}: {
  node: PipeNode;
  state: State;
  x?: number;
  y?: number;
  input?: boolean;
  output?: boolean;
}) {
  const placed = x !== undefined;
  return (
    <div
      className={`flex rounded-xl border bg-panel text-left shadow-(--shadow-card) transition-[border-color,box-shadow,opacity] duration-300 ${
        placed ? "absolute" : "relative"
      } ${
        state === "pending"
          ? "border-tint/10 opacity-55"
          : state === "running"
            ? "border-[#6366F1]/70 shadow-[0_0_0_3px_rgba(99,102,241,0.2),0_14px_30px_-16px_rgba(99,102,241,0.7)]"
            : "border-tint/15"
      }`}
      style={placed ? { left: x, top: y, width: W, height: H } : { height: H }}
    >
      {/* The spine */}
      <span className={`w-1 shrink-0 rounded-l-[11px] transition-colors duration-300 ${state === "pending" ? "bg-tint/15" : "bg-[#6366F1]"}`} />
      <span className="flex min-w-0 flex-1 items-center gap-2.5 px-2.5">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-tint/[0.06] text-fg-3">
          <node.icon size={16} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[9px] font-bold uppercase tracking-[0.13em] text-fg-5">{node.kind}</span>
          <span className="block truncate text-[12.5px] font-semibold leading-[1.25] text-fg">{node.title}</span>
          <span className="block truncate font-mono text-[10px] leading-[1.35] text-fg-4">{node.detail}</span>
        </span>
      </span>

      {/* Execution status */}
      {state === "running" && (
        <span className="absolute right-1.5 top-1.5 grid h-[18px] w-[18px] place-items-center rounded-full bg-[#6366F1] text-white">
          <Loader2 size={11} strokeWidth={3} className="animate-spin" />
        </span>
      )}
      {state === "done" && (
        <span className="absolute right-1.5 top-1.5 grid h-[18px] w-[18px] place-items-center rounded-full bg-[#6366F1]/15 text-[#818cf8]">
          <Check size={11} strokeWidth={3} />
        </span>
      )}

      {/* Ports */}
      {placed && input && <span className="absolute -left-[5px] top-1/2 -mt-[5px] h-2.5 w-2.5 rounded-full border-2 border-fg-6 bg-panel" />}
      {placed && output && (
        <span
          className={`absolute -right-[5px] top-1/2 -mt-[5px] h-2.5 w-2.5 rounded-full border-2 border-panel transition-colors duration-300 ${
            state === "pending" ? "bg-fg-6" : "bg-[#6366F1]"
          }`}
        />
      )}
    </div>
  );
}

/** A connection: grey until the run reaches it, flowing while its target runs, solid once done. */
function Wire({ from, to, state }: { from: [number, number]; to: [number, number]; state: State }) {
  const [sx, sy] = from;
  const [tx, ty] = to;
  const bend = (tx - sx) * 0.5;
  const tip = tx - 6;
  return (
    <g
      className={`transition-colors duration-300 ${state === "pending" ? "text-fg-6" : "text-[#6366F1]"}`}
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d={`M${sx} ${sy} C${sx + bend} ${sy} ${tx - bend} ${ty} ${tip} ${ty}`}
        strokeWidth={state === "pending" ? 1.4 : 1.8}
        className={state === "running" ? "story-flow" : undefined}
      />
      <path d={`M${tip - 6} ${ty - 4} L${tip} ${ty} L${tip - 6} ${ty + 4}`} strokeWidth={1.6} />
    </g>
  );
}

export default function FinishedPipeline({
  chain,
  outputs,
  shown,
}: {
  /** The steps every document takes, in order. */
  chain: PipeNode[];
  /** Where the result goes: all of them at once, after the last step. */
  outputs: PipeNode[];
  shown: boolean;
}) {
  const reduced = useReducedMotion() ?? false;
  // The run: step n means the nth stage is running and the ones before are done.
  const stages = chain.length + (outputs.length ? 1 : 0);
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!shown) return;
    const timers: number[] = [];
    if (reduced) {
      timers.push(window.setTimeout(() => setStep(stages), 0));
    } else {
      timers.push(window.setTimeout(() => setStep(0), 0));
      for (let i = 1; i <= stages; i++) timers.push(window.setTimeout(() => setStep(i), 500 + i * 620));
    }
    return () => timers.forEach(clearTimeout);
  }, [shown, reduced, stages]);

  const stateOf = (stage: number): State => (step > stage ? "done" : step === stage ? "running" : "pending");
  const finished = step >= stages;

  const rows = Math.max(1, outputs.length);
  const height = rows * ROW - 14;
  const width = chain.length * COL + (outputs.length ? W : -66);
  const midY = (height - H) / 2;
  const chainXY = (i: number): [number, number] => [i * COL, midY];
  const outXY = (k: number): [number, number] => [chain.length * COL, k * ROW];

  return (
    <>
      {/* Tablet and up: the canvas */}
      <Fit width={width + PAD * 2 + 2} max={1.15} shrink className="mb-8 hidden md:block">
        <div className="overflow-hidden rounded-2xl border border-tint/10 bg-panel/55 text-left shadow-(--shadow-card)">
          {/* The canvas's bar: which pipeline, which execution, how it went */}
          <div className="flex items-center justify-between gap-3 border-b border-tint/10 bg-tint/[0.03] px-4 py-2.5">
            <span className="flex min-w-0 items-center gap-2.5">
              <Route size={15} className="shrink-0 text-fg-4" />
              <span className="truncate text-[13px] font-semibold text-fg">Supplier invoices pipeline</span>
              <span className="hidden shrink-0 font-mono text-[11px] text-fg-5 lg:inline">Execution #4128</span>
            </span>
            <span
              className={`flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.1em] transition-colors duration-300 ${
                finished ? "border-[#6366F1]/35 text-[#818cf8]" : "border-tint/15 text-fg-4"
              }`}
            >
              {finished ? <Check size={11} strokeWidth={3} /> : <Loader2 size={11} strokeWidth={3} className="animate-spin" />}
              {finished ? "Completed" : "Running"}
            </span>
          </div>

          <div
            className="relative [background-image:radial-gradient(circle,var(--tint-12)_1px,transparent_1.2px)] [background-size:24px_24px]"
            style={{ padding: PAD, paddingBottom: PAD + 34 }}
            aria-hidden="true"
          >
            <div className="relative" style={{ width, height }}>
              <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="absolute inset-0 overflow-visible">
                {chain.slice(1).map((_, i) => (
                  <Wire
                    key={i}
                    from={[chainXY(i)[0] + W, midY + H / 2]}
                    to={[chainXY(i + 1)[0], midY + H / 2]}
                    state={stateOf(i + 1)}
                  />
                ))}
                {outputs.map((_, k) => (
                  <Wire
                    key={`o${k}`}
                    from={[chainXY(chain.length - 1)[0] + W, midY + H / 2]}
                    to={[outXY(k)[0], outXY(k)[1] + H / 2]}
                    state={stateOf(chain.length)}
                  />
                ))}
              </svg>
              {chain.map((node, i) => (
                <Node key={node.kind + node.title} node={node} state={stateOf(i)} x={chainXY(i)[0]} y={midY} input={i > 0} output={i < chain.length - 1 || outputs.length > 0} />
              ))}
              {outputs.map((node, k) => (
                <Node key={node.kind + node.title} node={node} state={stateOf(chain.length)} x={outXY(k)[0]} y={outXY(k)[1]} output={false} />
              ))}
            </div>

            {/* The canvas's zoom control, as in the product (not wired here) */}
            <div className="absolute bottom-3 right-3 flex items-center gap-0.5 rounded-lg border border-tint/10 bg-panel/90 p-1 text-fg-5">
              <span className="grid h-6 w-6 place-items-center">
                <Minus size={12} />
              </span>
              <span className="w-9 text-center font-mono text-[10px]">100%</span>
              <span className="grid h-6 w-6 place-items-center">
                <Plus size={12} />
              </span>
              <span className="mx-0.5 h-3.5 w-px bg-tint/15" />
              <span className="grid h-6 w-6 place-items-center">
                <Maximize size={12} />
              </span>
            </div>
          </div>
        </div>
      </Fit>

      {/* Phones: the same nodes, in the order the document meets them */}
      <ol className="mb-8 space-y-2 text-left md:hidden">
        {[...chain, ...outputs].map((node) => (
          <li key={node.kind + node.title}>
            <Node node={node} state="done" />
          </li>
        ))}
      </ol>
    </>
  );
}
