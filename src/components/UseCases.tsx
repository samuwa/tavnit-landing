import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";

/**
 * Who Tavnit Pro is for: six workflows, each a door to its own page.
 *
 * This used to be four tabs, each with its own animated mock-up of a
 * document being extracted into a table. By this point the page has shown
 * that twice (the hero, the story). What a visitor wants here is to find
 * their own case, so each one is a card that names the team, the pain and
 * what gets captured, and links to the page that goes deep.
 *
 * Purchase orders and customs are here because they are the workflows
 * people search for; they were missing from the old four.
 */

const CASES = [
  {
    href: "/use-cases/invoice-processing",
    team: "Finance & AP",
    title: "Invoice processing",
    pain: "Hours of manual data entry on every batch of supplier invoices.",
    captures: ["Vendor", "Invoice number", "Line items", "Totals"],
  },
  {
    href: "/use-cases/purchase-orders",
    team: "Procurement & AP",
    title: "PO matching",
    pain: "Checking every invoice line against its purchase order by hand.",
    captures: ["PO lines", "Invoice lines", "Price and quantity differences"],
  },
  {
    href: "/use-cases/customs-trade",
    team: "Logistics & Trade",
    title: "Customs & trade",
    pain: "One shipment, several documents, and a tariff code to find for every line.",
    captures: ["Packing list", "Bill of lading", "HS codes"],
  },
  {
    href: "/use-cases/contract-analysis",
    team: "Legal & Procurement",
    title: "Contract analysis",
    pain: "Key terms buried in prose, across thousands of documents.",
    captures: ["Parties", "Dates", "Obligations", "Renewal terms"],
  },
  {
    href: "/use-cases/expense-reports",
    team: "Finance & Employees",
    title: "Expense reports",
    pain: "Collecting receipts and categorising expenses delays every reimbursement.",
    captures: ["Merchant", "Amount", "Category"],
  },
  {
    href: "/use-cases/resume-screening",
    team: "HR & Recruiting",
    title: "Resume screening",
    pain: "Hundreds of resumes, every one laid out differently.",
    captures: ["Skills", "Experience", "Education"],
  },
];

const MORE: [string, string][] = [
  ["/use-cases/supplier-quotes", "Supplier quotes"],
  ["/use-cases/delivery-notes", "Delivery notes"],
  ["/use-cases/bank-statements", "Bank statements"],
  ["/use-cases/lease-agreements", "Lease agreements"],
  ["/use-cases/insurance-claims", "Insurance claims"],
];

export default function UseCases() {
  return (
    <section id="use-cases" aria-labelledby="use-cases-heading">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <Reveal className="mb-8 text-center md:mb-12">
          <h2 id="use-cases-heading" className="mb-2 text-3xl font-bold tracking-tight text-fg md:text-4xl">
            Built for real-world workflows
          </h2>
          <p className="mx-auto max-w-[600px] text-base text-fg-4 md:text-lg">Find yours and see how it runs in Tavnit Pro.</p>
        </Reveal>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:gap-6">
          {CASES.map((c, i) => (
            <Reveal as="li" key={c.href} delay={(i % 3) * 0.06}>
              <Link
                href={c.href}
                className="glass-card glass-card-hover group flex h-full flex-col rounded-2xl p-5 transition sm:p-6 2xl:p-7"
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-fg-4 2xl:text-xs">
                    <span className="h-px w-5 bg-gradient-to-r from-[#3b82f6] to-[#6c42f0]" aria-hidden />
                    {c.team}
                  </span>
                  <ArrowUpRight
                    size={17}
                    className="shrink-0 text-fg-5 transition-[color,translate] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    aria-hidden
                  />
                </div>
                <h3 className="mb-2 text-xl font-bold text-fg 2xl:text-2xl">{c.title}</h3>
                <p className="mb-5 text-sm leading-relaxed text-fg-4 2xl:text-base">{c.pain}</p>
                <ul className="mt-auto flex flex-wrap gap-1.5" aria-label="What Tavnit captures">
                  {c.captures.map((x) => (
                    <li key={x} className="rounded-md border border-tint/10 bg-tint/[0.04] px-2 py-1 font-mono text-[11px] text-fg-3 2xl:text-xs">
                      {x}
                    </li>
                  ))}
                </ul>
              </Link>
            </Reveal>
          ))}
        </ul>

        {/* More doors: the homepage is these pages' strongest internal link. */}
        <p className="mt-6 text-center text-sm leading-relaxed text-fg-4 2xl:text-base">
          Also:{" "}
          {MORE.map(([href, label], i) => (
            <span key={href}>
              {i > 0 && <span className="text-fg-6"> · </span>}
              <Link href={href} className="font-semibold text-fg-3 underline-offset-4 transition-colors hover:text-fg hover:underline">
                {label}
              </Link>
            </span>
          ))}
        </p>

        <div className="mt-6 text-center md:mt-8">
          <Link
            href="/use-cases"
            className="press group inline-flex h-11 items-center gap-2 rounded-full border border-tint/15 px-6 text-sm font-semibold text-fg-2 hover:border-[#3b82f6]/50 hover:text-fg md:text-base"
          >
            Explore all use cases
            <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
