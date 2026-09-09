"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

const HeroEnergyScene = dynamic(
  () => import("./HeroEnergyScene").then((mod) => mod.HeroEnergyScene),
  { ssr: false, loading: () => null },
);

interface NavigatorExtras {
  connection?: { saveData?: boolean; effectiveType?: string };
  deviceMemory?: number;
}

/** Decide whether the device should run the WebGL hero. */
function canRunWebGL(): boolean {
  if (typeof window === "undefined") return false;
  const nav = navigator as Navigator & NavigatorExtras;
  const largeFinePointer = window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const saveData = nav.connection?.saveData === true;
  const slowNetwork = /(^|\b)(slow-2g|2g)\b/.test(nav.connection?.effectiveType ?? "");
  const cores = nav.hardwareConcurrency ?? 4;
  const memory = nav.deviceMemory ?? 8;
  let webgl = false;
  try {
    const c = document.createElement("canvas");
    webgl = Boolean(c.getContext("webgl2") ?? c.getContext("webgl"));
  } catch {
    webgl = false;
  }
  return largeFinePointer && !reducedMotion && !saveData && !slowNetwork && cores >= 4 && memory >= 4 && webgl;
}

/**
 * Capability gate for the 3D hero. Renders the static fallback immediately and
 * fades the WebGL scene in over it once loaded (only on capable desktops).
 */
export function HeroCanvas({ fallback }: { fallback: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const update = () => setEnabled(canRunWebGL());
    // Defer so the hero copy paints first.
    const t = window.setTimeout(update, 250);
    const mq = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    mq.addEventListener("change", update);
    return () => {
      window.clearTimeout(t);
      mq.removeEventListener("change", update);
    };
  }, []);

  return (
    <div className="absolute inset-0">
      {fallback}
      {enabled && (
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-out",
            ready ? "opacity-100" : "opacity-0",
          )}
        >
          <HeroEnergyScene onReady={() => setReady(true)} />
        </div>
      )}
    </div>
  );
}
