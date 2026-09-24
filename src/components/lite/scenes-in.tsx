"use client";

import { motion } from "framer-motion";
import { FileText, Mail, Paperclip, Scissors, Upload } from "lucide-react";
import {
  CX,
  Chip,
  Col,
  DrawnCheck,
  Packet,
  Result,
  Sheet,
  Stage,
  Tile,
  Typed,
  Window,
  useTiming,
  type SceneProps,
} from "@/components/lite/scenes";
import { LogoLockup } from "@/components/lite/LogoMark";

/**
 * Five stages for the inputs of "and then what?": the ways a document
 * reaches a Flow, each as the product actually does it:
 *
 *  1 email     — forward to the Flow's own address; each attachment becomes a run
 *  2 upload    — drop the file on the Flow in the app
 *  3 API       — POST /api/runs/process → 202 {run_id} → GET /api/runs/<id> until completed
 *  4 Zapier…   — an HTTP step sends the file; the rows come back through a webhook trigger
 *  5 splitter  — one PDF, several documents: segmented, classified, one run each
 *
 * Same three-column grid and vocabulary as the output scenes.
 */

/* ---------- 1. email in ---------- */

export function EmailInScene({ labels, result }: SceneProps) {
  const { at, reduced } = useTiming();
  return (
    <Stage>
      <Col i={0} caption={labels[0]} delay={0} at={at}>
        <Window
          title={
            <>
              <Mail size={11} aria-hidden /> <span className="font-normal">Reenviar</span>
            </>
          }
        >
          <div className="space-y-1.5 px-2.5 py-2 text-[10px]">
            <p className="truncate text-[var(--lite-muted)]">
              Para: <span className="font-mono text-[var(--lite-ink)]">factura-lite-105a…@mg.tavnit.io</span>
            </p>
            <div className="h-1.5 w-3/4 rounded-sm bg-[#e6ebf0]" />
            <div className="h-1.5 w-1/2 rounded-sm bg-[#e6ebf0]" />
            <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={at(0.5)}>
              <Chip className="inline-flex items-center gap-1 text-[var(--lite-ink)]">
                <Paperclip size={10} aria-hidden /> factura.pdf
              </Chip>
            </motion.div>
          </div>
        </Window>
      </Col>

      <Col i={1} caption={labels[1]} delay={1.0} at={at}>
        <div className="flex flex-col items-center gap-2">
          <Tile />
          <Chip className="font-mono font-normal">…@mg.tavnit.io</Chip>
        </div>
      </Col>
      <Packet from={CX[0]} to={CX[1]} delay={1.1} reduced={reduced} />
      <Packet from={CX[1]} to={CX[2]} delay={2.0} reduced={reduced} />

      <Col i={2} caption={labels[2]} delay={2.6} at={at}>
        <Sheet rows={6} at={at} delay={2.6} tone="blue" />
      </Col>
      <Result text={result} delay={3.6} at={at} />
    </Stage>
  );
}

/* ---------- 2. manual upload ---------- */

export function UploadScene({ labels, result }: SceneProps) {
  const { at, reduced } = useTiming();
  return (
    <Stage>
      <Col i={0} caption={labels[0]} delay={0} at={at}>
        <Window
          title={
            <>
              <LogoLockup size={11} tone="light" /> <span className="font-normal">Flow · Factura</span>
            </>
          }
        >
          <div className="relative m-2 flex h-[72px] items-center justify-center rounded-md border-2 border-dashed border-[var(--lite-line)] text-[10px] text-[var(--lite-muted)]">
            <Upload size={14} aria-hidden />
            {!reduced && (
              <motion.span
                className="absolute flex items-center gap-1 rounded-md border border-[var(--lite-line)] bg-white px-1.5 py-1 text-[9px] font-semibold text-[var(--lite-ink)] shadow-sm"
                initial={{ x: -70, y: -40, opacity: 0 }}
                animate={{ x: [-70, 0, 0], y: [-40, 0, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 1.4, delay: 0.4, times: [0, 0.6, 1], ease: "easeInOut" }}
              >
                <FileText size={10} aria-hidden /> factura.pdf
              </motion.span>
            )}
          </div>
        </Window>
      </Col>

      <Col i={1} caption={labels[1]} delay={1.5} at={at}>
        <div className="flex flex-col items-center gap-2">
          <Tile />
          <motion.div className="h-1.5 w-[100px] overflow-hidden rounded-full bg-[#e6ebf0]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={at(1.6)}>
            <motion.span
              className="block h-full rounded-full bg-[var(--lite-blue)]"
              initial={{ width: reduced ? "100%" : "0%" }}
              animate={{ width: "100%" }}
              transition={reduced ? { duration: 0 } : { duration: 1.2, delay: 1.7, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </Col>

      <Col i={2} caption={labels[2]} delay={3.0} at={at}>
        <Sheet rows={6} at={at} delay={3.0} tone="blue" />
      </Col>
      <Result text={result} delay={3.9} at={at} />
    </Stage>
  );
}

/* ---------- 3. API ---------- */

export function ApiScene({ labels, result }: SceneProps) {
  const { at, reduced } = useTiming();
  return (
    <Stage>
      <Col i={0} caption={labels[0]} delay={0} at={at}>
        <Window
          title={
            <>
              <span className="rounded-sm bg-[var(--lite-blue)] px-1 text-[9px] font-bold text-white">POST</span>
              <span className="truncate font-mono font-normal">/api/runs/process</span>
            </>
          }
        >
          <div className="px-2 py-1.5 font-mono text-[9.5px] leading-relaxed text-[var(--lite-ink)]">
            X-API-Key: <span className="text-[var(--lite-muted)]">••••</span>
            <br />
            file: <span className="text-[var(--lite-blue-ink)]">factura.pdf</span>
            <br />
            flow_id: <span className="text-[var(--lite-blue-ink)]">105a016a…</span>
          </div>
        </Window>
      </Col>

      <Col i={1} caption={labels[1]} delay={0.9} at={at}>
        <div className="flex flex-col items-center gap-2">
          <Tile />
          <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={at(1.3)}>
            <Chip tone="blue" className="font-mono font-normal">
              202 · run_id · queued
            </Chip>
          </motion.div>
        </div>
      </Col>
      <Packet from={CX[0]} to={CX[1]} delay={1.0} reduced={reduced} />

      <Col i={2} caption={labels[2]} delay={2.0} at={at}>
        <Window
          title={
            <>
              <span className="rounded-sm bg-[#1e7a4f] px-1 text-[9px] font-bold text-white">GET</span>
              <span className="truncate font-mono font-normal">/api/runs/90450e5e</span>
            </>
          }
        >
          <div className="px-2 py-1.5 font-mono text-[9.5px] leading-relaxed text-[var(--lite-ink)]">
            status:{" "}
            <span className="text-[var(--lite-muted)]">
              <Typed text="queued" delay={2.3} reduced={reduced} step={0.03} />
            </span>
            <br />
            status:{" "}
            <span className="text-[var(--lite-muted)]">
              <Typed text="running" delay={2.9} reduced={reduced} step={0.03} />
            </span>
            <br />
            status:{" "}
            <span className="font-semibold text-[var(--lite-blue-ink)]">
              <Typed text="completed" delay={3.5} reduced={reduced} step={0.03} />
            </span>
            <br />
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={at(3.9)}>
              data: <span className="text-[var(--lite-blue-ink)]">[6 rows]</span>
            </motion.span>
          </div>
        </Window>
      </Col>
      <Result text={result} delay={4.2} at={at} />
    </Stage>
  );
}

/* ---------- 4. Zapier / Make / n8n ---------- */

export function AutomationScene({ labels, result }: SceneProps) {
  const { at, reduced } = useTiming();
  const steps = [
    { name: "Nuevo archivo", sub: "Drive · Gmail" },
    { name: "HTTP", sub: "POST a Tavnit" },
    { name: "Webhook", sub: "filas de vuelta" },
  ];
  return (
    <Stage>
      <Col i={0} caption={labels[0]} delay={0} at={at}>
        <div className="flex w-full max-w-[200px] flex-col gap-1.5">
          {steps.slice(0, 2).map((st, i) => (
            <motion.div
              key={st.name}
              className={`flex items-center gap-2 rounded-lg border bg-white px-2 py-1.5 text-[10px] ${i === 1 ? "border-[var(--lite-blue)]/50" : "border-[var(--lite-line)]"}`}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={at(0.1 + i * 0.25)}
            >
              <span className="grid h-5 w-5 place-items-center rounded-md bg-[var(--lite-blue-soft)] text-[9px] font-bold text-[var(--lite-blue-ink)]">{i + 1}</span>
              <span className="font-semibold">{st.name}</span>
              <span className="ml-auto text-[9px] text-[var(--lite-muted)]">{st.sub}</span>
            </motion.div>
          ))}
          <div className="flex justify-center gap-1">
            {["Zapier", "Make", "n8n"].map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
          </div>
        </div>
      </Col>

      <Col i={1} caption={labels[1]} delay={1.0} at={at}>
        <Tile />
      </Col>
      <Packet from={CX[0]} to={CX[1]} delay={1.1} reduced={reduced} />
      <Packet from={CX[1]} to={CX[2]} delay={2.2} reduced={reduced} />

      <Col i={2} caption={labels[2]} delay={2.8} at={at}>
        <div className="flex w-full max-w-[200px] flex-col gap-1.5">
          <div className="flex items-center gap-2 rounded-lg border border-[var(--lite-blue)]/50 bg-white px-2 py-1.5 text-[10px]">
            <span className="grid h-5 w-5 place-items-center rounded-md bg-[var(--lite-blue-soft)] text-[9px] font-bold text-[var(--lite-blue-ink)]">3</span>
            <span className="font-semibold">{steps[2].name}</span>
            <span className="ml-auto text-[9px] text-[var(--lite-muted)]">{steps[2].sub}</span>
          </div>
          <Sheet rows={4} at={at} delay={3.0} tone="blue" w={200} />
        </div>
      </Col>
      <Result text={result} delay={3.8} at={at} />
    </Stage>
  );
}

/* ---------- 5. splitter ---------- */

export function SplitterScene({ labels, result }: SceneProps) {
  const { at, reduced } = useTiming();
  return (
    <Stage>
      <Col i={0} caption={labels[0]} delay={0} at={at}>
        <div className="relative w-[110px] rounded-lg border border-[var(--lite-line)] bg-white p-1.5 shadow-sm">
          <div className="mb-1 flex items-center gap-1 text-[9px] font-semibold text-[var(--lite-muted)]">
            <FileText size={10} aria-hidden /> escaneo.pdf · 9 pág.
          </div>
          {[0, 1, 2].map((d) => (
            <div key={d} className="mt-1 rounded-sm border border-[var(--lite-rule)] p-1">
              {[0, 1].map((r) => (
                <span key={r} className="mb-0.5 block h-1 rounded-sm bg-[#e6ebf0]" />
              ))}
            </div>
          ))}
          {/* the cuts */}
          {[0, 1].map((c) => (
            <motion.span
              key={c}
              className="absolute left-1 right-1 flex items-center"
              style={{ top: 44 + c * 22 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={at(1.3 + c * 0.3)}
              aria-hidden
            >
              <span className="h-px flex-1 border-t border-dashed border-[var(--lite-blue)]" />
              <Scissors size={9} className="mx-0.5 text-[var(--lite-blue)]" />
            </motion.span>
          ))}
        </div>
      </Col>

      <Col i={1} caption={labels[1]} delay={0.9} at={at}>
        <div className="flex flex-col items-center gap-2">
          <Tile label="Splitter" />
          <div className="flex gap-1">
            {["Factura", "Factura", "Factura"].map((t, i) => (
              <motion.span key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={at(1.9 + i * 0.15)}>
                <Chip tone="blue">{t}</Chip>
              </motion.span>
            ))}
          </div>
        </div>
      </Col>
      <Packet from={CX[0]} to={CX[1]} delay={1.0} reduced={reduced} />

      <Col i={2} caption={labels[2]} delay={2.5} at={at}>
        <div className="flex flex-col gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div key={i} className="flex items-center gap-2" initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }} transition={at(2.6 + i * 0.25)}>
              <Sheet rows={1} at={at} delay={2.6 + i * 0.25} tone="blue" w={110} />
              <DrawnCheck delay={2.9 + i * 0.25} at={at} reduced={reduced} size={14} />
            </motion.div>
          ))}
        </div>
      </Col>
      <Result text={result} delay={3.8} at={at} />
    </Stage>
  );
}

export const INPUT_SCENES = [EmailInScene, UploadScene, ApiScene, AutomationScene, SplitterScene] as const;
