import "server-only";

/**
 * Reads of the product's own tables for the two features that have no
 * status endpoint in the API: Matcher results live in `matches`, Splitter
 * results in `splits`, and the segments a Splitter cuts sit in the private
 * `files` bucket. Everything is scoped to the Lite org and read with the
 * service role through PostgREST / Storage, like purge.ts. Nothing is
 * written here.
 */

function env() {
  const base = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const org = process.env.TAVNIT_LITE_ORG_ID;
  if (!base || !key) throw new Error("Supabase service credentials not configured");
  if (!org || !/^[0-9a-f-]{36}$/.test(org)) throw new Error("TAVNIT_LITE_ORG_ID not configured");
  return { base, key, org };
}

function headers(key: string): HeadersInit {
  return { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" };
}

export function productConfigured(): boolean {
  try {
    env();
    return true;
  } catch {
    return false;
  }
}

export interface MatchRow {
  id: string;
  status: string;
  run_ids: string[];
  benchmark_run_id: string | null;
  output_json: { columns?: string[]; rows?: Record<string, unknown>[]; warnings?: unknown[] } | null;
  match_groups: unknown;
  error_message: string | null;
  created_at: string;
  finished_at: string | null;
}

export async function readMatch(matchId: string): Promise<MatchRow | null> {
  const { base, key, org } = env();
  const res = await fetch(
    `${base}/rest/v1/matches?select=id,status,run_ids,benchmark_run_id,output_json,match_groups,error_message,created_at,finished_at&id=eq.${encodeURIComponent(matchId)}&org_id=eq.${encodeURIComponent(org)}&limit=1`,
    { headers: headers(key), cache: "no-store" },
  );
  if (!res.ok) throw new Error(`matches read failed (${res.status})`);
  const rows = (await res.json()) as MatchRow[];
  return rows[0] ?? null;
}

export interface SplitSegment {
  title?: string | null;
  description?: string | null;
  matched_doc_id?: string | null;
  matched_doc_title?: string | null;
  file_path?: string | null;
  reason?: string | null;
  start_page?: number | null;
  end_page?: number | null;
}

export interface SplitRow {
  id: string;
  status: string;
  error_message: string | null;
  original_filename: string | null;
  pages_count: number | null;
  docs_found: number | null;
  output_json: SplitSegment[] | null;
  created_at: string;
  finished_at: string | null;
}

export async function readSplit(splitId: string): Promise<SplitRow | null> {
  const { base, key, org } = env();
  const res = await fetch(
    `${base}/rest/v1/splits?select=id,status,error_message,original_filename,pages_count,docs_found,output_json,created_at,finished_at&id=eq.${encodeURIComponent(splitId)}&org_id=eq.${encodeURIComponent(org)}&limit=1`,
    { headers: headers(key), cache: "no-store" },
  );
  if (!res.ok) throw new Error(`splits read failed (${res.status})`);
  const rows = (await res.json()) as SplitRow[];
  return rows[0] ?? null;
}

/**
 * Downloads one object of the `files` bucket, only ever under the Lite
 * org's prefix (the guard rail: a path outside it is refused before any
 * request is made).
 */
export async function downloadLiteObject(path: string): Promise<{ bytes: Uint8Array; contentType: string } | null> {
  const { base, key, org } = env();
  if (!path.startsWith(`${org}/`) || path.includes("..")) return null;
  const res = await fetch(`${base}/storage/v1/object/files/${path.split("/").map(encodeURIComponent).join("/")}`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
    cache: "no-store",
    signal: AbortSignal.timeout(30_000),
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`storage download failed (${res.status})`);
  return { bytes: new Uint8Array(await res.arrayBuffer()), contentType: res.headers.get("content-type") || "application/octet-stream" };
}
