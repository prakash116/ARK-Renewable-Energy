import Image from "next/image";
import type { ImageRef } from "@/types/content";
import { cn } from "@/lib/utils";
import { SolarImage } from "./SolarImage";

type Aspect = "video" | "wide" | "4/3" | "square" | "3/4" | "auto";

const aspects: Record<Aspect, string> = {
  video: "aspect-video",
  wide: "aspect-[16/10]",
  "4/3": "aspect-[4/3]",
  square: "aspect-square",
  "3/4": "aspect-[3/4]",
  auto: "",
};

/**
 * Renders real photography via next/image when `image.src` is set, otherwise
 * the generative scene as a static SVG asset. Same props either way, so real
 * photos can be dropped in without UI changes.
 */
export function MediaFrame({
  image,
  className,
  aspect = "wide",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  rounded = "media",
  overlay = false,
  imgClassName,
}: {
  image: ImageRef;
  className?: string;
  aspect?: Aspect;
  sizes?: string;
  priority?: boolean;
  rounded?: "media" | "card" | "none";
  /** Adds a soft bottom gradient for text overlays. */
  overlay?: boolean;
  imgClassName?: string;
}) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden bg-ink-2",
        aspects[aspect],
        rounded === "media" && "rounded-[var(--radius-media)]",
        rounded === "card" && "rounded-[var(--radius-card)]",
        className,
      )}
    >
      {image.src ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          preload={priority}
          fetchPriority={priority ? "high" : undefined}
          className={cn("object-cover", imgClassName)}
        />
      ) : (
        <SolarImage
          variant={image.visual}
          tone={image.tone}
          alt={image.alt}
          priority={priority}
          className={cn("absolute inset-0", imgClassName)}
        />
      )}
      {overlay && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent"
        />
      )}
    </div>
  );
}
