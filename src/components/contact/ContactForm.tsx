"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const interests = [
  "Microsoft 365",
  "Azure / Entra ID",
  "Intune / endpoints",
  "Security",
  "Cloud migration",
  "Backup & recovery",
  "Technology strategy",
  "Business IT support",
  "Other",
];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fallbackEmail, setFallbackEmail] = useState<string>(siteConfig.email);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = (await response.json()) as {
        ok?: boolean;
        error?: string;
        email?: string;
      };

      if (!response.ok) {
        setFallbackEmail(result.email || siteConfig.email);
        setError(
          result.error ||
            "We could not send your message. Please email us directly.",
        );
        setPending(false);
        return;
      }

      setSubmitted(true);
      form.reset();
    } catch {
      setError("Network error. Please email us directly.");
    } finally {
      setPending(false);
    }
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
          Thanks for contacting Niall Tech. We typically reply the same business
          day with a clear next step.
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
      className="rounded-2xl border border-border bg-card p-6 sm:p-8"
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
        <Field label="Phone (optional)" htmlFor="phone">
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={inputClassName}
            placeholder="Optional"
          />
        </Field>
      </div>

      <Field label="How can we help?" htmlFor="interest" className="mt-5">
        <select
          id="interest"
          name="interest"
          className={inputClassName}
          defaultValue=""
          required
        >
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
          placeholder="What is getting in the way today? Goals, timeline, and constraints help."
        />
      </Field>

      <p className="mt-4 text-xs leading-relaxed text-muted">
        By submitting, you agree to our{" "}
        <a href="/privacy" className="underline underline-offset-2 hover:text-foreground">
          privacy policy
        </a>
        . We use your details only to respond to this inquiry.
      </p>

      {error ? (
        <div
          className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-100"
          role="alert"
        >
          <p>{error}</p>
          <p className="mt-2">
            Email{" "}
            <a
              className="font-semibold underline underline-offset-2"
              href={`mailto:${fallbackEmail}`}
            >
              {fallbackEmail}
            </a>
            .
          </p>
        </div>
      ) : null}

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
