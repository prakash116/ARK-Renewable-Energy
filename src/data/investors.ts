import type { DocumentCard, Feature } from "@/types/content";

/**
 * Investor relations content.
 * TODO: Replace with verified documents, figures and governance details.
 *       Financial highlights are intentionally NOT populated with numbers.
 */

export const businessSnapshot: Feature[] = [
  { title: "Solar water pumping", description: "Distributed systems for agriculture and water supply.", icon: "droplets" },
  { title: "Rooftop solar", description: "Residential, commercial and industrial systems.", icon: "home" },
  { title: "Solar power plants", description: "EPC and O&M for ground-mounted projects.", icon: "factory" },
  { title: "Solar street lighting", description: "Standalone lighting for public and private infrastructure.", icon: "lightbulb" },
];

export const annualReports: DocumentCard[] = [
  { id: "ar-fy26", title: "Annual Report FY 2025-26", category: "Annual report", href: "#", isPlaceholder: true },
  { id: "ar-fy25", title: "Annual Report FY 2024-25", category: "Annual report", href: "#", isPlaceholder: true },
  { id: "ar-fy24", title: "Annual Report FY 2023-24", category: "Annual report", href: "#", isPlaceholder: true },
];

export const corporateDocuments: DocumentCard[] = [
  { id: "doc-profile", title: "Corporate Profile", category: "Company", description: "Overview of business lines, capabilities and footprint.", href: "#", isPlaceholder: true },
  { id: "doc-coc", title: "Code of Conduct", category: "Policy", description: "Standards of business conduct for employees and partners.", href: "#", isPlaceholder: true },
  { id: "doc-whistle", title: "Whistleblower Policy", category: "Policy", description: "Channels for raising concerns without retaliation.", href: "#", isPlaceholder: true },
  { id: "doc-esg", title: "ESG & Sustainability Statement", category: "Sustainability", description: "Environmental and social commitments and reporting approach.", href: "#", isPlaceholder: true },
];

export const governance: Feature[] = [
  { title: "Board oversight", description: "A board with defined responsibilities for strategy, risk and compliance.", icon: "landmark" },
  { title: "Audit and controls", description: "Independent audit and internal controls over financial reporting.", icon: "clipboard-check" },
  { title: "Risk management", description: "Structured identification and mitigation of project, market and safety risks.", icon: "shield-check" },
  { title: "Ethics and compliance", description: "Code of conduct, anti-bribery commitments and grievance channels.", icon: "scale" },
];
