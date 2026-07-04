"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

/* Keep in sync with the FAQPage JSON-LD schema in src/app/layout.tsx */
export const faqs = [
  {
    q: "What is Tavnit?",
    a: "Tavnit is an AI-powered document platform that turns PDFs and images into clean, structured data — and then puts that data to work. It extracts with AI, cleans and enriches the results, routes them through human review when you want it, stores everything in built-in databases, and can even send AI agents to act on the data across the web. All without code.",
  },
  {
    q: "What types of documents can Tavnit process?",
    a: "Any PDF or image-based document: invoices, contracts, receipts, expense reports, resumes, forms, purchase orders, customs paperwork, and more — including scans and handwriting.",
  },
  {
    q: "What are Tavnit Agents?",
    a: "Agents are AI-powered browser automation bots. You describe a mission in plain language and give a starting URL; the agent opens a real cloud browser, works through the website, and returns structured data matching your schema. You can watch every session live, and a flow can launch an agent automatically with its extracted fields as inputs.",
  },
  {
    q: "How does Human in the Loop work?",
    a: "Enable review on any flow and its runs pause before results are delivered. Assigned reviewers are notified by email, can edit results directly in the review screen, and approve or reject the run. Every view, edit, and decision is recorded in an append-only audit trail. You can also trigger review conditionally, only when a Cleaner rule flags a value.",
  },
  {
    q: "Can I use Tavnit from claude.ai or Cursor?",
    a: "Yes. Tavnit ships an MCP (Model Context Protocol) connector: generate a connector URL in the app and paste it into claude.ai (Pro and up), Cursor, or any MCP client. Your AI assistant can then process documents through your flows and query your Buckets directly.",
  },
  {
    q: "Does Tavnit have an API?",
    a: "Yes. Tavnit provides a full REST API with API key authentication, webhook notifications, email triggers, and Python and JavaScript examples — plus no-code recipes for Zapier, Make, n8n, and Power Automate.",
  },
  {
    q: "What are Tavnit Collections?",
    a: "Collections let you group multiple extraction flows under a single endpoint. AI automatically analyzes each incoming document and routes it to the correct flow for processing.",
  },
  {
    q: "What are Tavnit Cleaners?",
    a: "Cleaners are Tavnit's post-extraction transformation layer. They standardize formats, translate text, convert currencies and units, calculate fields, categorize with AI, match values against your reference data, and classify HS tariff codes.",
  },
  {
    q: "How much does Tavnit cost?",
    a: "Tavnit offers monthly subscription plans starting at $16/month for 100 credits (1 credit = 1 page). Plans include Starter ($16/mo), Growth ($77/mo), Pro ($138/mo), and Enterprise ($599/mo).",
  },
];

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  const panelId = `faq-panel-${index}`;

  return (
    <motion.div
      className="glass-card rounded-xl overflow-hidden"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04 }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer hover:bg-white/[0.03] transition-colors"
      >
        <span className="text-sm md:text-base font-semibold text-white">{q}</span>
        <ChevronDown
          size={18}
          className={`flex-shrink-0 text-[#667eea] transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        id={panelId}
        className={`grid transition-all duration-300 ease-in-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">{a}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section className="py-16 md:py-24" id="faq" aria-labelledby="faq-heading">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 id="faq-heading" className="text-3xl md:text-4xl font-bold text-white mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-base md:text-lg text-gray-400">
            Everything you need to know before your first flow
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <FaqItem key={f.q} q={f.q} a={f.a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
