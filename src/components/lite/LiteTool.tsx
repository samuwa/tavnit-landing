"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Check, Download, ExternalLink, FileText, Loader2, RotateCcw, Sparkles, TriangleAlert } from "lucide-react";
import type { ToolCopy } from "@/lib/lite/copy";
import type { LiteToolId } from "@/lib/lite/tools";
import { LITE_ACCEPT } from "@/lib/lite/tools";
import type { Locale } from "@/lib/locale";
import AuthModal from "@/components/lite/AuthModal";
import CleanerIdeas from "@/components/lite/CleanerIdeas";
import WhatNext from "@/components/lite/WhatNext";

/**
 * The tool itself: a sheet of paper that becomes a spreadsheet.
 *
 * One centred column. The drop zone sits on a white "sheet" ruled like a
 * ledger; while the backend works the sheet shows placeholder rows; when
 * rows arrive the visitor sees their own document on the left and the
 * spreadsheet on the right (column letters, row numbers, gridlines, a sum
 * row for amount columns). Only then does the "and then what?" diagram
 * appear below.
 *
 * Security lives server-side; this component only speaks to /api/lite.
 */

type Cell = string | number | null;
type Phase =
  | { kind: "idle" }
  | { kind: "processing"; file: string; stage: number; runId: string | null; startedAt: number }
  | {
      kind: "done";
      file: string;
      runId: string;
      columns: string[];
      rows: Record<string, Cell>[];
      total: number;
      truncated: boolean;
      pages: number;
      /** 0 when the run was restored after a round trip (timing unknown). */
      seconds: number;
      mime: string | null;
    }
  | { kind: "error"; code: string; file: string | null };

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
      getResponse: (id?: string) => string | undefined;
      remove: (id?: string) => void;
    };
  }
}

const POLL_MS = 2500;
const MAX_WAIT_MS = 4 * 60 * 1000;
const TURNSTILE_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
/** Columns whose numbers make sense added up. Unit prices and ids do not. */
const SUMMABLE = /total|importe|monto|subtotal|amount|cantidad|qty|quantity|impuesto|tax|itbms|iva|neto|bruto|descuento|discount/i;

/**
 * The current run, remembered in this tab so a full-page round trip
 * (Google sign-in, the email confirmation link, a reload) comes back to
 * the same result instead of an empty tool. Session-scoped and short-lived;
 * the rows themselves are re-fetched, never stored.
 */
const STASH_KEY = "tavnit_lite_run";
const STASH_TTL_MS = 24 * 60 * 60 * 1000;
interface Stash {
  toolId: string;
  runId: string;
  file: string;
  startedAt: number;
  savedAt: number;
}
function readStash(toolId: string): Stash | null {
  try {
    const raw = sessionStorage.getItem(STASH_KEY);
    if (!raw) return null;
    const v = JSON.parse(raw) as Stash;
    if (v.toolId !== toolId || typeof v.runId !== "string") return null;
    if (Date.now() - v.savedAt > STASH_TTL_MS) return null;
    return v;
  } catch {
    return null;
  }
}
function writeStash(v: Omit<Stash, "savedAt">) {
  try {
    sessionStorage.setItem(STASH_KEY, JSON.stringify({ ...v, savedAt: Date.now() }));
  } catch {
    // Private mode or blocked storage: the round trip just loses the result.
  }
}
function clearStash() {
  try {
    sessionStorage.removeItem(STASH_KEY);
  } catch {
    // ignore
  }
}

function fill(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? ""));
}
function plural(n: number, words: [string, string]): string {
  return `${n} ${n === 1 ? words[0] : words[1]}`;
}
function colLetter(i: number): string {
  let n = i + 1;
  let s = "";
  while (n > 0) {
    const r = (n - 1) % 26;
    s = String.fromCharCode(65 + r) + s;
    n = Math.floor((n - 1) / 26);
  }
  return s;
}

const BTN_DOWNLOAD =
  "lite-press inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[var(--lite-blue)] px-5 text-sm font-semibold text-white shadow-sm shadow-[#3b82f6]/30 transition-colors hover:bg-[var(--lite-blue-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lite-blue)]/50 disabled:pointer-events-none disabled:opacity-50";
const BTN_QUIET =
  "lite-press inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-lg border border-[var(--lite-line)] bg-[var(--lite-white)] px-4 text-sm font-semibold transition-colors hover:border-[var(--lite-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lite-blue)]/50";
const SHEET =
  "lite-sheet relative rounded-2xl border border-[var(--lite-line)] bg-[var(--lite-white)]";

export default function LiteTool({
  toolId,
  locale,
  copy,
  turnstileSiteKey,
  hasSample,
}: {
  toolId: LiteToolId;
  locale: Locale;
  copy: ToolCopy;
  turnstileSiteKey: string | null;
  hasSample: boolean;
}) {
  const [phase, setPhase] = useState<Phase>({ kind: "idle" });
  const [dragging, setDragging] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [docOpen, setDocOpen] = useState(false);
  const docDialog = useRef<HTMLDialogElement>(null);
  const [afterOpen, setAfterOpen] = useState(false);
  const afterDialog = useRef<HTMLDialogElement>(null);
  /** The run the post-download dialog was already shown for (once per run). */
  const afterShownFor = useRef<string | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const turnstileEl = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const abort = useRef<AbortController | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const nf = useMemo(() => {
    const tag = locale === "es" ? "es-PA" : "en-US";
    return {
      int: new Intl.NumberFormat(tag, { maximumFractionDigits: 0 }),
      dec: new Intl.NumberFormat(tag, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    };
  }, [locale]);
  const formatNumber = (v: number) => (Number.isInteger(v) ? nf.int.format(v) : nf.dec.format(v));

  // ---- Turnstile ------------------------------------------------------------
  useEffect(() => {
    if (!turnstileSiteKey) return;
    let cancelled = false;
    const mount = () => {
      if (cancelled || !turnstileEl.current || widgetId.current || !window.turnstile) return;
      widgetId.current = window.turnstile.render(turnstileEl.current, {
        sitekey: turnstileSiteKey,
        size: "flexible",
        theme: "light",
        language: locale,
      });
    };
    if (window.turnstile) mount();
    else {
      const existing = document.querySelector<HTMLScriptElement>(`script[src^="${TURNSTILE_SRC}"]`);
      const s = existing ?? document.createElement("script");
      if (!existing) {
        s.src = TURNSTILE_SRC;
        s.async = true;
        s.defer = true;
        document.head.appendChild(s);
      }
      s.addEventListener("load", mount);
    }
    return () => {
      cancelled = true;
    };
  }, [turnstileSiteKey, locale]);

  const turnstileToken = () =>
    turnstileSiteKey && widgetId.current ? window.turnstile?.getResponse(widgetId.current) ?? "" : "";
  const resetTurnstile = () => {
    if (turnstileSiteKey && widgetId.current) window.turnstile?.reset(widgetId.current);
  };

  // ---- run ------------------------------------------------------------------
  /** Polls one run until it settles, updating the phase. */
  const poll = useCallback(
    async (runId: string, displayName: string, startedAt: number, ctrl: AbortController, restored = false) => {
      while (!ctrl.signal.aborted) {
        const elapsed = Date.now() - startedAt;
        if (elapsed > MAX_WAIT_MS) {
          setPhase({ kind: "error", code: "timeout", file: displayName });
          return;
        }
        // Stage copy advances with time, not with backend events: it is
        // reassurance, not telemetry.
        const stage = Math.min(1 + Math.floor(elapsed / 6000), copy.stages.length - 1);
        setPhase((p) => (p.kind === "processing" ? { ...p, stage } : p));
        try {
          const res = await fetch(`/api/lite/runs/${encodeURIComponent(runId)}`, {
            cache: "no-store",
            signal: ctrl.signal,
          });
          if (res.status === 404) {
            clearStash();
            // A restored run that is gone (retention already deleted it, or
            // the session changed) is nothing to apologise for: back to the
            // empty tool. A 404 on a run we just submitted is a real error.
            if (restored) setPhase({ kind: "idle" });
            else setPhase({ kind: "error", code: "backend", file: displayName });
            return;
          }
          if (res.ok) {
            const body = (await res.json()) as {
              status: string;
              columns?: string[];
              rows?: Record<string, Cell>[];
              total?: number;
              truncated?: boolean;
              pages?: number;
              mime?: string | null;
            };
            if (body.status === "completed") {
              setPhase({
                kind: "done",
                file: displayName,
                runId,
                columns: body.columns ?? [],
                rows: body.rows ?? [],
                total: body.total ?? body.rows?.length ?? 0,
                truncated: Boolean(body.truncated),
                pages: body.pages ?? 1,
                seconds: restored ? 0 : Math.max(1, Math.round((Date.now() - startedAt) / 1000)),
                mime: body.mime ?? null,
              });
              return;
            }
            if (body.status === "failed") {
              clearStash();
              setPhase({ kind: "error", code: "failed", file: displayName });
              return;
            }
          }
        } catch {
          if (ctrl.signal.aborted) return;
        }
        await new Promise((r) => setTimeout(r, POLL_MS));
      }
    },
    [copy.stages.length],
  );

  const start = useCallback(
    async (file: File | null, sample: boolean) => {
      const displayName = sample
        ? locale === "es" ? "factura-de-ejemplo.pdf" : "sample-invoice.pdf"
        : file?.name || "document";
      abort.current?.abort();
      const ctrl = new AbortController();
      abort.current = ctrl;
      setDownloadError(null);
      clearStash();
      const startedAt = Date.now();
      setPhase({ kind: "processing", file: displayName, stage: 0, runId: null, startedAt });

      const form = new FormData();
      form.set("tool", toolId);
      form.set("locale", locale);
      if (sample) form.set("sample", "1");
      else if (file) form.set("file", file, file.name);
      const token = turnstileToken();
      if (token) form.set("cf-turnstile-response", token);

      let runId: string;
      try {
        const res = await fetch("/api/lite/runs", { method: "POST", body: form, signal: ctrl.signal });
        const body = (await res.json().catch(() => ({}))) as { runId?: string; error?: string };
        if (!res.ok || !body.runId) {
          setPhase({ kind: "error", code: body.error || "backend", file: displayName });
          resetTurnstile();
          return;
        }
        runId = body.runId;
      } catch {
        if (ctrl.signal.aborted) return;
        setPhase({ kind: "error", code: "backend", file: displayName });
        resetTurnstile();
        return;
      }
      resetTurnstile();
      writeStash({ toolId, runId, file: displayName, startedAt });
      setPhase({ kind: "processing", file: displayName, stage: 1, runId, startedAt });
      await new Promise((r) => setTimeout(r, POLL_MS));
      await poll(runId, displayName, startedAt, ctrl);
    },
    [toolId, locale, poll, turnstileSiteKey], // eslint-disable-line react-hooks/exhaustive-deps
  );

  // Coming back from a sign-in round trip (or a reload): pick the run up
  // where it was. `?auth=1` means the visitor left to sign in for the
  // download, so once the rows are back the download fires by itself.
  const autoDownload = useRef(false);
  useEffect(() => {
    const stash = readStash(toolId);
    const url = new URL(window.location.href);
    if (url.searchParams.has("auth")) {
      autoDownload.current = stash !== null;
      url.searchParams.delete("auth");
      window.history.replaceState(null, "", url.pathname + url.search + url.hash);
    }
    if (!stash) return;
    const ctrl = new AbortController();
    abort.current = ctrl;
    // startedAt from the original submit keeps the timeout honest for a job
    // still running; the "ready in N s" figure is dropped for restored runs.
    const startedAt = Date.now() - stash.startedAt > MAX_WAIT_MS ? Date.now() : stash.startedAt;
    setPhase({ kind: "processing", file: stash.file, stage: 1, runId: stash.runId, startedAt });
    void poll(stash.runId, stash.file, startedAt, ctrl, true);
    return () => ctrl.abort();
  }, [toolId, poll]);

  useEffect(() => () => abort.current?.abort(), []);

  useEffect(() => {
    if (phase.kind === "done") {
      resultRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, [phase.kind]);

  useEffect(() => {
    const el = docDialog.current;
    if (!el) return;
    if (docOpen && !el.open) el.showModal();
    if (!docOpen && el.open) el.close();
  }, [docOpen]);

  useEffect(() => {
    const el = afterDialog.current;
    if (!el) return;
    if (afterOpen && !el.open) el.showModal();
    if (!afterOpen && el.open) el.close();
  }, [afterOpen]);

  const reset = () => {
    setDocOpen(false);
    setAfterOpen(false);
    clearStash();
    abort.current?.abort();
    setPhase({ kind: "idle" });
    setDownloadError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  // ---- download -------------------------------------------------------------
  const download = useCallback(async () => {
    if (phase.kind !== "done") return;
    setDownloading(true);
    setDownloadError(null);
    try {
      const res = await fetch(`/api/lite/runs/${encodeURIComponent(phase.runId)}/download`, {
        cache: "no-store",
      });
      if (res.status === 401) {
        setAuthOpen(true);
        return;
      }
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        setDownloadError(copy.errors[body.error || "backend"] ?? copy.errors.backend);
        return;
      }
      const blob = await res.blob();
      const cd = res.headers.get("content-disposition") || "";
      const m = /filename\*=UTF-8''([^;]+)/.exec(cd) || /filename="([^"]+)"/.exec(cd);
      const name = m ? decodeURIComponent(m[1]) : "tavnit.xlsx";
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 10_000);
      // The file is theirs. One beat later, once, "and then what?".
      if (afterShownFor.current !== phase.runId) {
        afterShownFor.current = phase.runId;
        setTimeout(() => setAfterOpen(true), 600);
      }
    } catch {
      setDownloadError(copy.errors.backend);
    } finally {
      setDownloading(false);
    }
  }, [phase, copy.errors]);

  // After a sign-in from the dialog, retry the download once.
  const onAuthed = useCallback(() => {
    setAuthOpen(false);
    void download();
  }, [download]);

  useEffect(() => {
    if (phase.kind === "done" && autoDownload.current) {
      autoDownload.current = false;
      void download();
    }
  }, [phase.kind, download]);

  /** The dialog is about to leave the page: keep the run so we can return to it. */
  const stashForRedirect = useCallback(() => {
    if (phase.kind === "done") {
      writeStash({ toolId, runId: phase.runId, file: phase.file, startedAt: Date.now() - phase.seconds * 1000 });
    }
  }, [phase, toolId]);

  const onFiles = (files: FileList | null) => {
    const f = files?.[0];
    if (f) void start(f, false);
  };

  // ---- the sheet, three states ---------------------------------------------
  const dropZone = (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        onFiles(e.dataTransfer.files);
      }}
      className={`${SHEET} p-3 sm:p-4`}
    >
      <label
        htmlFor="lite-file"
        className={`lite-ledger flex min-h-[280px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 text-center transition-colors ${
          dragging ? "border-[var(--lite-blue)]" : "border-[var(--lite-line)] hover:border-[var(--lite-blue)]"
        }`}
      >
        <span className="grid h-14 w-14 place-items-center rounded-full bg-[var(--lite-blue-soft)] text-[var(--lite-blue)]">
          <FileText size={26} aria-hidden />
        </span>
        <span className="mt-4 font-heading text-lg font-bold">{copy.drop.title}</span>
        <span className="mt-1 text-sm text-[var(--lite-muted)]">{copy.drop.hint}</span>
        <span className="lite-press mt-5 inline-flex min-h-10 items-center rounded-lg bg-[var(--lite-ink)] px-5 text-sm font-semibold text-white">
          {copy.drop.choose}
        </span>
        <span className="mt-4 text-xs text-[var(--lite-muted)]">{copy.drop.formats}</span>
      </label>
      <input
        ref={inputRef}
        id="lite-file"
        type="file"
        accept={LITE_ACCEPT}
        className="sr-only"
        onChange={(e) => onFiles(e.target.files)}
      />
      {/* Honeypot: never shown, never filled by people. */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />

      <div className="mt-3 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
        {hasSample ? (
          <button type="button" onClick={() => void start(null, true)} className={`${BTN_QUIET} w-full sm:w-auto`}>
            <Sparkles size={16} className="text-[var(--lite-blue)]" aria-hidden />
            {copy.drop.sample}
          </button>
        ) : (
          <span />
        )}
        {turnstileSiteKey && <div ref={turnstileEl} />}
      </div>
    </div>
  );

  const progress =
    phase.kind === "processing" ? (
      <div className={`${SHEET} p-3 sm:p-4`} role="status" aria-live="polite">
        <div className="flex items-center justify-between gap-3 px-1 pb-3">
          <span className="flex min-w-0 items-center gap-2 text-sm font-medium">
            <FileText size={18} className="shrink-0 text-[var(--lite-blue)]" aria-hidden />
            <span className="truncate">{phase.file}</span>
          </span>
          <span className="flex items-center gap-2 text-sm text-[var(--lite-muted)]">
            <Loader2 size={16} className="animate-spin text-[var(--lite-blue)]" aria-hidden />
            {copy.stages[phase.stage]}
          </span>
        </div>
        {/* ledger placeholder: the rows that are about to exist */}
        <div className="overflow-hidden rounded-xl border border-[var(--lite-line)]" aria-hidden>
          <div className="grid grid-cols-[2.5rem_repeat(4,1fr)] bg-[var(--lite-blue-soft)]">
            <div className="h-8" />
            {[0, 1, 2, 3].map((c) => (
              <div key={c} className="h-8 border-l border-[var(--lite-line)]" />
            ))}
          </div>
          {[0, 1, 2, 3, 4, 5].map((r) => (
            <div key={r} className="grid grid-cols-[2.5rem_repeat(4,1fr)] border-t border-[var(--lite-rule)]">
              <div className="h-9 bg-[#f6f8f6]" />
              {[0, 1, 2, 3].map((c) => (
                <div key={c} className="flex h-9 items-center border-l border-[var(--lite-rule)] px-3">
                  <span
                    className="lite-skeleton block h-2.5 rounded-sm bg-[var(--lite-rule)]"
                    style={{ width: `${45 + ((r * 7 + c * 13) % 45)}%`, animationDelay: `${(r * 4 + c) * 60}ms` }}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    ) : null;

  const errorBox =
    phase.kind === "error" ? (
      <div className={`${SHEET} p-3 sm:p-4`} role="alert">
        <div className="flex items-start gap-3 rounded-xl border border-[#f1d9c7] bg-[#fdf6ef] p-5">
          <TriangleAlert size={20} className="mt-0.5 shrink-0 text-[#b54708]" aria-hidden />
          <div className="min-w-0">
            {phase.file && <p className="truncate text-sm font-medium">{phase.file}</p>}
            <p className="mt-1 text-sm leading-relaxed text-[var(--lite-muted)]">
              {copy.errors[phase.code] ?? copy.errors.backend}
            </p>
            <button type="button" onClick={reset} className={`${BTN_QUIET} mt-4`}>
              <RotateCcw size={16} aria-hidden />
              {copy.result.another}
            </button>
          </div>
        </div>
      </div>
    ) : null;

  // ---- idle / processing / error ----------------------------------------------
  if (phase.kind !== "done") {
    return (
      <>
        <header className="max-w-[620px]">
          <h1 className="lite-display text-[2.6rem] leading-[1.05] sm:text-6xl">{copy.h1}</h1>
          <p className="mt-5 text-lg leading-relaxed text-[var(--lite-muted)]">{copy.intro}</p>
        </header>

        <div className="mt-10">
          {phase.kind === "idle" ? dropZone : phase.kind === "processing" ? progress : errorBox}
        </div>

        <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[var(--lite-muted)]">
          {copy.trust.map((t) => (
            <li key={t} className="flex items-center gap-2">
              <Check size={16} className="text-[var(--lite-blue)]" aria-hidden />
              {t}
            </li>
          ))}
        </ul>
      </>
    );
  }

  // ---- done: document + spreadsheet ---------------------------------------------
  const { columns, rows, total, truncated, pages, file, seconds, mime, runId } = phase;
  const summary =
    fill(copy.result.summary, {
      rows: plural(total, copy.result.rowWord),
      pages: plural(pages, copy.result.pageWord),
    }) + (seconds > 0 ? ` · ${fill(copy.result.readyIn, { s: seconds })}` : "");
  const documentUrl = `/api/lite/runs/${encodeURIComponent(runId)}/document`;
  const isPdf = !mime || mime === "application/pdf";
  const sums = columns.map((c) => {
    if (!SUMMABLE.test(c)) return null;
    let n = 0;
    let sum = 0;
    let first: number | null = null;
    let allSame = true;
    for (const r of rows) {
      const v = r[c];
      if (typeof v === "number") {
        n++;
        sum += v;
        if (first === null) first = v;
        else if (v !== first) allSame = false;
      }
    }
    // Header amounts (subtotal, tax, total) repeat on every line; adding
    // them up would be a number nobody asked for.
    if (rows.length > 1 && allSame) return null;
    return n >= Math.max(2, Math.ceil(rows.length / 2)) ? Math.round(sum * 100) / 100 : null;
  });
  const hasSums = sums.some((s) => s !== null);

  return (
    <>
      <section ref={resultRef} className="scroll-mt-20">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex min-w-0 items-start gap-3">
            <span className="lite-pop mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--lite-violet)] text-white">
              <Check size={20} aria-hidden />
            </span>
            <div className="min-w-0">
              <h1 className="lite-display truncate text-3xl">{fill(copy.result.heading, { file })}</h1>
              <p className="mt-1 text-sm text-[var(--lite-muted)]">{summary}</p>
            </div>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            <button type="button" onClick={reset} className={BTN_QUIET}>
              <RotateCcw size={16} aria-hidden />
              {copy.result.another}
            </button>
            <button
              type="button"
              onClick={() => void download()}
              disabled={downloading || rows.length === 0}
              className={BTN_DOWNLOAD}
            >
              {downloading ? <Loader2 size={16} className="animate-spin" aria-hidden /> : <Download size={16} aria-hidden />}
              {downloading ? copy.result.downloading : copy.result.download}
            </button>
          </div>
        </div>
        {downloadError && (
          <p role="alert" className="mt-3 text-sm text-[#b42318]">
            {downloadError}
          </p>
        )}

        {/* the document, one click away: a strip above the table, a viewer on demand */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[var(--lite-line)] bg-[var(--lite-white)] px-4 py-2.5 text-sm">
          <span className="flex min-w-0 items-center gap-2">
            <FileText size={18} className="shrink-0 text-[var(--lite-blue)]" aria-hidden />
            <span className="truncate font-medium">{file}</span>
            <span className="hidden text-[var(--lite-muted)] sm:inline">· {plural(pages, copy.result.pageWord)}</span>
            <span className="hidden text-[var(--lite-muted)] md:inline">· {copy.result.retention}</span>
          </span>
          <button type="button" onClick={() => setDocOpen(true)} className="lite-press inline-flex min-h-9 cursor-pointer items-center gap-1.5 rounded-lg px-2 text-sm font-medium text-[var(--lite-blue-ink)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lite-blue)]/50">
            <ExternalLink size={14} aria-hidden />
            {copy.result.openDocument}
          </button>
        </div>

        {/* the spreadsheet, full width */}
        {rows.length === 0 ? (
          <p className={`${SHEET} mt-4 px-5 py-6 text-sm leading-relaxed text-[var(--lite-muted)]`}>{copy.result.empty}</p>
        ) : (
          <div
            role="region"
            aria-label={summary}
            tabIndex={0}
            className={`${SHEET} mt-4 max-h-[70vh] overflow-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lite-blue)]/50`}
          >
            <table className="min-w-full border-collapse text-left text-sm">
              <thead className="sticky top-0 z-20">
                <tr className="bg-[var(--lite-blue-soft)] text-center text-[11px] font-semibold text-[var(--lite-blue)]">
                  <th scope="col" className="sticky left-0 z-30 w-10 border-b border-r border-[var(--lite-line)] bg-[var(--lite-blue-soft)] py-1.5" aria-label="#" />
                  {columns.map((c, i) => (
                    <th
                      key={c}
                      scope="col"
                      className="border-b border-r border-[var(--lite-line)] bg-[var(--lite-blue-soft)] px-3 py-1.5 font-semibold last:border-r-0"
                    >
                      {colLetter(i)}
                    </th>
                  ))}
                </tr>
                <tr className="bg-[#f3f6f4]">
                  <th scope="col" className="sticky left-0 z-30 border-b border-r border-[var(--lite-line)] bg-[#f3f6f4]" />
                  {columns.map((c) => (
                    <th
                      key={c}
                      scope="col"
                      className="whitespace-nowrap border-b border-r border-[var(--lite-line)] bg-[#f3f6f4] px-3 py-2 text-xs font-semibold last:border-r-0"
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, ri) => (
                  <tr key={ri} className="lite-row group" style={{ animationDelay: `${Math.min(ri, 30) * 28}ms` }}>
                    <td className="sticky left-0 z-10 border-b border-r border-[var(--lite-rule)] bg-[#f6f8f6] py-2 text-center text-xs text-[var(--lite-muted)]">
                      {ri + 1}
                    </td>
                    {columns.map((c) => {
                      const v = r[c];
                      const num = typeof v === "number";
                      return (
                        <td
                          key={c}
                          className={`lite-cell max-w-[420px] truncate border-b border-r border-[var(--lite-rule)] bg-[var(--lite-white)] px-3 py-2 last:border-r-0 group-hover:bg-[#fafcfa] ${
                            num ? "text-right tabular-nums" : ""
                          }`}
                          title={v === null ? undefined : String(v)}
                        >
                          {v === null ? "" : num ? formatNumber(v) : String(v)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
              {hasSums && (
                <tfoot className="sticky bottom-0 z-20">
                  <tr className="bg-[#f3f6f4] font-semibold">
                    <td className="sticky left-0 z-30 border-r border-t border-[var(--lite-line)] bg-[#f3f6f4] py-2 text-center text-[10px] text-[var(--lite-muted)]">
                      Σ
                    </td>
                    {columns.map((c, ci) => (
                      <td
                        key={c}
                        className={`border-r border-t border-[var(--lite-line)] bg-[#f3f6f4] px-3 py-2 tabular-nums last:border-r-0 ${
                          ci === 0 ? "text-left" : "text-right"
                        }`}
                      >
                        {sums[ci] !== null ? formatNumber(sums[ci] as number) : ci === 0 ? copy.result.sum : ""}
                      </td>
                    ))}
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        )}
        {truncated && (
          <p className="mt-3 text-xs text-[var(--lite-muted)]">{fill(copy.result.truncated, { shown: rows.length, total })}</p>
        )}

        {rows.length > 0 && (
          <div className="mt-6">
            <CleanerIdeas copy={copy.cleaners} locale={locale} columns={columns} rows={rows} />
          </div>
        )}
      </section>

      <div className="mt-24">
        <WhatNext copy={copy.next} locale={locale} fileName={file} rows={total} />
      </div>

      {/* the document viewer: the visitor's upload, large, on demand */}
      <dialog
        ref={docDialog}
        onCancel={(e) => {
          e.preventDefault();
          setDocOpen(false);
        }}
        onClick={(e) => {
          if (e.target === docDialog.current) setDocOpen(false);
        }}
        aria-label={copy.result.viewer}
        className="lite m-auto h-[min(92vh,1000px)] w-[min(94vw,900px)] overflow-hidden rounded-2xl border border-[var(--lite-line)] bg-white p-0 shadow-2xl backdrop:bg-[#1c2321]/60 backdrop:backdrop-blur-sm open:animate-[lite-pop_.2s_ease-out]"
        style={{ backgroundImage: "none" }}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-3 border-b border-[var(--lite-line)] px-4 py-2.5 text-sm">
            <span className="flex min-w-0 items-center gap-2 font-medium">
              <FileText size={18} className="shrink-0 text-[var(--lite-blue)]" aria-hidden />
              <span className="truncate">{file}</span>
            </span>
            <span className="flex items-center gap-2">
              <a href={documentUrl} target="_blank" rel="noopener" className="hidden text-[var(--lite-blue-ink)] hover:underline sm:inline">
                {copy.result.openDocument}
              </a>
              <button type="button" onClick={() => setDocOpen(false)} className={`${BTN_QUIET} min-h-9 px-3`}>
                {copy.result.closeDocument}
              </button>
            </span>
          </div>
          {docOpen &&
            (isPdf ? (
              <iframe src={`${documentUrl}#toolbar=0&navpanes=0&view=FitH`} title={copy.result.viewer} className="h-full w-full flex-1 bg-[#f3f6f4]" />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={documentUrl} alt={file} className="h-full w-full flex-1 object-contain bg-[#f3f6f4]" />
            ))}
        </div>
      </dialog>

      {/* right after the download: the diagram, once */}
      <dialog
        ref={afterDialog}
        onCancel={(e) => {
          e.preventDefault();
          setAfterOpen(false);
        }}
        onClick={(e) => {
          if (e.target === afterDialog.current) setAfterOpen(false);
        }}
        aria-label={copy.after.title}
        className="lite m-auto max-h-[92vh] w-[min(94vw,880px)] overflow-y-auto rounded-2xl border border-[var(--lite-line)] bg-white p-0 shadow-2xl backdrop:bg-[#1c2321]/60 backdrop:backdrop-blur-sm open:animate-[lite-pop_.2s_ease-out]"
        style={{ backgroundImage: "none" }}
      >
        <div className="p-6 sm:p-8">
          {afterOpen && (
            <WhatNext
              copy={copy.next}
              locale={locale}
              fileName={file}
              rows={total}
              compact
              heading={copy.after.title}
              lead={copy.after.lead}
            />
          )}
          <button type="button" onClick={() => setAfterOpen(false)} className={`${BTN_QUIET} mt-4`}>
            {copy.after.close}
          </button>
        </div>
      </dialog>

      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onAuthed={onAuthed}
        onBeforeRedirect={stashForRedirect}
        copy={copy.auth}
        locale={locale}
      />
    </>
  );
}
