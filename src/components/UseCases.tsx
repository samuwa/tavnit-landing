"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { InvoiceDemo, ContractDemo, ResumeDemo, ExpenseDemo } from "./UseCaseAnimations";

const useCases = [
  {
    id: "invoice",
    href: "/use-cases/invoice-processing",
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
    href: "/use-cases/contract-analysis",
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
    href: "/use-cases/resume-screening",
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
    href: "/use-cases/expense-reports",
    tab: "Expense Reports",
    badge: "Finance & Employees",
    title: "Expense Report Processing",
    problem: "Collecting receipts and categorizing expenses is tedious and delays reimbursements.",
    solution: "Upload receipts → extract merchant, amount, category → auto-categorized by Cleaners, stored in Buckets",
    result: "Expense reports in minutes, not hours",
    Demo: ExpenseDemo,
  },
];

/** "Finance Teams": an eyebrow, not a sticker — a short brand hairline, then the words. */
function Eyebrow({ children, small = false }: { children: React.ReactNode; small?: boolean }) {
  return (
    <p className={`flex items-center gap-2.5 font-semibold uppercase tracking-[0.16em] text-fg-4 ${small ? "mb-3 text-[10px]" : "mb-4 text-xs"}`}>
      <span className="h-px w-6 bg-gradient-to-r from-[#3b82f6] to-[#6c42f0]" aria-hidden />
      {children}
    </p>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-fg-5">{children}</h4>;
}

/** The solution reads as a pipeline, so it is drawn as one: numbered steps. */
function Steps({ text, small = false }: { text: string; small?: boolean }) {
  const steps = text.split("→").map((x) => x.trim()).filter(Boolean);
  return (
    <ol className="space-y-2">
      {steps.map((step, i) => (
        <li key={i} className={`flex gap-3 leading-relaxed text-fg-3 ${small ? "text-sm" : ""}`}>
          <span className="mt-[3px] grid h-5 w-5 shrink-0 place-items-center rounded-full border border-tint/15 text-[10px] font-semibold tabular-nums text-fg-4">
            {i + 1}
          </span>
          <span>{step.charAt(0).toUpperCase() + step.slice(1)}</span>
        </li>
      ))}
    </ol>
  );
}

/** The outcome, set as the thing to remember: a check in the brand gradient and the line. */
function Outcome({ text, small = false }: { text: string; small?: boolean }) {
  return (
    <div className={`flex items-center gap-3 border-t border-tint/10 ${small ? "mt-auto pt-4" : "mt-7 pt-6"}`}>
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#3b82f6] to-[#6c42f0] text-white">
        <Check size={14} strokeWidth={3} aria-hidden />
      </span>
      <span className={`font-semibold text-fg ${small ? "text-sm" : "text-lg"}`}>{text}</span>
    </div>
  );
}

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
          <p className="text-xl font-bold text-fg mb-1 text-center" aria-hidden="true">Built for Real-World Workflows</p>
          <p className="text-xs text-fg-4 text-center">
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
              <div className="glass-card rounded-xl p-5 border border-tint/10 flex flex-col h-full">
                <Eyebrow small>{uc.badge}</Eyebrow>
                <h3 className="text-lg font-bold text-fg mb-4">{uc.title}</h3>

                <div className="mb-4">
                  <Label>The problem</Label>
                  <p className="text-sm text-fg-4 leading-relaxed">{uc.problem}</p>
                </div>

                <div className="mb-5">
                  <Label>The solution</Label>
                  <Steps text={uc.solution} small />
                </div>

                <Outcome text={uc.result} small />
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
                i === mobileActive ? "w-6 bg-[#3b82f6]" : "w-2 bg-fg-6"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ── Desktop: Tabs + Animated Content ── */}
      <div className="hidden md:block max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-6 md:mb-8">
          <h2 id="use-cases-heading" className="text-2xl md:text-4xl font-bold tracking-tight text-fg mb-1 md:mb-3">Built for Real-World Workflows</h2>
          <p className="text-sm md:text-lg text-fg-4 max-w-[600px] mx-auto">
            See how teams use Tavnit to automate document processing
          </p>
        </div>

        <div className="mb-8 flex justify-center">
          <div role="tablist" aria-label="Use cases" className="inline-flex flex-wrap justify-center gap-1 rounded-full border border-tint/10 bg-tint/[0.03] p-1">
            {useCases.map((uc, i) => (
              <button
                key={uc.id}
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={`relative cursor-pointer rounded-full px-5 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]/50 ${
                  i === active ? "text-fg" : "text-fg-4 hover:text-fg-2"
                }`}
              >
                {i === active && (
                  <motion.span
                    layoutId="use-case-tab"
                    className="absolute inset-0 rounded-full border border-tint/15 bg-bg shadow-sm"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    aria-hidden
                  />
                )}
                <span className="relative">{uc.tab}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center glass-card rounded-2xl p-6 md:p-10"
          >
            <div>
              <Eyebrow>{useCases[active].badge}</Eyebrow>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-fg mb-6">{useCases[active].title}</h3>

              <div className="mb-6">
                <Label>The problem</Label>
                <p className="text-fg-4 leading-relaxed">{useCases[active].problem}</p>
              </div>

              <div>
                <Label>The solution</Label>
                <Steps text={useCases[active].solution} />
              </div>

              <Outcome text={useCases[active].result} />

              <Link
                href={useCases[active].href}
                className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-fg-3 transition-colors hover:text-fg"
              >
                Read the {useCases[active].tab.toLowerCase()} page
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
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

        {/* Routes the section to the real pages. Each document type has its own
            URL now; without this the homepage tabs were the only way to see them.
            The second row links the pages with the most search demand (Search
            Console: PO matching is ~half of all non-brand impressions) straight
            from the homepage — the only page on the site with any link equity —
            because the tabs above only cover four document types. */}
        <div className="text-center mt-8">
          <Link
            href="/use-cases"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[#3b82f6]/50 text-accent font-semibold hover:bg-[#3b82f6] hover:text-white hover:-translate-y-0.5 transition-all text-sm md:text-base"
          >
            Explore all use cases
            <ArrowRight size={16} />
          </Link>
          <p className="mt-4 text-sm text-fg-5">
            Also:{" "}
            {[
              ["PO matching", "/use-cases/purchase-orders"],
              ["Customs & HS classification", "/use-cases/customs-trade"],
              ["Supplier quote comparison", "/use-cases/supplier-quotes"],
              ["Delivery notes", "/use-cases/delivery-notes"],
            ].map(([label, href], i) => (
              <span key={href}>
                {i > 0 && <span aria-hidden="true"> · </span>}
                <Link href={href} className="text-fg-3 hover:text-fg underline underline-offset-4 decoration-tint/20 hover:decoration-fg">
                  {label}
                </Link>
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
