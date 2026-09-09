"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";

/**
 * Loads a reduced motion feature set (LazyMotion + `m.*` components) to keep
 * the animation bundle small, and honours the OS reduced-motion preference.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user" transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
