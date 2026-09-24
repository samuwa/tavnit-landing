import "server-only";

import type { Locale } from "@/lib/locale";
import type { LocalizedId } from "@/lib/lite/tools";

/**
 * The only bridge between the public site and the product backend.
 *
 * Calls existing endpoints of the Tavnit API with the "Tavnit Lite" org's
 * key: submit a document to a flow, read a run back, run a matcher over
 * runs, run a splitter over a bundle. The key never leaves
 * the server; the browser only ever sees run ids that the store has tied to
 * its own session (see store.ts / session.ts).
 *
 * The backend is asynchronous by contract: POST returns 202 with a run id
 * and the run is polled until it reaches a terminal state.
 */

const BASE_URL = (process.env.TAVNIT_API_URL || "https://run.tavnit.io").replace(/\/$/, "");

function apiKey(): string | null {
  return process.env.TAVNIT_LITE_API_KEY || null;
}

export function liteApiConfigured(): boolean {
  return apiKey() !== null;
}

/** An id from the tool definition, unless the environment overrides it. */
export function resolveId(id: LocalizedId | undefined, locale: Locale): string | null {
  if (!id) return null;
  const pick = (l: Locale) => {
    const env = process.env[id.env[l]];
    if (env && env.trim()) return env.trim();
    return id.value[l];
  };
  return pick(locale) ?? pick("es");
}

export function resolveSingleId(id: { env: string; value: string | null } | undefined): string | null {
  if (!id) return null;
  const env = process.env[id.env];
  if (env && env.trim()) return env.trim();
  return id.value;
}

export class LiteApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
  }
}

export async function submitRun(params: {
  bytes: Uint8Array;
  filename: string;
  contentType: string;
  flowId: string;
}): Promise<{ runId: string }> {
  const key = apiKey();
  if (!key) throw new LiteApiError("Lite API key not configured", 503);

  const form = new FormData();
  form.append("flow_id", params.flowId);
  form.append("source", "api");
  form.append(
    "file",
    new Blob([params.bytes as BlobPart], { type: params.contentType }),
    params.filename,
  );

  const res = await fetch(`${BASE_URL}/api/runs/process`, {
    method: "POST",
    headers: { "X-API-Key": key },
    body: form,
    cache: "no-store",
    signal: AbortSignal.timeout(30_000),
  });

  if (res.status === 402) throw new LiteApiError("Lite credits exhausted", 503);
  if (!res.ok) throw new LiteApiError(`Submit failed (${res.status})`, 502);

  const body = (await res.json()) as { run_id?: string };
  if (!body.run_id || typeof body.run_id !== "string") {
    throw new LiteApiError("Submit returned no run id", 502);
  }
  return { runId: body.run_id };
}

export type RunStatus =
  | "queued"
  | "running"
  | "completed"
  | "failed"
  | "cancelled"
  | "awaiting_approval";

export interface RunPayload {
  status: RunStatus;
  mimeType: string | null;
  pagesDetected: number | null;
  pagesProcessed: number | null;
  columns: string[] | null;
  rows: Record<string, unknown>[] | null;
}

export async function fetchRun(runId: string): Promise<RunPayload> {
  const key = apiKey();
  if (!key) throw new LiteApiError("Lite API key not configured", 503);

  const res = await fetch(`${BASE_URL}/api/runs/${encodeURIComponent(runId)}`, {
    headers: { "X-API-Key": key },
    cache: "no-store",
    signal: AbortSignal.timeout(20_000),
  });
  if (res.status === 404) throw new LiteApiError("Run not found", 404);
  if (!res.ok) throw new LiteApiError(`Run fetch failed (${res.status})`, 502);

  const body = (await res.json()) as {
    status?: string;
    mime_type?: string | null;
    pages_detected?: number | null;
    pages_processed?: number | null;
    columns?: unknown;
    data?: unknown;
  };

  const status = (body.status || "queued") as RunStatus;
  const rows = Array.isArray(body.data)
    ? (body.data.filter((r) => r && typeof r === "object") as Record<string, unknown>[])
    : null;
  const columns = Array.isArray(body.columns)
    ? body.columns.filter((c): c is string => typeof c === "string")
    : null;

  return {
    status,
    mimeType: typeof body.mime_type === "string" ? body.mime_type : null,
    pagesDetected: typeof body.pages_detected === "number" ? body.pages_detected : null,
    pagesProcessed: typeof body.pages_processed === "number" ? body.pages_processed : null,
    columns,
    rows,
  };
}

/**
 * The original upload, as a short-lived signed storage URL plus its type.
 * The landing proxies the bytes (see /api/lite/runs/[id]/document) so the
 * storage URL itself never reaches the browser.
 */
export async function fetchRunSource(runId: string): Promise<{ url: string; mimeType: string; byteSize: number | null }> {
  const key = apiKey();
  if (!key) throw new LiteApiError("Lite API key not configured", 503);
  const res = await fetch(`${BASE_URL}/api/runs/${encodeURIComponent(runId)}/source-file`, {
    headers: { "X-API-Key": key },
    cache: "no-store",
    signal: AbortSignal.timeout(20_000),
  });
  if (res.status === 404) throw new LiteApiError("Source not found", 404);
  if (!res.ok) throw new LiteApiError(`Source fetch failed (${res.status})`, 502);
  const body = (await res.json()) as { url?: string; mime_type?: string; byte_size?: number | null };
  if (!body.url || typeof body.url !== "string") throw new LiteApiError("Source has no url", 502);
  return {
    url: body.url,
    mimeType: typeof body.mime_type === "string" ? body.mime_type : "application/octet-stream",
    byteSize: typeof body.byte_size === "number" ? body.byte_size : null,
  };
}

/**
 * Matcher: pairs the lines of two or more completed runs of the matcher's
 * flow. 202 with the match id; the result is read from the product's
 * `matches` row (there is no status endpoint), see product.ts.
 */
export async function runMatcher(params: { matcherId: string; runIds: string[]; benchmarkRunId?: string }): Promise<{ matchId: string }> {
  const key = apiKey();
  if (!key) throw new LiteApiError("Lite API key not configured", 503);
  const res = await fetch(`${BASE_URL}/api/matchers/${encodeURIComponent(params.matcherId)}/run`, {
    method: "POST",
    headers: { "X-API-Key": key, "Content-Type": "application/json" },
    body: JSON.stringify({
      run_ids: params.runIds,
      ...(params.benchmarkRunId ? { benchmark_run_id: params.benchmarkRunId } : {}),
      source: "api",
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(30_000),
  });
  if (res.status === 402) throw new LiteApiError("Lite credits exhausted", 503);
  if (res.status === 400) throw new LiteApiError(`Matcher rejected the runs: ${(await res.text()).slice(0, 300)}`, 400);
  if (!res.ok) throw new LiteApiError(`Matcher run failed (${res.status})`, 502);
  const body = (await res.json()) as { match_id?: string };
  if (!body.match_id || typeof body.match_id !== "string") throw new LiteApiError("Matcher returned no match id", 502);
  return { matchId: body.match_id };
}

/**
 * Splitter: finds the documents inside one bundle and classifies each
 * against the splitter's document types. 202 with the split id; the
 * segments are read from the product's `splits` row, see product.ts.
 */
export async function runSplit(params: { splitterId: string; bytes: Uint8Array; filename: string; contentType: string }): Promise<{ splitId: string; pages: number }> {
  const key = apiKey();
  if (!key) throw new LiteApiError("Lite API key not configured", 503);
  const form = new FormData();
  form.append("splitter_id", params.splitterId);
  form.append("file", new Blob([params.bytes as BlobPart], { type: params.contentType }), params.filename);
  const res = await fetch(`${BASE_URL}/api/splits/run`, {
    method: "POST",
    headers: { "X-API-Key": key },
    body: form,
    cache: "no-store",
    signal: AbortSignal.timeout(30_000),
  });
  if (res.status === 402) throw new LiteApiError("Lite credits exhausted", 503);
  if (!res.ok) throw new LiteApiError(`Split failed (${res.status})`, 502);
  const body = (await res.json()) as { split_id?: string; pages_count?: number };
  if (!body.split_id || typeof body.split_id !== "string") throw new LiteApiError("Split returned no id", 502);
  return { splitId: body.split_id, pages: typeof body.pages_count === "number" ? body.pages_count : 0 };
}
