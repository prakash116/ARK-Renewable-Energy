/**
 * Enquiry form options and URL mappings. Deliberately free of zod so client
 * components can import them without pulling the validation library into
 * the browser bundle.
 */

export const enquiryTypes = [
  "Sales",
  "Project consultation",
  "Dealer / Partner",
  "Service support",
  "General enquiry",
] as const;
export type EnquiryType = (typeof enquiryTypes)[number];

export const projectTypes = [
  "Solar water pumping",
  "Solar rooftop",
  "Solar power plant (EPC)",
  "Solar street lighting",
  "Not sure yet",
] as const;
export type ProjectType = (typeof projectTypes)[number];

export type EnquiryField =
  | "enquiryType"
  | "fullName"
  | "company"
  | "phone"
  | "email"
  | "city"
  | "projectType"
  | "message"
  | "website";

/** Map URL intents (?intent=quote) to an enquiry type. */
export function intentToEnquiryType(intent: string | null): EnquiryType {
  switch (intent) {
    case "quote":
      return "Sales";
    case "project":
      return "Project consultation";
    case "dealer":
      return "Dealer / Partner";
    case "service":
      return "Service support";
    default:
      return "General enquiry";
  }
}

/** Map a solution slug (?solution=) to a project type. */
export function solutionToProjectType(slug: string | null): ProjectType {
  switch (slug) {
    case "solar-water-pumping":
      return "Solar water pumping";
    case "solar-rooftop":
      return "Solar rooftop";
    case "solar-power-plants":
      return "Solar power plant (EPC)";
    case "solar-street-lighting":
      return "Solar street lighting";
    default:
      return "Not sure yet";
  }
}
