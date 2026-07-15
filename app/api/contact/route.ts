import { profile } from "@/content/profile";
import { NextResponse } from "next/server";
import { Resend } from "resend";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
};

function asNonEmptyString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { ok: false, message: "Contact form is not configured yet." },
      { status: 503 },
    );
  }

  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request body." }, { status: 400 });
  }

  const name = asNonEmptyString(payload.name);
  const email = asNonEmptyString(payload.email);
  const subject = asNonEmptyString(payload.subject);
  const message = asNonEmptyString(payload.message);

  if (!name || !email || !subject || !message) {
    return NextResponse.json(
      { ok: false, message: "Please fill in all fields." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, message: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const from =
    process.env.CONTACT_FROM_EMAIL ?? `${profile.shortName} <onboarding@resend.dev>`;

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: [profile.email],
    replyTo: email,
    subject: `[Portfolio] ${subject}`,
    html: `
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
    `,
  });

  if (error) {
    return NextResponse.json(
      { ok: false, message: error.message ?? "Failed to send message." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, message: "Message sent." });
}
