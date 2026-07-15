"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { InvoiceDemo, ContractDemo, ResumeDemo, ExpenseDemo } from "./UseCaseAnimations";

const useCases = [
  {
    id: "invoice",
    tab: "Invoice Processing",
    badge: "Finance Teams",
    title: "Invoice Processing",
    problem: "Processing 100+ invoices monthly means hours of manual data entry, prone to errors and delays.",
    solution: "Extract vendor, invoice number, date, line items → cleaned and categorized automatically → stored in a searchable Bucket",
    result: "90% time savings, zero data entry errors",
    Demo: InvoiceDemo,
  },
  {
    id: "contract",
    tab: "Contract Analysis",
    badge: "Legal & Procurement",
    title: "Contract Analysis",
    problem: "Reviewing contract terms across thousands of documents is time-consuming and error-prone.",
    solution: "Extract key terms, parties, dates, obligations → stored in Buckets with visual dashboards",
    result: "Query entire contract portfolio in seconds",
    Demo: ContractDemo,
  },
  {
    id: "form",
    tab: "Resume Screening",
    badge: "HR & Recruiting",
    title: "Resume Screening",
    problem: "Manually reviewing hundreds of resumes wastes valuable time and creates inconsistencies.",
    solution: "Extract candidate name, skills, experience, education → AI-powered skill categorization via Cleaners → structured database",
    result: "Screen 100+ resumes in minutes with consistent criteria",
    Demo: ResumeDemo,
  },
  {
    id: "expense",
    tab: "Expense Reports",
    badge: "Finance & Employees",
    title: "Expense Report Processing",
    problem: "Collecting receipts and categorizing expenses is tedious and delays reimbursements.",
    solution: "Upload receipts → extract merchant, amount, category → auto-categorized by Cleaners, stored in Buckets",
    result: "Expense reports in minutes, not hours",
    Demo: ExpenseDemo,
  },
];

export default function UseCases() {
  const [active, setActive] = useState(0);
  const [mobileActive, setMobileActive] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el || !el.children.length) return;
    const first = el.children[0] as HTMLElement;
    const cardWidth = first.offsetWidth + 12; // 12 = gap-3
    const idx = Math.round(el.scrollLeft / cardWidth);
    setMobileActive(Math.min(Math.max(idx, 0), useCases.length - 1));
  }, []);

  const scrollToCard = useCallback((idx: number) => {
    const el = scrollRef.current;
    if (!el || !el.children[idx]) return;
    const child = el.children[idx] as HTMLElement;
    const scrollLeft = child.offsetLeft - (el.offsetWidth - child.offsetWidth) / 2;
    el.scrollTo({ left: scrollLeft, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <section className="py-16 md:py-24" id="use-cases" aria-labelledby="use-cases-heading">
      {/* ── Mobile: swipable carousel ── */}
      <div className="md:hidden">
        <div className="px-4 mb-5">
          <p className="text-xl font-bold text-[#0E1C2B] mb-1 text-center" aria-hidden="true">Built for Real-World Workflows</p>
          <p className="text-xs text-[#6B7686] text-center">
            See how teams use Tavnit to automate document processing
          </p>
        </div>

        <div
          ref={scrollRef}
          className="mobile-carousel flex gap-3 px-4 pb-2"
          style={{
            overflowX: "auto",
            overflowY: "hidden",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          } as React.CSSProperties}
        >
          {useCases.map((uc) => (
            <div
              key={uc.id}
              className="flex-none snap-center"
              style={{ width: "calc(100vw - 4rem)" }}
            >
              <div className="glass-card rounded-lg p-5 border border-[#C9CFD8] flex flex-col h-full">
                <span className="inline-block w-fit px-3 py-1 font-mono uppercase tracking-[0.14em] bg-[#FFF6DE] text-[#B9820A] border border-[#FFC53D]/50 rounded-[4px] text-[10px] font-semibold mb-3">
                  {uc.badge}
                </span>
                <h3 className="text-lg font-bold text-[#0E1C2B] mb-3">{uc.title}</h3>

                <div className="mb-3">
                  <h4 className="text-[10px] font-bold text-[#1B2E44] uppercase tracking-wider mb-1">The Problem</h4>
                  <p className="text-sm text-[#6B7686] leading-relaxed">{uc.problem}</p>
                </div>

                <div className="mb-4">
                  <h4 className="text-[10px] font-bold text-[#1B2E44] uppercase tracking-wider mb-1">The Solution</h4>
                  <p className="text-sm text-[#6B7686] leading-relaxed">{uc.solution}</p>
                </div>

                <div className="flex items-center gap-2 p-3 bg-[#E6F6F0] border border-[#17A67B]/30 rounded-lg mt-auto">
                  <CheckCircle2 size={16} className="text-[#17A67B] flex-shrink-0" />
                  <span className="text-xs font-semibold text-[#0C6B4C]">{uc.result}</span>
                </div>
              </div>
            </div>
          ))}
          <div className="flex-none w-4" aria-hidden />
        </div>

        <div className="flex justify-center items-center gap-2 mt-4">
          {useCases.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToCard(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === mobileActive ? "w-6 bg-[#FFC53D]" : "w-2 bg-[#C9CFD8]"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ── Desktop: Tabs + Animated Content ── */}
      <div className="hidden md:block max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-6 md:mb-8">
          <h2 id="use-cases-heading" className="text-2xl md:text-4xl font-bold text-[#0E1C2B] mb-1 md:mb-2">Built for Real-World Workflows</h2>
          <p className="text-sm md:text-lg text-[#6B7686] max-w-[600px] mx-auto">
            See how teams use Tavnit to automate document processing
          </p>
        </div>

        <div className="flex gap-3 justify-center mb-6 flex-wrap">
          {useCases.map((uc, i) => (
            <button
              key={uc.id}
              onClick={() => setActive(i)}
              className={`px-6 py-3 rounded-lg text-base font-semibold transition-all cursor-pointer ${
                i === active
                  ? "bg-[#FFC53D] text-[#0E1C2B] shadow-[0_2px_0_#B9820A]"
                  : "glass-card text-[#1B2E44] hover:border-[#0E1C2B] hover:bg-[#FFF6DE] hover:text-[#0E1C2B]"
              }`}
            >
              {uc.tab}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center glass-card rounded-lg p-6 md:p-8"
          >
            <div>
              <span className="inline-block px-3 py-1.5 font-mono uppercase tracking-[0.14em] bg-[#FFF6DE] text-[#B9820A] border border-[#FFC53D]/50 rounded-[4px] text-sm font-semibold mb-4">
                {useCases[active].badge}
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-[#0E1C2B] mb-4">{useCases[active].title}</h3>

              <div className="mb-4">
                <h4 className="text-base font-bold text-[#1B2E44] uppercase tracking-wider mb-2">The Problem</h4>
                <p className="text-[#6B7686] leading-relaxed">{useCases[active].problem}</p>
              </div>

              <div className="mb-4">
                <h4 className="text-base font-bold text-[#1B2E44] uppercase tracking-wider mb-2">The Solution</h4>
                <p className="text-[#6B7686] leading-relaxed">{useCases[active].solution}</p>
              </div>

              <div className="flex items-center gap-4 p-4 bg-[#E6F6F0] border border-[#17A67B]/30 rounded-lg mt-6">
                <CheckCircle2 size={20} className="text-[#17A67B] flex-shrink-0" />
                <span className="text-base font-semibold text-[#0C6B4C]">{useCases[active].result}</span>
              </div>
            </div>

            <div className="hidden lg:flex items-center justify-center">
              {(() => {
                const Demo = useCases[active].Demo;
                return (
                  <div className="w-full max-w-[500px]">
                    <Demo />
                  </div>
                );
              })()}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
