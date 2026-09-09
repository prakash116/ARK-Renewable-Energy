"use client";

import { m, type Variants } from "motion/react";
import { cn } from "@/lib/utils";
import { EASE } from "./Reveal";

const groupVariants: Variants = {
  hidden: {},
  visible: (custom: { stagger: number; delay: number } = { stagger: 0.08, delay: 0 }) => ({
    transition: { staggerChildren: custom.stagger, delayChildren: custom.delay },
  }),
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

const groupTags = { div: m.div, ul: m.ul, ol: m.ol, section: m.section } as const;
const itemTags = { div: m.div, li: m.li, article: m.article, span: m.span } as const;

export function StaggerGroup({
  children,
  className,
  as = "div",
  stagger = 0.08,
  delay = 0,
  amount = 0.15,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  as?: keyof typeof groupTags;
  stagger?: number;
  delay?: number;
  amount?: number;
  once?: boolean;
}) {
  const Comp = groupTags[as];
  return (
    <Comp
      className={cn(className)}
      variants={groupVariants}
      custom={{ stagger, delay }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
    >
      {children}
    </Comp>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  as?: keyof typeof itemTags;
  style?: React.CSSProperties;
}) {
  const Comp = itemTags[as];
  return (
    <Comp className={cn(className)} variants={itemVariants} style={style}>
      {children}
    </Comp>
  );
}
