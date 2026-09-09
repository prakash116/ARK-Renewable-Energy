import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** Inline text link with animated underline and shifting arrow. */
export function LinkArrow({
  href,
  children,
  className,
  external = false,
  size = "md",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
  size?: "sm" | "md";
}) {
  const Arrow = external ? ArrowUpRight : ArrowRight;
  const classes = cn(
    "group/link inline-flex touch-target items-center gap-1.5 font-semibold text-fg",
    size === "sm" ? "text-sm" : "text-[15px]",
    className,
  );
  const inner = (
    <>
      <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 ease-out-expo group-hover/link:bg-[length:100%_1px]">
        {children}
      </span>
      <Arrow
        aria-hidden
        className={cn(
          "size-4 shrink-0 transition-transform duration-300 ease-out-expo",
          external
            ? "group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
            : "group-hover/link:translate-x-1",
        )}
      />
    </>
  );
  if (external || /^(https?:|mailto:|tel:)/.test(href)) {
    return (
      <a href={href} className={classes} target={/^https?:/.test(href) ? "_blank" : undefined} rel="noopener noreferrer">
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}
