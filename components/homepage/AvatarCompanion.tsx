"use client";

import { forwardRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

export type AvatarGaze =
  | "sleep"
  | "smile"
  | "up"
  | "down"
  | "left"
  | "right"
  | "upper_left"
  | "upper_right"
  | "lower_left"
  | "lower_right"
  | "react";

const AVATAR_SRC: Record<AvatarGaze, string> = {
  sleep: "/avatar/avatar_sleep.png",
  smile: "/avatar/avatar_smile.png",
  up: "/avatar/avatar_up.png",
  down: "/avatar/avatar_down.png",
  left: "/avatar/avatar_left.png",
  right: "/avatar/avatar_right.png",
  upper_left: "/avatar/avatar_upper_left.png",
  upper_right: "/avatar/avatar_upper_right.png",
  lower_left: "/avatar/avatar_lower_left.png",
  lower_right: "/avatar/avatar_lower_right.png",
  react: "/avatar/avatar_react.png",
};

type AvatarCompanionProps = {
  gaze: AvatarGaze;
  priority?: boolean;
  /** Must include the wrapper's width/height (e.g. Tailwind size utilities) */
  className?: string;
};

export const AvatarCompanion = forwardRef<HTMLDivElement, AvatarCompanionProps>(
  function AvatarCompanion(
    { gaze, priority = false, className = "h-64 w-64" },
    ref,
  ) {
    return (
      <div ref={ref} className={`relative select-none ${className}`}>
        <AnimatePresence initial={false}>
          <motion.div
            key={gaze}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={AVATAR_SRC[gaze]}
              alt="Akii Studio Avatar"
              fill
              priority={priority}
              sizes="(min-width: 1024px) 256px, (min-width: 640px) 176px, 112px"
              className="object-contain drop-shadow-[0_24px_40px_rgba(20,30,25,0.18)]"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    );
  },
);
