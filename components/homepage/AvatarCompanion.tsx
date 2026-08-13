"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { VIDEO_URL } from "./gazeVideo";

type AvatarCompanionProps = {
  /** Target video timestamp, in seconds. The rendered frame eases toward this every animation frame. */
  targetTime: number;
  /** Fires once the video has enough data to show a frame. */
  onReady?: () => void;
  /** Must include the wrapper's width/height (e.g. Tailwind size utilities) */
  className?: string;
};

// How quickly the displayed frame catches up to the target time. Higher =
// snappier, lower = laggier/dreamier. Kept modest so the face reads as
// smoothly turning rather than teleporting between poses.
const DAMPING = 8;

export const AvatarCompanion = forwardRef<HTMLDivElement, AvatarCompanionProps>(
  function AvatarCompanion({ targetTime, onReady, className = "h-64 w-64" }, ref) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const targetRef = useRef(targetTime);
    const currentRef = useRef(targetTime);
    useImperativeHandle(ref, () => wrapperRef.current as HTMLDivElement);

    // Updated on every render (not read during render), so the rAF loop
    // below — started once on mount — always damps toward the latest prop.
    targetRef.current = targetTime;

    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      let fired = false;
      function notifyReady() {
        if (fired) return;
        fired = true;
        onReady?.();
      }

      // The <video> is server-rendered, so the browser can start (and on a
      // small/cached file, finish) loading it before React hydrates and
      // attaches a "loadeddata" listener — missing the event entirely. Cover
      // both cases: check the already-current state, and still listen for it.
      if (video.readyState >= 2) {
        notifyReady();
      } else {
        video.addEventListener("loadeddata", notifyReady);
      }

      return () => video.removeEventListener("loadeddata", notifyReady);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      let frameId = 0;
      let lastTimestamp = 0;

      function tick(timestamp: number) {
        const delta = lastTimestamp ? Math.min(0.1, (timestamp - lastTimestamp) / 1000) : 0;
        lastTimestamp = timestamp;

        const video = videoRef.current;
        if (video && video.readyState >= 2) {
          const factor = 1 - Math.exp(-DAMPING * delta);
          currentRef.current += (targetRef.current - currentRef.current) * factor;
          if (Math.abs(video.currentTime - currentRef.current) > 0.008) {
            video.currentTime = currentRef.current;
          }
        }

        frameId = requestAnimationFrame(tick);
      }

      frameId = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(frameId);
    }, []);

    return (
      <div ref={wrapperRef} className={`relative select-none overflow-hidden ${className}`}>
        <video
          ref={videoRef}
          src={VIDEO_URL}
          muted
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
        />
      </div>
    );
  },
);
