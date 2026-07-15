import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";

/**
 * Resend inbound / event webhook.
 * Dashboard URL (after deploy):
 *   https://yoxent.vercel.app/api/webhooks/resend
 *
 * Set RESEND_WEBHOOK_SECRET from the Resend webhook signing secret.
 */
export async function POST(request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  const webhookSecret = process.env.RESEND_WEBHOOK_SECRET;

  if (!apiKey) {
    return NextResponse.json({ ok: false, message: "Not configured." }, { status: 503 });
  }

  const payload = await request.text();
  const resend = new Resend(apiKey);

  let event: { type?: string; data?: { email_id?: string; subject?: string } };

  if (webhookSecret) {
    const id = request.headers.get("svix-id");
    const timestamp = request.headers.get("svix-timestamp");
    const signature = request.headers.get("svix-signature");

    if (!id || !timestamp || !signature) {
      return NextResponse.json({ ok: false, message: "Missing signature headers." }, { status: 400 });
    }

    try {
      event = resend.webhooks.verify({
        payload,
        headers: { id, timestamp, signature },
        webhookSecret,
      }) as typeof event;
    } catch {
      return NextResponse.json({ ok: false, message: "Invalid webhook signature." }, { status: 400 });
    }
  } else {
    try {
      event = JSON.parse(payload) as typeof event;
    } catch {
      return NextResponse.json({ ok: false, message: "Invalid JSON." }, { status: 400 });
    }
  }

  // Acknowledge other event types so Resend does not retry forever.
  if (event.type !== "email.received") {
    return NextResponse.json({ ok: true, ignored: event.type ?? "unknown" });
  }

  // Inbound payload acknowledged. Full fetch/forward can be added once needed.
  return NextResponse.json({
    ok: true,
    received: true,
    emailId: event.data?.email_id ?? null,
    subject: event.data?.subject ?? null,
  });
}
