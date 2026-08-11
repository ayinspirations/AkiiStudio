"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { AvatarCompanion } from "./AvatarCompanion";
import { GAZE_ANGLES } from "./gazeAngles";
import { HeroNav } from "./HeroNav";
import { MagneticButton } from "@/components/MagneticButton";
import { useHeroSequence } from "@/hooks/useHeroSequence";
import { useIdleLook } from "@/hooks/useIdleLook";

const tiles = [{ label: "5+ Jahre Erfahrung" }, { label: "30+ Projekte" }];

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const [avatarReady, setAvatarReady] = useState(false);
  const sequence = useHeroSequence(avatarReady);
  const idleLook = useIdleLook(avatarRef, sequence.idle);
  const { yaw, pitch } = sequence.idle ? idleLook : GAZE_ANGLES[sequence.gaze];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55, 1], [1, 1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -110]);

  return (
    <section id="top" ref={sectionRef} className="relative h-[100dvh] w-full overflow-hidden">
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="absolute inset-0 z-10 flex flex-col"
      >
        <HeroNav visible={sequence.showNav} />

        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center gap-4 px-6 pt-20 sm:gap-8 sm:pt-24 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:pt-0">
          <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
            <AnimatePresence>
              {sequence.showLogo ? (
                <motion.div
                  initial={{ opacity: 0, y: -28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl lg:text-3xl"
                >
                  Akii <span className="text-volt-dim">Studio</span>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <AnimatePresence>
              {sequence.showText ? (
                <motion.h1
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="mt-3 max-w-xl text-balance text-[28px] font-medium leading-[1.1] tracking-tighter text-slate-900 sm:mt-6 sm:text-4xl lg:text-5xl"
                >
                  Digitale Produkte, die gefunden, geliebt, genutzt werden.
                </motion.h1>
              ) : null}
            </AnimatePresence>

            <AnimatePresence>
              {sequence.showText ? (
                <motion.p
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                  className="mt-2 max-w-md text-sm leading-relaxed text-slate-600 sm:mt-5 sm:text-base lg:text-lg"
                >
                  AkiiStudio verbindet Webdesign, SEO, SaaS-Entwicklung und KI-Agenten in einem
                  Team – für Marken, die schneller wachsen wollen.
                </motion.p>
              ) : null}
            </AnimatePresence>

            <AnimatePresence>
              {sequence.showCta ? (
                <motion.div
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="mt-4 sm:mt-9"
                >
                  <MagneticButton href="#leistungen">Projekt starten</MagneticButton>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          <div className="relative flex flex-1 items-center justify-center pb-8 sm:pb-0">
            <AvatarCompanion
              ref={avatarRef}
              targetYaw={yaw}
              targetPitch={pitch}
              onReady={() => setAvatarReady(true)}
              className="h-28 w-28 sm:h-44 sm:w-44 lg:h-64 lg:w-64"
            />

            <AnimatePresence>
              {sequence.showTiles ? (
                <div className="pointer-events-none absolute bottom-0 right-0 flex flex-row gap-2 sm:-bottom-4 sm:flex-col sm:gap-3 sm:right-2">
                  {tiles.map((tile, i) => (
                    <motion.div
                      key={tile.label}
                      initial={{ opacity: 0, y: 20, scale: 0.94 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.6, delay: i * 0.12, ease: EASE }}
                      className="whitespace-nowrap rounded-2xl border border-black/10 bg-white/80 px-3 py-1.5 text-xs font-medium text-slate-800 shadow-[0_16px_40px_-18px_rgba(15,23,20,0.35)] backdrop-blur-xl sm:px-4 sm:py-2.5 sm:text-sm"
                    >
                      {tile.label}
                    </motion.div>
                  ))}
                </div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
