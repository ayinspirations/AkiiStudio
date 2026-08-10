"use client";

import { motion } from "motion/react";
import { Browser, ChartLineUp, Robot, type IconProps } from "@phosphor-icons/react";
import { workItems } from "@/lib/content";

const cardOffsets = ["lg:-rotate-2 lg:translate-y-4", "lg:rotate-1 lg:-translate-y-3", "lg:-rotate-1 lg:translate-y-6"];
const tileIcons: Record<string, React.ComponentType<IconProps>> = {
  "ecommerce-relaunch": Browser,
  "saas-dashboard": ChartLineUp,
  "support-agent": Robot,
};

export function Work() {
  return (
    <section id="arbeiten" className="border-t border-hairline px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-14 max-w-2xl">
          <p className="mb-4 inline-flex items-center rounded-full border border-hairline px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-muted-strong">
            Ausgewählte Arbeiten
          </p>
          <h2 className="text-balance text-3xl font-medium tracking-tight sm:text-4xl md:text-5xl">
            Konzepte, die zeigen, wie wir denken.
          </h2>
        </div>

        {/*
          Platzhalter-Projekte zur Veranschaulichung des Layouts.
          Vor dem Launch durch echte Case Studies (Screenshots + Ergebnisse) ersetzen.
        */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-6">
          {workItems.map((item, i) => {
            const Icon = tileIcons[item.id];
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`group rounded-[2rem] border border-hairline bg-white/[0.03] p-1.5 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:!rotate-0 hover:!translate-y-0 ${cardOffsets[i % cardOffsets.length]}`}
              >
                <div className="overflow-hidden rounded-[calc(2rem-0.375rem)] bg-surface-raised shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                  <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden bg-[radial-gradient(120%_120%_at_15%_10%,rgba(57,255,176,0.16),transparent_55%),radial-gradient(100%_100%_at_85%_90%,rgba(57,255,176,0.08),transparent_50%)]">
                    <div
                      aria-hidden
                      className="absolute inset-0 opacity-[0.06]"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                      }}
                    />
                    {Icon ? (
                      <Icon
                        weight="thin"
                        className="relative h-24 w-24 text-white/10 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-110 group-hover:text-volt/25"
                      />
                    ) : null}
                  </div>
                  <div className="p-6">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-volt">{item.category}</p>
                    <h3 className="mt-3 text-lg font-medium tracking-tight">{item.title}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-muted-strong">{item.body}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
