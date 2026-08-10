"use client";

import { motion } from "motion/react";
import { processSteps } from "@/lib/content";

export function Process() {
  return (
    <section id="prozess" className="border-t border-hairline px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-[1400px]">
        <h2 className="max-w-xl text-balance text-3xl font-medium tracking-tight sm:text-4xl md:text-5xl">
          So arbeiten wir zusammen.
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-4">
          {processSteps.map((step, i) => (
            <motion.div
              key={step.index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="border-t border-hairline-strong pt-6"
            >
              <span className="font-mono text-sm text-volt">{step.index}</span>
              <h3 className="mt-4 text-lg font-medium tracking-tight">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-strong">{step.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
