import { Download } from "lucide-react";
import type { IconName, ResourceLink } from "@/types/content";
import { resourceTypeLabel } from "@/data/resources";
import { cn } from "@/lib/utils";
import { Badge, PlaceholderBadge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";

const typeIcon: Record<ResourceLink["type"], IconName> = {
  catalogue: "book-open",
  manual: "file-text",
  guide: "drafting",
  faq: "help-circle",
  datasheet: "file-text",
  report: "bar-chart",
  policy: "scale",
};

/**
 * Downloadable resource. When `href` is "#" the file has not been uploaded yet
 * and the card renders as a non-link with a clear "file pending" state.
 */
export function ResourceCard({ resource, className }: { resource: ResourceLink; className?: string }) {
  const pending = resource.href === "#";
  const body = (
    <>
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary theme-dark:bg-white/5 theme-dark:text-lime">
          <Icon name={typeIcon[resource.type]} />
        </span>
        {pending ? (
          <span className="text-xs text-fg-soft">File pending</span>
        ) : (
          <Download
            aria-hidden
            className="size-5 text-fg-soft transition-transform duration-300 group-hover:translate-y-0.5 group-hover:text-fg"
          />
        )}
      </div>
      <h3 className="text-h4 mt-5">{resource.title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{resource.description}</p>
      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-fg-soft">
        <Badge variant="outline">{resourceTypeLabel[resource.type]}</Badge>
        {resource.fileSize && <span>{resource.fileSize}</span>}
        {resource.updated && <span>Updated {resource.updated}</span>}
        {resource.isPlaceholder && <PlaceholderBadge />}
      </div>
    </>
  );

  const classes = cn(
    "group flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-card p-5",
    !pending && "transition-[border-color,transform,box-shadow] duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[0_20px_40px_-30px_rgba(11,15,14,0.35)]",
    className,
  );

  if (pending) return <div className={classes}>{body}</div>;
  return (
    <a href={resource.href} className={classes} download>
      {body}
    </a>
  );
}
