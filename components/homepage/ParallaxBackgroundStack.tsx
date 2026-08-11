"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import type { RefObject } from "react";

type ParallaxBackgroundStackProps = {
  containerRef: RefObject<HTMLElement | null>;
  sources: string[];
  /** How much slower the background travels than the scroll, ~0.3-0.5 */
  factor?: number;
};

// How much of the total scroll range (0-1) each crossfade dissolve spans.
const OVERLAP = 0.07;

function buildOpacityRange(index: number, count: number, boundaries: number[]) {
  const start = boundaries[index];
  const end = boundaries[index + 1];
  const isFirst = index === 0;
  const isLast = index === count - 1;

  if (isFirst && isLast) {
    return { input: [0, 1], output: [1, 1] };
  }

  const input: number[] = [];
  const output: number[] = [];

  if (!isFirst) {
    input.push(start - OVERLAP, start + OVERLAP);
    output.push(0, 1);
  }
  if (!isLast) {
    input.push(end - OVERLAP, end + OVERLAP);
    output.push(1, 0);
  }

  if (isFirst) {
    input.unshift(0);
    output.unshift(1);
  }
  if (isLast) {
    input.push(1);
    output.push(1);
  }

  return { input, output };
}

function ParallaxLayer({
  src,
  index,
  count,
  boundaries,
  scrollYProgress,
  factor,
  priority,
}: {
  src: string;
  index: number;
  count: number;
  boundaries: number[];
  scrollYProgress: MotionValue<number>;
  factor: number;
  priority: boolean;
}) {
  const { input, output } = buildOpacityRange(index, count, boundaries);
  const opacity = useTransform(scrollYProgress, input, output);

  const range = factor * 30;
  const y = useTransform(
    scrollYProgress,
    [boundaries[index], boundaries[index + 1]],
    [`-${range}%`, `${range}%`],
  );

  return (
    <motion.div style={{ opacity }} className="absolute inset-0">
      <motion.div style={{ y }} className="absolute inset-x-0 -top-[20%] -bottom-[20%]">
        <Image src={src} alt="" fill priority={priority} sizes="100vw" className="object-cover" />
      </motion.div>
    </motion.div>
  );
}

/**
 * Renders every section background as a fixed, viewport-filling stack and
 * cross-dissolves between neighbours as the page scrolls, instead of hard
 * cutting at each section boundary. Each layer also gets its own slow
 * parallax drift within its own active scroll range.
 */
export function ParallaxBackgroundStack({
  containerRef,
  sources,
  factor = 0.35,
}: ParallaxBackgroundStackProps) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const count = sources.length;
  const boundaries = Array.from({ length: count + 1 }, (_, i) => i / count);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {sources.map((src, i) => (
        <ParallaxLayer
          key={src}
          src={src}
          index={i}
          count={count}
          boundaries={boundaries}
          scrollYProgress={scrollYProgress}
          factor={factor}
          priority={i === 0}
        />
      ))}
    </div>
  );
}
