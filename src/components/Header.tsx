"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { SHEET_SECTIONS } from "./sheetSections";
import useActiveSection from "./useActiveSection";

const navLinks = [
  { href: "#how-it-works", label: "How It Works" },
  { href: "#features", label: "Features" },
  { href: "#agents", label: "Agents" },
  { href: "#use-cases", label: "Use Cases" },
  { href: "#integrations", label: "Integrations" },
  { href: "#pricing", label: "Pricing" },
  { href: "/docs", label: "Docs" },
];

function FormulaText({ formula }: { formula: string }) {
  const idx = formula.indexOf("//");
  if (idx === -1) return <>{formula}</>;
  return (
    <>
      {formula.slice(0, idx)}
      <span className="text-[#6B7686]">{formula.slice(idx)}</span>
    </>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const active = useActiveSection();
  const section = SHEET_SECTIONS[active] ?? SHEET_SECTIONS[0];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Menu bar */}
      <div className="bg-[#0E1C2B] text-[#EAF0F7] h-[46px] flex items-center gap-4 px-4 sm:px-6 select-none">
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

        {/* Desktop Nav — reads like spreadsheet menus */}
        <nav className="hidden lg:flex items-center gap-6 mx-auto">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13px] font-medium text-[#9FB0C4] hover:text-[#EAF0F7] transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-[#FFC53D] after:transition-all hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="https://app.tavnit.io"
          className="hidden lg:inline-flex ml-auto px-4 py-1.5 bg-[#FFC53D] text-[#0E1C2B] rounded-md text-[13px] font-semibold shadow-[0_1px_0_#B9820A] hover:brightness-105 active:translate-y-px active:shadow-none transition-all flex-shrink-0"
        >
          Get Started
        </Link>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden ml-auto p-2 rounded-md hover:bg-white/10 transition-colors text-[#9FB0C4]"
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Formula bar — tracks the active section */}
      <div className="bg-white border-b border-[#C9CFD8] h-[38px] flex items-stretch font-mono text-[13px]">
        <div className="w-[64px] sm:w-[76px] flex-none flex items-center justify-center border-r border-[#C9CFD8] bg-[#FBFBF9] text-[#0E1C2B] font-medium">
          {section.cellRef}
        </div>
        <div className="w-[30px] flex-none flex items-center justify-center italic text-[#6B7686] border-r border-[#E7E9EE]">
          fx
        </div>
        <div className="flex-1 flex items-center px-3 text-[#1B2E44] overflow-hidden whitespace-nowrap text-ellipsis">
          <span className="truncate">
            <FormulaText formula={section.formula} />
          </span>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#0E1C2B] border-t border-white/10 shadow-xl max-h-[calc(100dvh-84px)] overflow-y-auto">
          <nav className="flex flex-col p-6 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 text-[#9FB0C4] hover:text-white hover:bg-white/5 rounded-md font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="https://app.tavnit.io"
              className="mt-4 px-6 py-3 bg-[#FFC53D] text-[#0E1C2B] rounded-md text-center font-semibold shadow-[0_1px_0_#B9820A]"
            >
              Get Started
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
