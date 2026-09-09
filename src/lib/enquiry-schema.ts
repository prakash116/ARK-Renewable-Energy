import { z } from "zod";
import { enquiryTypes, projectTypes, type EnquiryField } from "./enquiry-options";

/** Shared validation used by both server and static-host-compatible forms. */
export const enquirySchema = z.object({
  enquiryType: z.enum(enquiryTypes, { error: "Choose how we can help" }),
  fullName: z.string().trim().min(2, "Please enter your full name").max(80, "Name is too long"),
  company: z.string().trim().max(120, "Company name is too long").optional(),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[\d\s\-()]{8,20}$/, "Enter a valid phone number"),
  email: z.email("Enter a valid email address"),
  city: z.string().trim().min(2, "Please enter your city").max(80, "City is too long"),
  projectType: z.enum(projectTypes, { error: "Select a project type" }),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more (at least 10 characters)")
    .max(2000, "Please keep the message under 2000 characters"),
  /** Honeypot: must stay empty. */
  website: z.string().max(0).optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
export type { EnquiryField };
