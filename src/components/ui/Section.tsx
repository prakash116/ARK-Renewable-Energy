import { cn } from "@/lib/utils";

/**
 * Vertical rhythm + optional dark theme scope.
 * `tone="dark"` flips the semantic colour tokens for everything inside.
 */
export function Section({
  children,
  className,
  tone = "light",
  padding = "default",
  id,
  ariaLabelledby,
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "light" | "dark" | "muted" | "surface";
  padding?: "default" | "tight" | "none";
  id?: string;
  ariaLabelledby?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledby}
      className={cn(
        "relative",
        padding === "default" && "py-16 sm:py-20 lg:py-28",
        padding === "tight" && "py-10 sm:py-14 lg:py-20",
        tone === "dark" && "theme-dark bg-canvas text-fg",
        tone === "muted" && "bg-cream-2",
        tone === "surface" && "bg-card",
        className,
      )}
    >
      {children}
    </section>
  );
}
