import "server-only";

/**
 * Retention for the free tools: a run's document and results are deleted
 * once it is older than LITE_RETENTION_HOURS (default 24).
 *
 * Neither Tavnit app deletes runs, so this does it the way the backend
 * stores them, verified against the code and the live project:
 *  - the original upload lives at  files/<org>/<run>/original.<ext>
 *    (image crops, when any, under   files/<org>/<run>/images/…)
 *  - legacy JSON results would be at run_file_json/<org>/<run>/…
 *  - the rows themselves are in runs.output_json, so deleting the row is
 *    what deletes the results.
 *
 * Splitter jobs (segments at files/<org>/splits/<split>/…, row in `splits`)
 * and Matcher jobs (row in `matches`) are purged the same way.
 *
 * Safety: every delete is scoped to TAVNIT_LITE_ORG_ID, a dedicated org
 * that holds nothing but free-tool runs; runs still queued/running are
 * left for the worker to finish or the backend's stale sweep to fail;
 * lite_runs keeps the fact that a run happened (for quotas and leads)
 * with purged_at set and the filename cleared.
 *
 * Everything goes through Supabase's REST and Storage APIs with the
 * service role, like the rest of this site: no Flask code involved.
 */

const BUCKETS = ["files", "run_file_json"] as const;
const FINISHED = ["completed", "failed", "cancelled"];

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

export function retentionHours(): number {
  const v = Number(process.env.LITE_RETENTION_HOURS);
  return Number.isFinite(v) && v > 0 ? v : 24;
}

interface Candidate {
  run_id: string;
  status: string;
  source: "lite" | "orphan";
  kind: "run" | "split" | "match" | "sweep";
}

/** Storage objects under <org>/<run>/ in one bucket (recursive: the API
 *  lists one level, so folders are walked). */
async function listObjects(base: string, key: string, bucket: string, prefix: string): Promise<string[]> {
  const out: string[] = [];
  const walk = async (p: string) => {
    const res = await fetch(`${base}/storage/v1/object/list/${bucket}`, {
      method: "POST",
      headers: headers(key),
      body: JSON.stringify({ prefix: p, limit: 1000, offset: 0 }),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`storage list ${bucket}/${p} failed (${res.status})`);
    const items = (await res.json()) as { name: string; id: string | null }[];
    for (const it of items) {
      const full = `${p}/${it.name}`;
      // Folders come back with a null id.
      if (it.id === null) await walk(full);
      else out.push(full);
    }
  };
  await walk(prefix);
  return out;
}

async function removeObjects(base: string, key: string, bucket: string, paths: string[]): Promise<void> {
  if (!paths.length) return;
  const res = await fetch(`${base}/storage/v1/object/${bucket}`, {
    method: "DELETE",
    headers: headers(key),
    body: JSON.stringify({ prefixes: paths }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`storage delete ${bucket} failed (${res.status})`);
}

async function deleteRunRow(base: string, key: string, org: string, runId: string): Promise<boolean> {
  // The org filter is the guard rail: a run outside the Lite org never matches.
  const res = await fetch(
    `${base}/rest/v1/runs?id=eq.${encodeURIComponent(runId)}&org_id=eq.${encodeURIComponent(org)}&status=in.(${FINISHED.join(",")})`,
    { method: "DELETE", headers: { ...headers(key), Prefer: "return=representation" }, cache: "no-store" },
  );
  if (!res.ok) throw new Error(`runs delete ${runId} failed (${res.status}): ${(await res.text()).slice(0, 200)}`);
  const rows = (await res.json()) as unknown[];
  return rows.length > 0;
}

async function markPurged(base: string, key: string, runId: string): Promise<void> {
  const res = await fetch(`${base}/rest/v1/lite_runs?run_id=eq.${encodeURIComponent(runId)}`, {
    method: "PATCH",
    headers: { ...headers(key), Prefer: "return=minimal" },
    body: JSON.stringify({ purged_at: new Date().toISOString(), filename: null, meta: null }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`lite_runs mark ${runId} failed (${res.status})`);
}

/** Runs to purge: every lite_runs row past retention and not yet purged,
 *  plus finished runs in the Lite org that no lite_runs row references
 *  (test leftovers): the org exists only for the free tools. */
async function candidates(base: string, key: string, org: string, cutoffIso: string, limit: number): Promise<Candidate[]> {
  const h = headers(key);
  const lite = await fetch(
    `${base}/rest/v1/lite_runs?select=run_id,status,kind&purged_at=is.null&created_at=lt.${encodeURIComponent(cutoffIso)}&order=created_at.asc&limit=${limit}`,
    { headers: h, cache: "no-store" },
  );
  if (!lite.ok) throw new Error(`lite_runs select failed (${lite.status})`);
  const fromLite = ((await lite.json()) as { run_id: string; status: string; kind?: string }[]).map((r) => ({
    run_id: r.run_id,
    status: r.status,
    source: "lite" as const,
    kind: (r.kind === "split" || r.kind === "match" || r.kind === "sweep" ? r.kind : "run") as Candidate["kind"],
  }));

  const orphans = await fetch(
    `${base}/rest/v1/runs?select=id,status&org_id=eq.${encodeURIComponent(org)}&created_at=lt.${encodeURIComponent(cutoffIso)}&status=in.(${FINISHED.join(",")})&order=created_at.asc&limit=${limit}`,
    { headers: h, cache: "no-store" },
  );
  if (!orphans.ok) throw new Error(`runs select failed (${orphans.status})`);
  const known = new Set(fromLite.map((r) => r.run_id));
  const fromOrg = ((await orphans.json()) as { id: string; status: string }[])
    .filter((r) => !known.has(r.id))
    .map((r) => ({ run_id: r.id, status: r.status, source: "orphan" as const, kind: "run" as const }));
  return [...fromLite, ...fromOrg].slice(0, limit);
}

export interface PurgeReport {
  cutoff: string;
  considered: number;
  purged: number;
  skippedRunning: number;
  objectsRemoved: number;
  errors: { run_id: string; error: string }[];
  dryRun: boolean;
}

export async function purgeExpiredRuns(opts: { maxAgeHours?: number; limit?: number; dryRun?: boolean } = {}): Promise<PurgeReport> {
  const { base, key, org } = env();
  const hours = opts.maxAgeHours ?? retentionHours();
  const limit = Math.min(Math.max(opts.limit ?? 50, 1), 200);
  const dryRun = Boolean(opts.dryRun);
  const cutoff = new Date(Date.now() - hours * 3600_000).toISOString();

  const list = await candidates(base, key, org, cutoff, limit);
  const report: PurgeReport = { cutoff, considered: list.length, purged: 0, skippedRunning: 0, objectsRemoved: 0, errors: [], dryRun };

  for (const c of list) {
    try {
      if (c.kind !== "run") {
        // A Splitter job: its segments under <org>/splits/<id>/ and the row.
        // A Matcher job: only a row (its inputs are runs, purged on their own).
        // A Cleaner sweep (spreadsheet tools): the row, whose input_json and
        // output_json hold the visitor's cells; lite_runs.meta goes with it.
        const table = c.kind === "split" ? "splits" : c.kind === "sweep" ? "sweeps" : "matches";
        const live = await fetch(`${base}/rest/v1/${table}?select=status&id=eq.${encodeURIComponent(c.run_id)}&org_id=eq.${encodeURIComponent(org)}&limit=1`, { headers: headers(key), cache: "no-store" });
        const rows = live.ok ? ((await live.json()) as { status: string }[]) : [];
        const status = rows[0]?.status;
        const done = c.kind === "split" || c.kind === "sweep" ? ["completed", "failed"] : FINISHED;
        if (status && !done.includes(status)) {
          report.skippedRunning++;
          continue;
        }
        let removed = 0;
        if (c.kind === "split") {
          const paths = await listObjects(base, key, "files", `${org}/splits/${c.run_id}`);
          if (!dryRun) await removeObjects(base, key, "files", paths);
          removed = paths.length;
        }
        if (!dryRun) {
          if (rows[0]) {
            const del = await fetch(`${base}/rest/v1/${table}?id=eq.${encodeURIComponent(c.run_id)}&org_id=eq.${encodeURIComponent(org)}`, { method: "DELETE", headers: { ...headers(key), Prefer: "return=minimal" }, cache: "no-store" });
            if (!del.ok) throw new Error(`${table} delete ${c.run_id} failed (${del.status})`);
          }
          await markPurged(base, key, c.run_id);
        }
        report.objectsRemoved += removed;
        report.purged++;
        continue;
      }
      // Anything the backend may still be writing to is left alone. lite_runs
      // can lag (it only learns the status when the visitor polls), so the
      // live status is what the run row says; the DELETE re-checks it.
      const live = await fetch(`${base}/rest/v1/runs?select=status&id=eq.${encodeURIComponent(c.run_id)}&org_id=eq.${encodeURIComponent(org)}&limit=1`, {
        headers: headers(key),
        cache: "no-store",
      });
      const rows = live.ok ? ((await live.json()) as { status: string }[]) : [];
      const status = rows[0]?.status;
      if (status && !FINISHED.includes(status)) {
        report.skippedRunning++;
        continue;
      }

      const prefix = `${org}/${c.run_id}`;
      let removed = 0;
      for (const bucket of BUCKETS) {
        const paths = await listObjects(base, key, bucket, prefix);
        if (!dryRun) await removeObjects(base, key, bucket, paths);
        removed += paths.length;
      }
      if (!dryRun) {
        // Missing row (already gone) still counts as purged: the objects are gone too.
        if (rows[0]) await deleteRunRow(base, key, org, c.run_id);
        if (c.source === "lite") await markPurged(base, key, c.run_id);
      }
      report.objectsRemoved += removed;
      report.purged++;
    } catch (e) {
      report.errors.push({ run_id: c.run_id, error: e instanceof Error ? e.message : String(e) });
    }
  }
  return report;
}
