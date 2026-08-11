const DEG = Math.PI / 180;

export type GazeName = "sleep" | "smile" | "up" | "upper_left" | "upper_right" | "left" | "lower_right";

export type GazeAngles = { yaw: number; pitch: number };

// Rotation waypoints (radians) the avatar eases through during the hero
// entrance sequence, roughly aimed at whatever's appearing on screen next.
export const GAZE_ANGLES: Record<GazeName, GazeAngles> = {
  sleep: { yaw: 0, pitch: 34 * DEG },
  smile: { yaw: 0, pitch: 0 },
  up: { yaw: 0, pitch: -18 * DEG },
  upper_left: { yaw: 30 * DEG, pitch: -8 * DEG },
  upper_right: { yaw: -28 * DEG, pitch: -8 * DEG },
  left: { yaw: 34 * DEG, pitch: 3 * DEG },
  lower_right: { yaw: -26 * DEG, pitch: 12 * DEG },
};

// Clamp for the continuous idle mouse-follow.
export const IDLE_MAX_YAW = 30 * DEG;
export const IDLE_MAX_PITCH = 16 * DEG;
