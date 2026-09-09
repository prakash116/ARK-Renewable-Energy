import type { Stat } from "@/types/content";
import { CountUp } from "@/components/motion/CountUp";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { PlaceholderBadge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

/** Compact credibility strip. Values come from data; placeholders are badged. */
export function Stats({ stats, className }: { stats: Stat[]; className?: string }) {
  const hasPlaceholder = stats.some((s) => s.isPlaceholder);
  return (
    <div className={cn("border-b border-line bg-canvas", className)}>
      <Container className="py-10 sm:py-12">
        <StaggerGroup as="ul" className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4" stagger={0.1}>
          {stats.map((s) => (
            <StaggerItem key={s.id} as="li" className="border-l border-line pl-4 sm:pl-6">
              <p className="text-stat text-fg">
                <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-sm font-medium text-fg-muted sm:text-[15px]">{s.label}</p>
              {s.isPlaceholder && <PlaceholderBadge className="mt-2" />}
            </StaggerItem>
          ))}
        </StaggerGroup>
        {hasPlaceholder && (
          <p className="mt-6 text-xs text-fg-soft">
            Figures marked “Sample” are placeholders pending verification.
          </p>
        )}
      </Container>
    </div>
  );
}
