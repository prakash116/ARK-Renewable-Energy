import { Download, FileText } from "lucide-react";
import type { DocumentCard as DocumentCardData } from "@/types/content";
import { cn } from "@/lib/utils";
import { Badge, PlaceholderBadge } from "./Badge";

/** Corporate / investor document row-card. "#" href renders as pending. */
export function DocumentCard({ doc, className }: { doc: DocumentCardData; className?: string }) {
  const pending = doc.href === "#";
  const inner = (
    <>
      <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary theme-dark:bg-white/5 theme-dark:text-lime">
        <FileText aria-hidden className="size-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[15px] font-semibold">{doc.title}</span>
        {doc.description && <span className="mt-0.5 block text-sm text-fg-muted">{doc.description}</span>}
        <span className="mt-2 flex flex-wrap items-center gap-2 text-xs text-fg-soft">
          <Badge variant="outline">{doc.category}</Badge>
          {doc.updated && <span>{doc.updated}</span>}
          {doc.fileSize && <span>{doc.fileSize}</span>}
          {doc.isPlaceholder && <PlaceholderBadge />}
        </span>
      </span>
      <span className="shrink-0 self-center text-xs text-fg-soft">
        {pending ? (
          "Pending"
        ) : (
          <Download aria-hidden className="size-5 transition-transform duration-300 group-hover:translate-y-0.5 group-hover:text-fg" />
        )}
      </span>
    </>
  );
  const classes = cn(
    "group flex gap-4 rounded-[var(--radius-card)] border border-line bg-card p-4 sm:p-5",
    !pending && "transition-colors hover:border-line-strong",
    className,
  );
  if (pending) return <div className={classes}>{inner}</div>;
  return (
    <a href={doc.href} className={classes} download>
      {inner}
    </a>
  );
}
