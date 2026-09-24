import "server-only";

/**
 * The only bridge between the public site and the product backend.
 *
 * Calls two existing endpoints of the Tavnit API with the "Tavnit Lite" org's
 * key: submit a document to a flow, and read a run back. The key never leaves
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

export function liteFlowId(envName: string): string | null {
  const v = process.env[envName];
  return v && v.trim() ? v.trim() : null;
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
