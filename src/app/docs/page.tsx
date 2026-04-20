"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import {
  Layers,
  Mail,
  ArrowLeftRight,
  Webhook,
  Menu,
  X,
  ArrowLeft,
  Home,
  Sparkles,
  FilePlus,
  Table2,
  Clock,
  Upload,
  Paperclip,
  Send,
  ExternalLink,
  Lock,
  Download,
  Code2,
  Star,
  Zap,
  CircleDot,
  Settings2,
  CheckCircle2,
  Info,
  AlertTriangle,
  Copy,
  Check,
  FolderInput,
  Wand2,
  Split,
  Database,
  Workflow,
  Shield,
  Eye,
  BarChart3,
  FileDown,
  FileUp,
  Users,
  UserCog,
  Fingerprint,
  ArrowRight,
  CheckCircle,
  XCircle,
} from "lucide-react";

const Squares = dynamic(() => import("@/components/Squares"), { ssr: false });

type SectionId = "getting-started" | "collections" | "cleaners" | "splitters" | "buckets" | "pipeline-map" | "email-integration" | "api-integration" | "webhooks" | "user-roles";
type ApiTab = "code" | "no-code";
type Lang = "python" | "javascript";

const API_BASE = "https://run.tavnit.io/api";

const PYTHON_CODE = `import requests

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

const JAVASCRIPT_CODE = `const API_KEY = "YOUR_API_KEY";
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

const JSON_BODY_EXAMPLE = `{
  "flow_id": "YOUR_FLOW_ID",
  "source": "api",
  "filename": "document.pdf",
  "file_base64": "{{previous_module.base64_content}}"
}`;

const PYTHON_COLLECTIONS_CODE = `import requests

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

const JAVASCRIPT_COLLECTIONS_CODE = `const API_KEY = "YOUR_API_KEY";
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

const PYTHON_CLEANERS_CODE = `import requests

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

const JAVASCRIPT_CLEANERS_CODE = `const apiKey = "YOUR_API_KEY";
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

const PYTHON_SPLITTERS_CODE = `import requests

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

const JAVASCRIPT_SPLITTERS_CODE = `const API_KEY = "YOUR_API_KEY";
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

const PYTHON_BUCKETS_CODE = `import requests

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

const JAVASCRIPT_BUCKETS_CODE = `const API_KEY = "YOUR_API_KEY";
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

const COLLECTIONS_JSON_EXAMPLE = `{
  "collection_id": "YOUR_COLLECTION_ID",
  "source": "api",
  "filename": "document.pdf",
  "file_base64": "{{previous_module.base64_content}}"
}`;

const CLEANERS_JSON_EXAMPLE = `{
  "cleaner_id": "YOUR_CLEANER_ID",
  "source": "api",
  "filename": "document.pdf",
  "file_base64": "{{previous_module.base64_content}}"
}`;

const SPLITTERS_JSON_EXAMPLE = `{
  "splitter_id": "YOUR_SPLITTER_ID",
  "source": "api",
  "filename": "combined_docs.pdf",
  "file_base64": "{{previous_module.base64_content}}"
}`;

const BUCKETS_JSON_EXAMPLE = `{
  "bucket_id": "YOUR_BUCKET_ID",
  "bucket_name": "YOUR_BUCKET_NAME",
  "overwrite": false,
  "rows": [
    { "column_one": "value", "column_two": 123 }
  ]
}`;

/* ─── Reusable sub-components ─── */

function InfoBox({
  color,
  icon,
  title,
  children,
}: {
  color: "purple" | "violet" | "green" | "blue" | "yellow";
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  const styles: Record<string, string> = {
    purple: "border-[#667eea] bg-[#667eea]/10",
    violet: "border-[#764ba2] bg-[#764ba2]/10",
    green: "border-emerald-500 bg-emerald-500/10",
    blue: "border-blue-500 bg-blue-500/10",
    yellow: "border-yellow-500 bg-yellow-500/10",
  };
  return (
    <div className={`flex gap-4 p-4 rounded-lg border-l-4 ${styles[color]} my-4`}>
      <div className="flex-shrink-0 mt-0.5 opacity-80">{icon}</div>
      <div>
        <strong className="text-gray-100 block mb-1">{title}</strong>
        <p className="text-gray-400 text-sm leading-relaxed">{children}</p>
      </div>
    </div>
  );
}

function WarningBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 p-4 rounded-lg border-l-4 border-yellow-500 bg-yellow-500/10 my-4">
      <AlertTriangle size={20} className="flex-shrink-0 mt-0.5 text-yellow-500" />
      <p className="text-gray-300 text-sm leading-relaxed">{children}</p>
    </div>
  );
}

function DocCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm rounded-xl p-6 md:p-8 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-[#667eea]">{icon}</span>
        <h2 className="text-xl font-bold text-gray-100">{title}</h2>
      </div>
      <div className="text-gray-300 leading-relaxed space-y-3 text-[15px]">{children}</div>
    </div>
  );
}

function NumberedList({ items }: { items: React.ReactNode[] }) {
  return (
    <ol className="space-y-3 my-4">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-xs font-bold text-white">
            {i + 1}
          </span>
          <span className="text-gray-300 text-[15px] leading-relaxed pt-0.5">{item}</span>
        </li>
      ))}
    </ol>
  );
}

function BulletList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-2 my-3 ml-1">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-gray-300 text-[15px]">
          <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#667eea] mt-2" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function CodeBlock({ lang, code }: { lang: string; code: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg overflow-hidden my-4 border border-white/[0.08]">
      <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.06] border-b border-white/[0.08]">
        <span className="text-sm font-medium text-gray-400">{lang}</span>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors px-2.5 py-1 rounded hover:bg-white/10"
        >
          {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto bg-black/40 text-[13px] leading-relaxed">
        <code className="text-gray-300 font-mono">{code}</code>
      </pre>
    </div>
  );
}

function InlineCode({ children }: { children: string }) {
  return (
    <code className="px-2.5 py-1 bg-black/40 border border-white/[0.08] rounded text-[#667eea] text-sm font-mono">
      {children}
    </code>
  );
}

function PermissionRow({ label, owner, admin, member, note }: { label: string; owner: boolean; admin: boolean; member: boolean; note?: string }) {
  const cell = (allowed: boolean) => (
    <div className="w-16 flex justify-center">
      {allowed ? <CheckCircle size={16} className="text-emerald-400" /> : <XCircle size={16} className="text-gray-600" />}
    </div>
  );
  return (
    <div className="flex items-center py-2 border-b border-white/[0.04]">
      <div className="flex-1">
        <span className="text-gray-300 text-sm">{label}</span>
        {note && <span className="text-gray-500 text-xs block italic">{note}</span>}
      </div>
      {cell(owner)}
      {cell(admin)}
      {cell(member)}
    </div>
  );
}

function PermissionGroupHeader({ label }: { label: string }) {
  return (
    <div className="pt-4 pb-1">
      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{label}</span>
    </div>
  );
}

function RoleBadge({ label, color, icon, subtitle }: { label: string; color: string; icon: React.ReactNode; subtitle: string }) {
  return (
    <div className={`flex flex-col items-center p-4 rounded-xl border ${color} text-center`}>
      <div className="mb-2">{icon}</div>
      <span className="text-sm font-bold text-gray-100">{label}</span>
      <span className="text-xs text-gray-400 mt-1">{subtitle}</span>
    </div>
  );
}

/* ─── Main page ─── */

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState<SectionId>("getting-started");
  const [apiTab, setApiTab] = useState<ApiTab>("code");
  const [lang, setLang] = useState<Lang>("python");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useCallback(
    (section: SectionId) => {
      setActiveSection(section);
      if (section === "api-integration") {
        // keep current apiTab
      }
      setSidebarOpen(false);
      window.history.pushState(null, "", `#${section}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    []
  );

  const navigateApiSub = useCallback((tab: ApiTab) => {
    setActiveSection("api-integration");
    setApiTab(tab);
    setSidebarOpen(false);
    window.history.pushState(null, "", `#api-${tab}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const allSections: SectionId[] = ["getting-started", "collections", "cleaners", "splitters", "buckets", "pipeline-map", "email-integration", "api-integration", "webhooks", "user-roles"];

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash === "api-code") {
      setActiveSection("api-integration");
      setApiTab("code");
    } else if (hash === "api-no-code") {
      setActiveSection("api-integration");
      setApiTab("no-code");
    } else if (allSections.includes(hash as SectionId)) {
      setActiveSection(hash as SectionId);
    }

    const onPop = () => {
      const h = window.location.hash.replace("#", "");
      if (h === "api-code") {
        setActiveSection("api-integration");
        setApiTab("code");
      } else if (h === "api-no-code") {
        setActiveSection("api-integration");
        setApiTab("no-code");
      } else if (allSections.includes(h as SectionId)) {
        setActiveSection(h as SectionId);
      }
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Close sidebar on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Prevent body scroll when sidebar open on mobile
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  const sidebarItems: { id: SectionId; label: string; icon: React.ReactNode; subItems?: { id: ApiTab; label: string }[] }[] = [
    { id: "getting-started", label: "Getting Started", icon: <Layers size={20} /> },
    { id: "collections", label: "Collections", icon: <FolderInput size={20} /> },
    { id: "cleaners", label: "Cleaners", icon: <Wand2 size={20} /> },
    { id: "splitters", label: "Splitters", icon: <Split size={20} /> },
    { id: "buckets", label: "Buckets", icon: <Database size={20} /> },
    { id: "pipeline-map", label: "Pipeline Map", icon: <Workflow size={20} /> },
    { id: "email-integration", label: "Email Integration", icon: <Mail size={20} /> },
    {
      id: "api-integration",
      label: "API Integration",
      icon: <ArrowLeftRight size={20} />,
      subItems: [
        { id: "code", label: "Code" },
        { id: "no-code", label: "No-Code" },
      ],
    },
    { id: "webhooks", label: "Webhooks", icon: <Webhook size={20} /> },
    { id: "user-roles", label: "User Roles", icon: <Shield size={20} /> },
  ];

  return (
    <div className="min-h-screen text-gray-100">
      {/* Fixed Squares background */}
      <div className="fixed inset-0 z-0 bg-[#0a0a1a]">
        <Squares direction="diagonal" speed={0.17} borderColor="#271E37" squareSize={45} hoverFillColor="#222" />
      </div>

      {/* ─── Header ─── */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#0a0a1a]/80 backdrop-blur-xl border-b border-white/10">
        <div className="h-full flex items-center">
          {/* Left section: sits above sidebar (280px on desktop) */}
          <div className="lg:w-[280px] flex items-center gap-3 px-4 lg:px-5 lg:border-r lg:border-white/10 h-full flex-shrink-0">
            {/* Hamburger (mobile only) */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-300"
              aria-label="Toggle menu"
            >
              {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            {/* Back arrow (desktop only) */}
            <Link
              href="/"
              className="hidden lg:flex items-center p-1.5 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
            >
              <ArrowLeft size={18} />
            </Link>
            {/* Logo + Docs badge */}
            <Link href="/" className="flex items-center gap-2 hover:opacity-85 transition-opacity">
              <Image src="/assets/tavnit_logo.png" alt="Tavnit" width={120} height={60} className="h-10 w-auto brightness-200" priority />
              <span className="text-sm font-semibold text-[#667eea] bg-[#667eea]/10 px-2.5 py-0.5 rounded-md">
                Docs
              </span>
            </Link>
          </div>

          {/* Right section: fills remaining space */}
          <div className="flex-1 flex items-center justify-end px-4 md:px-6">
            {/* Home icon (mobile only) */}
            <Link
              href="/"
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-300"
              aria-label="Go home"
            >
              <Home size={20} />
            </Link>
          </div>
        </div>
      </header>

      {/* ─── Sidebar overlay (mobile) ─── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ─── Sidebar ─── */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 w-[280px] bg-[#0a0a1a]/95 backdrop-blur-xl border-r border-white/10 overflow-y-auto transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="p-5">
          <div className="flex items-center justify-between mb-5">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Contents</span>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 rounded hover:bg-white/10 text-gray-500"
              aria-label="Close menu"
            >
              <X size={16} />
            </button>
          </div>
          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <div key={item.id}>
                <button
                  onClick={() => navigate(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    activeSection === item.id
                      ? "bg-[#667eea]/10 text-white border-l-2 border-[#667eea] -ml-[1px]"
                      : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
                {item.subItems && (
                  <div className="ml-10 mt-1 space-y-0.5">
                    {item.subItems.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => navigateApiSub(sub.id)}
                        className={`block w-full text-left px-3 py-1.5 rounded text-sm transition-colors ${
                          activeSection === "api-integration" && apiTab === sub.id
                            ? "text-[#667eea] font-medium"
                            : "text-gray-500 hover:text-gray-300"
                        }`}
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {/* ─── Main content ─── */}
      <main className="relative z-10 pt-16 lg:pl-[280px]">
        <div className="max-w-[900px] mx-auto px-4 md:px-8 py-8 md:py-12">
          {/* ═══════════ GETTING STARTED ═══════════ */}
          {activeSection === "getting-started" && (
            <section>
              <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Getting Started
              </h1>

              <DocCard icon={<Sparkles size={24} />} title="Welcome to Tavnit">
                <p>
                  Tavnit helps you automatically extract data from documents like invoices, receipts, and forms.
                  Instead of manually typing information from each document, Tavnit reads them for you and organizes
                  the data in a structured way.
                </p>
                <p>This guide will walk you through the core features. Use the sidebar to jump to any topic.</p>
                <InfoBox color="purple" icon={<Layers size={20} />} title="Flows">
                  Templates that tell Tavnit what to extract from a document. Each flow has fields (e.g., Invoice Number, Date, Line Items).
                </InfoBox>
                <InfoBox color="violet" icon={<FolderInput size={20} />} title="Collections">
                  Smart routing containers — send mixed document types to one endpoint and Tavnit routes each to the right flow automatically.
                </InfoBox>
                <InfoBox color="blue" icon={<Database size={20} />} title="Buckets">
                  Structured spreadsheet-like storage for extracted data. Flows can write their results directly into a bucket.
                </InfoBox>
                <InfoBox color="green" icon={<Wand2 size={20} />} title="Cleaners">
                  AI-powered enrichment tools that re-process and normalise data fields using custom rules and extraction hints.
                </InfoBox>
                <InfoBox color="yellow" icon={<Split size={20} />} title="Splitters">
                  Identify and separate different document types from a mixed batch, routing each page group to the correct flow.
                </InfoBox>
              </DocCard>

              <DocCard icon={<FilePlus size={24} />} title="Step 1: Create a Flow">
                <p>
                  A &ldquo;flow&rdquo; is like a template that tells Tavnit what information to look for in your
                  documents. For example, an invoice flow might look for invoice numbers, dates, and line items.
                </p>
                <NumberedList
                  items={[
                    'Click the "New Flow" button on the Flows page',
                    'Enter a name for your flow (e.g., "Invoice Processing")',
                    "Select the type of document you'll be processing",
                    "Review and customize the fields Tavnit discovered",
                    'Click "Activate" to make your flow ready to use',
                  ]}
                />
              </DocCard>

              <DocCard icon={<Table2 size={24} />} title="Step 2: Understanding Fields">
                <p>
                  When you upload sample documents, Tavnit uses AI to discover what information can be extracted.
                  There are two types of fields:
                </p>
                <InfoBox color="purple" icon={<Info size={20} />} title="Metadata Fields">
                  Single values that appear once per document, like invoice number, date, or vendor name.
                </InfoBox>
                <InfoBox color="violet" icon={<Table2 size={20} />} title="Table Fields">
                  Repeating data like line items on an invoice, each with columns like description, quantity, and
                  price.
                </InfoBox>
                <p>You can add, remove, or rename fields to match exactly what you need.</p>
              </DocCard>

              <DocCard icon={<Clock size={24} />} title="Step 3: Process Documents">
                <p>Once your flow is active, you can process documents in several ways:</p>
                <InfoBox color="green" icon={<Upload size={20} />} title="Manual Upload">
                  Go to the Runs page, select your flow, and upload documents directly through the web interface.
                </InfoBox>
                <InfoBox color="violet" icon={<Mail size={20} />} title="Email Integration">
                  Send documents as email attachments to your flow&apos;s unique email address. See the Email
                  Integration tab for details.
                </InfoBox>
                <InfoBox color="blue" icon={<ArrowLeftRight size={20} />} title="API Integration">
                  Send documents programmatically from your own applications or automation tools. See the API
                  Integration tab for details.
                </InfoBox>
                <p>
                  After processing, you&apos;ll see the extracted data on the run details page. You can also export
                  results or receive them via webhook.
                </p>
              </DocCard>
            </section>
          )}

          {/* ═══════════ COLLECTIONS ═══════════ */}
          {activeSection === "collections" && (
            <section>
              <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Collections
              </h1>

              <DocCard icon={<FolderInput size={24} />} title="What are Collections?">
                <p>
                  Collections are AI-powered document routing containers that group multiple flows together.
                  When you send a document to a collection, Tavnit automatically analyzes it and routes it to the most appropriate flow.
                </p>
                <p>
                  Think of a collection as a smart mailbox that knows how to sort your documents automatically.
                </p>
                <InfoBox color="purple" icon={<Sparkles size={20} />} title="How it works">
                  Tavnit uses AI vision to analyze the first page of your document, comparing it with the names and descriptions
                  of the flows in your collection. It then routes the document to the best matching flow for extraction.
                </InfoBox>
              </DocCard>

              <DocCard icon={<Info size={24} />} title="When to Use Collections">
                <p>Collections are ideal when you receive different types of documents from the same source:</p>
                <BulletList
                  items={[
                    "A vendor portal that sends invoices, purchase orders, and receipts",
                    "An email inbox receiving various document types",
                    "An API integration where document types vary",
                    "Any situation where you don't know which flow to use upfront",
                  ]}
                />
                <InfoBox color="blue" icon={<ArrowLeftRight size={20} />} title="Collections vs Direct Flows">
                  Use a direct flow when you know exactly what type of document you&apos;re processing.
                  Use a collection when documents vary and need intelligent routing.
                </InfoBox>
              </DocCard>

              <DocCard icon={<FilePlus size={24} />} title="Creating a Collection">
                <p>Follow these steps to create your first collection:</p>
                <NumberedList
                  items={[
                    'Go to the Collections page from the main navigation',
                    'Click "New Collection" and give it a descriptive name',
                    "Add the flows you want to include in the collection",
                    "Optionally set a default flow for unmatched documents",
                    "Save and activate your collection",
                  ]}
                />
                <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="Tip: Use descriptive flow names">
                  The AI uses flow names and descriptions to make routing decisions. Clear names like &ldquo;Acme Corp Invoices&rdquo;
                  or &ldquo;Shipping Receipts&rdquo; help the AI route documents more accurately.
                </InfoBox>
              </DocCard>

              <DocCard icon={<Workflow size={24} />} title="How Routing Works">
                <p>When a document is submitted to a collection, here&apos;s what happens:</p>
                <NumberedList
                  items={[
                    "Tavnit extracts the first page of your document",
                    "AI vision analyzes headers, logos, layout, and key text",
                    "The document is compared with each flow's name and description",
                    "The best matching flow is selected for extraction",
                  ]}
                />
                <InfoBox color="violet" icon={<Info size={20} />} title="Default Flow">
                  If the AI can&apos;t find a clear match, it will use your default flow (if configured).
                  If no default flow is set, the document processing will be cancelled.
                </InfoBox>
                <InfoBox color="green" icon={<CheckCircle2 size={20} />} title="Routing Confidence">
                  Each routing decision includes a confidence score and explanation.
                  You can review these in the collection runs to understand why documents were routed to specific flows.
                </InfoBox>
              </DocCard>

              <DocCard icon={<Mail size={24} />} title="Email Trigger for Collections">
                <p>Just like flows, collections can receive documents via email:</p>
                <NumberedList
                  items={[
                    "Open your collection's settings",
                    'Enable the "Email Trigger" option',
                    "Copy the collection's unique email address",
                    "Forward or send documents to that address",
                  ]}
                />
                <p>
                  Documents sent to the collection email will be automatically analyzed and routed to the appropriate flow.
                </p>
              </DocCard>

              <DocCard icon={<Eye size={24} />} title="Viewing Collection Results">
                <p>Track your collection&apos;s activity from the collection details page:</p>
                <InfoBox color="purple" icon={<Layers size={20} />} title="Collection Runs">
                  View all documents processed through the collection, including which flow each was routed to,
                  the AI&apos;s routing confidence, and the reasoning behind each decision.
                </InfoBox>
                <InfoBox color="violet" icon={<Code2 size={20} />} title="Flow Run Results">
                  Click on any collection run to see the resulting flow run and extracted data.
                  The extraction results are the same as if you had sent the document directly to that flow.
                </InfoBox>
              </DocCard>
            </section>
          )}

          {/* ═══════════ CLEANERS ═══════════ */}
          {activeSection === "cleaners" && (
            <section>
              <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Cleaners
              </h1>

              <DocCard icon={<Wand2 size={24} />} title="What are Cleaners?">
                <p>
                  Cleaners are AI-powered enrichment configurations that re-process and normalise specific
                  fields in your extracted data. Where a flow extracts raw values from a document, a cleaner
                  applies rules, validation, and AI reasoning to clean or enrich those values.
                </p>
                <InfoBox color="purple" icon={<ArrowLeftRight size={20} />} title="Flows vs Cleaners">
                  A flow extracts data from a document. A cleaner takes that data and cleans or enriches it —
                  for example normalising date formats, correcting misspellings, or classifying values into categories.
                </InfoBox>
              </DocCard>

              <DocCard icon={<Table2 size={24} />} title="Cleaner Fields">
                <p>Each cleaner defines one or more fields to process. For every field you can configure:</p>
                <BulletList
                  items={[
                    "Extraction hints — examples and patterns that guide the AI",
                    "Allowed values — restrict output to a fixed list of options",
                    "Sub-fields — break a field into nested child fields",
                    "Regex patterns — validate or transform the extracted value",
                  ]}
                />
                <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="Tip: Be specific with hints">
                  The more examples you provide in the extraction hints, the more accurately the AI will clean your data.
                  Include edge cases and common variations.
                </InfoBox>
              </DocCard>

              <DocCard icon={<FilePlus size={24} />} title="Creating a Cleaner">
                <p>Use the multi-step creation wizard to set up a cleaner:</p>
                <NumberedList
                  items={[
                    'Go to Cleaners in the main navigation and click "New Cleaner"',
                    "Give your cleaner a descriptive name",
                    "Upload sample documents — the AI will discover candidate fields",
                    "Review and customise the discovered fields, adding hints and constraints",
                    "Link the cleaner to one or more flows (optional)",
                    "Save and activate",
                  ]}
                />
              </DocCard>

              <DocCard icon={<Clock size={24} />} title="Running a Sweep">
                <p>
                  A &ldquo;sweep&rdquo; is one execution of a cleaner against a batch of documents or extracted data.
                  You can trigger sweeps manually or link them to flow runs so they fire automatically.
                </p>
                <InfoBox color="green" icon={<Upload size={20} />} title="Manual sweep">
                  Open the cleaner&apos;s detail page, click &ldquo;Run Sweep&rdquo;, and select the data to process.
                </InfoBox>
                <InfoBox color="blue" icon={<ArrowLeftRight size={20} />} title="Linked to a flow">
                  When a cleaner is linked to a flow, it can be set to run automatically after each extraction run completes.
                </InfoBox>
              </DocCard>

              <DocCard icon={<BarChart3 size={24} />} title="Viewing Sweep Results">
                <p>After a sweep completes, open it from the Sweeps history on the cleaner&apos;s page to see:</p>
                <BulletList
                  items={[
                    "Per-field cleaned values and confidence scores",
                    "Number of records processed and any failures",
                    "Credit usage for the sweep",
                    "A comparison of input vs output values",
                  ]}
                />
              </DocCard>
            </section>
          )}

          {/* ═══════════ SPLITTERS ═══════════ */}
          {activeSection === "splitters" && (
            <section>
              <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Splitters
              </h1>

              <DocCard icon={<Split size={24} />} title="What are Splitters?">
                <p>
                  Splitters identify and separate different document types from a mixed batch.
                  When you receive a PDF with multiple document types merged together — for example an invoice
                  followed by a delivery note — a splitter finds the boundary between them and routes each section
                  to the correct flow for extraction.
                </p>
                <InfoBox color="purple" icon={<ArrowLeftRight size={20} />} title="Splitters vs Collections">
                  A collection routes whole documents to the right flow. A splitter works at the page level,
                  separating a single mixed-content file into distinct segments first.
                </InfoBox>
              </DocCard>

              <DocCard icon={<Info size={24} />} title="When to Use Splitters">
                <p>Splitters are ideal when:</p>
                <BulletList
                  items={[
                    "You receive multi-document PDFs from scanners or email systems",
                    "A vendor sends a single file containing invoices, packing slips, and receipts",
                    "Archive batches need to be broken into individual documents for processing",
                    "You need page-level classification before extraction",
                  ]}
                />
              </DocCard>

              <DocCard icon={<FilePlus size={24} />} title="Creating a Splitter">
                <p>Follow these steps to create a splitter:</p>
                <NumberedList
                  items={[
                    'Go to Splitters in the main navigation and click "New Splitter"',
                    "Give the splitter a descriptive name",
                    "Upload sample documents that show each document type",
                    "Configure identification rules for each document type",
                    "Map each document type to a target flow",
                    "Save and activate",
                  ]}
                />
              </DocCard>

              <DocCard icon={<Clock size={24} />} title="Running a Split">
                <p>Once your splitter is configured, you can run it against a mixed-content file:</p>
                <NumberedList
                  items={[
                    "Open the splitter's detail page",
                    'Click "Run Split" and upload the mixed PDF',
                    "Tavnit analyses each page and groups them by document type",
                    "Each group is sent to its mapped flow for extraction",
                  ]}
                />
                <InfoBox color="blue" icon={<Code2 size={20} />} title="API trigger">
                  Splits can also be triggered via the API — see the API Integration tab for endpoint details.
                </InfoBox>
              </DocCard>

              <DocCard icon={<BarChart3 size={24} />} title="Viewing Split Results">
                <p>Open a completed split from the Splits history on the splitter&apos;s page to see:</p>
                <BulletList
                  items={[
                    "How many page groups were identified",
                    "Which flow each group was routed to",
                    "Extraction run results for each group",
                    "Any pages that could not be classified",
                  ]}
                />
              </DocCard>
            </section>
          )}

          {/* ═══════════ BUCKETS ═══════════ */}
          {activeSection === "buckets" && (
            <section>
              <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Buckets
              </h1>

              <DocCard icon={<Database size={24} />} title="What are Buckets?">
                <p>
                  Buckets are structured data tables that collect and organize information.
                  They can receive data automatically from your flows or be populated programmatically via the API.
                </p>
                <p>
                  Think of a bucket as a spreadsheet with defined columns. Each row of data must match
                  the bucket&apos;s column structure, ensuring consistency across all entries.
                </p>
                <InfoBox color="purple" icon={<Workflow size={20} />} title="Flows + Buckets">
                  You can link flows to buckets so that extracted data is automatically written into the bucket
                  after each document is processed. This lets you aggregate results from multiple runs into one place.
                </InfoBox>
              </DocCard>

              <DocCard icon={<Info size={24} />} title="When to Use Buckets">
                <p>Buckets are ideal for:</p>
                <BulletList
                  items={[
                    "Aggregating extraction results from multiple flow runs into a single table",
                    "Building datasets that combine document data with external sources",
                    "Syncing data from external systems via the API",
                    "Creating a central data store that multiple flows write into",
                  ]}
                />
                <InfoBox color="blue" icon={<ArrowLeftRight size={20} />} title="Buckets vs Flow Runs">
                  Flow runs store individual document results. Buckets aggregate data across runs
                  and external sources into a unified table you can export or query.
                </InfoBox>
              </DocCard>

              <DocCard icon={<FilePlus size={24} />} title="Creating a Bucket">
                <p>Follow these steps to create a bucket:</p>
                <NumberedList
                  items={[
                    'Go to the Buckets page from the main navigation',
                    'Click "New Bucket" and give it a name',
                    "Define the columns (name and data type for each)",
                    "Optionally link flows that should write data into this bucket",
                    "Save your bucket",
                  ]}
                />
                <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="Column names matter">
                  When using the API, every row you send must have exactly the same column names as your bucket.
                  Choose clear, consistent names upfront.
                </InfoBox>
              </DocCard>

              <DocCard icon={<Fingerprint size={24} />} title="Finding Your Bucket ID & Name">
                <p>To use the Buckets API, you need your bucket&apos;s ID and name. Both are available in the bucket info dialog:</p>
                <NumberedList
                  items={[
                    "Go to the Buckets page",
                    "Tap the info icon on the bucket you want to use",
                    "Copy the Bucket ID and Bucket Name (both are copyable with a single tap)",
                  ]}
                />
                <InfoBox color="green" icon={<Shield size={20} />} title="Safety check">
                  The API requires both bucket_id and bucket_name to prevent accidental writes to the wrong bucket.
                  If the name doesn&apos;t match the ID, the request is rejected.
                </InfoBox>
              </DocCard>

              <DocCard icon={<Lock size={24} />} title="Access Control">
                <p>
                  Every bucket has a visibility setting and supports per-member access grants,
                  so you can control exactly who can see or edit your data.
                </p>
                <InfoBox color="blue" icon={<Users size={20} />} title="Org-wide (default)">
                  All members of your organisation can view the bucket. Admins and owners can always edit it.
                </InfoBox>
                <InfoBox color="yellow" icon={<Lock size={20} />} title="Private">
                  Only users who have been explicitly granted access can see or edit this bucket.
                  Only admins and owners can make a bucket private.
                </InfoBox>
                <p>Member-level grants (for private buckets or fine-grained control):</p>
                <BulletList
                  items={[
                    "View — can open the bucket and read its data",
                    "Edit — can add, update, and delete rows",
                    "Admin — can change columns, visibility, and manage other members' access",
                  ]}
                />
              </DocCard>

              <DocCard icon={<BarChart3 size={24} />} title="Charts">
                <p>
                  You can create charts directly from bucket data to visualise trends and aggregations
                  without exporting to another tool.
                </p>
                <InfoBox color="purple" icon={<BarChart3 size={20} />} title="Supported chart types">
                  Bar, Line, Pie, and Scatter charts are available. Each chart is saved with the bucket
                  and visible to anyone who can access it.
                </InfoBox>
                <p>Creating a chart:</p>
                <NumberedList
                  items={[
                    "Open the bucket's detail page",
                    'Click "Add Chart" in the charts section',
                    "Choose chart type and select x-axis and y-axis fields",
                    "For bar and line charts, choose an aggregation (sum, average, count)",
                    "Save — the chart appears immediately and updates with new data",
                  ]}
                />
              </DocCard>

              <DocCard icon={<FileDown size={24} />} title="CSV Import & Export">
                <p>Buckets support importing data from CSV files and exporting all rows to CSV.</p>
                <InfoBox color="green" icon={<FileUp size={20} />} title="Import from CSV">
                  Upload a CSV file and Tavnit will map its columns to your bucket&apos;s columns.
                  Column names in the CSV must match the bucket&apos;s column names exactly.
                </InfoBox>
                <InfoBox color="blue" icon={<FileDown size={20} />} title="Export to CSV">
                  Download all current rows as a CSV file from the bucket&apos;s detail page.
                  Useful for sending data to other tools or creating offline backups.
                </InfoBox>
                <p>Both import and export are available from the toolbar at the top of the bucket&apos;s data table.</p>
              </DocCard>
            </section>
          )}

          {/* ═══════════ PIPELINE MAP ═══════════ */}
          {activeSection === "pipeline-map" && (
            <section>
              <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Pipeline Map
              </h1>

              <DocCard icon={<Workflow size={24} />} title="What is the Pipeline Map?">
                <p>
                  The Pipeline Map is a visual graph that shows your entire data pipeline at a glance.
                  It displays all of your flows, cleaners, and buckets as nodes, with lines showing how
                  data flows between them.
                </p>
                <InfoBox color="purple" icon={<ExternalLink size={20} />} title="How to open it">
                  Click the pipeline icon in the main sidebar. The map slides in as an overlay panel
                  so you can keep your current screen in view.
                </InfoBox>
              </DocCard>

              <DocCard icon={<Layers size={24} />} title="Reading the Map">
                <p>Each node type is colour-coded:</p>
                <InfoBox color="purple" icon={<Layers size={20} />} title="Flows">
                  The starting point of your pipeline. Each flow receives documents and extracts data.
                </InfoBox>
                <InfoBox color="green" icon={<Wand2 size={20} />} title="Cleaners">
                  Connected to flows they post-process. Lines show which flows feed into each cleaner.
                </InfoBox>
                <InfoBox color="blue" icon={<Database size={20} />} title="Buckets">
                  Destination storage nodes. Lines show which flows write their results into each bucket.
                </InfoBox>
                <p>Clicking any node opens its detail page so you can inspect or edit it.</p>
              </DocCard>

              <DocCard icon={<Info size={24} />} title="Why Use the Pipeline Map?">
                <p>
                  As your organisation grows, keeping track of which flows connect to which cleaners and
                  buckets becomes complex. The Pipeline Map gives you:
                </p>
                <BulletList
                  items={[
                    "A single view of your entire data architecture",
                    "Quick identification of orphaned flows (not connected to any bucket or cleaner)",
                    "Easy navigation — click any node to jump directly to its detail page",
                    "A live snapshot of run statistics on each node",
                  ]}
                />
              </DocCard>
            </section>
          )}

          {/* ═══════════ EMAIL INTEGRATION ═══════════ */}
          {activeSection === "email-integration" && (
            <section>
              <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Email Integration
              </h1>

              <DocCard icon={<Mail size={24} />} title="Process Documents via Email">
                <p>
                  Tavnit allows you to process documents simply by sending them as email attachments. Each flow has a
                  unique email address that you can send documents to.
                </p>
                <p>This is perfect for:</p>
                <BulletList
                  items={[
                    "Forwarding invoices or receipts from your inbox",
                    "Setting up email forwarding rules for automatic processing",
                    "Processing documents without logging into Tavnit",
                  ]}
                />
              </DocCard>

              <DocCard icon={<ExternalLink size={24} />} title="Enable Email Trigger">
                <p>
                  To start receiving documents via email, you need to enable the Email Trigger for your flow:
                </p>
                <NumberedList
                  items={[
                    "Go to the Flows page and select your flow",
                    "Open the flow's details page",
                    'Find the "Email Trigger" section and enable it',
                    "Copy your flow's unique email address",
                  ]}
                />
                <InfoBox color="blue" icon={<Info size={20} />} title="One Run Per Attachment">
                  When you send an email with multiple attachments, Tavnit creates a separate run for each PDF or
                  image file. This means if you attach 3 invoices, you&apos;ll get 3 separate extraction results.
                </InfoBox>
              </DocCard>

              <DocCard icon={<Paperclip size={24} />} title="Supported File Types">
                <p>The Email Trigger accepts the following file types as attachments:</p>
                <BulletList items={["PDF documents (.pdf)", "Images (.jpg, .jpeg, .png)"]} />
                <p>
                  Other file types will be ignored. The email subject and body are not processed – only the
                  attachments.
                </p>
              </DocCard>

              <DocCard icon={<Send size={24} />} title="Email Output">
                <p>
                  You can also configure Tavnit to send extraction results to an email address automatically. This is
                  useful when you want to receive the extracted data without checking the Tavnit dashboard.
                </p>
                <NumberedList
                  items={[
                    "Go to your flow's details page",
                    'Find the "Email Output" section',
                    "Enter the email address where you want to receive results",
                    "Save your changes",
                  ]}
                />
                <InfoBox color="purple" icon={<Code2 size={20} />} title="JSON Format">
                  The extraction results are sent as JSON data in the email body. You can use this with email
                  automation tools to parse and process the data further.
                </InfoBox>
              </DocCard>
            </section>
          )}

          {/* ═══════════ API INTEGRATION ═══════════ */}
          {activeSection === "api-integration" && (
            <section>
              <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                API Integration
              </h1>

              {/* Sub-tabs */}
              <div className="flex gap-1 p-1 bg-white/[0.04] rounded-lg w-fit mb-8 border border-white/[0.08]">
                <button
                  onClick={() => setApiTab("code")}
                  className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
                    apiTab === "code"
                      ? "bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white shadow-lg"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  Code
                </button>
                <button
                  onClick={() => setApiTab("no-code")}
                  className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
                    apiTab === "no-code"
                      ? "bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white shadow-lg"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  No-Code
                </button>
              </div>

              {/* ── Code tab ── */}
              {apiTab === "code" && (
                <>
                  <DocCard icon={<Info size={24} />} title="What is an API?">
                    <p>
                      An API (Application Programming Interface) is like a messenger that lets different software talk
                      to each other. Instead of manually uploading documents through our website, you can write a
                      small program that sends documents automatically.
                    </p>
                    <p>This is useful if you want to:</p>
                    <BulletList
                      items={[
                        "Process many documents at once",
                        "Connect Tavnit to other tools you use",
                        "Build automated workflows",
                      ]}
                    />
                  </DocCard>

                  <DocCard icon={<Lock size={24} />} title="Credentials">
                    <h3 className="text-base font-semibold text-gray-200 mt-2 mb-1">API Key</h3>
                    <p>Your API key is available in the Integrations tab after signing in.</p>
                    <WarningBox>
                      Keep your API key secret. If you regenerate it from the Integrations tab, the previous key will
                      be disabled.
                    </WarningBox>

                    <h3 className="text-base font-semibold text-gray-200 mt-5 mb-1">Flow ID</h3>
                    <p>The Flow ID can be found on each flow&apos;s details page. Use this when sending documents to a specific flow.</p>

                    <h3 className="text-base font-semibold text-gray-200 mt-5 mb-1">Collection ID</h3>
                    <p>The Collection ID can be found on each collection&apos;s details page. Use this when you want AI to route documents to the best-matching flow.</p>

                    <h3 className="text-base font-semibold text-gray-200 mt-5 mb-1">Cleaner ID</h3>
                    <p>The Cleaner ID can be found on each cleaner&apos;s details page. Use this when triggering a sweep to post-process or enrich extracted data.</p>

                    <h3 className="text-base font-semibold text-gray-200 mt-5 mb-1">Splitter ID</h3>
                    <p>The Splitter ID can be found on each splitter&apos;s details page. Use this when sending documents to be split into individual document types.</p>

                    <h3 className="text-base font-semibold text-gray-200 mt-5 mb-1">Bucket ID &amp; Name</h3>
                    <p>Both required when writing to a bucket via API. Find them by tapping the info icon on the bucket&apos;s detail page. The name acts as a safety check to prevent accidental writes to the wrong bucket.</p>

                    <h3 className="text-base font-semibold text-gray-200 mt-5 mb-1">API URLs</h3>
                    <p className="mb-1">Flows API (send to specific flow):</p>
                    <div className="mb-3"><InlineCode>https://run.tavnit.io/api/runs/process</InlineCode></div>
                    <p className="mb-1">Collections API (AI routes to best flow):</p>
                    <div className="mb-3"><InlineCode>https://run.tavnit.io/api/collections/process</InlineCode></div>
                    <p className="mb-1">Cleaners API (trigger a sweep):</p>
                    <div className="mb-3"><InlineCode>https://run.tavnit.io/api/sweeps/run</InlineCode></div>
                    <p className="mb-1">Splitters API (split documents by type):</p>
                    <div className="mb-3"><InlineCode>https://run.tavnit.io/api/splits/run</InlineCode></div>
                    <p className="mb-1">Buckets API (write rows to a bucket):</p>
                    <div><InlineCode>https://run.tavnit.io/api/buckets/write</InlineCode></div>
                  </DocCard>

                  <DocCard icon={<Download size={24} />} title="Sending Documents">
                    <p>Tavnit accepts documents in two ways:</p>
                    <InfoBox color="purple" icon={<Paperclip size={20} />} title="Multipart file upload">
                      Send the file as binary data (classic file upload). Best when you have direct access to the
                      file.
                    </InfoBox>
                    <InfoBox color="violet" icon={<Code2 size={20} />} title="Base64-encoded file">
                      Send the file content as a base64 string with a filename. Useful when working with automation
                      tools or APIs that provide files as base64.
                    </InfoBox>
                    <p>Both methods use the same endpoint and header:</p>
                    <BulletList
                      items={[
                        <>URL: <InlineCode>https://run.tavnit.io/api/runs/process</InlineCode></>,
                        <>Header: <InlineCode>X-API-Key: YOUR_API_KEY</InlineCode></>,
                      ]}
                    />
                  </DocCard>

                  <DocCard icon={<Code2 size={24} />} title="Code Example">
                    <p>Select your preferred programming language:</p>
                    <div className="flex gap-1 p-1 bg-white/[0.04] rounded-lg w-fit my-4 border border-white/[0.08]">
                      <button
                        onClick={() => setLang("python")}
                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                          lang === "python"
                            ? "bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white shadow-lg"
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        Python
                      </button>
                      <button
                        onClick={() => setLang("javascript")}
                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                          lang === "javascript"
                            ? "bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white shadow-lg"
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        JavaScript
                      </button>
                    </div>
                    {lang === "python" ? (
                      <CodeBlock lang="Python" code={PYTHON_CODE} />
                    ) : (
                      <CodeBlock lang="JavaScript" code={JAVASCRIPT_CODE} />
                    )}
                  </DocCard>

                  <DocCard icon={<FolderInput size={24} />} title="Collections API">
                    <p>
                      Collections allow you to send documents without knowing which flow to use.
                      AI analyzes each document and routes it to the most appropriate flow automatically.
                    </p>
                    <InfoBox color="blue" icon={<Info size={20} />} title="When to use Collections API">
                      Use this when you receive mixed document types (invoices, receipts, contracts, etc.)
                      and want AI to determine the correct flow for each document.
                    </InfoBox>
                    <p>The Collections API works the same as the Flows API, but uses a collection_id instead of flow_id:</p>
                    <BulletList
                      items={[
                        <>URL: <InlineCode>https://run.tavnit.io/api/collections/process</InlineCode></>,
                        <>Header: <InlineCode>X-API-Key: YOUR_API_KEY</InlineCode></>,
                        <>Body: <InlineCode>collection_id</InlineCode> instead of <InlineCode>flow_id</InlineCode></>,
                      ]}
                    />
                    {lang === "python" ? (
                      <CodeBlock lang="Python (Collections)" code={PYTHON_COLLECTIONS_CODE} />
                    ) : (
                      <CodeBlock lang="JavaScript (Collections)" code={JAVASCRIPT_COLLECTIONS_CODE} />
                    )}
                    <InfoBox color="purple" icon={<ArrowRight size={20} />} title="Learn more about Collections">
                      See the Collections tab for a full explanation of how document routing works and how to set up collections in the app.
                    </InfoBox>
                  </DocCard>

                  <DocCard icon={<Wand2 size={24} />} title="Cleaners API">
                    <p>
                      Cleaners can be triggered via the API to run a sweep on a document or dataset.
                      This is useful when you want to trigger enrichment or normalisation as part of an automated pipeline.
                    </p>
                    <InfoBox color="blue" icon={<Info size={20} />} title="When to use the Cleaners API">
                      Use this after a flow run to post-process or enrich the extracted values —
                      for example normalising date formats, correcting spellings, or classifying values into categories.
                    </InfoBox>
                    <p>The Cleaners API uses a cleaner_id and accepts a file to sweep:</p>
                    <BulletList
                      items={[
                        <>URL: <InlineCode>https://run.tavnit.io/api/sweeps/run</InlineCode></>,
                        <>Header: <InlineCode>X-API-Key: YOUR_API_KEY</InlineCode></>,
                        <>Body: <InlineCode>cleaner_id</InlineCode> + file (multipart or base64)</>,
                      ]}
                    />
                    {lang === "python" ? (
                      <CodeBlock lang="Python (Cleaners)" code={PYTHON_CLEANERS_CODE} />
                    ) : (
                      <CodeBlock lang="JavaScript (Cleaners)" code={JAVASCRIPT_CLEANERS_CODE} />
                    )}
                    <InfoBox color="purple" icon={<ArrowRight size={20} />} title="Learn more about Cleaners">
                      See the Cleaners tab for how to configure fields, extraction hints, and sweep results.
                    </InfoBox>
                  </DocCard>

                  <DocCard icon={<Split size={24} />} title="Splitters API">
                    <p>
                      Splitters allow you to split multi-document PDFs into individual documents.
                      AI classifies each page range and matches it to a document type defined in the splitter.
                    </p>
                    <InfoBox color="blue" icon={<Info size={20} />} title="When to use Splitters API">
                      Use this when you receive combined PDFs containing multiple document types
                      (e.g., a stack of invoices, receipts, and contracts in a single file) and need them separated.
                    </InfoBox>
                    <p>The Splitters API uses a splitter_id to identify which splitter to run:</p>
                    <BulletList
                      items={[
                        <>URL: <InlineCode>https://run.tavnit.io/api/splits/run</InlineCode></>,
                        <>Header: <InlineCode>X-API-Key: YOUR_API_KEY</InlineCode></>,
                        <>Body: <InlineCode>splitter_id</InlineCode> + file (multipart or base64)</>,
                      ]}
                    />
                    {lang === "python" ? (
                      <CodeBlock lang="Python (Splitters)" code={PYTHON_SPLITTERS_CODE} />
                    ) : (
                      <CodeBlock lang="JavaScript (Splitters)" code={JAVASCRIPT_SPLITTERS_CODE} />
                    )}
                    <InfoBox color="purple" icon={<ArrowRight size={20} />} title="Learn more about Splitters">
                      See the Splitters section for details on how to configure document types and output actions.
                    </InfoBox>
                  </DocCard>

                  <DocCard icon={<Database size={24} />} title="Buckets API">
                    <p>
                      Write rows of data directly into a bucket programmatically — useful for syncing data
                      from external systems or pushing records without going through a flow.
                    </p>
                    <InfoBox color="blue" icon={<Info size={20} />} title="When to use the Buckets API">
                      Use this when you want to insert or replace rows in a bucket from your own application,
                      a database, or an automation tool — independent of any flow run.
                    </InfoBox>
                    <BulletList
                      items={[
                        <>URL: <InlineCode>https://run.tavnit.io/api/buckets/write</InlineCode></>,
                        <>Header: <InlineCode>X-API-Key: YOUR_API_KEY</InlineCode></>,
                        <>Body: <InlineCode>bucket_id</InlineCode>, <InlineCode>bucket_name</InlineCode>, <InlineCode>overwrite</InlineCode> (bool), <InlineCode>rows</InlineCode> (array)</>,
                      ]}
                    />
                    {lang === "python" ? (
                      <CodeBlock lang="Python (Buckets)" code={PYTHON_BUCKETS_CODE} />
                    ) : (
                      <CodeBlock lang="JavaScript (Buckets)" code={JAVASCRIPT_BUCKETS_CODE} />
                    )}
                    <InfoBox color="purple" icon={<ArrowRight size={20} />} title="Learn more about Buckets">
                      See the Buckets tab for column setup, access control, charts, and CSV import/export.
                    </InfoBox>
                  </DocCard>
                </>
              )}

              {/* ── No-Code tab ── */}
              {apiTab === "no-code" && (
                <>
                  <DocCard icon={<Star size={24} />} title="Automation Tools Overview">
                    <p>
                      You don&apos;t need to write code to integrate Tavnit with your workflows. No-code automation
                      platforms let you connect apps visually and build powerful automations.
                    </p>
                    <p>Popular no-code platforms that work with Tavnit:</p>
                    <InfoBox color="purple" icon={<CircleDot size={20} />} title="Make.com">
                      Visual automation platform with 1000+ app integrations. Great for complex multi-step workflows.
                    </InfoBox>
                    <InfoBox color="yellow" icon={<Zap size={20} />} title="Zapier">
                      Connect Tavnit to 5000+ apps with simple &ldquo;Zaps&rdquo;. Perfect for straightforward
                      automations.
                    </InfoBox>
                    <InfoBox color="green" icon={<CircleDot size={20} />} title="n8n">
                      Open-source workflow automation. Self-host or use their cloud service for full control.
                    </InfoBox>
                    <p>
                      All of these platforms support HTTP requests, which means they can send documents to
                      Tavnit&apos;s API.
                    </p>
                  </DocCard>

                  <DocCard icon={<CircleDot size={24} />} title="Make.com Integration">
                    <p>
                      Make.com (formerly Integromat) is a visual automation platform that lets you connect apps and
                      automate workflows without writing any code.
                    </p>
                    <a
                      href="https://www.make.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#667eea] hover:text-[#8b9cf0] transition-colors text-sm font-medium mt-1"
                    >
                      Visit Make.com <ExternalLink size={14} />
                    </a>
                  </DocCard>

                  <DocCard icon={<Layers size={24} />} title="Getting Started with Make.com">
                    <NumberedList
                      items={[
                        "Go to make.com and create a free account",
                        'Click "Create a new scenario" from your dashboard',
                        "You'll see a blank canvas where you can add modules",
                        'Search for "HTTP" and add the "Make a request" module',
                      ]}
                    />
                    <InfoBox color="blue" icon={<Info size={20} />} title="What is a Scenario?">
                      A scenario is an automated workflow in Make.com. It consists of modules (apps) connected
                      together. When one module triggers or receives data, it passes that data to the next module.
                    </InfoBox>
                  </DocCard>

                  <DocCard icon={<Settings2 size={24} />} title="Configure the HTTP Module">
                    <p>
                      Once you&apos;ve added the HTTP module, configure it to send documents to Tavnit. You can use
                      either of these two approaches:
                    </p>

                    <h3 className="text-base font-semibold text-[#667eea] mt-6 mb-3">
                      Option 1: Multipart/form-data (when you have a File object)
                    </h3>
                    <NumberedList
                      items={[
                        'Add an HTTP "Make a request" module to your scenario',
                        <>
                          Configure the request:
                          <BulletList
                            items={[
                              <>URL: <InlineCode>https://run.tavnit.io/api/runs/process</InlineCode></>,
                              "Method: POST",
                            ]}
                          />
                        </>,
                        <>
                          In the Headers tab, add:
                          <BulletList
                            items={[
                              "Header name: X-API-Key",
                              "Header value: YOUR_API_KEY",
                            ]}
                          />
                        </>,
                        'Set Body type to "multipart/form-data"',
                        <>
                          Add form fields:
                          <BulletList
                            items={[
                              "flow_id: YOUR_FLOW_ID",
                              "source: api",
                              "file: (map from previous module)",
                            ]}
                          />
                        </>,
                        "Run your scenario to test",
                      ]}
                    />

                    <h3 className="text-base font-semibold text-[#764ba2] mt-8 mb-3">
                      Option 2: JSON + base64 (when you have a base64 string)
                    </h3>
                    <p>If your previous module outputs a base64 string instead of a file, use this approach:</p>
                    <NumberedList
                      items={[
                        'Set Body type to "Raw" and select "JSON (application/json)"',
                        <>
                          In the Headers tab, also add:
                          <BulletList
                            items={[
                              "Header name: Content-Type",
                              "Header value: application/json",
                            ]}
                          />
                        </>,
                        "Set the JSON body to:",
                      ]}
                    />
                    <CodeBlock lang="JSON" code={JSON_BODY_EXAMPLE} />

                    <InfoBox color="blue" icon={<Info size={20} />} title="Mapping the base64 content">
                      Replace {"{{previous_module.base64_content}}"} with the actual mapping from your previous
                      module. In Make.com, click in the field and select the base64 output from the module that
                      provides your file.
                    </InfoBox>
                  </DocCard>

                  <DocCard icon={<Settings2 size={24} />} title="Other Platforms (Zapier, Power Automate, n8n)">
                    <p>The same approach works for any automation platform that supports HTTP requests:</p>
                    <InfoBox color="purple" icon={<Paperclip size={20} />} title="If your platform gives you a file object">
                      Use multipart/form-data with a &ldquo;file&rdquo; field containing the file, plus flow_id and source fields.
                    </InfoBox>
                    <InfoBox color="violet" icon={<Code2 size={20} />} title="If your platform gives you a base64 string">
                      Use a JSON body with flow_id, source, filename, and file_base64 (the base64 content from the previous step).
                    </InfoBox>
                    <p>Both methods call the same endpoint and produce identical extraction results.</p>
                  </DocCard>

                  <DocCard icon={<FolderInput size={24} />} title="Using Collections API">
                    <p>
                      If you receive different types of documents (invoices, receipts, contracts, etc.) and want AI to automatically
                      route each document to the right flow, use the Collections API instead.
                    </p>
                    <InfoBox color="blue" icon={<ArrowLeftRight size={20} />} title="Collections vs Flows">
                      Flows API: You specify which flow to use with flow_id. Collections API: AI analyzes the document and picks the best flow automatically using collection_id.
                    </InfoBox>
                    <p>The setup is identical to the Flows API above, with two small changes:</p>
                    <BulletList
                      items={[
                        <>URL: <InlineCode>https://run.tavnit.io/api/collections/process</InlineCode></>,
                        <>Use <InlineCode>collection_id</InlineCode> instead of <InlineCode>flow_id</InlineCode> in your request body</>,
                      ]}
                    />
                    <p>Example JSON body for Collections:</p>
                    <CodeBlock lang="JSON" code={COLLECTIONS_JSON_EXAMPLE} />
                  </DocCard>

                  <DocCard icon={<Wand2 size={24} />} title="Using Cleaners API">
                    <p>
                      If you want to enrich or normalise extracted data after a flow run, use the Cleaners API
                      to trigger a sweep programmatically from your automation tool.
                    </p>
                    <InfoBox color="blue" icon={<ArrowLeftRight size={20} />} title="Cleaners vs Flows">
                      Flows API: Extracts raw data from a document. Cleaners API: Post-processes that data — normalising, classifying, or enriching field values.
                    </InfoBox>
                    <p>Configuration in your HTTP module:</p>
                    <BulletList
                      items={[
                        <>URL: <InlineCode>https://run.tavnit.io/api/sweeps/run</InlineCode></>,
                        <>Use <InlineCode>cleaner_id</InlineCode> instead of <InlineCode>flow_id</InlineCode> in your request body</>,
                      ]}
                    />
                    <p>Example JSON body for Cleaners:</p>
                    <CodeBlock lang="JSON" code={CLEANERS_JSON_EXAMPLE} />
                  </DocCard>

                  <DocCard icon={<Split size={24} />} title="Using Splitters API">
                    <p>
                      If you receive combined PDFs containing multiple document types and need them separated into individual files, use the Splitters API.
                    </p>
                    <InfoBox color="blue" icon={<ArrowLeftRight size={20} />} title="Splitters vs Flows">
                      Flows API: Extracts data from a single document using flow_id. Splitters API: Splits a multi-document PDF into individual documents using splitter_id.
                    </InfoBox>
                    <p>The setup is similar to the Flows API, with these changes:</p>
                    <BulletList
                      items={[
                        <>URL: <InlineCode>https://run.tavnit.io/api/splits/run</InlineCode></>,
                        <>Use <InlineCode>splitter_id</InlineCode> instead of <InlineCode>flow_id</InlineCode> in your request body</>,
                      ]}
                    />
                    <p>Example JSON body for Splitters:</p>
                    <CodeBlock lang="JSON" code={SPLITTERS_JSON_EXAMPLE} />
                  </DocCard>

                  <DocCard icon={<Database size={24} />} title="Using Buckets API">
                    <p>
                      If you want to push rows of data into a bucket from your automation tool — without sending a document for extraction — use the Buckets Write API.
                    </p>
                    <InfoBox color="blue" icon={<ArrowLeftRight size={20} />} title="Buckets vs Flows">
                      Flows API: Sends a document for AI extraction. Buckets API: Writes structured rows directly into a bucket table.
                    </InfoBox>
                    <p>Configuration in your HTTP module:</p>
                    <BulletList
                      items={[
                        <>URL: <InlineCode>https://run.tavnit.io/api/buckets/write</InlineCode></>,
                        "Method: POST, Content-Type: application/json",
                        <>Header: <InlineCode>X-API-Key: YOUR_API_KEY</InlineCode></>,
                      ]}
                    />
                    <p>Example JSON body:</p>
                    <CodeBlock lang="JSON" code={BUCKETS_JSON_EXAMPLE} />
                    <InfoBox color="purple" icon={<Info size={20} />} title="Finding your Bucket ID & Name">
                      Open the bucket&apos;s detail page and tap the info icon. Both values are copyable with a single tap.
                    </InfoBox>
                  </DocCard>
                </>
              )}
            </section>
          )}

          {/* ═══════════ WEBHOOKS ═══════════ */}
          {activeSection === "webhooks" && (
            <section>
              <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Webhooks
              </h1>

              <DocCard icon={<Zap size={24} />} title="What is a Webhook?">
                <p>
                  A webhook is like a notification system. When you set a webhook URL on a flow, we&apos;ll
                  automatically send a message to that URL whenever a document finishes processing.
                </p>
                <p>
                  Think of it like getting a text message when your pizza is ready – except instead of pizza,
                  it&apos;s your processed document data!
                </p>
              </DocCard>

              <DocCard icon={<CheckCircle2 size={24} />} title="Why Use Webhooks?">
                <p>Webhooks are perfect for automation. For example, you could have the results:</p>
                <BulletList
                  items={[
                    "Automatically added to a Google Sheet or database",
                    "Sent as a notification to Slack or Teams",
                    "Trigger another process in Make.com or Zapier",
                    "Update records in your CRM or accounting software",
                  ]}
                />
                <p>
                  Without webhooks, you would need to keep checking if documents are done processing. With webhooks,
                  you just sit back and let the data come to you.
                </p>
              </DocCard>

              <DocCard icon={<Settings2 size={24} />} title="How to Set Up a Webhook">
                <NumberedList
                  items={[
                    "Go to the Flows page",
                    "Click on the flow you want to configure",
                    "Open the flow settings or details panel",
                    'Find the "Webhook URL" field',
                    "Enter your webhook URL (the address where you want to receive notifications)",
                    "Save your changes",
                  ]}
                />
                <InfoBox color="blue" icon={<Info size={20} />} title="Where do I get a webhook URL?">
                  If you use Make.com, Zapier, or similar tools, they provide webhook URLs when you create a
                  &ldquo;webhook trigger&rdquo;. You can also create your own endpoint if you have a web server.
                </InfoBox>
              </DocCard>

              <DocCard icon={<Send size={24} />} title="What Happens When a Webhook Fires">
                <p>When a document finishes processing:</p>
                <NumberedList
                  items={[
                    "Tavnit extracts the data from your document",
                    "We send a message (HTTP POST request) to your webhook URL",
                    "The message contains the extracted data in JSON format",
                    "Your receiving system can then do whatever you want with the data",
                  ]}
                />
                <p>This all happens automatically – no manual intervention needed!</p>
              </DocCard>
            </section>
          )}

          {/* ═══════════ USER ROLES ═══════════ */}
          {activeSection === "user-roles" && (
            <section>
              <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                User Roles &amp; Permissions
              </h1>

              <DocCard icon={<Shield size={24} />} title="Overview">
                <p>
                  Every Tavnit user belongs to an organisation with one of four roles:
                  Owner, Admin, Member, or Viewer. Roles control what each user can see and do
                  across every feature in the app.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-4">
                  <RoleBadge label="Owner" color="border-purple-500/30 bg-purple-500/[0.06]" icon={<Star size={22} className="text-purple-400" />} subtitle="Full control" />
                  <RoleBadge label="Admin" color="border-blue-500/30 bg-blue-500/[0.06]" icon={<UserCog size={22} className="text-blue-400" />} subtitle="Manages people & content" />
                  <RoleBadge label="Member" color="border-cyan-500/30 bg-cyan-500/[0.06]" icon={<Users size={22} className="text-cyan-400" />} subtitle="Run & view" />
                  <RoleBadge label="Viewer" color="border-gray-500/30 bg-gray-500/[0.06]" icon={<Eye size={22} className="text-gray-400" />} subtitle="Read-only" />
                </div>
              </DocCard>

              <DocCard icon={<Star size={24} />} title="Owner">
                <InfoBox color="purple" icon={<Info size={20} />} title="One owner per org">
                  There is normally one owner — the person who created the organisation,
                  or someone explicitly promoted to owner. The owner cannot be removed or
                  demoted by anyone except themselves.
                </InfoBox>
                <p>Owners have unrestricted access to everything:</p>
                <BulletList
                  items={[
                    "Create, edit, and delete flows, buckets, collections, cleaners, and matchers",
                    "Trigger runs and view all results",
                    "Invite and remove any team member, including other admins",
                    "Promote or demote members to any role (including admin)",
                    "Edit organisation name and settings",
                    "View and manage billing and subscription",
                    "Delete the organisation",
                    "Set any bucket to private",
                    "Control all bucket access — including changing admin permissions",
                  ]}
                />
              </DocCard>

              <DocCard icon={<UserCog size={24} />} title="Admin">
                <InfoBox color="blue" icon={<Info size={20} />} title="Trusted power users">
                  Admins help run day-to-day operations. They can create and manage content
                  and invite new members, but cannot touch billing, org settings, or other admins.
                </InfoBox>
                <p>Admins can:</p>
                <BulletList
                  items={[
                    "Create, edit, and delete flows, buckets, collections, and cleaners",
                    "Create and manage their own matchers, and edit any matcher",
                    "Trigger runs and view all results",
                    "Invite new members to the org (member role only)",
                    "Remove members from the org",
                    "Edit and delete any flow, collection, or matcher created by members",
                    "Open the bucket access screen and change member access levels",
                  ]}
                />
                <p>Admins cannot:</p>
                <BulletList
                  items={[
                    "Edit org settings or billing",
                    "Delete the organisation",
                    "Set a bucket to private",
                    "Change another admin's permissions or role",
                    "Invite someone as admin or owner (owner only)",
                  ]}
                />
              </DocCard>

              <DocCard icon={<Users size={24} />} title="Member">
                <InfoBox color="green" icon={<Info size={20} />} title="Read and run, with limited create">
                  Members are regular users. They can use flows that already exist and
                  manage their own matchers, but cannot create flows or modify shared resources.
                </InfoBox>
                <p>Members can:</p>
                <BulletList
                  items={[
                    "Trigger runs on existing flows and view all run results",
                    "View flow details — including fields, webhook, email trigger, email output, data cleaning, and export to bucket settings",
                    "Create, edit, and delete their own matchers",
                    "Run matches on existing matchers",
                    "View all org-visible buckets (read-only by default)",
                    "Write data to a bucket if an admin or owner grants them editor access",
                  ]}
                />
                <p>Members cannot:</p>
                <BulletList
                  items={[
                    "Create new flows, buckets, collections, or cleaners",
                    "Edit or delete any flow, or its fields and features",
                    "Toggle or configure flow features (webhook, email trigger, email output, data cleaning, export to bucket)",
                    "Edit or delete matchers created by others",
                    "Invite or remove team members",
                    "See private buckets unless explicitly granted access",
                    "Access the bucket access management screen",
                    "See the billing or org settings pages",
                  ]}
                />
              </DocCard>

              <DocCard icon={<Eye size={24} />} title="Viewer">
                <InfoBox color="blue" icon={<Info size={20} />} title="Read-only access">
                  Viewers can see flows, runs, buckets, and cleaners but cannot create, edit, delete, or trigger any operation.
                </InfoBox>
                <p>Viewers can:</p>
                <BulletList
                  items={[
                    "View flow configurations and run history",
                    "View bucket data (subject to bucket visibility settings)",
                    "View cleaner and splitter configurations",
                    "View the Pipeline Map",
                  ]}
                />
                <p>Viewers cannot:</p>
                <BulletList
                  items={[
                    "Create, edit, or delete any resource",
                    "Trigger runs, sweeps, or splits",
                    "Manage team members or billing",
                    "Change organisation settings",
                  ]}
                />
              </DocCard>

              <DocCard icon={<Table2 size={24} />} title="Permissions at a Glance">
                <p className="mb-4">A summary of who can do what across all features.</p>
                <div className="overflow-x-auto">
                  <div className="min-w-[400px]">
                    {/* Table Header */}
                    <div className="flex items-center pb-3 border-b border-white/[0.08]">
                      <div className="flex-1" />
                      <div className="w-16 text-center"><span className="text-xs font-bold text-purple-400 bg-purple-500/10 px-2 py-1 rounded">Owner</span></div>
                      <div className="w-16 text-center"><span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded">Admin</span></div>
                      <div className="w-16 text-center"><span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded">Member</span></div>
                    </div>

                    <PermissionGroupHeader label="Flows" />
                    <PermissionRow label="Create flows" owner={true} admin={true} member={false} />
                    <PermissionRow label="Edit / delete flows" owner={true} admin={true} member={false} />
                    <PermissionRow label="View flow features & fields" owner={true} admin={true} member={true} />
                    <PermissionRow label="Configure flow features" owner={true} admin={true} member={false} note="Webhook, email, data cleaning, bucket export" />
                    <PermissionRow label="Trigger runs" owner={true} admin={true} member={true} />
                    <PermissionRow label="View run results" owner={true} admin={true} member={true} />

                    <PermissionGroupHeader label="Matchers" />
                    <PermissionRow label="Create matchers" owner={true} admin={true} member={true} />
                    <PermissionRow label="Edit / delete own matchers" owner={true} admin={true} member={true} />
                    <PermissionRow label="Edit / delete any matcher" owner={true} admin={true} member={false} />
                    <PermissionRow label="Run matches" owner={true} admin={true} member={true} />

                    <PermissionGroupHeader label="Buckets — Configuration" />
                    <PermissionRow label="Create / edit / delete buckets" owner={true} admin={true} member={false} />
                    <PermissionRow label="Set bucket to private" owner={true} admin={false} member={false} />
                    <PermissionRow label="Open access management screen" owner={true} admin={true} member={false} />
                    <PermissionRow label="Change admin access levels" owner={true} admin={false} member={false} />
                    <PermissionRow label="Change member access levels" owner={true} admin={true} member={false} />

                    <PermissionGroupHeader label="Buckets — Data" />
                    <PermissionRow label="View org-visible buckets" owner={true} admin={true} member={true} />
                    <PermissionRow label="View private buckets" owner={true} admin={false} member={false} note="Requires explicit grant" />
                    <PermissionRow label="Edit data (org-visible)" owner={true} admin={true} member={false} note="Member needs editor grant" />
                    <PermissionRow label="Edit data (private)" owner={true} admin={false} member={false} note="Requires editor grant" />

                    <PermissionGroupHeader label="Collections & Cleaners" />
                    <PermissionRow label="Create collections / cleaners" owner={true} admin={true} member={false} />
                    <PermissionRow label="Edit / delete any" owner={true} admin={true} member={false} />

                    <PermissionGroupHeader label="Team" />
                    <PermissionRow label="Invite members" owner={true} admin={true} member={false} />
                    <PermissionRow label="Remove members" owner={true} admin={true} member={false} />
                    <PermissionRow label="Promote to admin" owner={true} admin={false} member={false} />
                    <PermissionRow label="Promote to owner" owner={true} admin={false} member={false} />

                    <PermissionGroupHeader label="Organisation" />
                    <PermissionRow label="Edit org settings" owner={true} admin={false} member={false} />
                    <PermissionRow label="View & manage billing" owner={true} admin={false} member={false} />
                    <PermissionRow label="Delete organisation" owner={true} admin={false} member={false} />
                  </div>
                </div>
              </DocCard>

              <DocCard icon={<Lock size={24} />} title="Bucket Access System">
                <p>
                  Buckets have a two-layer access system that lets owners and admins control
                  exactly who can see and edit each bucket independently of their org role.
                </p>
                <InfoBox color="purple" icon={<Eye size={20} />} title="Layer 1 — Visibility">
                  Each bucket is either Org-visible (everyone in the org can see it) or Private
                  (only the owner and users with an explicit grant can see it).
                  Only the org owner can toggle a bucket to private.
                </InfoBox>
                <InfoBox color="green" icon={<Lock size={20} />} title="Layer 2 — Access Level">
                  Each user can be granted Viewer (read-only) or Editor (read + write) access
                  to a specific bucket. These grants are stored independently of the user&apos;s org role.
                </InfoBox>
                <p>To manage access, open a bucket and tap the settings icon &rarr; Manage Access.
                  The access screen groups users by role and lets you set each person&apos;s level
                  individually, or use the &ldquo;Set all&rdquo; controls to update an entire group at once.</p>
              </DocCard>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
