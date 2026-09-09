import { cn } from "@/lib/utils";

/** Horizontal in-page anchor navigation. Scrolls inside its own container on mobile. */
export function SectionNav({ items, className }: { items: { id: string; label: string }[]; className?: string }) {
  return (
    <nav aria-label="On this page" className={cn("sticky top-16 z-30 border-b border-line bg-canvas/90 backdrop-blur-md lg:top-20", className)}>
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        <ul className="-mx-1 flex gap-1 overflow-x-auto py-2 scrollbar-none mask-fade-x">
          {items.map((it) => (
            <li key={it.id} className="shrink-0">
              <a
                href={`#${it.id}`}
                className="inline-flex h-10 items-center rounded-full px-3.5 text-sm font-medium whitespace-nowrap text-fg-muted transition-colors hover:bg-card-2 hover:text-fg"
              >
                {it.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
