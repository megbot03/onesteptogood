"use client";

import { motion, useSpring, useTransform, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { STATS } from "@/lib/constants";

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const spring = useSpring(0, {
    stiffness: 50,
    damping: 30,
  });

  const display = useTransform(spring, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  useEffect(() => {
    const unsubscribe = display.on("change", (latest) => {
      setDisplayValue(latest);
    });
    return unsubscribe;
  }, [display]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue}{suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 px-6 bg-[#080808]">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#c45a32] to-transparent opacity-50" />
     
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 text-center">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative group"
            >
              <div className="font-[family-name:var(--font-display)] text-[clamp(3rem,6vw,5rem)] font-bold text-[#f5f2ed] mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>

              <div className="text-[#6b6b6b] uppercase tracking-[0.15em] text-sm">
                {stat.label}
              </div>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.15 }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-[#c45a32] origin-center mt-4"
              />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#c45a32] to-transparent opacity-50" />
    </section>
  );
}