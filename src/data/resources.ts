import type { Faq, ResourceLink } from "@/types/content";

/**
 * Downloadable resources.
 * TODO: Upload real PDFs to /public/downloads and update `href`, `fileSize`
 *       and `updated`. Links currently point to "#" and are flagged.
 */
export const resources: ResourceLink[] = [
  // Catalogues
  {
    id: "cat-pumping",
    title: "Solar Water Pumping Catalogue",
    type: "catalogue",
    description: "Pump ranges, controller specifications, sizing tables and structure options.",
    href: "#",
    solutions: ["solar-water-pumping"],
    isPlaceholder: true,
  },
  {
    id: "cat-rooftop",
    title: "Rooftop Solar Catalogue",
    type: "catalogue",
    description: "Residential, commercial and industrial rooftop configurations and components.",
    href: "#",
    solutions: ["solar-rooftop"],
    isPlaceholder: true,
  },
  {
    id: "cat-plants",
    title: "Solar Power Plant EPC Capability Deck",
    type: "catalogue",
    description: "EPC scope, engineering approach, quality process and O&M offering.",
    href: "#",
    solutions: ["solar-power-plants"],
    isPlaceholder: true,
  },
  {
    id: "cat-lighting",
    title: "Solar Street Lighting Catalogue",
    type: "catalogue",
    description: "Integrated and semi-integrated models, photometric data and pole options.",
    href: "#",
    solutions: ["solar-street-lighting"],
    isPlaceholder: true,
  },
  // Manuals
  {
    id: "man-pumping",
    title: "Solar Pump Installation & Operation Manual",
    type: "manual",
    description: "Step-by-step installation, wiring, commissioning and troubleshooting.",
    href: "#",
    solutions: ["solar-water-pumping"],
    isPlaceholder: true,
  },
  {
    id: "man-rooftop",
    title: "Rooftop System Owner's Manual",
    type: "manual",
    description: "Operation, monitoring, safety and maintenance guidance for system owners.",
    href: "#",
    solutions: ["solar-rooftop"],
    isPlaceholder: true,
  },
  {
    id: "man-lighting",
    title: "Solar Street Light Installation Manual",
    type: "manual",
    description: "Foundation, pole erection, unit mounting and commissioning checklist.",
    href: "#",
    solutions: ["solar-street-lighting"],
    isPlaceholder: true,
  },
  // Guides
  {
    id: "guide-pump-sizing",
    title: "Solar Pump Sizing Guide",
    type: "guide",
    description: "How head, flow and solar resource determine array and pump selection.",
    href: "#",
    solutions: ["solar-water-pumping"],
    isPlaceholder: true,
  },
  {
    id: "guide-net-metering",
    title: "Net Metering Explained",
    type: "guide",
    description: "How export credits work and what documentation is typically required.",
    href: "#",
    solutions: ["solar-rooftop"],
    isPlaceholder: true,
  },
  {
    id: "guide-om-checklist",
    title: "Solar Plant O&M Checklist",
    type: "guide",
    description: "Preventive maintenance activities and inspection intervals for PV plants.",
    href: "#",
    solutions: ["solar-power-plants"],
    isPlaceholder: true,
  },
];

export const resourceTypeLabel: Record<ResourceLink["type"], string> = {
  catalogue: "Catalogue",
  manual: "Manual",
  guide: "Technical guide",
  faq: "FAQ",
  datasheet: "Datasheet",
  report: "Report",
  policy: "Policy",
};

export function getResources(ids: string[]): ResourceLink[] {
  return ids.map((id) => resources.find((r) => r.id === id)).filter(Boolean) as ResourceLink[];
}

export function getResourcesByType(type: ResourceLink["type"]): ResourceLink[] {
  return resources.filter((r) => r.type === type);
}

/** General FAQs shown on /resources/faqs. */
export const generalFaqs: { group: string; items: Faq[] }[] = [
  {
    group: "Getting started",
    items: [
      {
        question: "How do I know which solar solution is right for me?",
        answer:
          "It depends on what you need energy for. Farmers and water schemes usually need solar pumping; homes and businesses with a roof and a daytime load benefit from rooftop solar; organisations with land and large consumption look at ground-mounted plants; and roads or campuses without supply use solar street lighting. Our team helps you decide during a free consultation.",
      },
      {
        question: "What information should I have ready for a quotation?",
        answer:
          "For pumping: borewell depth, daily water requirement and crop or use. For rooftop: recent electricity bills, roof type and area. For plants: land details and connected load. For lighting: number of poles or road length. A site visit confirms the details.",
      },
      {
        question: "Do you serve my location?",
        answer:
          "ARK delivers projects across multiple states in India through its own teams and dealer network. Contact us with your location and we will confirm coverage.",
      },
    ],
  },
  {
    group: "Costs and financing",
    items: [
      {
        question: "How much does a solar system cost?",
        answer:
          "Cost depends on capacity, components and site conditions. We provide itemised quotations after a survey so there are no surprises. Prices for common configurations are shared on request.",
      },
      {
        question: "Are subsidies or financing available?",
        answer:
          "Central and state schemes for solar pumps and rooftop systems change over time and vary by location. We advise on the schemes applicable to your project at the time of enquiry and can introduce financing partners.",
      },
      {
        question: "What is the typical payback period?",
        answer:
          "Payback varies with tariff, consumption pattern and system size. Commercial and industrial rooftop systems often pay back within a few years; solar pumps replacing diesel usually recover cost quickly through fuel savings.",
      },
    ],
  },
  {
    group: "Installation and service",
    items: [
      {
        question: "How long does installation take?",
        answer:
          "Solar pumps and street lights are installed in a day or two per site. Residential rooftops take a few days. Commercial systems and ground-mounted plants follow a project schedule shared before work begins.",
      },
      {
        question: "What warranties are provided?",
        answer:
          "Component warranties are passed through from manufacturers (modules typically carry long performance warranties) and ARK provides a workmanship warranty on installation. Exact terms are stated in every proposal.",
      },
      {
        question: "Do you provide maintenance after installation?",
        answer:
          "Yes. We offer annual maintenance contracts and long-term O&M programmes including cleaning, inspections, remote monitoring and spares.",
      },
      {
        question: "Can I monitor my system remotely?",
        answer:
          "Rooftop systems and plants include monitoring dashboards. Solar pumps and street lights can be fitted with optional remote monitoring units.",
      },
    ],
  },
  {
    group: "Partners and dealers",
    items: [
      {
        question: "How can I become an ARK dealer or partner?",
        answer:
          "We work with dealers, installers and EPC partners across regions. Use the contact form and select Dealer / Partner, and our channel team will get in touch.",
      },
    ],
  },
];
