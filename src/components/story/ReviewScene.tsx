"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useTransform } from "framer-motion";
import { Check, MousePointer2 } from "lucide-react";
import Record, { RecordBadge } from "./Record";
import { Panel, RECORD_FRAME, type SceneProps } from "./shared";

/**
 * Stop 5: the run pauses for a person. Not because anything was misread:
 * one of the team's own rules (invoices over 3,000 EUR need sign-off) asks
 * for an approval. The visitor can give it; otherwise the reviewer does.
 * It is the record beside it that gets approved.
 */

const REVIEWER_APPROVES_AT = 0.62;

export default function ReviewScene({ p, story }: SceneProps) {
  const [byVisitor, setByVisitor] = useState(false);
  const [byReviewer, setByReviewer] = useState(false);
  useMotionValueEvent(p, "change", (v) => {
    const on = v >= REVIEWER_APPROVES_AT;
    setByReviewer((prev) => (prev === on ? prev : on));
  });
  const approved = byVisitor || byReviewer;
  const who = byVisitor ? "you" : "M. Ortega";

  const cursorX = useTransform(p, [0.18, 0.56], [110, 4]);
  const cursorY = useTransform(p, [0.18, 0.56], [84, 6]);
  const cursorOpacity = useTransform(p, [0.14, 0.22, 0.7, 0.78], [0, 1, 1, 0]);

  return (
    <div className={RECORD_FRAME}>
      <Panel title="Review" right={<span className="shrink-0 text-[10px] text-fg-5">Assigned to M. Ortega</span>}>
        <div className="space-y-3 p-3.5">
          <p className="text-[12px] leading-snug text-fg-3">
            <span className="font-semibold text-fg">Your rule:</span> invoices over 3,000 EUR need sign-off before anything is sent.
          </p>

          {/* The value next to where it came from */}
          <div className="rounded-lg bg-[#fdfcf8] px-3 py-2.5 text-[#1c2321] ring-1 ring-black/[0.06]" aria-hidden="true">
            <div className="text-[8.5px] font-semibold uppercase tracking-[0.14em] text-[#6b7672]">Source · page 1</div>
            <div className="mt-1.5 flex items-center justify-between gap-2 text-[11.5px]">
              <span className="font-semibold">Gesamt EUR</span>
              <span className="rounded-[3px] px-1.5 font-mono font-bold shadow-[0_0_0_1.5px_rgba(59,130,246,0.75)]">3.285,00</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="relative">
              <button
                type="button"
                disabled={approved}
                onClick={() => {
                  setByVisitor(true);
                  story.touch();
                }}
                className={`press rounded-md px-3.5 py-1.5 text-[12px] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]/50 ${
                  approved ? "bg-emerald-500/15 text-ok" : "cursor-pointer bg-accent text-white hover:brightness-110"
                }`}
              >
                {approved ? (
                  <span className="flex items-center gap-1">
                    <Check size={12} strokeWidth={2.5} /> Approved
                  </span>
                ) : (
                  "Approve"
                )}
              </button>
              {/* The reviewer's cursor, on its way to the button */}
              {!byVisitor && (
                <motion.span
                  className="pointer-events-none absolute left-1/2 top-1/2 text-fg drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]"
                  style={{ x: cursorX, y: cursorY, opacity: cursorOpacity }}
                  aria-hidden="true"
                >
                  <MousePointer2 size={17} className="fill-current" />
                </motion.span>
              )}
            </span>
            <span className="text-[11px] text-fg-5">{approved ? `by ${who}` : "or wait for the reviewer"}</span>
          </div>

          <ul className="space-y-1 border-t border-tint/10 pt-2.5 font-mono text-[10.5px]" aria-hidden="true">
            <li className="flex justify-between gap-3 text-fg-4">
              <span>Paused · total over 3,000</span>
              <span className="text-fg-6">09:41</span>
            </li>
            {[`Approved · by ${who}`, "Run released"].map((line, i) => (
              <li
                key={i}
                className={`flex justify-between gap-3 transition-[opacity,translate] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                  approved ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
                } ${i === 1 ? "text-ok" : "text-fg-3"}`}
                style={{ transitionDelay: approved ? `${120 + i * 140}ms` : "0ms" }}
              >
                <span>{line}</span>
                <span className="text-fg-6">09:43</span>
              </li>
            ))}
          </ul>
        </div>
      </Panel>

      <div className="relative">
        <Record
          p={p}
          mode="settled"
          rulesOff={story.rulesOff}
          flag={approved ? undefined : "total"}
          badge={
            <RecordBadge tone={approved ? "ok" : "wait"}>
              <span className="flex items-center gap-1.5">
                {!approved && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" />}
                {approved ? "Approved" : "Awaiting approval"}
              </span>
            </RecordBadge>
          }
        />
        {/* The approval comes down on the record like a stamp. */}
        {approved && (
          <span
            className="story-stamp pointer-events-none absolute -bottom-5 right-5 rounded-md border-2 border-emerald-500/80 bg-panel/70 px-2.5 py-1 text-[13px] font-extrabold uppercase tracking-[0.14em] text-ok backdrop-blur-sm"
            aria-hidden="true"
          >
            Approved
          </span>
        )}
      </div>
    </div>
  );
}
