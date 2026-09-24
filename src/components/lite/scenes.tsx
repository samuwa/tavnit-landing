"use client";

import { motion, useReducedMotion, type Transition } from "framer-motion";
import { Check, ClipboardCheck, Database, Globe, Lock, Mail, Paperclip, Pause, Send, UserCheck } from "lucide-react";
import { LogoLockup } from "@/components/lite/LogoMark";

/**
 * Seven small stages for "and then what?", one per outcome, each showing
 * what the product actually does (checked against the docs and the
 * backend, not imagined):
 *
 *  1 email output   — after a run: an email to the flow's recipients, rows.csv attached
 *  2 webhook        — one POST with rows + run_id; Zapier/Make/n8n via their webhook trigger
 *  3 review (HITL)  — review switched on for the flow pauses every run; a person edits next to the document and approves; then delivery
 *  4 matcher        — several runs of one flow paired line by line, a Champion column
 *  5 cleaner        — date/number formats, calculated check
 *  6 agent          — a browser agent with a mission, a start URL and vaulted credentials, typed captures
 *  7 prompting      — question → constrained plan → database → the figure
 *
 * Every stage is the same three-column grid: what enters | what Tavnit does
 * | what comes out. Each column centres one composite element and carries
 * its caption underneath, so the scenes line up with each other and with
 * themselves. Only the things that move (packets, rows, the paper plane)
 * are positioned freely, and they travel between column centres.
 * Framer Motion times it; with reduced motion every scene renders finished.
 */

export interface SceneProps {
  labels: [string, string, string];
  result: string;
}

const SPRING: Transition = { type: "spring", stiffness: 260, damping: 26 };
/** Column centres, in stage percentages. */
export const CX = ["16.667%", "50%", "83.333%"] as const;

export function useTiming() {
  const reduced = useReducedMotion();
  const at = (delay: number, extra: Partial<Transition> = {}): Transition =>
    reduced ? { duration: 0 } : { ...SPRING, delay, ...extra };
  return { reduced, at };
}
export type At = (d: number, e?: Partial<Transition>) => Transition;

/* ---------- the grid ---------- */

export function Stage({ children }: { children: React.ReactNode }) {
  return <div className="relative h-[264px] w-full overflow-hidden rounded-xl bg-[#f6f8fb]">{children}</div>;
}

/** One of the three columns: its content centred, its caption at the foot. */
export function Col({
  i,
  caption,
  delay,
  at,
  children,
}: {
  i: 0 | 1 | 2;
  caption: string;
  delay: number;
  at: At;
  children: React.ReactNode;
}) {
  return (
    <div className="absolute bottom-0 top-0 flex flex-col" style={{ left: `${i * 33.333}%`, width: "33.333%" }}>
      <motion.div
        className="flex flex-1 items-center justify-center px-3 pb-2 pt-9"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={at(delay)}
      >
        {children}
      </motion.div>
      <motion.p
        className="px-3 pb-3 text-center text-[11px] font-medium leading-snug text-[var(--lite-ink)] sm:text-xs"
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={at(delay + 0.15)}
      >
        {caption}
      </motion.p>
    </div>
  );
}

export function Result({ text, delay, at }: { text: string; delay: number; at: At }) {
  return (
    <motion.span
      className="absolute right-3 top-3 z-20 inline-flex items-center gap-1.5 rounded-md bg-white px-2.5 py-1 text-[11px] font-semibold tabular-nums text-[var(--lite-blue-ink)] shadow-sm sm:text-xs"
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={at(delay)}
    >
      <Check size={12} aria-hidden />
      {text}
    </motion.span>
  );
}

/* ---------- shared vocabulary ---------- */

/** A tiny spreadsheet, 120px wide. `flag` paints one row amber. */
export function Sheet({
  rows,
  at,
  delay = 0,
  rowDelay = 0.08,
  tone = "ink",
  flag,
  title,
  w = 120,
}: {
  rows: number;
  at: At;
  delay?: number;
  rowDelay?: number;
  tone?: "ink" | "blue";
  flag?: number;
  title?: string;
  w?: number;
}) {
  return (
    <div className="rounded-lg border border-[var(--lite-line)] bg-white p-1.5 shadow-sm" style={{ width: w }}>
      {title ? (
        <div className="mb-1 text-[10px] font-semibold text-[var(--lite-muted)]">{title}</div>
      ) : (
        <div className="mb-1 h-2 rounded-sm bg-[var(--lite-blue-soft)]" />
      )}
      {Array.from({ length: rows }).map((_, i) => (
        <motion.div
          key={i}
          className="mt-1 grid grid-cols-[2fr_1fr_1fr] gap-1"
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={at(delay + 0.15 + i * rowDelay)}
        >
          <span className={`h-1.5 rounded-sm ${tone === "blue" ? "bg-[var(--lite-blue)]/60" : "bg-[#d9dfe6]"}`} />
          <span className="h-1.5 rounded-sm bg-[#e6ebf0]" />
          <span className={`h-1.5 rounded-sm ${flag === i ? "bg-[#f0b482]" : "bg-[#e6ebf0]"}`} />
        </motion.div>
      ))}
    </div>
  );
}

/** The Tavnit tile: the real mark and the name on a light tile, 120px wide. */
export function Tile({ label = "Tavnit" }: { label?: string }) {
  return (
    <div className="flex h-12 w-[120px] items-center justify-center rounded-xl border border-[var(--lite-blue)]/30 bg-white shadow-md shadow-[#3b82f6]/15">
      <LogoLockup size={18} tone="light" label={label} />
    </div>
  );
}

/** A window (browser, ERP, review): title bar + body, full column width. */
export function Window({ title, children, className = "" }: { title: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <div className={`w-full max-w-[250px] overflow-hidden rounded-lg border border-[var(--lite-line)] bg-white shadow-sm ${className}`}>
      <div className="flex items-center gap-1.5 border-b border-[var(--lite-line)] bg-[#f3f6fa] px-2 py-1 text-[10px] font-semibold text-[var(--lite-muted)]">{title}</div>
      {children}
    </div>
  );
}

/** A packet of rows travelling between two column centres, at mid height. */
export function Packet({ from, to, delay, reduced }: { from: string; to: string; delay: number; reduced: boolean | null }) {
  if (reduced) return null;
  return (
    <motion.div
      className="absolute top-[calc(50%-10px)] z-10 flex -translate-x-1/2 flex-col gap-0.5 rounded-md border border-[var(--lite-blue)]/40 bg-white p-1 shadow-sm"
      initial={{ left: from, opacity: 0 }}
      animate={{ left: [from, from, to, to], opacity: [0, 1, 1, 0] }}
      transition={{ duration: 1.0, delay, times: [0, 0.1, 0.85, 1], ease: "easeInOut" }}
    >
      {[0, 1, 2].map((i) => (
        <span key={i} className="block h-1 w-6 rounded-sm bg-[var(--lite-blue)]/70" />
      ))}
    </motion.div>
  );
}

export function DrawnCheck({ delay, at, reduced, size = 26, color = "#1e7a4f" }: { delay: number; at: At; reduced: boolean | null; size?: number; color?: string }) {
  return (
    <motion.svg width={size} height={size} viewBox="0 0 24 24" fill="none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={at(delay)} aria-hidden>
      <motion.path
        d="M5 12.5l4.5 4.5L19 7.5"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: reduced ? 1 : 0 }}
        animate={{ pathLength: 1 }}
        transition={reduced ? { duration: 0 } : { duration: 0.45, delay: delay + 0.05, ease: "easeOut" }}
      />
    </motion.svg>
  );
}

export function Typed({ text, delay, reduced, step = 0.02 }: { text: string; delay: number; reduced: boolean | null; step?: number }) {
  if (reduced) return <>{text}</>;
  return (
    <>
      {text.split("").map((ch, i) => (
        <motion.span key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.01, delay: delay + i * step }}>
          {ch}
        </motion.span>
      ))}
    </>
  );
}

export function Chip({ children, tone = "muted", className = "" }: { children: React.ReactNode; tone?: "muted" | "blue" | "amber"; className?: string }) {
  const tones = {
    muted: "border-[var(--lite-line)] bg-white text-[var(--lite-muted)]",
    blue: "border-[var(--lite-blue)]/30 bg-[var(--lite-blue-soft)] text-[var(--lite-blue-ink)]",
    amber: "border-[#f1d9c7] bg-[#fdf1e3] text-[#b54708]",
  };
  return <span className={`rounded-md border px-1.5 py-0.5 text-[9px] font-semibold ${tones[tone]} ${className}`}>{children}</span>;
}

/* ---------- 1. email output ---------- */

export function EmailScene({ labels, result }: SceneProps) {
  const { at, reduced } = useTiming();
  return (
    <Stage>
      <Col i={0} caption={labels[0]} delay={0} at={at}>
        <Sheet rows={5} at={at} tone="blue" />
      </Col>
      <Col i={1} caption={labels[1]} delay={0.7} at={at}>
        <Tile />
      </Col>
      <Packet from={CX[0]} to={CX[1]} delay={0.8} reduced={reduced} />

      {/* the rows go on to become the email */}
      <Packet from={CX[1]} to={CX[2]} delay={1.7} reduced={reduced} />

      <Col i={2} caption={labels[2]} delay={2.6} at={at}>
        <Window
          title={
            <>
              <Mail size={11} aria-hidden />
              <span className="truncate font-normal">no-reply@mg.tavnit.io</span>
            </>
          }
        >
          <div className="space-y-1.5 px-2.5 py-2 text-[10px]">
            <div className="flex flex-wrap gap-1">
              {["finanzas@", "compras@"].map((r, i) => (
                <motion.span key={r} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={at(2.9 + i * 0.15)}>
                  <Chip tone="blue">{r}</Chip>
                </motion.span>
              ))}
            </div>
            <p className="truncate font-semibold text-[var(--lite-ink)]">
              <Typed text="Factura (Lite) — factura.pdf — Run 90450e5e" delay={3.2} reduced={reduced} step={0.012} />
            </p>
            <div className="flex items-center justify-between gap-2">
              <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={at(3.8)}>
                <Chip className="inline-flex items-center gap-1 text-[var(--lite-ink)]">
                  <Paperclip size={10} aria-hidden /> rows.csv
                </Chip>
              </motion.div>
              <motion.div className="flex items-center gap-1 text-[10px] font-semibold text-[#1e7a4f]" initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }} transition={at(4.2)}>
                <Send size={10} aria-hidden /> Enviado
                <DrawnCheck delay={4.3} at={at} reduced={reduced} size={12} />
              </motion.div>
            </div>
          </div>
        </Window>
      </Col>
      <Result text={result} delay={4.6} at={at} />
    </Stage>
  );
}

/* ---------- 2. webhook / ERP ---------- */

export function ErpScene({ labels, result }: SceneProps) {
  const { at, reduced } = useTiming();
  const tags = ["Zapier", "Make", "n8n", "API"];
  return (
    <Stage>
      <Col i={0} caption={labels[0]} delay={0} at={at}>
        <Sheet rows={6} at={at} />
      </Col>

      <Col i={1} caption={labels[1]} delay={0.7} at={at}>
        <div className="flex w-full max-w-[250px] flex-col items-center gap-2">
          <Window
            title={
              <>
                <span className="rounded-sm bg-[var(--lite-blue)] px-1 text-[9px] font-bold text-white">POST</span>
                <span className="truncate font-mono font-normal">tu-url/webhook</span>
              </>
            }
          >
            <div className="px-2 py-1.5 font-mono text-[10px] leading-relaxed text-[var(--lite-ink)]">
              {"{"} run_id: <span className="text-[var(--lite-blue-ink)]">&quot;90450e5e…&quot;</span>,
              <br />
              &nbsp;&nbsp;rows: <span className="text-[var(--lite-blue-ink)]">[6]</span> {"}"}
            </div>
          </Window>
          <div className="flex flex-wrap justify-center gap-1">
            {tags.map((t, i) => (
              <motion.span key={t} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={at(1.1 + i * 0.1)}>
                <Chip>{t}</Chip>
              </motion.span>
            ))}
          </div>
        </div>
      </Col>

      {/* rows crossing into the ERP */}
      {!reduced &&
        [0, 1, 2, 3, 4, 5].map((i) => (
          <motion.span
            key={i}
            className="absolute z-10 h-1.5 w-14 -translate-x-1/2 rounded-sm bg-[var(--lite-blue)]/70"
            style={{ top: `calc(50% - 34px + ${i * 10}px)` }}
            initial={{ left: CX[0], opacity: 0 }}
            animate={{ left: [CX[0], CX[0], CX[2], CX[2]], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 0.9, delay: 1.4 + i * 0.2, times: [0, 0.1, 0.9, 1], ease: "easeInOut" }}
          />
        ))}

      <Col i={2} caption={labels[2]} delay={0.4} at={at}>
        <Window
          title={
            <>
              <span className="h-1.5 w-1.5 rounded-full bg-[#d9dfe6]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#d9dfe6]" />
              ERP
            </>
          }
        >
          <div className="p-2">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <motion.div key={i} className="mt-1 flex items-center gap-1" initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={at(2.0 + i * 0.2)}>
                <span className="h-1.5 flex-1 rounded-sm bg-[var(--lite-blue)]/60" />
                <span className="h-1.5 w-5 rounded-sm bg-[#e6ebf0]" />
              </motion.div>
            ))}
          </div>
        </Window>
      </Col>
      <Result text={result} delay={3.4} at={at} />
    </Stage>
  );
}

/* ---------- 3. review (HITL) ---------- */

export function ReviewScene({ labels, result }: SceneProps) {
  const { at, reduced } = useTiming();
  return (
    <Stage>
      <Col i={0} caption={labels[0]} delay={0} at={at}>
        <div className="flex flex-col items-center gap-1.5">
          <Chip tone="blue" className="inline-flex items-center gap-1">
            <UserCheck size={10} aria-hidden /> Revisión activada
          </Chip>
          <Sheet rows={5} at={at} delay={0.1} />
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={at(0.8)}>
            <Chip tone="amber" className="inline-flex items-center gap-1">
              <Pause size={9} aria-hidden /> en pausa
            </Chip>
          </motion.span>
        </div>
      </Col>

      <Col i={1} caption={labels[1]} delay={0.9} at={at}>
        <Window
          title={
            <>
              <UserCheck size={11} aria-hidden /> Revisión
            </>
          }
        >
          <div className="grid grid-cols-[1fr_1.4fr] gap-1.5 p-2">
            <div className="rounded-sm border border-[var(--lite-line)] p-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <span key={i} className={`mb-1 block h-1 rounded-sm ${i === 2 ? "bg-[var(--lite-blue)]/50" : "bg-[#e6ebf0]"}`} />
              ))}
            </div>
            <div>
              {[0, 1, 2, 3, 4].map((i) =>
                i === 2 ? (
                  <div key={i} className="relative mb-1 flex h-3 items-center justify-end rounded-sm border border-[var(--lite-blue)]/50 bg-[var(--lite-blue-soft)] px-1 text-[9px] font-semibold tabular-nums">
                    <motion.span initial={{ opacity: 1 }} animate={{ opacity: reduced ? 0 : [1, 1, 0] }} transition={reduced ? { duration: 0 } : { duration: 0.3, delay: 1.9, times: [0, 0.8, 1] }} className="absolute right-1">
                      2,120.00
                    </motion.span>
                    <motion.span initial={{ opacity: reduced ? 1 : 0 }} animate={{ opacity: 1 }} transition={reduced ? { duration: 0 } : { duration: 0.2, delay: 2.2 }} className="text-[var(--lite-blue-ink)]">
                      2,220.00
                    </motion.span>
                  </div>
                ) : (
                  <span key={i} className="mb-1 block h-3 rounded-sm bg-[#f0f3f6]" />
                ),
              )}
            </div>
          </div>
          <motion.div className="flex items-center justify-end gap-1 border-t border-[var(--lite-line)] px-2 py-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={at(2.5)}>
            <Chip>Rechazar</Chip>
            <motion.span className="rounded-md bg-[#1e7a4f] px-1.5 py-0.5 text-[9px] font-semibold text-white" initial={{ scale: 1 }} animate={{ scale: reduced ? 1 : [1, 0.94, 1] }} transition={reduced ? { duration: 0 } : { duration: 0.3, delay: 2.9 }}>
              Aprobar
            </motion.span>
          </motion.div>
        </Window>
      </Col>

      <Col i={2} caption={labels[2]} delay={3.2} at={at}>
        <div className="flex w-full max-w-[200px] flex-col gap-1.5">
          {[
            { Icon: Mail, label: "correo" },
            { Icon: Send, label: "webhook" },
            { Icon: Database, label: "Bucket" },
          ].map(({ Icon, label }, i) => (
            <motion.div key={label} className="flex items-center gap-2 rounded-lg border border-[var(--lite-line)] bg-white px-2 py-1.5 text-[10px] font-semibold" initial={{ opacity: 0.35 }} animate={{ opacity: 1 }} transition={at(3.3 + i * 0.2)}>
              <span className="grid h-6 w-6 place-items-center rounded-md bg-[var(--lite-blue-soft)] text-[var(--lite-blue)]">
                <Icon size={12} aria-hidden />
              </span>
              {label}
              <span className="ml-auto">
                <DrawnCheck delay={3.4 + i * 0.2} at={at} reduced={reduced} size={14} />
              </span>
            </motion.div>
          ))}
          <motion.span className="mt-0.5 flex items-center gap-1 text-[9px] text-[var(--lite-muted)]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={at(4.0)}>
            <ClipboardCheck size={9} aria-hidden /> aprobado por Ana · 10:42 · registro
          </motion.span>
        </div>
      </Col>
      <Result text={result} delay={4.2} at={at} />
    </Stage>
  );
}

/* ---------- 4. matcher ---------- */

export function MatchScene({ labels, result }: SceneProps) {
  const { at, reduced } = useTiming();
  const rows = 5;
  const champion = ["B", "B", "B", "C", "B"];
  return (
    <Stage>
      <Col i={0} caption={labels[0]} delay={0} at={at}>
        <div className="relative h-[110px] w-[150px]">
          {["A", "B", "C"].map((q, i) => (
            <motion.div key={q} className="absolute" style={{ left: i * 15, top: i * 26 }} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={at(0.1 + i * 0.15)}>
              <Sheet rows={2} at={at} delay={0.1 + i * 0.15} title={`Cotización ${q}`} w={112} />
            </motion.div>
          ))}
        </div>
      </Col>

      <Col i={1} caption={labels[1]} delay={0.8} at={at}>
        <Tile label="Matcher" />
      </Col>
      <Packet from={CX[0]} to={CX[1]} delay={0.9} reduced={reduced} />

      <Col i={2} caption={labels[2]} delay={1.6} at={at}>
        <Window
          title={
            <div className="grid w-full grid-cols-[1.4fr_1fr_1fr_1fr_1.3fr] text-[9px]">
              <span>línea</span>
              <span className="text-right">A</span>
              <span className="text-right">B</span>
              <span className="text-right">C</span>
              <span className="text-right text-[var(--lite-blue-ink)]">Champion</span>
            </div>
          }
        >
          {Array.from({ length: rows }).map((_, i) => (
            <motion.div key={i} className="grid grid-cols-[1.4fr_1fr_1fr_1fr_1.3fr] items-center border-b border-[var(--lite-rule)] px-2 py-1 text-[9px] tabular-nums last:border-b-0" initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={at(2.0 + i * 0.2)}>
              <span className="h-1.5 w-8 rounded-sm bg-[#d9dfe6]" />
              <span className="text-right text-[var(--lite-muted)]">{(18 + i * 3).toFixed(2)}</span>
              <span className={`text-right ${champion[i] === "B" ? "font-semibold text-[var(--lite-ink)]" : "text-[var(--lite-muted)]"}`}>{(16.5 + i * 3).toFixed(2)}</span>
              <span className={`text-right ${champion[i] === "C" ? "font-semibold text-[var(--lite-ink)]" : "text-[var(--lite-muted)]"}`}>{(champion[i] === "C" ? 15.9 + i * 3 : 17.2 + i * 3).toFixed(2)}</span>
              <motion.span className="ml-auto rounded-sm bg-[var(--lite-blue-soft)] px-1 font-semibold text-[var(--lite-blue-ink)]" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={at(2.3 + i * 0.2)}>
                {champion[i]}
              </motion.span>
            </motion.div>
          ))}
        </Window>
      </Col>
      <Result text={result} delay={3.4} at={at} />
    </Stage>
  );
}

/* ---------- 5. cleaner ---------- */

export function RulesScene({ labels, result }: SceneProps) {
  const { at, reduced } = useTiming();
  const rules = ["Date Format", "Number Format", "Calculated"];
  const cells: { before: string; after: string; delay: number }[] = [
    { before: "12/09/2026", after: "2026-09-12", delay: 1.5 },
    { before: "4849.6", after: "4,849.60", delay: 1.9 },
    { before: "120 × 18.50", after: "2,220.00 ✓", delay: 2.3 },
  ];
  const cell = "flex h-8 w-[120px] items-center justify-center rounded-md border text-[11px] tabular-nums";
  return (
    <Stage>
      <Col i={0} caption={labels[0]} delay={0} at={at}>
        <div className="flex flex-col gap-1.5">
          {cells.map((c, i) => (
            <motion.span key={i} className={`${cell} border-[var(--lite-line)] bg-white text-[var(--lite-muted)]`} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={at(0.1 + i * 0.1)}>
              {c.before}
            </motion.span>
          ))}
        </div>
      </Col>

      <Col i={1} caption={labels[1]} delay={0.6} at={at}>
        <div className="flex flex-col items-center gap-2">
          <Tile label="Cleaner" />
          <div className="flex flex-wrap justify-center gap-1">
            {rules.map((r, i) => (
              <motion.span key={r} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={at(0.9 + i * 0.1)}>
                <Chip>{r}</Chip>
              </motion.span>
            ))}
          </div>
        </div>
      </Col>
      <Packet from={CX[0]} to={CX[1]} delay={0.7} reduced={reduced} />

      <Col i={2} caption={labels[2]} delay={1.3} at={at}>
        <div className="flex flex-col gap-1.5">
          {cells.map((c, i) => (
            <div key={i} className="relative h-8 w-[120px] [perspective:600px]">
              <motion.span
                className={`${cell} absolute inset-0 border-[var(--lite-line)] bg-white text-[var(--lite-muted)] [backface-visibility:hidden]`}
                initial={{ rotateX: 0 }}
                animate={{ rotateX: reduced ? 180 : [0, 0, 180] }}
                transition={reduced ? { duration: 0 } : { duration: 0.6, delay: c.delay, times: [0, 0.2, 1], ease: "easeInOut" }}
              >
                {c.before}
              </motion.span>
              <motion.span
                className={`${cell} absolute inset-0 border-[var(--lite-blue)]/40 bg-[var(--lite-blue-soft)] font-semibold text-[var(--lite-blue-ink)] [backface-visibility:hidden]`}
                initial={{ rotateX: -180 }}
                animate={{ rotateX: reduced ? 0 : [-180, -180, 0] }}
                transition={reduced ? { duration: 0 } : { duration: 0.6, delay: c.delay, times: [0, 0.2, 1], ease: "easeInOut" }}
              >
                {c.after}
              </motion.span>
            </div>
          ))}
        </div>
      </Col>
      <Result text={result} delay={3.1} at={at} />
    </Stage>
  );
}

/* ---------- 6. agent ---------- */

export function AgentScene({ labels, result }: SceneProps) {
  const { at } = useTiming();
  const steps = ["Login", "Orders", "Part 4417"];
  return (
    <Stage>
      <Col i={0} caption={labels[0]} delay={0} at={at}>
        <div className="flex flex-col items-center gap-1.5">
          <Sheet rows={4} at={at} tone="blue" />
          <motion.div className="flex gap-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={at(0.6)}>
            <Chip>part: 4417</Chip>
            <Chip>cant: 120</Chip>
          </motion.div>
        </div>
      </Col>

      <Col i={1} caption={labels[1]} delay={0.9} at={at}>
        <Window
          title={
            <>
              <span className="inline-flex items-center rounded-sm bg-white px-1 py-0.5 shadow-sm">
                <LogoLockup size={11} tone="light" label="Agent" />
              </span>
              <Globe size={10} aria-hidden />
              <span className="truncate rounded-sm bg-white px-1.5 py-0.5 font-normal">portal.acme-supply.com</span>
              <motion.span className="ml-auto flex items-center gap-1 text-[8px] text-[#b54708]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={at(1.2)}>
                <span className="h-1.5 w-1.5 rounded-full bg-[#e5484d]" /> live
              </motion.span>
            </>
          }
        >
          <div className="p-2">
            <div className="flex gap-1">
              {steps.map((st, i) => (
                <motion.span key={st} className="rounded-md border border-[var(--lite-line)] px-1.5 py-0.5 text-[9px] font-semibold" initial={{ opacity: 0.3 }} animate={{ opacity: 1, borderColor: "var(--lite-blue)" }} transition={at(1.4 + i * 0.5)}>
                  {st}
                </motion.span>
              ))}
            </div>
            <motion.div className="mt-1.5 flex items-center gap-1 text-[9px] text-[var(--lite-muted)]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={at(1.4)}>
              <Lock size={9} aria-hidden /> credenciales en bóveda
            </motion.div>
            <div className="mt-1.5 rounded-sm border border-[var(--lite-line)] p-1.5">
              {[0, 1, 2].map((i) => (
                <motion.div key={i} className="mb-1 flex items-center justify-between text-[9px] tabular-nums last:mb-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={at(2.5 + i * 0.15)}>
                  <span className={`h-1.5 w-12 rounded-sm ${i === 1 ? "bg-[var(--lite-blue)]/60" : "bg-[#e6ebf0]"}`} />
                  <span className={i === 1 ? "rounded-sm bg-[var(--lite-blue-soft)] px-1 font-semibold text-[var(--lite-blue-ink)]" : "text-[var(--lite-muted)]"}>{i === 1 ? "18.50" : i === 0 ? "22.40" : "9.90"}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </Window>
      </Col>

      <Col i={2} caption={labels[2]} delay={3.1} at={at}>
        <Window title="Bucket">
          <div className="p-2 text-[9px]">
            {[
              ["unit_price", "18.50", "Number"],
              ["lead_time", "5 días", "Text"],
              ["po_price", "18.50", "de la OC"],
            ].map(([k, v, t], i) => (
              <motion.div key={k} className="mb-1 flex items-center justify-between gap-1 tabular-nums last:mb-0" initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }} transition={at(3.3 + i * 0.2)}>
                <span className="font-mono text-[var(--lite-muted)]">{k}</span>
                <span className="font-semibold">{v}</span>
                <span className="rounded-sm bg-[#f3f6fa] px-1 text-[8px] text-[var(--lite-muted)]">{t}</span>
              </motion.div>
            ))}
          </div>
        </Window>
      </Col>
      <Result text={result} delay={4.0} at={at} />
    </Stage>
  );
}

/* ---------- 7. prompting ---------- */

export function AskScene({ labels, result }: SceneProps) {
  const { at, reduced } = useTiming();
  const question = labels[0].replace(/^"|"$/g, "");
  const plan = ["sum(total)", "proveedor = Istmo", "mes = agosto"];
  const figure = result.split(" en ")[0].split(" across ")[0];
  return (
    <Stage>
      <Col i={0} caption={labels[0]} delay={0.1} at={at}>
        <div className="w-full max-w-[220px] rounded-2xl rounded-bl-sm border border-[var(--lite-line)] bg-white px-3 py-2 text-[11px] shadow-sm">
          <Typed text={question} delay={0.3} reduced={reduced} />
        </div>
      </Col>

      <Col i={1} caption={labels[1]} delay={1.2} at={at}>
        <div className="flex flex-col items-center gap-2">
          <Tile />
          <div className="flex flex-col items-center gap-1">
            {plan.map((p, i) => (
              <motion.span key={p} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={at(1.6 + i * 0.25)}>
                <Chip tone="blue" className="font-mono font-normal">{p}</Chip>
              </motion.span>
            ))}
          </div>
          <motion.span className="flex items-center gap-1 text-[9px] text-[var(--lite-muted)]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={at(2.6)}>
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--lite-blue)]" /> Postgres · el modelo no hace la cuenta
          </motion.span>
        </div>
      </Col>

      <Col i={2} caption={labels[2]} delay={3.2} at={at}>
        <div className="w-full max-w-[220px] rounded-2xl rounded-br-sm border border-[var(--lite-blue)]/30 bg-[var(--lite-blue-soft)] px-3 py-2 shadow-sm">
          <LogoLockup size={12} tone="light" />
          <div className="mt-1 font-heading text-lg font-bold tabular-nums">{figure}</div>
          <p className="mt-0.5 text-[10px] leading-snug text-[var(--lite-muted)]">
            <Typed text={result} delay={3.5} reduced={reduced} step={0.025} />
          </p>
        </div>
      </Col>
      <Result text={result} delay={4.2} at={at} />
    </Stage>
  );
}

export const SCENES = [EmailScene, ErpScene, ReviewScene, MatchScene, RulesScene, AgentScene, AskScene] as const;
