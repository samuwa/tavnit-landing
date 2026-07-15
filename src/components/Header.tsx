"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#how-it-works", label: "How It Works" },
  { href: "#features", label: "Features" },
  { href: "#agents", label: "Agents" },
  { href: "#use-cases", label: "Use Cases" },
  { href: "#integrations", label: "Integrations" },
  { href: "#pricing", label: "Pricing" },
  { href: "/docs", label: "Docs" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top nav bar — the spreadsheet toolbar */}
      <div className="bg-white border-b border-[#C9CFD8] h-[56px] flex items-center gap-4 px-4 sm:px-6 select-none shadow-[0_1px_0_rgba(14,28,43,0.03)]">
        <Link href="/" className="flex-shrink-0 hover:opacity-85 transition-opacity">
          <Image
            src="/assets/tavnit_logo.png"
            alt="Tavnit"
            width={232}
            height={80}
            className="h-8 sm:h-9 w-auto"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-7 mx-auto">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[14px] font-medium text-[#1B2E44] hover:text-[#0E1C2B] transition-colors relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-0 after:h-0.5 after:bg-[#FFC53D] after:transition-all hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="https://app.tavnit.io"
          className="hidden lg:inline-flex ml-auto px-4 py-2 bg-[#FFC53D] text-[#0E1C2B] rounded-md text-[14px] font-semibold shadow-[0_2px_0_#B9820A] hover:brightness-105 active:translate-y-px active:shadow-none transition-all flex-shrink-0"
        >
          Get Started
        </Link>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden ml-auto p-2 rounded-md hover:bg-[#F0F2F5] transition-colors text-[#1B2E44]"
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-b border-[#C9CFD8] shadow-xl max-h-[calc(100dvh-56px)] overflow-y-auto">
          <nav className="flex flex-col p-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 text-[#1B2E44] hover:text-[#0E1C2B] hover:bg-[#FFF6DE] rounded-md font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="https://app.tavnit.io"
              className="mt-3 px-6 py-3 bg-[#FFC53D] text-[#0E1C2B] rounded-md text-center font-semibold shadow-[0_2px_0_#B9820A]"
            >
              Get Started
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
