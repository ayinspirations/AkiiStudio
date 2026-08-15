"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

type RevealProps = {
  children: React.ReactNode;
  /** Stagger offset in seconds, for sequencing siblings. */
  delay?: number;
  as?: "div" | "li" | "section" | "article";
  className?: string;
};

/**
 * Latches to visible the first time the element is seen, and treats anything
 * already scrolled past as seen. Without that second check, restoring a
 * scroll position or following a deep link would leave content above the
 * viewport stranded at zero opacity.
 */
function useSeen(ref: React.RefObject<HTMLElement | null>) {
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;

    if (el.getBoundingClientRect().top < window.innerHeight * 0.85) {
      setSeen(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, seen]);

  return seen;
}

/**
 * Entry reveal for content arriving on scroll. It sequences reading order so
 * the eye lands on a section's headline before its detail, and collapses to a
 * plain static render when reduced motion is requested.
 */
export function Reveal({
  children,
  delay = 0,
  as = "div",
  className = "",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const seen = useSeen(ref);
  const Component = motion[as];

  return (
    <Component
      ref={ref as React.Ref<never>}
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      animate={seen || reduceMotion ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </Component>
  );
}
