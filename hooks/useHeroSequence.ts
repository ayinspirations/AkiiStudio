"use client";

import { useEffect, useState } from "react";
import type { GazeName } from "@/components/homepage/gazeAngles";

export type HeroSequenceState = {
  gaze: GazeName;
  showLogo: boolean;
  showNav: boolean;
  showText: boolean;
  showCta: boolean;
  showTiles: boolean;
  idle: boolean;
};

const INITIAL_STATE: HeroSequenceState = {
  gaze: "sleep",
  showLogo: false,
  showNav: false,
  showText: false,
  showCta: false,
  showTiles: false,
  idle: false,
};

const FINAL_STATE: HeroSequenceState = {
  gaze: "smile",
  showLogo: true,
  showNav: true,
  showText: true,
  showCta: true,
  showTiles: true,
  idle: true,
};

const STEPS: Array<{ delay: number; patch: Partial<HeroSequenceState> }> = [
  { delay: 0, patch: { gaze: "sleep" } },
  { delay: 800, patch: { gaze: "smile" } },
  { delay: 1400, patch: { gaze: "upper_left" } },
  { delay: 2000, patch: { showLogo: true } },
  { delay: 2700, patch: { gaze: "up" } },
  { delay: 3100, patch: { gaze: "upper_right" } },
  { delay: 3500, patch: { showNav: true } },
  { delay: 4300, patch: { gaze: "left" } },
  { delay: 4600, patch: { showText: true } },
  { delay: 5300, patch: { showCta: true } },
  { delay: 6000, patch: { gaze: "lower_right" } },
  { delay: 6300, patch: { showTiles: true } },
  { delay: 7100, patch: { gaze: "smile", idle: true } },
];

/**
 * `ready` gates when the timer chain starts. The avatar loads asynchronously
 * (a multi-MB 3D model), so starting the clock at mount rather than once the
 * avatar can actually be seen would let the sequence race ahead of it on a
 * slow connection or a cold dev-server compile.
 */
export function useHeroSequence(ready: boolean) {
  const [state, setState] = useState<HeroSequenceState>(INITIAL_STATE);

  useEffect(() => {
    if (!ready) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setState(FINAL_STATE);
      return;
    }

    const timers = STEPS.map(({ delay, patch }) =>
      window.setTimeout(() => {
        setState((prev) => ({ ...prev, ...patch }));
      }, delay),
    );

    return () => {
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [ready]);

  return state;
}
