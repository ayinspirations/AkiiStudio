"use client";

import { useEffect, useState, type RefObject } from "react";

const DEADZONE_PX = 40;
// Distance at which the look offset reaches its full clamp (-1 / +1).
const FALLOFF_PX = 320;

/**
 * Continuously tracks the pointer and returns a proportional horizontal
 * offset (-1 = far left of the avatar's center, +1 = far right, 0 = inside
 * the deadzone) — a smooth function of cursor position rather than a
 * discrete direction bucket, so the avatar can ease continuously toward it
 * instead of snapping between fixed poses.
 *
 * The footage only turns left/right (no up/down), so a cursor directly
 * above or below the avatar has nothing to react to — but the *strength*
 * of the reaction is based on the full distance to the cursor, not just
 * the horizontal component. Otherwise a cursor up in a corner (mostly
 * vertical distance, only a little horizontal) would barely register even
 * though it visually reads as "far away" — the avatar would feel unresponsive
 * everywhere except when the cursor is almost perfectly level with it.
 *
 * Only listens while `active` is true (i.e. once the hero sequence is idle).
 */
export function useIdleLook(avatarRef: RefObject<HTMLElement | null>, active: boolean): number {
  const [offsetX, setOffsetX] = useState(0);

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

        if (distance < DEADZONE_PX || dx === 0) {
          setOffsetX(0);
          return;
        }

        const magnitude = Math.min(1, (distance - DEADZONE_PX) / FALLOFF_PX);
        setOffsetX(Math.sign(dx) * magnitude);
      });
    }

    window.addEventListener("pointermove", handlePointerMove);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [active, avatarRef]);

  return offsetX;
}
