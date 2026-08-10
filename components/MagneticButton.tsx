"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";

type MagneticButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
};

export function MagneticButton({
  href,
  children,
  variant = "primary",
  className = "",
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });

  function handlePointerMove(event: React.PointerEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = event.clientX - (rect.left + rect.width / 2);
    const relY = event.clientY - (rect.top + rect.height / 2);
    x.set(relX * 0.25);
    y.set(relY * 0.4);
  }

  function handlePointerLeave() {
    x.set(0);
    y.set(0);
  }

  const base =
    variant === "primary"
      ? "bg-volt text-volt-ink pl-6 pr-1.5 py-1.5"
      : "bg-white/5 text-paper pl-6 pr-1.5 py-1.5 ring-1 ring-hairline-strong";

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: springX, y: springY }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      whileTap={{ scale: 0.96 }}
      className={`group inline-flex items-center gap-3 rounded-full text-[15px] font-medium leading-none transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${base} ${className}`}
    >
      <span className="whitespace-nowrap">{children}</span>
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-105 ${
          variant === "primary" ? "bg-volt-ink/10" : "bg-white/10"
        }`}
      >
        <ArrowUpRight weight="regular" className="h-4 w-4" />
      </span>
    </motion.a>
  );
}
