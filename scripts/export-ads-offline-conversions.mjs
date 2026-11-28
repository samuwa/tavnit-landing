// Export free-tool download leads for Google Ads → Goals → Uploads →
// "Conversions from clicks". Does not call the Google Ads API.
//
// One row per lead: the earliest download that carries a click id, deduped
// so the same run, the same user and the same click id are not exported
// twice. The CSV has no email and no user id.
//
//   node scripts/export-ads-offline-conversions.mjs --self-test
//   node --env-file=.env.local scripts/export-ads-offline-conversions.mjs --out ads.csv
//   node --env-file=.env.local scripts/export-ads-offline-conversions.mjs --out ads.csv --mark
//
// --mark stamps ads_exported_at (migration 20261128120000) so the next run
// skips those rows. Apply that migration before using --mark. Upload the
// CSV only after the script prints that the rows were marked.

import { readFileSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const COLUMNS = [
  "Google Click ID",
  "GBRAID",
  "WBRAID",
  "Conversion Name",
  "Conversion Time",
  "Conversion Value",
  "Conversion Currency",
];

const CLICK_RE = /^[A-Za-z0-9_\-.]+$/;
const DEFAULT_NAME = "Free tool lead (offline)";
const DEFAULT_TIMEZONE = "America/Panama";

function argValue(flag) {
  const i = process.argv.indexOf(flag);
  if (i === -1) return null;
  const v = process.argv[i + 1];
  if (!v || v.startsWith("--")) return null;
  return v;
}

function cleanClick(value) {
  if (typeof value !== "string") return null;
  const s = value.trim();
  if (!s || s.length > 200 || !CLICK_RE.test(s)) return null;
  return s;
}

/** The one click id Google Ads will accept on this row. gclid wins. */
export function clickOf(row) {
  const gclid = cleanClick(row.gclid);
  if (gclid) return { field: "gclid", id: gclid };
  const gbraid = cleanClick(row.gbraid);
  if (gbraid) return { field: "gbraid", id: gbraid };
  const wbraid = cleanClick(row.wbraid);
  if (wbraid) return { field: "wbraid", id: wbraid };
  return null;
}

/**
 * Earliest download wins. A later run for the same user, or another run
 * that repeats the same click id, is kept only so --mark can skip it next
 * time (`markRunIds`). Rows without a usable click id are ignored.
 */
export function selectLeads(rows) {
  const sorted = [...rows].sort((a, b) => {
    const ta = new Date(a.downloaded_at).getTime();
    const tb = new Date(b.downloaded_at).getTime();
    if (ta !== tb) return ta - tb;
    return String(a.run_id).localeCompare(String(b.run_id));
  });
  const seenRun = new Set();
  const seenUser = new Set();
  const seenClick = new Set();
  const winners = [];
  const markRunIds = [];

  for (const row of sorted) {
    if (!row || typeof row.run_id !== "string" || !row.run_id) continue;
    if (!row.downloaded_at || Number.isNaN(new Date(row.downloaded_at).getTime())) continue;
    const click = clickOf(row);
    if (!click) continue;
    if (seenRun.has(row.run_id)) continue;
    seenRun.add(row.run_id);
    markRunIds.push(row.run_id);
    const clickKey = `${click.field}:${click.id}`;
    const userKey = typeof row.user_id === "string" && row.user_id ? row.user_id : null;
    if (seenClick.has(clickKey) || (userKey && seenUser.has(userKey))) continue;
    seenClick.add(clickKey);
    if (userKey) seenUser.add(userKey);
    winners.push({ run_id: row.run_id, user_id: userKey, downloaded_at: row.downloaded_at, click });
  }
  return { winners, markRunIds };
}

/** `yyyy-MM-dd HH:mm:ss` in `timeZone`. America/Panama is UTC−05:00 all year. */
export function formatConversionTime(iso, timeZone) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(d);
  const get = (type) => parts.find((p) => p.type === type)?.value;
  const year = get("year");
  const month = get("month");
  const day = get("day");
  let hour = get("hour");
  const minute = get("minute");
  const second = get("second");
  if (!year || !month || !day || hour == null || !minute || !second) return null;
  if (hour === "24") hour = "00";
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

function csvEscape(value) {
  const s = String(value ?? "");
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

export function buildCsv(leads, { name, value, currency, timeZone }) {
  const lines = [`Parameters:TimeZone=${timeZone}`, COLUMNS.join(",")];
  for (const lead of leads) {
    const time = formatConversionTime(lead.downloaded_at, timeZone);
    if (!time) continue;
    const cells = [
      lead.click.field === "gclid" ? lead.click.id : "",
      lead.click.field === "gbraid" ? lead.click.id : "",
      lead.click.field === "wbraid" ? lead.click.id : "",
      name,
      time,
      value,
      currency,
    ];
    lines.push(cells.map(csvEscape).join(","));
  }
  return `${lines.join("\n")}\n`;
}

function assert(cond, message) {
  if (!cond) throw new Error(message);
}

function runSelfTest() {
  const panama = formatConversionTime("2026-06-15T18:30:00.000Z", "America/Panama");
  assert(panama === "2026-06-15 13:30:00", `Panama offset, got ${panama}`);
  const midnight = formatConversionTime("2026-01-01T05:00:00.000Z", "America/Panama");
  assert(midnight === "2026-01-01 00:00:00", `midnight, got ${midnight}`);

  const rows = [
    { run_id: "run-b", user_id: "user-1", downloaded_at: "2026-06-15T18:30:00.000Z", gclid: "click-A", user_email: "secret@example.com" },
    { run_id: "run-a", user_id: "user-1", downloaded_at: "2026-06-15T17:00:00.000Z", gclid: "click-B", user_email: "secret@example.com" },
    { run_id: "run-c", user_id: "user-2", downloaded_at: "2026-06-15T19:00:00.000Z", gclid: "click-A" },
    { run_id: "run-g", user_id: "user-5", downloaded_at: "2026-06-15T22:00:00.000Z", gclid: "click-B" },
    { run_id: "run-d", user_id: "user-3", downloaded_at: "2026-06-15T20:00:00.000Z", gbraid: "ios-braid" },
    { run_id: "run-e", user_id: "user-4", downloaded_at: "2026-06-15T21:00:00.000Z", gclid: "bad id!", wbraid: "web-braid" },
    { run_id: "run-f", user_id: null, downloaded_at: "2026-06-15T16:00:00.000Z", gclid: "" },
  ];
  const { winners, markRunIds } = selectLeads(rows);
  // user-1 keeps their earliest click (click-B). user-2 keeps click-A.
  // user-5 repeats click-B and is dropped. run-b repeats user-1 and is dropped.
  assert(winners.map((w) => w.run_id).join(",") === "run-a,run-c,run-d,run-e", `winners ${winners.map((w) => w.run_id)}`);
  assert(markRunIds.includes("run-b") && markRunIds.includes("run-g"), "suppressed runs are marked");
  assert(!markRunIds.includes("run-f"), "row without a click id is not marked");

  const csv = buildCsv(
    winners.map((w) => ({ ...w, user_email: "secret@example.com" })),
    { name: "Free tool lead (offline)", value: "1", currency: "USD", timeZone: "America/Panama" },
  );
  assert(csv.startsWith("Parameters:TimeZone=America/Panama\n"), "timezone header");
  assert(csv.includes(COLUMNS.join(",")), "column header");
  assert(csv.includes("click-B") && csv.includes("click-A"), "one row per click id");
  assert(csv.split("click-B").length === 2, "click-B is not repeated");
  assert(!csv.includes("secret@example.com"), "email never leaves the CSV");
  assert(!csv.includes("user-1"), "user id never leaves the CSV");
  const gbraidLine = csv.split("\n").find((l) => l.includes("ios-braid"));
  assert(gbraidLine === ",ios-braid,,Free tool lead (offline),2026-06-15 15:00:00,1,USD", `gbraid row ${gbraidLine}`);
  const wbraidLine = csv.split("\n").find((l) => l.includes("web-braid"));
  assert(wbraidLine?.startsWith(",,web-braid,"), "invalid gclid falls through to wbraid");
  console.error("self-test ok");
}

function loadEnvFile(name) {
  let text;
  try {
    text = readFileSync(resolve(process.cwd(), name), "utf8");
  } catch {
    return;
  }
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    if (!/^[A-Z0-9_]+$/.test(key) || process.env[key]) continue;
    let value = trimmed.slice(eq + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    process.env[key] = value;
  }
}

function requiredEnv(name) {
  const v = process.env[name]?.trim();
  if (!v) {
    console.error(`Missing ${name}. Set it in the environment or in .env.local (never pass it as an argument).`);
    process.exit(1);
  }
  return v;
}

function conversionSettings() {
  const name = (process.env.ADS_OFFLINE_CONVERSION_NAME || DEFAULT_NAME).trim();
  if (!name || name.length > 100 || /[\r\n]/.test(name)) {
    console.error("ADS_OFFLINE_CONVERSION_NAME must be a single line of at most 100 characters.");
    process.exit(1);
  }
  const value = (process.env.ADS_OFFLINE_CONVERSION_VALUE || "1").trim();
  if (!/^\d+(\.\d{1,2})?$/.test(value)) {
    console.error("ADS_OFFLINE_CONVERSION_VALUE must be a number like 1 or 1.00.");
    process.exit(1);
  }
  const currency = (process.env.ADS_OFFLINE_CONVERSION_CURRENCY || "USD").trim().toUpperCase();
  if (!/^[A-Z]{3}$/.test(currency)) {
    console.error("ADS_OFFLINE_CONVERSION_CURRENCY must be a 3-letter code.");
    process.exit(1);
  }
  const timeZone = (process.env.ADS_OFFLINE_TIMEZONE || DEFAULT_TIMEZONE).trim();
  try {
    new Intl.DateTimeFormat("en-US", { timeZone }).format(new Date());
  } catch {
    console.error(`ADS_OFFLINE_TIMEZONE is not a valid IANA zone (${timeZone}).`);
    process.exit(1);
  }
  return { name, value, currency, timeZone };
}

async function fetchPage(base, key, { useExportColumn, offset }) {
  const select = ["run_id", "user_id", "downloaded_at", "gclid", "gbraid", "wbraid"];
  if (useExportColumn) select.push("ads_exported_at");
  const parts = [
    `select=${select.join(",")}`,
    "downloaded_at=not.is.null",
    "or=(gclid.not.is.null,gbraid.not.is.null,wbraid.not.is.null)",
    "order=downloaded_at.asc",
    "limit=1000",
    `offset=${offset}`,
  ];
  if (useExportColumn) parts.push("ads_exported_at=is.null");
  const res = await fetch(`${base}/rest/v1/lite_runs?${parts.join("&")}`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
  });
  const text = await res.text();
  if (!res.ok) {
    const err = new Error(`lite_runs query failed (${res.status})`);
    err.body = text.slice(0, 500);
    err.status = res.status;
    throw err;
  }
  const rows = JSON.parse(text);
  if (!Array.isArray(rows)) throw new Error("lite_runs query did not return a list");
  return rows;
}

async function fetchLeads(base, key, useExportColumn) {
  const rows = [];
  for (let offset = 0; offset < 50_000; offset += 1000) {
    const batch = await fetchPage(base, key, { useExportColumn, offset });
    rows.push(...batch);
    if (batch.length < 1000) break;
  }
  return rows;
}

function quoteIn(id) {
  return `"${id.replace(/"/g, "")}"`;
}

async function markExported(base, key, runIds, iso) {
  for (let i = 0; i < runIds.length; i += 80) {
    const chunk = runIds.slice(i, i + 80);
    const res = await fetch(`${base}/rest/v1/lite_runs?run_id=in.(${chunk.map(quoteIn).join(",")})`, {
      method: "PATCH",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ ads_exported_at: iso }),
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Could not mark rows exported (${res.status}): ${text.slice(0, 300)}`);
    }
  }
}

async function main() {
  if (process.argv.includes("--help")) {
    console.error("Usage: node scripts/export-ads-offline-conversions.mjs [--out file.csv] [--mark] [--self-test]");
    return;
  }
  if (process.argv.includes("--self-test")) {
    runSelfTest();
    return;
  }

  loadEnvFile(".env.local");
  loadEnvFile(".env");
  const base = requiredEnv("SUPABASE_URL").replace(/\/$/, "");
  const key = requiredEnv("SUPABASE_SERVICE_ROLE_KEY");
  const settings = conversionSettings();
  const mark = process.argv.includes("--mark");
  const out = argValue("--out");
  if (mark && !out) {
    console.error("--mark needs --out ads.csv, so the file you upload is the one whose rows were stamped.");
    process.exit(1);
  }

  let rows;
  let canMark = true;
  try {
    rows = await fetchLeads(base, key, true);
  } catch (e) {
    if (String(e.body || "").includes("ads_exported_at")) {
      canMark = false;
      rows = await fetchLeads(base, key, false);
    } else {
      console.error(e.message);
      if (e.body) console.error(e.body);
      process.exit(1);
    }
  }

  if (mark && !canMark) {
    console.error("Apply supabase/migrations/20261128120000_lite_runs_ads_exported.sql before --mark.");
    process.exit(1);
  }
  if (!canMark) {
    console.error("ads_exported_at is missing, so this file cannot skip rows you already uploaded. Apply the migration before relying on a repeat export.");
  }

  const { winners, markRunIds } = selectLeads(rows);
  const csv = buildCsv(winners, settings);
  if (mark && markRunIds.length > 0) {
    const partial = `${out}.partial`;
    writeFileSync(partial, csv);
    try {
      await markExported(base, key, markRunIds, new Date().toISOString());
    } catch (e) {
      rmSync(partial, { force: true });
      console.error(e instanceof Error ? e.message : String(e));
      console.error("No CSV was left on disk. Rows were not all marked. Fix the error and run again.");
      process.exit(2);
    }
    renameSync(partial, out);
  } else if (out) {
    writeFileSync(out, csv);
  } else {
    process.stdout.write(csv);
  }
  console.error(
    `${winners.length} conversion(s), ${markRunIds.length} run(s)${mark && markRunIds.length > 0 ? " marked ads_exported_at" : mark ? "" : " (not marked; pass --mark --out ads.csv to skip them next time)"}.`,
  );
  if (mark && markRunIds.length > 0) console.error(`Rows are marked. Upload ${out} once.`);
  else if (mark) console.error(`Nothing to mark. ${out} only has the header.`);
}

const isDirect = process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href;
if (isDirect) {
  main().catch((e) => {
    console.error(e instanceof Error ? e.message : String(e));
    process.exit(1);
  });
}
