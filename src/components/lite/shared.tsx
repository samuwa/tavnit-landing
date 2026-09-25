"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, FileText, Sparkles } from "lucide-react";
import type { ToolCopy } from "@/lib/lite/copy";
import { LITE_ACCEPT } from "@/lib/lite/tools";
import type { Locale } from "@/lib/locale";

/**
 * Pieces the tool pages share: button styles, string helpers, the Turnstile
 * widget, the session-storage stash that survives a sign-in round trip, and
 * the drop zone. LiteTool (the first tool) predates this file and keeps its
 * own copies; the compare and split tools build on these.
 */

export const BTN_DOWNLOAD =
  "lite-press inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[var(--lite-blue)] px-5 text-sm font-semibold text-white shadow-sm shadow-[#3b82f6]/30 transition-colors hover:bg-[var(--lite-blue-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lite-blue)]/50 disabled:pointer-events-none disabled:opacity-50";
export const BTN_QUIET =
  "lite-press inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-lg border border-[var(--lite-line)] bg-[var(--lite-white)] px-4 text-sm font-semibold transition-colors hover:border-[var(--lite-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lite-blue)]/50 disabled:pointer-events-none disabled:opacity-50";
export const BTN_INK =
  "lite-press inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[var(--lite-ink)] px-5 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lite-blue)]/50 disabled:pointer-events-none disabled:opacity-40";
export const SHEET = "lite-sheet relative rounded-2xl border border-[var(--lite-line)] bg-[var(--lite-white)]";
export const POLL_MS = 2500;
export const MAX_WAIT_MS = 4 * 60 * 1000;

export function fill(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? ""));
}
export function plural(n: number, words: [string, string]): string {
  return `${n} ${n === 1 ? words[0] : words[1]}`;
}

/** Reads a download response and hands the file to the browser. Returns the
 *  file name, or false on 401 (sign-in needed). */
export async function saveResponse(res: Response, fallback: string): Promise<string | false> {
  if (res.status === 401) return false;
  if (!res.ok) throw new Error((await res.json().catch(() => ({ error: "backend" })) as { error?: string }).error || "backend");
  const blob = await res.blob();
  const cd = res.headers.get("content-disposition") || "";
  const m = /filename\*=UTF-8''([^;]+)/.exec(cd) || /filename="([^"]+)"/.exec(cd);
  const name = m ? decodeURIComponent(m[1]) : fallback;
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10_000);
  return name;
}

/* ---------- sample playback ---------- */

/**
 * The samples are not run (see lib/lite/samples): their result was recorded
 * once. This fetches the recording and, meanwhile, walks the progress
 * captions like a real run does, long enough to read them, short enough not
 * to make anyone wait for something that is already there.
 */
export const SAMPLE_PLAY_MS = 6500;

export async function playSample<T>(
  url: string,
  stages: number,
  onStage: (i: number) => void,
  signal: AbortSignal,
): Promise<T | null> {
  const data = fetch(url, { signal })
    .then((r) => (r.ok ? (r.json() as Promise<T>) : null))
    .catch(() => null);
  const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const total = reduce ? 1200 : SAMPLE_PLAY_MS;
  const steps = Math.max(1, stages - 1);
  for (let i = 1; i <= steps; i++) {
    await new Promise((r) => setTimeout(r, total / steps + (Math.random() - 0.5) * 300));
    if (signal.aborted) return null;
    onStage(Math.min(i, stages - 1));
  }
  return data;
}

/* ---------- Turnstile ---------- */

const TURNSTILE_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

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

/**
 * Cloudflare Turnstile for the free tools.
 *
 * The widget's container lives in the drop zone, which unmounts the moment
 * a run starts and comes back for the next one. A widget whose container is
 * gone makes turnstile.reset() throw ("Nothing to reset found"), and that
 * throw used to abort the upload handler right after the server had
 * accepted the document: the run finished in the backend while the page sat
 * on "Uploading" forever. So the container is a callback ref — the widget is
 * rendered when the element appears and removed when it goes — and every
 * call into Turnstile is guarded: a failed reset never breaks a run.
 */
export function useTurnstile(siteKey: string | null, locale: Locale) {
  const node = useRef<HTMLDivElement | null>(null);
  const widgetId = useRef<string | null>(null);
  const [ready, setReady] = useState(false);

  // Load the script once.
  useEffect(() => {
    if (!siteKey) return;
    if (window.turnstile) {
      // Already loaded by another tool on the page: mark ready after this
      // effect instead of setting state inside it.
      let live = true;
      void Promise.resolve().then(() => live && setReady(true));
      return () => {
        live = false;
      };
    }
    const existing = document.querySelector<HTMLScriptElement>(`script[src^="${TURNSTILE_SRC}"]`);
    const s = existing ?? document.createElement("script");
    if (!existing) {
      s.src = TURNSTILE_SRC;
      s.async = true;
      s.defer = true;
      document.head.appendChild(s);
    }
    const onLoad = () => setReady(true);
    s.addEventListener("load", onLoad);
    return () => s.removeEventListener("load", onLoad);
  }, [siteKey]);

  const unmount = useCallback(() => {
    if (widgetId.current) {
      try {
        window.turnstile?.remove(widgetId.current);
      } catch {
        // already gone with its container
      }
    }
    widgetId.current = null;
  }, []);

  const mount = useCallback(() => {
    if (!siteKey || !ready || !node.current || widgetId.current || !window.turnstile) return;
    try {
      widgetId.current = window.turnstile.render(node.current, {
        sitekey: siteKey,
        size: "normal",
        theme: "light",
        language: locale,
        // Managed mode still draws a "Verifying… Success" box on every
        // visit. interaction-only keeps it hidden and only shows it when
        // Cloudflare actually needs the visitor to click.
        appearance: "interaction-only",
      });
    } catch {
      widgetId.current = null;
    }
  }, [siteKey, ready, locale]);

  // Script arrived after the container: render now.
  useEffect(() => {
    mount();
  }, [mount]);

  // The container comes and goes with the drop zone.
  const el = useCallback(
    (n: HTMLDivElement | null) => {
      if (n === node.current) return;
      unmount();
      node.current = n;
      if (n) mount();
    },
    [mount, unmount],
  );

  const token = useCallback(() => {
    if (!siteKey || !widgetId.current) return "";
    try {
      return window.turnstile?.getResponse(widgetId.current) ?? "";
    } catch {
      return "";
    }
  }, [siteKey]);

  const reset = useCallback(() => {
    if (!siteKey || !widgetId.current) return;
    if (!node.current || !node.current.isConnected) {
      unmount();
      return;
    }
    try {
      window.turnstile?.reset(widgetId.current);
    } catch {
      unmount();
    }
  }, [siteKey, unmount]);

  return { el, token, reset };
}

/* ---------- the stash: survive a sign-in round trip ---------- */

const STASH_TTL_MS = 24 * 60 * 60 * 1000;

export function readStash<T extends { toolId: string; savedAt: number }>(key: string, toolId: string): T | null {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const v = JSON.parse(raw) as T;
    if (v.toolId !== toolId || typeof v.savedAt !== "number") return null;
    if (Date.now() - v.savedAt > STASH_TTL_MS) return null;
    return v;
  } catch {
    return null;
  }
}
export function writeStash(key: string, v: Record<string, unknown>) {
  try {
    sessionStorage.setItem(key, JSON.stringify({ ...v, savedAt: Date.now() }));
  } catch {
    // Private mode or blocked storage: the round trip just loses the result.
  }
}
export function clearStash(key: string) {
  try {
    sessionStorage.removeItem(key);
  } catch {
    // ignore
  }
}

/* ---------- the drop zone ---------- */

export function DropZone({
  id,
  copy,
  onFiles,
  title,
  hint,
  compact = false,
  fileName,
  disabled = false,
}: {
  id: string;
  copy: ToolCopy["drop"];
  onFiles: (files: FileList | null) => void;
  /** Slot-specific title / hint (compare tools). */
  title?: string;
  hint?: string;
  compact?: boolean;
  /** When a file is already chosen for this slot. */
  fileName?: string | null;
  disabled?: boolean;
}) {
  const [dragging, setDragging] = useState(false);
  return (
    <div
      onDragOver={(e) => {
        if (disabled) return;
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        if (disabled) return;
        e.preventDefault();
        setDragging(false);
        onFiles(e.dataTransfer.files);
      }}
      className="relative"
    >
      <label
        htmlFor={id}
        className={`lite-ledger flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed text-center transition-colors ${
          compact ? "min-h-[188px] px-4 py-5" : "min-h-[280px] px-6"
        } ${fileName ? "border-[var(--lite-blue)] bg-[var(--lite-blue-soft)]/40" : dragging ? "border-[var(--lite-blue)]" : "border-[var(--lite-line)] hover:border-[var(--lite-blue)]"} ${disabled ? "pointer-events-none opacity-60" : ""}`}
      >
        <span className={`grid place-items-center rounded-full bg-[var(--lite-blue-soft)] text-[var(--lite-blue)] ${compact ? "h-11 w-11" : "h-14 w-14"}`}>
          <FileText size={compact ? 20 : 26} aria-hidden />
        </span>
        <span className={`font-heading font-bold ${compact ? "mt-3 text-base" : "mt-4 text-lg"}`}>{title ?? copy.title}</span>
        {fileName ? (
          <span className="mt-1 max-w-full truncate px-2 text-sm font-medium text-[var(--lite-blue-ink)]">{fileName}</span>
        ) : (
          <span className="mt-1 text-sm text-[var(--lite-muted)]">{hint ?? copy.hint}</span>
        )}
        <span className={`lite-press inline-flex items-center rounded-lg bg-[var(--lite-ink)] text-sm font-semibold text-white ${compact ? "mt-3 min-h-9 px-4" : "mt-5 min-h-10 px-5"}`}>
          {copy.choose}
        </span>
        {!compact && <span className="mt-4 text-xs text-[var(--lite-muted)]">{copy.formats}</span>}
      </label>
      <input id={id} type="file" accept={LITE_ACCEPT} className="sr-only" disabled={disabled} onChange={(e) => onFiles(e.target.files)} />
    </div>
  );
}

export function SampleButton({ label, onClick, className = "" }: { label: string; onClick: () => void; className?: string }) {
  return (
    <button type="button" onClick={onClick} className={`${BTN_QUIET} ${className}`}>
      <Sparkles size={16} className="text-[var(--lite-blue)]" aria-hidden />
      {label}
    </button>
  );
}

/** Progress: the stage captions light up one after another while we wait. */
export function Progress({ file, stages, stage }: { file: string; stages: string[]; stage: number }) {
  return (
    <div className={`${SHEET} p-6 sm:p-8`}>
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--lite-blue-soft)] text-[var(--lite-blue)]">
          <FileText size={18} aria-hidden />
        </span>
        <span className="min-w-0 truncate font-medium">{file}</span>
      </div>
      <ol className="mt-5 space-y-2">
        {stages.map((label, i) => (
          <li key={label} className={`flex items-center gap-3 text-sm transition-opacity ${i <= stage ? "opacity-100" : "opacity-35"}`}>
            <span className={`h-2 w-2 shrink-0 rounded-full ${i < stage ? "bg-[var(--lite-blue)]" : i === stage ? "lite-beat bg-[var(--lite-blue)]" : "bg-[var(--lite-line)]"}`} />
            {label}
          </li>
        ))}
      </ol>
      <div className="mt-6 overflow-hidden rounded-xl border border-[var(--lite-line)]" aria-hidden>
        {[0, 1, 2, 3].map((r) => (
          <div key={r} className="lite-shimmer grid grid-cols-[2fr_1fr_1fr_1fr] gap-px border-b border-[var(--lite-rule)] last:border-b-0" style={{ animationDelay: `${r * 120}ms` }}>
            {[0, 1, 2, 3].map((c) => (
              <span key={c} className="h-8 bg-[var(--lite-white)]" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/** "Something went wrong" with a retry. */
export function ErrorBox({ message, retry, retryLabel }: { message: string; retry: () => void; retryLabel: string }) {
  return (
    <div role="alert" className={`${SHEET} flex flex-col gap-4 p-6 sm:flex-row sm:items-start sm:p-8`}>
      <p className="flex-1 text-sm leading-relaxed">{message}</p>
      <button type="button" onClick={retry} className={BTN_QUIET}>
        {retryLabel}
      </button>
    </div>
  );
}

/** The page's heading and intro, shown until there is a result. */
export function Hero({ copy }: { copy: ToolCopy }) {
  return (
    <header className="max-w-[620px]">
      <h1 className="lite-display text-[2.6rem] leading-[1.05] sm:text-6xl">{copy.h1}</h1>
      <p className="mt-5 text-lg leading-relaxed text-[var(--lite-muted)]">{copy.intro}</p>
    </header>
  );
}

/** The three trust lines under the tool. */
export function Trust({ copy }: { copy: ToolCopy }) {
  return (
    <ul className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-[var(--lite-muted)]">
      {copy.trust.map((t) => (
        <li key={t} className="flex items-center gap-2 whitespace-nowrap">
          <Check size={16} className="text-[var(--lite-blue)]" aria-hidden />
          {t}
        </li>
      ))}
    </ul>
  );
}

export function sentence(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
