"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronDown, LogOut, Menu, X } from "lucide-react";
import type { Locale } from "@/lib/locale";
import type { ShellCopy } from "@/lib/lite/copy";
import type { ToolCopy } from "@/lib/lite/copy";
import type { LiteToolId, LiteToolKind } from "@/lib/lite/tools";
import { APP_URL } from "@/lib/site";
import AuthModal from "@/components/lite/AuthModal";
import { signOutLite, useLiteSession } from "@/components/lite/session";
import { KIND_ICON, KIND_ORDER, KIND_TILE, TOOL_ICONS } from "@/components/lite/tool-icons";

/**
 * The Lite header. Same map as the main site (product, use cases, docs,
 * demo) so the free tools read as part of Tavnit, plus what a tools site
 * needs: a menu with every tool (iLovePDF-style) and the account.
 *
 * The account button never says "create account" to someone who has one.
 * Guests get one quiet "Sign in" (the dialog also creates accounts); members get "Go to
 * Tavnit" (the full platform, as opposed to these Lite tools) and an
 * avatar menu with the email and sign out.
 */

export interface HeaderTool {
  id: LiteToolId;
  kind: LiteToolKind;
  href: string;
  label: string;
}

const LINK =
  "rounded-md px-2.5 py-1.5 text-sm font-medium text-[var(--lite-muted)] transition-colors hover:text-[var(--lite-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lite-blue)]/50";
const BRAND_BTN =
  "lite-brand lite-press inline-flex min-h-10 items-center gap-1.5 rounded-lg px-4 text-sm font-semibold text-white shadow-sm shadow-[#3b82f6]/30 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lite-blue)]/50";

function useDismiss(open: boolean, close: () => void, ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close, ref]);
}

/**
 * "Lite" next to the wordmark: a hairline, then the word set in the display
 * serif's italic with the brand's blue-to-violet running through it. A
 * second voice for the same brand, not a sticker.
 */
function LiteMark({ label }: { label: string }) {
  return (
    <span className="flex items-center gap-2" aria-label={label}>
      <span className="h-[18px] w-px bg-[var(--lite-line)]" aria-hidden />
      <span
        className="bg-clip-text pr-0.5 text-[19px] italic leading-none text-transparent"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 500,
          backgroundImage: "linear-gradient(100deg, var(--lite-blue) 0%, var(--lite-violet) 85%)",
          letterSpacing: "-0.01em",
        }}
      >
        {label}
      </span>
    </span>
  );
}

function ToolItem({ t, onPick }: { t: HeaderTool; onPick: () => void }) {
  const Icon = TOOL_ICONS[t.id] ?? KIND_ICON[t.kind];
  return (
    <Link
      href={t.href}
      onClick={onPick}
      className="group flex items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium text-[var(--lite-ink)] transition-colors hover:bg-[#f3f6fa] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lite-blue)]/50"
    >
      <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${KIND_TILE[t.kind]}`}>
        <Icon size={16} strokeWidth={2} aria-hidden />
      </span>
      {t.label}
    </Link>
  );
}

export default function LiteHeader({
  locale,
  alternatePath,
  hubPath,
  tools,
  t,
  authCopy,
}: {
  locale: Locale;
  alternatePath: string;
  hubPath: string;
  tools: HeaderTool[];
  t: ShellCopy;
  /** The base auth strings; the header overrides title, body and buttons. */
  authCopy: ToolCopy["auth"];
}) {
  const other: Locale = locale === "es" ? "en" : "es";
  const { ready, email } = useLiteSession();
  const [toolsOpen, setToolsOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [auth, setAuth] = useState<null | "signin" | "signup">(null);
  const toolsRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);
  const closeTools = useCallback(() => setToolsOpen(false), []);
  const closeAccount = useCallback(() => setAccountOpen(false), []);
  useDismiss(toolsOpen, closeTools, toolsRef);
  useDismiss(accountOpen, closeAccount, accountRef);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const groups = KIND_ORDER.map((k) => ({ kind: k, title: t.groups[k], items: tools.filter((x) => x.kind === k) })).filter((g) => g.items.length);
  const initial = (email ?? "?").trim().charAt(0).toUpperCase();
  const signOut = async () => {
    setAccountOpen(false);
    setMobileOpen(false);
    await signOutLite();
  };

  const accountArea = !ready ? (
    <span className="h-10 w-[120px]" aria-hidden />
  ) : email ? (
    <>
      <a href={APP_URL} className={BRAND_BTN}>
        {t.account.open}
        <ArrowUpRight size={15} aria-hidden />
      </a>
      <div ref={accountRef} className="relative">
        <button
          type="button"
          onClick={() => setAccountOpen((v) => !v)}
          aria-haspopup="menu"
          aria-expanded={accountOpen}
          aria-label={t.account.menu}
          className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-[var(--lite-line)] bg-white font-heading text-sm font-bold text-[var(--lite-ink)] transition-colors hover:border-[var(--lite-blue)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lite-blue)]/50"
        >
          {initial}
        </button>
        {accountOpen && (
          <div role="menu" className="lite-pop absolute right-0 top-12 w-[280px] rounded-xl border border-[var(--lite-line)] bg-white p-2 shadow-xl shadow-[#1c2321]/10">
            <div className="px-3 py-2">
              <p className="text-xs text-[var(--lite-muted)]">{t.account.signedInAs}</p>
              <p className="truncate text-sm font-semibold">{email}</p>
            </div>
            <a role="menuitem" href={APP_URL} className="mt-1 block rounded-lg px-3 py-2 hover:bg-[#f3f6fa]">
              <span className="flex items-center gap-1.5 text-sm font-semibold">
                {t.account.open}
                <ArrowUpRight size={14} aria-hidden />
              </span>
              <span className="mt-0.5 block text-xs leading-snug text-[var(--lite-muted)]">{t.account.openHint}</span>
            </a>
            <button role="menuitem" type="button" onClick={() => void signOut()} className="mt-1 flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-[var(--lite-muted)] hover:bg-[#f3f6fa] hover:text-[var(--lite-ink)]">
              <LogOut size={14} aria-hidden />
              {t.account.signOut}
            </button>
          </div>
        )}
      </div>
    </>
  ) : (
    // One quiet button for guests: with Google, signing in and creating an
    // account are the same click, and the dialog switches between the two.
    // The page's own call to action is the tool, not the header.
    <button
      type="button"
      onClick={() => setAuth("signin")}
      className="lite-press inline-flex min-h-10 cursor-pointer items-center rounded-lg border border-[var(--lite-line)] bg-white px-4 text-sm font-semibold text-[var(--lite-ink)] transition-colors hover:border-[var(--lite-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lite-blue)]/50"
    >
      {t.signin}
    </button>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--lite-line)] bg-[var(--lite-paper)]/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1080px] items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Link
            href={hubPath}
            onClick={(e) => {
              if (window.location.pathname === hubPath) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
              }
            }}
            className="flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lite-blue)]/50"
          >
            <span className="relative block h-7 w-[26px] overflow-hidden" aria-hidden>
              <Image src="/assets/tavnit_logo.png" alt="" width={1287} height={444} className="absolute left-0 top-0 h-7 w-auto max-w-none" priority />
            </span>
            <span className="font-heading text-lg font-bold tracking-tight text-[var(--lite-ink)]">Tavnit</span>
            <LiteMark label={t.lite} />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Tavnit">
            <div ref={toolsRef} className="relative">
              <button
                type="button"
                onClick={() => setToolsOpen((v) => !v)}
                aria-expanded={toolsOpen}
                aria-haspopup="true"
                className={`${LINK} inline-flex cursor-pointer items-center gap-1 ${toolsOpen ? "text-[var(--lite-ink)]" : ""}`}
              >
                {t.tools}
                <ChevronDown size={14} className={`transition-transform ${toolsOpen ? "rotate-180" : ""}`} aria-hidden />
              </button>
              {toolsOpen && (
                <div className="lite-pop absolute left-0 top-11 w-[720px] rounded-2xl border border-[var(--lite-line)] bg-white p-4 shadow-xl shadow-[#1c2321]/10">
                  <div className="grid grid-cols-[1.6fr_1fr] gap-x-6">
                    {groups.map((g) => (
                      <div key={g.kind} className={g.kind === "extract" ? "row-span-2" : ""}>
                        <p className="mb-1 px-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--lite-muted)]">{g.title}</p>
                        <div className={g.kind === "extract" ? "grid grid-cols-2 gap-x-2" : ""}>
                          {g.items.map((x) => (
                            <ToolItem key={x.id} t={x} onPick={closeTools} />
                          ))}
                        </div>
                        {g.kind !== "extract" && <div className="h-3" />}
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 border-t border-[var(--lite-line)] pt-3">
                    <Link href={hubPath} onClick={closeTools} className="px-2 text-sm font-semibold text-[var(--lite-blue-ink)] hover:underline">
                      {t.allTools} →
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <Link href={t.nav.productHref} className={LINK}>{t.nav.product}</Link>
            <Link href={t.nav.useCasesHref} className={LINK}>{t.nav.useCases}</Link>
            <Link href="/docs" className={LINK}>{t.nav.docs}</Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Link href={alternatePath} hrefLang={other} lang={other} className={`${LINK} text-xs font-semibold uppercase tracking-wide`}>
            {other}
          </Link>
          <Link href={t.demoHref} className={`${LINK} hidden xl:inline`}>{t.demo}</Link>
          <div className="hidden items-center gap-2 sm:flex">{accountArea}</div>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label={t.menu}
            className="grid h-10 w-10 cursor-pointer place-items-center rounded-lg text-[var(--lite-ink)] hover:bg-[#eef1f4] lg:hidden"
          >
            <Menu size={20} aria-hidden />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[var(--lite-paper)] lg:hidden">
          <div className="flex h-16 items-center justify-between border-b border-[var(--lite-line)] px-4">
            <span className="flex items-center gap-2 font-heading text-lg font-bold">Tavnit <LiteMark label={t.lite} /></span>
            <button type="button" onClick={() => setMobileOpen(false)} aria-label={t.close} className="grid h-10 w-10 cursor-pointer place-items-center rounded-lg hover:bg-[#eef1f4]">
              <X size={20} aria-hidden />
            </button>
          </div>
          <div className="px-4 py-5">
            {groups.map((g) => (
              <div key={g.kind} className="mb-4">
                <p className="mb-1 px-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--lite-muted)]">{g.title}</p>
                {g.items.map((x) => (
                  <ToolItem key={x.id} t={x} onPick={() => setMobileOpen(false)} />
                ))}
              </div>
            ))}
            <div className="mt-2 flex flex-col border-t border-[var(--lite-line)] pt-3">
              <Link href={t.nav.productHref} className={`${LINK} py-2.5`}>{t.nav.product}</Link>
              <Link href={t.nav.useCasesHref} className={`${LINK} py-2.5`}>{t.nav.useCases}</Link>
              <Link href="/docs" className={`${LINK} py-2.5`}>{t.nav.docs}</Link>
              <Link href={t.demoHref} className={`${LINK} py-2.5`}>{t.demo}</Link>
            </div>
            <div className="mt-4 flex flex-col gap-2 border-t border-[var(--lite-line)] pt-4">
              {email ? (
                <>
                  <p className="px-2 text-xs text-[var(--lite-muted)]">
                    {t.account.signedInAs} <span className="font-semibold text-[var(--lite-ink)]">{email}</span>
                  </p>
                  <a href={APP_URL} className={`${BRAND_BTN} min-h-12 justify-center`}>
                    {t.account.open}
                    <ArrowUpRight size={15} aria-hidden />
                  </a>
                  <button type="button" onClick={() => void signOut()} className={`${LINK} py-2.5 text-left`}>{t.account.signOut}</button>
                </>
              ) : (
                <>
                  <button type="button" onClick={() => { setMobileOpen(false); setAuth("signup"); }} className={`${BRAND_BTN} min-h-12 cursor-pointer justify-center`}>{t.cta}</button>
                  <button type="button" onClick={() => { setMobileOpen(false); setAuth("signin"); }} className={`${LINK} cursor-pointer py-2.5`}>{t.signin}</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <AuthModal
        open={auth !== null}
        initialMode={auth ?? "signup"}
        resume={false}
        onClose={() => setAuth(null)}
        onAuthed={() => setAuth(null)}
        onBeforeRedirect={() => {}}
        copy={{ ...authCopy, ...t.auth }}
        locale={locale}
      />
    </header>
  );
}
