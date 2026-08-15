"use client";

import { ArrowRight } from "@phosphor-icons/react";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  /** "outline" is the reference's hairline pill; "solid" is for the form. */
  variant?: "outline" | "solid";
  className?: string;
};

/**
 * Hairline pill. The arrow steps forward on hover, which is the only
 * feedback the control needs at this weight.
 */
export function Button({
  href,
  children,
  variant = "outline",
  className = "",
}: ButtonProps) {
  const skin =
    variant === "outline"
      ? "border border-hairline-strong text-ink hover:border-ink"
      : "border border-olive bg-olive text-bright hover:bg-olive-bright hover:border-olive-bright";

  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm transition-colors duration-500 ease-[var(--ease-fluid)] active:scale-[0.98] ${skin} ${className}`}
    >
      <span className="whitespace-nowrap">{children}</span>
      <ArrowRight
        weight="light"
        aria-hidden
        className="h-4 w-4 shrink-0 transition-transform duration-500 ease-[var(--ease-fluid)] group-hover:translate-x-1"
      />
    </a>
  );
}
