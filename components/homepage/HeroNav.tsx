"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { List, X } from "@phosphor-icons/react";
import { navLinks, ctaLabel } from "@/lib/content";
import { MagneticButton } from "@/components/MagneticButton";

type HeroNavProps = {
  visible: boolean;
};

export function HeroNav({ visible }: HeroNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -24 }}
        animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: -24 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute inset-x-0 top-4 z-40 flex justify-center px-4 sm:top-6"
      >
        <nav className="pointer-events-auto flex w-full max-w-3xl items-center justify-between gap-4 rounded-full border border-black/10 bg-white/70 py-2 pl-5 pr-2 shadow-[0_8px_30px_-12px_rgba(15,23,20,0.25)] backdrop-blur-xl">
          <a href="#top" className="text-[15px] font-semibold tracking-tight text-slate-900">
            Akii<span className="text-volt-dim">Studio</span>
          </a>

          <div className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-slate-600 transition-colors duration-300 hover:text-slate-900"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:block">
            <MagneticButton href="#kontakt" className="text-[13px]">
              {ctaLabel}
            </MagneticButton>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Menü öffnen"
            className="flex h-10 w-10 items-center justify-center rounded-full text-slate-900 lg:hidden"
          >
            <List weight="regular" className="h-5 w-5" />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-0 z-50 flex flex-col bg-white/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex items-center justify-between px-6 pt-6">
              <span className="text-[15px] font-semibold tracking-tight text-slate-900">
                Akii<span className="text-volt-dim">Studio</span>
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
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
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
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
