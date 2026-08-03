"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeft,
  ArrowLeftRight,
  Bot,
  ClipboardCheck,
  Database,
  FolderInput,
  Home,
  Layers,
  Mail,
  Menu,
  Plug,
  Shield,
  Split,
  Sparkles,
  Wand2,
  Webhook,
  Workflow,
  X,
} from "lucide-react";
import { DOC_SECTIONS, type DocSlug } from "./nav";

const Squares = dynamic(() => import("@/components/Squares"), { ssr: false });

/**
 * Persistent docs chrome: background, header and sidebar.
 *
 * Markup and classNames are carried over unchanged from the former single-file
 * docs page, so the design is identical. Two behavioural changes, both required
 * by the route split:
 *
 *  - Sidebar entries are <Link href> instead of onClick buttons. They were
 *    previously setState handlers, which meant the 12 non-default sections had
 *    no URL and no crawlable link pointing at them. They are now real anchors.
 *  - Active state comes from usePathname() rather than local component state.
 */

const ICONS: Record<DocSlug, React.ReactNode> = {
  "getting-started": <Layers size={20} />,
  flows: <Sparkles size={20} />,
  collections: <FolderInput size={20} />,
  cleaners: <Wand2 size={20} />,
  splitters: <Split size={20} />,
  buckets: <Database size={20} />,
  agents: <Bot size={20} />,
  "human-in-the-loop": <ClipboardCheck size={20} />,
  "pipeline-map": <Workflow size={20} />,
  "email-integration": <Mail size={20} />,
  "api-integration": <ArrowLeftRight size={20} />,
  webhooks: <Webhook size={20} />,
  "mcp-connector": <Plug size={20} />,
  "user-roles": <Shield size={20} />,
};

export default function DocsShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

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

  return (
    <div className="min-h-screen text-gray-100">
      {/* Fixed Squares background */}
      <div className="fixed inset-0 z-0 bg-[#0a0a1a]" aria-hidden="true">
        <Squares direction="diagonal" speed={0.17} borderColor="#1E2740" squareSize={45} hoverFillColor="#222" />
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
              aria-expanded={sidebarOpen}
            >
              {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            {/* Back arrow (desktop only) */}
            <Link
              href="/"
              className="hidden lg:flex items-center p-1.5 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
              aria-label="Back to home"
            >
              <ArrowLeft size={18} />
            </Link>
            {/* Logo + Docs badge */}
            <Link href="/" className="flex items-center gap-2 hover:opacity-85 transition-opacity">
              <Image src="/assets/tavnit_logo.png" alt="Tavnit" width={174} height={60} className="h-10 w-auto" priority />
              <span className="text-sm font-semibold text-[#3b82f6] bg-[#3b82f6]/10 px-2.5 py-0.5 rounded-md">
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
          <nav className="space-y-1" aria-label="Documentation">
            {DOC_SECTIONS.map((item) => {
              const active = pathname === item.href;
              return (
                <div key={item.slug}>
                  <Link
                    href={item.href}
                    // Dismiss the mobile drawer on selection. Done here rather
                    // than in an effect on pathname so there is no setState
                    // during render-commit.
                    onClick={() => setSidebarOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      active
                        ? "bg-[#3b82f6]/10 text-white border-l-2 border-[#3b82f6] -ml-[1px]"
                        : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                    }`}
                  >
                    {ICONS[item.slug]}
                    {item.label}
                  </Link>
                </div>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* ─── Main content ─── */}
      <main className="relative z-10 pt-16 lg:pl-[280px]">
        <div className="max-w-[900px] mx-auto px-4 md:px-8 py-8 md:py-12">{children}</div>
      </main>
    </div>
  );
}
