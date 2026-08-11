"use client";

import { useEffect, useState, type RefObject } from "react";
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

const DEADZONE_PX = 48;

/**
 * Tracks the pointer and returns which of the 8 avatar gaze directions
 * the cursor currently sits in, relative to the avatar's own center.
 * Only listens while `active` is true (i.e. once the hero sequence is idle).
 */
export function useIdleGaze(avatarRef: RefObject<HTMLElement | null>, active: boolean) {
  const [gaze, setGaze] = useState<AvatarGaze>("smile");

  useEffect(() => {
    if (!active) return;

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
          setGaze("smile");
          return;
        }

        const angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI;
        const normalized = (angleDeg + 360) % 360;
        const index = Math.round(normalized / 45) % 8;
        setGaze(DIRECTIONS[index]);
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
