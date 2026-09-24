"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Download, FileText, Loader2, RotateCcw } from "lucide-react";
import type { ToolCopy } from "@/lib/lite/copy";
import type { LiteToolId } from "@/lib/lite/tools";
import type { Locale } from "@/lib/locale";
import type { SegmentView } from "@/lib/lite/split-view";
import AuthModal from "@/components/lite/AuthModal";
import WhatNext from "@/components/lite/WhatNext";
import {
  BTN_DOWNLOAD,
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
 * The split tool: one scanned bundle through the tool's Splitter. Out come
 * the documents it found, each with its page range, the type it matched
 * and a one-line description; each is downloadable on its own or all in a
 * zip, once signed in.
 */

const STASH_KEY = "tavnit_lite_split";

interface Stash {
  toolId: string;
  splitId: string;
  file: string;
  savedAt: number;
}

type Phase =
  | { kind: "idle" }
  | { kind: "processing"; file: string; splitId: string | null; stage: number }
  | { kind: "done"; file: string; splitId: string; segments: SegmentView[]; pages: number }
  | { kind: "error"; code: string; file: string | null };

export default function LiteSplit({
  toolId,
  locale,
  copy,
  turnstileSiteKey,
  hasSample,
  sampleName,
}: {
  toolId: LiteToolId;
  locale: Locale;
  copy: ToolCopy;
  turnstileSiteKey: string | null;
  hasSample: boolean;
  sampleName: string;
}) {
  const sc = copy.split!;
  const [phase, setPhase] = useState<Phase>({ kind: "idle" });
  const [authOpen, setAuthOpen] = useState(false);
  const [downloading, setDownloading] = useState<number | "all" | null>(null);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const pending = useRef<number | "all" | null>(null);
  const abort = useRef<AbortController | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const turnstile = useTurnstile(turnstileSiteKey, locale);

  const poll = useCallback(
    async (splitId: string, file: string, ctrl: AbortController) => {
      const startedAt = Date.now();
      let stage = 1;
      while (!ctrl.signal.aborted) {
        if (Date.now() - startedAt > MAX_WAIT_MS) {
          setPhase({ kind: "error", code: "timeout", file });
          return;
        }
        try {
          const res = await fetch(`/api/lite/split/${encodeURIComponent(splitId)}`, { cache: "no-store", signal: ctrl.signal });
          if (res.status === 404) {
            clearStash(STASH_KEY);
            setPhase({ kind: "error", code: "not_found", file });
            return;
          }
          const body = (await res.json()) as { status: string; segments?: SegmentView[]; pages?: number };
          if (body.status === "completed") {
            setPhase({ kind: "done", file, splitId, segments: body.segments ?? [], pages: body.pages ?? 0 });
            return;
          }
          if (body.status === "failed") {
            setPhase({ kind: "error", code: "failed", file });
            return;
          }
        } catch {
          if (ctrl.signal.aborted) return;
        }
        stage = Math.min(stage + 1, sc.stages.length - 1);
        setPhase({ kind: "processing", file, splitId, stage });
        await new Promise((r) => setTimeout(r, POLL_MS));
      }
    },
    [sc.stages.length],
  );

  const start = useCallback(
    async (file: File | null, sample: boolean) => {
      const name = sample ? sampleName : file?.name || "document.pdf";
      abort.current?.abort();
      const ctrl = new AbortController();
      abort.current = ctrl;
      setDownloadError(null);
      clearStash(STASH_KEY);
      setPhase({ kind: "processing", file: name, splitId: null, stage: 0 });
      const form = new FormData();
      form.set("tool", toolId);
      form.set("locale", locale);
      if (sample) form.set("sample", "1");
      else if (file) form.set("file", file, file.name);
      const token = turnstile.token();
      if (token) form.set("cf-turnstile-response", token);
      let splitId: string;
      try {
        const res = await fetch("/api/lite/split", { method: "POST", body: form, signal: ctrl.signal });
        const body = (await res.json().catch(() => ({}))) as { splitId?: string; error?: string };
        if (!res.ok || !body.splitId) {
          setPhase({ kind: "error", code: body.error || "backend", file: name });
          turnstile.reset();
          return;
        }
        splitId = body.splitId;
      } catch {
        if (!ctrl.signal.aborted) setPhase({ kind: "error", code: "backend", file: name });
        turnstile.reset();
        return;
      }
      turnstile.reset();
      writeStash(STASH_KEY, { toolId, splitId, file: name });
      setPhase({ kind: "processing", file: name, splitId, stage: 1 });
      await new Promise((r) => setTimeout(r, POLL_MS));
      await poll(splitId, name, ctrl);
    },
    [toolId, locale, sampleName, turnstile, poll],
  );

  // Back from a sign-in round trip (or a reload).
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
    setPhase({ kind: "processing", file: stash.file, splitId: stash.splitId, stage: 1 });
    void poll(stash.splitId, stash.file, ctrl);
    return () => ctrl.abort();
  }, [toolId, poll]);

  const download = useCallback(
    async (which: number | "all") => {
      if (phase.kind !== "done") return;
      setDownloading(which);
      setDownloadError(null);
      pending.current = which;
      try {
        const url =
          which === "all"
            ? `/api/lite/split/${encodeURIComponent(phase.splitId)}/download`
            : `/api/lite/split/${encodeURIComponent(phase.splitId)}/segment/${which}`;
        const res = await fetch(url, { cache: "no-store" });
        const ok = await saveResponse(res, which === "all" ? "tavnit-documents.zip" : "tavnit-document.pdf");
        if (!ok) {
          setAuthOpen(true);
          return;
        }
        pending.current = null;
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
      void download("all");
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
    if (phase.kind === "done") writeStash(STASH_KEY, { toolId, splitId: phase.splitId, file: phase.file });
  }, [phase, toolId]);

  if (phase.kind !== "done") {
    return (
      <>
        <Hero copy={copy} />
        <div className="mt-10">
          {phase.kind === "processing" ? (
            <Progress file={phase.file} stages={sc.stages} stage={phase.stage} />
          ) : phase.kind === "error" ? (
            <ErrorBox message={copy.errors[phase.code] ?? copy.errors.backend} retry={() => setPhase({ kind: "idle" })} retryLabel={sc.another} />
          ) : (
            <div className={`${SHEET} p-3 sm:p-4`}>
              <DropZone
                id="lite-file"
                copy={copy.drop}
                onFiles={(list) => {
                  const f = list?.[0];
                  if (f) void start(f, false);
                }}
              />
              <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />
              <div className="mt-3 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
                {hasSample ? <SampleButton label={copy.drop.sample} onClick={() => void start(null, true)} className="w-full sm:w-auto" /> : <span />}
                {turnstileSiteKey && <div ref={turnstile.el} />}
              </div>
            </div>
          )}
        </div>
        <Trust copy={copy} />
      </>
    );
  }

  const { segments, pages, file } = phase;
  const pageRange = (s: SegmentView) =>
    s.from === null ? "" : s.to !== null && s.to !== s.from ? fill(sc.pages, { from: s.from, to: s.to }) : fill(sc.pageOne, { from: s.from });

  return (
    <>
      <section ref={resultRef} className="scroll-mt-20">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex items-start gap-3">
            <span className="lite-brand mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full text-white">
              <Check size={20} aria-hidden />
            </span>
            <div className="min-w-0">
              <h2 className="lite-display text-2xl sm:text-3xl">{fill(sc.heading, { file })}</h2>
              <p className="mt-1 text-sm text-[var(--lite-muted)]">
                {fill(sc.summary, { n: plural(segments.length, sc.segmentWord), pages: plural(pages, sc.pageWord) })} · {copy.result.retention}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <button type="button" onClick={reset} className={BTN_QUIET}>
              <RotateCcw size={16} aria-hidden />
              {sc.another}
            </button>
            <button type="button" onClick={() => void download("all")} disabled={downloading !== null || !segments.some((s) => s.hasFile)} className={BTN_DOWNLOAD}>
              {downloading === "all" ? <Loader2 size={16} className="animate-spin" aria-hidden /> : <Download size={16} aria-hidden />}
              {downloading === "all" ? copy.result.downloading : sc.downloadAll}
            </button>
          </div>
        </div>
        {downloadError && (
          <p role="alert" className="mt-3 text-sm text-[#b42318]">
            {downloadError}
          </p>
        )}

        {segments.length === 0 ? (
          <p className={`${SHEET} mt-6 px-5 py-6 text-sm leading-relaxed text-[var(--lite-muted)]`}>{sc.empty}</p>
        ) : (
          <ol className="mt-6 grid gap-3 sm:grid-cols-2">
            {segments.map((s, i) => (
              <li key={s.index} className={`${SHEET} lite-pop flex gap-4 p-4 sm:p-5`} style={{ animationDelay: `${i * 60}ms` }}>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[var(--lite-blue-soft)] text-[var(--lite-blue)]">
                  <FileText size={20} aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="font-heading text-base font-bold">{String(i + 1).padStart(2, "0")}</span>
                    <span className={`rounded-md px-2 py-0.5 text-xs font-semibold ${s.type ? "bg-[var(--lite-blue-soft)] text-[var(--lite-blue-ink)]" : "bg-[#eef1f4] text-[var(--lite-muted)]"}`}>
                      {s.type ?? sc.unmatched}
                    </span>
                    <span className="text-xs text-[var(--lite-muted)]">{pageRange(s)}</span>
                  </div>
                  {(s.description || s.title) && <p className="mt-1.5 text-sm leading-snug">{s.description || s.title}</p>}
                  {s.reason && <p className="mt-1 text-xs leading-snug text-[var(--lite-muted)]">{s.reason}</p>}
                  <button
                    type="button"
                    onClick={() => void download(s.index)}
                    disabled={!s.hasFile || downloading !== null}
                    className="lite-press mt-3 inline-flex min-h-9 cursor-pointer items-center gap-1.5 rounded-lg border border-[var(--lite-line)] bg-white px-3 text-sm font-semibold transition-colors hover:border-[var(--lite-blue)] hover:text-[var(--lite-blue-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lite-blue)]/50 disabled:pointer-events-none disabled:opacity-50"
                  >
                    {downloading === s.index ? <Loader2 size={14} className="animate-spin" aria-hidden /> : <Download size={14} aria-hidden />}
                    {sc.download}
                  </button>
                </div>
              </li>
            ))}
          </ol>
        )}
      </section>

      <div className="mt-24">
        <WhatNext copy={copy.next} locale={locale} fileName={file} rows={segments.length} />
      </div>

      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onAuthed={() => {
          setAuthOpen(false);
          void download(pending.current ?? "all");
        }}
        onBeforeRedirect={stashForRedirect}
        copy={copy.auth}
        locale={locale}
      />
    </>
  );
}
