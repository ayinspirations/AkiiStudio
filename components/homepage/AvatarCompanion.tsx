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
// smoothly turning rather than teleporting between poses. Left exactly as
// tuned before — do not speed this up.
const DAMPING = 8;

// Source is a 720x1280 portrait clip; this crop (full width, trimmed top/
// bottom margin) frames the character head-to-shoes with a little breathing
// room, at a 0.6 aspect ratio that the canvas/wrapper below match exactly so
// nothing gets stretched.
const SOURCE_CROP = { sx: 0, sy: 40, sw: 720, sh: 1200 };
const CANVAS_W = 360;
const CANVAS_H = 600;

// The backdrop is a fairly saturated, even green (~rgb(17,116,58)); the
// character's own colours (white/grey hoodie, near-black visor, warm eyes)
// are all far from "green clearly dominant", so this keys the backdrop out
// cleanly without eating into the character.
const KEY_LOW = 15;
const KEY_HIGH = 45;

export const AvatarCompanion = forwardRef<HTMLDivElement, AvatarCompanionProps>(
  function AvatarCompanion({ targetTime, onReady, className = "h-64 w-64" }, ref) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
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
      const ctx = canvasRef.current?.getContext("2d", { willReadFrequently: true }) ?? null;
      let frameId = 0;
      let lastTimestamp = 0;

      function tick(timestamp: number) {
        const delta = lastTimestamp ? Math.min(0.1, (timestamp - lastTimestamp) / 1000) : 0;
        lastTimestamp = timestamp;

        const video = videoRef.current;
        const videoReady = !!video && video.readyState >= 2;

        if (video && videoReady) {
          const factor = 1 - Math.exp(-DAMPING * delta);
          currentRef.current += (targetRef.current - currentRef.current) * factor;
          if (Math.abs(video.currentTime - currentRef.current) > 0.008) {
            video.currentTime = currentRef.current;
          }
        }

        if (ctx && video && videoReady) {
          ctx.drawImage(
            video,
            SOURCE_CROP.sx,
            SOURCE_CROP.sy,
            SOURCE_CROP.sw,
            SOURCE_CROP.sh,
            0,
            0,
            CANVAS_W,
            CANVAS_H,
          );
          const frame = ctx.getImageData(0, 0, CANVAS_W, CANVAS_H);
          const data = frame.data;
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const rb = Math.max(r, b);
            const greenExcess = g - rb;
            const bg = Math.min(1, Math.max(0, (greenExcess - KEY_LOW) / (KEY_HIGH - KEY_LOW)));
            data[i + 3] = Math.round((1 - bg) * 255);
            // Spill suppression: edge pixels blended with the backdrop keep a
            // faint green cast even once mostly keyed out — pull green back
            // down toward neutral wherever it's the dominant channel, so the
            // character's silhouette doesn't wear a green fringe.
            if (greenExcess > 0) {
              data[i + 1] = rb;
            }
          }
          ctx.putImageData(frame, 0, 0);
        }

        frameId = requestAnimationFrame(tick);
      }

      frameId = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(frameId);
    }, []);

    return (
      <div ref={wrapperRef} className={`relative select-none ${className}`}>
        {/* Decodes the source frames; never shown directly (the canvas above
            it renders the chroma-keyed, cropped result). Kept in normal flow
            (not display:none) so the browser keeps decoding it. */}
        <video
          ref={videoRef}
          src={VIDEO_URL}
          muted
          playsInline
          preload="auto"
          className="absolute h-px w-px opacity-0"
        />
        <canvas ref={canvasRef} width={CANVAS_W} height={CANVAS_H} className="h-full w-full" />
      </div>
    );
  },
);
