"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const TARGET = new THREE.Vector3(4.5, 0.4, -6);
const BASE = new THREE.Vector3(0, 3, 10);

/** Slow drift plus gentle pointer parallax (window-level, so the canvas can stay non-interactive). */
export function CameraRig() {
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const cam = state.camera;
    const driftX = Math.sin(t * 0.08) * 0.6;
    const driftY = Math.cos(t * 0.06) * 0.25;
    const targetX = BASE.x + driftX + pointer.current.x * 0.7;
    const targetY = BASE.y + driftY - pointer.current.y * 0.35;
    cam.position.x += (targetX - cam.position.x) * 0.03;
    cam.position.y += (targetY - cam.position.y) * 0.03;
    cam.lookAt(TARGET);
  });

  return null;
}
