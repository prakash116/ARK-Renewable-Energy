import type { Feature } from "@/types/content";
import { cn, pad2 } from "@/lib/utils";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { Icon } from "./Icon";

/**
 * Reusable feature list. `variant="tiles"` renders bordered cards,
 * `variant="rows"` renders top-hairline blocks (lighter, editorial).
 */
export function FeatureGrid({
  features,
  variant = "rows",
  columns = 3,
  numbered = false,
  className,
}: {
  features: Feature[];
  variant?: "rows" | "tiles";
  columns?: 2 | 3 | 4;
  numbered?: boolean;
  className?: string;
}) {
  const cols = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  }[columns];
  return (
    <StaggerGroup as="ul" className={cn("grid gap-x-8 gap-y-8", variant === "tiles" && "gap-4", cols, className)} stagger={0.06}>
      {features.map((f, i) => (
        <StaggerItem
          key={f.title}
          as="li"
          className={cn(
            variant === "rows" && "border-t border-line pt-5",
            variant === "tiles" && "rounded-[var(--radius-card)] border border-line bg-card p-5",
          )}
        >
          <div className="flex items-center justify-between">
            {f.icon ? (
              <span className="inline-flex size-9 items-center justify-center rounded-lg bg-primary-soft text-primary theme-dark:bg-white/5 theme-dark:text-lime">
                <Icon name={f.icon} className="size-4" />
              </span>
            ) : (
              <span />
            )}
            {numbered && <span className="font-mono text-xs text-fg-soft tabular-nums">{pad2(i)}</span>}
          </div>
          <h3 className="text-h4 mt-4">{f.title}</h3>
          <p className="mt-1.5 text-[15px] leading-relaxed text-fg-muted">{f.description}</p>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
