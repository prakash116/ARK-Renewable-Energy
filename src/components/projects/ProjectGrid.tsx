"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { m } from "motion/react";
import type { Project, ProjectCategory } from "@/types/content";
import { projectCategories } from "@/data/projects";
import { cn } from "@/lib/utils";
import { ProjectCard } from "./ProjectCard";

type Filter = ProjectCategory | "all";

const valid = new Set<Filter>(projectCategories.map((c) => c.value));

/** Filterable portfolio grid. Filter state mirrors `?category=` without navigation. */
export function ProjectGrid({ projects }: { projects: Project[] }) {
  const params = useSearchParams();
  const initial = params.get("category") as Filter | null;
  const [category, setCategory] = useState<Filter>(initial && valid.has(initial) ? initial : "all");

  const filtered = category === "all" ? projects : projects.filter((p) => p.categories.includes(category));

  function select(next: Filter) {
    setCategory(next);
    const url = new URL(window.location.href);
    if (next === "all") url.searchParams.delete("category");
    else url.searchParams.set("category", next);
    window.history.replaceState(null, "", url);
  }

  const counts = projectCategories.map((c) => ({
    ...c,
    count: c.value === "all" ? projects.length : projects.filter((p) => p.categories.includes(c.value as ProjectCategory)).length,
  }));

  return (
    <div>
      <div className="-mx-5 border-b border-line sm:-mx-6 lg:mx-0 lg:border-0">
        <div
          role="group"
          aria-label="Filter projects by category"
          className="flex gap-2 overflow-x-auto px-5 pb-4 scrollbar-none sm:px-6 lg:flex-wrap lg:px-0 lg:pb-0"
        >
          {counts.map((c) => {
            const active = c.value === category;
            return (
              <button
                key={c.value}
                type="button"
                aria-pressed={active}
                onClick={() => select(c.value)}
                className={cn(
                  "inline-flex h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors",
                  active
                    ? "border-primary bg-primary text-white"
                    : "border-line-strong bg-card text-fg hover:border-fg",
                )}
              >
                {c.label}
                <span className={cn("font-mono text-xs tabular-nums", active ? "text-white/70" : "text-fg-soft")}>
                  {c.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <p className="mt-6 text-sm text-fg-muted" aria-live="polite">
        Showing {filtered.length} of {projects.length} projects
      </p>

      {filtered.length === 0 ? (
        <div className="mt-8 rounded-[var(--radius-card)] border border-dashed border-line-strong p-10 text-center text-fg-muted">
          No projects in this category yet.
        </div>
      ) : (
        <ul className="mt-6 grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
          {filtered.map((p, i) => (
            <m.li
              key={`${category}-${p.slug}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: Math.min(i, 8) * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectCard project={p} />
            </m.li>
          ))}
        </ul>
      )}
    </div>
  );
}
