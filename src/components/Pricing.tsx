"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";
import SheetSection from "./sheet/SheetSection";
import Cell from "./sheet/Cell";

const plans = [
  { name: "Starter", price: "$16", credits: "100", breakdown: "100 base credits", value: "= 100 pages (extraction & cleaning)", bonus: null, featured: false },
  { name: "Growth", price: "$77", credits: "550", breakdown: "450 base + ", value: "= 550 pages (extraction & cleaning)", bonus: "100 bonus", featured: false },
  { name: "Pro", price: "$138", credits: "1,150", breakdown: "850 base + ", value: "= 1,150 pages (extraction & cleaning)", bonus: "300 bonus", featured: false },
  { name: "Enterprise", price: "$599", credits: "6,000", breakdown: "4,000 base + ", value: "= 6,000 pages (extraction & cleaning)", bonus: "2,000 bonus", featured: true },
];

const includedFeatures = [
  "Unlimited flows", "Unlimited team members", "AI field discovery", "CSV exports",
  "API & webhook access", "Email triggers", "Data cleaning with Cleaners", "Direct database queries (JSONB)",
];

export const ROWS = 19;

export default function Pricing({ startRow }: { startRow: number }) {
  return (
    <SheetSection id="pricing" startRow={startRow} rows={ROWS} ariaLabelledby="pricing-heading">
      {/* Heading */}
      <Cell
        c={3}
        span={8}
        r={2}
        rowSpan={2}
        variant="k-title"
        className="justify-center text-center"
        formula="=PRICING(simple, transparent)"
      >
        <motion.h2
          id="pricing-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Simple, Transparent Pricing
        </motion.h2>
      </Cell>

      {/* Subtitle */}
      <Cell
        c={3}
        span={8}
        r={4}
        variant="k-sub"
        className="justify-center text-center"
        formula='="Monthly plans with flexible credits"'
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Monthly plans with flexible credits
        </motion.p>
      </Cell>

      {/* BEST VALUE marker over the featured (Enterprise) column */}
      <Cell
        c={9}
        span={2}
        r={6}
        className="justify-center text-center"
        formula="=RANK(plans, by=credits)[1]"
      >
        <motion.span
          className="px-2 py-0.5 bg-[#FFC53D] text-[#0E1C2B] text-[9px] sm:text-xs font-bold uppercase tracking-wider rounded-[4px] shadow-[0_2px_0_#B9820A] whitespace-nowrap"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          BEST VALUE
        </motion.span>
      </Cell>

      {/* Plan-name header row */}
      {plans.map((plan, i) => (
        <Cell
          key={plan.name}
          c={3 + i * 2}
          span={2}
          r={7}
          variant="k-strong"
          className={`justify-center text-center${plan.featured ? " is-selected" : ""}`}
          formula={`=PLAN("${plan.name}")`}
        >
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            {plan.name}
          </motion.h3>
        </Cell>
      ))}

      {/* Price row */}
      {plans.map((plan, i) => (
        <Cell
          key={plan.name}
          c={3 + i * 2}
          span={2}
          r={8}
          variant="k-num"
          className={plan.featured ? "is-selected" : ""}
          formula={`=MONTHLY(${plan.name})`}
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <span className="font-heading text-2xl sm:text-4xl font-extrabold gradient-text">{plan.price}</span>
            <span className="text-sm sm:text-base font-semibold text-[#6B7686]">/mo</span>
          </motion.span>
        </Cell>
      ))}

      {/* Credits row */}
      {plans.map((plan, i) => (
        <Cell
          key={plan.name}
          c={3 + i * 2}
          span={2}
          r={9}
          variant="k-num"
          className={plan.featured ? "is-selected" : ""}
          formula={`=CREDITS(${plan.name})`}
        >
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <span className="font-heading text-xl sm:text-3xl font-bold text-[#0E1C2B]">{plan.credits}</span>
            <span className="text-[10px] sm:text-sm text-[#6B7686] uppercase tracking-wider">credits/mo</span>
          </motion.div>
        </Cell>
      ))}

      {/* Breakdown + bonus row */}
      {plans.map((plan, i) => (
        <Cell
          key={plan.name}
          c={3 + i * 2}
          span={2}
          r={10}
          variant="k-muted"
          className={`justify-center text-center${plan.featured ? " is-selected" : ""}`}
          formula="=SUM(base, bonus)"
        >
          <motion.p
            className="leading-snug"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            {plan.breakdown}
            {plan.bonus && <span className="text-[#B9820A] font-semibold">{plan.bonus}</span>}
          </motion.p>
        </Cell>
      ))}

      {/* Value (= pages) row */}
      {plans.map((plan, i) => (
        <Cell
          key={plan.name}
          c={3 + i * 2}
          span={2}
          r={11}
          variant="k-clean"
          className={`justify-center text-center${plan.featured ? " is-selected" : ""}`}
          formula={`=PAGES(${plan.credits})`}
        >
          <motion.p
            className="leading-snug"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            {plan.value}
          </motion.p>
        </Cell>
      ))}

      {/* CTA row */}
      {plans.map((plan, i) => (
        <Cell
          key={plan.name}
          c={3 + i * 2}
          span={2}
          r={12}
          variant="k-bare"
          interactive={false}
          formula="=SIGNUP()"
        >
          <motion.div
            className="w-full h-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Link
              href="https://app.tavnit.io"
              className={`w-full h-full inline-flex items-center justify-center text-[15px] transition-all ${
                plan.featured
                  ? "bg-[#FFC53D] text-[#0E1C2B] font-bold shadow-[inset_0_0_0_1px_#B9820A] hover:brightness-105"
                  : "bg-white text-[#1B2E44] font-semibold shadow-[inset_0_0_0_1px_#C9CFD8] hover:bg-[#FFF6DE] hover:shadow-[inset_0_0_0_1px_#0E1C2B]"
              }`}
            >
              Get Started
            </Link>
          </motion.div>
        </Cell>
      ))}

      {/* Extra-credits note */}
      <Cell
        c={3}
        span={8}
        r={14}
        variant="k-muted"
        className="justify-center text-center"
        formula='=BUY_CREDITS("$0.16/credit")'
      >
        <p>
          Need more? Buy extra credits at $0.16/credit (minimum 50 credits) on top of any plan.
        </p>
      </Cell>

      {/* Everything Included heading */}
      <Cell
        c={3}
        span={8}
        r={16}
        variant="k-strong"
        className="justify-center text-center"
        formula="=INCLUDED(all_plans)"
      >
        <motion.h4
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Everything Included in All Plans:
        </motion.h4>
      </Cell>

      {/* Everything Included checks — a row of k-clean cells */}
      {includedFeatures.map((f, i) => (
        <Cell
          key={f}
          c={3 + (i % 4) * 2}
          span={2}
          r={17 + Math.floor(i / 4)}
          variant="k-clean"
          formula={`=INCLUDES("${f}")`}
        >
          <motion.span
            className="flex items-start gap-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Check size={14} className="text-[#17A67B] flex-shrink-0 mt-0.5 sm:w-5 sm:h-5" />
            {f}
          </motion.span>
        </Cell>
      ))}
    </SheetSection>
  );
}
