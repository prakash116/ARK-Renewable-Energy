"use client";

import { useActionState, useId, useState } from "react";
import { Check, LoaderCircle } from "lucide-react";
import type { IconName } from "@/types/content";
import { enquiryTypes, projectTypes, type EnquiryType, type ProjectType } from "@/lib/enquiry-options";
import { cn } from "@/lib/utils";
import { submitEnquiryAction } from "@/app/contact/actions";
import { initialEnquiryState } from "@/lib/enquiry-state";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SelectField, TextField, TextareaField } from "./FormField";

const typeMeta: Record<EnquiryType, { icon: IconName; text: string }> = {
  Sales: { icon: "zap", text: "Pricing and proposals" },
  "Project consultation": { icon: "drafting", text: "Sizing and feasibility" },
  "Dealer / Partner": { icon: "network", text: "Channel and EPC partners" },
  "Service support": { icon: "headphones", text: "Existing systems" },
  "General enquiry": { icon: "message-circle", text: "Anything else" },
};

interface EnquiryFormProps {
  defaultEnquiryType?: EnquiryType;
  defaultProjectType?: ProjectType;
  /** Compact variant hides the enquiry-type selector (used for quick quote forms). */
  compact?: boolean;
  className?: string;
}

/**
 * Enquiry form: progressive enhancement via Server Action, client-side state
 * for a polished experience. Validation errors come from the server so the
 * rules live in one place (`lib/enquiry-schema.ts`).
 */
export function EnquiryForm({
  defaultEnquiryType = "Sales",
  defaultProjectType = "Not sure yet",
  compact = false,
  className,
}: EnquiryFormProps) {
  const [state, formAction, pending] = useActionState(submitEnquiryAction, initialEnquiryState);
  const [enquiryType, setEnquiryType] = useState<EnquiryType>(defaultEnquiryType);
  const [projectType, setProjectType] = useState<string>(defaultProjectType);
  const [fullName, setFullName] = useState("");
  const uid = useId();
  const id = (f: string) => `${uid}-${f}`;
  const errors = state.errors ?? {};

  if (state.status === "success") {
    return (
      <div className={cn("rounded-[var(--radius-media)] border border-line bg-card p-6 sm:p-8", className)} role="status" aria-live="polite">
        <span className="inline-flex size-12 items-center justify-center rounded-full bg-primary text-white">
          <Check aria-hidden className="size-6" />
        </span>
        <h3 className="text-h3 mt-5">Thanks{fullName ? `, ${fullName.split(" ")[0]}` : ""}. We have your enquiry.</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">
          Our team will review the details and get back to you. Keep the reference below for follow-ups.
        </p>
        {state.reference && (
          <p className="mt-4 inline-block rounded-full bg-card-2 px-3 py-1.5 font-mono text-sm">{state.reference}</p>
        )}
        <div className="mt-6 flex flex-col gap-3 xs:flex-row">
          <Button href="/solutions" variant="primary" icon="arrow">
            Explore solutions
          </Button>
          <Button href="/" variant="outline">
            Back to home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      noValidate
      className={cn("rounded-[var(--radius-media)] border border-line bg-card p-5 sm:p-8", className)}
    >
      {/* Honeypot */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={id("website")}>Website</label>
        <input id={id("website")} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {!compact && (
        <fieldset className="mb-6">
          <legend className="text-sm font-semibold">How can we help?</legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {enquiryTypes.map((t) => {
              const active = t === enquiryType;
              const meta = typeMeta[t];
              return (
                <label
                  key={t}
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-xl border px-3.5 py-3 transition-colors",
                    active ? "border-primary bg-primary-soft" : "border-line-strong hover:border-fg",
                  )}
                >
                  <input
                    type="radio"
                    name="enquiryType"
                    value={t}
                    checked={active}
                    onChange={() => setEnquiryType(t)}
                    className="sr-only"
                  />
                  <span
                    className={cn(
                      "inline-flex size-9 shrink-0 items-center justify-center rounded-lg",
                      active ? "bg-primary text-white" : "bg-card-2 text-primary",
                    )}
                  >
                    <Icon name={meta.icon} className="size-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold">{t}</span>
                    <span className="block truncate text-xs text-fg-muted">{meta.text}</span>
                  </span>
                </label>
              );
            })}
          </div>
          {errors.enquiryType && (
            <p className="mt-2 text-xs font-medium text-[#b4462a]" role="alert">
              {errors.enquiryType}
            </p>
          )}
        </fieldset>
      )}
      {compact && <input type="hidden" name="enquiryType" value={enquiryType} />}

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          id={id("fullName")}
          name="fullName"
          label="Full name"
          autoComplete="name"
          placeholder="Your name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          error={errors.fullName}
        />
        <TextField
          id={id("company")}
          name="company"
          label="Company"
          autoComplete="organization"
          placeholder="Company or farm name"
          required={false}
          error={errors.company}
        />
        <TextField
          id={id("phone")}
          name="phone"
          label="Phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+91"
          error={errors.phone}
        />
        <TextField
          id={id("email")}
          name="email"
          label="Email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
          error={errors.email}
        />
        <TextField
          id={id("city")}
          name="city"
          label="City"
          autoComplete="address-level2"
          placeholder="City or district"
          error={errors.city}
        />
        <SelectField
          id={id("projectType")}
          name="projectType"
          label="Project type"
          options={projectTypes}
          value={projectType}
          onChange={setProjectType}
          error={errors.projectType}
        />
        <TextareaField
          id={id("message")}
          name="message"
          label="Message"
          placeholder="Tell us about your site, load or water requirement."
          className="sm:col-span-2"
          error={errors.message}
          hint="Include capacity, location and timelines if known."
        />
      </div>

      {state.status === "error" && !state.errors && (
        <p className="mt-4 rounded-xl border border-[#b4462a]/30 bg-[#b4462a]/5 px-4 py-3 text-sm text-[#8a331e]" role="alert">
          {state.message}
        </p>
      )}
      {state.status === "error" && state.errors && (
        <p className="mt-4 text-sm text-[#8a331e]" role="alert">
          {state.message}
        </p>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-fg-soft">
          By submitting you agree to our{" "}
          <a href="/privacy-policy" className="underline underline-offset-2 hover:text-fg">
            privacy policy
          </a>
          .
        </p>
        <Button type="submit" variant="primary" size="lg" icon={pending ? "none" : "arrow"} disabled={pending}>
          {pending && <LoaderCircle aria-hidden className="size-4 animate-spin" />}
          {pending ? "Sending…" : "Send Enquiry"}
        </Button>
      </div>
    </form>
  );
}
