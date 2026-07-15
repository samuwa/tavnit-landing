"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SheetSection from "./sheet/SheetSection";
import Cell from "./sheet/Cell";

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

export const ROWS = 15;

function FaqItem({ q, a, index, row }: { q: string; a: string; index: number; row: number }) {
  const [open, setOpen] = useState(false);
  const panelId = `faq-panel-${index}`;

  return (
    <Cell c={2} span={10} r={row} variant="k-bare" interactive={false}>
      <motion.div
        className="glass-card rounded-md overflow-hidden w-full"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.04 }}
      >
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer hover:bg-[#FFF6DE] transition-colors"
        >
          <span className="text-sm md:text-base font-semibold text-[#0E1C2B]">{q}</span>
          <ChevronDown
            size={18}
            className={`flex-shrink-0 text-[#B9820A] transition-transform duration-300 ${
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
            <p className="px-5 pb-4 pt-3 border-t border-[#E7E9EE] text-sm text-[#6B7686] leading-relaxed">{a}</p>
          </div>
        </div>
      </motion.div>
    </Cell>
  );
}

export default function FAQ({ startRow }: { startRow: number }) {
  return (
    <SheetSection id="faq" startRow={startRow} rows={ROWS} ariaLabelledby="faq-heading">
      {/* Heading */}
      <Cell
        c={2}
        span={10}
        r={2}
        rowSpan={2}
        variant="k-title"
        className="justify-center text-center"
        formula="=VLOOKUP(question, faqs, 2)"
      >
        <motion.h2
          id="faq-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Frequently Asked Questions
        </motion.h2>
      </Cell>

      {/* Subtitle */}
      <Cell
        c={2}
        span={10}
        r={4}
        variant="k-sub"
        className="justify-center text-center"
        formula='="everything before your first flow"'
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Everything you need to know before your first flow
        </motion.p>
      </Cell>

      {/* Accordion — one sheet row per question, answer reveals in-place */}
      {faqs.map((f, i) => (
        <FaqItem key={f.q} q={f.q} a={f.a} index={i} row={6 + i} />
      ))}
    </SheetSection>
  );
}
