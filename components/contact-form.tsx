"use client";

import { useState, type FormEvent } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "w-full rounded-sm border border-[color:var(--hairline)] bg-[color-mix(in_oklab,var(--paper)_90%,var(--ink))] px-3 py-2.5 text-sm text-ink placeholder:text-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          subject: data.get("subject"),
          message: data.get("message"),
        }),
      });

      const result = (await response.json()) as { ok?: boolean; message?: string };

      if (!response.ok || !result.ok) {
        throw new Error(result.message ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again.",
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate={false}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-1.5">
          <span className="sr-only">Full name</span>
          <input
            type="text"
            name="name"
            required
            autoComplete="name"
            placeholder="Full name"
            disabled={status === "submitting"}
            className={fieldClass}
          />
        </label>
        <label className="block space-y-1.5">
          <span className="sr-only">Email address</span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="Email address"
            disabled={status === "submitting"}
            className={fieldClass}
          />
        </label>
      </div>

      <label className="block space-y-1.5">
        <span className="sr-only">Subject</span>
        <input
          type="text"
          name="subject"
          required
          placeholder="Subject"
          disabled={status === "submitting"}
          className={fieldClass}
        />
      </label>

      <label className="block space-y-1.5">
        <span className="sr-only">Your message</span>
        <textarea
          name="message"
          required
          rows={6}
          placeholder="Your message"
          disabled={status === "submitting"}
          className={`${fieldClass} resize-y min-h-[9rem]`}
        />
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-fit rounded-sm bg-accent px-5 py-2.5 text-sm font-medium tracking-wide text-accent-fg transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {status === "submitting" ? "Sending…" : "Send message"}
        </button>

        {status === "success" ? (
          <p className="text-sm text-accent" role="status">
            Message sent. Thanks for reaching out.
          </p>
        ) : null}

        {status === "error" ? (
          <p className="text-sm text-[#b42318]" role="alert">
            {errorMessage}
          </p>
        ) : null}
      </div>
    </form>
  );
}
