import type { EnquiryInput } from "./enquiry-schema";

export interface EnquiryResult {
  ok: boolean;
  id: string;
}

/**
 * Enquiry delivery.
 *
 * Mock implementation: logs the validated enquiry on the server and returns a
 * reference id. Swap this single function for a CRM / email integration
 * (e.g. Resend, HubSpot, Zoho, a Google Sheet) without touching the UI.
 *
 * TODO: Connect to the production enquiry pipeline.
 */
export async function submitEnquiry(data: EnquiryInput): Promise<EnquiryResult> {
  const id = `ARK-${Date.now().toString(36).toUpperCase()}`;
  // Server-side only. Never expose personal data to the client console.
  console.info(`[enquiry] ${id}`, {
    type: data.enquiryType,
    projectType: data.projectType,
    city: data.city,
    email: data.email,
  });
  await new Promise((resolve) => setTimeout(resolve, 350));
  return { ok: true, id };
}
