"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

// Root-relative so the header works from every route. Bare "#features" resolves
// against the current path, so on /pricing or /docs those links went nowhere.
const navLinks = [
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#features", label: "Features" },
  { href: "/#agents", label: "Agents" },
  { href: "/use-cases", label: "Use Cases" },
  { href: "/integrations", label: "Integrations" },
  { href: "/pricing", label: "Pricing" },
  { href: "/schedule", label: "Book a Demo" },
  { href: "/docs", label: "Docs" },
];

export default function Header({
  showPricing = true,
}: {
  /** False while Stripe self-serve is off platform-wide (platform_config). */
  showPricing?: boolean;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const links = showPricing
    ? navLinks
    : navLinks.filter((l) => l.href !== "/pricing");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a1a]/80 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-white/10"
          : "bg-[#0a0a1a]/50 backdrop-blur-xl border-b border-white/5"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 h-16 flex items-center justify-between gap-4 sm:gap-8">
        <Link href="/" className="flex-shrink-0 hover:opacity-85 transition-opacity">
          <Image
            src="/assets/tavnit_logo.png"
            alt="Tavnit"
            width={232}
            height={80}
            className="h-9 sm:h-11 w-auto"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10 mx-auto">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[15px] font-medium text-gray-300 hover:text-white transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-[#3b82f6] after:to-[#6c42f0] after:transition-all hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="https://app.tavnit.io"
          className="hidden lg:inline-flex px-4 py-2 sm:px-6 sm:py-2.5 bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] text-white rounded-lg text-sm sm:text-[15px] font-semibold hover:-translate-y-0.5 transition-all shadow-md hover:shadow-lg flex-shrink-0"
        >
          Get Started
        </Link>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-300"
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#0a0a1a]/95 backdrop-blur-xl border-t border-white/10 shadow-xl">
          <nav className="flex flex-col p-6 gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="https://app.tavnit.io"
              className="mt-4 px-6 py-3 bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] text-white rounded-lg text-center font-semibold"
            >
              Get Started
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
