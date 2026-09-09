/**
 * Central site configuration.
 *
 * Every piece of company metadata, contact detail and social link used across
 * the website is defined here so it can be replaced in ONE place.
 *
 * TODO: Replace placeholder values (phone, social URLs, map link) with
 *       verified company data before launch.
 */

export const PHONE_PLACEHOLDER = "YOUR_PHONE_NUMBER";

export const siteConfig = {
  name: "ARK Renewable Energy",
  shortName: "ARK",
  legalName: "ARK Renewable Energy", // TODO: Replace with registered legal entity name.
  tagline: "Powering a Smarter, Sustainable Future.",
  supportingLine: "Engineering clean energy for a more resilient tomorrow.",
  description:
    "ARK Renewable Energy designs, builds and maintains solar water pumping, rooftop solar, solar power plant (EPC) and solar street lighting systems for homes, businesses, agriculture and infrastructure across India.",
  /** Canonical production URL. Override with NEXT_PUBLIC_SITE_URL in .env. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.arkrenewableenergy.com",
  locale: "en_IN",
  language: "en",
  foundedYear: undefined as number | undefined, // TODO: Add verified founding year.

  contact: {
    /** Display string. Keep the literal placeholder until the real number is supplied. */
    phone: PHONE_PLACEHOLDER,
    /** WhatsApp number in international format without "+" (e.g. 919876543210). */
    whatsapp: PHONE_PLACEHOLDER,
    email: "hello@arkrenewableenergy.com",
    sales: "sales@arkrenewableenergy.com",
    support: "support@arkrenewableenergy.com",
    hours: "Mon – Sat, 9:30 AM – 6:30 PM IST", // TODO: Confirm working hours.
    address: {
      line1: "Plot 24, Sector 44",
      city: "Gurugram",
      state: "Haryana",
      postalCode: "122003",
      country: "India",
      countryCode: "IN",
    },
    /** TODO: Replace with the real Google Maps share / embed URL. */
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Sector+44+Gurugram+Haryana+122003",
    mapEmbedUrl:
      "https://www.google.com/maps?q=Sector+44,+Gurugram,+Haryana+122003&output=embed",
  },

  /** TODO: Replace "#" with verified social profile URLs. */
  social: [
    { name: "LinkedIn", href: "#", icon: "linkedin" },
    { name: "X", href: "#", icon: "x" },
    { name: "Instagram", href: "#", icon: "instagram" },
    { name: "YouTube", href: "#", icon: "youtube" },
  ] as const,

  /** Default Open Graph image is generated at /opengraph-image. */
  ogImage: "/opengraph-image",
  twitterHandle: undefined as string | undefined, // TODO: Add @handle if available.
} as const;

export type SiteConfig = typeof siteConfig;
export type SocialIcon = (typeof siteConfig.social)[number]["icon"];

/* ------------------------------------------------------------------ */
/* Derived helpers                                                     */
/* ------------------------------------------------------------------ */

export function isPhoneConfigured(): boolean {
  return siteConfig.contact.phone !== PHONE_PLACEHOLDER;
}

export function isWhatsAppConfigured(): boolean {
  return siteConfig.contact.whatsapp !== PHONE_PLACEHOLDER;
}

/** `tel:` link when configured; otherwise route to the contact page. */
export function getPhoneHref(): string {
  if (!isPhoneConfigured()) return "/contact#call";
  return `tel:${siteConfig.contact.phone.replace(/[^\d+]/g, "")}`;
}

/** wa.me link when configured; otherwise route to the contact page. */
export function getWhatsAppHref(message?: string): string {
  if (!isWhatsAppConfigured()) return "/contact#whatsapp";
  const digits = siteConfig.contact.whatsapp.replace(/\D/g, "");
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${digits}${text}`;
}

export function getFullAddress(separator = ", "): string {
  const a = siteConfig.contact.address;
  return [a.line1, `${a.city}, ${a.state} ${a.postalCode}`, a.country].join(separator);
}

export function absoluteUrl(path = "/"): string {
  const base = siteConfig.url.replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export interface NavChild {
  label: string;
  href: string;
  description?: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

export const mainNav: NavItem[] = [
  {
    label: "Solutions",
    href: "/solutions",
    children: [
      {
        label: "Solar Water Pumping",
        href: "/solutions/solar-water-pumping",
        description: "Irrigation and drinking water without diesel or grid.",
      },
      {
        label: "Solar Rooftop",
        href: "/solutions/solar-rooftop",
        description: "On-grid, hybrid and off-grid rooftop systems.",
      },
      {
        label: "Solar Power Plants",
        href: "/solutions/solar-power-plants",
        description: "Ground-mounted EPC from design to O&M.",
      },
      {
        label: "Solar Street Lighting",
        href: "/solutions/solar-street-lighting",
        description: "Standalone lighting for roads, campuses and villages.",
      },
    ],
  },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Resources", href: "/resources" },
  { label: "Investors", href: "/investors" },
  { label: "Careers", href: "/careers" },
];

export const mobileNav: NavItem[] = [
  ...mainNav.map(({ label, href }) => ({ label, href })),
  { label: "Contact", href: "/contact" },
];

export const footerNav: { heading: string; links: NavChild[] }[] = [
  {
    heading: "Solutions",
    links: (mainNav[0].children ?? []).map(({ label, href }) => ({ label, href })),
  },
  {
    heading: "Company",
    links: [
      { label: "About ARK", href: "/about" },
      { label: "Leadership", href: "/team" },
      { label: "Projects", href: "/projects" },
      { label: "CSR & Impact", href: "/csr" },
      { label: "Investors", href: "/investors" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Resource Hub", href: "/resources" },
      { label: "Product Catalogues", href: "/resources/catalogues" },
      { label: "Installation Manuals", href: "/resources/manuals" },
      { label: "FAQs", href: "/resources/faqs" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const legalNav: NavChild[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
];
