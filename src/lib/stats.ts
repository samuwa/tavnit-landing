/**
 * Public proof numbers, read from the shared Supabase project.
 *
 * The hero used to say "100,000+ documents processed" as a static string that
 * nobody could trace to anything. The number now comes from the same source
 * the product dashboard uses — completed extraction runs, one per document —
 * over the PostgREST count header, so it costs one HEAD request per hour of
 * ISR and no rows are transferred. It is floored to the nearest thousand so
 * the copy reads "25,000+" rather than a precise figure that is stale the
 * moment the page is cached.
 *
 * Fails closed to the last figure verified by hand (see FALLBACK) when the
 * env is missing or the request fails, matching platform.ts.
 */
const FALLBACK_DOCUMENTS_PROCESSED = 25_000; // completed runs on 2026-09-23

export async function documentsProcessed(): Promise<number> {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const base = process.env.SUPABASE_URL;
  if (!key || !base) return FALLBACK_DOCUMENTS_PROCESSED;
  try {
    const res = await fetch(
      `${base}/rest/v1/runs?status=eq.completed&select=id&limit=1`,
      {
        method: "HEAD",
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
          Prefer: "count=exact",
        },
        next: { revalidate: 3600 },
      },
    );
    if (!res.ok) return FALLBACK_DOCUMENTS_PROCESSED;
    // Content-Range: 0-0/25078
    const total = Number(res.headers.get("content-range")?.split("/")[1]);
    return Number.isFinite(total) && total > 0
      ? Math.max(total, FALLBACK_DOCUMENTS_PROCESSED)
      : FALLBACK_DOCUMENTS_PROCESSED;
  } catch {
    return FALLBACK_DOCUMENTS_PROCESSED;
  }
}

/** 25,078 → "25,000+" */
export function floorThousandsPlus(n: number): string {
  const floored = Math.floor(n / 1000) * 1000;
  return `${floored.toLocaleString("en-US")}+`;
}
