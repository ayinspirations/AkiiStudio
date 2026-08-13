// The rotation video isn't a continuous 360° spin — it's a single arc that
// eases from facing right, through center, to facing left (and back), so the
// whole useful range is one monotonic timeline: turnRight -> center -> turnLeft.
// Timestamps were located by sampling frames directly (see PR description).
export const VIDEO_URL = "/avatar/Character_head_rotating_360_degrees_202608131808.mp4";

export const T_TURN_RIGHT = 2.5;
export const T_CENTER = 4.0;
export const T_TURN_LEFT = 6.83;

export type GazeName = "sleep" | "smile" | "up" | "upper_left" | "upper_right" | "left" | "lower_right";

// Video timestamps (seconds) for the hero entrance sequence's named
// waypoints. The footage only has left/center/right poses (no distinct
// up/down), so vertical-only waypoints just rest at center.
export const GAZE_VIDEO_TIME: Record<GazeName, number> = {
  sleep: T_CENTER,
  smile: T_CENTER,
  up: T_CENTER,
  upper_left: T_TURN_LEFT,
  upper_right: T_TURN_RIGHT,
  left: T_TURN_LEFT,
  lower_right: T_TURN_RIGHT,
};

/**
 * Maps a normalized cursor offset (-1 = far left of the avatar, +1 = far
 * right) to a video timestamp, so the face turns toward the cursor: right of
 * the avatar -> turnRight pose, left -> turnLeft pose, centered -> center.
 */
export function mouseXToVideoTime(mouseX: number): number {
  const x = Math.max(-1, Math.min(1, mouseX));
  return x >= 0 ? T_CENTER + (T_TURN_RIGHT - T_CENTER) * x : T_CENTER + (T_TURN_LEFT - T_CENTER) * -x;
}
