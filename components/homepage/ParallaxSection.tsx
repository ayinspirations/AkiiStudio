"use client";

import { useRef, type ReactNode } from "react";
import { ParallaxBackground } from "./ParallaxBackground";

type ParallaxSectionProps = {
  id: string;
  bgSrc: string;
  factor?: number;
  priority?: boolean;
  /** Hex color blended in at the bottom edge to smooth the seam with the next section */
  overlayColor?: string;
  overlayHeight?: string;
  className?: string;
  children?: ReactNode;
};

export function ParallaxSection({
  id,
  bgSrc,
  factor = 0.4,
  priority = false,
  overlayColor,
  overlayHeight = "26vh",
  className = "",
  children,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLElement>(null);

  return (
    <section
      id={id}
      ref={ref}
      className={`relative min-h-screen w-full overflow-hidden ${className}`}
    >
      <ParallaxBackground targetRef={ref} src={bgSrc} factor={factor} priority={priority} />

      {overlayColor ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[1]"
          style={{
            height: overlayHeight,
            background: `linear-gradient(to bottom, transparent, ${overlayColor})`,
          }}
        />
      ) : null}

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center">
        {children}
      </div>
    </section>
  );
}
