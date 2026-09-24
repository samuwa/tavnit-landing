"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeftRight,
  ArrowRight,
  Bot,
  Layers,
  Upload,
  Webhook,
  GitCompareArrows,
  Mail,
  MessageSquareText,
  Plug,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import type { ToolCopy } from "@/lib/lite/copy";
import type { Locale } from "@/lib/locale";
import { APP_URL } from "@/lib/site";
import { useLiteSession } from "@/components/lite/session";
import Scene from "@/components/lite/Scene";
import { SCENES } from "@/components/lite/scenes";
import { INPUT_SCENES } from "@/components/lite/scenes-in";
import { LogoMark } from "@/components/lite/LogoMark";

/**
 * "And then what?" — drawn, not listed.
 *
 * Appears only once a result exists. The diagram reads left to right: the
 * document the visitor just uploaded, the Tavnit node (the one place the
 * brand gradient appears on a Lite page), and six places the lines can go
 * from there, each line labelled with how. Connectors draw themselves on
 * arrival; reduced-motion users get the finished drawing. Below the sm
 * breakpoint the SVG would be too small to read, so a vertical version
 * with the same items takes over.
 */

const ICONS = [Mail, Plug, UserCheck, GitCompareArrows, ShieldCheck, Bot, MessageSquareText];

const W = 960;
const H = 400;
const PILL_X = 640;
const PILL_W = 296;
const PILL_H = 42;
const PILL_GAP = 54;
const PILL_Y0 = 14;
const NODE = { x: 411, y: 159, w: 82, h: 82 };
const DOC = { x: 24, y: 130, w: 160, h: 140 };
/** With inputs shown, the document narrows and slides right to make room
 *  for five roomy input pills; the arrow to Tavnit stays long enough. */
const DOC_W_COMPACT = 112;
const IN_X = 16;
const IN_W = 172;
const IN_H = 44;
const IN_GAP = 12;
const DOC_X_COMPACT = IN_X + IN_W + 42;
const DOC_SHIFT = DOC_X_COMPACT - DOC.x;
const INPUT_ICONS = [Mail, Upload, Webhook, ArrowLeftRight, Layers];
const SPRING = { type: "spring", stiffness: 220, damping: 26 } as const;

export default function WhatNext({
  copy,
  locale,
  fileName,
  rows,
  compact = false,
  heading,
  lead,
}: {
  copy: ToolCopy["next"];
  locale: Locale;
  fileName: string;
  rows: number;
  /** Diagram and buttons only (used inside the post-download dialog). */
  compact?: boolean;
  /** Override the heading and lead (the dialog has its own). */
  heading?: string;
  lead?: string;
}) {
  const demoHref = locale === "es" ? "/es/agendar" : "/schedule";
  const shortName = fileName.length > 22 ? `${fileName.slice(0, 20)}…` : fileName;
  const { email } = useLiteSession();
  const [active, setActive] = useState<number | null>(null);
  const [activeInput, setActiveInput] = useState<number | null>(null);
  const [playKey, setPlayKey] = useState(0);
  const [showInputs, setShowInputs] = useState(false);
  const chooseInput = (i: number) => {
    setActive(null);
    setActiveInput(i);
    setPlayKey((k) => k + 1);
  };
  const docX = showInputs ? DOC.x + DOC_SHIFT : DOC.x;
  const docW = showInputs ? DOC_W_COMPACT : DOC.w;
  const docLabel = showInputs ? (fileName.length > 12 ? `${fileName.slice(0, 11)}…` : fileName) : shortName;
  const inputsY0 = NODE.y + NODE.h / 2 - (copy.inputs.items.length * IN_H + (copy.inputs.items.length - 1) * IN_GAP) / 2;
  const choose = (i: number) => {
    setActiveInput(null);
    setActive(i);
    setPlayKey((k) => k + 1);
  };

  return (
    <section aria-labelledby="lite-next-heading" className="lite-pop">
      <div className="max-w-[620px]">
        <h2 id="lite-next-heading" className={`lite-display ${compact ? "text-2xl sm:text-3xl" : "text-3xl sm:text-4xl"}`}>
          {heading ?? copy.heading}
        </h2>
        <p className="mt-3 text-base leading-relaxed text-[var(--lite-muted)]">{lead ?? copy.lead}</p>
      </div>

      {/* Desktop / tablet: the diagram */}
      <div className="lite-sheet mt-8 hidden overflow-hidden rounded-2xl border border-[var(--lite-line)] bg-[var(--lite-white)] sm:block">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto w-full"
          role="img"
          aria-label={`${copy.source} → ${copy.node} → ${copy.items.map((i) => i.short).join(", ")}`}
        >
          <defs>
            <marker id="lite-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" fill="var(--lite-blue)" />
            </marker>
            <pattern id="lite-dots" width="16" height="16" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="var(--lite-rule)" />
            </pattern>
            {/* the chip: graphite body, a soft top sheen, a blue glow behind the mark */}
            <linearGradient id="lite-chip" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#262c31" />
              <stop offset="1" stopColor="#15191c" />
            </linearGradient>
            <linearGradient id="lite-chip-sheen" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffffff" stopOpacity="0.10" />
              <stop offset="0.5" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
            <filter id="lite-chip-shadow" x="-30%" y="-30%" width="160%" height="170%">
              <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#1c2321" floodOpacity="0.25" />
            </filter>
          </defs>

          <rect x="0" y="0" width={W} height={H} fill="url(#lite-dots)" />

          {/* connectors: Tavnit → outcomes, labelled with how */}
          {copy.items.map((item, i) => {
            const y = PILL_Y0 + i * PILL_GAP + PILL_H / 2;
            const x0 = NODE.x + NODE.w;
            const y0 = NODE.y + NODE.h / 2;
            const d = `M${x0},${y0} C${x0 + 44},${y0} ${PILL_X - 44},${y} ${PILL_X},${y}`;
            // Label sits on the curve at t = 0.62, where the lines have fanned apart.
            const t = 0.62;
            const mt = 1 - t;
            const lx = mt ** 3 * x0 + 3 * mt ** 2 * t * (x0 + 44) + 3 * mt * t ** 2 * (PILL_X - 44) + t ** 3 * PILL_X;
            const ly = mt ** 3 * y0 + 3 * mt ** 2 * t * y0 + 3 * mt * t ** 2 * y + t ** 3 * y;
            return (
              <g key={item.short}>
                <path
                  d={d}
                  fill="none"
                  stroke="var(--lite-blue)"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  className="lite-draw"
                  style={{ animationDelay: `${300 + i * 90}ms` }}
                />
                <text
                  x={lx}
                  y={ly + 3.5}
                  textAnchor="middle"
                  fontSize="10.5"
                  fill="var(--lite-muted)"
                  fontFamily="var(--font-body)"
                  stroke="var(--lite-white)"
                  strokeWidth="5"
                  paintOrder="stroke"
                  className="lite-pop"
                  style={{ animationDelay: `${700 + i * 90}ms` }}
                >
                  {item.via}
                </text>
              </g>
            );
          })}

          {/* inputs → document, when shown */}
          <AnimatePresence>
            {showInputs &&
              copy.inputs.items.map((item, i) => {
                const y = inputsY0 + i * (IN_H + IN_GAP) + IN_H / 2;
                const x0 = IN_X + IN_W;
                const x1 = docX;
                const yc = DOC.y + DOC.h / 2;
                const Icon = INPUT_ICONS[i % INPUT_ICONS.length];
                const on = activeInput === i;
                return (
                  <motion.g
                    key={item.short}
                    role="button"
                    tabIndex={0}
                    aria-pressed={on}
                    aria-label={item.short}
                    onClick={() => chooseInput(i)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        chooseInput(i);
                      }
                    }}
                    className="cursor-pointer outline-none [&:hover>rect:nth-child(2)]:stroke-[var(--lite-blue)] focus-visible:[&>rect:nth-child(2)]:stroke-[var(--lite-blue)]"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ ...SPRING, delay: i * 0.05 }}
                  >
                    <path
                      d={`M${x0},${y} C${x0 + 18},${y} ${x1 - 18},${yc} ${x1},${yc}`}
                      fill="none"
                      stroke="var(--lite-blue)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      opacity="0.7"
                    />
                    <rect
                      x={IN_X}
                      y={y - IN_H / 2}
                      width={IN_W}
                      height={IN_H}
                      rx="11"
                      fill={on ? "var(--lite-blue-soft)" : "var(--lite-white)"}
                      stroke={on ? "var(--lite-blue)" : "var(--lite-line)"}
                      strokeWidth={on ? 1.5 : 1}
                      style={{ transition: "fill .2s, stroke .2s" }}
                    />
                    <rect x={IN_X + 8} y={y - 13} width={26} height={26} rx="7" fill={on ? "var(--lite-blue)" : "var(--lite-blue-soft)"} style={{ transition: "fill .2s" }} />
                    <Icon x={IN_X + 13} y={y - 8} width={16} height={16} stroke={on ? "#ffffff" : "var(--lite-blue)"} />
                    <text x={IN_X + 42} y={y - 2} fontSize="12" fontWeight="600" fill="var(--lite-ink)" fontFamily="var(--font-heading)">
                      {item.short}
                    </text>
                    <text x={IN_X + 42} y={y + 11} fontSize="9.5" fill="var(--lite-muted)" fontFamily="var(--font-body)">
                      {item.via}
                    </text>
                  </motion.g>
                );
              })}
          </AnimatePresence>

          {/* document → Tavnit */}
          <path
            d={`M${docX + docW},${DOC.y + DOC.h / 2} H${NODE.x - 4}`}
            style={{ transition: "d 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)" }}
            fill="none"
            stroke="var(--lite-blue)"
            strokeWidth="1.75"
            strokeLinecap="round"
            markerEnd="url(#lite-arrow)"
            className="lite-draw"
          />

          {/* the document (slides right when the inputs are shown) */}
          {/* outer group carries the slide; the entrance animation lives on the
              inner one, because its fill-mode would otherwise pin transform: none */}
          <g
            style={{
              transform: `translateX(${showInputs ? DOC_SHIFT : 0}px)`,
              transition: "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
            }}
          >
          <g className="lite-pop" style={{ transition: "all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)" }}>
            <rect x={DOC.x} y={DOC.y} width={docW} height={DOC.h} rx="12" fill="var(--lite-white)" stroke="var(--lite-line)" style={{ transition: "width 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)" }} />
            <rect x={DOC.x + 16} y={DOC.y + 18} width={docW - 32} height="14" rx="3" fill="var(--lite-blue-soft)" style={{ transition: "width 0.5s" }} />
            {[0, 1, 2, 3].map((r) => (
              <g key={r}>
                <rect x={DOC.x + 16} y={DOC.y + 44 + r * 18} width={docW - 32} height="10" rx="2" fill="var(--lite-rule)" style={{ transition: "width 0.5s" }} />
                <rect x={DOC.x + 16} y={DOC.y + 44 + r * 18} width={Math.min(70 - r * 8, docW - 40)} height="10" rx="2" fill="var(--lite-line)" style={{ transition: "width 0.5s" }} />
              </g>
            ))}
            <text x={DOC.x + docW / 2} y={DOC.y + DOC.h - 12} textAnchor="middle" fontSize={showInputs ? 10.5 : 12} fill="var(--lite-muted)" fontFamily="var(--font-body)">
              {docLabel} · {rows}
            </text>
            <text x={DOC.x + docW / 2} y={DOC.y - 14} textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--lite-ink)" fontFamily="var(--font-heading)">
              {copy.source}
            </text>
          </g>
          </g>

          {/* Tavnit node: a compact graphite chip with the T in white; name and
              role beneath. Flat and quiet, no gradient of the brand. */}
          <g className="lite-pop" style={{ animationDelay: "150ms" }}>
            {Array.from({ length: 5 }).map((_, i) => {
              const px = NODE.x + 13 + i * ((NODE.w - 26) / 4) - 2.5;
              return (
                <g key={i}>
                  <rect x={px} y={NODE.y - 6} width="5" height="8" rx="1.5" fill="#b9c1c8" />
                  <rect x={px} y={NODE.y + NODE.h - 2} width="5" height="8" rx="1.5" fill="#b9c1c8" />
                </g>
              );
            })}
            <rect x={NODE.x} y={NODE.y} width={NODE.w} height={NODE.h} rx="18" fill="url(#lite-chip)" filter="url(#lite-chip-shadow)" />
            <rect x={NODE.x} y={NODE.y} width={NODE.w} height={NODE.h} rx="18" fill="url(#lite-chip-sheen)" />
            <rect x={NODE.x + 1} y={NODE.y + 1} width={NODE.w - 2} height={NODE.h - 2} rx="17" fill="none" stroke="#ffffff" strokeOpacity="0.14" />
            <rect x={NODE.x + 9} y={NODE.y + 9} width={NODE.w - 18} height={NODE.h - 18} rx="11" fill="none" stroke="#ffffff" strokeOpacity="0.07" />
            {/* the mark, in white: the logo's T silhouette */}
            <svg
              x={NODE.x + NODE.w / 2 - 15}
              y={NODE.y + NODE.h / 2 - 17}
              width={30}
              height={34}
              viewBox="0 0 390 444"
              style={{ filter: "brightness(0) invert(1)" }}
              aria-hidden
            >
              <image href="/assets/tavnit_logo.png" width={1287} height={444} preserveAspectRatio="xMinYMin meet" />
            </svg>
            <text x={NODE.x + NODE.w / 2} y={NODE.y + NODE.h + 26} textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--lite-ink)" fontFamily="var(--font-heading)">
              {copy.node}
            </text>
            <text x={NODE.x + NODE.w / 2} y={NODE.y + NODE.h + 41} textAnchor="middle" fontSize="11" fill="var(--lite-muted)" fontFamily="var(--font-body)">
              {copy.nodeSub}
            </text>
          </g>

          {/* outcomes */}
          {copy.items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            const y = PILL_Y0 + i * PILL_GAP;
            const on = active === i;
            return (
              <g
                key={item.short}
                role="button"
                tabIndex={0}
                aria-pressed={on}
                aria-label={item.short}
                onClick={() => choose(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    choose(i);
                  }
                }}
                className="lite-pop cursor-pointer outline-none [&:hover>rect:first-child]:stroke-[var(--lite-blue)] focus-visible:[&>rect:first-child]:stroke-[var(--lite-blue)]"
                style={{ animationDelay: `${450 + i * 90}ms` }}
              >
                <rect
                  x={PILL_X}
                  y={y}
                  width={PILL_W}
                  height={PILL_H}
                  rx="12"
                  fill={on ? "var(--lite-blue-soft)" : "var(--lite-white)"}
                  stroke={on ? "var(--lite-blue)" : "var(--lite-line)"}
                  strokeWidth={on ? 1.5 : 1}
                  style={{ transition: "fill .2s, stroke .2s" }}
                />
                <rect x={PILL_X + 7} y={y + 7} width={28} height={28} rx="8" fill={on ? "var(--lite-blue)" : "var(--lite-blue-soft)"} style={{ transition: "fill .2s" }} />
                <Icon x={PILL_X + 12} y={y + 12} width={18} height={18} stroke={on ? "#ffffff" : "var(--lite-blue)"} />
                <text x={PILL_X + 46} y={y + 26} fontSize="14.5" fontWeight="600" fill="var(--lite-ink)" fontFamily="var(--font-heading)">
                  {item.short}
                </text>
              </g>
            );
          })}
        </svg>
        <div className="flex items-center justify-between gap-3 border-t border-[var(--lite-line)] px-5 py-2 text-xs text-[var(--lite-muted)]">
          <span>{copy.hint}</span>
          <button
            type="button"
            onClick={() => {
              setShowInputs((v) => !v);
              if (showInputs) setActiveInput(null);
            }}
            aria-pressed={showInputs}
            className="lite-press inline-flex min-h-8 cursor-pointer items-center gap-1.5 rounded-md border border-[var(--lite-line)] bg-white px-2.5 text-xs font-semibold text-[var(--lite-ink)] transition-colors hover:border-[var(--lite-blue)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lite-blue)]/50"
          >
            <ArrowLeftRight size={12} className="text-[var(--lite-blue)]" aria-hidden />
            {showInputs ? copy.inputs.hide : copy.inputs.show}
          </button>
        </div>
      </div>

      {/* Phones: same content, stacked */}
      <div className="lite-sheet mt-8 rounded-2xl border border-[var(--lite-line)] bg-[var(--lite-white)] p-4 sm:hidden">
        {showInputs && (
          <ul className="mb-3 space-y-1 border-l-2 border-[var(--lite-line)] pl-2 text-xs text-[var(--lite-muted)]">
            {copy.inputs.items.map((it, i) => (
              <li key={it.short}>
                <button
                  type="button"
                  onClick={() => chooseInput(i)}
                  aria-pressed={activeInput === i}
                  className={`w-full min-h-9 cursor-pointer rounded-md px-2 text-left transition-colors ${activeInput === i ? "bg-[var(--lite-blue-soft)]" : "hover:bg-[#f6f8fb]"}`}
                >
                  <span className="font-semibold text-[var(--lite-ink)]">{it.short}</span> · {it.via}
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="flex items-center gap-3 text-sm">
          <span className="rounded-lg border border-[var(--lite-line)] px-3 py-2 font-semibold">{copy.source}</span>
          <ArrowRight size={16} className="text-[var(--lite-blue)]" aria-hidden />
          <span className="inline-flex items-center gap-2 font-semibold">
            <span className="grid h-9 w-9 place-items-center rounded-[10px] border border-white/10 bg-gradient-to-b from-[#262c31] to-[#15191c] shadow-md shadow-[#1c2321]/25">
              <LogoMark size={18} className="[filter:brightness(0)_invert(1)]" />
            </span>
            {copy.node}
          </span>
        </div>
        <ul className="mt-4 space-y-2 border-l-2 border-[var(--lite-blue)] pl-4">
          {copy.items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            const on = active === i;
            return (
              <li key={item.short}>
                <button
                  type="button"
                  onClick={() => choose(i)}
                  aria-pressed={on}
                  className={`flex w-full min-h-11 cursor-pointer items-center gap-3 rounded-lg px-2 text-left text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lite-blue)]/50 ${
                    on ? "bg-[var(--lite-blue-soft)]" : "hover:bg-[#f6f8fb]"
                  }`}
                >
                  <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${on ? "bg-[var(--lite-blue)] text-white" : "bg-[var(--lite-blue-soft)] text-[var(--lite-blue)]"}`}>
                    <Icon size={16} aria-hidden />
                  </span>
                  <span>
                    {item.short}
                    <span className="ml-2 text-xs font-normal text-[var(--lite-muted)]">{item.via}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        <div className="mt-3 flex items-center justify-between gap-2 text-xs text-[var(--lite-muted)]">
          <span>{copy.hint}</span>
          <button type="button" onClick={() => setShowInputs((v) => !v)} aria-pressed={showInputs} className="cursor-pointer font-semibold text-[var(--lite-blue-ink)] hover:underline">
            {showInputs ? copy.inputs.hide : copy.inputs.show}
          </button>
        </div>
      </div>

      {active !== null && (
        <Scene
          Stage={SCENES[active % SCENES.length]}
          item={copy.items[active]}
          copy={copy}
          playKey={playKey}
          onReplay={() => setPlayKey((k) => k + 1)}
        />
      )}
      {activeInput !== null && (
        <Scene
          Stage={INPUT_SCENES[activeInput % INPUT_SCENES.length]}
          item={copy.inputs.items[activeInput]}
          copy={copy}
          playKey={playKey}
          onReplay={() => setPlayKey((k) => k + 1)}
        />
      )}

      {/* The detail behind each line, for whoever wants it */}
      {!compact && (
      <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
        {copy.items.map((item) => (
          <li key={item.title} className="text-sm leading-relaxed">
            <span className="font-semibold">{item.title}.</span>{" "}
            <span className="text-[var(--lite-muted)]">{item.body}</span>{" "}
            <Link href={item.href} className="whitespace-nowrap font-medium text-[var(--lite-blue-ink)] hover:underline">
              {item.linkLabel}
            </Link>
          </li>
        ))}
      </ul>
      )}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href={APP_URL}
          className="lite-brand lite-press inline-flex min-h-12 items-center justify-center rounded-lg px-6 font-semibold text-white shadow-md shadow-[#3b82f6]/25 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lite-blue)]/50"
        >
          {email ? copy.primarySignedIn : copy.primary}
        </Link>
        <Link
          href={demoHref}
          className="lite-press inline-flex min-h-12 items-center justify-center rounded-lg border border-[var(--lite-line)] bg-[var(--lite-white)] px-6 font-semibold transition-colors hover:border-[var(--lite-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lite-blue)]/50"
        >
          {copy.secondary}
        </Link>
      </div>
      {email && (
        <p className="mt-3 text-sm text-[var(--lite-muted)]">{copy.sameLogin.replace("{email}", email)}</p>
      )}
    </section>
  );
}
