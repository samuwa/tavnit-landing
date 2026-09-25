"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, ChevronDown, Download, FileSpreadsheet, FileText, Loader2, RotateCcw } from "lucide-react";
import type { ToolCopy } from "@/lib/lite/copy";
import { LITE_ACCEPT_SHEET, type LiteToolId } from "@/lib/lite/tools";
import type { Locale } from "@/lib/locale";
import { CLEAN_SLOTS, POPULAR_OUTPUTS, SOURCE_CURRENCIES, type CleanMode } from "@/lib/lite/clean";
import AuthModal from "@/components/lite/AuthModal";
import {
  BTN_DOWNLOAD,
  BTN_INK,
  BTN_QUIET,
  DropZone,
  ErrorBox,
  Hero,
  MAX_WAIT_MS,
  POLL_MS,
  Progress,
  SHEET,
  SampleButton,
  Trust,
  clearStash,
  fill,
  plural,
  readStash,
  saveResponse,
  useTurnstile,
  writeStash,
} from "@/components/lite/shared";

/**
 * The spreadsheet tools (number format, date format). Unlike the document
 * tools there is a step in between: once the file is read, the visitor sees
 * its columns with the likely ones ticked, says how their values are
 * written, and picks the format. Then the tool's Cleaner runs over those
 * columns only and the page shows the file back with the changed cells
 * marked. Downloading, as everywhere in Lite, needs a free account.
 */

const STASH_KEY = "tavnit_lite_clean";
const APP = "https://app.tavnit.io";

interface Preview {
  file: string;
  columns: string[];
  rows: string[][];
  total: number;
  suggested: string[];
  input: string;
  /** currency: the guessed currency of the amounts */
  source?: string;
}

interface Result {
  file: string;
  sweepId: string;
  columns: string[];
  rows: (string | number)[][];
  changed: number[][];
  total: number;
  cleaned: string[];
  changedCells: number;
}

type Phase =
  | { kind: "idle" }
  | { kind: "reading"; file: string }
  | { kind: "setup"; preview: Preview; source: File | "sample"; selected: string[]; input: string; currency: string; output: string }
  | { kind: "processing"; file: string; stage: number }
  | ({ kind: "done" } & Result)
  | { kind: "error"; code: string };

interface Stash {
  toolId: string;
  sweepId: string;
  file: string;
  savedAt: number;
}

export default function LiteClean({
  toolId,
  locale,
  copy,
  mode,
  outputs,
  turnstileSiteKey,
  hasSample,
}: {
  toolId: LiteToolId;
  locale: Locale;
  copy: ToolCopy;
  mode: CleanMode;
  outputs: string[];
  turnstileSiteKey: string | null;
  hasSample: boolean;
}) {
  const cc = copy.clean!;
  const [phase, setPhase] = useState<Phase>({ kind: "idle" });
  const [authOpen, setAuthOpen] = useState(false);
  const [downloading, setDownloading] = useState<"xlsx" | "csv" | null>(null);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const pending = useRef<"xlsx" | "csv">("xlsx");
  const abort = useRef<AbortController | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const turnstile = useTurnstile(turnstileSiteKey, locale);
  const defaultOutput =
    mode === "number" ? "plain" : mode === "date" ? (locale === "es" ? "dmy" : "iso") : mode === "currency" ? "USD" : locale === "es" ? "en" : "es";

  /* ---- step 1: read the file -------------------------------------------- */
  const read = useCallback(
    async (source: File | "sample") => {
      const name = source === "sample" ? cc.setup.preview : source.name;
      setPhase({ kind: "reading", file: name });
      const form = new FormData();
      form.set("tool", toolId);
      form.set("locale", locale);
      if (source === "sample") form.set("sample", "1");
      else form.set("file", source, source.name);
      try {
        const res = await fetch("/api/lite/clean/preview", { method: "POST", body: form });
        const body = (await res.json().catch(() => ({}))) as Partial<Preview> & { error?: string };
        if (!res.ok || !body.columns) {
          setPhase({ kind: "error", code: body.error || "backend" });
          return;
        }
        const preview = body as Preview;
        setPhase({
          kind: "setup",
          preview,
          source,
          selected: preview.suggested,
          input: preview.input,
          currency: preview.source ?? "USD",
          // The translate sample is in Spanish: translating it into Spanish shows nothing.
          output:
            source === "sample" && mode === "translate" ? "en" : outputs.includes(defaultOutput) ? defaultOutput : outputs[0],
        });
      } catch {
        setPhase({ kind: "error", code: "backend" });
      }
    },
    [toolId, locale, mode, outputs, defaultOutput, cc.setup.preview],
  );

  /* ---- step 3: wait for the Cleaner --------------------------------------- */
  const poll = useCallback(
    async (sweepId: string, file: string, ctrl: AbortController) => {
      const startedAt = Date.now();
      let stage = 1;
      while (!ctrl.signal.aborted) {
        if (Date.now() - startedAt > MAX_WAIT_MS) {
          setPhase({ kind: "error", code: "timeout" });
          return;
        }
        try {
          const res = await fetch(`/api/lite/clean/${encodeURIComponent(sweepId)}`, { cache: "no-store", signal: ctrl.signal });
          if (res.status === 404) {
            clearStash(STASH_KEY);
            setPhase({ kind: "idle" });
            return;
          }
          const body = (await res.json()) as { status: string } & Partial<Result>;
          if (body.status === "completed") {
            setPhase({
              kind: "done",
              file: body.file || file,
              sweepId,
              columns: body.columns ?? [],
              rows: body.rows ?? [],
              changed: body.changed ?? [],
              total: body.total ?? 0,
              cleaned: body.cleaned ?? [],
              changedCells: body.changedCells ?? 0,
            });
            return;
          }
          if (body.status === "failed") {
            setPhase({ kind: "error", code: "failed" });
            return;
          }
        } catch {
          if (ctrl.signal.aborted) return;
        }
        stage = Math.min(stage + 1, cc.stages.length - 1);
        setPhase({ kind: "processing", file, stage });
        await new Promise((r) => setTimeout(r, POLL_MS));
      }
    },
    [cc.stages.length],
  );

  /* ---- step 2 → 3: run ------------------------------------------------------ */
  const run = useCallback(async () => {
    if (phase.kind !== "setup" || !phase.selected.length) return;
    const { preview, source, selected, input, currency, output } = phase;
    abort.current?.abort();
    const ctrl = new AbortController();
    abort.current = ctrl;
    setDownloadError(null);
    clearStash(STASH_KEY);
    setPhase({ kind: "processing", file: preview.file, stage: 0 });

    const form = new FormData();
    form.set("tool", toolId);
    form.set("locale", locale);
    form.set("columns", JSON.stringify(selected));
    if (input) form.set("input", input);
    if (mode === "currency") form.set("source", currency);
    form.set("output", output);
    if (source === "sample") form.set("sample", "1");
    else form.set("file", source, source.name);
    const token = turnstile.token();
    if (token) form.set("cf-turnstile-response", token);

    let sweepId: string;
    try {
      const res = await fetch("/api/lite/clean", { method: "POST", body: form, signal: ctrl.signal });
      const body = (await res.json().catch(() => ({}))) as { sweepId?: string; error?: string };
      if (!res.ok || !body.sweepId) {
        setPhase({ kind: "error", code: body.error || "backend" });
        turnstile.reset();
        return;
      }
      sweepId = body.sweepId;
    } catch {
      if (!ctrl.signal.aborted) setPhase({ kind: "error", code: "backend" });
      turnstile.reset();
      return;
    }
    turnstile.reset();
    writeStash(STASH_KEY, { toolId, sweepId, file: preview.file });
    setPhase({ kind: "processing", file: preview.file, stage: 1 });
    await new Promise((r) => setTimeout(r, POLL_MS));
    await poll(sweepId, preview.file, ctrl);
  }, [phase, toolId, locale, mode, turnstile, poll]);

  /* ---- back from a sign-in round trip (or a reload) ------------------------ */
  const autoDownload = useRef(false);
  useEffect(() => {
    const stash = readStash<Stash>(STASH_KEY, toolId);
    if (typeof window !== "undefined") {
      const u = new URL(window.location.href);
      autoDownload.current = u.searchParams.get("auth") === "1" && stash !== null;
      if (u.searchParams.has("auth")) {
        u.searchParams.delete("auth");
        window.history.replaceState(null, "", u.pathname + (u.search || "") + u.hash);
      }
    }
    if (!stash) return;
    const ctrl = new AbortController();
    abort.current = ctrl;
    setPhase({ kind: "processing", file: stash.file, stage: 1 });
    void poll(stash.sweepId, stash.file, ctrl);
    return () => ctrl.abort();
  }, [toolId, poll]);

  const download = useCallback(
    async (fmt: "xlsx" | "csv") => {
      if (phase.kind !== "done") return;
      setDownloading(fmt);
      setDownloadError(null);
      pending.current = fmt;
      try {
        const res = await fetch(`/api/lite/clean/${encodeURIComponent(phase.sweepId)}/download${fmt === "csv" ? "?fmt=csv" : ""}`, { cache: "no-store" });
        const ok = await saveResponse(res, `tavnit-file.${fmt}`);
        if (!ok) setAuthOpen(true);
      } catch (e) {
        const code = e instanceof Error ? e.message : "backend";
        setDownloadError(copy.errors[code] ?? copy.errors.backend);
      } finally {
        setDownloading(null);
      }
    },
    [phase, copy.errors],
  );

  useEffect(() => {
    if (phase.kind === "done" && autoDownload.current) {
      autoDownload.current = false;
      void download(pending.current);
    }
  }, [phase.kind, download]);

  useEffect(() => {
    if (phase.kind === "done") resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [phase.kind]);

  const reset = () => {
    abort.current?.abort();
    clearStash(STASH_KEY);
    setPhase({ kind: "idle" });
    setDownloadError(null);
  };

  const stashForRedirect = useCallback(() => {
    if (phase.kind === "done") writeStash(STASH_KEY, { toolId, sweepId: phase.sweepId, file: phase.file });
  }, [phase, toolId]);

  /* ---- render: before the result ------------------------------------------ */
  if (phase.kind !== "done") {
    return (
      <>
        <Hero copy={copy} />
        <div className="mt-10">
          {phase.kind === "processing" ? (
            <Progress file={phase.file} stages={cc.stages} stage={phase.stage} />
          ) : phase.kind === "reading" ? (
            <Progress file={phase.file} stages={cc.stages.slice(0, 2)} stage={1} />
          ) : phase.kind === "error" ? (
            <ErrorBox message={copy.errors[phase.code] ?? copy.errors.backend} retry={reset} retryLabel={cc.another} />
          ) : phase.kind === "setup" ? (
            <Setup
              copy={cc}
              rowWord={copy.result.rowWord}
              locale={locale}
              phase={phase}
              mode={mode}
              outputs={outputs}
              onChange={(p) => setPhase({ ...phase, ...p })}
              onRun={() => void run()}
              onChangeFile={reset}
            />
          ) : (
            <div className={`${SHEET} p-3 sm:p-4`}>
              <DropZone
                id="lite-file"
                copy={copy.drop}
                accept={LITE_ACCEPT_SHEET}
                onFiles={(list) => {
                  const f = list?.[0];
                  if (f) void read(f);
                }}
              />
              <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />
              {hasSample && (
                <div className="mt-3">
                  <SampleButton label={copy.drop.sample} onClick={() => void read("sample")} className="w-full sm:w-auto" />
                </div>
              )}
            </div>
          )}
          {/* Turnstile: invisible unless Cloudflare needs a click, then shown here, centred under the tool. */}
          {turnstileSiteKey && (phase.kind === "idle" || phase.kind === "setup") && (
            <div ref={turnstile.el} className="flex justify-center empty:hidden [&:has(iframe)]:mt-3" />
          )}
        </div>
        <Trust copy={copy} />
      </>
    );
  }

  /* ---- render: the result ---------------------------------------------------- */
  const { file, columns, rows, changed, total, cleaned, changedCells } = phase;
  const cleanedIdx = new Set(cleaned.map((c) => columns.indexOf(c)));

  return (
    <>
      <section ref={resultRef} className="scroll-mt-20">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex items-start gap-3">
            <span className="lite-brand mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full text-white">
              <Check size={20} aria-hidden />
            </span>
            <div className="min-w-0">
              <h2 className="lite-display text-2xl sm:text-3xl">{fill(cc.heading, { file })}</h2>
              <p className="mt-1 text-sm text-[var(--lite-muted)]">
                {changedCells
                  ? fill(cc.summary, { cells: plural(changedCells, cc.cellWord), cols: plural(cleaned.length, cc.columnWord) })
                  : cc.unchanged}{" "}
                · {copy.result.retention}
              </p>
            </div>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <button type="button" onClick={reset} className={BTN_QUIET}>
              <RotateCcw size={16} aria-hidden />
              {cc.another}
            </button>
            <DownloadMenu
              label={downloading ? copy.result.downloading : cc.download}
              busy={downloading !== null}
              options={[
                { fmt: "xlsx", label: cc.downloadXlsx, Icon: FileSpreadsheet },
                { fmt: "csv", label: cc.downloadCsv, Icon: FileText },
              ]}
              onPick={(fmt) => void download(fmt)}
            />
          </div>
        </div>
        {downloadError && (
          <p role="alert" className="mt-3 text-sm text-[#b42318]">
            {downloadError}
          </p>
        )}

        <div
          role="region"
          aria-label={cc.highlight}
          tabIndex={0}
          className={`${SHEET} lite-scroll mt-6 max-h-[70vh] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lite-blue)]/50`}
        >
            <table className="min-w-full border-collapse text-sm">
              <thead className="sticky top-0 z-20 bg-[#f6f8fb]">
                <tr>
                  <th scope="col" aria-label="#" className="sticky left-0 z-30 w-10 min-w-10 border-b border-r border-[var(--lite-line)] bg-[#f6f8fb] px-2 py-2 text-right text-xs font-medium text-[var(--lite-muted)]" />
                  {columns.map((c, i) => (
                    <th
                      key={c}
                      scope="col"
                      className={`whitespace-nowrap border-b border-r border-[var(--lite-line)] px-3 py-2 text-left font-semibold last:border-r-0 ${cleanedIdx.has(i) ? "text-[var(--lite-blue-ink)]" : ""}`}
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, ri) => {
                  const marks = new Set(changed[ri] ?? []);
                  return (
                    <tr key={ri} className="border-b border-[var(--lite-rule)] last:border-b-0">
                      <td className="sticky left-0 z-10 border-r border-[var(--lite-line)] bg-[#f6f8f6] px-2 py-1.5 text-right text-xs tabular-nums text-[var(--lite-muted)]">{ri + 1}</td>
                      {r.map((v, ci) => (
                        <td
                          key={ci}
                          className={`max-w-[280px] truncate whitespace-nowrap border-r border-[var(--lite-rule)] px-3 py-1.5 last:border-r-0 ${marks.has(ci) ? "bg-[var(--lite-blue-soft)] font-medium text-[var(--lite-blue-ink)]" : ""} ${typeof v === "number" || cleanedIdx.has(ci) ? "tabular-nums" : ""}`}
                        >
                          {String(v)}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
        </div>
        <p className="mt-2 text-xs text-[var(--lite-muted)]">
          {cc.highlight}
          {total > rows.length ? ` ${fill(cc.shown, { shown: rows.length, total })}` : ""}
        </p>
      </section>

      <section className={`${SHEET} mt-16 flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8`}>
        <div className="max-w-[560px]">
          <h2 className="font-heading text-xl font-bold">{cc.automate.heading}</h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--lite-muted)]">{cc.automate.body}</p>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:items-end">
          <a href={APP} className={BTN_INK}>
            {cc.automate.cta}
            <ArrowRight size={16} aria-hidden />
          </a>
          <Link href="/docs/cleaners" className="text-sm font-semibold text-[var(--lite-blue)] underline underline-offset-4">
            {cc.automate.docs}
          </Link>
        </div>
      </section>

      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onAuthed={() => {
          setAuthOpen(false);
          void download(pending.current);
        }}
        onBeforeRedirect={stashForRedirect}
        copy={copy.auth}
        locale={locale}
      />
    </>
  );
}

/* ---------------------------------------------------------------- setup ---- */

function Setup({
  copy,
  rowWord,
  locale,
  phase,
  mode,
  outputs,
  onChange,
  onRun,
  onChangeFile,
}: {
  copy: NonNullable<ToolCopy["clean"]>;
  rowWord: [string, string];
  locale: Locale;
  phase: Extract<Phase, { kind: "setup" }>;
  mode: CleanMode;
  outputs: string[];
  onChange: (p: Partial<Extract<Phase, { kind: "setup" }>>) => void;
  onRun: () => void;
  onChangeFile: () => void;
}) {
  const { preview, selected, input, currency, output } = phase;
  const inputs = mode === "number" || mode === "currency" ? ["comma", "dot"] : mode === "date" ? ["dmy", "mdy"] : [];
  const currencyName = (code: string) => {
    try {
      return new Intl.DisplayNames([locale], { type: "currency" }).of(code) ?? code;
    } catch {
      return code;
    }
  };
  const languageName = (code: string) => {
    try {
      // "tl" is what the engine takes; the language is shown as Filipino.
      const name = new Intl.DisplayNames([locale], { type: "language" }).of(code === "tl" ? "fil" : code) ?? code;
      return name.charAt(0).toLocaleUpperCase(locale) + name.slice(1);
    } catch {
      return code;
    }
  };
  const outputName = (k: string) =>
    copy.setup.outputOptions[k] ?? (mode === "currency" ? `${k} · ${currencyName(k)}` : mode === "translate" ? languageName(k) : k);
  // Currency and language lists are long: a dropdown with the usual ones first, the rest A to Z.
  const long = outputs.length > 8;
  const popular = (POPULAR_OUTPUTS[mode] ?? []).filter((k) => outputs.includes(k));
  const rest = outputs
    .filter((k) => !popular.includes(k))
    .sort((a, b) => outputName(a).localeCompare(outputName(b), locale));
  const full = selected.length >= CLEAN_SLOTS;
  const toggle = (c: string) =>
    onChange({ selected: selected.includes(c) ? selected.filter((x) => x !== c) : full ? selected : [...selected, c] });
  const selIdx = new Set(selected.map((c) => preview.columns.indexOf(c)));
  const summary = fill(copy.setup.fileSummary, {
    rows: plural(preview.total, rowWord),
    cols: plural(preview.columns.length, copy.columnWord),
  });

  return (
    <div className={`${SHEET} p-5 sm:p-7`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--lite-blue-soft)] text-[var(--lite-blue)]">
            <FileSpreadsheet size={18} aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="truncate font-medium">{preview.file}</p>
            <p className="text-xs text-[var(--lite-muted)]">{summary}</p>
          </div>
        </div>
        <button type="button" onClick={onChangeFile} className="text-sm font-semibold text-[var(--lite-blue)] underline underline-offset-4">
          {copy.setup.change}
        </button>
      </div>

      <h2 className="mt-6 font-heading text-lg font-bold">{copy.setup.heading}</h2>

      <fieldset className="mt-4">
        <legend className="text-sm font-semibold">{copy.setup.columnsLabel}</legend>
        <p className="mt-0.5 text-xs text-[var(--lite-muted)]">{fill(copy.setup.columnsHint, { max: CLEAN_SLOTS })}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {preview.columns.map((c) => {
            const on = selected.includes(c);
            return (
              <button
                key={c}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(c)}
                disabled={!on && full}
                className={`lite-press inline-flex min-h-9 max-w-[240px] items-center gap-1.5 rounded-lg border px-3 text-sm transition-colors disabled:opacity-40 ${
                  on ? "border-[var(--lite-blue)] bg-[var(--lite-blue-soft)] font-semibold text-[var(--lite-blue-ink)]" : "border-[var(--lite-line)] bg-white hover:border-[var(--lite-ink)]"
                }`}
              >
                {on && <Check size={14} aria-hidden />}
                <span className="truncate">{c}</span>
              </button>
            );
          })}
        </div>
        {full && <p className="mt-2 text-xs text-[var(--lite-muted)]">{fill(copy.setup.tooMany, { max: CLEAN_SLOTS })}</p>}
      </fieldset>

      <div className={`mt-6 grid gap-6 ${inputs.length || mode === "currency" ? "sm:grid-cols-2" : ""}`}>
        {(inputs.length > 0 || mode === "currency") && (
          <div className="space-y-5">
            {mode === "currency" && (
              <label className="block">
                <span className="text-sm font-semibold">{copy.setup.sourceLabel}</span>
                <select
                  value={currency}
                  onChange={(e) => onChange({ currency: e.target.value })}
                  className="mt-2 block w-full max-w-xs rounded-lg border border-[var(--lite-line)] bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lite-blue)]/50"
                >
                  {SOURCE_CURRENCIES.map((c) => (
                    <option key={c} value={c}>
                      {c} · {currencyName(c)}
                    </option>
                  ))}
                </select>
                {copy.setup.sourceHint && <span className="mt-1.5 block text-xs text-[var(--lite-muted)]">{copy.setup.sourceHint}</span>}
              </label>
            )}
            {inputs.length > 0 && (
              <fieldset>
                <legend className="text-sm font-semibold">{copy.setup.inputLabel}</legend>
                <div className="mt-2 space-y-2">
                  {inputs.map((k) => (
                    <label key={k} className="flex cursor-pointer items-center gap-2 text-sm">
                      <input type="radio" name="lite-input" checked={input === k} onChange={() => onChange({ input: k })} className="accent-[var(--lite-blue)]" />
                      {copy.setup.inputOptions[k]}
                    </label>
                  ))}
                </div>
              </fieldset>
            )}
          </div>
        )}
        {long ? (
          <label className="block">
            <span className="text-sm font-semibold">{copy.setup.outputLabel}</span>
            <select
              value={output}
              onChange={(e) => onChange({ output: e.target.value })}
              className="mt-2 block w-full max-w-xs rounded-lg border border-[var(--lite-line)] bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lite-blue)]/50"
            >
              <optgroup label={copy.setup.outputPopular ?? ""}>
                {popular.map((k) => (
                  <option key={k} value={k}>
                    {outputName(k)}
                  </option>
                ))}
              </optgroup>
              <optgroup label={copy.setup.outputAll ?? ""}>
                {rest.map((k) => (
                  <option key={k} value={k}>
                    {outputName(k)}
                  </option>
                ))}
              </optgroup>
            </select>
          </label>
        ) : (
          <fieldset>
            <legend className="text-sm font-semibold">{copy.setup.outputLabel}</legend>
            <div className={`mt-2 ${outputs.length > 3 ? "grid grid-cols-2 gap-2" : "space-y-2"}`}>
              {outputs.map((k) => (
                <label key={k} className="flex cursor-pointer items-center gap-2 text-sm">
                  <input type="radio" name="lite-output" checked={output === k} onChange={() => onChange({ output: k })} className="accent-[var(--lite-blue)]" />
                  {outputName(k)}
                </label>
              ))}
            </div>
          </fieldset>
        )}
      </div>

      <p className="mt-7 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--lite-muted)]">{copy.setup.preview}</p>
      <div className="lite-scroll mt-2 rounded-xl border border-[var(--lite-line)]">
        <table className="min-w-full border-collapse text-sm">
          <thead className="bg-[#f6f8fb]">
            <tr>
              {preview.columns.map((c, i) => (
                <th key={c} className={`whitespace-nowrap border-b border-r border-[var(--lite-line)] px-3 py-2 text-left font-semibold last:border-r-0 ${selIdx.has(i) ? "bg-[var(--lite-blue-soft)] text-[var(--lite-blue-ink)]" : ""}`}>
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {preview.rows.map((r, ri) => (
              <tr key={ri} className="border-b border-[var(--lite-rule)] last:border-b-0">
                {preview.columns.map((_, ci) => (
                  <td key={ci} className={`max-w-[220px] truncate whitespace-nowrap border-r border-[var(--lite-rule)] px-3 py-1.5 last:border-r-0 ${selIdx.has(ci) ? "bg-[var(--lite-blue-soft)]/40" : ""}`}>
                    {r[ci] ?? ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-end">
        <button type="button" onClick={onRun} disabled={!selected.length} className={BTN_INK}>
          {copy.setup.run}
          <ArrowRight size={16} aria-hidden />
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------- download menu ---- */

/** One download button; its menu picks the format. Closes on outside click and Escape. */
function DownloadMenu({
  label,
  busy,
  options,
  onPick,
}: {
  label: string;
  busy: boolean;
  options: { fmt: "xlsx" | "csv"; label: string; Icon: typeof Download }[];
  onPick: (fmt: "xlsx" | "csv") => void;
}) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={root} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        disabled={busy}
        aria-haspopup="menu"
        aria-expanded={open}
        className={`${BTN_DOWNLOAD} w-full sm:w-auto`}
      >
        {busy ? <Loader2 size={16} className="animate-spin" aria-hidden /> : <Download size={16} aria-hidden />}
        {label}
        <ChevronDown size={15} className={`transition-transform ${open ? "rotate-180" : ""}`} aria-hidden />
      </button>
      {open && (
        <div role="menu" className="lite-pop absolute right-0 top-full z-20 mt-2 w-48 rounded-xl border border-[var(--lite-line)] bg-white p-1.5 shadow-xl shadow-[#1c2321]/10">
          {options.map(({ fmt, label: l, Icon }) => (
            <button
              key={fmt}
              type="button"
              role="menuitem"
              onClick={() => {
                setOpen(false);
                onPick(fmt);
              }}
              className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors hover:bg-[var(--lite-blue-soft)] hover:text-[var(--lite-blue-ink)]"
            >
              <Icon size={16} aria-hidden />
              {l}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
