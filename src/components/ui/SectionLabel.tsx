"use client";

import { motion } from "framer-motion";

interface SectionLabelProps {
  label: string;
  centered?: boolean;
  isInView?: boolean;
}

export default function SectionLabel({ label, centered = false, isInView = true }: SectionLabelProps) {
  const containerClass = centered
    ? "flex items-center justify-center gap-4 mb-4"
    : "flex items-center gap-4 mb-4";

  return (
    <motion.div
      initial={{ opacity: 0, x: centered ? 0 : -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={containerClass}
    >
      <div className="w-12 h-[2px] bg-[#c45a32]" />
      <span className="text-[#c45a32] uppercase tracking-[0.2em] text-sm font-medium">
        {label}
      </span>
      {centered && <div className="w-12 h-[2px] bg-[#c45a32]" />}
    </motion.div>
  );
}