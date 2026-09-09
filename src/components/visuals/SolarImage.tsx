import type { VisualVariant } from "@/types/content";
import { cn } from "@/lib/utils";
import { resolveTone, type Tone } from "@/lib/solar-scenes";

/** URL of the prerendered SVG asset for a scene. */
export function visualSrc(variant: VisualVariant, tone?: Tone) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${basePath}/visuals/${variant}-${resolveTone(variant, tone)}.svg`;
}

/**
 * Generative scene as a plain <img> pointing at a static SVG asset.
 * A plain img is used deliberately: SVG gains nothing from next/image
 * optimisation, and this keeps the scene out of the HTML/RSC payload.
 */
export function SolarImage({
  variant,
  tone,
  alt = "",
  className,
  priority = false,
}: {
  variant: VisualVariant;
  tone?: Tone;
  alt?: string;
  className?: string;
  /** Eager + high fetch priority for above-the-fold usage. */
  priority?: boolean;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={visualSrc(variant, tone)}
      alt={alt}
      width={800}
      height={500}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      draggable={false}
      className={cn("h-full w-full object-cover", className)}
    />
  );
}
