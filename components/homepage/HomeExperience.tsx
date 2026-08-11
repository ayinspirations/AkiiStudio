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

export function HomeExperience() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative">
      <ParallaxBackgroundStack containerRef={containerRef} sources={BACKGROUNDS} />
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
