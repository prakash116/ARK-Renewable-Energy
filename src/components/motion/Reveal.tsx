"use client";

import { m } from "motion/react";
import { cn } from "@/lib/utils";

const tags = {
  div: m.div,
  section: m.section,
  article: m.article,
  li: m.li,
  span: m.span,
  p: m.p,
  figure: m.figure,
  header: m.header,
} as const;

type Tag = keyof typeof tags;

export const EASE = [0.16, 1, 0.3, 1] as const;

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  as?: Tag;
  delay?: number;
  duration?: number;
  /** Pixels to travel on Y. */
  y?: number;
  x?: number;
  scale?: number;
  once?: boolean;
  amount?: number;
  style?: React.CSSProperties;
}

/** Fade + rise into view. Server-safe: only the wrapper is a client component. */
export function Reveal({
  children,
  className,
  as = "div",
  delay = 0,
  duration = 0.7,
  y = 22,
  x = 0,
  scale = 1,
  once = true,
  amount = 0.2,
  style,
}: RevealProps) {
  const Comp = tags[as];
  return (
    <Comp
      className={cn(className)}
      style={style}
      initial={{ opacity: 0, y, x, scale }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </Comp>
  );
}
