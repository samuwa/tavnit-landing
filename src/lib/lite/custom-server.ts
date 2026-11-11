import "server-only";

import type { FieldSuggestionRaw, SuggestedFieldRaw } from "@/lib/lite/api";
import { liteApiConfigured } from "@/lib/lite/api";
import {
  CUSTOM_LIMITS,
  cleanCustomName,
  isCustomDataType,
  type CustomDataType,
  type CustomFieldKind,
  type CustomSuggestedField,
  type CustomToolField,
  type CustomToolView,
} from "@/lib/lite/custom";

/**
 * Server side of the Custom Tool: the lite_custom_tools table (drafts, the
 * visitor's tool, what it replaced) and the tool's Flow in the Tavnit Lite
 * org. Everything goes through PostgREST with the service role, scoped to
 * TAVNIT_LITE_ORG_ID, like product.ts and purge.ts — no Flask code involved
 * beyond the suggestion call in api.ts.
 *
 * The Flow has the shape the app gives a flow made from an AI suggestion
 * (tavnit-nextjs flow-service.ts createFlowWithFields + extraction-hints.ts):
 * a `flows` row and one `flow_fields` row per column whose `extraction_hint`
 * is `{description: "<parts joined by ' --- '>"}`. buildHint() below mirrors
 * the two builders of extraction-hints.ts for the parts a suggestion carries
 * — change them together. One deliberate difference: the app also writes the
 * "Examples:" part, values read from the sample document. Lite deletes a
 * visitor's document and results after 24 hours, and a Flow outlives that,
 * so examples are shown once in the review step and never stored.
 */

function env() {
  const base = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const org = process.env.TAVNIT_LITE_ORG_ID;
  if (!base || !key) throw new Error("Supabase service credentials not configured");
  if (!org || !/^[0-9a-f-]{36}$/.test(org)) throw new Error("TAVNIT_LITE_ORG_ID not configured");
  return { base, key, org };
}

function headers(key: string, prefer?: string): HeadersInit {
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
    ...(prefer ? { Prefer: prefer } : {}),
  };
}

export function customConfigured(): boolean {
  if (!liteApiConfigured()) return false;
  try {
    env();
    return true;
  } catch {
    return false;
  }
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
export function isUuid(v: unknown): v is string {
  return typeof v === "string" && UUID_RE.test(v);
}

/** Per-visitor and global suggestion limits: env, then the code default. */
export function customLimits(): { perDay: number; dailyCap: number } {
  const perDay = Number(process.env.LITE_CUSTOM_SUGGESTS_PER_DAY);
  const cap = Number(process.env.LITE_CUSTOM_DAILY_CAP);
  return {
    perDay: Number.isFinite(perDay) && perDay > 0 ? perDay : CUSTOM_LIMITS.suggestsPerDay,
    dailyCap: Number.isFinite(cap) && cap > 0 ? cap : CUSTOM_LIMITS.dailyCap,
  };
}

/* ---------- the suggestion ---------- */

/** A suggested field as the draft keeps it: the hint parts, no example values. */
export interface StoredField {
  key: string;
  kind: CustomFieldKind;
  name: string;
  data_type: CustomDataType;
  label_keywords?: string;
  column_headers?: string[];
  field_meaning?: string;
}

/** One hint part: a single line that cannot break out of its slot in the
 *  " --- "-joined hint string or carry more than a label's worth of text. */
function hintPart(raw: unknown, max: number): string {
  if (typeof raw !== "string") return "";
  return raw
    .replace(/[\u0000-\u001f\u007f-\u009f\u2028\u2029]/g, " ")
    .replace(/-{3,}/g, "-")
    .replace(/["|]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max)
    .trim();
}

function sanitizeKind(raw: unknown, kind: CustomFieldKind, prefix: string, seen: Set<string>): { stored: StoredField; view: CustomSuggestedField }[] {
  const out: { stored: StoredField; view: CustomSuggestedField }[] = [];
  for (const item of Array.isArray(raw) ? (raw as SuggestedFieldRaw[]) : []) {
    if (!item || typeof item !== "object") continue;
    const name = cleanCustomName(item.name, CUSTOM_LIMITS.maxFieldNameLength);
    if (!name) continue;
    const fold = name.toLocaleLowerCase();
    if (seen.has(fold)) continue;
    seen.add(fold);
    const dataType: CustomDataType = isCustomDataType(item.data_type) ? item.data_type : "text";
    const key = `${prefix}${out.length}`;
    const stored: StoredField = { key, kind, name, data_type: dataType };
    if (kind === "metadata") {
      const label = hintPart(item.label_keywords, 80);
      if (label) stored.label_keywords = label;
    } else {
      const headers = (Array.isArray(item.column_headers) ? item.column_headers : [])
        .map((h) => hintPart(h, 60))
        .filter(Boolean)
        .slice(0, 3);
      if (headers.length) stored.column_headers = headers;
      const meaning = hintPart(item.field_meaning, 160);
      if (meaning) stored.field_meaning = meaning;
    }
    const example = Array.isArray(item.examples) ? cleanCustomName(item.examples[0], 60) : "";
    const confidence = typeof item.confidence === "number" && Number.isFinite(item.confidence) ? Math.min(Math.max(item.confidence, 0), 1) : 0.5;
    out.push({ stored, view: { key, kind, name, dataType, example: example || null, confidence } });
    if (out.length >= 10) break;
  }
  return out;
}

/** What the assistant answered, reduced to what the draft keeps (`stored`)
 *  and what the review step shows (`view`). Null when no field survives. */
export function sanitizeSuggestion(raw: FieldSuggestionRaw): {
  name: string;
  documentType: string;
  stored: StoredField[];
  view: CustomSuggestedField[];
} | null {
  const seen = new Set<string>();
  const all = [...sanitizeKind(raw.metadata_fields, "metadata", "m", seen), ...sanitizeKind(raw.table_fields, "table", "t", seen)];
  if (!all.length) return null;
  return {
    name: cleanCustomName(raw.suggested_name, CUSTOM_LIMITS.maxNameLength),
    documentType: hintPart(raw.document_type, 40).toLowerCase().replace(/[^a-z0-9_ -]/g, ""),
    stored: all.map((f) => f.stored),
    view: all.map((f) => f.view),
  };
}

/** Mirror of buildMetadataHint / buildTableHint in tavnit-nextjs
 *  src/lib/extraction-hints.ts, without the "Examples:" part (see the header). */
export function buildHint(field: StoredField): Record<string, unknown> {
  const parts: string[] = [];
  if (field.kind === "metadata") {
    if (field.label_keywords) parts.push(`Location: Next to label "${field.label_keywords}"`);
  } else {
    if (field.column_headers?.length) parts.push(`Column header: ${field.column_headers.join(" | ")}`);
    if (field.field_meaning) parts.push(`Field meaning: ${field.field_meaning}`);
  }
  return parts.length ? { description: parts.join(" --- ") } : {};
}

/* ---------- lite_custom_tools ---------- */

export interface CustomToolRow {
  id: string;
  session_id: string;
  ip_hash: string;
  user_id: string | null;
  locale: string;
  status: "draft" | "active" | "replaced" | "expired";
  name: string | null;
  document_type: string | null;
  suggestion: { fields?: StoredField[] } | null;
  fields: CustomToolField[] | null;
  flow_id: string | null;
  created_at: string;
  activated_at: string | null;
  last_used_at: string | null;
  retired_at: string | null;
  flow_deleted_at: string | null;
}

async function rest<T>(path: string, init: { method?: string; body?: unknown; prefer?: string } = {}): Promise<{ ok: boolean; status: number; data: T | null; range: string | null }> {
  const { base, key } = env();
  const res = await fetch(`${base}/rest/v1/${path}`, {
    method: init.method ?? "GET",
    headers: headers(key, init.prefer),
    body: init.body === undefined ? undefined : JSON.stringify(init.body),
    cache: "no-store",
  });
  const text = await res.text();
  let data: T | null = null;
  if (text) {
    try {
      data = JSON.parse(text) as T;
    } catch {
      data = null;
    }
  }
  return { ok: res.ok, status: res.status, data, range: res.headers.get("content-range") };
}

function startOfUtcDay(): string {
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  return d.toISOString();
}

export type SuggestReservation = { ok: true; id: string } | { ok: false; code: "quota" | "daily_cap" };

/** Claims one suggestion (atomic count + insert, see the migration). */
export async function reserveSuggestion(sessionId: string, ipHash: string, locale: string): Promise<SuggestReservation> {
  const { perDay, dailyCap } = customLimits();
  const res = await rest<string>("rpc/lite_custom_reserve", {
    method: "POST",
    body: { p_session: sessionId, p_ip_hash: ipHash, p_locale: locale, p_limit: perDay, p_cap: dailyCap },
  });
  if (!res.ok) throw new Error(`lite_custom_reserve failed (${res.status})`);
  if (res.data === "quota" || res.data === "daily_cap") return { ok: false, code: res.data };
  if (!isUuid(res.data)) throw new Error("lite_custom_reserve returned no id");
  return { ok: true, id: res.data };
}

/** Gives the suggestion back when the assistant failed. Best-effort. */
export async function discardDraft(id: string): Promise<void> {
  try {
    await rest(`lite_custom_tools?id=eq.${id}&status=eq.draft`, { method: "DELETE", prefer: "return=minimal" });
  } catch {
    // A stranded draft only costs this visitor one suggestion today.
  }
}

export async function saveDraft(id: string, patch: { name: string; document_type: string; suggestion: { fields: StoredField[] } }): Promise<void> {
  const res = await rest(`lite_custom_tools?id=eq.${id}&status=eq.draft`, { method: "PATCH", body: patch, prefer: "return=minimal" });
  if (!res.ok) throw new Error(`lite_custom_tools draft failed (${res.status})`);
}

/** A draft this session may still confirm. */
export async function getDraft(id: string, sessionId: string): Promise<CustomToolRow | null> {
  const since = new Date(Date.now() - CUSTOM_LIMITS.draftTtlMinutes * 60_000).toISOString();
  const res = await rest<CustomToolRow[]>(
    `lite_custom_tools?id=eq.${id}&session_id=eq.${encodeURIComponent(sessionId)}&status=eq.draft&created_at=gte.${encodeURIComponent(since)}&select=*&limit=1`,
  );
  if (!res.ok) throw new Error(`lite_custom_tools read failed (${res.status})`);
  return res.data?.[0] ?? null;
}

/**
 * The visitor's tool: the one this browser's session made, else — signed in —
 * the one their account made in another browser. A session's tool is tied
 * to the account the first time it is seen signed in (unless the account
 * already has one from elsewhere: then each browser keeps its own).
 */
export async function findActiveTool(sessionId: string | null, userId: string | null): Promise<CustomToolRow | null> {
  if (sessionId) {
    const res = await rest<CustomToolRow[]>(
      `lite_custom_tools?session_id=eq.${encodeURIComponent(sessionId)}&status=eq.active&select=*&limit=1`,
    );
    if (!res.ok) throw new Error(`lite_custom_tools read failed (${res.status})`);
    const row = res.data?.[0];
    if (row) {
      if (userId && !row.user_id) {
        const linked = await rest(`lite_custom_tools?id=eq.${row.id}&status=eq.active&user_id=is.null`, {
          method: "PATCH",
          body: { user_id: userId },
          prefer: "return=minimal",
        }).catch(() => null);
        if (linked?.ok) row.user_id = userId;
      }
      return row;
    }
  }
  if (userId) {
    const res = await rest<CustomToolRow[]>(`lite_custom_tools?user_id=eq.${userId}&status=eq.active&select=*&limit=1`);
    if (!res.ok) throw new Error(`lite_custom_tools read failed (${res.status})`);
    return res.data?.[0] ?? null;
  }
  return null;
}

/** A run of the tool keeps it alive (the 30-day idle clock). Best-effort. */
export async function touchTool(id: string): Promise<void> {
  await rest(`lite_custom_tools?id=eq.${id}`, { method: "PATCH", body: { last_used_at: new Date().toISOString() }, prefer: "return=minimal" }).catch(() => {});
}

/** Suggestions this visitor has left today (for the "N left" line only). */
export async function suggestsRemaining(sessionId: string | null, ipHash: string): Promise<number | null> {
  try {
    const { perDay } = customLimits();
    const day = encodeURIComponent(startOfUtcDay());
    const count = async (filter: string) => {
      const res = await rest<unknown[]>(`lite_custom_tools?select=id&created_at=gte.${day}&${filter}&limit=1`, { prefer: "count=exact" });
      const total = Number((res.range || "").split("/")[1]);
      return Number.isFinite(total) ? total : 0;
    };
    const [bySession, byIp] = await Promise.all([
      sessionId ? count(`session_id=eq.${encodeURIComponent(sessionId)}`) : Promise.resolve(0),
      count(`ip_hash=eq.${encodeURIComponent(ipHash)}`),
    ]);
    return Math.max(perDay - Math.max(bySession, byIp), 0);
  } catch {
    return null;
  }
}

export function toolView(row: CustomToolRow): CustomToolView {
  const last = row.last_used_at || row.activated_at || row.created_at;
  return {
    id: row.id,
    name: row.name || "",
    locale: row.locale === "en" ? "en" : "es",
    fields: Array.isArray(row.fields) ? row.fields : [],
    createdAt: row.activated_at || row.created_at,
    expiresAt: row.user_id ? null : new Date(new Date(last).getTime() + CUSTOM_LIMITS.idleDays * 86_400_000).toISOString(),
  };
}

/* ---------- the Flow in the Lite org ---------- */

/** Prefix of every custom tool's Flow name, so they are easy to tell apart
 *  from the fixed Lite flows in the org's list. */
export const CUSTOM_FLOW_PREFIX = "Lite custom · ";

/**
 * Creates the tool's Flow: active, no review step, no outputs — the run is
 * read back by the landing, like every Lite flow. Returns the flow id; a
 * flow whose fields could not be written is removed again.
 */
export async function createCustomFlow(params: {
  toolId: string;
  name: string;
  locale: string;
  fields: { name: string; dataType: CustomDataType; stored: StoredField }[];
}): Promise<string> {
  const { org } = env();
  const now = new Date().toISOString();
  const created = await rest<{ id: string }[]>("flows?select=id", {
    method: "POST",
    prefer: "return=representation",
    body: {
      org_id: org,
      name: `${CUSTOM_FLOW_PREFIX}${params.name}`.slice(0, 90),
      description: `Tavnit Lite custom tool ${params.toolId} (${params.locale}). Made by a visitor from an AI suggestion on www.tavnit.io; the landing deletes it when the visitor replaces it or stops using it.`,
      status: "active",
      version: 1,
      is_archived: false,
      created_at: now,
      updated_at: now,
    },
  });
  const flowId = created.data?.[0]?.id;
  if (!created.ok || !isUuid(flowId)) throw new Error(`flows insert failed (${created.status})`);

  const fields = await rest("flow_fields", {
    method: "POST",
    prefer: "return=minimal",
    body: params.fields.map((f, i) => ({
      flow_id: flowId,
      name: f.name,
      data_type: f.dataType,
      sort_order: i,
      field_kind: f.stored.kind,
      extraction_hint: buildHint(f.stored),
      is_composite: false,
      sub_fields: null,
      accept_multi_values: false,
      is_classifier: false,
      classifier_config: null,
      created_at: now,
    })),
  });
  if (!fields.ok) {
    await deleteFlow(flowId).catch(() => {});
    throw new Error(`flow_fields insert failed (${fields.status})`);
  }
  return flowId;
}

/** Hard delete, only possible while the flow has no runs (runs_flow_id_fkey
 *  is NO ACTION). True when the flow is gone. */
async function deleteFlow(flowId: string): Promise<boolean> {
  const { org } = env();
  const scope = `id=eq.${flowId}&org_id=eq.${org}`;
  const owned = await rest<{ id: string }[]>(`flows?select=id&${scope}&limit=1`);
  if (!owned.ok) throw new Error(`flows read failed (${owned.status})`);
  if (!owned.data?.length) return true;
  const runs = await rest<{ id: string }[]>(`runs?select=id&flow_id=eq.${flowId}&limit=1`);
  if (!runs.ok) throw new Error(`runs read failed (${runs.status})`);
  if (runs.data?.length) return false;
  const fields = await rest(`flow_fields?flow_id=eq.${flowId}`, { method: "DELETE", prefer: "return=minimal" });
  if (!fields.ok) throw new Error(`flow_fields delete failed (${fields.status})`);
  const flow = await rest(`flows?${scope}`, { method: "DELETE", prefer: "return=minimal" });
  // 409 = a run arrived in between; the next pass takes it.
  if (flow.status === 409) return false;
  if (!flow.ok) throw new Error(`flows delete failed (${flow.status})`);
  return true;
}

/** Soft-deletes flows the way the app does for a flow with run history
 *  (deleted_at + inactive): they leave the org's lists and can't be run,
 *  and the cleanup removes them for good once their runs are purged. */
export async function retireFlows(flowIds: string[]): Promise<void> {
  const ids = flowIds.filter(isUuid);
  if (!ids.length) return;
  const { org } = env();
  const now = new Date().toISOString();
  const res = await rest(`flows?id=in.(${ids.join(",")})&org_id=eq.${org}`, {
    method: "PATCH",
    prefer: "return=minimal",
    body: { deleted_at: now, status: "inactive", enable_email: false, updated_at: now },
  });
  if (!res.ok) throw new Error(`flows retire failed (${res.status})`);
}

/** Draft → the visitor's tool; returns the flows of the tools it replaced,
 *  or null when the draft was not this session's to confirm. */
export async function activateTool(params: {
  id: string;
  sessionId: string;
  userId: string | null;
  flowId: string;
  name: string;
  fields: CustomToolField[];
}): Promise<string[] | null> {
  const res = await rest<{ ok?: boolean; retired?: unknown }>("rpc/lite_custom_activate", {
    method: "POST",
    body: {
      p_id: params.id,
      p_session: params.sessionId,
      p_user: params.userId,
      p_flow_id: params.flowId,
      p_name: params.name,
      p_fields: params.fields,
    },
  });
  if (!res.ok) throw new Error(`lite_custom_activate failed (${res.status})`);
  if (!res.data?.ok) return null;
  return Array.isArray(res.data.retired) ? res.data.retired.filter(isUuid) : [];
}

/** Undo for a flow whose tool could not be activated. */
export async function dropFlow(flowId: string): Promise<void> {
  await deleteFlow(flowId).catch(() => {});
}

/* ---------- cleanup (hourly, with the run purge) ---------- */

export interface CustomCleanupReport {
  draftsDeleted: number;
  expired: number;
  flowsDeleted: number;
  flowsWaiting: number;
  errors: string[];
  dryRun: boolean;
}

/**
 * 1. Drafts nobody confirmed (older than 48 h) go: they hold nothing of the
 *    visitor's but the suggested column names.
 * 2. Anonymous tools unused for CUSTOM_LIMITS.idleDays expire (the session
 *    cookie that owns them lasts that long); a tool tied to an account stays.
 * 3. Flows of replaced / expired tools are deleted once they have no runs
 *    left — the run purge removes those 24 h after each run.
 */
export async function cleanupCustomTools(opts: { dryRun?: boolean; limit?: number } = {}): Promise<CustomCleanupReport> {
  const dryRun = Boolean(opts.dryRun);
  const limit = Math.min(Math.max(opts.limit ?? 50, 1), 200);
  const report: CustomCleanupReport = { draftsDeleted: 0, expired: 0, flowsDeleted: 0, flowsWaiting: 0, errors: [], dryRun };
  const now = new Date();
  const iso = (ms: number) => encodeURIComponent(new Date(now.getTime() - ms).toISOString());

  try {
    const stale = `lite_custom_tools?status=eq.draft&created_at=lt.${iso(48 * 3600_000)}`;
    if (dryRun) {
      const res = await rest<{ id: string }[]>(`${stale}&select=id&limit=1000`);
      report.draftsDeleted = res.data?.length ?? 0;
    } else {
      const res = await rest<{ id: string }[]>(`${stale}&select=id`, { method: "DELETE", prefer: "return=representation" });
      if (!res.ok) throw new Error(`drafts delete failed (${res.status})`);
      report.draftsDeleted = res.data?.length ?? 0;
    }
  } catch (e) {
    report.errors.push(e instanceof Error ? e.message : String(e));
  }

  try {
    const idle = `lite_custom_tools?status=eq.active&user_id=is.null&last_used_at=lt.${iso(CUSTOM_LIMITS.idleDays * 86_400_000)}`;
    if (dryRun) {
      const res = await rest<{ id: string }[]>(`${idle}&select=id&limit=${limit}`);
      report.expired = res.data?.length ?? 0;
    } else {
      const res = await rest<{ flow_id: string | null }[]>(`${idle}&select=flow_id`, {
        method: "PATCH",
        prefer: "return=representation",
        body: { status: "expired", retired_at: now.toISOString() },
      });
      if (!res.ok) throw new Error(`expire failed (${res.status})`);
      report.expired = res.data?.length ?? 0;
      await retireFlows((res.data ?? []).map((r) => r.flow_id).filter(isUuid));
    }
  } catch (e) {
    report.errors.push(e instanceof Error ? e.message : String(e));
  }

  try {
    const res = await rest<{ id: string; flow_id: string }[]>(
      `lite_custom_tools?status=in.(replaced,expired)&flow_id=not.is.null&flow_deleted_at=is.null&select=id,flow_id&order=retired_at.asc&limit=${limit}`,
    );
    if (!res.ok) throw new Error(`retired select failed (${res.status})`);
    for (const row of res.data ?? []) {
      try {
        if (dryRun) {
          report.flowsWaiting++;
          continue;
        }
        // In case the request that replaced the tool died before retiring it.
        await retireFlows([row.flow_id]);
        if (await deleteFlow(row.flow_id)) {
          await rest(`lite_custom_tools?id=eq.${row.id}`, { method: "PATCH", body: { flow_deleted_at: new Date().toISOString() }, prefer: "return=minimal" });
          report.flowsDeleted++;
        } else {
          report.flowsWaiting++;
        }
      } catch (e) {
        report.errors.push(`${row.flow_id}: ${e instanceof Error ? e.message : String(e)}`);
      }
    }
  } catch (e) {
    report.errors.push(e instanceof Error ? e.message : String(e));
  }

  return report;
}
