import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes safely. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Zero-padded two digit index: 0 -> "01". */
export function pad2(n: number) {
  return String(n + 1).padStart(2, "0");
}

/** Format an integer with Indian digit grouping (1,20,000). */
export function formatNumber(value: number, locale = "en-IN") {
  return new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(value);
}

/** Convert a slug into Title Case for fallbacks. */
export function humanize(slug: string) {
  return slug
    .split(/[-_]/)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
}

/** Format an ISO date for display (e.g. 12 Aug 2026). */
export function formatDate(iso: string, locale = "en-IN") {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}
