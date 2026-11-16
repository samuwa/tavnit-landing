"use client";

import { motion } from "framer-motion";
import { reveal } from "@/lib/motion";

/**
 * The site's scroll-reveal as an element, so a server component can use it
 * without becoming a client component itself.
 */
export default function Reveal({
  as = "div",
  delay = 0,
  className,
  children,
}: {
  as?: "div" | "li";
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const Tag = as === "li" ? motion.li : motion.div;
  return (
    <Tag className={className} {...reveal(delay)}>
      {children}
    </Tag>
  );
}
