"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import type { Testimonial } from "@/types/content";
import { cn } from "@/lib/utils";
import { Badge, PlaceholderBadge } from "@/components/ui/Badge";

/**
 * Native scroll-snap carousel: swipe on touch, buttons and keyboard elsewhere.
 * One editorial slide per view at every breakpoint.
 */
export function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setIndex(Math.round(el.scrollLeft / el.clientWidth));
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const go = useCallback(
    (next: number) => {
      const el = trackRef.current;
      if (!el) return;
      const clamped = (next + items.length) % items.length;
      el.scrollTo({ left: clamped * el.clientWidth, behavior: "smooth" });
    },
    [items.length],
  );

  return (
    <div className="relative rounded-[var(--radius-media)] border border-line bg-card">
      <div
        ref={trackRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Customer testimonials"
        tabIndex={0}
        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth scrollbar-none focus:outline-none"
      >
        {items.map((t, i) => (
          <figure
            key={t.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${items.length}`}
            className="w-full shrink-0 snap-center px-6 py-8 sm:px-10 sm:py-12 lg:px-16 lg:py-16"
          >
            <Quote aria-hidden className="size-8 text-lime-deep" strokeWidth={1.5} />
            <blockquote className="mt-5">
              <p className="font-display text-[1.25rem] leading-snug font-semibold tracking-[-0.01em] text-fg sm:text-[1.5rem] lg:text-[1.9rem]">
                “{t.quote}”
              </p>
            </blockquote>
            <figcaption className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[15px] font-semibold">{t.name}</p>
                <p className="text-sm text-fg-muted">
                  {t.role} · {t.location}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline">{t.projectType}</Badge>
                {t.isPlaceholder && <PlaceholderBadge />}
              </div>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-line px-4 py-3 sm:px-6">
        <div className="flex gap-1.5" aria-hidden>
          {items.map((t, i) => (
            <button
              key={t.id}
              type="button"
              tabIndex={-1}
              onClick={() => go(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === index ? "w-6 bg-primary" : "w-1.5 bg-line-strong",
              )}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Previous testimonial"
            className="touch-target inline-flex items-center justify-center rounded-full border border-line-strong hover:bg-card-2"
          >
            <ChevronLeft aria-hidden className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Next testimonial"
            className="touch-target inline-flex items-center justify-center rounded-full border border-line-strong hover:bg-card-2"
          >
            <ChevronRight aria-hidden className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
