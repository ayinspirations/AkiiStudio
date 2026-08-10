"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { PenNib, MagnifyingGlass, Cube, Robot } from "@phosphor-icons/react";
import { MagneticButton } from "./MagneticButton";

const stackItems = [
  { icon: PenNib, label: "Webdesign", offset: "top-0 left-4 sm:left-10", rotate: -6, delay: 0 },
  { icon: MagnifyingGlass, label: "SEO", offset: "top-16 right-0 sm:right-4", rotate: 4, delay: 0.08 },
  { icon: Cube, label: "SaaS", offset: "bottom-24 left-0", rotate: 3, delay: 0.16 },
  { icon: Robot, label: "KI-Agenten", offset: "bottom-0 right-6 sm:right-12", rotate: -4, delay: 0.24 },
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [6, -6]), {
    stiffness: 120,
    damping: 16,
  });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-6, 6]), {
    stiffness: 120,
    damping: 16,
  });

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width - 0.5);
    py.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function handlePointerLeave() {
    px.set(0);
    py.set(0);
  }

  return (
    <section id="top" className="mesh-glow relative flex min-h-[100dvh] flex-col justify-center px-4 pt-24 pb-12 sm:px-6 lg:px-10">
      <div className="mx-auto grid w-full max-w-[1400px] items-center gap-16 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-hairline bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-muted-strong"
          >
            Webdesign · SEO · SaaS · KI-Agenten
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-balance text-4xl font-medium leading-[1.05] tracking-tighter sm:text-5xl lg:text-6xl"
          >
            Digitale Produkte, die gefunden, geliebt, genutzt werden.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-[46ch] text-base leading-relaxed text-muted-strong sm:text-lg"
          >
            AkiiStudio verbindet Webdesign, SEO, SaaS-Entwicklung und KI-Agenten in
            einem Team – für Marken, die schneller wachsen wollen.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <MagneticButton href="#kontakt">Projekt starten</MagneticButton>
            <MagneticButton href="#arbeiten" variant="ghost">
              Arbeiten ansehen
            </MagneticButton>
          </motion.div>
        </div>

        <div
          ref={ref}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className="relative hidden h-[420px] [perspective:1200px] lg:col-span-4 lg:block"
        >
          <motion.div
            style={{ rotateX, rotateY }}
            className="relative h-full w-full [transform-style:preserve-3d]"
          >
            {stackItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.3 + item.delay, ease: [0.16, 1, 0.3, 1] }}
                style={{ rotate: item.rotate }}
                className={`absolute flex w-48 items-center gap-3 rounded-2xl border border-hairline-strong bg-surface-raised/80 p-4 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl ${item.offset}`}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-volt/10 text-volt">
                  <item.icon weight="light" className="h-5 w-5" />
                </span>
                <span className="text-sm font-medium text-paper">{item.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
