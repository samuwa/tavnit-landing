import { NextResponse } from "next/server";
import { purgeExpiredRuns } from "@/lib/lite/purge";
import { cleanupCustomTools, type CustomCleanupReport } from "@/lib/lite/custom-server";

/**
 * Hourly (vercel.json): deletes the document and results of free-tool runs
 * older than LITE_RETENTION_HOURS, then tidies the custom tools (stale
 * suggestions, anonymous tools unused for 30 days, and the Flows of replaced
 * or expired tools once their runs are gone — the run purge goes first so a
 * Flow whose last run was just purged can go in the same pass). Requires `Authorization: Bearer
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
    let custom: CustomCleanupReport | { error: string };
    try {
      custom = await cleanupCustomTools({ dryRun, limit: Number.isFinite(limit) && limit > 0 ? limit : undefined });
    } catch (e) {
      custom = { error: e instanceof Error ? e.message : String(e) };
    }
    const customFailed = "error" in custom || custom.errors.length > 0;
    return NextResponse.json({ ...report, custom }, { status: report.errors.length || customFailed ? 207 : 200 });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : String(e) }, { status: 500 });
  }
}
