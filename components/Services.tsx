"use client";

import { motion } from "motion/react";
import { PenNib, MagnifyingGlass, Cube, Robot, type IconProps } from "@phosphor-icons/react";
import { services } from "@/lib/content";

const icons: Record<string, React.ComponentType<IconProps>> = {
  PenNib,
  MagnifyingGlass,
  Cube,
  Robot,
};

export function Services() {
  return (
    <section id="leistungen" className="px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-14 max-w-2xl">
          <p className="mb-4 inline-flex items-center rounded-full border border-hairline px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-muted-strong">
            Leistungen
          </p>
          <h2 className="text-balance text-3xl font-medium tracking-tight sm:text-4xl md:text-5xl">
            Vier Disziplinen, ein Team.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
          {services.map((service, i) => {
            const Icon = icons[service.icon];
            const isLarge = service.span === "lg";
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className={`rounded-[2rem] border border-hairline bg-white/[0.03] p-1.5 ${
                  isLarge ? "md:col-span-8" : "md:col-span-4"
                }`}
              >
                <div
                  className="relative flex h-full flex-col justify-between overflow-hidden rounded-[calc(2rem-0.375rem)] bg-surface-raised p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:p-10"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-volt/10 blur-3xl"
                    style={{ opacity: isLarge ? 1 : 0.5 }}
                  />
                  <div className="relative">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-volt/10 text-volt">
                      {Icon ? <Icon weight="light" className="h-6 w-6" /> : null}
                    </span>
                    <h3 className="mt-6 text-xl font-medium tracking-tight sm:text-2xl">
                      {service.headline}
                    </h3>
                    <p className="mt-3 max-w-[42ch] text-[15px] leading-relaxed text-muted-strong">
                      {service.body}
                    </p>
                  </div>
                  <p className="relative mt-8 text-[11px] uppercase tracking-[0.18em] text-muted">
                    {service.title}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
