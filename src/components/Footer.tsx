"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000);
    } else {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2000);
    }
  };

  return (
    <footer ref={ref} className="relative py-24 px-6 bg-[#0d0d0d]">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#2a2a2a] to-transparent" />

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2.5rem)] font-bold mb-4">
            Stay Connected
          </h2>
          <p className="text-[#6b6b6b] text-lg max-w-md mx-auto mb-8">
            Join the journey. Get updates on new publications, projects, and ideas.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <div className="relative flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className={`w-full px-6 py-4 bg-[#080808] border text-[#f5f2ed] placeholder-[#4a4a4a] focus:outline-none focus:border-[#c45a32] transition-colors ${
                  status === "error" ? "border-red-500 animate-shake" : "border-[#2a2a2a]"
                }`}
              />
            </div>
            <button
              type="submit"
              className="px-8 py-4 bg-[#c45a32] text-[#f5f2ed] font-[family-name:var(--font-display)] font-semibold uppercase tracking-wider text-sm hover:bg-[#e8734a] transition-colors"
            >
              {status === "success" ? "✓" : "Subscribe"}
            </button>
          </form>
        </motion.div>

        <div className="w-full h-[1px] bg-[#1a1a1a] mb-12" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight">
              <span className="text-[#c45a32]">ONE</span>STEP<span className="text-[#c45a32]">TO</span>GOOD
            </div>
            <p className="text-[#6b6b6b] text-sm mt-2">
              The Intellectual Operating System
            </p>
          </motion.div>

          <motion.nav
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex gap-8"
          >
            {["Publications", "Music", "Film", "Contact"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-[#6b6b6b] hover:text-[#c45a32] transition-colors text-sm uppercase tracking-wider"
              >
                {link}
              </a>
            ))}
          </motion.nav>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex gap-4"
          >
            {["Twitter", "LinkedIn", "Instagram"].map((social) => (
              <a
                key={social}
                href="#"
                className="w-10 h-10 border border-[#2a2a2a] flex items-center justify-center text-[#6b6b6b] hover:border-[#c45a32] hover:text-[#c45a32] transition-colors"
              >
                {social[0]}
              </a>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12 pt-8 border-t border-[#1a1a1a]"
        >
          <p className="text-[#4a4a4a] text-sm">
            © {new Date().getFullYear()} One Step to Good. All rights reserved.
          </p>
        </motion.div>
      </div>

      <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-[#c45a32] opacity-30" />
    </footer>
  );
}