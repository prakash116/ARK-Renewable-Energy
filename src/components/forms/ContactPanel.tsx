"use client";

import { useSearchParams } from "next/navigation";
import { intentToEnquiryType, solutionToProjectType } from "@/lib/enquiry-options";
import { EnquiryForm } from "./EnquiryForm";

/** Reads ?intent= and ?solution= to preselect form values. */
export function ContactPanel() {
  const params = useSearchParams();
  return (
    <EnquiryForm
      defaultEnquiryType={intentToEnquiryType(params.get("intent"))}
      defaultProjectType={solutionToProjectType(params.get("solution"))}
    />
  );
}
