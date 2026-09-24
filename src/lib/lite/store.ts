import "server-only";

import { LITE_LIMITS } from "@/lib/lite/tools";

/**
 * lite_runs access through PostgREST with the service role, in the same
 * style as schedule.ts. The table has RLS on and no policies, so this module
 * is the only reader and writer.
 */

function headers(): HeadersInit | null {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) return null;
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  };
}

function base(): string | null {
  return process.env.SUPABASE_URL || null;
}

export function storeConfigured(): boolean {
  return headers() !== null && base() !== null;
}

export interface LiteRunRow {
  id: string;
  run_id: string;
  tool: string;
  locale: string;
  session_id: string;
  ip_hash: string;
  filename: string | null;
  byte_size: number | null;
  pages: number | null;
  is_sample: boolean;
  status: string;
  row_count: number | null;
  user_id: string | null;
  user_email: string | null;
  downloaded_at: string | null;
  created_at: string;
  finished_at: string | null;
  purged_at: string | null;
  /** run | split | match — see the 20260924160000 migration. */
  kind: LiteRunKind;
}

export type LiteRunKind = "run" | "split" | "match";

function startOfUtcDay(): string {
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  return d.toISOString();
}

async function countSince(filter: string): Promise<number> {
  const h = headers();
  const b = base();
  if (!h || !b) return 0;
  const res = await fetch(
    `${b}/rest/v1/lite_runs?select=id&created_at=gte.${encodeURIComponent(startOfUtcDay())}${filter}&limit=1`,
    { headers: { ...h, Prefer: "count=exact" }, cache: "no-store" },
  );
  if (!res.ok) throw new Error(`lite_runs count failed (${res.status})`);
  // Content-Range: 0-0/N  (or */0 when empty)
  const range = res.headers.get("content-range") || "";
  const total = Number(range.split("/")[1]);
  return Number.isFinite(total) ? total : 0;
}

export interface QuotaSnapshot {
  session: number;
  ip: number;
  global: number;
  limitPerDay: number;
  globalCap: number;
}

/** Documents count against the quota (runs and splits); a match is derived
 *  from runs the visitor already spent quota on. */
const DOCS = "&kind=neq.match";

export async function quotaSnapshot(sessionId: string, ipHash: string): Promise<QuotaSnapshot> {
  const [session, ip, global] = await Promise.all([
    countSince(`&session_id=eq.${encodeURIComponent(sessionId)}${DOCS}`),
    countSince(`&ip_hash=eq.${encodeURIComponent(ipHash)}${DOCS}`),
    countSince(DOCS),
  ]);
  // LITE_RUNS_PER_DAY overrides the per-visitor limit (raise it to test).
  return { session, ip, global, ...quotaLimits() };
}

/** Per-visitor and global limits, env overrides applied. */
export function quotaLimits(): { limitPerDay: number; globalCap: number } {
  const cap = Number(process.env.LITE_DAILY_CAP);
  const perDay = Number(process.env.LITE_RUNS_PER_DAY);
  return {
    limitPerDay: Number.isFinite(perDay) && perDay > 0 ? perDay : LITE_LIMITS.runsPerDay,
    globalCap: Number.isFinite(cap) && cap > 0 ? cap : LITE_LIMITS.dailyCapDefault,
  };
}

async function rpc<T>(fn: string, args: Record<string, unknown>): Promise<T> {
  const h = headers();
  const b = base();
  if (!h || !b) throw new Error("Store not configured");
  const res = await fetch(`${b}/rest/v1/rpc/${fn}`, {
    method: "POST",
    headers: h,
    body: JSON.stringify(args),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`${fn} failed (${res.status})`);
  const text = await res.text();
  return (text ? JSON.parse(text) : null) as T;
}

export type Reservation = { ok: true; id: string } | { ok: false; code: "quota" | "daily_cap" };

/**
 * Claims one unit of quota before anything is sent to the backend. Count and
 * insert happen in one Postgres transaction (lite_reserve, serialised by an
 * advisory lock), so concurrent requests cannot all pass the same check —
 * they used to, because the row was only inserted after the backend call.
 * `kind` "match" draws on a separate per-visitor limit of comparisons.
 */
export async function reserve(row: {
  session_id: string;
  ip_hash: string;
  tool: string;
  locale: string;
  kind: LiteRunKind;
  filename: string | null;
  byte_size: number | null;
  pages: number | null;
  is_sample: boolean;
}): Promise<Reservation> {
  const { limitPerDay, globalCap } = quotaLimits();
  const result = await rpc<string>("lite_reserve", {
    p_session: row.session_id,
    p_ip_hash: row.ip_hash,
    p_tool: row.tool,
    p_locale: row.locale,
    p_kind: row.kind,
    p_limit: limitPerDay,
    p_cap: globalCap,
    p_filename: row.filename,
    p_byte_size: row.byte_size,
    p_pages: row.pages,
    p_is_sample: row.is_sample,
  });
  if (result === "quota" || result === "daily_cap") return { ok: false, code: result };
  if (typeof result !== "string" || !/^[0-9a-f-]{36}$/.test(result)) throw new Error("lite_reserve returned no id");
  return { ok: true, id: result };
}

/** Binds a reservation to the id the backend returned. */
export async function finalizeReservation(id: string, runId: string): Promise<void> {
  await rpc("lite_finalize", { p_id: id, p_run_id: runId });
}

/** Gives the quota back when the backend call failed. Best-effort. */
export async function releaseReservation(id: string): Promise<void> {
  try {
    await rpc("lite_release", { p_id: id });
  } catch {
    // A stranded reservation only costs this visitor one unit today.
  }
}

export async function insertRun(row: {
  run_id: string;
  tool: string;
  locale: string;
  session_id: string;
  ip_hash: string;
  filename: string | null;
  byte_size: number | null;
  pages: number | null;
  is_sample: boolean;
  kind?: LiteRunKind;
}): Promise<void> {
  const h = headers();
  const b = base();
  if (!h || !b) throw new Error("Store not configured");
  const res = await fetch(`${b}/rest/v1/lite_runs`, {
    method: "POST",
    headers: { ...h, Prefer: "return=minimal" },
    body: JSON.stringify(row),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`lite_runs insert failed (${res.status})`);
}

export async function getRunForSession(
  runId: string,
  sessionId: string,
  kind: LiteRunKind = "run",
): Promise<LiteRunRow | null> {
  const h = headers();
  const b = base();
  if (!h || !b) return null;
  const res = await fetch(
    `${b}/rest/v1/lite_runs?run_id=eq.${encodeURIComponent(runId)}&session_id=eq.${encodeURIComponent(sessionId)}&kind=eq.${kind}&select=*&limit=1`,
    { headers: h, cache: "no-store" },
  );
  if (!res.ok) return null;
  const rows = (await res.json()) as LiteRunRow[];
  return rows[0] ?? null;
}

export async function updateRun(
  runId: string,
  patch: Partial<Pick<LiteRunRow, "status" | "row_count" | "finished_at" | "user_id" | "user_email" | "downloaded_at" | "pages">>,
): Promise<void> {
  const h = headers();
  const b = base();
  if (!h || !b) return;
  try {
    await fetch(`${b}/rest/v1/lite_runs?run_id=eq.${encodeURIComponent(runId)}`, {
      method: "PATCH",
      headers: { ...h, Prefer: "return=minimal" },
      body: JSON.stringify(patch),
      cache: "no-store",
    });
  } catch {
    // Best-effort bookkeeping; the visitor's result does not depend on it.
  }
}
