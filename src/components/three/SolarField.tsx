"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Instance, Instances } from "@react-three/drei";
import type * as THREE from "three";

const COLS = 11;
const ROWS = 9;
const X_START = -3;
const X_STEP = 1.75;
const Z_START = -1.5;
const Z_STEP = -2.1;
const BASE_TILT = -0.48;

/** Instanced panel array with a slow, sun-tracking tilt. */
export function SolarField() {
  const refs = useRef<(THREE.Object3D | null)[]>([]);

  const cells = useMemo(() => {
    const out: { x: number; z: number; phase: number }[] = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        out.push({
          x: X_START + c * X_STEP,
          z: Z_START + r * Z_STEP,
          phase: (r * 0.35 + c * 0.12) % (Math.PI * 2),
        });
      }
    }
    return out;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const tilt = BASE_TILT + Math.sin(t * 0.12) * 0.06;
    for (let i = 0; i < refs.current.length; i++) {
      const obj = refs.current[i];
      if (!obj) continue;
      obj.rotation.x = tilt + Math.sin(t * 0.5 + cells[i].phase) * 0.006;
    }
  });

  return (
    <group>
      {/* Panels */}
      <Instances limit={cells.length} range={cells.length} castShadow={false} receiveShadow={false}>
        <boxGeometry args={[1.5, 0.05, 1.0]} />
        <meshStandardMaterial color="#123b40" metalness={0.55} roughness={0.32} emissive="#0a1d20" emissiveIntensity={0.6} />
        {cells.map((cell, i) => (
          <Instance
            key={i}
            ref={(el: THREE.Object3D | null) => {
              refs.current[i] = el;
            }}
            position={[cell.x, 0.72, cell.z]}
            rotation={[BASE_TILT, 0, 0]}
          />
        ))}
      </Instances>

      {/* Frames (lime edge glint) */}
      <Instances limit={cells.length} range={cells.length}>
        <boxGeometry args={[1.56, 0.02, 0.06]} />
        <meshStandardMaterial color="#c9f24b" emissive="#c9f24b" emissiveIntensity={0.9} roughness={0.5} />
        {cells.map((cell, i) => (
          <Instance key={i} position={[cell.x, 0.72 + 0.47 * Math.sin(-BASE_TILT) + 0.03, cell.z - 0.47 * Math.cos(-BASE_TILT)]} rotation={[BASE_TILT, 0, 0]} />
        ))}
      </Instances>

      {/* Posts */}
      <Instances limit={cells.length} range={cells.length}>
        <cylinderGeometry args={[0.03, 0.03, 0.7, 6]} />
        <meshStandardMaterial color="#3a4744" metalness={0.4} roughness={0.7} />
        {cells.map((cell, i) => (
          <Instance key={i} position={[cell.x, 0.35, cell.z]} />
        ))}
      </Instances>
    </group>
  );
}
