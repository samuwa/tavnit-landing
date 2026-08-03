import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import MarketingPage from "@/components/MarketingPage";
import {
  APP_URL,
  EXTRA_CREDIT_MINIMUM,
  EXTRA_CREDIT_USD,
  INCLUDED_FEATURES,
  PRICING,
  SITE_URL,
} from "@/lib/site";
import { pricingSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Pricing — Credit-Based Plans from $16/month",
  description:
    "Tavnit pricing starts at $16/month for 100 pages. Credit-based, not per seat, with unlimited flows and unlimited team members on every plan.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    type: "website",
    url: "/pricing",
    title: "Tavnit Pricing — Credit-Based Plans from $16/month",
    description:
      "Credit-based pricing for AI document extraction. 1 credit = 1 page. Unlimited flows and team members on every plan.",
    siteName: "Tavnit",
    locale: "en_US",
    images: ["/opengraph-image"],
  },
};

/** Effective per-page cost, used to make the volume discount explicit. */
function perPage(monthlyUsd: number, credits: number) {
  return (monthlyUsd / credits).toFixed(3);
}

const faqs = [
  {
    q: "What is a credit?",
    a: "One credit processes one page of a document through extraction and cleaning. A 3-page invoice costs 3 credits. Credits reset each month with your billing cycle.",
  },
  {
    q: "Do you charge per user?",
    a: "No. Every plan includes unlimited team members and unlimited flows. You are billed on processing volume only, so adding reviewers to a Human-in-the-Loop workflow costs nothing extra.",
  },
  {
    q: "What happens if I run out of credits?",
    a: `You can buy additional credits at $${EXTRA_CREDIT_USD.toFixed(2)} each, with a minimum purchase of ${EXTRA_CREDIT_MINIMUM} credits, on top of any plan. Top-ups draw from the same pool rather than being billed per document.`,
  },
  {
    q: "How are AI browser agents billed?",
    a: "Agent runs are billed by session time rather than by page, because an agent works through a live website rather than reading a fixed document.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes. You can create an account and process documents with starter credits before choosing a plan.",
  },
];

export default function PricingPage() {
  return (
    <MarketingPage>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema(faqs)) }}
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg text-gray-400 max-w-[640px] mx-auto leading-relaxed">
            Credit-based plans that scale with the documents you process — not with
            the size of your team. One credit processes one page.
          </p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 mb-6">
          {PRICING.map((plan) => (
            <div
              key={plan.name}
              className={`relative py-5 px-4 sm:py-8 sm:px-6 rounded-2xl flex flex-col transition-all duration-300 ${
                plan.featured
                  ? "glass-card border-[#3b82f6]/50 shadow-xl shadow-[#3b82f6]/10 lg:scale-105"
                  : "glass-card glass-card-hover"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 sm:px-4 bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] text-white text-[9px] sm:text-xs font-bold uppercase tracking-wider rounded-full shadow-md whitespace-nowrap">
                  BEST VALUE
                </div>
              )}
              <div className="text-center pb-4 sm:pb-6 border-b border-white/10">
                <h2 className="text-base sm:text-xl font-bold text-white mb-2 sm:mb-4">{plan.name}</h2>
                <div className="mb-1 sm:mb-3">
                  <span className="text-2xl sm:text-4xl font-extrabold text-white">${plan.monthlyUsd}</span>
                  <span className="text-sm sm:text-base font-semibold text-gray-400">/mo</span>
                </div>
                <div className="flex flex-col items-center mt-1">
                  <span className="text-xl sm:text-3xl font-bold text-white">
                    {plan.credits.toLocaleString("en-US")}
                  </span>
                  <span className="text-[10px] sm:text-sm text-gray-500 uppercase tracking-wider">
                    credits/mo
                  </span>
                </div>
              </div>
              <div className="py-4 sm:py-6 text-center flex-grow flex flex-col items-center justify-center">
                <p className="text-[11px] sm:text-sm text-gray-400 mb-1 sm:mb-2 leading-snug">
                  {plan.baseCredits.toLocaleString("en-US")} base
                  {plan.bonusCredits > 0 && (
                    <>
                      {" + "}
                      <span className="text-[#3b82f6] font-semibold">
                        {plan.bonusCredits.toLocaleString("en-US")} bonus
                      </span>
                    </>
                  )}
                </p>
                <p className="text-xs sm:text-base text-gray-500 leading-snug">
                  = {plan.credits.toLocaleString("en-US")} pages
                </p>
                <p className="text-[11px] sm:text-xs text-gray-600 mt-2">
                  ${perPage(plan.monthlyUsd, plan.credits)} per page
                </p>
              </div>
              <Link
                href={APP_URL}
                className={`w-full py-2.5 sm:py-3 rounded-lg text-center text-sm sm:text-base font-semibold transition-all ${
                  plan.featured
                    ? "bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] text-white shadow-md hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#3b82f6]/20"
                    : "border border-[#3b82f6]/50 text-[#3b82f6] hover:bg-[#3b82f6] hover:text-white hover:-translate-y-0.5"
                }`}
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-gray-500 mb-14">
          Need more? Buy extra credits at ${EXTRA_CREDIT_USD.toFixed(2)}/credit
          (minimum {EXTRA_CREDIT_MINIMUM} credits) on top of any plan.
        </p>

        {/* Included */}
        <section className="max-w-[900px] mx-auto p-5 sm:p-8 mb-14 rounded-2xl glass-card">
          <h2 className="text-lg sm:text-xl font-bold text-center text-white mb-5 sm:mb-6">
            Everything Included in All Plans
          </h2>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {INCLUDED_FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-2 text-xs sm:text-sm text-gray-300">
                <Check size={14} className="text-emerald-400 flex-shrink-0 mt-0.5 sm:w-5 sm:h-5" />
                {f}
              </li>
            ))}
          </ul>
          <p className="text-sm text-gray-500 leading-relaxed mt-6 text-center">
            Plus <Link href="/docs/collections" className="text-[#3b82f6] hover:underline">Collections</Link> routing,{" "}
            <Link href="/docs/splitters" className="text-[#3b82f6] hover:underline">Splitters</Link> for mixed PDFs,{" "}
            <Link href="/docs/buckets" className="text-[#3b82f6] hover:underline">Buckets</Link> storage,{" "}
            <Link href="/docs/human-in-the-loop" className="text-[#3b82f6] hover:underline">Human-in-the-Loop</Link>{" "}
            review, and the <Link href="/docs/mcp-connector" className="text-[#3b82f6] hover:underline">MCP connector</Link>{" "}
            for claude.ai and Cursor.
          </p>
        </section>

        {/* How credits work */}
        <section className="max-w-[760px] mx-auto mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-5">How credits work</h2>
          <div className="space-y-4 text-gray-400 leading-relaxed">
            <p>
              One credit processes one page through extraction and cleaning. A three-page
              invoice costs three credits, whether it arrives by upload, by email, or
              through the API. Credits reset monthly with your billing cycle.
            </p>
            <p>
              Higher tiers add bonus credits on top of the base allowance, so the
              effective cost per page falls as volume rises — from{" "}
              <strong className="text-gray-200">${perPage(PRICING[0].monthlyUsd, PRICING[0].credits)}</strong>{" "}
              per page on {PRICING[0].name} to{" "}
              <strong className="text-gray-200">
                ${perPage(PRICING[PRICING.length - 1].monthlyUsd, PRICING[PRICING.length - 1].credits)}
              </strong>{" "}
              on {PRICING[PRICING.length - 1].name}.
            </p>
            <p>
              Because billing is by volume rather than by seat, adding reviewers to a
              Human-in-the-Loop workflow costs nothing extra. Team members are unlimited
              on every plan.
            </p>
            <p className="text-sm text-gray-500">
              Machine-readable version:{" "}
              <Link href="/pricing.md" className="text-[#3b82f6] hover:underline">
                {SITE_URL}/pricing.md
              </Link>
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-[760px] mx-auto mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Pricing questions</h2>
          <dl className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="glass-card rounded-xl p-5">
                <dt className="text-base font-semibold text-white mb-2">{faq.q}</dt>
                <dd className="text-sm text-gray-400 leading-relaxed">{faq.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="text-center">
          <Link
            href={APP_URL}
            className="inline-block px-8 py-3.5 rounded-lg bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] text-white font-semibold shadow-md hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#3b82f6]/20 transition-all"
          >
            Start Free Trial
          </Link>
        </div>
      </div>
    </MarketingPage>
  );
}
