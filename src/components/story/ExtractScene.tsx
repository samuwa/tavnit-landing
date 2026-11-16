"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useMotionValueEvent, useReducedMotion, useSpring } from "framer-motion";
import InvoiceSheet from "./InvoiceSheet";
import Record, { READ_ORDER, RecordBadge } from "./Record";
import { drawnScale, flyChip, RECORD_FRAME, type SceneProps } from "./shared";

/**
 * Stop 3: a lens over the paper shows the data Tavnit reads in it, and each
 * value it reads leaves the page and flies into the record (the same motion
 * as the hero, so the two say the same thing). Left to itself the lens
 * sweeps down the page; under the cursor it goes where the visitor points,
 * and whatever it passes over is extracted on the spot.
 */

const LENS = 72;

export default function ExtractScene({ p, story }: SceneProps) {
  const sheet = useRef<HTMLDivElement>(null);
  const w = useMotionValue(320);
  const h = useMotionValue(300);
  const hovering = useRef(false);
  // Where the lens is heading; the springs below follow.
  const tx = useMotionValue(110);
  const ty = useMotionValue(40);
  const reduced = useReducedMotion() ?? false;
  const frame = useRef<HTMLDivElement>(null);
  const layer = useRef<HTMLDivElement>(null);
  // Values on their way, and values that have landed in the record.
  const launched = useRef(new Set<string>());
  const flights = useRef<Animation[]>([]);
  const [landed, setLanded] = useState<ReadonlySet<string>>(() => new Set());

  const land = useCallback((name: string) => setLanded((prev) => (prev.has(name) ? prev : new Set(prev).add(name))), []);
  /** Read one value: it leaves the paper and lands on its row. */
  const read = useCallback(
    (name: string) => {
      if (launched.current.has(name)) return;
      launched.current.add(name);
      const from = sheet.current?.querySelector(`[data-k="${name}"]`);
      const to = frame.current?.querySelector(`[data-field="${name}"]`);
      const text = READ_ORDER.find((f) => f.name === name)?.text ?? "";
      const flight = !reduced && layer.current && from && to ? flyChip(layer.current, from, to, text, () => land(name)) : null;
      if (flight) flights.current.push(flight);
      else land(name);
    },
    [reduced, land]
  );

  useMotionValueEvent(p, "change", (v) => {
    if (v === 0) {
      // The stop is starting over: an empty record again.
      flights.current.forEach((f) => f.cancel());
      flights.current = [];
      layer.current?.replaceChildren();
      launched.current.clear();
      setLanded((prev) => (prev.size ? new Set() : prev));
      return;
    }
    for (const f of READ_ORDER) if (v >= f.at) read(f.name);
  });
  useEffect(() => () => flights.current.forEach((f) => f.cancel()), []);

  useEffect(() => {
    const el = sheet.current;
    if (!el) return;
    const sweep = () => {
      if (hovering.current) return;
      const v = p.get();
      tx.set(w.get() * (0.5 + 0.27 * Math.sin(v * Math.PI * 3 - 0.9)));
      ty.set(h.get() * (0.1 + 0.82 * v));
    };
    const ro = new ResizeObserver(([entry]) => {
      w.set(entry.contentRect.width);
      h.set(entry.contentRect.height);
      sweep();
    });
    ro.observe(el);
    sweep();
    const stop = p.on("change", sweep);
    const onLeave = () => {
      hovering.current = false;
      sweep();
    };
    el.addEventListener("pointerleave", onLeave);
    return () => {
      ro.disconnect();
      stop();
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [p, w, h, tx, ty]);

  const x = useSpring(tx, { stiffness: 240, damping: 28, mass: 0.6 });
  const y = useSpring(ty, { stiffness: 240, damping: 28, mass: 0.6 });
  const clipPath = useMotionTemplate`circle(${LENS}px at ${x}px ${y}px)`;

  return (
    <div ref={frame} className={`relative ${RECORD_FRAME}`}>
      <div>
        <div
          ref={sheet}
          onPointerMove={(e) => {
            if (e.pointerType !== "mouse") return;
            const r = e.currentTarget.getBoundingClientRect();
            // The sheet may be drawn larger than it is laid out (see <Fit>).
            const k = drawnScale(e.currentTarget);
            hovering.current = true;
            tx.set((e.clientX - r.left) / k);
            ty.set((e.clientY - r.top) / k);
            // Anything under the lens is read.
            const found: string[] = [];
            e.currentTarget.querySelectorAll<HTMLElement>("[data-k]").forEach((el) => {
              const b = el.getBoundingClientRect();
              const dx = Math.max(b.left - e.clientX, 0, e.clientX - b.right);
              const dy = Math.max(b.top - e.clientY, 0, e.clientY - b.bottom);
              if (dx * dx + dy * dy < (LENS * 0.8 * k) ** 2) found.push(el.dataset.k!);
            });
            if (found.some((k) => !launched.current.has(k))) {
              found.forEach(read);
              story.touch();
            }
          }}
          className="relative cursor-none overflow-hidden rounded-xl shadow-[0_1px_2px_rgba(16,24,40,0.08),0_24px_50px_-22px_rgba(16,24,40,0.55)] ring-1 ring-black/[0.06]"
          aria-hidden="true"
        >
          <InvoiceSheet />
          <motion.div className="absolute inset-0" style={{ clipPath }}>
            <InvoiceSheet data />
          </motion.div>
          <motion.div
            className="pointer-events-none absolute left-0 top-0 rounded-full shadow-(--lens-rim)"
            style={{ x, y, width: LENS * 2, height: LENS * 2, marginLeft: -LENS, marginTop: -LENS }}
          />
        </div>
      </div>

      <Record
        p={p}
        mode="extract"
        landed={landed}
        rulesOff={story.rulesOff}
        badge={<RecordBadge tone={landed.size >= READ_ORDER.length ? "ok" : "busy"}>{landed.size >= READ_ORDER.length ? "6 fields" : "Reading"}</RecordBadge>}
      />

      {/* Values in flight */}
      <div ref={layer} className="pointer-events-none absolute inset-0 z-10" aria-hidden />
    </div>
  );
}
