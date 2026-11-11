"use client";

import { trackEvent } from "@/lib/analytics";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Check, FileText, Loader2, RotateCcw, Table2, Tag, TriangleAlert, WandSparkles } from "lucide-react";
import type { ToolCopy } from "@/lib/lite/copy";
import type { CustomCopy } from "@/lib/lite/custom-copy";
import {
  CUSTOM_LIMITS,
  cleanCustomName,
  type CustomSuggestedField,
  type CustomSuggestion,
  type CustomToolView,
} from "@/lib/lite/custom";
import { LITE_ACCEPT, LITE_CUSTOM_TOOL_ID } from "@/lib/lite/tools";
import type { Locale } from "@/lib/locale";
import LiteTool from "@/components/lite/LiteTool";
import { BTN_QUIET, SHEET, fill, useTurnstile } from "@/components/lite/shared";

/**
 * The Custom Tool: the visitor builds their own extractor, then uses it.
 *
 *   sample    → upload one representative document
 *   analyzing → the product's assistant reads it and proposes the columns
 *   review    → the visitor unticks and renames; "Create my tool"
 *   ready     → the tool exists: its card above a drop zone, and from there
 *               it is LiteTool like any other extraction tool (the sample
 *               it was built from is run through it straight away)
 *
 * One tool per visitor. Rebuilding goes through the same three steps with a
 * new sample and replaces the tool only when the new columns are confirmed,
 * so backing out keeps the current one.
 *
 * The page only ever names which suggested fields stay and what they are
 * called; the extraction hints never leave the server (see lib/lite/custom.ts).
 */

type Row = CustomSuggestedField & { on: boolean; label: string };

type Phase =
  | { kind: "loading" }
  | { kind: "sample"; error: string | null }
  | { kind: "analyzing"; file: string; stage: number }
  | { kind: "review"; file: string; draftId: string; error: string | null; creating: boolean }
  | { kind: "ready" };

const BTN_VIOLET =
  "lite-press inline-flex min-h-11 shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[var(--lite-violet)] px-5 text-sm font-semibold text-white shadow-sm shadow-[#6c42f0]/30 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lite-violet)]/50 disabled:pointer-events-none disabled:opacity-50";

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--lite-violet-soft)] px-3 py-1 text-xs font-semibold text-[var(--lite-violet)]">
      <WandSparkles size={13} aria-hidden />
      {children}
    </span>
  );
}

export default function LiteCustom({
  locale,
  copy,
  custom,
  turnstileSiteKey,
}: {
  locale: Locale;
  copy: ToolCopy;
  custom: CustomCopy;
  turnstileSiteKey: string | null;
}) {
  const [phase, setPhase] = useState<Phase>({ kind: "loading" });
  const [tool, setTool] = useState<CustomToolView | null>(null);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [rows, setRows] = useState<Row[]>([]);
  const [name, setName] = useState("");
  const [dragging, setDragging] = useState(false);
  /** The sample the tool was just built from: LiteTool runs it on mount. */
  const [autoFile, setAutoFile] = useState<File | null>(null);
  const sampleFile = useRef<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abort = useRef<AbortController | null>(null);
  const turnstile = useTurnstile(turnstileSiteKey, locale);

  const errorText = useCallback(
    (code: string) => custom.errors[code] ?? copy.errors[code] ?? copy.errors.backend,
    [custom.errors, copy.errors],
  );

  // ---- the saved tool -------------------------------------------------------
  const load = useCallback(async (signal?: AbortSignal) => {
    try {
      const res = await fetch("/api/lite/custom", { cache: "no-store", signal });
      const body = (await res.json().catch(() => ({}))) as { tool?: CustomToolView | null; remaining?: number | null };
      if (signal?.aborted) return;
      setRemaining(typeof body.remaining === "number" ? body.remaining : null);
      setTool(body.tool ?? null);
      setPhase(body.tool ? { kind: "ready" } : { kind: "sample", error: null });
    } catch {
      if (signal?.aborted) return;
      setTool(null);
      setPhase({ kind: "sample", error: null });
    }
  }, []);

  useEffect(() => {
    const ctrl = new AbortController();
    void load(ctrl.signal);
    return () => ctrl.abort();
  }, [load]);

  useEffect(() => () => abort.current?.abort(), []);

  // ---- step 1: the sample ---------------------------------------------------
  const analyze = useCallback(
    async (file: File) => {
      abort.current?.abort();
      const ctrl = new AbortController();
      abort.current = ctrl;
      sampleFile.current = file;
      setPhase({ kind: "analyzing", file: file.name, stage: 0 });
      // Captions advance with time while the assistant works (one request,
      // no progress events); the last one holds until the answer lands.
      const timer = setInterval(() => {
        setPhase((p) => (p.kind === "analyzing" ? { ...p, stage: Math.min(p.stage + 1, custom.analyzing.length - 1) } : p));
      }, 4500);

      const form = new FormData();
      form.set("locale", locale);
      form.set("file", file, file.name);
      const token = turnstile.token();
      if (token) form.set("cf-turnstile-response", token);

      try {
        const res = await fetch("/api/lite/custom/suggest", { method: "POST", body: form, signal: ctrl.signal });
        const body = (await res.json().catch(() => ({}))) as Partial<CustomSuggestion> & { error?: string };
        if (!res.ok || !body.draftId || !Array.isArray(body.fields) || body.fields.length === 0) {
          setPhase({ kind: "sample", error: errorText(body.error || "backend") });
          return;
        }
        trackEvent("lite_custom_suggested", { locale, fields: body.fields.length });
        setRows(body.fields.map((f) => ({ ...f, on: true, label: f.name })));
        setName(body.name || "");
        if (typeof body.remaining === "number") setRemaining(body.remaining);
        setPhase({ kind: "review", file: file.name, draftId: body.draftId, error: null, creating: false });
      } catch {
        if (ctrl.signal.aborted) return;
        setPhase({ kind: "sample", error: errorText("backend") });
      } finally {
        clearInterval(timer);
        turnstile.reset();
        if (inputRef.current) inputRef.current.value = "";
      }
    },
    [locale, custom.analyzing.length, errorText, turnstile.token, turnstile.reset], // eslint-disable-line react-hooks/exhaustive-deps
  );

  const onFiles = (files: FileList | null) => {
    const f = files?.[0];
    if (f) void analyze(f);
  };

  // ---- step 2: review and create ---------------------------------------------
  const chosen = useMemo(() => rows.filter((r) => r.on), [rows]);

  const create = useCallback(async () => {
    if (phase.kind !== "review" || phase.creating) return;
    const fail = (code: keyof CustomCopy["review"]["errors"]) => setPhase({ ...phase, error: custom.review.errors[code] });
    if (chosen.length === 0) return fail("no_fields");
    const labels = chosen.map((r) => cleanCustomName(r.label, CUSTOM_LIMITS.maxFieldNameLength));
    if (labels.some((l) => !l)) return fail("bad_field");
    if (new Set(labels.map((l) => l.toLocaleLowerCase())).size !== labels.length) return fail("duplicate_name");

    setPhase({ ...phase, error: null, creating: true });
    try {
      const res = await fetch("/api/lite/custom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ draftId: phase.draftId, name, fields: chosen.map((r, i) => ({ key: r.key, name: labels[i] })) }),
      });
      const body = (await res.json().catch(() => ({}))) as { tool?: CustomToolView; error?: string };
      if (!res.ok || !body.tool) {
        const code = body.error || "create_failed";
        if (code === "draft_expired") {
          setPhase({ kind: "sample", error: errorText(code) });
          return;
        }
        setPhase({
          ...phase,
          creating: false,
          error: code in custom.review.errors ? custom.review.errors[code as keyof CustomCopy["review"]["errors"]] : errorText(code),
        });
        return;
      }
      trackEvent("lite_custom_created", { locale, fields: body.tool.fields.length, replaced: tool !== null });
      setAutoFile(sampleFile.current);
      setTool(body.tool);
      setPhase({ kind: "ready" });
    } catch {
      setPhase({ ...phase, creating: false, error: errorText("create_failed") });
    }
  }, [phase, chosen, name, custom.review.errors, errorText, locale, tool]);

  const startRebuild = () => {
    setAutoFile(null);
    setPhase({ kind: "sample", error: null });
  };
  const cancelRebuild = () => {
    abort.current?.abort();
    setPhase({ kind: "ready" });
  };

  /** A run answered that the tool is gone (expired, other browser): start over. */
  const onRunError = useCallback(
    (code: string) => {
      if (code !== "no_tool") return;
      setTool(null);
      setAutoFile(null);
      setPhase({ kind: "sample", error: errorText("no_tool") });
    },
    [errorText],
  );

  const dateFmt = useMemo(() => new Intl.DateTimeFormat(locale === "es" ? "es-PA" : "en-US", { day: "numeric", month: "long", year: "numeric" }), [locale]);

  // ---- ready: the tool, then LiteTool ------------------------------------------
  if (phase.kind === "ready" && tool) {
    const header = (
      <header>
        <Badge>{custom.badge}</Badge>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h1 className="lite-display break-words text-3xl leading-tight sm:text-5xl">{fill(custom.tool.heading, { name: tool.name })}</h1>
            <p className="mt-3 text-base leading-relaxed text-[var(--lite-muted)]">{custom.tool.lead}</p>
          </div>
          <button type="button" onClick={startRebuild} className={BTN_QUIET}>
            <RotateCcw size={16} aria-hidden />
            {custom.tool.rebuild}
          </button>
        </div>
        <div className="mt-5 rounded-xl border border-[var(--lite-line)] bg-[var(--lite-white)] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--lite-muted)]">
            {custom.tool.columns} · {tool.fields.length}
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {tool.fields.map((f) => (
              <li
                key={f.name}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${
                  f.kind === "table"
                    ? "border-[var(--lite-blue)]/25 bg-[var(--lite-blue-soft)] text-[var(--lite-blue-ink)]"
                    : "border-[var(--lite-violet)]/25 bg-[var(--lite-violet-soft)] text-[var(--lite-violet)]"
                }`}
                title={f.kind === "table" ? custom.review.tableTitle : custom.review.metadataTitle}
              >
                {f.kind === "table" ? <Table2 size={12} aria-hidden /> : <Tag size={12} aria-hidden />}
                {f.name}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-[var(--lite-muted)]">
            {autoFile ? `${custom.created} ` : ""}
            {tool.expiresAt ? fill(custom.tool.expires, { date: dateFmt.format(new Date(tool.expiresAt)) }) : custom.tool.kept}
          </p>
        </div>
      </header>
    );
    return (
      <LiteTool
        key={tool.id}
        toolId={LITE_CUSTOM_TOOL_ID}
        locale={locale}
        copy={copy}
        turnstileSiteKey={turnstileSiteKey}
        hasSample={false}
        header={header}
        lineFieldsOverride={tool.fields.filter((f) => f.kind === "table").map((f) => f.name)}
        autoStartFile={autoFile}
        onRunError={onRunError}
      />
    );
  }

  // ---- before the tool exists (or while rebuilding it) ---------------------------
  const rebuilding = tool !== null;
  const title = (
    <header className="max-w-[660px]">
      <Badge>{custom.badge}</Badge>
      <h1 className="lite-display mt-4 text-[2.6rem] leading-[1.05] sm:text-6xl">{rebuilding ? custom.rebuild.heading : copy.h1}</h1>
      <p className="mt-5 text-lg leading-relaxed text-[var(--lite-muted)]">
        {rebuilding ? fill(custom.rebuild.lead, { name: tool.name }) : copy.intro}
      </p>
    </header>
  );

  if (phase.kind === "review") {
    const groups: { kind: "metadata" | "table"; title: string; hint: string }[] = [
      { kind: "metadata", title: custom.review.metadataTitle, hint: custom.review.metadataHint },
      { kind: "table", title: custom.review.tableTitle, hint: custom.review.tableHint },
    ];
    const setRow = (key: string, patch: Partial<Row>) => setRows((rs) => rs.map((r) => (r.key === key ? { ...r, ...patch } : r)));
    return (
      <>
        <header className="max-w-[660px]">
          <Badge>{custom.badge}</Badge>
          <h1 className="lite-display mt-4 text-3xl leading-tight sm:text-5xl">{custom.review.heading}</h1>
          <p className="mt-4 text-base leading-relaxed text-[var(--lite-muted)]">{fill(custom.review.lead, { file: phase.file })}</p>
        </header>

        <div className={`${SHEET} mt-8 p-4 sm:p-6`}>
          <label className="block max-w-[420px]">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--lite-muted)]">{custom.review.nameLabel}</span>
            <input
              type="text"
              value={name}
              maxLength={CUSTOM_LIMITS.maxNameLength}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 block min-h-11 w-full rounded-lg border border-[var(--lite-line)] bg-white px-3 font-heading text-lg font-bold focus:border-[var(--lite-violet)] focus:outline-none focus:ring-2 focus:ring-[var(--lite-violet)]/25"
            />
          </label>

          {groups.map((g) => {
            const items = rows.filter((r) => r.kind === g.kind);
            if (!items.length) return null;
            return (
              <section key={g.kind} className="mt-7">
                <h2 className="flex flex-wrap items-baseline gap-x-2 text-sm font-semibold">
                  <span className="inline-flex items-center gap-1.5">
                    {g.kind === "table" ? <Table2 size={15} className="text-[var(--lite-blue)]" aria-hidden /> : <Tag size={15} className="text-[var(--lite-violet)]" aria-hidden />}
                    {g.title}
                  </span>
                  <span className="text-xs font-normal text-[var(--lite-muted)]">{g.hint}</span>
                </h2>
                <ul className="mt-3 divide-y divide-[var(--lite-rule)] overflow-hidden rounded-xl border border-[var(--lite-line)]">
                  {items.map((r) => (
                    <li key={r.key} className={`flex flex-wrap items-center gap-x-3 gap-y-1 px-3 py-2 transition-colors ${r.on ? "bg-white" : "bg-[#f6f8f6]"}`}>
                      <input
                        type="checkbox"
                        checked={r.on}
                        onChange={(e) => setRow(r.key, { on: e.target.checked })}
                        aria-label={fill(custom.review.include, { col: r.label || r.name })}
                        className="h-5 w-5 shrink-0 cursor-pointer accent-[var(--lite-violet)]"
                      />
                      <input
                        type="text"
                        value={r.label}
                        disabled={!r.on}
                        maxLength={CUSTOM_LIMITS.maxFieldNameLength}
                        onChange={(e) => setRow(r.key, { label: e.target.value })}
                        aria-label={fill(custom.review.rename, { col: r.name })}
                        className="min-h-9 min-w-0 flex-1 basis-40 rounded-md border border-transparent bg-transparent px-2 text-sm font-semibold hover:border-[var(--lite-line)] focus:border-[var(--lite-violet)] focus:bg-white focus:outline-none disabled:text-[var(--lite-muted)] disabled:line-through"
                      />
                      <span className="shrink-0 rounded-md bg-[#eef1f4] px-2 py-0.5 text-[11px] font-semibold text-[var(--lite-muted)]">
                        {custom.review.types[r.dataType]}
                      </span>
                      {r.example && (
                        <span className="min-w-0 basis-full truncate pl-8 text-xs text-[var(--lite-muted)] sm:basis-56 sm:pl-0" title={r.example}>
                          {custom.review.example} {r.example}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}

          {phase.error && (
            <p role="alert" className="mt-5 flex items-start gap-2 text-sm text-[#b42318]">
              <TriangleAlert size={16} className="mt-0.5 shrink-0" aria-hidden />
              {phase.error}
            </p>
          )}

          <div className="mt-6 flex flex-col gap-3 border-t border-[var(--lite-rule)] pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-[var(--lite-muted)]">
              {fill(custom.review.chosen[chosen.length === 1 ? 0 : 1], { n: chosen.length })}
              {rebuilding ? ` · ${custom.review.replaces}` : ""}
            </p>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => setPhase({ kind: "sample", error: null })} disabled={phase.creating} className={BTN_QUIET}>
                {custom.review.back}
              </button>
              <button type="button" onClick={() => void create()} disabled={phase.creating || chosen.length === 0} className={BTN_VIOLET}>
                {phase.creating ? <Loader2 size={16} className="animate-spin" aria-hidden /> : <WandSparkles size={16} aria-hidden />}
                {phase.creating ? custom.review.creating : custom.review.create}
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {title}

      <div className="mt-10">
        {phase.kind === "loading" ? (
          <div className={`${SHEET} flex min-h-[300px] items-center justify-center gap-2 p-4 text-sm text-[var(--lite-muted)]`} role="status">
            <Loader2 size={16} className="animate-spin text-[var(--lite-violet)]" aria-hidden />
            {custom.loading}
          </div>
        ) : phase.kind === "analyzing" ? (
          <div className={`${SHEET} p-3 sm:p-4`} role="status" aria-live="polite">
            <div className="flex items-center justify-between gap-3 px-1 pb-3">
              <span className="flex min-w-0 items-center gap-2 text-sm font-medium">
                <FileText size={18} className="shrink-0 text-[var(--lite-violet)]" aria-hidden />
                <span className="truncate">{phase.file}</span>
              </span>
              <span className="flex items-center gap-2 text-sm text-[var(--lite-muted)]">
                <Loader2 size={16} className="animate-spin text-[var(--lite-violet)]" aria-hidden />
                {custom.analyzing[phase.stage]}
              </span>
            </div>
            {/* the columns that are about to be proposed */}
            <div className="space-y-2 rounded-xl border border-[var(--lite-line)] p-4" aria-hidden>
              {[0, 1, 2, 3, 4, 5].map((r) => (
                <div key={r} className="flex items-center gap-3">
                  <span className="h-5 w-5 shrink-0 rounded bg-[var(--lite-violet-soft)]" />
                  <span className="lite-skeleton block h-3 rounded-sm bg-[var(--lite-rule)]" style={{ width: `${30 + ((r * 17) % 40)}%`, animationDelay: `${r * 90}ms` }} />
                </div>
              ))}
            </div>
          </div>
        ) : (
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
              htmlFor="lite-custom-file"
              className={`lite-ledger flex min-h-[280px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 text-center transition-colors ${
                dragging ? "border-[var(--lite-violet)]" : "border-[var(--lite-line)] hover:border-[var(--lite-violet)]"
              }`}
            >
              <span className="grid h-14 w-14 place-items-center rounded-full bg-[var(--lite-violet-soft)] text-[var(--lite-violet)]">
                <WandSparkles size={26} aria-hidden />
              </span>
              <span className="mt-4 font-heading text-lg font-bold">{custom.sample.title}</span>
              <span className="mt-1 text-sm text-[var(--lite-muted)]">{custom.sample.hint}</span>
              <span className="lite-press mt-5 inline-flex min-h-10 items-center rounded-lg bg-[var(--lite-violet)] px-5 text-sm font-semibold text-white">
                {custom.sample.choose}
              </span>
              <span className="mt-4 text-xs text-[var(--lite-muted)]">{custom.sample.formats}</span>
            </label>
            <input ref={inputRef} id="lite-custom-file" type="file" accept={LITE_ACCEPT} className="sr-only" onChange={(e) => onFiles(e.target.files)} />

            {phase.kind === "sample" && phase.error && (
              <p role="alert" className="mt-3 flex items-start gap-2 rounded-lg border border-[#f1d9c7] bg-[#fdf6ef] px-3 py-2.5 text-sm leading-relaxed text-[#8a3a06]">
                <TriangleAlert size={16} className="mt-0.5 shrink-0" aria-hidden />
                {phase.error}
              </p>
            )}

            <div className="mt-3 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
              {rebuilding ? (
                <button type="button" onClick={cancelRebuild} className={`${BTN_QUIET} w-full sm:w-auto`}>
                  {custom.rebuild.cancel}
                </button>
              ) : (
                <span />
              )}
              {remaining !== null && (
                <span className="text-xs text-[var(--lite-muted)]">{fill(custom.sample.left[remaining === 1 ? 0 : 1], { n: remaining })}</span>
              )}
            </div>
            {turnstileSiteKey && <div ref={turnstile.el} className="flex justify-center empty:hidden [&:has(iframe)]:mt-3" />}
          </div>
        )}
      </div>

      <ul className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-[var(--lite-muted)]">
        {copy.trust.map((t) => (
          <li key={t} className="flex items-center gap-2 whitespace-nowrap">
            <Check size={16} className="text-[var(--lite-violet)]" aria-hidden />
            {t}
          </li>
        ))}
      </ul>
    </>
  );
}
