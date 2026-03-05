"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { INTELLECTUAL_PROPERTIES } from "@/lib/constants";
import SectionLabel from "./ui/SectionLabel";
import CornerAccent from "./ui/CornerAccent";

export default function IPShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
   
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % INTELLECTUAL_PROPERTIES.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const currentIP = INTELLECTUAL_PROPERTIES[currentIndex];

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % INTELLECTUAL_PROPERTIES.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + INTELLECTUAL_PROPERTIES.length) % INTELLECTUAL_PROPERTIES.length);
  };

  return (
    <section ref={ref} className="relative py-32 px-6 bg-[#080808] overflow-hidden">
      <motion.div
        className="absolute top-0 right-0 w-1/2 h-full opacity-10"
        style={{
          background: `radial-gradient(ellipse at top right, ${currentIP.color} 0%, transparent 60%)`,
        }}
        key={currentIP.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 0.8 }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <SectionLabel label="Explore" isInView={isInView} />
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight">
            Intellectual Properties
          </h2>
        </motion.div>

        <div
          className="grid lg:grid-cols-2 gap-12 items-center"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIP.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.5 }}
              >
                <div
                  className="inline-block px-4 py-2 text-xs uppercase tracking-[0.2em] font-medium mb-6"
                  style={{
                    background: `${currentIP.color}20`,
                    color: currentIP.color,
                    border: `1px solid ${currentIP.color}40`
                  }}
                >
                  {currentIP.category}
                </div>

                <h3 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3.5rem)] font-bold mb-6 leading-tight">
                  {currentIP.title}
                </h3>

                <p className="text-[#ebe6dc] text-lg leading-relaxed mb-8">
                  {currentIP.description}
                </p>

                <button
                  className="group inline-flex items-center gap-3 text-sm uppercase tracking-[0.15em] font-medium transition-colors"
                  style={{ color: currentIP.color }}
                >
                  <span>Explore</span>
                  <span className="transition-transform group-hover:translate-x-2">→</span>
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative aspect-[4/3] bg-[#0d0d0d] border border-[#1a1a1a] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIP.id}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${currentIP.color}10 0%, transparent 50%)`,
                }}
              >
                <div className="relative">
                  <div
                    className="w-32 h-32 border-2 rotate-45 transition-all duration-500"
                    style={{ borderColor: currentIP.color }}
                  />
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 transition-all duration-500"
                    style={{ background: currentIP.color }}
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            <CornerAccent position="top-left" size="sm" />
            <CornerAccent position="bottom-right" size="sm" />
          </div>
        </div>

        <div className="flex items-center justify-between mt-12">
          <div className="flex gap-4">
            <button
              onClick={goToPrev}
              className="w-12 h-12 border border-[#2a2a2a] flex items-center justify-center hover:border-[#c45a32] hover:text-[#c45a32] transition-colors"
            >
              ←
            </button>
            <button
              onClick={goToNext}
              className="w-12 h-12 border border-[#2a2a2a] flex items-center justify-center hover:border-[#c45a32] hover:text-[#c45a32] transition-colors"
            >
              →
            </button>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[#6b6b6b] text-sm font-mono">
              {String(currentIndex + 1).padStart(2, "0")} / {String(INTELLECTUAL_PROPERTIES.length).padStart(2, "0")}
            </span>
           
            <div className="flex gap-2">
              {INTELLECTUAL_PROPERTIES.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-[#c45a32] w-6"
                      : "bg-[#2a2a2a] hover:bg-[#4a4a4a]"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}