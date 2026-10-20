import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";
import { verifyRecaptcha, scoreIsAcceptable } from "@/lib/recaptcha";
import { contactNotificationHtml, sendMail } from "@/lib/mail";
import { SITE } from "@/lib/site";

export async function POST(request: Request) {
  let raw: unknown;

  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  const { recaptchaToken, ...fields } = (raw ?? {}) as Record<string, unknown> & {
    recaptchaToken?: string;
  };

  const parsed = contactSchema.safeParse(fields);
  if (!parsed.success) {
    const flat = parsed.error.flatten().fieldErrors;
    return NextResponse.json(
      {
        ok: false,
        error: "Please check the highlighted fields",
        fields: Object.fromEntries(
          Object.entries(flat).map(([key, messages]) => [key, messages?.[0] ?? "Invalid"]),
        ),
      },
      { status: 422 },
    );
  }

  const verification = await verifyRecaptcha(recaptchaToken, "contact");
  if (!scoreIsAcceptable(verification)) {
    return NextResponse.json(
      {
        ok: false,
        error: "We could not verify your message. Please complete the check and try again.",
        needsRecaptchaChallenge: true,
      },
      { status: 403 },
    );
  }

  const data = parsed.data;

  await sendMail({
    to: SITE.email,
    subject: `Website enquiry: ${data.subject}`,
    text: [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      data.phone ? `Phone: ${data.phone}` : "",
      `Subject: ${data.subject}`,
      "",
      data.message,
    ]
      .filter(Boolean)
      .join("\n"),
    html: contactNotificationHtml({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
    }),
    replyTo: data.email,
  });

  return NextResponse.json({ ok: true, message: "Thank you, your message is with us." });
}
