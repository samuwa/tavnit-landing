// Records the result of every tool's bundled sample, once, through the real
// engine, so the pages can show it instantly instead of re-running the same
// document on every click (same input, same output: a run would cost the
// visitor a document of their quota and the Lite org its credits for nothing).
//
// Needs the dev server on :3010 with LITE_RUNS_PER_DAY raised. Run again
// whenever a Flow, Matcher or Splitter behind a sample changes:
//   node scripts/record-lite-samples.mjs            # every tool
//   node scripts/record-lite-samples.mjs quote-comparison
import { writeFileSync } from "node:fs";

const BASE = process.env.LITE_BASE || "http://localhost:3010";
const OUT = new URL("../src/lib/lite/samples/", import.meta.url);
let cookie = "";

async function call(path, init = {}) {
  const res = await fetch(BASE + path, {
    ...init,
    headers: { Origin: BASE, ...(cookie ? { Cookie: cookie } : {}), ...(init.headers || {}) },
  });
  const set = res.headers.getSetCookie?.() ?? [];
  for (const c of set) {
    const [pair] = c.split(";");
    const [name] = pair.split("=");
    cookie = [...cookie.split("; ").filter((x) => x && !x.startsWith(name + "=")), pair].join("; ");
  }
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`${path} → ${res.status} ${JSON.stringify(body)}`);
  return body;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function poll(path) {
  for (let i = 0; i < 120; i++) {
    const b = await call(path);
    if (b.status === "completed") return b;
    if (b.status === "failed") throw new Error(`${path} failed`);
    await sleep(2500);
  }
  throw new Error(`${path} timed out`);
}

async function run(tool, locale, slot) {
  const form = new FormData();
  form.set("tool", tool);
  form.set("locale", locale);
  form.set("sample", slot === undefined ? "1" : String(slot));
  if (slot !== undefined) form.set("slot", String(slot));
  const { runId } = await call("/api/lite/runs", { method: "POST", body: form });
  return runId;
}

const EXTRACT = ["invoice-to-excel", "packing-list-to-excel", "bill-of-lading-to-excel", "contract-dates", "receipt-to-excel"];
const COMPARE = { "po-invoice-check": 2, "quote-comparison": 3 };
const only = process.argv[2];

function save(name, data) {
  writeFileSync(new URL(`${name}.json`, OUT), JSON.stringify(data, null, 1) + "\n");
  console.log("saved", name);
}

for (const locale of ["es", "en"]) {
  for (const tool of EXTRACT) {
    if (only && only !== tool) continue;
    const t0 = Date.now();
    const id = await run(tool, locale);
    const b = await poll(`/api/lite/runs/${id}`);
    save(`${tool}.${locale}`, {
      kind: "extract",
      seconds: Math.round((Date.now() - t0) / 1000),
      columns: b.columns,
      rows: b.rows,
      total: b.total,
      truncated: b.truncated,
      pages: b.pages,
      mime: b.mime ?? "application/pdf",
    });
  }
  for (const [tool, n] of Object.entries(COMPARE)) {
    if (only && only !== tool) continue;
    const t0 = Date.now();
    const runIds = [];
    for (let i = 0; i < n; i++) runIds.push(await run(tool, locale, i));
    for (const id of runIds) await poll(`/api/lite/runs/${id}`);
    const { matchId } = await call("/api/lite/compare", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tool, runIds }),
    });
    const b = await poll(`/api/lite/compare/${matchId}`);
    save(`${tool}.${locale}`, { kind: "compare", seconds: Math.round((Date.now() - t0) / 1000), result: b.result });
  }
}

// The splitter is language neutral: one recording serves both languages.
if (!only || only === "split-scanned-pdf") {
  const t0 = Date.now();
  const form = new FormData();
  form.set("tool", "split-scanned-pdf");
  form.set("locale", "es");
  form.set("sample", "1");
  const { splitId } = await call("/api/lite/split", { method: "POST", body: form });
  const b = await poll(`/api/lite/split/${splitId}`);
  save("split-scanned-pdf", { kind: "split", seconds: Math.round((Date.now() - t0) / 1000), segments: b.segments, pages: b.pages });
}
