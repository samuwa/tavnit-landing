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
} from "lucide-react";

const Squares = dynamic(() => import("@/components/Squares"), { ssr: false });

type SectionId = "getting-started" | "email-integration" | "api-integration" | "webhooks";
type ApiTab = "code" | "no-code";
type Lang = "python" | "javascript";

const PYTHON_CODE = `import requests

API_KEY = "YOUR_API_KEY"
FLOW_ID = "YOUR_FLOW_ID"

# ─────────────────────────────────────────────────────────────
# Option 1: Multipart file upload (binary)
# ─────────────────────────────────────────────────────────────
with open("document.pdf", "rb") as file:
    response = requests.post(
        "https://tavnit.io/api/runs/process",
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
    "https://tavnit.io/api/runs/process",
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

  const response = await fetch("https://tavnit.io/api/runs/process", {
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
  const response = await fetch("https://tavnit.io/api/runs/process", {
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

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash === "api-code") {
      setActiveSection("api-integration");
      setApiTab("code");
    } else if (hash === "api-no-code") {
      setActiveSection("api-integration");
      setApiTab("no-code");
    } else if (["getting-started", "email-integration", "api-integration", "webhooks"].includes(hash)) {
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
      } else if (["getting-started", "email-integration", "api-integration", "webhooks"].includes(h)) {
        setActiveSection(h as SectionId);
      }
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
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
                <p>This guide will walk you through creating your first flow and processing documents.</p>
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
                    <p>The Flow ID can be found on each flow&apos;s details page.</p>

                    <h3 className="text-base font-semibold text-gray-200 mt-5 mb-1">API URL</h3>
                    <p>Use this URL to run flows programmatically:</p>
                    <div className="mt-2">
                      <InlineCode>https://tavnit.io/api/runs/process</InlineCode>
                    </div>
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
                        <>URL: <InlineCode>https://tavnit.io/api/runs/process</InlineCode></>,
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
                              <>URL: <InlineCode>https://tavnit.io/api/runs/process</InlineCode></>,
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
        </div>
      </main>
    </div>
  );
}
