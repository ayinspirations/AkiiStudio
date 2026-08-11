"use client";

import { forwardRef, Suspense, useEffect, useImperativeHandle, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

// The model's own bounding box runs from y=0 (base) to y≈1.89 (hood top).
const LOOK_HEIGHT = 0.943;

function CameraRig() {
  const { camera } = useThree();
  useEffect(() => {
    camera.lookAt(0, LOOK_HEIGHT, 0);
  }, [camera]);
  return null;
}

const MODEL_URL = "/avatar/base_basic_pbr-v1.glb";

useGLTF.preload(MODEL_URL);

type AvatarCompanionProps = {
  targetYaw: number;
  targetPitch: number;
  /** Fires once after the model has actually loaded and mounted. */
  onReady?: () => void;
  /** Must include the wrapper's width/height (e.g. Tailwind size utilities) */
  className?: string;
};

function Model({
  targetYaw,
  targetPitch,
  onReady,
}: {
  targetYaw: number;
  targetPitch: number;
  onReady?: () => void;
}) {
  const { scene } = useGLTF(MODEL_URL);
  const group = useRef<THREE.Group>(null);
  const elapsed = useRef(0);

  useEffect(() => {
    onReady?.();
    // Only ever fires once per mount — this component only renders after
    // Suspense resolves, so there's no "loading" -> "loaded" transition to track.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, targetYaw, 6, delta);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, targetPitch, 6, delta);
    elapsed.current += delta;
    g.position.y = Math.sin(elapsed.current * 1.1) * 0.02;
  });

  return (
    <group ref={group}>
      <primitive object={scene} />
    </group>
  );
}

export const AvatarCompanion = forwardRef<HTMLDivElement, AvatarCompanionProps>(
  function AvatarCompanion({ targetYaw, targetPitch, onReady, className = "h-64 w-64" }, ref) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => wrapperRef.current as HTMLDivElement);

    return (
      <div ref={wrapperRef} className={`relative select-none ${className}`}>
        <Canvas
          camera={{ position: [0, LOOK_HEIGHT, 3.9], fov: 32 }}
          gl={{ alpha: true, antialias: true }}
          dpr={[1, 2]}
        >
          <CameraRig />
          <ambientLight intensity={1} />
          <directionalLight position={[2, 3, 2]} intensity={1.5} />
          <directionalLight position={[-2, 1, -1.5]} intensity={0.5} />
          <Suspense fallback={null}>
            <Model targetYaw={targetYaw} targetPitch={targetPitch} onReady={onReady} />
          </Suspense>
        </Canvas>
      </div>
    );
  },
);
