"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

export default function LiveDemo() {
  return (
    <section className="py-10 relative overflow-hidden" id="live-demo" aria-labelledby="live-demo-heading">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 w-full">
        <motion.div
          className="max-w-[820px] mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-5">
            <h2 id="live-demo-heading" className="text-3xl md:text-4xl font-bold text-white mb-2">
              Don&apos;t take our word for it
            </h2>
            <p className="text-base md:text-lg text-gray-400 max-w-[600px] mx-auto">
              Walk through a real invoice — from inbox to structured data — in about a minute. No signup.
            </p>
          </div>

          <a
            href="https://demo.tavnit.io"
            target="_blank"
            rel="noopener noreferrer"
            className="group block glass-card rounded-2xl overflow-hidden border border-[#3b82f6]/20 shadow-2xl shadow-[#3b82f6]/10 hover:border-[#3b82f6]/40 hover:shadow-[#3b82f6]/25 hover:-translate-y-1 transition-all"
            aria-label="Try the Tavnit live demo (opens in a new tab)"
          >
            {/* Window chrome */}
            <div className="flex items-center gap-3 px-4 py-2.5 bg-white/5 border-b border-white/10">
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/60" />
              </div>
              <div
                className="flex-1 max-w-[360px] mx-auto bg-black/30 rounded-md px-3 py-1 text-[11px] text-gray-400 font-mono truncate text-center"
                aria-hidden="true"
              >
                demo.tavnit.io
              </div>
              <div className="w-[52px]" aria-hidden="true" />
            </div>

            {/* Screenshot + hover overlay */}
            <div className="relative">
              <Image
                src="/assets/demo-preview-2026-08.jpg"
                alt="Tavnit live demo — an invoice PDF extracted into a structured table with calculated and converted fields"
                width={1035}
                height={480}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] text-white rounded-full text-base font-bold shadow-lg shadow-[#3b82f6]/30">
                  <Play size={18} />
                  Try the Live Demo
                </span>
              </div>
            </div>
          </a>

          {/* Always-visible CTA (mobile has no hover) */}
          <div className="text-center mt-5">
            <a
              href="https://demo.tavnit.io"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 sm:gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] text-white rounded-full text-base sm:text-lg font-bold hover:-translate-y-0.5 transition-all shadow-lg hover:shadow-xl hover:shadow-[#3b82f6]/20 cursor-pointer"
            >
              <Play size={20} />
              Try the Live Demo
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
