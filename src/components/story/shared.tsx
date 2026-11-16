"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { animate, motion, useMotionTemplate, useMotionValue, useReducedMotion, useTransform, type MotionValue } from "framer-motion";
import type { LucideIcon } from "lucide-react";

/** A 0 → 1 playhead. Every moving part of a scene is derived from one. */
export type P = MotionValue<number>;

export const EASE_OUT = [0.23, 1, 0.32, 1] as const;

/** 0 before `from`, 1 after `to`, linear in between. */
export function ramp(v: number, from: number, to: number) {
  return Math.min(1, Math.max(0, (v - from) / (to - from)));
}

export function useMedia(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const m = window.matchMedia(query);
      m.addEventListener("change", onChange);
      return () => m.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}

/**
 * A scene's playhead when the scene has options. It follows the tour's clock
 * until the visitor picks an option; from then on the scene plays itself from
 * the start, so a click always shows the whole animation of what was chosen.
 */
export function usePlayhead(p: P, choice: string): P {
  const reduced = useReducedMotion() ?? false;
  const own = useMotionValue(0);
  const taken = useRef(false);
  const last = useRef(choice);
  useEffect(() => {
    if (last.current === choice) return;
    last.current = choice;
    taken.current = true;
    if (reduced) {
      own.set(1);
      return;
    }
    own.set(0);
    const play = animate(own, 1, { duration: 2.4, ease: "linear" });
    return () => play.stop();
  }, [choice, own, reduced]);
  return useTransform(() => {
    // Read both so the value stays subscribed to whichever is in charge.
    const mine = own.get();
    const tour = p.get();
    return taken.current ? mine : tour;
  });
}

/**
 * 1 while `on`, 0 while not, eased. For parts the visitor switches on and
 * off: combined with the playhead by taking the smaller of the two.
 */
export function useGate(on: boolean): P {
  const gate = useMotionValue(on ? 1 : 0);
  useEffect(() => {
    const move = animate(gate, on ? 1 : 0, { duration: 0.45, ease: EASE_OUT });
    return () => move.stop();
  }, [on, gate]);
  return gate;
}

export function Panel({
  title,
  right,
  children,
  className = "",
}: {
  title: string;
  right?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-xl border border-tint/10 bg-panel/85 text-left shadow-(--shadow-card) backdrop-blur ${className}`}>
      {/* A lit top edge: the panel catches the brand's light. */}
      <span className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#6c8cff]/55 to-transparent" aria-hidden />
      <div className="flex items-center justify-between gap-3 border-b border-tint/10 bg-tint/[0.04] px-3.5 py-2">
        <span className="truncate text-[10px] font-semibold uppercase tracking-[0.16em] text-fg-5">{title}</span>
        {right}
      </div>
      {children}
    </div>
  );
}

/**
 * How much bigger than its layout size an element is drawn (1 unless an
 * ancestor scales it, as <Fit> does). Pointer and rectangle maths are in
 * screen pixels; anything positioned inside the element is in layout
 * pixels: divide by this to go from one to the other.
 */
export function drawnScale(el: HTMLElement) {
  const layout = el.offsetWidth;
  return layout ? el.getBoundingClientRect().width / layout : 1;
}

/**
 * Draws its content at a fixed design width and scales it up to fill the
 * space it is given, up to `max`. On a wide monitor the mock-ups would
 * otherwise sit at laptop size in a sea of margin; their type is set in
 * pixels, so growing the box alone would not grow them.
 *
 * When there is no more room than the design width (phones, small
 * laptops) it does nothing and the content flows as usual; unless `shrink`
 * is set, for content that cannot reflow (a diagram): then it is scaled
 * down to fit instead of overflowing.
 */
export function Fit({
  width,
  max = 1.5,
  shrink = false,
  children,
  className = "",
}: {
  width: number;
  max?: number;
  shrink?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState<{ scale: number; height: number; left: number } | null>(null);

  useEffect(() => {
    const o = outer.current;
    const i = inner.current;
    if (!o || !i) return;
    const measure = () => {
      const room = o.clientWidth;
      const scale = room > width ? Math.min(max, room / width) : shrink && room > 0 ? room / width : 1;
      const next = scale !== 1 ? { scale, height: i.offsetHeight * scale, left: (room - width * scale) / 2 } : null;
      setBox((prev) =>
        prev?.scale === next?.scale && prev?.height === next?.height && prev?.left === next?.left ? prev : next
      );
    };
    const ro = new ResizeObserver(measure);
    ro.observe(o);
    ro.observe(i);
    return () => ro.disconnect();
  }, [width, max, shrink]);

  return (
    <div ref={outer} className={className} style={box ? { height: box.height } : undefined}>
      <div
        ref={inner}
        className={box ? "" : "mx-auto"}
        style={
          box
            ? { width, marginLeft: box.left, transform: `scale(${box.scale})`, transformOrigin: "top left" }
            : { maxWidth: width }
        }
      >
        {children}
      </div>
    </div>
  );
}

/** Text that appears as if typed: revealed left to right as `t` goes from → to. */
export function Typed({
  t,
  from,
  to,
  children,
  className = "",
}: {
  t: P;
  from: number;
  to: number;
  children: React.ReactNode;
  className?: string;
}) {
  const hidden = useTransform(t, (v) => (1 - ramp(v, from, to)) * 100);
  const clipPath = useMotionTemplate`inset(0 ${hidden}% 0 0)`;
  return (
    <motion.span className={`inline-block whitespace-nowrap ${className}`} style={{ clipPath }}>
      {children}
    </motion.span>
  );
}

/**
 * Sends a value across the stage: a chip that leaves `from`, arcs over and
 * lands on `to` (both measured, so it holds at any width). Web Animations
 * API, transform and opacity only. Returns the animation, or null when
 * either end is not laid out.
 */
export function flyChip(layer: HTMLElement, from: Element, to: Element, text: string, onLand: () => void): Animation | null {
  const box = layer.getBoundingClientRect();
  const s = from.getBoundingClientRect();
  const d = to.getBoundingClientRect();
  if (!s.width || !d.width) return null;
  // Rectangles are in screen pixels; the chip is placed in the layer's own.
  const k = drawnScale(layer);
  const sx = (s.left - box.left + s.width / 2) / k;
  const sy = (s.top - box.top + s.height / 2) / k;
  const tx = (d.left - box.left + d.width / 2) / k;
  const ty = (d.top - box.top + d.height / 2) / k;
  const sideways = Math.abs(tx - sx) > Math.abs(ty - sy);
  const mx = (sx + tx) / 2 + (sideways ? 0 : 40);
  const my = (sy + ty) / 2 - (sideways ? 34 : 0);
  const chip = document.createElement("div");
  chip.className = "hero-chip";
  chip.textContent = text;
  layer.appendChild(chip);
  const at = (x: number, y: number, scale: number) => `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale})`;
  const flight = chip.animate(
    [
      { transform: at(sx, sy, 0.9), opacity: 0 },
      { transform: at(sx, sy, 1), opacity: 1, offset: 0.14 },
      { transform: at(mx, my, 1.06), opacity: 1, offset: 0.56 },
      { transform: at(tx, ty, 1), opacity: 1, offset: 0.92 },
      { transform: at(tx, ty, 1), opacity: 0 },
    ],
    { duration: 720, easing: "cubic-bezier(0.45, 0.05, 0.25, 1)", fill: "forwards" }
  );
  flight.onfinish = () => {
    chip.remove();
    onLand();
  };
  return flight;
}

/** The options of a scene: a row of pills, one pressed. */
export function Choices<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly { id: T; label: string; icon: LucideIcon }[];
  value: T;
  onChange: (id: T) => void;
}) {
  return (
    <div className="mb-3 flex flex-wrap items-center gap-1.5" role="group" aria-label={label}>
      <span className="mr-1 text-[11px] font-medium text-fg-5">{label}</span>
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          aria-pressed={o.id === value}
          onClick={() => onChange(o.id)}
          className={`press flex cursor-pointer items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11.5px] font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]/50 ${
            o.id === value
              ? "border-[#3b82f6]/45 bg-[#3b82f6]/10 text-fg"
              : "border-tint/10 text-fg-4 hover:border-tint/25 hover:text-fg-2"
          }`}
        >
          <o.icon size={12} />
          {o.label}
        </button>
      ))}
    </div>
  );
}

/** An on/off switch. Quiet on purpose: one flat colour, no gradient. */
export function Switch({ on, onToggle, label }: { on: boolean; onToggle: () => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onToggle}
      className={`relative h-[18px] w-[32px] shrink-0 cursor-pointer rounded-full transition-colors duration-200 before:absolute before:-inset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]/50 ${
        on ? "bg-accent" : "bg-tint/20"
      }`}
    >
      <span
        className={`absolute left-[2px] top-[2px] h-[14px] w-[14px] rounded-full bg-white shadow-sm transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          on ? "translate-x-[14px]" : "translate-x-0"
        }`}
      />
    </button>
  );
}

/**
 * Frame for the stops that keep the record on the right (extract, clean,
 * review): same columns and same height in all three, so the record stays
 * exactly where it was while the panel beside it changes.
 */
export const RECORD_FRAME = "grid items-start gap-4 sm:h-[336px] sm:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]";

/** The document as a small sheet of paper: the story's protagonist. */
export function DocToken({ className = "" }: { className?: string }) {
  return (
    <span
      className={`block h-[28px] w-[22px] rounded-[3px] bg-[#fdfcf8] p-[3px] shadow-[0_4px_12px_-4px_rgba(16,24,40,0.55)] ring-1 ring-black/10 ${className}`}
      aria-hidden="true"
    >
      <span className="block h-[2px] w-[9px] rounded bg-[#1c2321]/70" />
      <span className="mt-[3px] block h-[1.5px] rounded bg-[#1c2321]/25" />
      <span className="mt-[2px] block h-[1.5px] rounded bg-[#1c2321]/25" />
      <span className="mt-[2px] block h-[1.5px] w-[10px] rounded bg-[#1c2321]/25" />
      <span className="mt-[3px] block h-[2px] w-[7px] rounded bg-[#3b82f6]/80" />
    </span>
  );
}

/* What the visitor has chosen along the way. */

export const SOURCES = ["email", "upload", "api", "mcp"] as const;
export type SourceId = (typeof SOURCES)[number];

export type Story = {
  source: SourceId;
  setSource: (id: SourceId) => void;
  /** Cleaner rules switched off. */
  rulesOff: ReadonlySet<string>;
  toggleRule: (id: string) => void;
  /** Destinations switched on. */
  outputs: ReadonlySet<string>;
  toggleOutput: (id: string) => void;
  /** The visitor is exploring this stop: the tour waits for them. */
  touch: () => void;
};

export type SceneProps = { p: P; story: Story };
