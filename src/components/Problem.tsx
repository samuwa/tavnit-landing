"use client";

import { motion } from "framer-motion";
import { AlertCircle, AlertTriangle, Shield } from "lucide-react";

const problems = [
  {
    icon: AlertCircle,
    title: "Hours wasted on manual data entry",
    description: "Your team spends countless hours transcribing information from PDFs into spreadsheets",
  },
  {
    icon: AlertTriangle,
    title: "Inconsistent formatting causes errors",
    description: "Different document formats lead to mistakes, typos, and costly data quality issues",
  },
  {
    icon: Shield,
    title: "No audit trail for compliance",
    description: "Manual processes leave no record of who extracted what, when, and from which document",
  },
];

export default function Problem() {
  return (
    <section className="py-12" id="problem">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center text-white mb-8 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Still Copy-Pasting Data from PDFs?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {problems.map((problem, i) => (
            <motion.div
              key={problem.title}
              className="group text-center p-6 sm:p-8 md:p-12 rounded-2xl glass-card glass-card-hover transition-all duration-300 hover:-translate-y-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 md:mb-6 rounded-xl flex items-center justify-center bg-red-500/10 text-red-400 group-hover:bg-emerald-500/10 group-hover:text-emerald-400 transition-all duration-300">
                <problem.icon className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4">{problem.title}</h3>
              <p className="text-sm md:text-base text-gray-400 leading-relaxed">{problem.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
