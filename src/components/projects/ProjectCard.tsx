import Link from "next/link";
import { ArrowUpRight, MapPin, Zap } from "lucide-react";
import type { Project } from "@/types/content";
import { categoryLabel } from "@/data/projects";
import { cn } from "@/lib/utils";
import { Badge, PlaceholderBadge } from "@/components/ui/Badge";
import { MediaFrame } from "@/components/visuals/MediaFrame";

export function ProjectCard({ project, className }: { project: Project; className?: string }) {
  return (
    <article className={cn("group relative flex flex-col", className)}>
      <Link href={`/projects/${project.slug}`} className="block overflow-hidden rounded-[var(--radius-media)]">
        <MediaFrame
          image={project.image}
          aspect="wide"
          rounded="none"
          sizes="(min-width: 1024px) 45vw, 100vw"
          imgClassName="transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
        />
      </Link>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Badge variant="neutral">{categoryLabel[project.category]}</Badge>
        <span className="inline-flex items-center gap-1 text-xs text-fg-muted">
          <MapPin aria-hidden className="size-3.5" />
          {project.location}, {project.state}
        </span>
        <span className="inline-flex items-center gap-1 text-xs text-fg-muted">
          <Zap aria-hidden className="size-3.5" />
          {project.capacity}
        </span>
        {project.isPlaceholder && <PlaceholderBadge />}
      </div>
      <h3 className="text-h4 mt-3">
        <Link href={`/projects/${project.slug}`} className="inline-flex items-start gap-1.5 after:absolute after:inset-0">
          {project.title}
          <ArrowUpRight
            aria-hidden
            className="mt-1 size-4 shrink-0 text-fg-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-fg-muted sm:text-[15px]">{project.summary}</p>
    </article>
  );
}
