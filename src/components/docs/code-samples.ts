/**
 * Code samples used across the docs pages.
 *
 * Extracted verbatim from the former single-file docs page so each route
 * imports only what it needs. Sample contents are byte-identical to the
 * original — only the top-level declarations gained `export`.
 */

export const API_BASE = "https://run.tavnit.io/api";

export const PYTHON_CODE = `import requests

API_KEY = "YOUR_API_KEY"
FLOW_ID = "YOUR_FLOW_ID"

# ─────────────────────────────────────────────────────────────
# Option 1: Multipart file upload (binary)
# ─────────────────────────────────────────────────────────────
with open("document.pdf", "rb") as file:
    response = requests.post(
        "https://run.tavnit.io/api/runs/process",
        headers={"X-API-Key": API_KEY},
        data={
            "flow_id": FLOW_ID,
            "source": "api"
        },
        files={"file": file}
    )

print(response.json())


# ─────────────────────────────────────────────────────────────
# Option 2: Base64-encoded file (JSON body)
# ─────────────────────────────────────────────────────────────
import base64

with open("document.pdf", "rb") as file:
    file_base64 = base64.b64encode(file.read()).decode("utf-8")

response = requests.post(
    "https://run.tavnit.io/api/runs/process",
    headers={
        "X-API-Key": API_KEY,
        "Content-Type": "application/json"
    },
    json={
        "flow_id": FLOW_ID,
        "source": "api",
        "filename": "document.pdf",
        "file_base64": file_base64
    }
)

print(response.json())`;

export const JAVASCRIPT_CODE = `const API_KEY = "YOUR_API_KEY";
const FLOW_ID = "YOUR_FLOW_ID";

// ─────────────────────────────────────────────────────────────
// Option 1: Multipart file upload (binary)
// ─────────────────────────────────────────────────────────────
async function processDocument(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("flow_id", FLOW_ID);
  formData.append("source", "api");

  const response = await fetch("https://run.tavnit.io/api/runs/process", {
    method: "POST",
    headers: { "X-API-Key": API_KEY },
    body: formData,
  });

  return await response.json();
}


// ─────────────────────────────────────────────────────────────
// Option 2: Base64-encoded file (JSON body)
// ─────────────────────────────────────────────────────────────
async function processDocumentBase64(base64Content, filename) {
  const response = await fetch("https://run.tavnit.io/api/runs/process", {
    method: "POST",
    headers: {
      "X-API-Key": API_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      flow_id: FLOW_ID,
      source: "api",
      filename: filename,
      file_base64: base64Content
    })
  });

  return await response.json();
}`;

export const JSON_BODY_EXAMPLE = `{
  "flow_id": "YOUR_FLOW_ID",
  "source": "api",
  "filename": "document.pdf",
  "file_base64": "{{previous_module.base64_content}}"
}`;

export const PYTHON_COLLECTIONS_CODE = `import requests

API_KEY = "YOUR_API_KEY"
COLLECTION_ID = "YOUR_COLLECTION_ID"

# ─────────────────────────────────────────────────────────────
# Option 1: Multipart file upload (binary)
# ─────────────────────────────────────────────────────────────
with open("document.pdf", "rb") as file:
    response = requests.post(
        "${API_BASE}/collections/process",
        headers={"X-API-Key": API_KEY},
        data={
            "collection_id": COLLECTION_ID,
            "source": "api"
        },
        files={"file": file}
    )

print(response.json())


# ─────────────────────────────────────────────────────────────
# Option 2: Base64-encoded file (JSON body)
# ─────────────────────────────────────────────────────────────
import base64

with open("document.pdf", "rb") as file:
    file_base64 = base64.b64encode(file.read()).decode("utf-8")

response = requests.post(
    "${API_BASE}/collections/process",
    headers={
        "X-API-Key": API_KEY,
        "Content-Type": "application/json"
    },
    json={
        "collection_id": COLLECTION_ID,
        "source": "api",
        "filename": "document.pdf",
        "file_base64": file_base64
    }
)

print(response.json())`;

export const JAVASCRIPT_COLLECTIONS_CODE = `const API_KEY = "YOUR_API_KEY";
const COLLECTION_ID = "YOUR_COLLECTION_ID";

// ─────────────────────────────────────────────────────────────
// Option 1: Multipart file upload (binary)
// ─────────────────────────────────────────────────────────────
async function processCollection(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("collection_id", COLLECTION_ID);
  formData.append("source", "api");

  const response = await fetch("${API_BASE}/collections/process", {
    method: "POST",
    headers: { "X-API-Key": API_KEY },
    body: formData,
  });

  return await response.json();
}


// ─────────────────────────────────────────────────────────────
// Option 2: Base64-encoded file (JSON body)
// ─────────────────────────────────────────────────────────────
async function processCollectionBase64(base64Content, filename) {
  const response = await fetch("${API_BASE}/collections/process", {
    method: "POST",
    headers: {
      "X-API-Key": API_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      collection_id: COLLECTION_ID,
      source: "api",
      filename: filename,
      file_base64: base64Content
    })
  });

  return await response.json();
}`;

export const PYTHON_CLEANERS_CODE = `import requests

API_KEY = "YOUR_API_KEY"
CLEANER_ID = "YOUR_CLEANER_ID"

# ─────────────────────────────────────────────────────────────
# Option 1: Sweep a spreadsheet (CSV, XLSX or XLS, multipart only)
# Column headers must be on the first row.
# ─────────────────────────────────────────────────────────────
with open("vendors.csv", "rb") as f:
    response = requests.post(
        "${API_BASE}/sweeps/run",
        headers={"X-API-Key": API_KEY},
        data={"cleaner_id": CLEANER_ID},
        files={"file": ("vendors.csv", f, "text/csv")},
    )

print(response.json())  # 202: {"sweep_id": "...", "status": "queued", ...}


# ─────────────────────────────────────────────────────────────
# Option 2: Send the rows as JSON
# ─────────────────────────────────────────────────────────────
response = requests.post(
    f"${API_BASE}/cleaners/{CLEANER_ID}/process",
    headers={"X-API-Key": API_KEY},
    json={
        "rows": [
            {"Vendor": "acme corp.", "Country": "usa"},
            {"Vendor": "GLOBEX INC", "Country": "Mexico"}
        ]
    },
)

print(response.json())`;

export const JAVASCRIPT_CLEANERS_CODE = `const API_KEY = "YOUR_API_KEY";
const CLEANER_ID = "YOUR_CLEANER_ID";

// ─────────────────────────────────────────────────────────────
// Option 1: Sweep a spreadsheet (CSV, XLSX or XLS, multipart only)
// Column headers must be on the first row.
// ─────────────────────────────────────────────────────────────
async function sweepFile(file) {
  const formData = new FormData();
  formData.append("cleaner_id", CLEANER_ID);
  formData.append("file", file, "vendors.csv");

  const response = await fetch("${API_BASE}/sweeps/run", {
    method: "POST",
    headers: { "X-API-Key": API_KEY },
    body: formData,
  });

  return await response.json(); // 202: { sweep_id, status: "queued", ... }
}


// ─────────────────────────────────────────────────────────────
// Option 2: Send the rows as JSON
// ─────────────────────────────────────────────────────────────
async function sweepRows(rows) {
  const response = await fetch(\`${API_BASE}/cleaners/\${CLEANER_ID}/process\`, {
    method: "POST",
    headers: {
      "X-API-Key": API_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ rows })
  });

  return await response.json();
}`;

export const PYTHON_SPLITTERS_CODE = `import requests

API_KEY = "YOUR_API_KEY"
SPLITTER_ID = "YOUR_SPLITTER_ID"

# ─────────────────────────────────────────────────────────────
# Option 1: Multipart file upload (binary)
# ─────────────────────────────────────────────────────────────
with open("document.pdf", "rb") as file:
    response = requests.post(
        "${API_BASE}/splits/run",
        headers={"X-API-Key": API_KEY},
        data={
            "splitter_id": SPLITTER_ID,
            "source": "api"
        },
        files={"file": file}
    )

print(response.json())


# ─────────────────────────────────────────────────────────────
# Option 2: Base64-encoded file (JSON body)
# ─────────────────────────────────────────────────────────────
import base64

with open("document.pdf", "rb") as file:
    file_base64 = base64.b64encode(file.read()).decode("utf-8")

response = requests.post(
    "${API_BASE}/splits/run",
    headers={
        "X-API-Key": API_KEY,
        "Content-Type": "application/json"
    },
    json={
        "splitter_id": SPLITTER_ID,
        "source": "api",
        "filename": "document.pdf",
        "file_base64": file_base64
    }
)

print(response.json())`;

export const JAVASCRIPT_SPLITTERS_CODE = `const API_KEY = "YOUR_API_KEY";
const SPLITTER_ID = "YOUR_SPLITTER_ID";

// ─────────────────────────────────────────────────────────────
// Option 1: Multipart file upload (binary)
// ─────────────────────────────────────────────────────────────
async function processSplitter(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("splitter_id", SPLITTER_ID);
  formData.append("source", "api");

  const response = await fetch("${API_BASE}/splits/run", {
    method: "POST",
    headers: { "X-API-Key": API_KEY },
    body: formData,
  });

  return await response.json();
}


// ─────────────────────────────────────────────────────────────
// Option 2: Base64-encoded file (JSON body)
// ─────────────────────────────────────────────────────────────
async function processSplitterBase64(base64Content, filename) {
  const response = await fetch("${API_BASE}/splits/run", {
    method: "POST",
    headers: {
      "X-API-Key": API_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      splitter_id: SPLITTER_ID,
      source: "api",
      filename: filename,
      file_base64: base64Content
    })
  });

  return await response.json();
}`;

export const PYTHON_BUCKETS_CODE = `import requests

API_KEY = "YOUR_API_KEY"
BUCKET_ID = "YOUR_BUCKET_ID"
BUCKET_NAME = "YOUR_BUCKET_NAME"

# ─────────────────────────────────────────────────────────────
# Append rows to existing data (overwrite=False)
# ─────────────────────────────────────────────────────────────
response = requests.post(
    "${API_BASE}/buckets/write",
    headers={
        "X-API-Key": API_KEY,
        "Content-Type": "application/json"
    },
    json={
        "bucket_id": BUCKET_ID,
        "bucket_name": BUCKET_NAME,
        "overwrite": False,
        "rows": [
            {"invoice_number": "INV-1001", "vendor": "Acme Corp", "amount": 1200.50},
            {"invoice_number": "INV-1002", "vendor": "Globex", "amount": 430.00}
        ]
    }
)

print(response.json())


# ─────────────────────────────────────────────────────────────
# Replace all rows (overwrite=True)
# ─────────────────────────────────────────────────────────────
response = requests.post(
    "${API_BASE}/buckets/write",
    headers={
        "X-API-Key": API_KEY,
        "Content-Type": "application/json"
    },
    json={
        "bucket_id": BUCKET_ID,
        "bucket_name": BUCKET_NAME,
        "overwrite": True,
        "rows": [
            {"invoice_number": "INV-3001", "vendor": "NewCo", "amount": 400.00}
        ]
    }
)

print(response.json())`;

export const JAVASCRIPT_BUCKETS_CODE = `const API_KEY = "YOUR_API_KEY";
const BUCKET_ID = "YOUR_BUCKET_ID";
const BUCKET_NAME = "YOUR_BUCKET_NAME";

// ─────────────────────────────────────────────────────────────
// Append rows to existing data (overwrite: false)
// ─────────────────────────────────────────────────────────────
async function appendToBucket(rows) {
  const response = await fetch("${API_BASE}/buckets/write", {
    method: "POST",
    headers: {
      "X-API-Key": API_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      bucket_id: BUCKET_ID,
      bucket_name: BUCKET_NAME,
      overwrite: false,
      rows: rows
    })
  });

  return await response.json();
}


// ─────────────────────────────────────────────────────────────
// Replace all rows (overwrite: true)
// ─────────────────────────────────────────────────────────────
async function overwriteBucket(rows) {
  const response = await fetch("${API_BASE}/buckets/write", {
    method: "POST",
    headers: {
      "X-API-Key": API_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      bucket_id: BUCKET_ID,
      bucket_name: BUCKET_NAME,
      overwrite: true,
      rows: rows
    })
  });

  return await response.json();
}

// Usage
const result = await appendToBucket([
  { invoice_number: "INV-1001", vendor: "Acme Corp", amount: 1200.50 },
  { invoice_number: "INV-1002", vendor: "Globex", amount: 430.00 }
]);

console.log(result);`;

export const COLLECTIONS_JSON_EXAMPLE = `{
  "collection_id": "YOUR_COLLECTION_ID",
  "source": "api",
  "filename": "document.pdf",
  "file_base64": "{{previous_module.base64_content}}"
}`;

export const CLEANERS_JSON_EXAMPLE = `{
  "rows": [
    { "Vendor": "acme corp.", "Country": "usa" },
    { "Vendor": "GLOBEX INC", "Country": "Mexico" }
  ]
}`;

export const SPLITTERS_JSON_EXAMPLE = `{
  "splitter_id": "YOUR_SPLITTER_ID",
  "source": "api",
  "filename": "combined_docs.pdf",
  "file_base64": "{{previous_module.base64_content}}"
}`;

export const BUCKETS_JSON_EXAMPLE = `{
  "bucket_id": "YOUR_BUCKET_ID",
  "bucket_name": "YOUR_BUCKET_NAME",
  "overwrite": false,
  "rows": [
    { "column_one": "value", "column_two": 123 }
  ]
}`;

/* ─── Webhook payloads ─── */

/**
 * Shape of the POST body a flow's webhook receives. Mirrors the delivery
 * payload assembled in the backend: the run's output plus its identifiers,
 * with provenance keys added only when they apply.
 */
export const WEBHOOK_RUN_PAYLOAD = `{
  "run_id": "8f1c2b7e-4d3a-4a91-9c11-2f7b6e0d5a44",
  "flow_id": "3a9d51c0-77b2-4e18-9f6d-0c4a1b8e2d63",
  "rows": [
    {
      "Description": "Software Platform Subscription — January",
      "Quantity": 1,
      "Price": 180.00,
      "Amount": 180.00,
      "Invoice Number": "001",
      "Issued Date": "2026-01-15",
      "Total": 270.30
    }
  ],
  "metadata": {
    "Invoice Number": "001",
    "Billed To": "Acme Ltd",
    "Total": 270.30
  }
}`;

/**
 * Extra keys that appear only when the run reached the flow indirectly.
 * Use them to trace a result back to the document that produced it.
 */
export const WEBHOOK_PROVENANCE_KEYS = `{
  "run_id": "...",
  "flow_id": "...",

  // present when a Collection routed the document
  "collection_run_id": "b21e9f34-8c55-4d70-a6e2-91f0c7d43a18",

  // present when a Splitter produced this segment
  "split_id": "c74a0b12-3e69-4f85-b0d7-58e2a9c61f70",
  "splitter_doc_title": "Commercial Invoice",

  "rows": [],
  "metadata": {}
}`;

/** Minimal receiver that acknowledges fast and processes afterwards. */
export const WEBHOOK_RECEIVER_PYTHON = `from flask import Flask, request, jsonify

app = Flask(__name__)

@app.post("/tavnit-webhook")
def receive():
    payload = request.get_json(silent=True) or {}

    run_id = payload.get("run_id")
    rows = payload.get("rows", [])

    # Acknowledge immediately. Tavnit waits 10 seconds for a response and
    # treats a timeout as a failed delivery, so queue the slow work instead
    # of doing it inline.
    enqueue_processing(run_id, rows)

    return jsonify({"received": True}), 200`;

/** Same contract in Node/Express. */
export const WEBHOOK_RECEIVER_JS = `import express from "express";

const app = express();
app.use(express.json({ limit: "10mb" }));

app.post("/tavnit-webhook", (req, res) => {
  const { run_id: runId, rows = [] } = req.body ?? {};

  // Respond inside the 10-second window, then do the work.
  res.status(200).json({ received: true });

  enqueueProcessing(runId, rows).catch(console.error);
});

app.listen(3000);`;

/* ─── API reference: requests and responses ─── */

/** Submit a document to a flow, then poll the run until it is terminal. */
export const PYTHON_RUN_POLL_CODE = `import time
import requests

API_KEY = "YOUR_API_KEY"
HEADERS = {"X-API-Key": API_KEY}

with open("invoice.pdf", "rb") as f:
    submit = requests.post(
        "${API_BASE}/runs/process",
        headers=HEADERS,
        data={"flow_id": "YOUR_FLOW_ID"},
        files={"file": f},
    )
run_id = submit.json()["run_id"]

while True:
    run = requests.get(f"${API_BASE}/runs/{run_id}", headers=HEADERS).json()
    if run["status"] in ("completed", "failed", "cancelled"):
        break
    time.sleep(5)

print(run["status"], run["data"])`;

export const JAVASCRIPT_RUN_POLL_CODE = `const API_KEY = "YOUR_API_KEY";
const headers = { "X-API-Key": API_KEY };

async function extract(file) {
  const formData = new FormData();
  formData.append("flow_id", "YOUR_FLOW_ID");
  formData.append("file", file);

  const submit = await fetch("${API_BASE}/runs/process", {
    method: "POST",
    headers,
    body: formData,
  });
  const { run_id } = await submit.json();

  while (true) {
    const res = await fetch(\`${API_BASE}/runs/\${run_id}\`, { headers });
    const run = await res.json();
    if (["completed", "failed", "cancelled"].includes(run.status)) return run;
    await new Promise((r) => setTimeout(r, 5000));
  }
}`;

export const RUN_PROCESS_RESPONSE = `{
  "success": true,
  "run_id": "8f1c2b7e-4d3a-4a91-9c11-2f7b6e0d5a44",
  "status": "queued",
  "auto_created_run": true,
  "message": "Run accepted for background processing. Poll the run for status or await the webhook."
}`;

export const RUN_GET_RESPONSE = `{
  "success": true,
  "run_id": "8f1c2b7e-4d3a-4a91-9c11-2f7b6e0d5a44",
  "status": "completed",
  "flow_id": "3a9d51c0-77b2-4e18-9f6d-0c4a1b8e2d63",
  "flow_name": "Supplier Invoices",
  "source": "api",
  "original_filename": "invoice.pdf",
  "mime_type": "application/pdf",
  "byte_size": 182734,
  "pages_detected": 3,
  "pages_processed": 3,
  "created_at": "2026-09-01T14:02:11Z",
  "started_at": "2026-09-01T14:02:13Z",
  "finished_at": "2026-09-01T14:02:41Z",
  "attempt": 1,
  "previous_attempts": [],
  "error_message": null,
  "data": [
    { "Invoice Number": "001", "Vendor": "Acme Corp", "Total": 270.30 }
  ],
  "columns": null
}`;

export const SOURCE_FILE_RESPONSE = `{
  "success": true,
  "kind": "run",
  "run_id": "8f1c2b7e-4d3a-4a91-9c11-2f7b6e0d5a44",
  "original_filename": "invoice.pdf",
  "mime_type": "application/pdf",
  "byte_size": 182734,
  "bucket": "files",
  "path": "<org_id>/<run_id>/invoice.pdf",
  "url": "https://...signed-url...",
  "expires_in": 604800
}`;

export const COLLECTION_PROCESS_RESPONSE = `{
  "success": true,
  "data": {
    "collection_run_id": "b21e9f34-8c55-4d70-a6e2-91f0c7d43a18",
    "status": "queued"
  }
}`;

export const SPLIT_RUN_RESPONSE = `{
  "success": true,
  "split_id": "c74a0b12-3e69-4f85-b0d7-58e2a9c61f70",
  "status": "pending",
  "pages_count": 12,
  "credits_required": 12,
  "message": "Split queued for processing."
}`;

export const SWEEP_RUN_RESPONSE = `{
  "success": true,
  "sweep_id": "5d2e8a61-0b4f-4c3e-9a7d-1f6b2c8e4a90",
  "status": "queued",
  "cleaner_id": "YOUR_CLEANER_ID",
  "cells_count": 1840,
  "credits_required": 4,
  "message": "Sweep queued for processing."
}`;

export const BUCKET_WRITE_RESPONSE = `{
  "success": true,
  "message": "Bucket write queued for background processing.",
  "bucket_id": "YOUR_BUCKET_ID",
  "bucket_name": "Invoices 2026",
  "bucket_write_id": "e3a1c9d2-7f40-4b8e-a5c6-2d9f1b0e7a34",
  "overwrite": false,
  "rows_queued": 2,
  "status": "queued"
}`;

export const BUCKET_READ_REQUEST = `curl "${API_BASE}/buckets/read?bucket_id=YOUR_BUCKET_ID&bucket_name=Invoices%202026&limit=100&offset=0" \\
  -H "X-API-Key: YOUR_API_KEY"`;

export const BUCKET_READ_RESPONSE = `{
  "success": true,
  "bucket_id": "YOUR_BUCKET_ID",
  "bucket_name": "Invoices 2026",
  "columns": [
    { "name": "invoice_number", "display_name": "Invoice #", "data_type": "text" },
    { "name": "amount", "display_name": "Amount", "data_type": "number" }
  ],
  "rows": [
    {
      "id": "0c6f...",
      "row_number": 1,
      "source_type": "api",
      "created_at": "2026-09-01T14:05:00Z",
      "updated_at": "2026-09-01T14:05:00Z",
      "data": { "invoice_number": "INV-1001", "amount": 1200.5 }
    }
  ],
  "total_count": 1234,
  "limit": 100,
  "offset": 0,
  "has_more": true
}`;

export const AGENT_TRIGGER_REQUEST = `curl -X POST "${API_BASE}/bots/YOUR_AGENT_ID/runs" \\
  -H "X-API-Key: YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"inputs": {"invoice_month": "2026-08"}}'

# 202
{ "success": true, "bot_run_id": "a7c3...", "status": "queued" }`;

export const AGENT_RUN_RESPONSE = `{
  "success": true,
  "run": {
    "id": "a7c3...",
    "bot_id": "YOUR_AGENT_ID",
    "status": "completed",
    "source": "api",
    "created_at": "2026-09-01T09:00:00Z",
    "started_at": "2026-09-01T09:00:04Z",
    "finished_at": "2026-09-01T09:03:10Z",
    "duration_seconds": 186,
    "credits_charged": 12,
    "llm_requests": 9,
    "error_message": null,
    "replay_url": "https://...",
    "input": { "invoice_month": "2026-08" },
    "output": { "...": "what the agent captured, file links signed" }
  }
}`;

export const MATCHER_RUN_REQUEST = `curl -X POST "${API_BASE}/matchers/YOUR_MATCHER_ID/run" \\
  -H "X-API-Key: YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"run_ids": ["RUN_A", "RUN_B"], "benchmark_run_id": "RUN_A"}'

# 202
{
  "success": true,
  "match_id": "...",
  "status": "queued",
  "mode": "benchmark",
  "run_ids": ["RUN_A", "RUN_B"],
  "cells_count": 640,
  "credits_required": 4
}`;

export const INSPECTOR_PROCESS_REQUEST = `curl -X POST "${API_BASE}/inspectors/YOUR_INSPECTOR_ID/process" \\
  -H "X-API-Key: YOUR_API_KEY" \\
  -F "file=@bill_of_lading.pdf"

# 202 — send the next files with -F "inspection_id=..."
{
  "success": true,
  "inspection_id": "...",
  "inspection_file_id": "...",
  "status": "queued"
}`;

export const FILLER_REQUEST = `# 1. Open a fill (201)
curl -X POST "${API_BASE}/fillers/YOUR_FILLER_ID/fills" \\
  -H "X-API-Key: YOUR_API_KEY"

# 2. Upload documents and let AI pick the slot (202)
curl -X POST "${API_BASE}/fills/FILL_ID/route-upload" \\
  -H "X-API-Key: YOUR_API_KEY" \\
  -F "file=@passport.jpg"

# 3. Optional: fill now instead of waiting for every slot (202)
curl -X POST "${API_BASE}/fills/FILL_ID/fire" \\
  -H "X-API-Key: YOUR_API_KEY"`;

export const PIPELINE_EXECUTE_REQUEST = `curl -X POST "${API_BASE}/pipelines/YOUR_PIPELINE_ID/execute" \\
  -H "X-API-Key: YOUR_API_KEY" \\
  -F "file=@invoice.pdf"

# 202
{
  "success": true,
  "execution_id": "...",
  "pipeline_id": "YOUR_PIPELINE_ID",
  "status": "running"
}`;

export const SIGNAL_RUN_REQUEST = `curl -X POST "${API_BASE}/signals/YOUR_SIGNAL_ID/run" \\
  -H "X-API-Key: YOUR_API_KEY" \\
  -F "file=@sales_call.mp3"

# 202
{
  "success": true,
  "wave_id": "...",
  "signal_id": "YOUR_SIGNAL_ID",
  "status": "queued",
  "audio_seconds": 754,
  "estimated_max_credits": 13,
  "auto_created_wave": true
}`;

export const CASE_REQUEST = `# Create a case (201)
curl -X POST "${API_BASE}/subjects/YOUR_SUBJECT_ID/cases" \\
  -H "X-API-Key: YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"name": "Shipment 4471", "params": {"customer": "Acme"}}'

# Upload a document straight into that case (202)
curl -X POST "${API_BASE}/cases/CASE_ID/docs" \\
  -H "X-API-Key: YOUR_API_KEY" \\
  -F "file=@invoice.pdf" \\
  -F "doc_type_id=DOC_TYPE_ID"`;

export const CASE_RESPONSE = `{
  "success": true,
  "case": {
    "id": "...",
    "subject_id": "YOUR_SUBJECT_ID",
    "ref": "<minted from the subject's prefix>",
    "seq": 42,
    "name": "Shipment 4471",
    "state": "open",
    "status": "<the subject's default case status>",
    "params": { "customer": "Acme" },
    "created_by": "...",
    "created_at": "2026-09-01T10:00:00Z",
    "updated_at": "2026-09-01T10:00:00Z",
    "closed_at": null,
    "closed_by": null
  }
}`;

export const NET_CATCH_REQUEST = `curl -X POST "${API_BASE}/nets/YOUR_NET_ID/catch" \\
  -H "X-API-Key: YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{}'

# 202
{ "success": true, "catch_id": "...", "net_id": "YOUR_NET_ID", "status": "queued", "window_mode": "since_last" }`;

export const HITL_RUN_APPROVE_REQUEST = `curl -X POST "${API_BASE}/runs/RUN_ID/hitl/approve" \\
  -H "X-API-Key: YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"output_json": {"rows": [{"Invoice Number": "001", "Total": 270.30}]}, "diff": []}'

curl -X POST "${API_BASE}/runs/RUN_ID/hitl/reject" \\
  -H "X-API-Key: YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"reason": "Wrong vendor"}'`;

export const API_ERROR_EXAMPLE = `{
  "success": false,
  "error": "Insufficient credits",
  "credits_required": 12,
  "available_credits": 3
}`;

export const API_KEY_RESPONSE = `{
  "success": true,
  "api_key": "tvnt_...",
  "user_id": "...",
  "org_id": "..."
}`;
