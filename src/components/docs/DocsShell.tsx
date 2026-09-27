"use client";

import { useEffect, useState } from "react";
import Logo from "@/components/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeft,
  ArrowLeftRight,
  AudioLines,
  Bot,
  Briefcase,
  Coins,
  FileOutput,
  Radar,
  Route,
  ShieldCheck,
  Target,
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
import { DOC_GROUP_LABELS, docSections, type DocSlug } from "./nav";
import { useDocsLocale } from "./ui";
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
 * One shell for both languages: the locale follows the URL (/es/documentacion
 * is Spanish), which picks the sidebar list, the chrome strings and the
 * EN/ES switch that links each page to its twin.
 */

const T = {
  en: { home: "/", back: "Back to home", toggle: "Toggle menu", goHome: "Go home", contents: "Contents", close: "Close menu", nav: "Documentation", switchLabel: "Español", switchShort: "ES", switchAria: "Leer esta página en español" },
  es: { home: "/es", back: "Volver al inicio", toggle: "Abrir o cerrar el menú", goHome: "Ir al inicio", contents: "Contenido", close: "Cerrar el menú", nav: "Documentación", switchLabel: "English", switchShort: "EN", switchAria: "Read this page in English" },
} as const;

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
  credits: <Coins size={20} />,
  subjects: <Briefcase size={20} />,
  matchers: <Target size={20} />,
  inspectors: <ShieldCheck size={20} />,
  fillers: <FileOutput size={20} />,
  pipelines: <Route size={20} />,
  signals: <AudioLines size={20} />,
  nets: <Radar size={20} />,
};

export default function DocsShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const locale = useDocsLocale();
  const t = T[locale];
  const sections = docSections(locale);
  const other = locale === "es" ? "en" : "es";
  const current = sections.find((s) => s.href === pathname);
  const twin = (current ? docSections(other).find((s) => s.slug === current.slug) : undefined) ?? docSections(other)[0];

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
      const inDocs =
        url.origin === window.location.origin &&
        (url.pathname === "/docs" || url.pathname.startsWith("/docs/") || url.pathname === "/es/documentacion" || url.pathname.startsWith("/es/documentacion/"));
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
    <div className={`docs-shell min-h-screen text-fg ${docsDisplay.variable}`} lang={locale}>
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
            <Link
              href={twin.href}
              hrefLang={other}
              aria-label={t.switchAria}
              className="px-2.5 py-1.5 rounded-lg text-sm font-medium text-fg-4 hover:text-fg hover:bg-tint/10 transition-colors"
            >
              <span className="hidden sm:inline">{t.switchLabel}</span>
              <span className="sm:hidden">{t.switchShort}</span>
            </Link>
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
                      {DOC_GROUP_LABELS[locale][item.group]}
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
                    {item.label}
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
  );
}
