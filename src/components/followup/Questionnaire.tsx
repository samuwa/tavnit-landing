"use client";

/**
 * Post-meeting questionnaire — one question at a time, branching per the sales
 * flowchart in src/lib/followup/flow.ts.
 *
 * Signature element: while the client answers, their answers assemble into a
 * live "registro estructurado" panel — the same document→structured-record
 * metaphor the homepage hero animates. The form quietly demos the product on
 * the prospect's own words, and doubles as the progress indicator (no
 * percentage bar needed: progress is the record filling up).
 *
 * Bilingual: Spanish by default (clients are in Panama today), with an ES/EN
 * toggle in the header. The sales rep picks the starting language per link.
 *
 * Every answer is POSTed as it happens, so a client who abandons halfway still
 * leaves sales their sentiment and partial answers.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CalendarCheck,
  Check,
  ChevronRight,
  CircleSlash,
  Clock,
  Compass,
  FileCheck,
  FileUp,
  Inbox,
  Layers,
  ListChecks,
  Loader2,
  Lock,
  MessageCircle,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import {
  FIRST_STEP,
  STEPS,
  type Lang,
  type Step,
  formatAnswer,
  nextStep,
  stepsRemaining,
  tr,
} from "@/lib/followup/flow";
import { UI } from "@/lib/followup/i18n";

const ICONS: Record<string, typeof Sparkles> = {
  sparkles: Sparkles,
  compass: Compass,
  "circle-slash": CircleSlash,
  "file-check": FileCheck,
  clock: Clock,
  users: Users,
  "message-circle": MessageCircle,
  layers: Layers,
  inbox: Inbox,
};

type UploadedFile = { name: string; size: number };

/**
 * Post-completion hook: route the prospect to the use-case page closest to
 * what they told us they handle, so interest survives until the next meeting.
 */
const USE_CASE_LINKS: Record<string, string> = {
  invoices: "/use-cases/invoice-processing",
  customs: "/use-cases/customs-trade",
  contracts: "/use-cases/contract-analysis",
  bank: "/use-cases/bank-statements",
  hr: "/use-cases/resume-screening",
  orders: "/use-cases/purchase-orders",
};

type Props = {
  token: string;
  clientName: string;
  company: string | null;
  lang: Lang;
  /** The assigned sales rep's inbox — shown for uploads and the mailto CTA. */
  salesEmail: string;
  schedulerUrl: string | null;
  initialAnswers: Record<string, unknown>;
  alreadyCompleted: boolean;
};

export default function Questionnaire({
  token,
  clientName,
  company,
  lang: initialLang,
  salesEmail,
  schedulerUrl,
  initialAnswers,
  alreadyCompleted,
}: Props) {
  const [lang, setLang] = useState<Lang>(initialLang);
  const [screen, setScreen] = useState<"welcome" | "step" | "done">(
    alreadyCompleted ? "done" : "welcome",
  );
  const [stepId, setStepId] = useState(FIRST_STEP);
  const [answers, setAnswers] = useState<Record<string, unknown>>(initialAnswers);
  const [history, setHistory] = useState<string[]>([]);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const t = UI[lang];

  const send = useCallback(
    (payload: Record<string, unknown>) => {
      // Fire-and-forget: a lost event should never block the client's flow.
      fetch(`/api/followup/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {});
    },
    [token],
  );

  useEffect(() => {
    send({ type: "opened" });
  }, [send]);

  const commit = useCallback(
    (step: Step, value: unknown) => {
      const updated = { ...answers, [step.id]: value };
      setAnswers(updated);
      if (value !== undefined) send({ type: "answer", step: step.id, value });
      const next = nextStep(step.id, updated);
      if (next === "end") {
        send({ type: "complete" });
        setScreen("done");
      } else {
        setHistory((h) => [...h, step.id]);
        setStepId(next);
      }
    },
    [answers, send],
  );

  const goBack = useCallback(() => {
    setHistory((h) => {
      if (h.length === 0) return h;
      setStepId(h[h.length - 1]);
      return h.slice(0, -1);
    });
  }, []);

  const answeredEntries = useMemo(
    () =>
      Object.entries(answers)
        .filter(([id, v]) => STEPS[id]?.recordLabel && v !== undefined && v !== "")
        .map(([id, v]) => ({
          id,
          label: tr(STEPS[id].recordLabel, lang),
          value: formatAnswer(id, v, lang),
        })),
    [answers, lang],
  );

  const step = STEPS[stepId];
  const remaining = screen === "step" ? stepsRemaining(stepId) : 0;

  return (
    <MotionConfig reducedMotion="user">
      {/* Quiet chrome: brand, language, expectation. The page has one job. */}
      <header className="relative z-10 flex items-center justify-between px-6 sm:px-10 py-5">
        <Link href="/" className="hover:opacity-85 transition-opacity">
          <Image src="/assets/tavnit_logo.png" alt="Tavnit" width={110} height={28} className="h-7 w-auto" />
        </Link>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-xs text-slate-500 font-medium tracking-wide">
            {t.lessThanAMinute}
          </span>
          <LangToggle lang={lang} onChange={setLang} />
        </div>
      </header>

      <main className="flex-1 flex items-start lg:items-center justify-center px-6 sm:px-10 pb-16 pt-6 lg:pt-0">
        {/* Ambient brand atmosphere, kept faint so the question owns the page.
            Radial gradients instead of blurred divs: same glow, no filter
            rasterization artifacts, cheaper to composite. */}
        <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
          <div
            className="absolute -top-40 -left-40 w-[640px] h-[640px]"
            style={{ background: "radial-gradient(circle, rgba(59,130,246,0.13), transparent 70%)" }}
          />
          <div
            className="absolute -bottom-40 -right-40 w-[580px] h-[580px]"
            style={{ background: "radial-gradient(circle, rgba(108,66,240,0.13), transparent 70%)" }}
          />
        </div>

        <div className="relative w-full max-w-6xl grid lg:grid-cols-[minmax(0,1fr)_400px] gap-12 xl:gap-16 items-start">
          <div className="min-h-[420px] flex flex-col justify-center">
            {/* Exactly one direct motion child whose key changes per screen —
                custom wrapper components stall mode="wait" exit tracking. */}
            <AnimatePresence mode="wait">
              <motion.div
                key={screen === "step" ? stepId : screen}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
              >
              {screen === "welcome" && (
                <div>
                  <p className="text-sm font-semibold tracking-widest uppercase text-[#3b82f6] mb-4">
                    {t.welcomeKicker(company)}
                  </p>
                  <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-slate-100 leading-tight mb-6">
                    {t.welcomeTitle(clientName)[0]}
                    <span className="gradient-text">{t.welcomeTitle(clientName)[1]}</span>
                    {t.welcomeTitle(clientName)[2]}
                  </h1>
                  <p className="text-lg text-slate-400 leading-relaxed mb-10 max-w-xl">
                    {t.welcomeBody1}
                    <span className="text-slate-200 font-medium">{t.welcomeBodyEmphasis}</span>
                    {t.welcomeBody2}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5 mb-10 text-sm text-slate-400">
                    <span className="inline-flex items-center gap-2">
                      <Clock size={15} className="text-[#3b82f6]" aria-hidden />
                      {t.lessThanAMinute}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <ListChecks size={15} className="text-[#3b82f6]" aria-hidden />
                      {t.metaQuestions}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <Lock size={15} className="text-[#3b82f6]" aria-hidden />
                      {t.metaPrivate}
                    </span>
                  </div>
                  <PrimaryButton onClick={() => setScreen("step")}>
                    {t.start}
                    <ArrowRight size={18} />
                  </PrimaryButton>
                </div>
              )}

              {screen === "step" && (
                <div>
                  {/* Question header: thin progress track, question number,
                      remaining hint, back — one calm line of metadata. */}
                  <div className="mb-8 max-w-2xl">
                    <div className="h-0.5 rounded-full bg-white/[0.07] mb-5 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] transition-[width] duration-500 ease-out"
                        style={{
                          width: `${Math.max(6, Math.round((history.length / (history.length + remaining)) * 100))}%`,
                        }}
                      />
                    </div>
                    <div className="flex items-baseline gap-3 text-xs">
                      <span className="font-heading font-bold tracking-[0.14em] uppercase text-[#3b82f6]">
                        {t.questionLabel(history.length + 1)}
                      </span>
                      <span className="font-medium text-slate-500">
                        {remaining === 1 ? t.lastQuestion : t.remaining(remaining)}
                      </span>
                      {history.length > 0 && (
                        <button
                          type="button"
                          onClick={goBack}
                          className="ml-auto flex items-center gap-1 font-medium text-slate-400 hover:text-slate-200 transition-colors cursor-pointer rounded focus-visible:outline-2 focus-visible:outline-[#3b82f6]"
                        >
                          <ArrowLeft size={13} />
                          {t.back}
                        </button>
                      )}
                    </div>
                  </div>
                  <h2 className="font-heading text-2xl sm:text-[2rem] font-bold text-slate-100 leading-snug mb-3">
                    {tr(step.title, lang)}
                  </h2>
                  {step.subtitle ? (
                    <p className="text-slate-400 leading-relaxed mb-8 max-w-xl">
                      {tr(step.subtitle, lang).replace("{email}", salesEmail)}
                    </p>
                  ) : (
                    <div className="mb-8" />
                  )}

                  <StepInput
                    key={stepId}
                    step={step}
                    lang={lang}
                    token={token}
                    salesEmail={salesEmail}
                    initialValue={answers[step.id]}
                    files={files}
                    setFiles={setFiles}
                    onCommit={(value) => commit(step, value)}
                  />
                </div>
              )}

              {screen === "done" && (
                <DoneScreen
                  clientName={clientName}
                  lang={lang}
                  salesEmail={salesEmail}
                  sentiment={String(answers.sentiment ?? "")}
                  answers={answers}
                  schedulerUrl={schedulerUrl}
                />
              )}
              </motion.div>
            </AnimatePresence>
          </div>

          <RecordPanel
            clientName={clientName}
            company={company}
            lang={lang}
            entries={answeredEntries}
            fileCount={files.length}
            pendingRows={screen === "done" ? 0 : Math.max(remaining, screen === "welcome" ? 3 : 0)}
            done={screen === "done"}
          />
        </div>
      </main>
    </MotionConfig>
  );
}

function LangToggle({ lang, onChange }: { lang: Lang; onChange: (l: Lang) => void }) {
  return (
    <div
      className="flex items-center rounded-full border border-white/10 bg-white/[0.04] p-0.5 text-xs font-semibold"
      role="group"
      aria-label="Idioma / Language"
    >
      {(["es", "en"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => onChange(code)}
          aria-pressed={lang === code}
          className={`px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#3b82f6] ${
            lang === code
              ? "bg-[#3b82f6]/20 text-slate-100 shadow-[0_0_12px_rgba(59,130,246,0.2)]"
              : "text-slate-500 hover:text-slate-300"
          }`}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

/* ────────────────────────── screens & inputs ────────────────────────── */

function StepInput({
  step,
  lang,
  token,
  salesEmail,
  initialValue,
  files,
  setFiles,
  onCommit,
}: {
  step: Step;
  lang: Lang;
  token: string;
  salesEmail: string;
  initialValue: unknown;
  files: UploadedFile[];
  setFiles: React.Dispatch<React.SetStateAction<UploadedFile[]>>;
  onCommit: (value: unknown) => void;
}) {
  switch (step.kind) {
    case "choice":
      return <ChoiceInput step={step} lang={lang} onCommit={onCommit} />;
    case "chips":
      return <ChipsInput step={step} lang={lang} initialValue={initialValue} onCommit={onCommit} />;
    case "text":
      return <TextInput step={step} lang={lang} initialValue={initialValue} onCommit={onCommit} />;
    case "date":
      return <DateInput step={step} lang={lang} initialValue={initialValue} onCommit={onCommit} />;
    case "upload":
      return (
        <UploadInput
          lang={lang}
          token={token}
          salesEmail={salesEmail}
          files={files}
          setFiles={setFiles}
          onCommit={onCommit}
        />
      );
    default:
      return null;
  }
}

function ChoiceInput({
  step,
  lang,
  onCommit,
}: {
  step: Step;
  lang: Lang;
  onCommit: (v: unknown) => void;
}) {
  const options = step.options ?? [];

  // Desktop nicety: press 1/2/3 to pick an option. The kbd badges advertise it.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
      const index = Number(e.key) - 1;
      if (Number.isInteger(index) && index >= 0 && index < options.length) {
        onCommit(options[index].value);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [options, onCommit]);

  return (
    <div className="flex flex-col gap-3.5 max-w-2xl">
      {step.options?.map((opt, i) => {
        const Icon = opt.icon ? ICONS[opt.icon] : undefined;
        return (
          <motion.button
            key={opt.value}
            type="button"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 * i, duration: 0.25 }}
            onClick={() => onCommit(opt.value)}
            className="glass-card glass-card-hover group flex items-center gap-4 rounded-2xl px-6 py-5 text-left transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#3b82f6] hover:-translate-y-px"
          >
            {Icon && (
              <span className="shrink-0 w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-[#3b82f6] group-hover:border-[#3b82f6]/40 group-hover:bg-[#3b82f6]/10 transition-colors">
                <Icon size={20} />
              </span>
            )}
            <span className="min-w-0">
              <span className="block font-medium text-slate-100">{tr(opt.label, lang)}</span>
              {opt.hint && (
                <span className="block text-sm text-slate-400 mt-0.5">{tr(opt.hint, lang)}</span>
              )}
            </span>
            {/* One slot at the far right: the number hint gives way to the
                directional chevron on hover. */}
            <span className="relative ml-auto shrink-0 w-6 h-6 hidden sm:block" aria-hidden>
              <kbd className="absolute inset-0 flex items-center justify-center rounded-md border border-white/10 bg-white/[0.04] text-[11px] font-medium text-slate-500 group-hover:opacity-0 transition-opacity duration-200">
                {i + 1}
              </kbd>
              <ChevronRight
                size={18}
                className="absolute inset-0 m-auto text-[#3b82f6] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
              />
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}

function ChipsInput({
  step,
  lang,
  initialValue,
  onCommit,
}: {
  step: Step;
  lang: Lang;
  initialValue: unknown;
  onCommit: (v: unknown) => void;
}) {
  const t = UI[lang];
  const [selected, setSelected] = useState<string[]>(
    Array.isArray(initialValue) ? (initialValue as string[]) : [],
  );

  const toggle = (value: string) => {
    if (!step.multi) return onCommit(value);
    setSelected((s) => (s.includes(value) ? s.filter((v) => v !== value) : [...s, value]));
  };

  return (
    <div className="max-w-2xl">
      <div className="flex flex-wrap gap-3 mb-8">
        {step.options?.map((opt, i) => {
          const active = selected.includes(opt.value);
          return (
            <motion.button
              key={opt.value}
              type="button"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.04 * i, duration: 0.2 }}
              onClick={() => toggle(opt.value)}
              aria-pressed={active}
              className={`px-5 py-3 rounded-full border text-sm font-medium transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#3b82f6] ${
                active
                  ? "border-[#3b82f6]/60 bg-[#3b82f6]/15 text-slate-100 shadow-[0_0_16px_rgba(59,130,246,0.25)]"
                  : "border-white/10 bg-white/[0.04] text-slate-300 hover:border-white/25 hover:bg-white/[0.07]"
              }`}
            >
              {active && <Check size={14} className="inline mr-1.5 -mt-0.5 text-[#3b82f6]" />}
              {tr(opt.label, lang)}
            </motion.button>
          );
        })}
      </div>
      {step.multi && (
        <div className="flex items-center gap-5">
          <PrimaryButton disabled={selected.length === 0} onClick={() => onCommit(selected)}>
            {t.continueLabel}
            <ArrowRight size={17} />
          </PrimaryButton>
          {step.optional && <SkipButton onClick={() => onCommit(undefined)} label={t.skip} />}
        </div>
      )}
    </div>
  );
}

function TextInput({
  step,
  lang,
  initialValue,
  onCommit,
}: {
  step: Step;
  lang: Lang;
  initialValue: unknown;
  onCommit: (v: unknown) => void;
}) {
  const t = UI[lang];
  const [value, setValue] = useState(typeof initialValue === "string" ? initialValue : "");
  return (
    <form
      className="max-w-2xl"
      onSubmit={(e) => {
        e.preventDefault();
        if (value.trim()) onCommit(value.trim());
      }}
    >
      <textarea
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey && value.trim()) {
            e.preventDefault();
            onCommit(value.trim());
          }
        }}
        placeholder={tr(step.placeholder, lang)}
        rows={3}
        maxLength={1000}
        className="w-full glass-card rounded-xl px-5 py-4 text-slate-100 placeholder:text-slate-500 resize-none focus:outline-none focus:border-[#3b82f6]/50 focus-visible:outline-2 focus-visible:outline-[#3b82f6] mb-6"
      />
      <div className="flex items-center gap-5">
        <PrimaryButton type="submit" disabled={!value.trim()}>
          {t.continueLabel}
          <ArrowRight size={17} />
        </PrimaryButton>
        {step.optional && <SkipButton onClick={() => onCommit(undefined)} label={t.skip} />}
      </div>
    </form>
  );
}

function DateInput({
  step,
  lang,
  initialValue,
  onCommit,
}: {
  step: Step;
  lang: Lang;
  initialValue: unknown;
  onCommit: (v: unknown) => void;
}) {
  const t = UI[lang];
  const [value, setValue] = useState(typeof initialValue === "string" ? initialValue : "");
  const today = new Date().toISOString().slice(0, 10);
  return (
    <form
      className="max-w-2xl"
      onSubmit={(e) => {
        e.preventDefault();
        if (value) onCommit(value);
      }}
    >
      <input
        type="date"
        value={value}
        min={today}
        onChange={(e) => setValue(e.target.value)}
        className="glass-card rounded-xl px-5 py-4 text-slate-100 [color-scheme:dark] focus:outline-none focus-visible:outline-2 focus-visible:outline-[#3b82f6] mb-6 block"
      />
      <div className="flex items-center gap-5">
        <PrimaryButton type="submit" disabled={!value}>
          {t.continueLabel}
          <ArrowRight size={17} />
        </PrimaryButton>
        {step.optional && <SkipButton onClick={() => onCommit(undefined)} label={t.dontKnowYet} />}
      </div>
    </form>
  );
}

function UploadInput({
  lang,
  token,
  salesEmail,
  files,
  setFiles,
  onCommit,
}: {
  lang: Lang;
  token: string;
  salesEmail: string;
  files: UploadedFile[];
  setFiles: React.Dispatch<React.SetStateAction<UploadedFile[]>>;
  onCommit: (v: unknown) => void;
}) {
  const t = UI[lang];
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  const upload = async (list: FileList | null) => {
    if (!list?.length) return;
    setBusy(true);
    setError(null);
    for (const file of Array.from(list).slice(0, 5)) {
      if (file.size > 10 * 1024 * 1024) {
        setError(t.fileTooLarge(file.name, salesEmail));
        continue;
      }
      const body = new FormData();
      body.append("file", file);
      try {
        const res = await fetch(`/api/followup/${token}/upload`, { method: "POST", body });
        if (!res.ok) throw new Error();
        setFiles((f) => [...f, { name: file.name, size: file.size }]);
      } catch {
        setError(t.uploadFailed(file.name, salesEmail));
      }
    }
    setBusy(false);
  };

  return (
    <div className="max-w-2xl">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          upload(e.dataTransfer.files);
        }}
        className={`w-full rounded-2xl border-2 border-dashed px-6 py-10 text-center transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#3b82f6] ${
          dragging
            ? "border-[#3b82f6] bg-[#3b82f6]/10"
            : "border-white/15 bg-white/[0.03] hover:border-[#3b82f6]/50 hover:bg-white/[0.05]"
        }`}
      >
        {busy ? (
          <Loader2 size={28} className="mx-auto mb-3 text-[#3b82f6] animate-spin" />
        ) : (
          <FileUp size={28} className="mx-auto mb-3 text-[#3b82f6]" />
        )}
        <span className="block font-medium text-slate-200 mb-1">{t.dropzoneTitle}</span>
        <span className="block text-sm text-slate-500">{t.dropzoneHint}</span>
      </button>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept=".pdf,.png,.jpg,.jpeg,.webp,.tif,.tiff,.csv,.xls,.xlsx,.doc,.docx"
        className="hidden"
        onChange={(e) => {
          upload(e.target.files);
          e.target.value = "";
        }}
      />

      {files.length > 0 && (
        <ul className="mt-4 space-y-2">
          {files.map((f, i) => (
            <motion.li
              key={`${f.name}-${i}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 glass-card rounded-lg px-4 py-2.5 text-sm"
            >
              <Check size={15} className="text-[#10b981] shrink-0" />
              <span className="text-slate-200 truncate">{f.name}</span>
              <span className="text-slate-500 ml-auto shrink-0">
                {(f.size / 1024 / 1024).toFixed(1)} MB
              </span>
            </motion.li>
          ))}
        </ul>
      )}

      {error && <p className="mt-3 text-sm text-[#f87171]">{error}</p>}

      <div className="flex items-center gap-5 mt-8 flex-wrap">
        <PrimaryButton
          disabled={busy}
          onClick={() => onCommit(files.length ? t.filesAnswer(files.length) : undefined)}
        >
          {files.length > 0 ? t.readyContinue : t.continueLabel}
          <ArrowRight size={17} />
        </PrimaryButton>
        <SkipButton onClick={() => onCommit(undefined)} label={t.preferEmail} />
      </div>
    </div>
  );
}

function DoneScreen({
  clientName,
  lang,
  salesEmail,
  sentiment,
  answers,
  schedulerUrl,
}: {
  clientName: string;
  lang: Lang;
  salesEmail: string;
  sentiment: string;
  answers: Record<string, unknown>;
  schedulerUrl: string | null;
}) {
  const t = UI[lang];
  const cold = sentiment === "not_needed";
  const scheduleHref =
    schedulerUrl ??
    `mailto:${salesEmail}?subject=${encodeURIComponent(
      lang === "es" ? `Agendar demo — ${clientName}` : `Schedule demo — ${clientName}`,
    )}`;

  const warmSubtitle =
    answers.docs_have === "can_get"
      ? t.doneWarmDocs
      : answers.discovery === "yes"
        ? t.doneWarmDiscovery
        : t.doneWarmDefault;

  const hints = Array.isArray(answers.usecase_hint) ? (answers.usecase_hint as string[]) : [];
  const mappedHint = hints.find((h) => USE_CASE_LINKS[h]) ?? null;
  const hookHref = mappedHint ? USE_CASE_LINKS[mappedHint] : "/use-cases";
  const hintOption = mappedHint
    ? STEPS.usecase_hint.options?.find((o) => o.value === mappedHint)
    : null;
  const hookLabel = hintOption ? tr(hintOption.label, lang) : null;

  return (
    <div>
      <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#10b981]/10 border border-[#10b981]/25 text-[#10b981] mb-6">
        <Check size={26} />
      </span>
      {cold ? (
        <>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-100 leading-tight mb-4">
            {t.doneColdTitle(clientName)}
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed mb-10 max-w-xl">{t.doneColdBody}</p>
          <a
            href={scheduleHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-slate-300 hover:text-slate-100 border border-white/15 hover:border-white/30 rounded-xl px-6 py-3.5 font-medium transition-all duration-200"
          >
            <CalendarCheck size={18} />
            {t.doneColdCta}
          </a>
        </>
      ) : (
        <>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-100 leading-tight mb-4">
            {t.doneWarmTitle(clientName)}
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed mb-10 max-w-xl">{warmSubtitle}</p>
          <div className="flex flex-wrap items-center gap-5">
            <a
              href={scheduleHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta-primary inline-flex items-center gap-2.5 rounded-xl px-7 py-4 font-heading font-bold text-white bg-gradient-to-br from-[#3b82f6] to-[#6c42f0] shadow-lg shadow-[#3b82f6]/25 hover:shadow-xl hover:shadow-[#3b82f6]/30 transition-all duration-300 hover:-translate-y-0.5"
            >
              <CalendarCheck size={19} />
              {t.doneWarmCta}
            </a>
            <span className="text-slate-500 text-sm">{t.seeYouSoon}</span>
          </div>
        </>
      )}

      <a
        href={hookHref}
        target="_blank"
        rel="noopener noreferrer"
        className="glass-card glass-card-hover group mt-10 flex items-center gap-4 rounded-2xl px-6 py-5 max-w-xl transition-all duration-200 hover:-translate-y-px"
      >
        <span className="shrink-0 w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-[#3b82f6] group-hover:border-[#3b82f6]/40 transition-colors">
          <Compass size={20} aria-hidden />
        </span>
        <span className="min-w-0">
          <span className="block text-[11px] font-semibold tracking-widest uppercase text-[#3b82f6] mb-0.5">
            {t.hookKicker}
          </span>
          <span className="block font-medium text-slate-100">{t.hookCta(hookLabel)}</span>
        </span>
        <ChevronRight
          size={18}
          aria-hidden
          className="ml-auto shrink-0 text-slate-600 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-[#3b82f6] transition-all duration-200"
        />
      </a>
    </div>
  );
}

/* ─────────────────────── live record panel ─────────────────────── */

function RecordPanel({
  clientName,
  company,
  lang,
  entries,
  fileCount,
  pendingRows,
  done,
}: {
  clientName: string;
  company: string | null;
  lang: Lang;
  entries: { id: string; label: string; value: string }[];
  fileCount: number;
  pendingRows: number;
  done: boolean;
}) {
  const t = UI[lang];
  const filled = entries.length + (fileCount > 0 ? 1 : 0);
  const total = filled + pendingRows;
  return (
    <aside className="hidden lg:block sticky top-10" aria-label={t.recordHeader}>
      {/* Gradient frame gives the record the weight of a real artifact — the
          thing the meeting produces — without shouting for attention. */}
      <div className="rounded-3xl p-px bg-gradient-to-b from-white/20 via-white/[0.07] to-white/[0.03] shadow-2xl shadow-black/40">
        <div className="rounded-[calc(1.5rem-1px)] overflow-hidden bg-[#0c0c1e]/95 backdrop-blur-xl">
          <div className="px-6 py-4 border-b border-white/10 bg-white/[0.03] flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3b82f6]/25 to-[#6c42f0]/25 border border-[#3b82f6]/30 flex items-center justify-center text-[#93c5fd]">
              <FileCheck size={16} aria-hidden />
            </span>
            <span className="processing-text uppercase tracking-[0.18em] text-[13px]">
              {t.recordHeader}
            </span>
            <span
              className={`ml-auto w-2 h-2 rounded-full ${done ? "bg-[#10b981]" : "bg-[#3b82f6] animate-pulse"}`}
              aria-hidden
            />
          </div>
          <div className="px-6 py-5 font-mono text-sm leading-relaxed">
            <RecordRow label={t.recordClient} value={clientName} />
            {company && <RecordRow label={t.recordCompany} value={company} />}
            <div className="my-4 border-t border-dashed border-white/10" />
            <AnimatePresence initial={false}>
              {entries.map((e) => (
                <motion.div
                  key={e.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <RecordRow label={e.label.toLowerCase()} value={e.value} highlight />
                </motion.div>
              ))}
            </AnimatePresence>
            {fileCount > 0 && (
              <RecordRow
                label={lang === "es" ? "archivos" : "files"}
                value={t.recordFiles(fileCount)}
                highlight
              />
            )}
            {/* Unanswered fields render as the same skeleton bars the homepage
                "extracts" into a table — the panel visibly fills as they answer. */}
            {Array.from({ length: pendingRows }).map((_, i) => (
              <div key={`pending-${i}`} className="flex items-center gap-4 py-2.5" aria-hidden>
                <span className="h-3 w-24 rounded bg-white/[0.08]" />
                <span className="h-3 flex-1 rounded bg-white/[0.04]" />
              </div>
            ))}
          </div>
          <div
            className={`px-6 py-3 text-xs font-mono border-t flex items-center justify-between gap-3 transition-colors duration-500 ${
              done
                ? "border-[#10b981]/20 bg-[#10b981]/10 text-[#34d399]"
                : "border-white/10 bg-white/[0.02] text-slate-500"
            }`}
          >
            <span>{done ? t.recordDone : t.recordWorking}</span>
            {!done && total > 0 && (
              <span className="shrink-0 text-slate-600">{t.recordProgress(filled, total)}</span>
            )}
          </div>
        </div>
      </div>
      <p className="mt-4 text-xs text-slate-500 leading-relaxed px-2">{t.recordFootnote}</p>
    </aside>
  );
}

function RecordRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-baseline gap-4 py-2">
      <span className="text-slate-500 shrink-0 min-w-24">{label}:</span>
      <span className={`min-w-0 ${highlight ? "text-[#93c5fd]" : "text-slate-200"}`}>{value}</span>
    </div>
  );
}

/* ─────────────────────────── primitives ─────────────────────────── */

function PrimaryButton({
  children,
  onClick,
  disabled,
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 font-heading font-bold text-white bg-gradient-to-br from-[#3b82f6] to-[#6c42f0] shadow-lg shadow-[#3b82f6]/25 transition-all duration-300 enabled:hover:-translate-y-0.5 enabled:hover:shadow-xl enabled:hover:shadow-[#3b82f6]/30 enabled:cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3b82f6]"
    >
      {children}
    </button>
  );
}

function SkipButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-300 transition-colors cursor-pointer rounded focus-visible:outline-2 focus-visible:outline-[#3b82f6]"
    >
      <X size={14} />
      {label}
    </button>
  );
}
