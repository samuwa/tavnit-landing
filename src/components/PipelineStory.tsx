"use client";

import Link from "next/link";
import { Fraunces } from "next/font/google";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { animate, motion, useInView, useMotionValue, useMotionValueEvent, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, LogIn, MousePointerClick, Play, RotateCcw, Sparkles, Split } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import ArriveScene, { SOURCE_OPTIONS } from "./story/ArriveScene";
import SortScene from "./story/SortScene";
import ExtractScene from "./story/ExtractScene";
import CleanScene from "./story/CleanScene";
import { RULES } from "./story/Record";
import ReviewScene from "./story/ReviewScene";
import ActScene, { OUTPUTS, SECONDS_PER_OUTPUT } from "./story/ActScene";
import TavnitPro from "./story/TavnitPro";
import FinishedPipeline, { type PipeNode } from "./story/FinishedPipeline";
import { DocToken, Fit, type SceneProps, type SourceId, type Story } from "./story/shared";

/** The display serif of the Tavnit Pro mark (the same face as "Lite"). */
const display = Fraunces({
  subsets: ["latin"],
  weight: ["500"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
  // Three letters, far below the fold: not worth a preload next to the LCP.
  preload: false,
});

/**
 * The product story, told by following one invoice along its whole path:
 * it arrives, is sorted, extracted, cleaned, approved and put to work.
 *
 * It is a tour that plays itself, not a scroll effect. An earlier version
 * tied every animation to the scroll position: it was not obvious that
 * scrolling was the control, and a fast scroll turned the story into a
 * stutter. Here each stop runs on its own clock, at one speed, and moves on
 * to the next; the page scrolls like any other page. The tour only runs
 * while the section is on screen.
 *
 * The rail above the stage is the path, with the invoice travelling along
 * it. It is also the control: click a stop to go there.
 *
 * The tour closes on what the visitor chose, drawn and run as a Pipeline
 * on Tavnit Pro's own canvas (FinishedPipeline).
 *
 * At most stops the visitor can choose what they would use (how the
 * document arrives, which cleaning rules, which destinations) or take part
 * (the lens, the approval). The tour never moves on under someone who is
 * busy with it: while the pointer is over the stage it finishes the stop
 * and waits, and once anything has been touched it waits for Next (which
 * lights up when the stop is done). What they chose is carried to the end,
 * where the tour closes on "the pipeline you just built".
 *
 * One thing stays on stage from extraction to approval: the record. The
 * three stops that work on it draw it in the same spot (and the stage only
 * fades, it does not slide), so the values the visitor watched being read
 * are visibly the ones that get cleaned and then approved.
 *
 * Nothing on stage suggests the reading can be wrong: no confidence scores,
 * no corrected values. The review stop is an approval asked for by the
 * team's own rule.
 *
 * Gradient is kept for one thing, the call to action on the last frame.
 * Every control inside the tour (Next, Approve, the switches) is flat.
 *
 * All copy is real HTML and every stop keeps an id, so the old sections'
 * anchors (#extraction, #human-in-the-loop, #agents) open the matching stop.
 * With reduced motion nothing plays: each stop shows its finished state.
 */

/** The choices alone, without the setters: what the map and the recap read. */
type Chosen = Pick<Story, "source" | "rulesOff" | "outputs">;

type StationDef = {
  id: string;
  label: string;
  /** How long the stop's animation runs before the tour moves on. */
  seconds: number | ((chosen: Chosen) => number);
  title: React.ReactNode;
  body: string;
  points: [string, string][];
  /** What the visitor can do here. */
  hint?: string;
  /** Where to read more. These are also the homepage's links into the docs. */
  links: { href: string; label: string }[];
  /** What this stop contributes to the pipeline, shown under its name on the rail. */
  tag: (chosen: Chosen) => string;
  Scene: (props: SceneProps) => React.ReactNode;
};

const accent = (text: string) => <span className="text-accent-2">{text}</span>;
const sourceLabel = (id: SourceId) => SOURCE_OPTIONS.find((o) => o.id === id)!.label;

const STATIONS: StationDef[] = [
  {
    id: "sources",
    label: "Arrive",
    seconds: 6,
    title: <>It starts wherever your documents {accent("already are")}.</>,
    body: "Forward an email, drop a file, call the API or ask your AI assistant. Every Flow, Collection and Splitter has its own address and its own endpoint.",
    points: [
      ["Email in", "Each attachment becomes a run. Allow-list senders if you need to."],
      ["No-code tools", "Zapier, Make, n8n and Power Automate use the same API and webhooks."],
    ],
    hint: "Choose how the documents arrive.",
    tag: (s) => sourceLabel(s.source),
    links: [
      { href: "/docs/email-integration", label: "Set up email in" },
      { href: "/docs/api-integration", label: "API docs" },
    ],
    Scene: ArriveScene,
  },
  {
    id: "routing",
    label: "Sort",
    seconds: 6,
    title: <>One scan, three documents. Each finds {accent("its flow")}.</>,
    body: "A Splitter works out where one document ends and the next begins, and sends each part to the flow built for it.",
    points: [
      ["No page left behind", "Every page ends up in exactly one document."],
      ["Single files too", "Collections do the same for one document at a time: AI picks the right flow."],
    ],
    tag: () => "Splitter",
    links: [
      { href: "/docs/splitters", label: "About Splitters" },
      { href: "/docs/collections", label: "About Collections" },
    ],
    Scene: SortScene,
  },
  {
    id: "extraction",
    label: "Extract",
    seconds: 7,
    title: <>Any document in. Clean, {accent("structured data")} out.</>,
    body: "Tavnit reads your documents the way a person would: printed text, tables, even the order number written in by hand.",
    points: [
      ["No templates to build", "Create a flow by describing what to capture, in plain language."],
      ["Reads what humans read", "Multi-page PDFs, photos, scans, handwriting and mixed languages."],
    ],
    hint: "Move the lens over the invoice.",
    tag: () => "6 fields",
    links: [
      { href: "https://app.tavnit.io", label: "Create your first flow" },
      { href: "/docs/flows", label: "How flows work" },
    ],
    Scene: ExtractScene,
  },
  {
    id: "cleaning",
    label: "Clean",
    seconds: 6,
    title: <>Cleaned {accent("before it lands")}.</>,
    body: "Cleaners normalize dates and numbers, translate, convert currencies and enrich values before anything is stored.",
    points: [
      ["Your formats, not the document's", "Formatting, categorization, lookups and calculations, applied on every run."],
      ["Matched to your own data", "A vendor name becomes your vendor ID."],
    ],
    hint: "Switch a rule off and watch its value go back.",
    tag: (s) => `${RULES.length - s.rulesOff.size} rules`,
    links: [
      { href: "/docs/cleaners", label: "About Cleaners" },
    ],
    Scene: CleanScene,
  },
  {
    id: "human-in-the-loop",
    label: "Review",
    seconds: 7,
    title: <>AI does the work. Your team has the {accent("final say")}.</>,
    body: "Turn on review for any flow and runs pause before anything moves downstream. Reviewers see the data next to the source and approve with one click.",
    points: [
      ["Review only what needs it", "Pause every run, or only the ones your rules flag."],
      ["Append-only audit trail", "Every view, edit, approval and rejection is recorded. Nothing changes silently."],
    ],
    hint: "Approve it yourself.",
    tag: () => "Approval",
    links: [
      { href: "/docs/human-in-the-loop", label: "How review works" },
    ],
    Scene: ReviewScene,
  },
  {
    id: "agents",
    label: "Act",
    seconds: (c) => Math.max(5, c.outputs.size * SECONDS_PER_OUTPUT),
    title: <>Extraction was step one. Now your data {accent("acts")}.</>,
    body: "Approved data lands in Buckets, fires webhooks, goes out by email, fills PDF forms, or launches a Tavnit Agent that opens a real browser and finishes the job.",
    points: [
      ["Six ways out", "All from the same run, as soon as it is approved."],
      ["Agents where there is no API", "They start when a flow finishes, with the extracted fields as inputs."],
    ],
    hint: "Click a destination to see what it does, or switch more on.",
    tag: (s) => `${s.outputs.size} ${s.outputs.size === 1 ? "output" : "outputs"}`,
    links: [
      { href: "/docs/webhooks", label: "Webhooks" },
      { href: "/docs/agents", label: "Agents" },
      { href: "/integrations", label: "All integrations" },
    ],
    Scene: ActScene,
  },
];

const COUNT = STATIONS.length;

/** How each way in reads on the pipeline's Entry node. */
const ENTRY_DETAIL: Record<SourceId, string> = {
  email: "Forwarded by email",
  upload: "Uploaded in the app",
  api: "POST /splits/run",
  mcp: "From your AI assistant",
};

/** The visitor's choices as a Pipeline: the steps every document takes, then where it goes. */
function pipelineOf(c: Chosen): { chain: PipeNode[]; outputs: PipeNode[] } {
  const source = SOURCE_OPTIONS.find((o) => o.id === c.source)!;
  const rules = RULES.length - c.rulesOff.size;
  return {
    chain: [
      { kind: `Entry · ${source.label}`, title: "Shipment scans", detail: ENTRY_DETAIL[c.source], icon: LogIn },
      { kind: "Splitter", title: "Shipments", detail: "3 document types", icon: Split },
      {
        kind: "Flow",
        title: "Supplier invoices",
        detail: `${rules ? `${rules} ${rules === 1 ? "rule" : "rules"}` : "no rules"} · review on`,
        icon: Sparkles,
      },
    ],
    outputs: OUTPUTS.filter((o) => c.outputs.has(o.id)).map((o) => ({ kind: o.kind, title: o.node, detail: o.does, icon: o.icon })),
  };
}

/** Pause on a finished stop before the tour moves on. */
const HOLD_MS = 1800;
/** Stage transition shared by every stop. */
const STAGE = "col-start-1 row-start-1 transition-opacity duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]";

function toggled(set: ReadonlySet<string>, id: string): ReadonlySet<string> {
  const next = new Set(set);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  return next;
}

function Station({
  index,
  seconds,
  run,
  active,
  running,
  reduced,
  story,
  onProgress,
  onDone,
}: {
  index: number;
  seconds: number;
  /** Changes every time the visitor asks for a stop, so asking for the one on stage plays it again. */
  run: number;
  active: boolean;
  running: boolean;
  reduced: boolean;
  story: Story;
  onProgress: (index: number, value: number) => void;
  onDone: () => void;
}) {
  const s = STATIONS[index];
  // This stop's clock, 0 → 1.
  const p = useMotionValue(0);

  // Coming on stage: start from the top (or, with reduced motion, finished).
  useEffect(() => {
    if (active) p.set(reduced ? 1 : 0);
  }, [active, reduced, run, p]);

  // Run while on stage and on screen; resume from wherever it stopped.
  useEffect(() => {
    if (!active || reduced || !running) return;
    let hold = 0;
    const play = animate(p, 1, {
      duration: (1 - p.get()) * seconds,
      ease: "linear",
      onComplete: () => {
        hold = window.setTimeout(onDone, HOLD_MS);
      },
    });
    return () => {
      play.stop();
      window.clearTimeout(hold);
    };
  }, [active, reduced, running, run, p, seconds, onDone]);

  useMotionValueEvent(p, "change", (v) => {
    if (active) onProgress(index, v);
  });

  const rise = active ? "story-rise" : "";
  const delay = (step: number) => ({ "--d": `${0.04 + step * 0.06}s` }) as React.CSSProperties;

  return (
    <article
      id={s.id}
      inert={!active}
      className={`${STAGE} grid scroll-mt-28 items-start gap-8 self-start lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-14 2xl:gap-20 ${
        active ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      {/* The copy arrives a line at a time when the stop comes on stage. */}
      <div>
        <p className={`mb-3 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-fg-4 2xl:text-sm ${rise}`} style={delay(0)}>
          <span className="font-mono text-accent">0{index + 1}</span>
          <span className="h-px w-6 bg-gradient-to-r from-[#3b82f6] to-[#6c42f0]" aria-hidden />
          {s.label}
        </p>
        <h3 className={`mb-3 text-2xl font-bold leading-tight text-fg md:text-[30px] 2xl:mb-4 2xl:text-[40px] ${rise}`} style={delay(1)}>
          {s.title}
        </h3>
        <p className={`mb-5 max-w-[460px] text-base text-fg-4 2xl:max-w-[560px] 2xl:text-xl ${rise}`} style={delay(2)}>
          {s.body}
        </p>
        <ul className="space-y-3 2xl:space-y-4">
          {s.points.map(([title, desc], i) => (
            <li key={title} className={`flex gap-3 ${rise}`} style={delay(3 + i)}>
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#3b82f6] 2xl:mt-[10px]" aria-hidden />
              <span className="text-sm leading-relaxed text-fg-4 2xl:text-[17px]">
                <strong className="font-semibold text-fg-2">{title}.</strong> {desc}
              </span>
            </li>
          ))}
        </ul>
        {s.hint && (
          <p className={`mt-5 flex items-center gap-2 text-[13px] font-semibold text-accent 2xl:text-base ${rise}`} style={delay(5)}>
            <MousePointerClick size={15} aria-hidden />
            {s.hint}
          </p>
        )}
        <p className={`mt-4 flex flex-wrap gap-x-5 gap-y-2 ${rise}`} style={delay(6)}>
          {s.links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-fg-3 transition-colors hover:text-fg 2xl:text-base"
            >
              {l.label}
              <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          ))}
        </p>
      </div>

      {/* On phones the scene comes first: it is what plays, and it should be
          on screen with the map while it does. */}
      <Fit width={580} max={1.5} className="order-first w-full lg:order-none">
        <s.Scene p={p} story={story} />
      </Fit>
    </article>
  );
}

/** The last frame: what the visitor's choices add up to. */
function Recap({
  active,
  pipeline,
  onReplay,
}: {
  active: boolean;
  pipeline: { chain: PipeNode[]; outputs: PipeNode[] };
  onReplay: () => void;
}) {
  return (
    <div
      inert={!active}
      className={`${STAGE} self-center ${active ? "opacity-100" : "pointer-events-none opacity-0"}`}
    >
      <div className="mx-auto max-w-[1180px] text-center">
        <p className="mb-3 flex items-center justify-center gap-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-fg-4">
          <span className="h-px w-6 bg-gradient-to-r from-[#3b82f6] to-[#6c42f0]" aria-hidden />
          Your pipeline
          <span className="h-px w-6 bg-gradient-to-l from-[#3b82f6] to-[#6c42f0]" aria-hidden />
        </p>
        <h3 className="mx-auto mb-3 max-w-[640px] text-2xl font-bold leading-tight text-fg md:text-[30px] 2xl:max-w-[820px] 2xl:text-[40px]">
          That is the pipeline you just built. Every invoice after this one takes {accent("the same path")}.
        </h3>
        <p className="mx-auto mb-7 max-w-[560px] text-base text-fg-4 2xl:text-lg">
          In Tavnit Pro this is one Pipeline: a single way in, every step in order. Set it up once; from then on it runs by itself.
        </p>

        <FinishedPipeline chain={pipeline.chain} outputs={pipeline.outputs} shown={active} />

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="https://app.tavnit.io"
            className="hero-cta-primary group inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-[15px] font-semibold tracking-[-0.01em] text-white"
          >
            Build it in Tavnit Pro
            <ArrowRight size={16} strokeWidth={2.25} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
          <a
            href="https://demo.tavnit.io"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("cta_click", { cta: "live_demo", location: "story" })}
            className="press inline-flex h-12 items-center justify-center gap-2 rounded-full border border-tint/10 bg-bg/60 px-6 text-[15px] font-semibold tracking-[-0.01em] text-fg-2 backdrop-blur hover:border-tint/25 hover:text-fg"
          >
            <Play size={14} className="fill-current" />
            Try the live demo
          </a>
        </div>
        <button
          type="button"
          onClick={onReplay}
          className="press mt-5 inline-flex cursor-pointer items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold text-fg-4 hover:text-fg"
        >
          <RotateCcw size={14} />
          Watch it again
        </button>
      </div>
    </div>
  );
}

export default function PipelineStory() {
  const section = useRef<HTMLElement>(null);
  const inView = useInView(section, { amount: 0.3 });
  const reduced = useReducedMotion() ?? false;

  // 0 … COUNT - 1 are the stops; COUNT is the closing frame.
  const [active, setActive] = useState(0);
  const [run, setRun] = useState(0);
  // The visitor is exploring the current stop: no moving on without them.
  const touched = useRef(false);

  const [source, setSource] = useState<SourceId>("email");
  const [rulesOff, setRulesOff] = useState<ReadonlySet<string>>(() => new Set());
  const [outputs, setOutputs] = useState<ReadonlySet<string>>(() => new Set(["bucket", "webhook", "agent"]));

  const story = useMemo<Story>(
    () => ({
      source,
      setSource: (id) => {
        touched.current = true;
        setSource(id);
      },
      rulesOff,
      toggleRule: (id) => {
        touched.current = true;
        setRulesOff((prev) => toggled(prev, id));
      },
      outputs,
      toggleOutput: (id) => {
        touched.current = true;
        setOutputs((prev) => toggled(prev, id));
      },
      touch: () => {
        touched.current = true;
      },
    }),
    [source, rulesOff, outputs]
  );

  const chosen: Chosen = { source, rulesOff, outputs };

  // The pointer is over the stage: someone is reading or about to click.
  const hovering = useRef(false);
  const resume = useRef(0);
  // The current stop has finished playing (Next lights up). The ref is for
  // the timers, the state for the button.
  const finished = useRef(false);
  const [done, setDone] = useState(false);
  const mark = useCallback((value: boolean) => {
    finished.current = value;
    setDone(value);
  }, []);

  const go = useCallback(
    (index: number) => {
      touched.current = false;
      window.clearTimeout(resume.current);
      mark(false);
      setRun((n) => n + 1);
      setActive(Math.min(COUNT, Math.max(0, index)));
    },
    [mark]
  );
  const advance = useCallback(() => {
    mark(false);
    setActive((a) => Math.min(COUNT, a + 1));
  }, [mark]);
  const moveOn = useCallback(() => {
    mark(true);
    if (!touched.current && !hovering.current) advance();
  }, [mark, advance]);
  const onStageEnter = useCallback(() => {
    hovering.current = true;
    window.clearTimeout(resume.current);
  }, []);
  const onStageLeave = useCallback(
    (e: React.PointerEvent) => {
      // A finger lifting is not a pointer leaving: on touch, wait for Next.
      if (e.pointerType !== "mouse") return;
      hovering.current = false;
      // A stop that finished while they were looking is owed a move.
      resume.current = window.setTimeout(() => {
        if (finished.current && !touched.current && !hovering.current) advance();
      }, 1200);
    },
    [advance]
  );
  useEffect(() => () => window.clearTimeout(resume.current), []);

  // The map: how far along the whole path the invoice is, 0 → 1.
  const rail = useMotionValue(0);
  useEffect(() => {
    rail.set(active / COUNT);
  }, [active, rail]);
  const onProgress = useCallback((index: number, v: number) => rail.set((index + v) / COUNT), [rail]);
  const along = useSpring(rail, { stiffness: 140, damping: 26 });
  const line = useRef<HTMLDivElement>(null);
  const lineWidth = useMotionValue(0);
  useEffect(() => {
    const el = line.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => lineWidth.set(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, [lineWidth]);
  const tokenX = useTransform(() => along.get() * lineWidth.get());

  // The stage is as tall as the stop on it. Every stop sits in the same
  // grid cell so they can cross-fade, which sizes the cell to the tallest
  // one: the closing frame, almost 300px taller than a stop. That height
  // showed up as an empty band between the story and the next section.
  const stage = useRef<HTMLDivElement>(null);
  const [stageHeight, setStageHeight] = useState<number | null>(null);
  useEffect(() => {
    const el = stage.current?.children[active];
    if (!(el instanceof HTMLElement)) return;
    const ro = new ResizeObserver(() => setStageHeight(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, [active]);

  // #agents and friends open the stop they name.
  useEffect(() => {
    const open = () => {
      const index = STATIONS.findIndex((s) => s.id === window.location.hash.slice(1));
      if (index < 0) return;
      go(index);
      // Show the whole stage, map included, not just the stop's card.
      section.current?.scrollIntoView();
    };
    const first = window.setTimeout(open, 0);
    window.addEventListener("hashchange", open);
    return () => {
      window.clearTimeout(first);
      window.removeEventListener("hashchange", open);
    };
  }, [go]);

  const next = active < COUNT - 1 ? STATIONS[active + 1].label : "Your pipeline";

  return (
    <section ref={section} id="how-it-works" aria-labelledby="how-it-works-heading" className={`relative ${display.variable}`}>
      {/* Depth behind the stage: the brand's light, far back and out of focus. */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute left-[52%] top-[34%] h-[560px] w-[760px] rounded-full bg-[radial-gradient(closest-side,rgba(108,66,240,0.16),rgba(59,130,246,0.07)_55%,transparent)] blur-2xl" />
      </div>

      <div className="relative mx-auto w-full max-w-[1200px] px-4 sm:px-6 2xl:max-w-[1480px] min-[1900px]:max-w-[1680px]">
        <div className="mb-8 text-center md:mb-10">
          <h2 id="how-it-works-heading" className="mb-2 text-3xl font-bold text-fg md:text-4xl 2xl:mb-3 2xl:text-5xl">
            Follow one invoice through <TavnitPro />
          </h2>
          <p className="mx-auto max-w-[600px] text-base text-fg-4 md:text-lg 2xl:max-w-[760px] 2xl:text-xl">
            It plays by itself. At each stop, choose what you would use.
          </p>
        </div>

        {/* The path: where the invoice is, and a way to jump */}
        <div className="mx-auto mb-4 max-w-[780px] px-3 md:mb-5 2xl:max-w-[980px]">
          <div ref={line} className="relative h-[52px] md:h-[66px]">
            <div className="absolute inset-x-0 top-[13px] h-px bg-tint/10" />
            <motion.div
              className="absolute inset-x-0 top-[13px] h-px origin-left bg-gradient-to-r from-[#3b82f6] to-[#6c42f0]"
              style={{ scaleX: along }}
            />
            {STATIONS.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => go(i)}
                aria-current={i === active ? "step" : undefined}
                className="group absolute top-0 -ml-[5px] flex cursor-pointer flex-col items-start gap-1.5 text-left focus-visible:outline-none"
                style={{ left: `${(i / COUNT) * 100}%` }}
              >
                <span className="relative mt-2 block h-[11px] w-[11px]">
                  {i === active && <span className="story-ping absolute inset-0 rounded-full bg-[#3b82f6]" aria-hidden />}
                  <span
                    className={`absolute inset-0 rounded-full border-2 transition-colors duration-200 group-focus-visible:ring-2 group-focus-visible:ring-[#3b82f6]/50 ${
                      i <= active ? "border-[#3b82f6] bg-[#3b82f6]" : "border-tint/20 bg-bg"
                    }`}
                  />
                </span>
                <span
                  className={`text-[11px] font-semibold transition-colors duration-200 sm:text-xs 2xl:text-sm ${
                    i === active ? "text-fg" : "text-fg-5 group-hover:text-fg-3"
                  }`}
                >
                  {s.label}
                </span>
                <span className="-mt-1 hidden max-w-[112px] truncate text-[10.5px] text-fg-5 md:block 2xl:max-w-[140px] 2xl:text-xs">{s.tag(chosen)}</span>
              </button>
            ))}
            <button
              type="button"
              onClick={() => go(COUNT)}
              aria-label="Your pipeline"
              aria-current={active === COUNT ? "step" : undefined}
              className="group absolute right-0 top-0 -mr-[7px] cursor-pointer focus-visible:outline-none"
            >
              <span
                className={`mt-[6px] grid h-[15px] w-[15px] place-items-center rounded-full border-2 transition-colors duration-200 group-focus-visible:ring-2 group-focus-visible:ring-[#3b82f6]/50 ${
                  active === COUNT ? "border-[#3b82f6] bg-[#3b82f6] text-white" : "border-tint/20 bg-bg text-fg-5"
                }`}
              >
                <Check size={9} strokeWidth={3.5} />
              </span>
            </button>
            {/* The invoice, on its way */}
            <motion.div
              className="pointer-events-none absolute left-0 top-0 -ml-[11px] -mt-px drop-shadow-[0_0_10px_rgba(76,99,246,0.65)]"
              style={{ x: tokenX }}
            >
              <DocToken />
            </motion.div>
          </div>
        </div>

        {/* Above the stage, with the map: always in view while a stop plays */}
        <div className={`mx-auto mb-8 flex max-w-[780px] items-center justify-between gap-3 md:mb-10 2xl:mb-12 2xl:max-w-[980px] ${active === COUNT ? "invisible" : ""}`}>
          <button
            type="button"
            onClick={() => go(active - 1)}
            disabled={active === 0}
            className="press inline-flex h-10 cursor-pointer items-center gap-2 rounded-full px-4 text-sm font-semibold text-fg-3 hover:bg-tint/[0.06] hover:text-fg disabled:cursor-default disabled:opacity-0"
          >
            <ArrowLeft size={15} />
            Back
          </button>
          <span className="font-mono text-xs text-fg-5">
            {Math.min(active + 1, COUNT)} / {COUNT}
          </span>
          <button
            type="button"
            onClick={() => go(active + 1)}
            className={`press group inline-flex h-10 cursor-pointer items-center gap-2 rounded-full border px-5 text-sm font-semibold backdrop-blur ${
              done
                ? "border-[#3b82f6]/60 bg-[#3b82f6]/10 text-fg"
                : "border-tint/15 bg-bg/60 text-fg-2 hover:border-[#3b82f6]/50 hover:text-fg"
            }`}
          >
            Next: {next}
            <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* The stage: every stop in the same place, one showing */}
        <div
          ref={stage}
          className="grid transition-[height] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
          style={stageHeight ? { height: stageHeight } : undefined}
          onPointerEnter={onStageEnter}
          onPointerLeave={onStageLeave}
        >
          {STATIONS.map((s, i) => (
            <Station
              key={s.id}
              index={i}
              seconds={typeof s.seconds === "function" ? s.seconds(chosen) : s.seconds}
              run={run}
              active={i === active}
              running={inView}
              reduced={reduced}
              story={story}
              onProgress={onProgress}
              onDone={moveOn}
            />
          ))}
          <Recap active={active === COUNT} pipeline={pipelineOf(chosen)} onReplay={() => go(0)} />
        </div>

      </div>
    </section>
  );
}
