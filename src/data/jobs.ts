import type { Job, JobDepartment } from "@/types/content";

/**
 * Open positions.
 * TODO: Replace with live vacancies from HR. All entries are illustrative.
 */
export const jobDepartments: (JobDepartment | "All")[] = [
  "All",
  "Engineering",
  "Projects",
  "Sales",
  "Operations",
  "Service",
  "Corporate",
];

export const jobs: Job[] = [
  {
    slug: "solar-design-engineer",
    title: "Solar Design Engineer",
    department: "Engineering",
    location: "Gurugram, Haryana",
    type: "Full-time",
    experience: "2 to 5 years",
    summary:
      "Design rooftop and ground-mounted PV systems, from shading analysis and string design to BOM and drawings.",
    responsibilities: [
      "Prepare system designs, single-line diagrams and layouts for rooftop and ground-mounted projects.",
      "Run yield simulations and shading analysis using industry tools.",
      "Select modules, inverters, structures and protection equipment to meet site and code requirements.",
      "Support the projects team with technical documentation and site queries.",
    ],
    requirements: [
      "Degree in electrical or related engineering discipline.",
      "Experience with PV design tools such as PVsyst or Helioscope.",
      "Working knowledge of Indian electrical standards and net-metering norms.",
      "Clear technical communication in English and Hindi.",
    ],
    postedOn: "2026-08-20",
    validThrough: "2026-11-30",
    isPlaceholder: true,
  },
  {
    slug: "site-engineer-solar-pumping",
    title: "Site Engineer, Solar Pumping",
    department: "Projects",
    location: "Jodhpur, Rajasthan",
    type: "Full-time",
    experience: "1 to 3 years",
    summary:
      "Lead installation and commissioning of solar water pumping systems across rural sites.",
    responsibilities: [
      "Conduct site surveys including borewell and head measurements.",
      "Supervise installation teams and ensure quality and safety standards.",
      "Commission systems, verify flow and train operators.",
      "Maintain installation records and coordinate with the service team.",
    ],
    requirements: [
      "Diploma or degree in electrical or mechanical engineering.",
      "Hands-on experience with pumps, controllers or PV installations.",
      "Willingness to travel extensively within the region.",
      "Two-wheeler licence preferred.",
    ],
    postedOn: "2026-08-25",
    validThrough: "2026-11-30",
    isPlaceholder: true,
  },
  {
    slug: "project-manager-epc",
    title: "Project Manager, EPC",
    department: "Projects",
    location: "Ahmedabad, Gujarat",
    type: "Full-time",
    experience: "6 to 10 years",
    summary:
      "Own delivery of ground-mounted solar projects from mobilisation to commissioning.",
    responsibilities: [
      "Plan and control project schedules, budgets and resources.",
      "Manage subcontractors, procurement timelines and site QA/QC.",
      "Ensure HSE compliance on site.",
      "Report progress to clients, lenders and internal stakeholders.",
    ],
    requirements: [
      "Engineering degree with project management experience in solar EPC.",
      "Track record delivering multi-MW ground-mounted projects.",
      "Familiarity with grid evacuation and utility approval processes.",
      "PMP or equivalent certification is an advantage.",
    ],
    postedOn: "2026-08-10",
    validThrough: "2026-10-31",
    isPlaceholder: true,
  },
  {
    slug: "sales-manager-dealer-network",
    title: "Sales Manager, Dealer Network",
    department: "Sales",
    location: "Chandigarh (Punjab & Haryana)",
    type: "Full-time",
    experience: "4 to 8 years",
    summary:
      "Grow the dealer and channel partner network for solar pumping and rooftop products across the region.",
    responsibilities: [
      "Recruit, onboard and support dealers and channel partners.",
      "Drive regional sales targets and pipeline reporting.",
      "Coordinate with engineering on quotations and technical clarifications.",
      "Represent ARK at regional exhibitions and farmer outreach events.",
    ],
    requirements: [
      "Experience in channel sales for solar, pumps, agri-inputs or similar.",
      "Strong regional network and travel readiness.",
      "Fluency in Punjabi, Hindi and English.",
    ],
    postedOn: "2026-09-01",
    validThrough: "2026-12-15",
    isPlaceholder: true,
  },
  {
    slug: "om-technician",
    title: "O&M Technician",
    department: "Service",
    location: "Multiple locations",
    type: "Full-time",
    experience: "1 to 4 years",
    summary:
      "Maintain installed solar systems, respond to service tickets and perform preventive maintenance.",
    responsibilities: [
      "Carry out preventive maintenance and cleaning schedules.",
      "Diagnose and resolve inverter, controller and pump faults.",
      "Log service activity in the monitoring platform.",
      "Support customers with basic operation and troubleshooting.",
    ],
    requirements: [
      "ITI or diploma in electrical trade.",
      "Experience servicing PV systems, inverters or pumps.",
      "Comfort working at heights and outdoors.",
    ],
    postedOn: "2026-08-28",
    validThrough: "2026-11-15",
    isPlaceholder: true,
  },
  {
    slug: "marketing-executive",
    title: "Marketing Executive",
    department: "Corporate",
    location: "Gurugram, Haryana",
    type: "Full-time",
    experience: "2 to 4 years",
    summary:
      "Run digital campaigns, content and events that reach farmers, businesses and institutional buyers.",
    responsibilities: [
      "Plan and execute digital marketing campaigns and content calendars.",
      "Coordinate collateral, catalogues and case studies with the sales team.",
      "Manage exhibitions and outreach events.",
      "Track performance and report on lead generation.",
    ],
    requirements: [
      "Degree in marketing, communications or related field.",
      "Experience with B2B or agri marketing preferred.",
      "Strong writing skills in English and Hindi.",
    ],
    postedOn: "2026-09-03",
    validThrough: "2026-12-31",
    isPlaceholder: true,
  },
];

export function getJob(slug: string): Job | undefined {
  return jobs.find((j) => j.slug === slug);
}
