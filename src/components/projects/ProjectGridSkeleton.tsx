import { projectCategories } from "@/data/projects";

/**
 * Suspense fallback for ProjectGrid. Mirrors the real layout (filter row,
 * result count, card grid) so swapping in the grid causes no layout shift.
 */
export function ProjectGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div aria-hidden className="animate-pulse">
      <div className="-mx-5 border-b border-line sm:-mx-6 lg:mx-0 lg:border-0">
        <div className="flex gap-2 overflow-hidden px-5 pb-4 sm:px-6 lg:flex-wrap lg:px-0 lg:pb-0">
          {projectCategories.map((c) => (
            <span
              key={c.value}
              className="inline-flex h-11 shrink-0 items-center rounded-full border border-line-strong bg-card-2 px-4 text-sm text-transparent"
            >
              {c.label}
            </span>
          ))}
        </div>
      </div>
      <p className="mt-6 text-sm text-transparent">Loading projects</p>
      <ul className="mt-6 grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
        {Array.from({ length: count }).map((_, i) => (
          <li key={i}>
            <div className="aspect-[16/10] rounded-[var(--radius-media)] bg-card-2" />
            <div className="mt-4 h-6 w-2/3 rounded-full bg-card-2" />
            <div className="mt-3 h-6 w-5/6 rounded bg-card-2" />
            <div className="mt-2 h-10 rounded bg-card-2" />
          </li>
        ))}
      </ul>
    </div>
  );
}
