"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MILESTONES } from "@/lib/constants";
import SectionLabel from "./ui/SectionLabel";

export default function Journey() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-0 left-1/2 w-[1px] h-full bg-[#f5f2ed]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <SectionLabel label="Timeline" centered isInView={isInView} />
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight">
            The Journey
          </h2>
        </motion.div>

        <div className="relative">
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute left-1/2 top-0 w-[2px] h-full bg-gradient-to-b from-[#c45a32] via-[#1d7a8c] to-[#c45a32] origin-top hidden md:block"
          />

          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute left-4 top-0 w-[2px] h-full bg-gradient-to-b from-[#c45a32] via-[#1d7a8c] to-[#c45a32] origin-top md:hidden"
          />

          <div className="space-y-16">
            {MILESTONES.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
                className={`relative grid md:grid-cols-2 gap-8 ${
                  index % 2 === 0 ? "" : "md:direction-rtl"
                }`}
              >
                <div className={`${index % 2 === 0 ? "md:text-right md:pr-16" : "md:text-left md:pl-16 md:col-start-2"} pl-12 md:pl-0`}>
                  <div className="inline-block">
                    <span className="text-[#c45a32] font-[family-name:var(--font-display)] text-4xl font-bold">
                      {milestone.year}
                    </span>
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold mt-2 mb-3">
                    {milestone.title}
                  </h3>
                  <p className="text-[#ebe6dc] leading-relaxed">
                    {milestone.description}
                  </p>
                </div>

                <div className="absolute left-4 md:left-1/2 top-2 md:-translate-x-1/2 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.15 }}
                    className="w-4 h-4 rounded-full bg-[#0d0d0d] border-2 border-[#c45a32]"
                  />
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.15 }}
                    className="absolute w-8 h-8 rounded-full border border-[#c45a32] opacity-30"
                  />
                </div>

                <div className={`hidden md:block ${index % 2 === 0 ? "" : "col-start-1 row-start-1"}`} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}