import type { EnquiryField } from "./enquiry-options";

/** Serializable state returned by the enquiry Server Action. */
export interface EnquiryState {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<EnquiryField, string>>;
  reference?: string;
}

export const initialEnquiryState: EnquiryState = { status: "idle" };
