"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

/**
 * Newsletter capture. Mock handler only.
 * TODO: Connect to the email marketing provider of choice.
 */
export function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "done" | "error">("idle");
  const [email, setEmail] = useState("");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setStatus(valid ? "done" : "error");
  }

  if (status === "done") {
    return (
      <p role="status" className="flex items-center gap-2 text-sm text-fg-muted">
        <Check aria-hidden className="size-4 text-lime" /> Thanks. You are on the list.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="max-w-sm" noValidate>
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="flex h-12 items-center rounded-full border border-line-strong bg-white/5 pr-1.5 pl-4 focus-within:border-lime">
        <input
          id="newsletter-email"
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          aria-invalid={status === "error"}
          aria-describedby={status === "error" ? "newsletter-error" : undefined}
          className="h-full min-w-0 flex-1 bg-transparent text-sm text-fg placeholder:text-fg-soft focus:outline-none"
        />
        <button
          type="submit"
          className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-lime text-ink transition-colors hover:bg-[#d7f86a]"
        >
          <ArrowRight aria-hidden className="size-4" />
          <span className="sr-only">Subscribe</span>
        </button>
      </div>
      {status === "error" && (
        <p id="newsletter-error" className="mt-2 text-xs text-solar" role="alert">
          Please enter a valid email address.
        </p>
      )}
    </form>
  );
}
