"use client";

import { motion } from "motion/react";
import { ParallaxSection } from "./ParallaxSection";
import { MagneticButton } from "@/components/MagneticButton";

export function Section5() {
  return (
    <ParallaxSection id="faq">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-[11px] uppercase tracking-[0.28em] text-slate-300/80"
      >
        FAQ
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="mt-4 max-w-2xl text-balance text-3xl font-medium leading-tight tracking-tight text-white sm:text-5xl"
      >
        Fragen? Wir sind ganz Ohr.
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="mt-5 max-w-md text-base leading-relaxed text-slate-300/85"
      >
        Schreibt uns – wir melden uns innerhalb eines Werktags zurück.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="mt-9"
      >
        <MagneticButton href="#kontakt">Projekt starten</MagneticButton>
      </motion.div>
    </ParallaxSection>
  );
}
