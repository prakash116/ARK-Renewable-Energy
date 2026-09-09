import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/seo";
import { LegalPage, type LegalSection } from "@/components/layout/LegalPage";

export const metadata: Metadata = createMetadata({
  title: "Terms & Conditions",
  description: `Terms governing use of the ${siteConfig.name} website.`,
  path: "/terms-and-conditions",
});

// TODO: Replace with terms approved by legal counsel.
const sections: LegalSection[] = [
  {
    heading: "1. Acceptance",
    paragraphs: [`By using this website you agree to these terms. If you do not agree, please do not use the site. These terms are governed by the laws of India, and the courts of ${siteConfig.contact.address.city}, ${siteConfig.contact.address.state} have jurisdiction.`],
  },
  {
    heading: "2. Information on this site",
    paragraphs: [
      "Content is provided for general information about our solutions and company. Product ranges, specifications, capacities and performance figures are indicative unless stated in a written proposal or contract. We may change content at any time without notice.",
      "Items marked “Sample” are placeholders and do not represent verified company data.",
    ],
  },
  {
    heading: "3. Enquiries and proposals",
    paragraphs: ["Submitting an enquiry does not create a contract. Any supply, installation or service is governed by the specific written proposal, purchase order and terms agreed for that project."],
  },
  {
    heading: "4. Intellectual property",
    paragraphs: ["The ARK name, logo, text, graphics and software on this site are owned by or licensed to us. You may view and print pages for personal or internal business use but may not reproduce, distribute or modify content without written permission."],
  },
  {
    heading: "5. Acceptable use",
    paragraphs: ["You agree not to misuse the site, including attempting unauthorised access, submitting false or malicious information, or interfering with its operation."],
  },
  {
    heading: "6. Third-party links",
    paragraphs: ["Links to third-party sites, including map services, are provided for convenience. We are not responsible for their content or privacy practices."],
  },
  {
    heading: "7. Limitation of liability",
    paragraphs: ["To the extent permitted by law, we are not liable for any loss arising from use of, or inability to use, this website or reliance on its content. Nothing in these terms limits liability that cannot be limited by law."],
  },
  {
    heading: "8. Contact",
    paragraphs: [`Questions about these terms can be sent to ${siteConfig.contact.email}.`],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      description="The terms that govern your use of this website."
      updated="9 September 2026"
      path="/terms-and-conditions"
      sections={sections}
    />
  );
}
