"use client";

import { useRef } from "react";
import { ParallaxBackgroundStack } from "./ParallaxBackgroundStack";
import { Hero } from "./Hero";
import { Section2 } from "./Section2";
import { Section3 } from "./Section3";
import { Section4 } from "./Section4";
import { Section5 } from "./Section5";

const BACKGROUNDS = [
  "/background/Hero_cloud.png",
  "/background/cloud_section2.png",
  "/background/cloud_section3.png",
  "/background/cloud_section4.png",
  "/background/cloud_section5.png",
];

// The sky feels best lingering — give the first two backgrounds a larger
// share of the scroll than the four sections would get split evenly (20%
// each); the forest images that follow can each take a slightly smaller,
// even share of what's left.
const BACKGROUND_BOUNDARIES = [0, 0.28, 0.52, 0.68, 0.84, 1];

export function HomeExperience() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative">
      <ParallaxBackgroundStack
        containerRef={containerRef}
        sources={BACKGROUNDS}
        boundaries={BACKGROUND_BOUNDARIES}
      />
      <main className="relative z-10">
        <Hero />
        <Section2 />
        <Section3 />
        <Section4 />
        <Section5 />
      </main>
    </div>
  );
}
