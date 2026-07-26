"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const interests = [
  "Microsoft 365",
  "Azure / Entra ID",
  "Intune / Endpoints",
  "Security",
  "Cloud migration",
  "IT support",
  "Other",
];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);

    // Placeholder submission handler for the static marketing site.
    await new Promise((resolve) => setTimeout(resolve, 650));
    setPending(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        className="rounded-2xl border border-border bg-card p-8"
        role="status"
        aria-live="polite"
      >
        <h2 className="font-display text-2xl font-semibold tracking-tight">
          Message received
        </h2>
        <p className="mt-3 text-muted">
          Thank you for contacting Niall Tech. A consultant will follow up shortly
          with next steps.
        </p>
        <Button
          className="mt-6"
          variant="outline"
          onClick={() => setSubmitted(false)}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8"
      noValidate={false}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" htmlFor="name">
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            className={inputClassName}
            placeholder="Alex Rivera"
          />
        </Field>
        <Field label="Work email" htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClassName}
            placeholder="alex@company.com"
          />
        </Field>
        <Field label="Company" htmlFor="company">
          <input
            id="company"
            name="company"
            autoComplete="organization"
            className={inputClassName}
            placeholder="Company name"
          />
        </Field>
        <Field label="Phone" htmlFor="phone">
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={inputClassName}
            placeholder="+1 (555) 000-0000"
          />
        </Field>
      </div>

      <Field label="How can we help?" htmlFor="interest" className="mt-5">
        <select id="interest" name="interest" className={inputClassName} defaultValue="">
          <option value="" disabled>
            Select a topic
          </option>
          {interests.map((interest) => (
            <option key={interest} value={interest}>
              {interest}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Project details" htmlFor="message" className="mt-5">
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={cn(inputClassName, "resize-y")}
          placeholder="Share your current environment, goals, and timeline."
        />
      </Field>

      <p className="mt-4 text-xs leading-relaxed text-muted">
        By submitting this form you agree to our privacy policy. This is a
        placeholder form for demonstration—connect it to your preferred backend
        or booking system when ready.
      </p>

      <Button type="submit" className="mt-6 w-full sm:w-auto" disabled={pending}>
        {pending ? "Sending..." : "Send message"}
      </Button>
    </form>
  );
}

const inputClassName =
  "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition-shadow placeholder:text-muted/70 focus:border-primary focus:ring-2 focus:ring-primary/25";

function Field({
  label,
  htmlFor,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label htmlFor={htmlFor} className={cn("block", className)}>
      <span className="mb-2 block text-sm font-medium text-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}
