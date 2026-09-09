"use client";

import { useRef } from "react";
import { m, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import type { Step } from "@/types/content";
import { cn, pad2 } from "@/lib/utils";

export type TimelineStep = Step & { label?: string; isPlaceholder?: boolean };

function TimelineItem({
  step,
  index,
  total,
  progress,
  horizontal,
}: {
  step: TimelineStep;
  index: number;
  total: number;
  progress: MotionValue<number>;
  horizontal: boolean;
}) {
  const start = index / total;
  const end = (index + 0.6) / total;
  const active = useTransform(progress, [start, end], [0, 1]);
  const glowScale = useTransform(active, [0, 1], [0.6, 1]);
  const marker = step.label ?? pad2(index);
  const wide = Boolean(step.label);

  return (
    <li className={cn("relative flex gap-5", horizontal && "lg:block lg:gap-0")}>
      <div className={cn("relative z-10 shrink-0", horizontal && "lg:mb-6")}>
        <m.span
          aria-hidden
          style={{ opacity: active, scale: glowScale }}
          className={cn("absolute inset-0 rounded-full bg-lime/30 blur-sm")}
        />
        <span
          className={cn(
            "relative inline-flex h-9 items-center justify-center rounded-full border border-line-strong bg-card font-mono text-xs tabular-nums",
            wide ? "min-w-9 px-3" : "w-9",
          )}
        >
          <m.span
            aria-hidden
            style={{ opacity: active }}
            className="absolute inset-0 rounded-full border-2 border-lime-deep theme-dark:border-lime"
          />
          <span className="relative">{marker}</span>
        </span>
      </div>
      <div className={cn("pb-9", horizontal && "lg:pr-4 lg:pb-0")}>
        <h3 className="text-h4">{step.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-fg-muted sm:text-[15px]">{step.description}</p>
      </div>
    </li>
  );
}

/**
 * Scroll-driven timeline. Vertical on mobile; `horizontal` switches to a
 * rail layout on lg+. A lime progress line fills as the section scrolls.
 */
export function ProcessTimeline({
  steps,
  horizontal = true,
  className,
}: {
  steps: TimelineStep[];
  horizontal?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 55%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });

  return (
    <div ref={ref} className={cn("relative mt-12", className)}>
      {/* Vertical track */}
      <div aria-hidden className={cn("absolute top-2 bottom-8 left-[17px] w-px bg-line", horizontal && "lg:hidden")}>
        <m.div style={{ scaleY: progress }} className="h-full w-full origin-top bg-lime-deep theme-dark:bg-lime" />
      </div>
      {/* Horizontal track */}
      {horizontal && (
        <div aria-hidden className="absolute top-[17px] right-0 left-0 hidden h-px bg-line lg:block">
          <m.div style={{ scaleX: progress }} className="h-full w-full origin-left bg-lime-deep theme-dark:bg-lime" />
        </div>
      )}

      <ol
        className={cn("relative", horizontal && "lg:grid lg:gap-6")}
        style={horizontal ? { gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` } : undefined}
      >
        {steps.map((step, i) => (
          <TimelineItem
            key={`${step.title}-${i}`}
            step={step}
            index={i}
            total={steps.length}
            progress={progress}
            horizontal={horizontal}
          />
        ))}
      </ol>
    </div>
  );
}
