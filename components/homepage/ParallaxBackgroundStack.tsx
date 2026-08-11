"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import type { RefObject } from "react";

type ParallaxBackgroundStackProps = {
  containerRef: RefObject<HTMLElement | null>;
  sources: string[];
  /** How much slower the background travels than the scroll, ~0.3-0.5 */
  factor?: number;
  /**
   * Optional custom scroll-progress boundaries (length sources.length + 1,
   * monotonic 0→1) giving each layer a different share of the total scroll
   * instead of splitting it evenly — e.g. letting the first couple of
   * images lingerer longer. Defaults to an even split.
   */
  boundaries?: number[];
};

// How far into each layer's own zone (on each side) the crossfade dissolve
// extends, as a fraction of that zone's width. Kept close to the 0.5 limit
// (at which a zone is blending for its entire span, with just an instant of
// full clarity at its center) so the whole journey reads as one continuous,
// unbroken dissolve rather than a series of distinct "transition moments".
const OVERLAP_FRACTION_OF_ZONE = 0.47;

function buildOpacityRange(index: number, count: number, boundaries: number[]) {
  const start = boundaries[index];
  const end = boundaries[index + 1];
  const overlap = (end - start) * OVERLAP_FRACTION_OF_ZONE;
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

  // Scrolling down should drift the background upward, at a slower rate
  // than the foreground content — the classic parallax "lag", not a
  // background that appears to scroll along with the page.
  const range = factor * 16;
  const y = useTransform(
    scrollYProgress,
    [boundaries[index], boundaries[index + 1]],
    [`${range}%`, `-${range}%`],
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
 * parallax drift (upward, slower than the scroll) within its own active
 * scroll range.
 */
export function ParallaxBackgroundStack({
  containerRef,
  sources,
  factor = 0.35,
  boundaries,
}: ParallaxBackgroundStackProps) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const count = sources.length;
  const resolvedBoundaries =
    boundaries ?? Array.from({ length: count + 1 }, (_, i) => i / count);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {sources.map((src, i) => (
        <ParallaxLayer
          key={src}
          src={src}
          index={i}
          count={count}
          boundaries={resolvedBoundaries}
          scrollYProgress={scrollYProgress}
          factor={factor}
          priority={i === 0}
        />
      ))}
    </div>
  );
}
