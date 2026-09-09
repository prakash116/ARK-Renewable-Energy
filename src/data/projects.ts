import type { Project, ProjectCategory } from "@/types/content";

/**
 * Project portfolio.
 *
 * TODO: Replace every placeholder project with verified project data
 *       (location, capacity, client, results, photography). All items below
 *       are illustrative examples and are flagged `isPlaceholder: true`.
 */

export const projectCategories: { value: ProjectCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "solar-pumping", label: "Solar Pumping" },
  { value: "rooftop", label: "Rooftop" },
  { value: "epc", label: "EPC" },
  { value: "industrial", label: "Industrial" },
  { value: "agriculture", label: "Agriculture" },
  { value: "street-lighting", label: "Street Lighting" },
];

export const categoryLabel: Record<ProjectCategory, string> = {
  "solar-pumping": "Solar Pumping",
  rooftop: "Rooftop",
  epc: "EPC",
  industrial: "Industrial",
  agriculture: "Agriculture",
  "street-lighting": "Street Lighting",
};

export const projects: Project[] = [
  {
    slug: "rajasthan-solar-water-pumping",
    title: "Rajasthan Solar Water Pumping Programme",
    category: "solar-pumping",
    categories: ["solar-pumping", "agriculture"],
    solution: "solar-water-pumping",
    location: "Jodhpur district",
    state: "Rajasthan",
    capacity: "120 systems · 3 to 7.5 HP",
    year: "2025",
    summary:
      "Distributed solar pumping systems replacing diesel pumps across smallholder farms in an arid district with deep borewells.",
    image: { alt: "Solar pumping array beside a farm pond in Rajasthan", visual: "pumping", tone: "solar" },
    featured: true,
    isPlaceholder: true,
    overview: [
      "A programme of standalone solar pumping systems for farmers across several villages, each sized to the borewell depth and cropping pattern of the individual holding.",
      "Systems were installed in phases to align with the sowing calendar, with local technicians trained for first-line service.",
    ],
    challenge: [
      "Borewell depths of 60 to 120 metres required high-head submersible pumps and careful array sizing.",
      "Dust and high ambient temperatures affect module output and controller cooling.",
      "Farmers needed confidence that daytime-only pumping would meet irrigation requirements.",
    ],
    solutionApproach: [
      "Site-specific sizing using measured static water levels and daily water requirement per crop cycle.",
      "MPPT controllers with dry-run protection and manual seasonal tilt structures to maintain output through the year.",
      "Water storage recommendations and drip integration to make the most of daytime pumping.",
    ],
    technology: [
      { label: "Pumps", value: "Submersible BLDC, 3 to 7.5 HP" },
      { label: "Modules", value: "Mono-PERC, seasonal tilt structures" },
      { label: "Control", value: "MPPT with dry-run and overload protection" },
      { label: "Monitoring", value: "Sample of units fitted with remote monitoring" },
    ],
    execution: [
      { title: "Survey", description: "Borewell yield and head measurement for every site." },
      { title: "Phased installation", description: "Village-wise deployment around the cropping calendar." },
      { title: "Training", description: "Operator and local technician training at handover." },
    ],
    results: [
      { value: "120", label: "Systems commissioned" },
      { value: "0 L", label: "Diesel used for irrigation" },
      { value: "3 phases", label: "Delivered on schedule" },
    ],
    gallery: [
      { alt: "Solar array and pump controller at a farm", visual: "pumping", tone: "solar" },
      { alt: "Farm irrigation channel fed by a solar pump", visual: "field", tone: "solar" },
      { alt: "Rows of solar modules at the edge of a field", visual: "field", tone: "forest" },
    ],
  },
  {
    slug: "haryana-rooftop-solar",
    title: "Gurugram Commercial Rooftop Installation",
    category: "rooftop",
    categories: ["rooftop"],
    solution: "solar-rooftop",
    location: "Gurugram",
    state: "Haryana",
    capacity: "250 kWp",
    year: "2025",
    summary:
      "A net-metered rooftop system on a commercial office building, offsetting daytime HVAC and lighting loads.",
    image: { alt: "Rooftop solar system on a commercial building", visual: "rooftop", tone: "ink" },
    featured: true,
    isPlaceholder: true,
    overview: [
      "A rooftop system on an RCC roof with limited free area, designed to maximise generation while preserving access to rooftop services.",
    ],
    challenge: [
      "Rooftop equipment and shading from adjacent towers constrained the usable area.",
      "Installation had to proceed with the building fully occupied.",
    ],
    solutionApproach: [
      "Shading analysis to position strings away from shadow paths and optimise tilt.",
      "Ballasted mounting to avoid roof penetration, with clean cable routing to the electrical room.",
      "Work sequenced around office hours with strict site safety protocols.",
    ],
    technology: [
      { label: "Modules", value: "High-efficiency mono-PERC" },
      { label: "Inverters", value: "String inverters with monitoring" },
      { label: "Mounting", value: "Ballasted, non-penetrative" },
      { label: "Metering", value: "Net metering with utility approval" },
    ],
    execution: [
      { title: "Roof study", description: "Structural check and shading simulation." },
      { title: "Approvals", description: "Net-metering documentation and coordination." },
      { title: "Installation", description: "Completed with the building in operation." },
    ],
    results: [
      { value: "250 kWp", label: "Installed capacity" },
      { value: "Net metered", label: "Grid export enabled" },
      { value: "Zero", label: "Roof penetrations" },
    ],
    gallery: [
      { alt: "Rooftop panels with city skyline", visual: "rooftop", tone: "ink" },
      { alt: "Inverter room and monitoring display", visual: "grid", tone: "ink" },
    ],
  },
  {
    slug: "gujarat-solar-epc",
    title: "Kutch Ground-Mounted Solar Plant",
    category: "epc",
    categories: ["epc", "industrial"],
    solution: "solar-power-plants",
    location: "Kutch",
    state: "Gujarat",
    capacity: "5 MW",
    year: "2024",
    summary:
      "Turnkey EPC delivery of a captive ground-mounted plant supplying an industrial consumer through a dedicated evacuation line.",
    image: { alt: "Ground-mounted solar plant in Gujarat", visual: "plant", tone: "forest" },
    featured: true,
    isPlaceholder: true,
    overview: [
      "A ground-mounted plant delivered end to end, from land assessment and evacuation study to commissioning and long-term O&M.",
    ],
    challenge: [
      "Saline soil and high wind loads demanded robust foundation and structure design.",
      "The evacuation route required coordination with the utility and adjacent landowners.",
    ],
    solutionApproach: [
      "Pile foundations with corrosion protection and structures rated for site wind conditions.",
      "Fixed-tilt layout optimised for annual yield with string inverters for granular monitoring.",
      "Dedicated HT line with metering at the consumer substation.",
    ],
    technology: [
      { label: "Modules", value: "Bifacial mono-PERC" },
      { label: "Inverters", value: "String inverters" },
      { label: "Structure", value: "Galvanised fixed tilt on piles" },
      { label: "Evacuation", value: "HT line to consumer substation" },
    ],
    execution: [
      { title: "Feasibility", description: "Resource, soil and grid studies." },
      { title: "Construction", description: "Civil, mechanical and electrical works with QA/QC." },
      { title: "Commissioning", description: "Testing, synchronisation and handover to O&M." },
    ],
    results: [
      { value: "5 MW", label: "Installed capacity" },
      { value: "Captive", label: "Dedicated supply" },
      { value: "O&M", label: "Long-term contract" },
    ],
    gallery: [
      { alt: "Rows of solar modules on a plant site", visual: "plant", tone: "forest" },
      { alt: "Transmission line leaving the solar plant", visual: "grid", tone: "ink" },
    ],
  },
  {
    slug: "punjab-agricultural-solar",
    title: "Bathinda Agricultural Solar Project",
    category: "agriculture",
    categories: ["agriculture", "solar-pumping"],
    solution: "solar-water-pumping",
    location: "Bathinda",
    state: "Punjab",
    capacity: "7.5 HP pumps · 40 farms",
    year: "2024",
    summary:
      "High-capacity solar pumping paired with drip irrigation for water-intensive crops across a cluster of farms.",
    image: { alt: "Solar array beside cultivated fields in Punjab", visual: "field", tone: "forest" },
    featured: true,
    isPlaceholder: true,
    overview: [
      "A cluster project combining 7.5 HP solar pumps with drip irrigation to reduce both energy and water consumption on intensive cropping land.",
    ],
    challenge: [
      "High daily water requirement during peak season.",
      "Farmers wanted assurance on flow rates before moving away from grid-connected pumps.",
    ],
    solutionApproach: [
      "Demonstration unit installed first to verify flow against the stated requirement.",
      "Array oversizing for early-morning and late-afternoon output, with drip integration to cut water demand.",
    ],
    technology: [
      { label: "Pumps", value: "7.5 HP submersible" },
      { label: "Irrigation", value: "Drip integration" },
      { label: "Control", value: "VFD with MPPT" },
    ],
    execution: [
      { title: "Pilot", description: "Demonstration unit and farmer walkthrough." },
      { title: "Rollout", description: "Cluster-wise installation." },
      { title: "Support", description: "Seasonal service visits." },
    ],
    results: [
      { value: "40", label: "Farms covered" },
      { value: "Drip", label: "Integrated irrigation" },
      { value: "Pilot first", label: "Verified before rollout" },
    ],
    gallery: [
      { alt: "Solar pump array in a crop field", visual: "field", tone: "forest" },
      { alt: "Farm pond fed by solar pumping", visual: "pumping", tone: "forest" },
    ],
  },
  {
    slug: "maharashtra-industrial-rooftop",
    title: "Pune Industrial Rooftop System",
    category: "industrial",
    categories: ["industrial", "rooftop"],
    solution: "solar-rooftop",
    location: "Pune",
    state: "Maharashtra",
    capacity: "1 MWp",
    year: "2023",
    summary:
      "A metal-roof rooftop system on a manufacturing facility, covering a large share of daytime process load.",
    image: { alt: "Industrial shed roof covered with solar modules", visual: "rooftop", tone: "forest" },
    featured: false,
    isPlaceholder: true,
    overview: [
      "A large metal-roof system installed on multiple sheds of a manufacturing plant, connected to the plant LT distribution.",
    ],
    challenge: [
      "Long roof spans and purlin spacing required a custom clamp-based mounting solution.",
      "Installation could not interrupt production.",
    ],
    solutionApproach: [
      "Clamp-based mounting without roof penetration and walkway planning for safe maintenance.",
      "Phased connection of inverter blocks to keep production running.",
    ],
    technology: [
      { label: "Modules", value: "Mono-PERC" },
      { label: "Inverters", value: "String inverters, multiple blocks" },
      { label: "Mounting", value: "Clamp-based on metal sheet" },
    ],
    execution: [
      { title: "Survey", description: "Roof integrity and purlin mapping." },
      { title: "Installation", description: "Shed by shed with zero downtime." },
      { title: "Monitoring", description: "Plant-wide dashboard for the facility team." },
    ],
    results: [
      { value: "1 MWp", label: "Installed capacity" },
      { value: "0", label: "Production hours lost" },
      { value: "Monitored", label: "Live dashboard" },
    ],
    gallery: [
      { alt: "Industrial rooftop with solar rows", visual: "rooftop", tone: "forest" },
      { alt: "Inverter block at an industrial site", visual: "grid", tone: "forest" },
    ],
  },
  {
    slug: "uttar-pradesh-street-lighting",
    title: "Bundelkhand Village Street Lighting",
    category: "street-lighting",
    categories: ["street-lighting"],
    solution: "solar-street-lighting",
    location: "Bundelkhand region",
    state: "Uttar Pradesh",
    capacity: "800 units · 20 W",
    year: "2023",
    summary:
      "Integrated solar street lights across village roads and community spaces in an area with unreliable grid supply.",
    image: { alt: "Village road lit by solar street lights at dusk", visual: "lighting", tone: "ink" },
    featured: false,
    isPlaceholder: true,
    overview: [
      "Integrated LED street lights installed across multiple villages, with motion dimming to extend autonomy during monsoon months.",
    ],
    challenge: [
      "Sites spread across a wide area with limited road access.",
      "Monsoon cloud cover reduces charging for several weeks each year.",
    ],
    solutionApproach: [
      "Integrated units chosen for fast installation with minimal civil work.",
      "Motion-sensing dimming profile configured for extended autonomy in poor weather.",
    ],
    technology: [
      { label: "Luminaire", value: "20 W integrated LED" },
      { label: "Battery", value: "LiFePO4" },
      { label: "Control", value: "Dusk-to-dawn with motion dimming" },
    ],
    execution: [
      { title: "Survey", description: "Pole positions mapped village by village." },
      { title: "Installation", description: "Teams deployed in parallel across clusters." },
      { title: "Handover", description: "Community briefing and maintenance contacts." },
    ],
    results: [
      { value: "800", label: "Units installed" },
      { value: "Multiple", label: "Villages covered" },
      { value: "Dimming", label: "Extended autonomy" },
    ],
    gallery: [
      { alt: "Solar street light on a village road", visual: "lighting", tone: "ink" },
      { alt: "Village houses with solar lighting", visual: "community", tone: "forest" },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(limit = 4): Project[] {
  return projects.filter((p) => p.featured).slice(0, limit);
}

export function getProjectsBySolution(solution: string, limit = 3): Project[] {
  return projects.filter((p) => p.solution === solution).slice(0, limit);
}
