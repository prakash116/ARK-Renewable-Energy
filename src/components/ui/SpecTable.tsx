import type { Spec } from "@/types/content";
import { cn } from "@/lib/utils";
import { PlaceholderBadge } from "./Badge";

/** Label/value list for technical capabilities. */
export function SpecTable({ specs, className, columns = 2 }: { specs: Spec[]; className?: string; columns?: 1 | 2 }) {
  const hasPlaceholder = specs.some((s) => s.isPlaceholder);
  return (
    <div className={className}>
      <dl className={cn("grid gap-x-8", columns === 2 && "sm:grid-cols-2")}>
        {specs.map((s) => (
          <div key={s.label} className="flex items-start justify-between gap-4 border-b border-line py-4">
            <dt className="text-sm text-fg-muted">{s.label}</dt>
            <dd className="flex flex-wrap items-center justify-end gap-2 text-right text-[15px] font-semibold">
              {s.value}
              {s.isPlaceholder && <PlaceholderBadge />}
            </dd>
          </div>
        ))}
      </dl>
      {hasPlaceholder && (
        <p className="mt-4 text-xs text-fg-soft">
          Values marked “Sample” are typical ranges to be confirmed against the actual product range.
        </p>
      )}
    </div>
  );
}
