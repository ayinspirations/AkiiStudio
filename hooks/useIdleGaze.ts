"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import type { AvatarGaze } from "@/components/homepage/AvatarCompanion";

const DIRECTIONS: AvatarGaze[] = [
  "right",
  "lower_right",
  "down",
  "lower_left",
  "left",
  "upper_left",
  "up",
  "upper_right",
];

const SECTOR_DEG = 360 / DIRECTIONS.length;
const DEADZONE_PX = 48;
// Cursor must cross this far past a sector's edge before we switch to it,
// so hovering near a boundary doesn't flicker between two directions.
const HYSTERESIS_DEG = 10;
// Floor on how often the gaze can change, so a fast mouse sweep still reads
// as a deliberate look rather than a rapid-fire flip between frames.
const MIN_SWITCH_INTERVAL_MS = 110;

function angularDelta(a: number, b: number) {
  const diff = Math.abs(a - b) % 360;
  return diff > 180 ? 360 - diff : diff;
}

/**
 * Tracks the pointer and returns which of the 8 avatar gaze directions
 * the cursor currently sits in, relative to the avatar's own center.
 * Only listens while `active` is true (i.e. once the hero sequence is idle).
 */
export function useIdleGaze(avatarRef: RefObject<HTMLElement | null>, active: boolean) {
  const [gaze, setGaze] = useState<AvatarGaze>("smile");
  const currentIndexRef = useRef<number | null>(null);
  const lastSwitchRef = useRef(0);

  useEffect(() => {
    if (!active) return;
    currentIndexRef.current = null;

    let frame = 0;

    function handlePointerMove(event: PointerEvent) {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const el = avatarRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height / 2);
        const distance = Math.hypot(dx, dy);

        if (distance < DEADZONE_PX) {
          if (currentIndexRef.current !== null) {
            currentIndexRef.current = null;
            setGaze("smile");
          }
          return;
        }

        const angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI;
        const normalized = (angleDeg + 360) % 360;
        const rawIndex = Math.round(normalized / SECTOR_DEG) % DIRECTIONS.length;
        const current = currentIndexRef.current;

        if (current === null) {
          currentIndexRef.current = rawIndex;
          lastSwitchRef.current = performance.now();
          setGaze(DIRECTIONS[rawIndex]);
          return;
        }

        if (rawIndex === current) return;

        const currentCenter = current * SECTOR_DEG;
        const pastThreshold =
          angularDelta(normalized, currentCenter) > SECTOR_DEG / 2 + HYSTERESIS_DEG;
        const now = performance.now();
        const enoughTimePassed = now - lastSwitchRef.current > MIN_SWITCH_INTERVAL_MS;

        if (pastThreshold && enoughTimePassed) {
          currentIndexRef.current = rawIndex;
          lastSwitchRef.current = now;
          setGaze(DIRECTIONS[rawIndex]);
        }
      });
    }

    window.addEventListener("pointermove", handlePointerMove);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [active, avatarRef]);

  return gaze;
}
