"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import type { RefObject } from "react";

type ParallaxBackgroundProps = {
  targetRef: RefObject<HTMLElement | null>;
  src: string;
  alt?: string;
  priority?: boolean;
  /** How much slower the background travels than the scroll, ~0.3-0.5 */
  factor?: number;
};

export function ParallaxBackground({
  targetRef,
  src,
  alt = "",
  priority = false,
  factor = 0.4,
}: ParallaxBackgroundProps) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });
  const range = factor * 30;
  const y = useTransform(scrollYProgress, [0, 1], [`-${range}%`, `${range}%`]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div style={{ y }} className="absolute -inset-x-0 -top-[15%] -bottom-[15%]">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
    </div>
  );
}
