"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { Logo } from "@/components/Logo";
import { ctaLabel, legalLinks, navLinks, site } from "@/lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  // Reading the motion value keeps the scroll subscription off the render
  // path; state flips once, at the threshold, not on every frame.
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const trigger = triggerRef.current;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
      // Send focus back to the control that opened the panel.
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-700 ease-[var(--ease-fluid)] ${
          scrolled && !open ? "bg-paper/80 backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 w-full max-w-[92rem] items-center justify-between px-6 sm:px-10 lg:px-14">
          <a
            href="#top"
            className="text-ink transition-opacity duration-300 hover:opacity-60"
          >
            <Logo />
          </a>

          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            className="-mr-2 flex h-11 w-11 items-center justify-center text-ink"
          >
            {/* Two rules that cross into an X, so the control reads as one
                object changing state rather than two swapped icons. */}
            <span className="relative block h-3 w-6">
              <motion.span
                animate={
                  open ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }
                }
                transition={{ duration: reduceMotion ? 0 : 0.5, ease: EASE }}
                className="absolute inset-x-0 top-0 block h-px origin-center bg-current"
              />
              <motion.span
                animate={
                  open ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }
                }
                transition={{ duration: reduceMotion ? 0 : 0.5, ease: EASE }}
                className="absolute inset-x-0 bottom-0 block h-px origin-center bg-current"
              />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="menu"
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            initial={reduceMotion ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={
              reduceMotion ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }
            }
            exit={
              reduceMotion ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }
            }
            transition={{ duration: reduceMotion ? 0.2 : 0.8, ease: EASE }}
            className="fixed inset-0 z-40 bg-paper outline-none"
          >
            <div className="mx-auto flex h-full w-full max-w-[92rem] flex-col justify-between px-6 pb-12 pt-32 sm:px-10 lg:px-14">
              <nav aria-label="Hauptnavigation">
                <ul>
                  {navLinks.map((link, index) => (
                    <motion.li
                      key={link.href}
                      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.7,
                        delay: 0.18 + index * 0.07,
                        ease: EASE,
                      }}
                      className="border-b border-hairline"
                    >
                      <a
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="display block py-5 text-[2.25rem] text-ink transition-colors duration-300 hover:text-olive sm:py-7 sm:text-[3.5rem] lg:text-[4.5rem]"
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <motion.div
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
                className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
              >
                <div>
                  <p className="text-sm text-soft">{ctaLabel}</p>
                  <a
                    href={`mailto:${site.email}`}
                    onClick={() => setOpen(false)}
                    className="display-sm mt-1 block text-xl text-ink transition-colors duration-300 hover:text-olive sm:text-2xl"
                  >
                    {site.email}
                  </a>
                </div>

                <ul className="flex gap-6">
                  {legalLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="text-sm text-soft transition-colors duration-300 hover:text-ink"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
