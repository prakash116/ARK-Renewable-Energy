import type { Feature, Step, TimelineEntry } from "@/types/content";

/** "Why ARK" pillars. */
export const whyArk: Feature[] = [
  {
    title: "Engineering excellence",
    description: "Every system is sized from site data, not templates, so it performs as modelled.",
    icon: "drafting",
  },
  {
    title: "Reliable technology",
    description: "Proven components from qualified manufacturers, selected for Indian conditions.",
    icon: "shield-check",
  },
  {
    title: "End-to-end execution",
    description: "Survey, design, supply, installation, commissioning and service under one team.",
    icon: "layers",
  },
  {
    title: "Quality components",
    description: "Modules, inverters, pumps and structures that carry real manufacturer warranties.",
    icon: "clipboard-check",
  },
  {
    title: "Responsive support",
    description: "Field service, remote monitoring and spares that keep systems running.",
    icon: "headphones",
  },
  {
    title: "Sustainable impact",
    description: "Cleaner energy and lower operating cost for farms, businesses and communities.",
    icon: "leaf",
  },
];

/** Delivery process. */
export const processSteps: Step[] = [
  { title: "Consultation", description: "Understand your energy need, site and budget." },
  { title: "Site assessment", description: "Survey, measurements, shading and water or load study." },
  { title: "System design", description: "Sizing, yield simulation, layout and itemised proposal." },
  { title: "Engineering & procurement", description: "Detailed drawings and sourcing from qualified vendors." },
  { title: "Installation", description: "Trained teams, safety protocols and quality checkpoints." },
  { title: "Commissioning", description: "Testing, verification and handover documentation." },
  { title: "After-sales support", description: "Monitoring, maintenance and responsive service." },
];

/** Company values. */
export const values: Feature[] = [
  { title: "Integrity", description: "We say what we will deliver and deliver what we say.", icon: "shield-check" },
  { title: "Engineering rigour", description: "Decisions are based on measurement, simulation and standards.", icon: "drafting" },
  { title: "Customer outcomes", description: "Success is a system that performs for years, not a signed order.", icon: "target" },
  { title: "Safety", description: "No schedule is worth an injury on site.", icon: "eye" },
  { title: "Sustainability", description: "Clean energy is our product and our responsibility.", icon: "leaf" },
  { title: "Long-term partnership", description: "We build relationships that last as long as the systems we install.", icon: "hand-heart" },
];

/** Capabilities listed on the About page. */
export const capabilities: Feature[] = [
  { title: "Design & engineering", description: "PV system design, yield modelling, structural and electrical engineering.", icon: "drafting" },
  { title: "Procurement", description: "Qualified vendor base for modules, inverters, pumps, batteries and structures.", icon: "layers" },
  { title: "Installation", description: "Trained field teams for rooftop, ground-mounted, pumping and lighting works.", icon: "hammer" },
  { title: "Commissioning", description: "Testing, grid synchronisation and performance verification.", icon: "clipboard-check" },
  { title: "Operations & maintenance", description: "Monitoring, preventive maintenance and spares management.", icon: "wrench" },
  { title: "Dealer network", description: "Regional partners for sales and first-line service.", icon: "network" },
];

/**
 * Company timeline.
 * TODO: Replace with verified milestones and years.
 */
export const timeline: TimelineEntry[] = [
  { year: "Founding", title: "ARK is established", description: "Founded with a focus on solar water pumping for agriculture.", isPlaceholder: true },
  { year: "Growth", title: "Rooftop solar added", description: "Residential and commercial rooftop systems join the portfolio.", isPlaceholder: true },
  { year: "Scale", title: "First EPC plant delivered", description: "Ground-mounted solar plant commissioned for a captive consumer.", isPlaceholder: true },
  { year: "Reach", title: "Dealer network expands", description: "Regional partners established across multiple states.", isPlaceholder: true },
  { year: "Today", title: "Integrated clean-energy engineering", description: "Pumping, rooftop, power plants and street lighting delivered end to end.", isPlaceholder: true },
];

/**
 * Certifications and partners.
 * TODO: Add verified certifications (e.g. ISO, MNRE empanelment) and partner
 *       logos only when documentation is available. Left empty by design.
 */
export const certifications: { name: string; description: string }[] = [];
export const partners: { name: string; logo?: string }[] = [];
