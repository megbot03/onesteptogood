"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { DOMAINS } from "@/lib/constants";

export default function Domains() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight mb-4">
            The Three Pillars
          </h2>
          <p className="text-[#6b6b6b] text-lg max-w-xl mx-auto">
            A unified approach to intellectual creation and meaningful action
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {DOMAINS.map((domain, index) => (
            <motion.div
              key={domain.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative"
            >
              <div className="relative bg-[#0d0d0d] border border-[#1a1a1a] p-8 h-full transition-all duration-500 hover:border-opacity-50 hover:-translate-y-2">
                <div
                  className="absolute top-0 left-0 w-full h-[3px] origin-left transition-transform duration-500 scale-x-0 group-hover:scale-x-100"
                  style={{ background: domain.accent }}
                />

                <div
                  className="text-4xl mb-6 transition-transform duration-300 group-hover:scale-110"
                  style={{ color: domain.accent }}
                >
                  {domain.icon}
                </div>

                <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold mb-4 tracking-wide">
                  {domain.title}
                </h3>

                <p className="text-[#ebe6dc] leading-relaxed">
                  {domain.description}
                </p>

                <div
                  className="absolute bottom-4 right-4 w-8 h-8 border-r border-b opacity-30 transition-opacity duration-300 group-hover:opacity-60"
                  style={{ borderColor: domain.accent }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}