"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Atrium } from "@/components/Atrium";
import { Button } from "@/components/Button";
import { hero } from "@/lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  // The room drifts slower than the page, so the text lifts away from it.
  const sceneY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  const rise = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: EASE },
  });

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative min-h-[100dvh] overflow-hidden"
    >
      {/* The interior sits behind the copy on small screens and beside it
          from lg up, where it takes the right half and bleeds off-canvas. */}
      <motion.div
        style={reduceMotion ? undefined : { y: sceneY }}
        className="absolute inset-x-0 bottom-0 top-[58%] lg:inset-y-0 lg:left-[42%] lg:right-0 lg:top-0"
      >
        <Atrium className="h-full w-full lg:rounded-l-[var(--radius-media)]" />
      </motion.div>

      {/* On small screens the copy needs a readable ground over the scene. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-[44%] h-[20%] bg-gradient-to-b from-paper to-transparent lg:hidden"
      />

      <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-[92rem] flex-col justify-center px-6 pb-[46%] pt-24 sm:px-10 lg:px-14 lg:pb-24">
        <div className="max-w-[34rem]">
          <motion.h1
            {...rise(0.1)}
            className="display text-balance text-[2.5rem] text-ink sm:text-[3.25rem] lg:text-[4rem]"
          >
            {hero.headline}
          </motion.h1>

          <motion.p
            {...rise(0.24)}
            className="mt-7 max-w-[30rem] text-pretty leading-relaxed text-soft"
          >
            {hero.body}
          </motion.p>

          <motion.div {...rise(0.38)} className="mt-10">
            <Button href={hero.cta.href}>{hero.cta.label}</Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
