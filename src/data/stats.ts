import type { Stat } from "@/types/content";

/**
 * Credibility metrics shown on the homepage.
 * TODO: Replace placeholder values with verified company figures.
 */
export const trustStats: Stat[] = [
  { id: "years", value: 25, suffix: "+", label: "Years of experience", isPlaceholder: true },
  { id: "projects", value: 500, suffix: "+", label: "Projects delivered", isPlaceholder: true },
  { id: "states", value: 10, suffix: "+", label: "States served", isPlaceholder: true },
  { id: "quality", value: 100, suffix: "%", label: "Commitment to quality", isPlaceholder: false },
];

/**
 * Impact metrics shown on the homepage and CSR page.
 * TODO: Replace with verified figures and the methodology used to calculate them.
 */
export const impactStats: Stat[] = [
  {
    id: "co2",
    value: 120000,
    suffix: " t",
    label: "CO₂ emissions avoided",
    note: "Estimated lifetime avoidance across installed systems",
    isPlaceholder: true,
  },
  {
    id: "energy",
    value: 180,
    suffix: " GWh",
    label: "Clean energy generated",
    note: "Cumulative generation from commissioned systems",
    isPlaceholder: true,
  },
  {
    id: "capacity",
    value: 150,
    suffix: " MW",
    label: "Solar capacity installed",
    note: "Across pumping, rooftop and ground-mounted projects",
    isPlaceholder: true,
  },
  {
    id: "communities",
    value: 300,
    suffix: "+",
    label: "Communities supported",
    note: "Villages, farms and institutions served",
    isPlaceholder: true,
  },
];
