import { cn } from "@/lib/utils";
import { Eyebrow } from "./Eyebrow";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  size?: "h1" | "h2" | "h3";
  className?: string;
  id?: string;
  /** Optional actions rendered to the right on large screens. */
  actions?: React.ReactNode;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as: Heading = "h2",
  size = "h2",
  className,
  id,
  actions,
}: SectionHeadingProps) {
  const sizeClass = size === "h1" ? "text-h1" : size === "h3" ? "text-h3" : "text-h2";
  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        actions && "lg:flex-row lg:items-end lg:justify-between",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <div className={cn("max-w-3xl", align === "center" && "mx-auto")}>
        {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}
        <Heading id={id} className={cn(sizeClass, "text-fg")}>
          {title}
        </Heading>
        {description && (
          <p className="text-lead mt-4 max-w-2xl text-fg-muted sm:mt-5">{description}</p>
        )}
      </div>
      {actions && <div className="shrink-0">{actions}</div>}
    </div>
  );
}
