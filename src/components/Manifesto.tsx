"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionLabel from "./ui/SectionLabel";

export default function Manifesto() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-[#080808]" />
     
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.02 } : {}}
        transition={{ duration: 1 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-[family-name:var(--font-display)] text-[20vw] font-bold pointer-events-none select-none"
      >
        MANIFESTO
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <SectionLabel label="Our Vision" isInView={isInView} />

        <div className="space-y-8">
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[clamp(1.5rem,3vw,2.25rem)] font-[family-name:var(--font-display)] leading-[1.4] text-[#f5f2ed]"
          >
            We don&apos;t just create content.{" "}
            <span className="text-[#c45a32]">We architect narratives</span> that
            reshape how people think, feel, and act.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-[#ebe6dc] leading-relaxed max-w-3xl"
          >
            From publications that challenge conventional wisdom to software that
            transforms workflows, from music that moves souls to films that reveal
            hidden truths — every creation is a deliberate step toward a better world.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-[#6b6b6b] leading-relaxed"
          >
            This is not a portfolio. This is an intellectual operating system —
            a unified framework where ideas become impact.
          </motion.p>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="w-32 h-1 bg-gradient-to-r from-[#c45a32] to-transparent mt-12 origin-left"
        />
      </div>
    </section>
  );
}