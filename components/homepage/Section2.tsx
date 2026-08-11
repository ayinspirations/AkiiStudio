"use client";

import { motion } from "motion/react";
import { ParallaxSection } from "./ParallaxSection";

export function Section2() {
  return (
    <ParallaxSection id="leistungen">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-[11px] uppercase tracking-[0.28em] text-slate-500"
      >
        Leistungen
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="mt-4 max-w-2xl text-balance text-3xl font-medium leading-tight tracking-tight text-slate-900 sm:text-5xl"
      >
        Ideen, die über den Wolken beginnen.
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="mt-5 max-w-md text-base leading-relaxed text-slate-600"
      >
        Webdesign, SEO, SaaS-Entwicklung und KI-Agenten – gebündelt in einem Team.
      </motion.p>
    </ParallaxSection>
  );
}
