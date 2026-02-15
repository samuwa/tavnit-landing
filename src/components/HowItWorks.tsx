"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, FileText, Sparkles, Database, Play, ArrowRight } from "lucide-react";
import VideoModal from "./VideoModal";

const steps = [
  {
    icon: PlusCircle,
    title: "Create a Flow",
    description: "In minutes create an extraction flow, simply explaining what you want to capture",
  },
  {
    icon: Upload,
    title: "Upload Document",
    description: "Drop your PDF via UI, forward an email, or call our API",
  },
  {
    icon: FileText,
    title: "Extract Data",
    description: "Intelligent field detection with tables, metadata, and validation",
  },
  {
    icon: Sparkles,
    title: "Clean & Transform",
    description: "Automatic data cleaning, formatting, and AI categorization with Cleaners",
  },
  {
    icon: Database,
    title: "Store & Analyze",
    description: "Data flows into Buckets for storage, charts, and CSV/JSON export",
  },
];

export default function HowItWorks() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section className="py-12 relative overflow-hidden" id="how-it-works">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">How It Works</h2>
          <p className="text-base md:text-lg text-gray-400 max-w-[600px] mx-auto">
            Transform your documents into structured data in 5 simple steps
          </p>
        </motion.div>

        {/* Workflow Timeline */}
        <div className="workflow-timeline my-12 md:my-24">
          {steps.map((step, i) => (
            <div key={step.title} className="contents">
              {/* Step */}
              <motion.div
                className="workflow-step group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="step-icon-wrapper">
                  <div className="step-icon-circle">
                    <step.icon size={28} />
                  </div>
                  <div className="icon-glow" />
                </div>
                <div className="step-content">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </motion.div>

              {/* Connector */}
              {i < steps.length - 1 && (
                <div className="workflow-connector">
                  <div className="connector-line" />
                  <div className="connector-arrow">
                    <ArrowRight size={20} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Watch Video */}
        <div className="text-center mt-8 md:mt-16">
          <button
            onClick={() => setVideoOpen(true)}
            className="inline-flex items-center gap-2 sm:gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white rounded-full text-base sm:text-lg font-bold hover:-translate-y-0.5 transition-all shadow-lg hover:shadow-xl hover:shadow-[#667eea]/20 cursor-pointer"
          >
            <Play size={20} />
            Watch Demo Video
          </button>
        </div>
      </div>

      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />
    </section>
  );
}
