import Link from "next/link";
import { ArrowUpRight, Briefcase, Clock, MapPin } from "lucide-react";
import type { Job } from "@/types/content";
import { cn, formatDate } from "@/lib/utils";
import { Badge, PlaceholderBadge } from "@/components/ui/Badge";

export function JobCard({ job, className }: { job: Job; className?: string }) {
  return (
    <article
      className={cn(
        "group relative flex flex-col gap-4 rounded-[var(--radius-card)] border border-line bg-card p-5 transition-[border-color,transform] duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-line-strong sm:flex-row sm:items-center sm:justify-between sm:p-6",
        className,
      )}
    >
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="neutral">{job.department}</Badge>
          {job.isPlaceholder && <PlaceholderBadge />}
        </div>
        <h3 className="text-h4 mt-3">
          <Link href={`/careers/${job.slug}`} className="after:absolute after:inset-0">
            {job.title}
          </Link>
        </h3>
        <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-fg-muted">
          <li className="inline-flex items-center gap-1.5">
            <MapPin aria-hidden className="size-3.5" />
            {job.location}
          </li>
          <li className="inline-flex items-center gap-1.5">
            <Briefcase aria-hidden className="size-3.5" />
            {job.type} · {job.experience}
          </li>
          <li className="inline-flex items-center gap-1.5">
            <Clock aria-hidden className="size-3.5" />
            Posted {formatDate(job.postedOn)}
          </li>
        </ul>
      </div>
      <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-line-strong text-fg-muted transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-white">
        <ArrowUpRight aria-hidden className="size-5" />
      </span>
    </article>
  );
}
