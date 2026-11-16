"use client";

import { motion, useTransform } from "framer-motion";
import { Check, Code2, Mail, MousePointer2, Paperclip, Plug, Upload } from "lucide-react";
import { Choices, DocToken, Panel, ramp, Typed, usePlayhead, type P, type SceneProps } from "./shared";

/**
 * Stop 1: how the documents get in. Four of the five ways (the fifth,
 * no-code tools, is the API with another name and is named in the copy).
 * Each option has its own short film; all of them end the same way, with
 * the file crossing over into Tavnit.
 *
 * What arrives is a supplier's scan of a whole shipment (six pages: an
 * invoice, a packing list, a bill of lading), and it lands in a Splitter.
 * The next stop takes it from there: that is where the invoice the story
 * follows is pulled out. (The file used to arrive as "invoice.pdf" straight
 * into the Flow, and the next stop then split a different file.)
 */

export const SOURCE_OPTIONS = [
  { id: "email", label: "Email", icon: Mail },
  { id: "upload", label: "Upload", icon: Upload },
  { id: "api", label: "REST API", icon: Code2 },
  { id: "mcp", label: "AI assistant", icon: Plug },
] as const;

const FILE = "shipment-0412.pdf";

/** The source's own part of the film runs 0 → HANDOFF, then the hand-off. */
const HANDOFF = 0.46;

function useAppear(q: P, from: number, to: number) {
  const opacity = useTransform(q, (v) => ramp(v, from, to));
  const y = useTransform(q, (v) => (1 - ramp(v, from, to)) * 12);
  return { opacity, y };
}

function EmailSource({ q }: { q: P }) {
  // The message drops into the inbox.
  const opacity = useTransform(q, (v) => ramp(v, 0, 0.12));
  const y = useTransform(q, (v) => (1 - ramp(v, 0, 0.14)) * -18);
  const scale = useTransform(q, (v) => 0.96 + 0.04 * ramp(v, 0, 0.14));
  // The address is what routes it: a line is drawn under it.
  const to = useTransform(q, (v) => ramp(v, 0.16, 0.3));
  // The attachment lifts off the message, then leaves.
  const lift = useTransform(q, (v) => 1 + 0.08 * ramp(v, 0.34, 0.42) - 0.08 * ramp(v, HANDOFF, HANDOFF + 0.06));
  const attachment = useTransform(q, (v) => 1 - 0.65 * ramp(v, HANDOFF, HANDOFF + 0.08));
  const glow = useTransform(q, (v) => ramp(v, 0.34, 0.42) * (1 - ramp(v, HANDOFF, HANDOFF + 0.08)));
  return (
    <motion.div style={{ opacity, y, scale }}>
      <Panel
        title="Inbox"
        right={
          <span className="flex shrink-0 items-center gap-1.5 font-mono text-[10px] text-fg-5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            09:38
          </span>
        }
      >
        <div className="space-y-1.5 px-3.5 py-3 text-[11.5px]">
          <div className="flex gap-2">
            <span className="w-12 shrink-0 text-fg-5">From</span>
            <span className="truncate text-fg-3">accounts@northwind-freight.de</span>
          </div>
          <div className="flex gap-2">
            <span className="w-12 shrink-0 text-fg-5">To</span>
            <span className="relative min-w-0 truncate font-mono text-[11px] text-accent">
              8c21-splitter@mg.tavnit.io
              <motion.span className="absolute inset-x-0 bottom-0 h-px origin-left bg-accent" style={{ scaleX: to }} />
            </span>
          </div>
          <div className="flex gap-2">
            <span className="w-12 shrink-0 text-fg-5">Subject</span>
            <span className="truncate font-semibold text-fg">Sendung 0412 · Unterlagen</span>
          </div>
          <p className="pt-1 text-fg-4">Guten Tag, anbei Rechnung, Packliste und Konnossement.</p>
          <motion.div
            style={{ opacity: attachment, scale: lift }}
            className="relative inline-flex origin-left items-center gap-1.5 rounded-md border border-tint/15 bg-tint/[0.05] px-2 py-1 font-mono text-[10.5px] text-fg-2"
          >
            <motion.span className="absolute inset-0 rounded-md ring-1 ring-[#3b82f6]/70 shadow-[0_6px_18px_-6px_rgba(59,130,246,0.7)]" style={{ opacity: glow }} />
            <Paperclip size={11} /> {FILE}
          </motion.div>
        </div>
      </Panel>
    </motion.div>
  );
}

function UploadSource({ q }: { q: P }) {
  const x = useTransform(q, (v) => (1 - ramp(v, 0.05, 0.34)) * -74);
  const y = useTransform(q, (v) => (1 - ramp(v, 0.05, 0.34)) * -44);
  const file = useTransform(q, (v) => ramp(v, 0.02, 0.08) * (1 - 0.6 * ramp(v, HANDOFF, HANDOFF + 0.08)));
  const cursor = useTransform(q, (v) => 1 - ramp(v, 0.34, 0.4));
  const hot = useTransform(q, (v) => ramp(v, 0.26, 0.36));
  const bar = useTransform(q, (v) => ramp(v, 0.36, HANDOFF));
  return (
    <Panel title="Shipments · Upload">
      <div className="p-3.5">
        <div className="relative grid h-[132px] place-items-center rounded-lg border border-dashed border-tint/25">
          <motion.div className="absolute inset-0 rounded-lg bg-[#3b82f6]/[0.07] ring-1 ring-[#3b82f6]/50" style={{ opacity: hot }} />
          <span className="absolute bottom-3 text-[11px] text-fg-5">Drop PDFs, photos or scans</span>
          <motion.div
            className="relative flex items-center gap-2 rounded-md border border-tint/15 bg-panel px-2 py-1.5 shadow-(--shadow-card)"
            style={{ x, y, opacity: file }}
          >
            <DocToken />
            <span className="font-mono text-[11px] text-fg-2">{FILE}</span>
            <motion.span className="absolute -bottom-3 -right-2 text-fg" style={{ opacity: cursor }}>
              <MousePointer2 size={16} className="fill-current" />
            </motion.span>
          </motion.div>
        </div>
        <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-tint/10">
          <motion.div className="h-full origin-left bg-gradient-to-r from-[#3b82f6] to-[#6c42f0]" style={{ scaleX: bar }} />
        </div>
      </div>
    </Panel>
  );
}

function ApiSource({ q }: { q: P }) {
  const reply = useAppear(q, 0.36, HANDOFF);
  return (
    <Panel title="Terminal" right={<span className="shrink-0 font-mono text-[10px] text-fg-5">REST API</span>}>
      <div className="px-3.5 py-3 font-mono text-[10.5px] leading-[1.75] text-fg-3">
        <div>
          <span className="text-ok">$</span> <Typed t={q} from={0.02} to={0.12}>curl -X POST /splits/run \</Typed>
        </div>
        <div className="pl-4">
          <Typed t={q} from={0.13} to={0.22}>-H &quot;X-API-Key: ••••••••&quot; \</Typed>
        </div>
        <div className="pl-4">
          <Typed t={q} from={0.23} to={0.33}>-F &quot;file=@{FILE}&quot;</Typed>
        </div>
        <motion.div style={reply} className="mt-2 border-t border-tint/10 pt-2 text-fg-2">
          <span className="font-bold text-ok">✓</span> {"{"} &quot;split_id&quot;: &quot;7d41c0…&quot; {"}"}
        </motion.div>
      </div>
    </Panel>
  );
}

/** A chat bubble that grows out of its own corner. */
function useBubble(q: P, from: number, to: number) {
  const opacity = useTransform(q, (v) => ramp(v, from, to));
  const scale = useTransform(q, (v) => 0.86 + 0.14 * ramp(v, from, to));
  return { opacity, scale };
}

function AssistantSource({ q }: { q: P }) {
  const ask = useBubble(q, 0, 0.1);
  const tool = useAppear(q, 0.14, 0.22);
  const thinking = useTransform(q, (v) => ramp(v, 0.22, 0.26) * (1 - ramp(v, 0.34, 0.38)));
  const answer = useBubble(q, 0.36, HANDOFF);
  return (
    <Panel title="Your AI assistant" right={<span className="shrink-0 font-mono text-[10px] text-fg-5">MCP</span>}>
      <div className="space-y-2 px-3.5 py-3 text-[11.5px]">
        <motion.div style={ask} className="ml-auto w-fit max-w-[88%] origin-bottom-right rounded-xl rounded-br-sm bg-[#3b82f6]/15 px-3 py-2 text-fg-2">
          Process this shipment scan
          <span className="mt-1 flex w-fit items-center gap-1 rounded border border-tint/15 px-1.5 py-0.5 font-mono text-[10px]">
            <Paperclip size={10} /> {FILE}
          </span>
        </motion.div>
        <motion.div style={tool} className="flex w-fit items-center gap-1.5 rounded-full border border-[#6c42f0]/30 px-2.5 py-1 text-[10.5px] font-semibold text-[#8b6cf6]">
          <Plug size={11} /> Tavnit connector · sending the file
        </motion.div>
        <div className="relative">
          <motion.div style={{ opacity: thinking }} className="absolute left-0 top-0 flex gap-1 rounded-xl rounded-bl-sm bg-tint/[0.06] px-3 py-2.5">
            {[0, 1, 2].map((i) => (
              <span key={i} className="story-dot h-1.5 w-1.5 rounded-full bg-fg-4" style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </motion.div>
          <motion.div style={answer} className="w-fit max-w-[88%] origin-bottom-left rounded-xl rounded-bl-sm bg-tint/[0.06] px-3 py-2 text-fg-3">
            Done. Six pages received, Tavnit is sorting them.
          </motion.div>
        </div>
      </div>
    </Panel>
  );
}

const SOURCE_FILM = { email: EmailSource, upload: UploadSource, api: ApiSource, mcp: AssistantSource };

export default function ArriveScene({ p, story }: SceneProps) {
  const q = usePlayhead(p, story.source);
  const Film = SOURCE_FILM[story.source];
  const trigger = SOURCE_OPTIONS.find((o) => o.id === story.source)!.label;

  // The hand-off: the file crosses from where it came into Tavnit, on an
  // arc, lighting the line behind it; a ring opens where it lands.
  const k = (v: number) => ramp(v, HANDOFF, 0.76);
  const crossing = useTransform(q, (v) => `${k(v) * 100}%`);
  const arc = useTransform(q, (v) => -Math.sin(Math.PI * k(v)) * 16);
  const tilt = useTransform(q, (v) => Math.sin(Math.PI * k(v)) * 9);
  const token = useTransform(q, (v) => ramp(v, HANDOFF - 0.03, HANDOFF + 0.02) * (1 - ramp(v, 0.76, 0.8)));
  const lit = useTransform(q, k);
  const landed = useTransform(q, (v) => ramp(v, 0.76, 0.86));
  const landedScale = useTransform(q, (v) => 0.82 + 0.18 * ramp(v, 0.76, 0.88));
  const ring = useTransform(q, (v) => ramp(v, 0.76, 0.8) * (1 - ramp(v, 0.8, 0.96)));
  const ringScale = useTransform(q, (v) => 0.6 + 1.1 * ramp(v, 0.76, 0.96));
  const waiting = useTransform(q, (v) => 1 - ramp(v, 0.76, 0.82));
  const started = useTransform(q, (v) => ramp(v, 0.86, 0.94));

  return (
    <div>
      <Choices label="Arrives by" options={SOURCE_OPTIONS} value={story.source} onChange={story.setSource} />
      <div className="grid items-center gap-3 sm:grid-cols-[minmax(0,1.3fr)_52px_minmax(0,1fr)] sm:gap-0">
        {/* Fixed height: the options above must not move when the film changes. */}
        <div className="min-h-[220px]" aria-hidden="true">
          <Film key={story.source} q={q} />
        </div>

        <div className="relative hidden h-12 sm:block" aria-hidden="true">
          <div className="absolute inset-x-1 top-1/2 h-px bg-tint/15" />
          <motion.div className="absolute inset-x-1 top-1/2 h-px origin-left bg-gradient-to-r from-[#3b82f6] to-[#6c42f0]" style={{ scaleX: lit }} />
          <motion.div className="absolute inset-y-0 left-0 w-[calc(100%-22px)]" style={{ x: crossing }}>
            <motion.span
              className="absolute left-0 top-1/2 -mt-[14px] block drop-shadow-[0_0_10px_rgba(76,99,246,0.75)]"
              style={{ opacity: token, y: arc, rotate: tilt }}
            >
              <DocToken />
            </motion.span>
          </motion.div>
        </div>

        <Panel title="Splitter · Shipments" className="w-full">
          <div className="space-y-2.5 px-3.5 py-3" aria-hidden="true">
            <div className="flex items-center justify-between gap-2 text-[11px]">
              <span className="text-fg-5">Trigger</span>
              <span className="font-semibold text-fg-2">{trigger}</span>
            </div>
            <div className="relative grid h-[74px] place-items-center rounded-lg border border-dashed border-tint/20">
              <motion.span className="text-[11px] text-fg-5" style={{ opacity: waiting }}>
                Waiting for a document
              </motion.span>
              <motion.span className="absolute h-14 w-14 rounded-full ring-2 ring-[#3b82f6]/70" style={{ opacity: ring, scale: ringScale }} />
              <motion.div className="absolute flex items-center gap-2" style={{ opacity: landed, scale: landedScale }}>
                <DocToken />
                <span className="font-mono text-[11px] text-fg-2">{FILE}</span>
              </motion.div>
            </div>
            <motion.div className="flex items-center gap-1.5 text-[11px] font-semibold text-ok" style={{ opacity: started }}>
              <Check size={12} strokeWidth={2.5} /> Received · 6 pages
            </motion.div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
