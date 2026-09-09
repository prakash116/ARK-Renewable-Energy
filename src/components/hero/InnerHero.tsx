import type { ImageRef } from "@/types/content";
import { cn } from "@/lib/utils";
import type { Crumb } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SolarImage } from "@/components/visuals/SolarImage";

interface InnerHeroProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  crumbs?: Crumb[];
  /** Optional background scene (rendered at reduced opacity behind the copy). */
  visual?: ImageRef;
  /** Extra content under the description: buttons, meta chips. */
  children?: React.ReactNode;
  size?: "default" | "compact" | "large";
  /** Right-hand aside on lg+ (e.g. a framed visual or a fact card). */
  aside?: React.ReactNode;
  className?: string;
}

/** Dark hero used by every inner page so the transparent header stays legible. */
export function InnerHero({
  eyebrow,
  title,
  description,
  crumbs,
  visual,
  children,
  size = "default",
  aside,
  className,
}: InnerHeroProps) {
  return (
    <section className={cn("theme-dark relative isolate overflow-hidden bg-ink text-fg", className)}>
      {visual ? (
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-45">
            <SolarImage variant={visual.visual} tone={visual.tone ?? "ink"} priority className="absolute inset-0" />
          </div>
          <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/50" />
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink to-transparent" />
        </div>
      ) : (
        <>
          <div aria-hidden className="absolute inset-0 bg-grid-dark mask-fade-b opacity-50" />
          <div aria-hidden className="absolute -top-40 right-0 size-[30rem] rounded-full bg-primary/40 blur-3xl" />
        </>
      )}

      <Container
        className={cn(
          "relative",
          size === "compact" && "pt-24 pb-10 sm:pt-28 sm:pb-12 lg:pt-36 lg:pb-16",
          size === "default" && "pt-26 pb-12 sm:pt-32 sm:pb-16 lg:pt-40 lg:pb-24",
          size === "large" && "pt-28 pb-14 sm:pt-32 sm:pb-20 lg:pt-44 lg:pb-32",
        )}
      >
        <div className={cn(aside && "lg:grid lg:grid-cols-12 lg:items-end lg:gap-10")}>
          <div className={cn(aside && "lg:col-span-7")}>
            {crumbs && crumbs.length > 0 && <Breadcrumbs crumbs={crumbs} className="mb-6" />}
            {eyebrow && <Eyebrow className="text-fg-muted">{eyebrow}</Eyebrow>}
            <h1 className={cn("mt-4 max-w-4xl text-white", size === "large" ? "text-display" : "text-h1")}>
              {title}
            </h1>
            {description && <p className="text-lead mt-5 max-w-2xl text-fg-muted">{description}</p>}
            {children && <div className="mt-8">{children}</div>}
          </div>
          {aside && <div className="mt-10 lg:col-span-5 lg:mt-0">{aside}</div>}
        </div>
      </Container>
    </section>
  );
}
