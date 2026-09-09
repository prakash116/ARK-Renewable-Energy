import type { Feature, ImageRef, Stat } from "@/types/content";

/**
 * CSR content.
 * TODO: Replace focus-area descriptions and metrics with verified programme
 *       details and outcomes.
 */

export interface CsrFocusArea extends Feature {
  id: string;
  image: ImageRef;
  points: string[];
}

export const csrFocusAreas: CsrFocusArea[] = [
  {
    id: "clean-energy",
    title: "Clean energy access",
    description: "Bringing reliable solar power to households, schools and health centres beyond the grid.",
    icon: "sun",
    image: { alt: "Village homes with rooftop solar panels", visual: "community" },
    points: [
      "Solar lighting for community buildings",
      "Awareness sessions on safe use and maintenance",
      "Support for local technician training",
    ],
  },
  {
    id: "rural-development",
    title: "Rural development",
    description: "Supporting infrastructure that improves daily life in the communities where we work.",
    icon: "home",
    image: { alt: "Solar street lights along a village road", visual: "lighting" },
    points: [
      "Street lighting for village roads and public spaces",
      "Drinking water pumping for community schemes",
      "Local employment during installation and maintenance",
    ],
  },
  {
    id: "agriculture",
    title: "Agriculture",
    description: "Helping farmers reduce dependence on diesel and improve water-use efficiency.",
    icon: "tractor",
    image: { alt: "Solar pumping system in a farm field", visual: "field" },
    points: [
      "Demonstration solar pumping units",
      "Guidance on drip and efficient irrigation",
      "Farmer education on system operation",
    ],
  },
  {
    id: "community",
    title: "Community initiatives",
    description: "Partnering with local institutions on education, skills and health.",
    icon: "users",
    image: { alt: "Community gathering near a solar installation", visual: "community", tone: "solar" },
    points: [
      "Skill development for local youth in solar installation",
      "Support for school infrastructure",
      "Volunteering by ARK employees",
    ],
  },
  {
    id: "environment",
    title: "Environmental responsibility",
    description: "Reducing our own footprint and managing end-of-life equipment responsibly.",
    icon: "leaf",
    image: { alt: "Solar plant surrounded by open land", visual: "plant" },
    points: [
      "Responsible recycling of modules and batteries",
      "Waste and water management on project sites",
      "Tree plantation drives near project locations",
    ],
  },
];

export const csrStats: Stat[] = [
  { id: "villages", value: 120, suffix: "+", label: "Villages reached", isPlaceholder: true },
  { id: "lights", value: 2500, suffix: "+", label: "Community lights installed", isPlaceholder: true },
  { id: "farmers", value: 1800, suffix: "+", label: "Farmers supported", isPlaceholder: true },
  { id: "trained", value: 350, suffix: "+", label: "Technicians trained", isPlaceholder: true },
];
