"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";

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

export default function Pricing() {
  return (
    <section id="pricing">
      <div className="max-w-[1200px] w-full mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Simple, Transparent Pricing</h2>
          <p className="text-lg text-gray-400">Monthly plans with flexible credits</p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 mb-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              className={`relative py-5 px-4 sm:py-8 sm:px-6 rounded-2xl flex flex-col hover:-translate-y-2 transition-all duration-300 ${
                plan.featured
                  ? "glass-card border-[#667eea]/50 shadow-xl shadow-[#667eea]/10 lg:scale-105"
                  : "glass-card glass-card-hover"
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 sm:px-4 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white text-[9px] sm:text-xs font-bold uppercase tracking-wider rounded-full shadow-md whitespace-nowrap">
                  BEST VALUE
                </div>
              )}
              <div className="text-center pb-4 sm:pb-6 border-b border-white/10">
                <h3 className="text-base sm:text-xl font-bold text-white mb-2 sm:mb-4">{plan.name}</h3>
                <div className="mb-1 sm:mb-3">
                  <span className="text-2xl sm:text-4xl font-extrabold gradient-text">{plan.price}</span>
                  <span className="text-sm sm:text-base font-semibold text-gray-400">/mo</span>
                </div>
                <div className="flex flex-col items-center mt-1">
                  <span className="text-xl sm:text-3xl font-bold text-white">{plan.credits}</span>
                  <span className="text-[10px] sm:text-sm text-gray-500 uppercase tracking-wider">credits/mo</span>
                </div>
              </div>
              <div className="py-4 sm:py-6 text-center flex-grow flex flex-col items-center justify-center">
                <p className="text-[11px] sm:text-sm text-gray-400 mb-1 sm:mb-2 leading-snug">
                  {plan.breakdown}
                  {plan.bonus && <span className="text-[#667eea] font-semibold">{plan.bonus}</span>}
                </p>
                <p className="text-xs sm:text-base text-gray-500 leading-snug">{plan.value}</p>
              </div>
              <Link
                href="https://app.tavnit.io"
                className={`w-full py-2.5 sm:py-3 rounded-lg text-center text-sm sm:text-base font-semibold transition-all ${
                  plan.featured
                    ? "bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white shadow-md hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#667eea]/20"
                    : "border border-[#667eea]/50 text-[#667eea] hover:bg-[#667eea] hover:text-white hover:-translate-y-0.5"
                }`}
              >
                Get Started
              </Link>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-sm text-gray-500 mb-8 sm:mb-6">
          Need more? Buy extra credits at $0.16/credit (minimum 50 credits) on top of any plan.
        </p>

        {/* All Plans Include */}
        <motion.div
          className="max-w-[900px] mx-auto p-5 sm:p-8 mb-8 sm:mb-0 rounded-2xl glass-card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h4 className="text-lg sm:text-xl font-bold text-center text-white mb-5 sm:mb-6">Everything Included in All Plans:</h4>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {includedFeatures.map((f) => (
              <li key={f} className="flex items-start gap-2 text-xs sm:text-sm text-gray-300">
                <Check size={14} className="text-emerald-400 flex-shrink-0 mt-0.5 sm:w-5 sm:h-5" />
                {f}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
