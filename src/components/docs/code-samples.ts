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

api_key = "YOUR_API_KEY"
cleaner_id = "YOUR_CLEANER_ID"

# Option 1: multipart file upload
with open("document.pdf", "rb") as f:
    response = requests.post(
        "${API_BASE}/sweeps/run",
        headers={"X-API-Key": api_key},
        data={"cleaner_id": cleaner_id, "source": "api"},
        files={"file": ("document.pdf", f, "application/pdf")},
    )

# Option 2: base64 string
import base64
with open("document.pdf", "rb") as f:
    encoded = base64.b64encode(f.read()).decode()

response = requests.post(
    "${API_BASE}/sweeps/run",
    headers={"X-API-Key": api_key, "Content-Type": "application/json"},
    json={"cleaner_id": cleaner_id, "source": "api",
          "filename": "document.pdf", "file_base64": encoded},
)

print(response.json())`;

export const JAVASCRIPT_CLEANERS_CODE = `const apiKey = "YOUR_API_KEY";
const cleanerId = "YOUR_CLEANER_ID";

// Option 1: multipart file upload
const formData = new FormData();
formData.append("cleaner_id", cleanerId);
formData.append("source", "api");
formData.append("file", fileBlob, "document.pdf");

const response = await fetch("${API_BASE}/sweeps/run", {
  method: "POST",
  headers: { "X-API-Key": apiKey },
  body: formData,
});

// Option 2: base64 string
const base64Content = btoa(String.fromCharCode(...new Uint8Array(fileBuffer)));
const response2 = await fetch("${API_BASE}/sweeps/run", {
  method: "POST",
  headers: { "X-API-Key": apiKey, "Content-Type": "application/json" },
  body: JSON.stringify({
    cleaner_id: cleanerId, source: "api",
    filename: "document.pdf", file_base64: base64Content,
  }),
});

console.log(await response.json());`;

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
  "cleaner_id": "YOUR_CLEANER_ID",
  "source": "api",
  "filename": "document.pdf",
  "file_base64": "{{previous_module.base64_content}}"
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
