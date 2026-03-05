"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import CornerAccent from "./ui/CornerAccent";

export default function Hero() {
  const [displayText, setDisplayText] = useState("");
  const fullText = "WATCH HOW WE CONTROL THE NARRATIVE";
  const [showAuthor, setShowAuthor] = useState(false);
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    const timer = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(timer);
        setTimeout(() => setShowAuthor(true), 300);
        setTimeout(() => setShowScroll(true), 1000);
      }
    }, 50);

    return () => clearInterval(timer);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-[#0d0d0d] to-[#080808]" />
     
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(245,242,237,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(245,242,237,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <motion.div
        className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(196,90,50,0.15) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-5xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[#c45a32] uppercase tracking-[0.3em] text-sm mb-8 font-medium"
        >
          The Intellectual Operating System
        </motion.p>

        <h1
          className="font-[family-name:var(--font-display)] text-[clamp(2rem,6vw,5rem)] font-bold tracking-tight leading-[1.1] mb-8"
        >
          {displayText}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="inline-block w-[3px] h-[1em] bg-[#c45a32] ml-2 align-middle"
          />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={showAuthor ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-[#6b6b6b] text-xl tracking-wide font-[family-name:var(--font-display)]"
        >
          — Omar Al-Sudani
        </motion.p>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={showScroll ? { opacity: 1 } : {}}
        onClick={scrollToContent}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer group"
      >
        <span className="text-xs uppercase tracking-[0.2em] text-[#6b6b6b] group-hover:text-[#c45a32] transition-colors">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-[#6b6b6b] rounded-full flex justify-center pt-2 group-hover:border-[#c45a32] transition-colors"
        >
          <motion.div className="w-1 h-2 bg-[#c45a32] rounded-full" />
        </motion.div>
      </motion.button>

      <CornerAccent position="top-left" />
      <CornerAccent position="bottom-right" />
    </section>
  );
}