"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, Grid, Preload } from "@react-three/drei";
import { SolarField } from "./SolarField";
import { EnergyParticles } from "./EnergyParticles";
import { CameraRig } from "./CameraRig";
import { SunGlow } from "./SunGlow";

const INK = "#0b0f0e";

/**
 * Abstract solar-field scene: instanced panels tracking a low sun over a
 * receding grid, with rising energy particles. Renders only while visible.
 */
export function HeroEnergyScene({ onReady }: { onReady?: () => void }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);

  // Pause rendering when the hero leaves the viewport or the tab is hidden.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting && !document.hidden), {
      threshold: 0.05,
    });
    io.observe(el);
    const onVis = () => setActive(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div ref={wrapRef} className="h-full w-full">
      <Canvas
        dpr={[1, 1.5]}
        frameloop={active ? "always" : "never"}
        camera={{ position: [0, 3, 10], fov: 36, near: 0.1, far: 90 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={() => onReady?.()}
        style={{ pointerEvents: "none" }}
      >
        <fog attach="fog" args={[INK, 14, 42]} />
        <hemisphereLight args={["#2d7358", INK, 0.9]} />
        <directionalLight position={[10, 9, -14]} intensity={2.4} color="#f7e7a8" />
        <pointLight position={[4, 1.2, -2]} intensity={1.2} color="#c9f24b" distance={14} decay={2} />

        <SunGlow position={[11, 4.2, -26]} />

        <Grid
          position={[0, -0.02, 0]}
          args={[80, 80]}
          cellSize={0.7}
          cellThickness={0.7}
          cellColor="#1c2a25"
          sectionSize={3.5}
          sectionThickness={1}
          sectionColor="#2b5c48"
          fadeDistance={36}
          fadeStrength={1.6}
          infiniteGrid
        />

        <SolarField />
        <EnergyParticles count={700} />
        <CameraRig />

        <AdaptiveDpr pixelated />
        <Preload all />
      </Canvas>
    </div>
  );
}
