import { profile } from "@/content/profile";
import { NextResponse } from "next/server";

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

export async function POST(request: Request) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
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

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      access_key: accessKey,
      name,
      email,
      subject: `[Portfolio] ${subject}`,
      message,
      from_name: name,
      replyto: email,
      to: profile.email,
    }),
  });

  const result = (await response.json()) as { success?: boolean; message?: string };

  if (!response.ok || !result.success) {
    return NextResponse.json(
      { ok: false, message: result.message ?? "Failed to send message." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, message: result.message ?? "Message sent." });
}
