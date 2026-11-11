/**
 * The Custom Tool ("build your own extractor"): shapes and rules shared by
 * the routes and the page. No secrets and no server imports here.
 *
 * A custom tool is a Flow in the Tavnit Lite org made from what the
 * product's field-suggestion assistant read in one sample document. The
 * visitor only ever chooses among the suggested fields and renames them:
 * the hints that steer the extraction stay on the server (custom-server.ts),
 * so the page cannot be used to run arbitrary prompts.
 */

export type CustomFieldKind = "metadata" | "table";
export type CustomDataType = "text" | "number" | "date" | "mixed";

export const CUSTOM_DATA_TYPES: CustomDataType[] = ["text", "number", "date", "mixed"];

export const CUSTOM_LIMITS = {
  /** AI suggestions per anonymous session and per IP per UTC day — env
   *  LITE_CUSTOM_SUGGESTS_PER_DAY overrides. */
  suggestsPerDay: 3,
  /** Suggestions per day across all visitors — env LITE_CUSTOM_DAILY_CAP
   *  overrides. Keep it under the product's per-org assistant budget
   *  (Flask RATE_LIMIT_ORG_ASSISTANT_PER_DAY, 200): every visitor is the
   *  same org there. */
  dailyCap: 150,
  /** Fields a tool may keep (the assistant proposes at most 10 + 10). */
  maxFields: 20,
  maxNameLength: 60,
  maxFieldNameLength: 60,
  /** A suggestion the visitor never confirmed can still be confirmed this long. */
  draftTtlMinutes: 120,
  /** An anonymous tool nobody uses for this long is deleted — the life of
   *  the session cookie. A tool tied to an account does not expire. */
  idleDays: 30,
} as const;

/** One suggested field as the review step shows it. */
export interface CustomSuggestedField {
  /** Stable handle inside one suggestion: m0, m1 … t0, t1 … */
  key: string;
  kind: CustomFieldKind;
  name: string;
  dataType: CustomDataType;
  /** A value the assistant read in the document, shown once and never stored. */
  example: string | null;
  /** 0-1 from the model. */
  confidence: number;
}

export interface CustomSuggestion {
  draftId: string;
  name: string;
  documentType: string;
  fields: CustomSuggestedField[];
  /** Suggestions this visitor has left today. */
  remaining: number | null;
}

export interface CustomToolField {
  name: string;
  kind: CustomFieldKind;
  dataType: CustomDataType;
}

/** The visitor's tool as the page shows it. */
export interface CustomToolView {
  id: string;
  name: string;
  locale: "es" | "en";
  fields: CustomToolField[];
  createdAt: string;
  /** null when the tool is tied to an account (no expiry). */
  expiresAt: string | null;
}

/** What the page sends to create the tool: which suggested fields stay, and
 *  under which name. Anything else about a field comes from the draft. */
export interface CustomSelection {
  draftId: string;
  name: string;
  fields: { key: string; name: string }[];
}

/** A tool or column name as typed or suggested: one line, no control
 *  characters, no leading formula sign (the name becomes an Excel header),
 *  trimmed and capped. Empty when nothing usable is left. */
export function cleanCustomName(raw: unknown, max: number): string {
  if (typeof raw !== "string") return "";
  const oneLine = raw
    .normalize("NFC")
    .replace(/[\u0000-\u001f\u007f-\u009f\u200b-\u200f\u2028-\u202f\u2060-\u206f\ufeff]/g, " ")
    .replace(/[<>{}\\`|]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^[=+\-@]+\s*/, "");
  return oneLine.slice(0, max).trim();
}

export function isCustomDataType(v: unknown): v is CustomDataType {
  return typeof v === "string" && (CUSTOM_DATA_TYPES as string[]).includes(v);
}

export type SelectionError = "no_fields" | "too_many_fields" | "bad_field" | "duplicate_name" | "bad_name";

/**
 * Checks a selection against the suggestion it came from and returns the
 * fields to create, in the suggestion's order (metadata first, then table
 * columns, as the assistant listed them).
 */
export function resolveSelection(
  suggested: { key: string; kind: CustomFieldKind; name: string; dataType: CustomDataType }[],
  selection: { name: unknown; fields: unknown },
  fallbackName: string,
): { ok: true; name: string; fields: (CustomToolField & { key: string })[] } | { ok: false; error: SelectionError } {
  if (!Array.isArray(selection.fields)) return { ok: false, error: "bad_field" };
  if (selection.fields.length === 0) return { ok: false, error: "no_fields" };
  if (selection.fields.length > CUSTOM_LIMITS.maxFields) return { ok: false, error: "too_many_fields" };

  const byKey = new Map(suggested.map((f) => [f.key, f]));
  const renamed = new Map<string, string>();
  for (const item of selection.fields) {
    if (!item || typeof item !== "object") return { ok: false, error: "bad_field" };
    const { key, name } = item as { key?: unknown; name?: unknown };
    if (typeof key !== "string" || !byKey.has(key) || renamed.has(key)) return { ok: false, error: "bad_field" };
    const clean = cleanCustomName(name, CUSTOM_LIMITS.maxFieldNameLength);
    if (!clean) return { ok: false, error: "bad_field" };
    renamed.set(key, clean);
  }

  const seen = new Set<string>();
  const fields: (CustomToolField & { key: string })[] = [];
  for (const f of suggested) {
    const name = renamed.get(f.key);
    if (!name) continue;
    const fold = name.toLocaleLowerCase();
    if (seen.has(fold)) return { ok: false, error: "duplicate_name" };
    seen.add(fold);
    fields.push({ key: f.key, name, kind: f.kind, dataType: f.dataType });
  }

  const name = cleanCustomName(selection.name, CUSTOM_LIMITS.maxNameLength) || cleanCustomName(fallbackName, CUSTOM_LIMITS.maxNameLength);
  if (!name) return { ok: false, error: "bad_name" };
  return { ok: true, name, fields };
}

/** What a run of the custom tool remembers in lite_runs.meta: the tool's
 *  columns in order (cleared with the run by the 24-hour purge). */
export interface CustomRunMeta {
  custom: true;
  columns: string[];
  lineFields: string[];
}

export function customRunMeta(fields: CustomToolField[]): CustomRunMeta {
  return {
    custom: true,
    columns: fields.map((f) => f.name),
    lineFields: fields.filter((f) => f.kind === "table").map((f) => f.name),
  };
}

/** The column order a custom run stored, or null for any other run. */
export function customRunColumns(meta: unknown): string[] | null {
  if (!meta || typeof meta !== "object") return null;
  const m = meta as Partial<CustomRunMeta>;
  if (m.custom !== true || !Array.isArray(m.columns)) return null;
  return m.columns.filter((c): c is string => typeof c === "string");
}
