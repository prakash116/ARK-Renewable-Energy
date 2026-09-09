import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className,
  dot = true,
  as: Comp = "span",
}: {
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
  as?: "span" | "p" | "div";
}) {
  return (
    <Comp className={cn("eyebrow inline-flex items-center gap-2.5 text-fg-muted", className)}>
      {dot && <span aria-hidden className="size-1.5 rounded-full bg-accent" />}
      {children}
    </Comp>
  );
}
