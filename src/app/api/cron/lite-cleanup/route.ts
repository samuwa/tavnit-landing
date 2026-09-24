import { NextResponse } from "next/server";
import { purgeExpiredRuns } from "@/lib/lite/purge";

/**
 * Hourly (vercel.json): deletes the document and results of free-tool runs
 * older than LITE_RETENTION_HOURS. Requires `Authorization: Bearer
 * $CRON_SECRET`, which Vercel attaches to cron invocations.
 *
 * Query parameters, for operating it by hand with the same secret:
 *   dry_run=1          report what would be purged, delete nothing
 *   max_age_hours=<n>  override the retention for this call
 *   limit=<n>          batch size (default 50, max 200)
 */

export const runtime = "nodejs";
export const maxDuration = 300;

function authorized(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  const header = request.headers.get("authorization") || "";
  return header === `Bearer ${secret}`;
}

export async function GET(request: Request) {
  if (!authorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const url = new URL(request.url);
  const dryRun = url.searchParams.get("dry_run") === "1";
  const maxAge = Number(url.searchParams.get("max_age_hours"));
  const limit = Number(url.searchParams.get("limit"));
  try {
    const report = await purgeExpiredRuns({
      dryRun,
      maxAgeHours: Number.isFinite(maxAge) && maxAge >= 0 && url.searchParams.has("max_age_hours") ? maxAge : undefined,
      limit: Number.isFinite(limit) && limit > 0 ? limit : undefined,
    });
    return NextResponse.json(report, { status: report.errors.length ? 207 : 200 });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : String(e) }, { status: 500 });
  }
}
