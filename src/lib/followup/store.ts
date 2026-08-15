import "server-only";

/**
 * Storage for follow-up invites and responses, on the same Supabase project
 * the app already uses (a new table + private bucket — see
 * supabase/followup-schema.sql).
 *
 * Talks straight to PostgREST/Storage over fetch: the landing site has no
 * Supabase dependency today and two endpoints don't justify adding one. The
 * service-role key is used because these helpers only ever run on the server
 * (API routes, server components, server actions) — it must never be imported
 * from client code, which `server-only` enforces at build time.
 */

export type FollowupInvite = {
  id: string;
  token: string;
  client_name: string;
  company: string | null;
  contact_email: string | null;
  sales_rep: string | null;
  /** The rep's inbox — what the prospect sees for uploads and the mailto CTA. */
  sales_rep_email: string | null;
  notes: string | null;
  /** Starting language the sales rep picked for this client (es | en). */
  lang: string;
  created_at: string;
  opened_at: string | null;
  started_at: string | null;
  completed_at: string | null;
  sentiment: string | null;
  answers: Record<string, unknown>;
  files: { name: string; path: string; size: number }[];
};

const TABLE = "followup_invites";
export const UPLOAD_BUCKET = "followup-uploads";

function env(name: "SUPABASE_URL" | "SUPABASE_SERVICE_ROLE_KEY"): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `${name} is not set. The follow-up questionnaire needs it — see supabase/followup-schema.sql for setup.`,
    );
  }
  return value;
}

function headers(): HeadersInit {
  const key = env("SUPABASE_SERVICE_ROLE_KEY");
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  };
}

async function rest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${env("SUPABASE_URL")}${path}`, {
    ...init,
    headers: { ...headers(), ...init.headers },
    cache: "no-store",
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Supabase ${init.method ?? "GET"} ${path} → ${res.status}: ${body.slice(0, 300)}`);
  }
  // DELETE / minimal-return responses have no body.
  const text = await res.text();
  return (text ? JSON.parse(text) : null) as T;
}

export async function getInviteByToken(token: string): Promise<FollowupInvite | null> {
  const rows = await rest<FollowupInvite[]>(
    `/rest/v1/${TABLE}?token=eq.${encodeURIComponent(token)}&limit=1`,
  );
  return rows[0] ?? null;
}

export async function updateInvite(
  token: string,
  patch: Partial<
    Pick<
      FollowupInvite,
      "opened_at" | "started_at" | "completed_at" | "sentiment" | "answers" | "files"
    >
  >,
): Promise<void> {
  await rest(`/rest/v1/${TABLE}?token=eq.${encodeURIComponent(token)}`, {
    method: "PATCH",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify(patch),
  });
}

/** Uploads into the private bucket; returns the storage path. */
export async function uploadFile(
  token: string,
  filename: string,
  contentType: string,
  bytes: ArrayBuffer,
): Promise<string> {
  // Path is namespaced by token so one client's files can't collide with
  // another's, and sanitised because storage keys reject some characters.
  const safe = filename.replace(/[^\w.\-]+/g, "_").slice(-100);
  const path = `${token}/${Date.now()}-${safe}`;
  const key = env("SUPABASE_SERVICE_ROLE_KEY");
  const res = await fetch(`${env("SUPABASE_URL")}/storage/v1/object/${UPLOAD_BUCKET}/${path}`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": contentType || "application/octet-stream",
    },
    body: bytes,
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Supabase upload → ${res.status}: ${body.slice(0, 300)}`);
  }
  return path;
}

