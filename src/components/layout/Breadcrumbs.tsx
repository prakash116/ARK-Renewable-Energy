import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { breadcrumbSchema, type Crumb } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { JsonLd } from "@/components/seo/JsonLd";

/** Visible breadcrumb trail + BreadcrumbList structured data. */
export function Breadcrumbs({ crumbs, className }: { crumbs: Crumb[]; className?: string }) {
  const all: Crumb[] = [{ name: "Home", path: "/" }, ...crumbs];
  return (
    <nav aria-label="Breadcrumb" className={cn("text-xs sm:text-[13px]", className)}>
      <JsonLd data={breadcrumbSchema(all)} />
      <ol className="flex flex-wrap items-center gap-1 text-fg-muted">
        {all.map((c, i) => {
          const last = i === all.length - 1;
          return (
            <li key={c.path} className="inline-flex items-center gap-1">
              {i > 0 && <ChevronRight aria-hidden className="size-3.5 text-fg-soft" />}
              {last ? (
                <span aria-current="page" className="text-fg">
                  {c.name}
                </span>
              ) : (
                <Link href={c.path} className="py-1 transition-colors hover:text-fg">
                  {c.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
