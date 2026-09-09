import { cn } from "@/lib/utils";

type Variant = "neutral" | "lime" | "outline" | "forest" | "sample";

const variants: Record<Variant, string> = {
  neutral: "bg-card-2 text-fg",
  lime: "bg-lime text-ink",
  forest: "bg-primary text-white",
  outline: "border border-line-strong text-fg-muted",
  sample: "border border-dashed border-solar/70 bg-solar/10 text-[#7a5410] theme-dark:text-solar",
};

export function Badge({
  children,
  variant = "neutral",
  className,
  title,
}: {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  title?: string;
}) {
  return (
    <span
      title={title}
      className={cn(
        "inline-flex h-6 items-center gap-1 rounded-full px-2.5 text-[11px] font-semibold tracking-wide uppercase",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}

/**
 * Marks placeholder content so it can never be mistaken for a verified claim.
 * Remove by setting `isPlaceholder: false` on the data item once verified.
 */
export function PlaceholderBadge({ className }: { className?: string }) {
  return (
    <Badge
      variant="sample"
      className={className}
      title="Placeholder content. Replace with verified company data."
    >
      Sample
    </Badge>
  );
}
