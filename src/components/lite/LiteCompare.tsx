"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Download, GitCompareArrows, Loader2, RotateCcw, X } from "lucide-react";
import type { ToolCopy } from "@/lib/lite/copy";
import type { LiteToolId } from "@/lib/lite/tools";
import type { Locale } from "@/lib/locale";
import type { CompareResult, PoStatus } from "@/lib/lite/compare";
import AuthModal from "@/components/lite/AuthModal";
import WhatNext from "@/components/lite/WhatNext";
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
  sentence,
  useTurnstile,
  writeStash,
} from "@/components/lite/shared";

/**
 * A compare tool: two or three documents, each through the tool's Flow,
 * then the Matcher pairs their lines. PO vs invoice shows each PO line with
 * what the invoice says and a status; quotes show each line with a price
 * per supplier and the Champion. The comparison is downloadable as Excel
 * once signed in, like every result on these pages.
 */

const STASH_KEY = "tavnit_lite_cmp";

interface Stash {
  toolId: string;
  matchId: string;
  files: string[];
  savedAt: number;
}

type Phase =
  | { kind: "idle" }
  | { kind: "reading"; files: string[]; stage: number }
  | { kind: "matching"; files: string[]; matchId: string; stage: number }
  | { kind: "done"; files: string[]; matchId: string; result: CompareResult }
  | { kind: "error"; code: string; files: string[] };

export default function LiteCompare({
  toolId,
  locale,
  copy,
  turnstileSiteKey,
  minDocs,
  maxDocs,
  sampleNames,
  columns,
  lineFields,
}: {
  toolId: LiteToolId;
  locale: Locale;
  copy: ToolCopy;
  turnstileSiteKey: string | null;
  minDocs: number;
  maxDocs: number;
  /** Base names of the bundled samples, one per slot; empty when there are none. */
  sampleNames: string[];
  columns: string[];
  lineFields: string[];
}) {
  const cmp = copy.compare!;
  const [files, setFiles] = useState<(File | null)[]>(() => Array.from({ length: maxDocs }, () => null));
  const [phase, setPhase] = useState<Phase>({ kind: "idle" });
  const [authOpen, setAuthOpen] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [afterOpen, setAfterOpen] = useState(false);
  const afterDialog = useRef<HTMLDialogElement>(null);
  const afterShownFor = useRef<string | null>(null);
  const abort = useRef<AbortController | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const turnstile = useTurnstile(turnstileSiteKey, locale);
  const nf = new Intl.NumberFormat(locale === "es" ? "es-PA" : "en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const money = (v: number | null) => (v === null ? "" : nf.format(v));
  const qty = (v: number | null) => (v === null ? "" : Number.isInteger(v) ? String(v) : nf.format(v));

  const filled = files.filter(Boolean).length;
  const canRun = phase.kind === "idle" || phase.kind === "error" ? filled >= minDocs : false;

  // ---- the comparison itself -------------------------------------------------
  const pollMatch = useCallback(
    async (matchId: string, names: string[], ctrl: AbortController) => {
      const startedAt = Date.now();
      while (!ctrl.signal.aborted) {
        if (Date.now() - startedAt > MAX_WAIT_MS) {
          setPhase({ kind: "error", code: "timeout", files: names });
          return;
        }
        try {
          const res = await fetch(`/api/lite/compare/${encodeURIComponent(matchId)}`, { cache: "no-store", signal: ctrl.signal });
          if (res.status === 404) {
            clearStash(STASH_KEY);
            setPhase({ kind: "error", code: "not_found", files: names });
            return;
          }
          const body = (await res.json()) as { status: string; result?: CompareResult; error?: string };
          if (body.status === "completed" && body.result) {
            setPhase({ kind: "done", files: names, matchId, result: body.result });
            return;
          }
          if (body.status === "failed") {
            setPhase({ kind: "error", code: "failed", files: names });
            return;
          }
        } catch {
          if (ctrl.signal.aborted) return;
        }
        setPhase((p) => (p.kind === "matching" ? { ...p, stage: Math.min(p.stage + 1, cmp.stages.length - 1) } : p));
        await new Promise((r) => setTimeout(r, POLL_MS));
      }
    },
    [cmp.stages.length],
  );

  const start = useCallback(
    async (sample: boolean) => {
      const chosen = sample ? sampleNames.map(() => null) : files.filter((f): f is File => Boolean(f));
      const names = sample ? sampleNames : chosen.map((f) => f!.name);
      abort.current?.abort();
      const ctrl = new AbortController();
      abort.current = ctrl;
      setDownloadError(null);
      clearStash(STASH_KEY);
      setPhase({ kind: "reading", files: names, stage: 0 });

      // One run per document, in slot order (slot 0 is the reference).
      const runIds: string[] = [];
      for (let i = 0; i < names.length; i++) {
        const form = new FormData();
        form.set("tool", toolId);
        form.set("locale", locale);
        form.set("slot", String(i));
        if (sample) form.set("sample", String(i));
        else form.set("file", chosen[i]!, chosen[i]!.name);
        if (i === 0) {
          const token = turnstile.token();
          if (token) form.set("cf-turnstile-response", token);
        }
        try {
          const res = await fetch("/api/lite/runs", { method: "POST", body: form, signal: ctrl.signal });
          const body = (await res.json().catch(() => ({}))) as { runId?: string; error?: string };
          if (!res.ok || !body.runId) {
            setPhase({ kind: "error", code: body.error || "backend", files: names });
            turnstile.reset();
            return;
          }
          runIds.push(body.runId);
        } catch {
          if (!ctrl.signal.aborted) setPhase({ kind: "error", code: "backend", files: names });
          turnstile.reset();
          return;
        }
      }
      turnstile.reset();

      // Wait for every run.
      const startedAt = Date.now();
      const done = new Set<string>();
      while (done.size < runIds.length && !ctrl.signal.aborted) {
        await new Promise((r) => setTimeout(r, POLL_MS));
        if (Date.now() - startedAt > MAX_WAIT_MS) {
          setPhase({ kind: "error", code: "timeout", files: names });
          return;
        }
        for (const id of runIds) {
          if (done.has(id)) continue;
          try {
            const res = await fetch(`/api/lite/runs/${encodeURIComponent(id)}`, { cache: "no-store", signal: ctrl.signal });
            const body = (await res.json()) as { status: string; total?: number };
            if (body.status === "completed") {
              if (!body.total) {
                setPhase({ kind: "error", code: "no_lines", files: names });
                return;
              }
              done.add(id);
            } else if (body.status === "failed") {
              setPhase({ kind: "error", code: "failed", files: names });
              return;
            }
          } catch {
            if (ctrl.signal.aborted) return;
          }
        }
        setPhase((p) => (p.kind === "reading" ? { ...p, stage: Math.min(done.size, 1) } : p));
      }
      if (ctrl.signal.aborted) return;

      // Then the Matcher.
      let matchId: string;
      try {
        const res = await fetch("/api/lite/compare", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tool: toolId, runIds }),
          signal: ctrl.signal,
        });
        const body = (await res.json().catch(() => ({}))) as { matchId?: string; error?: string };
        if (!res.ok || !body.matchId) {
          setPhase({ kind: "error", code: body.error || "backend", files: names });
          return;
        }
        matchId = body.matchId;
      } catch {
        if (!ctrl.signal.aborted) setPhase({ kind: "error", code: "backend", files: names });
        return;
      }
      writeStash(STASH_KEY, { toolId, matchId, files: names });
      setPhase({ kind: "matching", files: names, matchId, stage: 2 });
      await pollMatch(matchId, names, ctrl);
    },
    [files, sampleNames, toolId, locale, turnstile, pollMatch],
  );

  // Back from a sign-in round trip (or a reload): pick the comparison up.
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
    setPhase({ kind: "matching", files: stash.files, matchId: stash.matchId, stage: 2 });
    void pollMatch(stash.matchId, stash.files, ctrl);
    return () => ctrl.abort();
  }, [toolId, pollMatch]);

  // ---- download ---------------------------------------------------------------
  const download = useCallback(async () => {
    if (phase.kind !== "done") return;
    setDownloading(true);
    setDownloadError(null);
    try {
      const res = await fetch(`/api/lite/compare/${encodeURIComponent(phase.matchId)}/download`, { cache: "no-store" });
      const ok = await saveResponse(res, "tavnit-comparison.xlsx");
      if (!ok) {
        setAuthOpen(true);
        return;
      }
      if (afterShownFor.current !== phase.matchId) {
        afterShownFor.current = phase.matchId;
        setTimeout(() => setAfterOpen(true), 600);
      }
    } catch (e) {
      const code = e instanceof Error ? e.message : "backend";
      setDownloadError(copy.errors[code] ?? copy.errors.backend);
    } finally {
      setDownloading(false);
    }
  }, [phase, copy.errors]);

  useEffect(() => {
    if (phase.kind === "done" && autoDownload.current) {
      autoDownload.current = false;
      void download();
    }
  }, [phase.kind, download]);

  useEffect(() => {
    if (phase.kind === "done") resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [phase.kind]);

  useEffect(() => {
    const el = afterDialog.current;
    if (!el) return;
    if (afterOpen && !el.open) el.showModal();
    if (!afterOpen && el.open) el.close();
  }, [afterOpen]);

  const reset = () => {
    abort.current?.abort();
    clearStash(STASH_KEY);
    setFiles(Array.from({ length: maxDocs }, () => null));
    setPhase({ kind: "idle" });
    setDownloadError(null);
    setAfterOpen(false);
  };

  const stashForRedirect = useCallback(() => {
    if (phase.kind === "done") writeStash(STASH_KEY, { toolId, matchId: phase.matchId, files: phase.files });
  }, [phase, toolId]);

  // ---- render ----------------------------------------------------------------
  if (phase.kind !== "done") {
    return (
      <>
        <Hero copy={copy} />
        <div className="mt-10">
          {phase.kind === "reading" || phase.kind === "matching" ? (
            <Progress file={phase.files.join(" · ")} stages={cmp.stages} stage={phase.stage} />
          ) : phase.kind === "error" ? (
            <ErrorBox message={copy.errors[phase.code] ?? copy.errors.backend} retry={() => setPhase({ kind: "idle" })} retryLabel={copy.result.another} />
          ) : (
            <div className={`${SHEET} p-3 sm:p-4`}>
              <div className={`grid gap-3 ${maxDocs >= 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
                {cmp.slots.slice(0, maxDocs).map((slot, i) => (
                  <div key={slot.title} className="relative">
                    <DropZone
                      id={`lite-file-${i}`}
                      copy={copy.drop}
                      title={slot.title}
                      hint={slot.hint}
                      compact
                      fileName={files[i]?.name ?? null}
                      onFiles={(list) => {
                        const f = list?.[0];
                        if (f) setFiles((prev) => prev.map((x, j) => (j === i ? f : x)));
                      }}
                    />
                    {files[i] && (
                      <button
                        type="button"
                        onClick={() => setFiles((prev) => prev.map((x, j) => (j === i ? null : x)))}
                        aria-label={`${copy.result.hideColumn}: ${files[i]?.name}`}
                        className="absolute right-2 top-2 grid h-7 w-7 cursor-pointer place-items-center rounded-md bg-white text-[var(--lite-muted)] shadow-sm hover:text-[var(--lite-ink)]"
                      >
                        <X size={14} aria-hidden />
                      </button>
                    )}
                    {slot.optional && !files[i] && (
                      <span className="pointer-events-none absolute right-3 top-3 rounded-md bg-white px-1.5 py-0.5 text-[10px] font-semibold text-[var(--lite-muted)] shadow-sm">
                        {locale === "es" ? "opcional" : "optional"}
                      </span>
                    )}
                  </div>
                ))}
              </div>
              {/* Honeypot: never shown, never filled by people. */}
              <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />
              <div className="mt-3 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
                {sampleNames.length >= minDocs ? <SampleButton label={cmp.sampleAll} onClick={() => void start(true)} className="w-full sm:w-auto" /> : <span />}
                {turnstileSiteKey && <div ref={turnstile.el} />}
                <button type="button" onClick={() => void start(false)} disabled={!canRun} className={`${BTN_INK} w-full sm:w-auto`}>
                  <GitCompareArrows size={16} aria-hidden />
                  {cmp.run}
                </button>
              </div>
              <p className="mt-3 text-center text-xs text-[var(--lite-muted)] sm:text-left">{copy.drop.formats}</p>
            </div>
          )}
        </div>
        <Trust copy={copy} />
      </>
    );
  }

  // ---- done ---------------------------------------------------------------------
  const { result } = phase;
  const badge = (s: PoStatus) =>
    s === "ok"
      ? "bg-[var(--lite-blue-soft)] text-[var(--lite-blue-ink)]"
      : s === "missing" || s === "extra"
        ? "bg-[#eef1f4] text-[var(--lite-muted)]"
        : "bg-[#fdf1e3] text-[#b54708]";
  const th = "whitespace-nowrap border-b border-r border-[var(--lite-line)] bg-[#f3f6f4] px-3 py-2 text-xs font-semibold last:border-r-0";
  const td = "border-b border-r border-[var(--lite-rule)] bg-[var(--lite-white)] px-3 py-2 last:border-r-0";
  const summaryLine =
    result.kind === "po"
      ? fill(cmp.summary, { n: plural(result.lines.length, cmp.labels.lines), ref: result.docs[0].file, doc: result.docs[1].file })
      : fill(cmp.summary, { n: plural(result.lines.length, cmp.labels.lines), ref: result.suppliers.map((s) => s.file).join(", "), doc: "" });

  return (
    <>
      <section ref={resultRef} className="scroll-mt-20">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex items-start gap-3">
            <span className="lite-brand mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full text-white">
              <Check size={20} aria-hidden />
            </span>
            <div className="min-w-0">
              <h2 className="lite-display text-2xl sm:text-3xl">{cmp.heading}</h2>
              <p className="mt-1 text-sm text-[var(--lite-muted)]">{summaryLine}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <button type="button" onClick={reset} className={BTN_QUIET}>
              <RotateCcw size={16} aria-hidden />
              {cmp.another}
            </button>
            <button type="button" onClick={() => void download()} disabled={downloading || result.lines.length === 0} className={BTN_DOWNLOAD}>
              {downloading ? <Loader2 size={16} className="animate-spin" aria-hidden /> : <Download size={16} aria-hidden />}
              {downloading ? copy.result.downloading : cmp.download}
            </button>
          </div>
        </div>
        {downloadError && (
          <p role="alert" className="mt-3 text-sm text-[#b42318]">
            {downloadError}
          </p>
        )}

        {result.kind === "po" && (
          <div className="mt-6 flex flex-wrap gap-2">
            {(Object.keys(result.summary) as PoStatus[]).filter((k) => result.summary[k] > 0).map((k) => (
              <span key={k} className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold ${badge(k)}`}>
                <span className="tabular-nums">{result.summary[k]}</span> {cmp.status[k]}
              </span>
            ))}
          </div>
        )}
        {result.kind === "quotes" && (
          <div className="mt-6 flex flex-wrap gap-2">
            {result.suppliers.map((s, i) => (
              <span key={s.runId} className="inline-flex items-center gap-2 rounded-lg border border-[var(--lite-line)] bg-white px-2.5 py-1 text-xs">
                <span className="font-semibold">{s.label}</span>
                <span className="text-[var(--lite-muted)]">{s.file}</span>
                <span className="rounded-md bg-[var(--lite-blue-soft)] px-1.5 font-semibold tabular-nums text-[var(--lite-blue-ink)]">{fill(cmp.labels.wins, { n: result.wins[i] })}</span>
              </span>
            ))}
          </div>
        )}

        {result.lines.length === 0 ? (
          <p className={`${SHEET} mt-4 px-5 py-6 text-sm leading-relaxed text-[var(--lite-muted)]`}>{cmp.empty}</p>
        ) : (
          <div role="region" aria-label={summaryLine} tabIndex={0} className={`${SHEET} lite-scroll mt-4 max-h-[70vh] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lite-blue)]/50`}>
            <table className="min-w-full border-collapse text-left text-sm">
              {result.kind === "po" ? (
                <>
                  <thead className="sticky top-0 z-20">
                    <tr>
                      <th scope="col" className={th}>{cmp.labels.description}</th>
                      <th scope="col" className={`${th} text-right`}>{cmp.labels.quantity} · {cmp.labels.ref}</th>
                      <th scope="col" className={`${th} text-right`}>{cmp.labels.quantity} · {cmp.labels.doc}</th>
                      <th scope="col" className={`${th} text-right`}>{cmp.labels.price} · {cmp.labels.ref}</th>
                      <th scope="col" className={`${th} text-right`}>{cmp.labels.price} · {cmp.labels.doc}</th>
                      <th scope="col" className={`${th} text-right`}>{cmp.labels.total} · {cmp.labels.ref}</th>
                      <th scope="col" className={`${th} text-right`}>{cmp.labels.total} · {cmp.labels.doc}</th>
                      <th scope="col" className={th}>{cmp.labels.status}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.lines.map((l, i) => {
                      const off = l.status === "price" || l.status === "both";
                      const qoff = l.status === "qty" || l.status === "both";
                      return (
                        <tr key={i} className="lite-row group" style={{ animationDelay: `${Math.min(i, 30) * 28}ms` }}>
                          <td className={`${td} max-w-[420px] truncate`} title={l.description}>
                            {l.description}
                            {l.doc?.description && l.doc.description !== l.description && (
                              <span className="block truncate text-xs text-[var(--lite-muted)]">{l.doc.description}</span>
                            )}
                          </td>
                          <td className={`${td} text-right tabular-nums`}>{qty(l.ref?.qty ?? null)}</td>
                          <td className={`${td} text-right tabular-nums ${qoff ? "font-semibold text-[#b54708]" : ""}`}>{qty(l.doc?.qty ?? null)}</td>
                          <td className={`${td} text-right tabular-nums`}>{money(l.ref?.price ?? null)}</td>
                          <td className={`${td} text-right tabular-nums ${off ? "font-semibold text-[#b54708]" : ""}`}>{money(l.doc?.price ?? null)}</td>
                          <td className={`${td} text-right tabular-nums`}>{money(l.ref?.total ?? null)}</td>
                          <td className={`${td} text-right tabular-nums`}>{money(l.doc?.total ?? null)}</td>
                          <td className={td}>
                            <span className={`inline-block whitespace-nowrap rounded-md px-2 py-0.5 text-xs font-semibold ${badge(l.status)}`}>{cmp.status[l.status]}</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  {result.totals.ref > 0 && (
                    <tfoot className="sticky bottom-0 z-20">
                      <tr className="bg-[#f3f6f4] font-semibold">
                        <td className="border-r border-t border-[var(--lite-line)] bg-[#f3f6f4] px-3 py-2">{copy.result.sum}</td>
                        <td className="border-r border-t border-[var(--lite-line)] bg-[#f3f6f4]" colSpan={4} />
                        <td className="border-r border-t border-[var(--lite-line)] bg-[#f3f6f4] px-3 py-2 text-right tabular-nums">{money(result.totals.ref)}</td>
                        <td className={`border-r border-t border-[var(--lite-line)] bg-[#f3f6f4] px-3 py-2 text-right tabular-nums ${Math.abs(result.totals.ref - result.totals.doc) > 0.011 ? "text-[#b54708]" : ""}`}>{money(result.totals.doc)}</td>
                        <td className="border-t border-[var(--lite-line)] bg-[#f3f6f4]" />
                      </tr>
                    </tfoot>
                  )}
                </>
              ) : (
                <>
                  <thead className="sticky top-0 z-20">
                    <tr>
                      <th scope="col" className={th}>{cmp.labels.description}</th>
                      {result.suppliers.map((s) => (
                        <th key={s.runId} scope="col" className={`${th} text-right`}>
                          {s.label}
                        </th>
                      ))}
                      <th scope="col" className={th}>{cmp.labels.champion}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.lines.map((l, i) => (
                      <tr key={i} className="lite-row group" style={{ animationDelay: `${Math.min(i, 30) * 28}ms` }}>
                        <td className={`${td} max-w-[420px] truncate`} title={l.description}>{l.description}</td>
                        {l.prices.map((p, j) => (
                          <td key={j} className={`${td} text-right tabular-nums ${l.champion.includes(j) ? "bg-[var(--lite-blue-soft)] font-semibold text-[var(--lite-blue-ink)]" : ""}`}>
                            {money(p)}
                          </td>
                        ))}
                        <td className={td}>
                          {l.champion.length > 0 && (
                            <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-md bg-[var(--lite-blue-soft)] px-2 py-0.5 text-xs font-semibold text-[var(--lite-blue-ink)]">
                              <Check size={12} aria-hidden />
                              {l.champion.map((j) => result.suppliers[j].label).join(", ")}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </>
              )}
            </table>
          </div>
        )}
        <p className="mt-3 text-xs text-[var(--lite-muted)]">{sentence(copy.result.retention)}.</p>
      </section>

      <div className="mt-24">
        <WhatNext copy={copy.next} locale={locale} fileName={phase.files[0]} rows={result.lines.length} columns={columns} lineFields={lineFields} />
      </div>

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
            <WhatNext copy={copy.next} locale={locale} fileName={phase.files[0]} rows={result.lines.length} compact heading={copy.after.title} lead={fill(copy.after.lead, { fields: columns.length })} columns={columns} lineFields={lineFields} />
          )}
          <button type="button" onClick={() => setAfterOpen(false)} className={`${BTN_QUIET} mt-4`}>
            {copy.after.close}
          </button>
        </div>
      </dialog>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} onAuthed={() => { setAuthOpen(false); void download(); }} onBeforeRedirect={stashForRedirect} copy={copy.auth} locale={locale} />
    </>
  );
}
