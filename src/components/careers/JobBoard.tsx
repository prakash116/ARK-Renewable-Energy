"use client";

import { useState } from "react";
import { m } from "motion/react";
import type { Job, JobDepartment } from "@/types/content";
import { jobDepartments } from "@/data/jobs";
import { cn } from "@/lib/utils";
import { JobCard } from "./JobCard";

type Filter = JobDepartment | "All";

export function JobBoard({ jobs }: { jobs: Job[] }) {
  const [dept, setDept] = useState<Filter>("All");
  const filtered = dept === "All" ? jobs : jobs.filter((j) => j.department === dept);
  const available = jobDepartments.filter((d) => d === "All" || jobs.some((j) => j.department === d));

  return (
    <div>
      <div className="-mx-5 sm:-mx-6 lg:mx-0">
        <div role="group" aria-label="Filter positions by department" className="flex gap-2 overflow-x-auto px-5 pb-1 scrollbar-none sm:px-6 lg:flex-wrap lg:px-0">
          {available.map((d) => {
            const active = d === dept;
            const count = d === "All" ? jobs.length : jobs.filter((j) => j.department === d).length;
            return (
              <button
                key={d}
                type="button"
                aria-pressed={active}
                onClick={() => setDept(d)}
                className={cn(
                  "inline-flex h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors",
                  active ? "border-primary bg-primary text-white" : "border-line-strong bg-card text-fg hover:border-fg",
                )}
              >
                {d}
                <span className={cn("font-mono text-xs tabular-nums", active ? "text-white/70" : "text-fg-soft")}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>
      <p className="mt-5 text-sm text-fg-muted" aria-live="polite">
        {filtered.length} open {filtered.length === 1 ? "position" : "positions"}
      </p>
      <ul className="mt-4 space-y-3">
        {filtered.map((j, i) => (
          <m.li
            key={`${dept}-${j.slug}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: Math.min(i, 6) * 0.05, ease: [0.16, 1, 0.3, 1] }}
          >
            <JobCard job={j} />
          </m.li>
        ))}
      </ul>
    </div>
  );
}
