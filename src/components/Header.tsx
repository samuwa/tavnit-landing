"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { LOCALE_CODES, localeHome, prefixedPath, type Locale } from "@/lib/locales";
import type { LanguageLinks } from "@/lib/routes";
import SiteSettings from "@/components/SiteSettings";
import LanguageSuggestion from "@/components/LanguageSuggestion";
import Logo from "@/components/Logo";

// Root-relative so the header works from every route. Bare "#features" resolves
// against the current path, so on /pricing or /docs those links went nowhere.
//
// Four links, on purpose. The header once carried nine (How It Works,
// Features, Agents, Use Cases, Integrations, Free Tools, Pricing, Book a Demo,
// Docs) and at 15px with 40px gaps it did not fit a 1280px laptop with the
// buttons; every item weighed the same, so nothing stood out. The question a
// visitor brings is answered by these four — what it does, who it is for,
// try it now, how to integrate. Agents, integrations and guides stay one
// scroll away in the footer on every page; Pricing appears here only while
// Stripe self-serve is on; the demo is a button next to the CTA, not a link
// among links. Labels and routes per language below.
type NavKey = "product" | "useCases" | "tools" | "docs" | "pricing";

const LABELS: Record<Locale, Record<NavKey | "cta" | "demo" | "menu", string>> = {
  en: { product: "Product", useCases: "Use Cases", tools: "Free Tools", docs: "Docs", pricing: "Pricing", cta: "Get Started", demo: "Book a demo", menu: "Toggle navigation" },
  es: { product: "Producto", useCases: "Casos de uso", tools: "Herramientas gratis", docs: "Docs", pricing: "Precios", cta: "Empezar", demo: "Agendar demo", menu: "Abrir o cerrar el menú" },
  "pt-BR": { product: "Produto", useCases: "Casos de uso", tools: "Ferramentas grátis", docs: "Docs", pricing: "Preços", cta: "Começar", demo: "Agendar demo", menu: "Abrir ou fechar o menu" },
  fr: { product: "Produit", useCases: "Cas d’usage", tools: "Outils gratuits", docs: "Docs", pricing: "Tarifs", cta: "Commencer", demo: "Réserver une démo", menu: "Ouvrir ou fermer le menu" },
  de: { product: "Produkt", useCases: "Anwendungsfälle", tools: "Kostenlose Tools", docs: "Doku", pricing: "Preise", cta: "Loslegen", demo: "Demo buchen", menu: "Menü öffnen oder schließen" },
  it: { product: "Prodotto", useCases: "Casi d’uso", tools: "Strumenti gratuiti", docs: "Docs", pricing: "Prezzi", cta: "Inizia", demo: "Prenota una demo", menu: "Apri o chiudi il menu" },
  nl: { product: "Product", useCases: "Toepassingen", tools: "Gratis tools", docs: "Docs", pricing: "Prijzen", cta: "Aan de slag", demo: "Demo plannen", menu: "Menu openen of sluiten" },
  pl: { product: "Produkt", useCases: "Zastosowania", tools: "Darmowe narzędzia", docs: "Dokumentacja", pricing: "Cennik", cta: "Zacznij", demo: "Umów demo", menu: "Otwórz lub zamknij menu" },
  tr: { product: "Ürün", useCases: "Kullanım alanları", tools: "Ücretsiz araçlar", docs: "Dokümanlar", pricing: "Fiyatlar", cta: "Başlayın", demo: "Demo planlayın", menu: "Menüyü aç veya kapat" },
  "zh-Hans": { product: "产品", useCases: "应用场景", tools: "免费工具", docs: "文档", pricing: "价格", cta: "开始使用", demo: "预约演示", menu: "打开或关闭菜单" },
  ja: { product: "製品", useCases: "活用事例", tools: "無料ツール", docs: "ドキュメント", pricing: "料金", cta: "始める", demo: "デモを予約", menu: "メニューを開閉" },
  ko: { product: "제품", useCases: "활용 사례", tools: "무료 도구", docs: "문서", pricing: "요금", cta: "시작하기", demo: "데모 예약", menu: "메뉴 열기/닫기" },
};

/**
 * Where each nav item goes per language. Spanish has its own routes; the new
 * languages prefix the English path (their [lang] tree serves these hubs);
 * the docs and /pricing are not localised there yet and stay English.
 */
function hrefs(locale: Locale): Record<NavKey | "demo", string> {
  if (locale === "en") return { product: "/#features", useCases: "/use-cases", tools: "/tools", docs: "/docs", pricing: "/pricing", demo: "/schedule" };
  if (locale === "es") return { product: "/es#como-funciona", useCases: "/es/casos-de-uso", tools: "/es/herramientas", docs: "/es/documentacion", pricing: "/pricing", demo: "/es/agendar" };
  return {
    product: prefixedPath(locale, "/#how-it-works"),
    useCases: prefixedPath(locale, "/use-cases"),
    tools: prefixedPath(locale, "/tools"),
    docs: "/docs",
    pricing: "/pricing",
    demo: prefixedPath(locale, "/schedule"),
  };
}

const NAV_KEYS: NavKey[] = ["product", "useCases", "tools", "docs", "pricing"];

/**
 * Back to the top, animated by hand.
 *
 * The homepage snaps to its sections (html:has(#hero) in globals.css), and
 * Chrome re-targets a native smooth scroll to whatever snap point it crosses,
 * so `scrollTo({ behavior: "smooth" })` stuttered and stopped halfway. Here
 * snapping is switched off for the length of the animation and restored on
 * arrival; a wheel or touch from the visitor hands control back at once.
 */
function scrollToTop() {
  const root = document.documentElement;
  const start = window.scrollY;
  if (start <= 0) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo(0, 0);
    return;
  }
  const prevSnap = root.style.scrollSnapType;
  const prevBehavior = root.style.scrollBehavior;
  root.style.scrollSnapType = "none";
  root.style.scrollBehavior = "auto";
  const duration = Math.min(900, Math.max(450, start * 0.25));
  const t0 = performance.now();
  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    root.style.scrollSnapType = prevSnap;
    root.style.scrollBehavior = prevBehavior;
    window.removeEventListener("wheel", finish);
    window.removeEventListener("touchstart", finish);
  };
  window.addEventListener("wheel", finish, { passive: true, once: true });
  window.addEventListener("touchstart", finish, { passive: true, once: true });
  const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
  const step = (now: number) => {
    if (done) return;
    const p = Math.min(1, (now - t0) / duration);
    window.scrollTo(0, Math.round(start * (1 - ease(p))));
    if (p < 1) requestAnimationFrame(step);
    else finish();
  };
  requestAnimationFrame(step);
  // A background tab does not run animation frames: land anyway.
  window.setTimeout(() => {
    if (!done) {
      window.scrollTo(0, 0);
      finish();
    }
  }, duration + 400);
}
export default function Header({
  showPricing = true,
  locale = "en",
  languages,
}: {
  /** False while Stripe self-serve is off platform-wide (platform_config). */
  showPricing?: boolean;
  locale?: Locale;
  /** This page in every language (languageLinksFor() on the server);
   *  defaults to each language's home. */
  languages?: LanguageLinks;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = LABELS[locale];
  const to = hrefs(locale);
  const home = localeHome(locale);
  const links = NAV_KEYS.filter((k) => showPricing || k !== "pricing").map((k) => ({ href: to[k], label: t[k] }));
  const langs: LanguageLinks = languages ?? {
    links: Object.fromEntries(LOCALE_CODES.map((l) => [l, localeHome(l)])) as Record<Locale, string>,
    available: [locale],
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg/80 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-tint/10"
          : "bg-bg/50 backdrop-blur-xl border-b border-tint/5"
      }`}
    >
      {/* Three columns on desktop: the outer two share the leftover width
          equally, so the nav sits on the true centre of the page whatever
          the logo and the buttons measure. */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 h-16 flex items-center justify-between gap-4 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-8">
        <Link
          href={home}
          onClick={(e) => {
            // Already on the homepage: Next does nothing for a same-route
            // link, so glide back up to the hero instead.
            if (window.location.pathname === home || window.location.pathname === `${home}/`) {
              e.preventDefault();
              setMobileOpen(false);
              scrollToTop();
              window.history.replaceState(null, "", home);
            }
          }}
          aria-label="Tavnit"
          className="flex-shrink-0 justify-self-start hover:opacity-85 transition-opacity"
        >
          <Logo height={32} priority />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-9">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[15px] font-medium text-fg-3 hover:text-fg transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-[#3b82f6] after:to-[#6c42f0] after:transition-all hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2 justify-self-end">
          <SiteSettings locale={locale} languages={langs} />
          {/* Header scale of the hero's pair: a quiet link for the demo, the
              brand gradient pill for the product; same height, no jump. */}
          <Link
            href={to.demo}
            className="inline-flex h-9 items-center rounded-full px-4 text-sm font-medium text-fg-3 transition-colors hover:bg-tint/[0.06] hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]/50"
          >
            {t.demo}
          </Link>
          <Link
            href="https://app.tavnit.io"
            className="group inline-flex h-9 items-center gap-1.5 rounded-full bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] pl-4 pr-3.5 text-sm font-semibold tracking-[-0.01em] text-white shadow-[0_6px_18px_-8px_rgba(76,99,246,0.7)] transition-[filter,box-shadow] hover:shadow-[0_8px_22px_-8px_rgba(76,99,246,0.85)] hover:brightness-[1.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            {t.cta}
            <ArrowRight size={14} strokeWidth={2.25} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center gap-2">
          <SiteSettings locale={locale} languages={langs} />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg hover:bg-tint/10 transition-colors text-fg-3"
            aria-label={t.menu}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-bg/95 backdrop-blur-xl border-t border-tint/10 shadow-xl">
          <nav className="flex flex-col p-6 gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 text-fg-3 hover:text-fg hover:bg-tint/5 rounded-lg font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="https://app.tavnit.io"
              className="mt-5 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] text-[15px] font-semibold text-white shadow-[0_8px_24px_-10px_rgba(76,99,246,0.7)]"
            >
              {t.cta}
              <ArrowRight size={16} strokeWidth={2.25} />
            </Link>
            <Link
              href={to.demo}
              onClick={() => setMobileOpen(false)}
              className="mt-2 inline-flex h-12 items-center justify-center rounded-full border border-tint/10 text-[15px] font-semibold text-fg-2 hover:text-fg"
            >
              {t.demo}
            </Link>
          </nav>
        </div>
      )}
      <LanguageSuggestion locale={locale} languages={langs} />
    </header>
  );
}
