"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { drawnScale } from "@/components/story/shared";

/**
 * The hero's picture of the product: a deck of real documents on the left,
 * what Tavnit returns on the right.
 *
 * It keeps what the first version did well (values lifting off the page and
 * flying into the table) and replaces what made it anonymous: the grey bars.
 * Each cycle the top document is scanned, the values it holds fly across as
 * legible chips and land where they belong, then the sheet is dealt to the
 * back and the next kind of document comes up, with its own schema.
 *
 * The three documents show the three shapes a flow's schema takes:
 *   invoice       metadata fields plus a table field: every line of the
 *                 invoice becomes a row
 *   packing list  a composite field: a cell printed as "S:20 M:50 L:30"
 *                 lands whole, then splits into size / quantity pairs
 *   receipt       metadata fields only
 * No confidence scores here: at this size they were noise next to the
 * values. (The product story further down is where a low score matters.)
 *
 * The visitor can take part: the deck leans toward the cursor (a spring, so
 * it has weight), and the tabs under it pick which document goes next.
 *
 * Papers are white with ink in both themes: they are documents, not UI.
 * Flying chips are plain DOM nodes moved with the Web Animations API
 * (transform and opacity only), measured from the real source and target
 * rectangles so the path holds at any width. The loop stops while the hero
 * is off screen. With reduced motion: the first document, already read.
 */

/** A place on the sheet a value is read from. */
type Src = "issuer" | "meta0" | "meta1" | "total" | `line${number}`;

type Field = { name: string; value: string; from: Src; last?: boolean };
type Row = {
  from: Src;
  text: string;
  /** Second column, for an ordinary table field. */
  value?: string;
  /** Composite field: the cell as printed, and the pairs it splits into. */
  raw?: string;
  parts?: [string, string][];
};

type Doc = {
  id: string;
  title: string;
  issuer: string;
  meta: [string, string][];
  cols: [string, string];
  lines: [string, string][];
  totalLabel: string;
  total: string;
  /** Metadata fields: one value per document. `last` = read after the table. */
  fields: Field[];
  /** A table field: one row per line on the document. */
  table?: { name: string; cols: [string, string]; composite?: boolean; rows: Row[] };
};

const DOCS: Doc[] = [
  {
    id: "invoice",
    title: "Rechnung · Invoice",
    issuer: "Northwind Freight GmbH",
    meta: [
      ["Nr.", "NW-2026-0412"],
      ["Datum", "11.04.2026"],
    ],
    cols: ["Beschreibung", "Betrag"],
    lines: [
      ["Seefracht HAM–NYC", "2.480,00"],
      ["Zollabfertigung", "185,00"],
      ["Containerumschlag", "620,00"],
    ],
    totalLabel: "Gesamt EUR",
    total: "3.285,00",
    fields: [
      { name: "vendor", value: "Northwind Freight GmbH", from: "issuer" },
      { name: "invoice_no", value: "NW-2026-0412", from: "meta0" },
      { name: "total_eur", value: "3285.00", from: "total", last: true },
    ],
    table: {
      name: "line_items",
      cols: ["description", "amount"],
      rows: [
        { from: "line0", text: "Seefracht HAM–NYC", value: "2480.00" },
        { from: "line1", text: "Zollabfertigung", value: "185.00" },
        { from: "line2", text: "Containerumschlag", value: "620.00" },
      ],
    },
  },
  {
    id: "packing",
    title: "Packing list",
    issuer: "Andes Textiles S.A.",
    meta: [
      ["PL", "PL-7731"],
      ["Date", "03/05/2026"],
    ],
    cols: ["Goods", "Sizes"],
    lines: [
      ["Cotton T-shirt", "S:20 M:50 L:30"],
      ["Zip hoodie", "M:12 L:18"],
      ["Rain jacket", "S:8 M:14"],
    ],
    totalLabel: "Gross weight",
    total: "1,284 kg",
    fields: [
      { name: "shipper", value: "Andes Textiles S.A.", from: "issuer" },
      { name: "packing_list_no", value: "PL-7731", from: "meta0" },
      { name: "gross_weight_kg", value: "1284", from: "total", last: true },
    ],
    table: {
      name: "items",
      cols: ["item", "size · quantity"],
      composite: true,
      rows: [
        { from: "line0", text: "Cotton T-shirt", raw: "S:20 M:50 L:30", parts: [["S", "20"], ["M", "50"], ["L", "30"]] },
        { from: "line1", text: "Zip hoodie", raw: "M:12 L:18", parts: [["M", "12"], ["L", "18"]] },
        { from: "line2", text: "Rain jacket", raw: "S:8 M:14", parts: [["S", "8"], ["M", "14"]] },
      ],
    },
  },
  {
    id: "receipt",
    title: "Receipt",
    issuer: "Café Lumen",
    meta: [
      ["#", "004512"],
      ["Date", "14 May 2026"],
    ],
    cols: ["Item", "USD"],
    lines: [
      ["Flat white ×2", "9.00"],
      ["Avocado toast", "11.50"],
      ["Tip", "3.00"],
    ],
    totalLabel: "Total USD",
    total: "23.50",
    fields: [
      { name: "merchant", value: "Café Lumen", from: "issuer" },
      { name: "receipt_no", value: "004512", from: "meta0" },
      { name: "date", value: "2026-05-14", from: "meta1" },
      { name: "tip_usd", value: "3.00", from: "line2" },
      { name: "total_usd", value: "23.50", from: "total" },
    ],
  },
];

/** The order values leave the sheet: top to bottom, as the scan passes. */
function flightsOf(doc: Doc) {
  const field = (f: Field) => ({ key: f.name, from: f.from, chip: f.value });
  return [
    ...doc.fields.filter((f) => !f.last).map(field),
    ...(doc.table?.rows ?? []).map((r, i) => ({ key: `row${i}`, from: r.from, chip: r.raw ?? r.text })),
    ...doc.fields.filter((f) => f.last).map(field),
  ];
}

const COPY = {
  en: {
    extracted: "Extracted fields",
    reading: "Reading",
    table: "table",
    composite: "composite field",
    summary: {
      invoice: "3 fields · 3 rows",
      packing: "3 fields · 3 rows",
      receipt: "5 fields",
    } as Record<string, string>,
    tabs: { invoice: "Invoice", packing: "Packing list", receipt: "Receipt" } as Record<string, string>,
    pick: "Choose a document",
  },
  es: {
    extracted: "Campos extraídos",
    reading: "Leyendo",
    table: "tabla",
    composite: "campo compuesto",
    summary: {
      invoice: "3 campos · 3 filas",
      packing: "3 campos · 3 filas",
      receipt: "5 campos",
    } as Record<string, string>,
    tabs: { invoice: "Factura", packing: "Lista de empaque", receipt: "Recibo" } as Record<string, string>,
    pick: "Elige un documento",
  },
} as const;

const SCAN_AT = 450;
const FIRST_FLIGHT = 750;
/** One value leaves at a time: the next starts as the last one lands. */
const FLIGHT_GAP = 560;
const FLIGHT_MS = 1000;
/** When, in a flight, the value appears in its row (under the landing chip). */
const LAND_AT = 0.8;
const HOLD_MS = 2600;
const DEAL_MS = 420;

/** Where a sheet sits by its place in the deck (0 = on top). */
const PLACE = [
  "translate3d(0,0,0) rotate(-1deg)",
  "translate3d(18px,-12px,0) rotate(3.5deg) scale(0.97)",
  "translate3d(-16px,-20px,0) rotate(-5deg) scale(0.94)",
];
const DEALT = "translate3d(-58%,5%,0) rotate(-15deg) scale(0.96)";

function Sheet({
  doc,
  place,
  leaving,
  read,
  scanning,
}: {
  doc: Doc;
  place: number;
  leaving: boolean;
  read: number;
  scanning: boolean;
}) {
  const top = place === 0 && !leaving;
  const flights = flightsOf(doc);
  const isRead = (src: Src) => top && flights.slice(0, read).some((f) => f.from === src);
  const mark = (src: Src) =>
    `-mx-1 rounded-[3px] px-1 transition-[background-color,box-shadow] duration-300 ${
      isRead(src) ? "bg-[#3b82f6]/15 shadow-[inset_0_0_0_1px_rgba(59,130,246,0.6)]" : ""
    }`;

  return (
    <div
      data-top={top ? "1" : undefined}
      className="absolute inset-0 overflow-hidden rounded-xl bg-[#fdfcf8] p-3.5 text-left text-[#1c2321] shadow-[0_1px_2px_rgba(16,24,40,0.08),0_18px_40px_-18px_rgba(16,24,40,0.45)] ring-1 ring-black/[0.06] transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] sm:p-4"
      style={{ transform: leaving ? DEALT : PLACE[place], zIndex: leaving ? 4 : 3 - place }}
    >
      {/* Scan: one pass down the sheet on top */}
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-transparent via-[#3b82f6]/25 to-transparent transition-[transform,opacity] ease-linear ${
          top && scanning ? "translate-y-[260px] opacity-100 duration-[1900ms]" : "-translate-y-14 opacity-0 duration-0"
        }`}
      />

      <div className="flex items-start justify-between gap-3 border-b border-[#e4e7e2] pb-2.5">
        <div className="min-w-0">
          <div className="text-[8.5px] font-semibold uppercase tracking-[0.16em] text-[#6b7672]">{doc.title}</div>
          {/* -mx-1 px-1: the highlight reaches 4px past the text on each side,
              and truncate clips at the padding box, so the container is
              widened by the same amount (it used to cut the box's sides). */}
          <div className="-mx-1 mt-0.5 truncate px-1 py-px text-[13px] font-bold">
            <span data-src="issuer" className={mark("issuer")}>
              {doc.issuer}
            </span>
          </div>
        </div>
        <div className="shrink-0 text-right font-mono text-[10px] leading-[1.65] text-[#6b7672]">
          {doc.meta.map(([label, value], i) => (
            <div key={label}>
              {label}{" "}
              <span data-src={`meta${i}`} className={`${mark(`meta${i}` as Src)} text-[#1c2321]`}>
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Lines: left out on phones, where the sheet is shorter */}
      <div className="mt-2 hidden sm:block">
        <div className="flex justify-between px-1.5 py-1 text-[8.5px] font-semibold uppercase tracking-[0.1em] text-[#6b7672]">
          <span>{doc.cols[0]}</span>
          <span>{doc.cols[1]}</span>
        </div>
        {doc.lines.map(([what, amount], i) => (
          <div
            key={what}
            data-src={`line${i}`}
            className={`flex justify-between gap-2 border-t border-[#eceee9] px-1.5 py-[5px] text-[10.5px] transition-[background-color,box-shadow] duration-300 ${
              isRead(`line${i}`) ? "rounded-[3px] bg-[#3b82f6]/15 shadow-[inset_0_0_0_1px_rgba(59,130,246,0.6)]" : ""
            }`}
          >
            <span className="truncate">{what}</span>
            <span className="shrink-0 font-mono">{amount}</span>
          </div>
        ))}
      </div>

      <div className="mt-2 flex items-center justify-between border-t border-[#e4e7e2] pt-2 text-[11.5px] sm:mt-2.5">
        <span className="font-semibold text-[#4b5753]">{doc.totalLabel}</span>
        <span className="font-mono font-bold">
          <span data-src="total" className={mark("total")}>
            {doc.total}
          </span>
        </span>
      </div>
    </div>
  );
}

const easeInOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);

/**
 * One value travelling from the paper to its row.
 *
 * Three beats: it lifts off the page (a small rise and a scale-up, as if
 * picked up), travels on a curve, and settles onto its row while the row's
 * own text fades in under it.
 *
 * The curve is sampled into keyframes (with linear timing between them, and
 * the easing applied while sampling) because a Web Animation moves in
 * straight lines between keyframes: the earlier version had three, and the
 * chip visibly turned a corner at the top of its arc. Transform and opacity
 * only, so it stays on the compositor.
 */
function flyValue(layer: HTMLElement, from: [number, number], to: [number, number], text: string, duration: number) {
  const [sx, sy] = from;
  const [tx, ty] = to;
  const lift = 7;
  const start: [number, number] = [sx, sy - lift];
  // Over the top when travelling sideways; a bow to the right when the table
  // sits below the deck (phones).
  const sideways = Math.abs(tx - sx) > Math.abs(ty - sy);
  const control: [number, number] = sideways
    ? [(sx + tx) / 2, Math.min(sy, ty) - 46]
    : [Math.max(sx, tx) + 56, (sy + ty) / 2];
  const at = (u: number): [number, number] => {
    const a = (1 - u) * (1 - u);
    const b = 2 * (1 - u) * u;
    const c = u * u;
    return [a * start[0] + b * control[0] + c * tx, a * start[1] + b * control[1] + c * ty];
  };

  const LIFT = 0.16;
  const SETTLE = 0.82;

  const chip = document.createElement("div");
  chip.className = "hero-chip";
  chip.textContent = text;

  layer.append(chip);

  const N = 36;
  const chipFrames: Keyframe[] = [];
  for (let j = 0; j <= N; j++) {
    const t = j / N;
    let x = sx;
    let y = sy;
    let scale = 1;
    let opacity = 1;
    let u = 0;
    if (t <= LIFT) {
      const k = easeOut(t / LIFT);
      y = sy - lift * k;
      scale = 0.88 + 0.18 * k;
      opacity = k;
    } else if (t <= SETTLE) {
      u = easeInOut((t - LIFT) / (SETTLE - LIFT));
      [x, y] = at(u);
      scale = 1.06 - 0.06 * u;
    } else {
      const k = easeOut((t - SETTLE) / (1 - SETTLE));
      u = 1;
      x = tx;
      y = ty;
      scale = 1 - 0.06 * k;
      opacity = 1 - k;
    }
    chipFrames.push({
      offset: t,
      opacity,
      transform: `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale})`,
    });
  }
  const timing: KeyframeAnimationOptions = { duration, easing: "linear", fill: "forwards" };
  const anims = [chip.animate(chipFrames, timing)];
  anims[0].onfinish = () => chip.remove();
  return { anims };
}

export default function HeroAnimation({ locale = "en" }: { locale?: keyof typeof COPY }) {
  const t = COPY[locale];
  const stageRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;
  const inView = useInView(stageRef, { amount: 0.3 });

  // order[0] is the document on top of the deck.
  const [order, setOrder] = useState([0, 1, 2]);
  const [leaving, setLeaving] = useState<number | null>(null);
  const [read, setRead] = useState(0);
  const [filled, setFilled] = useState(0);
  const [scanning, setScanning] = useState(false);
  // Bumped when the visitor picks a document, to restart the cycle.
  const [turn, setTurn] = useState(0);

  const topIndex = order[0];
  const doc = DOCS[topIndex];
  const running = inView && !reduced;

  // The deck leans toward the cursor. Decorative, so a spring: it has weight.
  const tiltX = useSpring(useMotionValue(0), { stiffness: 140, damping: 18 });
  const tiltY = useSpring(useMotionValue(0), { stiffness: 140, damping: 18 });
  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.pointerType !== "mouse" || reduced) return;
      const r = e.currentTarget.getBoundingClientRect();
      tiltY.set(((e.clientX - r.left) / r.width - 0.5) * 9);
      tiltX.set(-((e.clientY - r.top) / r.height - 0.5) * 7);
    },
    [reduced, tiltX, tiltY]
  );
  const onPointerLeave = useCallback(() => {
    tiltX.set(0);
    tiltY.set(0);
  }, [tiltX, tiltY]);

  useEffect(() => {
    if (!running) return;
    const stage = stageRef.current;
    const layer = layerRef.current;
    if (!stage || !layer) return;

    const timers: number[] = [];
    const anims: Animation[] = [];
    const later = (fn: () => void, ms: number) => timers.push(window.setTimeout(fn, ms));
    const flights = flightsOf(DOCS[topIndex]);

    /** One value leaves the sheet and lands where it belongs. */
    const fly = (i: number) => {
      const sheet = stage.querySelector<HTMLElement>('[data-top="1"]');
      const source = sheet?.querySelector<HTMLElement>(`[data-src="${flights[i].from}"]`);
      // On phones the lines block is hidden: leave from the sheet itself.
      const from = source && source.offsetParent ? source : sheet;
      const to = stage.querySelector<HTMLElement>(`[data-dst="${flights[i].key}"]`);
      if (!from || !to) {
        setFilled((f) => Math.max(f, i + 1));
        return;
      }
      const w = stage.getBoundingClientRect();
      const s = from.getBoundingClientRect();
      const d = to.getBoundingClientRect();
      // Rectangles are in screen pixels; the chip is placed in the stage's
      // own, which differ when the stage is drawn scaled up (see <Fit>).
      const k = drawnScale(stage);
      const sx = (s.left - w.left + s.width / 2) / k;
      const sy = (s.top - w.top + s.height / 2) / k;
      const tx = (d.left - w.left + d.width / 2) / k;
      const ty = (d.top - w.top + d.height / 2) / k;
      const flight = flyValue(layer, [sx, sy], [tx, ty], flights[i].chip, FLIGHT_MS);
      anims.push(...flight.anims);
      // The value shows in its row while the chip is still settling on it,
      // so the hand-over is a cross-fade, not a blink.
      later(() => setFilled((f) => Math.max(f, i + 1)), FLIGHT_MS * LAND_AT);
    };

    later(() => {
      setRead(0);
      setFilled(0);
    }, 0);
    later(() => setScanning(true), SCAN_AT);
    for (let i = 0; i < flights.length; i++) {
      later(() => {
        setRead(i + 1);
        fly(i);
      }, FIRST_FLIGHT + i * FLIGHT_GAP);
    }
    const allLanded = FIRST_FLIGHT + (flights.length - 1) * FLIGHT_GAP + FLIGHT_MS;
    later(() => setScanning(false), allLanded);
    // Deal the sheet to the back and bring the next document up.
    later(() => {
      setLeaving(topIndex);
      later(() => {
        setLeaving(null);
        setRead(0);
        setFilled(0);
        setOrder((o) => [...o.slice(1), o[0]]);
      }, DEAL_MS);
    }, allLanded + HOLD_MS);

    return () => {
      timers.forEach(clearTimeout);
      anims.forEach((a) => a.cancel());
      layer.replaceChildren();
    };
  }, [running, topIndex, turn]);

  const pick = (index: number) => {
    if (index === topIndex && leaving === null) return;
    setLeaving(null);
    setScanning(false);
    setRead(0);
    setFilled(0);
    setOrder((o) => [index, ...o.filter((x) => x !== index)]);
    setTurn((n) => n + 1);
  };

  const keys = flightsOf(doc).map((f) => f.key);
  const shownRead = reduced ? keys.length : read;
  const shownFilled = reduced ? keys.length : filled;
  const done = shownFilled >= keys.length;
  const landed = (key: string) => shownFilled > keys.indexOf(key);
  const appear = (on: boolean) =>
    `transition-opacity duration-150 ease-out ${on ? "opacity-100" : "opacity-0"}`;

  const fieldRow = (f: Field) => (
    <div
      key={`${doc.id}-${f.name}`}
      className={`flex items-center justify-between gap-3 px-3.5 py-[5px] font-mono text-[11px] sm:py-[6px] sm:text-[11.5px] ${
        landed(f.name) && !reduced ? "story-flash" : ""
      }`}
    >
      <span className="shrink-0 text-accent/85">{f.name}</span>
      {/* Always laid out (invisible until it lands) so the chip can be
          aimed at exactly where the value will sit. */}
      <span data-dst={f.name} className={`truncate text-fg-2 ${appear(landed(f.name))}`}>
        {f.value}
      </span>
    </div>
  );

  return (
    <div
      ref={stageRef}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative mx-auto grid w-full max-w-[860px] grid-cols-1 items-center justify-center gap-3 md:grid-cols-[minmax(0,340px)_auto_minmax(0,380px)] md:gap-7"
    >
      {/* The deck */}
      <div className="mx-auto w-full max-w-[340px] pt-5">
        <motion.div
          className="relative h-[132px] sm:h-[246px]"
          style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 1100 }}
        >
          {DOCS.map((d, i) => (
            <Sheet
              key={d.id}
              doc={d}
              place={order.indexOf(i)}
              leaving={leaving === i}
              read={shownRead}
              scanning={scanning}
            />
          ))}
        </motion.div>

        <div className="mt-3 hidden justify-center gap-1.5 sm:flex" role="group" aria-label={t.pick}>
          {DOCS.map((d, i) => (
            <button
              key={d.id}
              type="button"
              tabIndex={-1}
              onClick={() => pick(i)}
              className={`press cursor-pointer rounded-full border px-2.5 py-1 text-[11px] font-medium ${
                i === topIndex
                  ? "border-[#3b82f6]/45 bg-[#3b82f6]/10 text-fg"
                  : "border-tint/10 text-fg-4 hover:border-tint/25 hover:text-fg-2"
              }`}
            >
              {t.tabs[d.id]}
            </button>
          ))}
        </div>
      </div>

      {/* Hand-off */}
      <div className="flex items-center justify-center text-accent">
        <ArrowRight size={20} strokeWidth={2} className="rotate-90 md:rotate-0" />
      </div>

      {/* The table */}
      <div className="mx-auto flex min-h-[236px] w-full max-w-[380px] flex-col overflow-hidden rounded-xl border border-tint/10 bg-panel/80 text-left shadow-(--shadow-card) backdrop-blur sm:min-h-0">
        <div className="flex items-center justify-between border-b border-tint/10 bg-tint/[0.04] px-3.5 py-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-fg-5">{t.extracted}</span>
          {/* Status: reading while values are in flight, then what came out */}
          {done ? (
            <span className="flex items-center gap-1 text-[10.5px] font-semibold text-ok">
              <Check size={12} strokeWidth={2.5} aria-hidden />
              {t.summary[doc.id]}
            </span>
          ) : (
            <span
              className={`flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-accent transition-opacity duration-300 ${
                shownRead > 0 ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#3b82f6]" />
              {t.reading}
            </span>
          )}
        </div>

        <div className="divide-y divide-tint/[0.07]">{doc.fields.filter((f) => !f.last).map(fieldRow)}</div>

        {/* A table field: one row per line of the document */}
        {doc.table && (
          <div className="border-t border-tint/[0.07]">
            <div className="flex items-center justify-between gap-3 px-3.5 pb-1 pt-[6px]">
              <span className="font-mono text-[11px] text-accent/85 sm:text-[11.5px]">{doc.table.name}</span>
              <span
                className={`rounded-full border px-1.5 py-px text-[9px] font-semibold uppercase tracking-[0.08em] ${
                  doc.table.composite ? "border-[#6c42f0]/35 text-[#8b6cf6]" : "border-tint/15 text-fg-5"
                }`}
              >
                {doc.table.composite ? t.composite : t.table}
              </span>
            </div>
            <div className="mx-3.5 mb-1.5 overflow-hidden rounded-md border border-tint/10 bg-well/15">
              <div className="flex justify-between gap-3 border-b border-tint/10 bg-tint/[0.04] px-2 py-[3px] font-mono text-[9px] text-fg-5">
                <span>{doc.table.cols[0]}</span>
                <span>{doc.table.cols[1]}</span>
              </div>
              {doc.table.rows.map((r, i) => {
                const on = landed(`row${i}`);
                return (
                  <div
                    key={`${doc.id}-row${i}`}
                    className={`flex items-center justify-between gap-3 border-t border-tint/[0.06] px-2 py-[4px] font-mono text-[10.5px] first:border-t-0 ${
                      on && !reduced ? "story-flash" : ""
                    }`}
                  >
                    <span data-dst={r.parts ? undefined : `row${i}`} className={`truncate text-fg-2 ${appear(on)}`}>
                      {r.text}
                    </span>
                    {r.parts ? (
                      // Composite: the cell lands whole, then splits.
                      <span data-dst={`row${i}`} className="flex shrink-0 gap-1">
                        {r.parts.map(([size, qty], k) => (
                          <span
                            key={size}
                            className={`flex overflow-hidden rounded border border-[#6c42f0]/30 text-[9.5px] transition-[opacity,scale] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                              on ? "scale-100 opacity-100" : "scale-75 opacity-0"
                            }`}
                            style={{ transitionDelay: on ? `${k * 80}ms` : "0ms" }}
                          >
                            <span className="bg-[#6c42f0]/15 px-1 font-semibold text-[#8b6cf6]">{size}</span>
                            <span className="px-1 text-fg-2">{qty}</span>
                          </span>
                        ))}
                      </span>
                    ) : (
                      <span className={`shrink-0 text-fg-2 ${appear(on)}`}>{r.value}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {doc.fields.some((f) => f.last) && (
          <div className="divide-y divide-tint/[0.07] border-t border-tint/[0.07]">
            {doc.fields.filter((f) => f.last).map(fieldRow)}
          </div>
        )}

      </div>

      {/* Values in flight */}
      <div ref={layerRef} className="pointer-events-none absolute inset-0 z-10" aria-hidden />
    </div>
  );
}
