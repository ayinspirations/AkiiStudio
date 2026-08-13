"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { List, X } from "@phosphor-icons/react";
import { navLinks, ctaLabel } from "@/lib/content";
import { MagneticButton } from "@/components/MagneticButton";

type HeroNavProps = {
  visible: boolean;
};

const EASE = [0.16, 1, 0.3, 1] as const;

export function HeroNav({ visible }: HeroNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notchOpen, setNotchOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -24 }}
        animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: -24 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="pointer-events-none absolute inset-x-0 top-4 z-40 sm:top-6"
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <a
            href="#top"
            className="pointer-events-auto text-[15px] font-semibold tracking-tight text-slate-900 sm:text-base"
          >
            Akii<span className="text-volt-dim">Studio</span>
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Menü öffnen"
            className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-slate-900 shadow-[0_8px_24px_-12px_rgba(15,23,20,0.3)] backdrop-blur-xl transition-colors duration-300 hover:bg-white/90"
          >
            <List weight="regular" className="h-5 w-5" />
          </button>
        </div>

        {/* Dynamic-island style notch: a small pill that unfolds into the
            nav links on hover, centered above everything else. */}
        <div className="pointer-events-none absolute inset-x-0 top-0 hidden justify-center lg:flex">
          <motion.nav
            layout
            onHoverStart={() => setNotchOpen(true)}
            onHoverEnd={() => setNotchOpen(false)}
            transition={{ layout: { duration: 0.5, ease: EASE } }}
            className={`pointer-events-auto flex items-center justify-center overflow-hidden bg-slate-900/95 shadow-[0_16px_40px_-14px_rgba(0,0,0,0.55)] backdrop-blur-xl ${
              notchOpen ? "h-14 w-[min(92vw,36rem)] rounded-[28px]" : "h-9 w-32 rounded-full"
            }`}
          >
            <AnimatePresence mode="wait" initial={false}>
              {notchOpen ? (
                <motion.div
                  key="open"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.18, duration: 0.25 } }}
                  exit={{ opacity: 0, transition: { duration: 0.1 } }}
                  className="flex items-center justify-center gap-6 px-6"
                >
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="whitespace-nowrap text-sm text-white/80 transition-colors duration-300 hover:text-white"
                    >
                      {link.label}
                    </a>
                  ))}
                  <MagneticButton href="#kontakt" className="ml-1 text-[13px]">
                    {ctaLabel}
                  </MagneticButton>
                </motion.div>
              ) : (
                <motion.div
                  key="closed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.15, duration: 0.2 } }}
                  exit={{ opacity: 0, transition: { duration: 0.1 } }}
                  className="h-1.5 w-8 rounded-full bg-white/25"
                />
              )}
            </AnimatePresence>
          </motion.nav>
        </div>
      </motion.div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-0 z-50 flex flex-col bg-white/95 backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between px-6 pt-6">
              <span className="text-[15px] font-semibold tracking-tight text-slate-900">
                Akii<span className="text-volt-dim">Studio</span>
              </span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Menü schließen"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-black/5 text-slate-900"
              >
                <X weight="regular" className="h-5 w-5" />
              </button>
            </div>

            <div className="flex flex-1 flex-col items-start justify-center gap-2 px-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.06, ease: EASE }}
                  className="py-2 text-4xl font-medium tracking-tight text-slate-900"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            <div className="px-8 pb-10">
              <MagneticButton href="#kontakt" className="w-full justify-between">
                {ctaLabel}
              </MagneticButton>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
