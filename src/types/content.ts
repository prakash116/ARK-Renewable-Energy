/**
 * Content models.
 *
 * All repeated website content is typed here so the UI stays decoupled from
 * the data source. Data currently lives in `src/data/*.ts`; swapping in a CMS
 * only requires returning objects of these shapes.
 */

/** Curated icon names resolved by `components/ui/Icon`. */
export type IconName =
  | "arrow-right"
  | "arrow-up-right"
  | "award"
  | "bar-chart"
  | "battery"
  | "book-open"
  | "briefcase"
  | "building"
  | "check"
  | "circuit"
  | "clipboard-check"
  | "clock"
  | "compass"
  | "cpu"
  | "download"
  | "drafting"
  | "droplets"
  | "eye"
  | "factory"
  | "file-text"
  | "gauge"
  | "globe"
  | "graduation-cap"
  | "hammer"
  | "hand-heart"
  | "headphones"
  | "heart"
  | "help-circle"
  | "home"
  | "landmark"
  | "layers"
  | "leaf"
  | "lightbulb"
  | "lock"
  | "mail"
  | "map-pin"
  | "message-circle"
  | "network"
  | "phone"
  | "plug"
  | "recycle"
  | "ruler"
  | "scale"
  | "settings"
  | "shield-check"
  | "sparkles"
  | "sprout"
  | "sun"
  | "target"
  | "tractor"
  | "tree"
  | "trending-up"
  | "users"
  | "wrench"
  | "zap";

/** Generative visual variants rendered by `lib/solar-scenes` and served from /visuals/*.svg. */
export type VisualVariant =
  | "pumping"
  | "rooftop"
  | "plant"
  | "lighting"
  | "field"
  | "grid"
  | "community";

/**
 * Image reference. When `src` is present it is rendered with next/image;
 * otherwise the generative `visual` is used. This lets real photography be
 * dropped in later without touching the UI.
 */
export interface ImageRef {
  src?: string;
  alt: string;
  visual: VisualVariant;
  /** Optional accent hue override for the generative visual. */
  tone?: "forest" | "ink" | "lime" | "solar";
}

export interface Feature {
  title: string;
  description: string;
  icon?: IconName;
}

export interface Step {
  title: string;
  description: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface Spec {
  label: string;
  value: string;
  /** Marks values that must be confirmed against real product data. */
  isPlaceholder?: boolean;
}

export type ResourceType =
  | "catalogue"
  | "manual"
  | "guide"
  | "faq"
  | "datasheet"
  | "report"
  | "policy";

export interface ResourceLink {
  id: string;
  title: string;
  type: ResourceType;
  description: string;
  href: string;
  fileSize?: string;
  updated?: string;
  /** Solution slug(s) this resource belongs to. */
  solutions?: SolutionSlug[];
  isPlaceholder?: boolean;
}

/* ------------------------------------------------------------------ */
/* Solutions                                                           */
/* ------------------------------------------------------------------ */

export type SolutionSlug =
  | "solar-water-pumping"
  | "solar-rooftop"
  | "solar-power-plants"
  | "solar-street-lighting";

export interface UseCase {
  title: string;
  segment: string;
  description: string;
  outcome: string;
}

export interface Solution {
  id: string;
  slug: SolutionSlug;
  number: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  icon: IconName;
  heroImage: ImageRef;
  overview: string[];
  benefits: Feature[];
  applications: Feature[];
  howItWorks: Step[];
  capabilities: Spec[];
  components: Feature[];
  process: Step[];
  useCases: UseCase[];
  faqs: Faq[];
  resourceIds: string[];
  seo: { title: string; description: string };
}

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export type ProjectCategory =
  | "solar-pumping"
  | "rooftop"
  | "epc"
  | "industrial"
  | "agriculture"
  | "street-lighting";

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface Project {
  slug: string;
  title: string;
  /** Primary category shown on cards. */
  category: ProjectCategory;
  /** All categories used for filtering. */
  categories: ProjectCategory[];
  solution: SolutionSlug;
  location: string;
  state: string;
  capacity: string;
  year: string;
  client?: string;
  summary: string;
  image: ImageRef;
  featured: boolean;
  isPlaceholder: boolean;
  overview: string[];
  challenge: string[];
  solutionApproach: string[];
  technology: Spec[];
  execution: Step[];
  results: ProjectMetric[];
  gallery: ImageRef[];
}

/* ------------------------------------------------------------------ */
/* People & voice                                                      */
/* ------------------------------------------------------------------ */

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  location: string;
  projectType: string;
  isPlaceholder: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  bio: string;
  photo?: ImageRef;
  linkedin?: string;
  isPlaceholder: boolean;
}

/* ------------------------------------------------------------------ */
/* Careers                                                             */
/* ------------------------------------------------------------------ */

export type EmploymentType = "Full-time" | "Contract" | "Internship";
export type JobDepartment =
  | "Engineering"
  | "Projects"
  | "Sales"
  | "Operations"
  | "Service"
  | "Corporate";

export interface Job {
  slug: string;
  title: string;
  department: JobDepartment;
  location: string;
  type: EmploymentType;
  experience: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  postedOn: string; // ISO date
  validThrough?: string; // ISO date
  isPlaceholder: boolean;
}

/* ------------------------------------------------------------------ */
/* Metrics & misc                                                      */
/* ------------------------------------------------------------------ */

export interface Stat {
  id: string;
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  note?: string;
  isPlaceholder: boolean;
}

export interface TimelineEntry {
  year: string;
  title: string;
  description: string;
  isPlaceholder?: boolean;
}

export interface DocumentCard {
  id: string;
  title: string;
  category: string;
  description?: string;
  href: string;
  updated?: string;
  fileSize?: string;
  isPlaceholder: boolean;
}
