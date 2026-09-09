import { Plus } from "lucide-react";
import type { Faq } from "@/types/content";
import { cn } from "@/lib/utils";

/**
 * Native <details> accordion: accessible, keyboard-friendly, no JS required.
 * Pair with `faqSchema()` on the page for FAQ rich results.
 */
export function FaqAccordion({ faqs, className }: { faqs: Faq[]; className?: string }) {
  return (
    <div className={cn("divide-y divide-line border-y border-line", className)}>
      {faqs.map((f, i) => (
        <details key={f.question} className="group" open={i === 0}>
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-5 text-left [&::-webkit-details-marker]:hidden">
            <span className="text-h4 pr-2">{f.question}</span>
            <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-line-strong text-fg-muted transition-transform duration-300 ease-out-expo group-open:rotate-45 group-open:border-accent group-open:text-accent">
              <Plus aria-hidden className="size-4" />
            </span>
          </summary>
          <div className="pb-6 text-[15px] leading-relaxed text-fg-muted sm:max-w-3xl">
            <p>{f.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
