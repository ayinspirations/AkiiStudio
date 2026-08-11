"use client";

import { useEffect, useState, type RefObject } from "react";
import { IDLE_MAX_PITCH, IDLE_MAX_YAW, type GazeAngles } from "@/components/homepage/gazeAngles";

const DEADZONE_PX = 40;
// Distance at which the look angle reaches its full clamp.
const FALLOFF_PX = 420;

/**
 * Continuously tracks the pointer and returns a proportional yaw/pitch
 * target (in radians) toward it, relative to the avatar's own center.
 * Unlike a discrete direction bucket, this is a smooth function of cursor
 * position — the 3D avatar then damps toward it every frame, so the whole
 * path from "far left" to "far right" is one continuous motion.
 * Only listens while `active` is true (i.e. once the hero sequence is idle).
 */
export function useIdleLook(avatarRef: RefObject<HTMLElement | null>, active: boolean): GazeAngles {
  const [angles, setAngles] = useState<GazeAngles>({ yaw: 0, pitch: 0 });

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
          setAngles({ yaw: 0, pitch: 0 });
          return;
        }

        const strength = Math.min(1, (distance - DEADZONE_PX) / FALLOFF_PX);
        const angle = Math.atan2(dy, dx);
        setAngles({
          yaw: -Math.cos(angle) * strength * IDLE_MAX_YAW,
          pitch: Math.sin(angle) * strength * IDLE_MAX_PITCH,
        });
      });
    }

    window.addEventListener("pointermove", handlePointerMove);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [active, avatarRef]);

  return angles;
}
