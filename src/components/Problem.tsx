"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  AlertCircle,
  AlertTriangle,
  Shield,
  Zap,
  Target,
  Eye,
} from "lucide-react";

const cards = [
  {
    problem: {
      icon: AlertCircle,
      title: "Hours lost to manual data entry",
      description:
        "Your team re-types the same fields from PDFs into spreadsheets — every day, across dozens of document types",
    },
    solution: {
      icon: Zap,
      title: "Instant automated extraction",
      description:
        "Tavnit extracts structured data from any document in seconds — no templates, no manual work",
    },
  },
  {
    problem: {
      icon: AlertTriangle,
      title: "Errors multiply at scale",
      description:
        "One typo in an invoice number cascades downstream. Different formats, handwriting, and layouts make mistakes inevitable",
    },
    solution: {
      icon: Target,
      title: "99.9% accuracy, every time",
      description:
        "AI-powered validation catches errors before they propagate. Consistent output regardless of input format",
    },
  },
  {
    problem: {
      icon: Shield,
      title: "No visibility or control",
      description:
        "No audit trail, no approval workflow, no way to know if extracted data was reviewed or who handled it",
    },
    solution: {
      icon: Eye,
      title: "Human review, fully audited",
      description:
        "Pause any run for review. Assigned reviewers correct and approve results before delivery — every edit recorded in an append-only audit trail",
    },
  },
];

function ProblemCard({ card, index }: { card: (typeof cards)[0]; index: number }) {
  const [active, setActive] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice(
      window.matchMedia("(hover: none) and (pointer: coarse)").matches
    );
  }, []);

  const current = active ? card.solution : card.problem;
  const ProblemIcon = card.problem.icon;
  const SolutionIcon = card.solution.icon;

  return (
    <motion.div
      className={`group relative text-center p-6 sm:p-8 md:p-12 rounded-lg glass-card transition-all duration-300 overflow-hidden cursor-pointer ${
        active
          ? "problem-card--active -translate-y-1"
          : "glass-card-hover hover:-translate-y-1"
      }`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12 }}
      onMouseEnter={() => !isTouchDevice && setActive(true)}
      onMouseLeave={() => !isTouchDevice && setActive(false)}
      onClick={() => isTouchDevice && setActive((v) => !v)}
    >
      {/* Icon */}
      <div
        className={`w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 md:mb-6 rounded-lg flex items-center justify-center transition-all duration-300 ${
          active
            ? "bg-[#E6F6F0] text-[#17A67B]"
            : "bg-[#FCEDE1] text-[#B4530E]"
        }`}
      >
        <div className="relative w-5 h-5 md:w-6 md:h-6">
          <ProblemIcon
            className={`w-5 h-5 md:w-6 md:h-6 absolute inset-0 transition-all duration-300 ${
              active ? "opacity-0 scale-75" : "opacity-100 scale-100"
            }`}
          />
          <SolutionIcon
            className={`w-5 h-5 md:w-6 md:h-6 absolute inset-0 transition-all duration-300 ${
              active ? "opacity-100 scale-100" : "opacity-0 scale-75"
            }`}
          />
        </div>
      </div>

      {/* Title - crossfade */}
      <div className="relative min-h-[3rem] mb-3 md:mb-4">
        <h3
          className={`text-lg md:text-xl font-bold text-[#0E1C2B] transition-all duration-300 ${
            active ? "opacity-0 translate-y-[-4px]" : "opacity-100 translate-y-0"
          }`}
        >
          {card.problem.title}
        </h3>
        <h3
          className={`text-lg md:text-xl font-bold text-[#0C6B4C] absolute inset-0 transition-all duration-300 ${
            active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[4px]"
          }`}
        >
          {card.solution.title}
        </h3>
      </div>

      {/* Description - crossfade */}
      <div className="relative min-h-[4.5rem]">
        <p
          className={`text-sm md:text-base text-[#6B7686] leading-relaxed transition-all duration-300 ${
            active ? "opacity-0 translate-y-[-4px]" : "opacity-100 translate-y-0"
          }`}
        >
          {card.problem.description}
        </p>
        <p
          className={`text-sm md:text-base text-[#6B7686] leading-relaxed absolute inset-0 transition-all duration-300 ${
            active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[4px]"
          }`}
        >
          {card.solution.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Problem() {
  return (
    <section
      className="py-16 md:py-24"
      id="problem"
      aria-labelledby="problem-heading"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.h2
          id="problem-heading"
          className="text-3xl md:text-4xl font-bold text-center text-[#0E1C2B] mb-8 md:mb-16"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Still Manually Extracting Data from Documents?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {cards.map((card, i) => (
            <ProblemCard key={card.problem.title} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
