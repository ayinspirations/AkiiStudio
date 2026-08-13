// Green-screen rotation clip. Not a continuous spin either — it rests at
// center, dips into a left turn (~t=3s), returns to center, swings into a
// stronger right turn (~t=8.1s), then returns to center at the loop point.
// Timestamps were located objectively: sampling left/right pixel-brightness
// asymmetry across every frame, then confirming the sign against extracted
// frames (foreshortened eye = the side rotating away from camera).
export const VIDEO_URL = "/avatar/avatar-head-greenscreen.mp4";

export const T_TURN_LEFT = 3.0;
export const T_CENTER = 5.0;
export const T_TURN_RIGHT = 8.1;

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
