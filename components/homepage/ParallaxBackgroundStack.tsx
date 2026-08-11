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

// How far into each section's own scroll range (on each side of a seam) the
// crossfade dissolve extends. Kept small so most of a section shows its own
// image cleanly and only a brief window around the seam actually blends.
const OVERLAP_FRACTION_OF_SECTION = 0.16;

function buildOpacityRange(index: number, count: number, boundaries: number[]) {
  const start = boundaries[index];
  const end = boundaries[index + 1];
  const overlap = (end - start) * OVERLAP_FRACTION_OF_SECTION;
  const isFirst = index === 0;
  const isLast = index === count - 1;

  if (isFirst && isLast) {
    return { input: [0, 1], output: [1, 1] };
  }

  const input: number[] = [];
  const output: number[] = [];

  if (!isFirst) {
    input.push(start - overlap, start + overlap);
    output.push(0, 1);
  }
  if (!isLast) {
    input.push(end - overlap, end + overlap);
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

  // Kept gentle on purpose: several of these photos (the cloud shots
  // especially) are mostly flat/featureless in their upper two-thirds with
  // all the texture near the bottom, so a large drift can scroll a layer
  // into its own blank area right as it needs to hand off to the next one.
  const range = factor * 12;
  const y = useTransform(
    scrollYProgress,
    [boundaries[index], boundaries[index + 1]],
    [`-${range}%`, `${range}%`],
  );

  return (
    <motion.div style={{ opacity }} className="absolute inset-0">
      <motion.div style={{ y }} className="absolute inset-x-0 -top-[25%] -bottom-[25%]">
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
