"use server";

import { z } from "zod";
import { enquirySchema } from "@/lib/enquiry-schema";
import type { EnquiryField } from "@/lib/enquiry-options";
import type { EnquiryState } from "@/lib/enquiry-state";
import { submitEnquiry } from "@/lib/enquiries";

/** Validates and delivers an enquiry. Only async functions may be exported here. */
export async function submitEnquiryAction(_prev: EnquiryState, formData: FormData): Promise<EnquiryState> {
  const raw: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string" && !key.startsWith("$")) raw[key] = value;
  }

  const parsed = enquirySchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors = z.flattenError(parsed.error).fieldErrors;
    const errors: Partial<Record<EnquiryField, string>> = {};
    for (const [key, messages] of Object.entries(fieldErrors)) {
      if (messages && messages.length > 0) errors[key as EnquiryField] = messages[0];
    }
    return { status: "error", message: "Please check the highlighted fields.", errors };
  }

  // Honeypot filled → silently accept without processing.
  if (parsed.data.website) {
    return { status: "success", reference: "ARK-OK" };
  }

  try {
    const result = await submitEnquiry(parsed.data);
    if (!result.ok) throw new Error("Delivery failed");
    return {
      status: "success",
      reference: result.id,
      message: "Thanks. Your enquiry has been received.",
    };
  } catch {
    return {
      status: "error",
      message: "We could not send your enquiry. Please try again or email us directly.",
    };
  }
}
