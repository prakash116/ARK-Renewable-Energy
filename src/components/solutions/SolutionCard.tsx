import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Solution } from "@/types/content";
import { cn } from "@/lib/utils";
import { SolarImage } from "@/components/visuals/SolarImage";

/** Image-led solution card with number, title, description and arrow. */
export function SolutionCard({
  solution,
  className,
  size = "default",
}: {
  solution: Solution;
  className?: string;
  size?: "default" | "large";
}) {
  return (
    <Link
      href={`/solutions/${solution.slug}`}
      className={cn(
        "group relative isolate flex min-h-[19rem] flex-col justify-end overflow-hidden rounded-[var(--radius-media)] bg-ink text-white",
        size === "large" ? "sm:min-h-[24rem] lg:min-h-[28rem]" : "lg:min-h-[22rem]",
        className,
      )}
    >
      <div className="absolute inset-0 transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]">
        <SolarImage variant={solution.heroImage.visual} tone={solution.heroImage.tone} alt="" />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/45 to-ink/10 transition-opacity duration-500 group-hover:opacity-90"
      />

      <div className="absolute top-5 right-5 left-5 flex items-center justify-between">
        <span className="font-mono text-sm text-white/70 tabular-nums">{solution.number}</span>
        <span className="inline-flex size-11 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-sm transition-all duration-300 ease-out-expo group-hover:border-lime group-hover:bg-lime group-hover:text-ink">
          <ArrowUpRight aria-hidden className="size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>

      <div className="relative p-5 sm:p-6 lg:p-7">
        <h3 className={cn("text-h3 text-white", size === "large" && "lg:text-h2")}>{solution.title}</h3>
        <p className="mt-2 max-w-md text-[15px] leading-relaxed text-white/75">{solution.description}</p>
      </div>
    </Link>
  );
}
