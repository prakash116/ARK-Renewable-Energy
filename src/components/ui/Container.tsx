import { cn } from "@/lib/utils";

type Size = "default" | "narrow" | "prose" | "wide";

const sizes: Record<Size, string> = {
  default: "max-w-7xl",
  narrow: "max-w-4xl",
  prose: "max-w-3xl",
  wide: "max-w-[90rem]",
};

export function Container({
  children,
  className,
  size = "default",
  as: Comp = "div",
}: {
  children: React.ReactNode;
  className?: string;
  size?: Size;
  as?: "div" | "section" | "nav" | "footer" | "header" | "article";
}) {
  return (
    <Comp className={cn("mx-auto w-full px-5 sm:px-6 lg:px-8", sizes[size], className)}>
      {children}
    </Comp>
  );
}
