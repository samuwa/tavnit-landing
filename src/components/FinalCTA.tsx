"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="final-cta-section relative py-16 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#667eea]/20 to-[#764ba2]/20 backdrop-blur-sm" />
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Ready to Transform Your Document Workflow?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 md:mb-12">
            Sign up with Google (OAuth). No email/password needed. Secure Google authentication only.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href="https://app.tavnit.io"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white rounded-lg text-base sm:text-lg font-semibold hover:-translate-y-0.5 transition-all shadow-lg hover:shadow-xl hover:shadow-[#667eea]/20"
            >
              Get Started Now
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 border-2 border-white/20 text-white rounded-lg text-base sm:text-lg font-semibold hover:bg-white/10 hover:border-white/40 hover:-translate-y-0.5 transition-all backdrop-blur-sm"
            >
              View Documentation
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
