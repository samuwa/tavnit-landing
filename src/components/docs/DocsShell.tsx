"use client";

import { useEffect, useRef, useState } from "react";
import Logo from "@/components/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeft,
  ArrowLeftRight,
  AudioLines,
  Bot,
  Briefcase,
  FileOutput,
  Radar,
  Route,
  ShieldCheck,
  Target,
  ClipboardCheck,
  Database,
  FolderInput,
  Home,
  Languages,
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
import type { DocSlug } from "./nav";
import type { DocsShellData, DocsShellLanguage } from "./i18n";
import { DocsLocaleProvider } from "./ui";
import ThemeToggle from "@/components/ThemeToggle";
import { docsDisplay } from "./fonts";


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
 *
 * One shell for every language. The server layout passes `data`
 * (components/docs/i18n.ts → docsShellData): the sidebar entries and labels,
 * the chrome strings, and each page's language menu. In the new languages,
 * pages that are not translated link to their English URL with an "EN" badge.
 * The data also feeds DocsLocaleProvider, which localizes DocLink / Related
 * hrefs and the Copy / Keep reading strings of ui.tsx.
 */

/** Docs URLs (every language): links to them stay inside the embedded frame. */
const DOCS_PATH = /^\/(?:docs|es\/documentacion|[a-z]{2}(?:-[a-z]+)?\/docs)(?:\/|$)/;

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
  subjects: <Briefcase size={20} />,
  matchers: <Target size={20} />,
  inspectors: <ShieldCheck size={20} />,
  fillers: <FileOutput size={20} />,
  pipelines: <Route size={20} />,
  signals: <AudioLines size={20} />,
  nets: <Radar size={20} />,
};

export default function DocsShell({ data, children }: { data: DocsShellData; children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const t = { ...data.chrome, home: data.home };
  const sections = data.items;
  const current = sections.find((s) => !s.english && s.href === pathname);
  const languages = (current && data.languages[current.slug]) || data.languages["getting-started"] || [];

  // Embedded in the app: links that leave the docs open outside the frame
  // (the app itself in the top window, everything else in a new tab), so the
  // docs panel never turns into a marketing page inside the app.
  useEffect(() => {
    if (!document.documentElement.hasAttribute("data-docs-embed")) return;
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      const url = new URL(a.href, window.location.href);
      const inDocs = url.origin === window.location.origin && DOCS_PATH.test(url.pathname);
      if (inDocs) return;
      e.preventDefault();
      if (url.hostname === "app.tavnit.io") window.open(url.href, "_top");
      else window.open(url.href, "_blank", "noopener,noreferrer");
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
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

  return (
    <DocsLocaleProvider value={{ locale: data.locale, chrome: data.chrome, links: data.links }}>
    <div className={`docs-shell min-h-screen text-fg ${docsDisplay.variable}`} lang={data.lang}>
      {/* Quiet, static canvas (globals.css .docs-canvas): paper with a faint
          ledger grid, as on Tavnit Lite. The animated squares of the old
          docs cost CPU on every page and fought the text. */}
      <div className="docs-canvas fixed inset-0 z-0" aria-hidden="true" />

      {/* ─── Header ─── */}
      <header className="docs-header fixed top-0 left-0 right-0 z-50 h-16 bg-bg/80 backdrop-blur-xl border-b border-tint/10">
        <div className="h-full flex items-center">
          {/* Left section: sits above sidebar (280px on desktop) */}
          <div className="lg:w-[280px] flex items-center gap-3 px-4 lg:px-5 lg:border-r lg:border-tint/10 h-full flex-shrink-0">
            {/* Hamburger (mobile only) */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-tint/10 transition-colors text-fg-3"
              aria-label={t.toggle}
              aria-expanded={sidebarOpen}
            >
              {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            {/* Back arrow (desktop only) */}
            <Link
              href={t.home}
              className="hidden lg:flex items-center p-1.5 rounded-lg hover:bg-tint/10 transition-colors text-fg-4 hover:text-fg"
              aria-label={t.back}
            >
              <ArrowLeft size={18} />
            </Link>
            {/* Logo + "Docs": the brand's second voice, as on Tavnit Lite and
                Tavnit Admin — a hairline, then the word in the display
                serif's italic with the blue-to-violet gradient (globals.css
                .docs-mark, lighter on the dark theme). Not a sticker. */}
            <Link href={t.home} className="flex items-center gap-2.5 hover:opacity-85 transition-opacity">
              <Logo height={32} priority />
              <span className="flex items-center gap-2.5" aria-label="Docs">
                <span className="h-5 w-px bg-tint/15" aria-hidden />
                <span className="docs-mark bg-clip-text pr-0.5 text-[21px] italic leading-none text-transparent">Docs</span>
              </span>
            </Link>
          </div>

          {/* Right section: fills remaining space */}
          <div className="flex-1 flex items-center justify-end gap-2 px-4 md:px-6">
            <LanguageMenu current={data.locale} languages={languages} label={t.languages} />
            <ThemeToggle />
            {/* Home icon (mobile only) */}
            <Link
              href={t.home}
              className="lg:hidden p-2 rounded-lg hover:bg-tint/10 transition-colors text-fg-3"
              aria-label={t.goHome}
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
        className={`docs-sidebar fixed top-16 bottom-0 left-0 z-40 w-[280px] bg-bg/95 backdrop-blur-xl border-r border-tint/10 overflow-y-auto transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="p-5">
          {/* Embedded in the app the site header is hidden, so the brand
              lives here: the logo, a hairline and "Docs" in the serif. */}
          <div className="docs-embed-brand mb-6 hidden items-center gap-2.5 px-1" aria-label="Tavnit Docs">
            <Logo height={30} />
            <span className="h-5 w-px bg-tint/15" aria-hidden />
            <span className="docs-mark bg-clip-text pr-0.5 text-[21px] italic leading-none text-transparent">Docs</span>
          </div>
          <div className="flex items-center justify-between mb-5 lg:hidden">
            <span className="text-xs font-semibold text-fg-5 uppercase tracking-wider">{t.contents}</span>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 rounded hover:bg-tint/10 text-fg-5"
              aria-label={t.close}
            >
              <X size={16} />
            </button>
          </div>
          <nav className="space-y-1" aria-label={t.nav}>
            {sections.map((item, i) => {
              const active = pathname === item.href;
              const firstOfGroup = i === 0 || sections[i - 1].group !== item.group;
              return (
                <div key={item.slug}>
                  {firstOfGroup && (
                    <p className={`${i === 0 ? "" : "mt-5"} mb-1.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-fg-5`}>
                      {data.groupLabels[item.group]}
                    </p>
                  )}
                  <Link
                    href={item.href}
                    // Dismiss the mobile drawer on selection. Done here rather
                    // than in an effect on pathname so there is no setState
                    // during render-commit.
                    onClick={() => setSidebarOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      active
                        ? "bg-accent/10 text-fg border-l-2 border-accent -ml-[1px] font-semibold"
                        : "text-fg-4 hover:text-fg-2 hover:bg-tint/5"
                    }`}
                  >
                    {ICONS[item.slug]}
                    <span className="flex-1">{item.label}</span>
                    {item.english && (
                      <span
                        lang="en"
                        title={t.englishOnly}
                        className="rounded border border-tint/15 px-1.5 py-px text-[10px] font-semibold tracking-wide text-fg-5"
                      >
                        EN<span className="sr-only"> — {t.englishOnly}</span>
                      </span>
                    )}
                  </Link>
                </div>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* ─── Main content ─── */}
      {/* Embedded in the app (see docs/embed.ts) the site header is hidden;
          this button is the only way to open the sidebar on narrow screens. */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="docs-embed-menu fixed top-3 left-3 z-50 hidden p-2 rounded-lg bg-bg/90 border border-tint/10 text-fg-3"
        aria-label={t.toggle}
        aria-expanded={sidebarOpen}
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <main className="docs-main relative z-10 pt-16 lg:pl-[280px]">
        <div className="max-w-[900px] mx-auto px-4 md:px-8 py-8 md:py-12">{children}</div>
      </main>
    </div>
    </DocsLocaleProvider>
  );
}

/**
 * The languages this page exists in (hreflang twins only — a language whose
 * docs lack this page is not offered). A small disclosure menu: the button
 * shows the current language's short code.
 */
function LanguageMenu({ current, languages, label }: { current: string; languages: DocsShellLanguage[]; label: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (languages.length < 2) return null;
  const here = languages.find((l) => l.locale === current);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={label}
        aria-expanded={open}
        aria-haspopup="true"
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium text-fg-4 hover:text-fg hover:bg-tint/10 transition-colors"
      >
        <Languages size={16} />
        <span>{here?.short ?? current.toUpperCase()}</span>
      </button>
      {open && (
        <ul className="absolute right-0 top-full mt-2 min-w-[11rem] rounded-xl border border-tint/10 bg-bg/95 backdrop-blur-xl p-1.5 shadow-lg z-50">
          {languages.map((l) => (
            <li key={l.locale}>
              <Link
                href={l.href}
                hrefLang={l.hreflang}
                lang={l.hreflang}
                onClick={() => setOpen(false)}
                aria-current={l.locale === current ? "page" : undefined}
                className={`flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  l.locale === current ? "bg-accent/10 text-fg font-semibold" : "text-fg-3 hover:bg-tint/5 hover:text-fg"
                }`}
              >
                <span>{l.name}</span>
                <span className="text-[11px] text-fg-5">{l.short}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
