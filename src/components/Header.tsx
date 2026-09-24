"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import type { Locale } from "@/lib/locale";
import SiteSettings from "@/components/SiteSettings";
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
// among links.
const NAV: Record<Locale, { href: string; label: string }[]> = {
  en: [
    { href: "/#features", label: "Product" },
    { href: "/use-cases", label: "Use Cases" },
    { href: "/tools", label: "Free Tools" },
    { href: "/docs", label: "Docs" },
    { href: "/pricing", label: "Pricing" },
  ],
  // Spanish routes where they exist; /pricing and /docs stay English.
  es: [
    { href: "/es#como-funciona", label: "Producto" },
    { href: "/es/casos-de-uso", label: "Casos de uso" },
    { href: "/es/herramientas", label: "Herramientas gratis" },
    { href: "/docs", label: "Docs" },
    { href: "/pricing", label: "Precios" },
  ],
};

const CTA: Record<Locale, string> = { en: "Get Started", es: "Empezar" };
const DEMO: Record<Locale, { href: string; label: string }> = {
  en: { href: "/schedule", label: "Book a demo" },
  es: { href: "/es/agendar", label: "Agendar demo" },
};
const HOME: Record<Locale, string> = { en: "/", es: "/es" };

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
  alternateHref,
}: {
  /** False while Stripe self-serve is off platform-wide (platform_config). */
  showPricing?: boolean;
  locale?: Locale;
  /** URL of this page in the other language; defaults to the other homepage. */
  alternateHref?: string;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navLinks = NAV[locale];
  const links = showPricing
    ? navLinks
    : navLinks.filter((l) => l.href !== "/pricing");
  const alternate = alternateHref ?? HOME[locale === "en" ? "es" : "en"];

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
          href={HOME[locale]}
          onClick={(e) => {
            // Already on the homepage: Next does nothing for a same-route
            // link, so glide back up to the hero instead.
            if (window.location.pathname === HOME[locale] || window.location.pathname === `${HOME[locale]}/`) {
              e.preventDefault();
              setMobileOpen(false);
              scrollToTop();
              window.history.replaceState(null, "", HOME[locale]);
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
          <SiteSettings locale={locale} alternateHref={alternate} />
          <Link
            href={DEMO[locale].href}
            className="inline-flex px-4 py-2 sm:py-2.5 rounded-lg text-sm sm:text-[15px] font-semibold text-fg-3 border border-tint/15 hover:text-fg hover:border-tint/30 hover:bg-tint/5 transition-colors"
          >
            {DEMO[locale].label}
          </Link>
          <Link
            href="https://app.tavnit.io"
            className="inline-flex px-4 py-2 sm:px-6 sm:py-2.5 bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] text-white rounded-lg text-sm sm:text-[15px] font-semibold hover:-translate-y-0.5 transition-all shadow-md hover:shadow-lg"
          >
            {CTA[locale]}
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center gap-2">
          <SiteSettings locale={locale} alternateHref={alternate} />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg hover:bg-tint/10 transition-colors text-fg-3"
            aria-label="Toggle navigation"
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
              href={DEMO[locale].href}
              onClick={() => setMobileOpen(false)}
              className="mt-4 px-6 py-3 rounded-lg text-center font-semibold text-fg-3 border border-tint/15 hover:text-fg"
            >
              {DEMO[locale].label}
            </Link>
            <Link
              href="https://app.tavnit.io"
              className="mt-2 px-6 py-3 bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] text-white rounded-lg text-center font-semibold"
            >
              {CTA[locale]}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
