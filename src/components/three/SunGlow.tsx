"use client";

import { useMemo } from "react";
import * as THREE from "three";

function makeGlowTexture(): THREE.Texture {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,244,200,1)");
  g.addColorStop(0.12, "rgba(242,196,90,0.95)");
  g.addColorStop(0.3, "rgba(201,242,75,0.35)");
  g.addColorStop(0.6, "rgba(201,242,75,0.08)");
  g.addColorStop(1, "rgba(201,242,75,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** Low sun: a bright disc with a soft additive halo. */
export function SunGlow({ position }: { position: [number, number, number] }) {
  const texture = useMemo(() => makeGlowTexture(), []);
  return (
    <group position={position}>
      <sprite scale={[26, 26, 1]}>
        <spriteMaterial map={texture} transparent depthWrite={false} blending={THREE.AdditiveBlending} opacity={0.9} />
      </sprite>
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial color="#ffe9a6" fog={false} />
      </mesh>
    </group>
  );
}
