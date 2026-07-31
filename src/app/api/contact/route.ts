import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site";

type ContactPayload = {
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  interest?: string;
  message?: string;
};

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const company = body.company?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const interest = body.interest?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 },
    );
  }

  if (!isEmail(email)) {
    return NextResponse.json({ error: "Enter a valid work email." }, { status: 400 });
  }

  if (message.length > 5000) {
    return NextResponse.json({ error: "Message is too long." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || siteConfig.email;
  const from = process.env.CONTACT_FROM_EMAIL || `Niall Tech <onboarding@resend.dev>`;

  if (!apiKey) {
    return NextResponse.json(
      {
        ok: false,
        mode: "unconfigured",
        error:
          "Online form delivery is not configured yet. Please email us directly.",
        email: siteConfig.email,
      },
      { status: 503 },
    );
  }

  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company || "—"}`,
    `Phone: ${phone || "—"}`,
    `Interest: ${interest || "—"}`,
    "",
    message,
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `Niall Tech inquiry from ${name}`,
      text,
    }),
  });

  if (!res.ok) {
    return NextResponse.json(
      {
        ok: false,
        error: "We could not send your message. Please email us directly.",
        email: siteConfig.email,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, mode: "sent" });
}
