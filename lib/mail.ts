import nodemailer, { type Transporter } from "nodemailer";
import { SITE } from "./site";

type MailPayload = {
  to: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
};

let transporter: Transporter | null = null;

function getTransporter(): Transporter | null {
  if (!process.env.SMTP_HOST) return null;
  if (transporter) return transporter;

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      : undefined,
  });

  return transporter;
}

export async function sendMail(payload: MailPayload) {
  const client = getTransporter();

  if (!client) {
    console.info(
      `[mail] SMTP not configured. Would have sent "${payload.subject}" to ${payload.to}`,
    );
    return { delivered: false as const, skipped: true };
  }

  const from = process.env.SMTP_FROM || `Esther Studios <${SITE.email}>`;

  await client.sendMail({
    from,
    to: payload.to,
    subject: payload.subject,
    text: payload.text,
    html: payload.html,
    replyTo: payload.replyTo,
  });

  return { delivered: true as const, skipped: false };
}

export type BookingMailInput = {
  reference: string;
  name: string;
  email: string;
  phone: string;
  sessionType: string;
  packageName: string;
  price: string;
  date: string;
  time: string;
  locationMode: string;
  locationName: string;
  requests: string;
};

export function bookingConfirmationHtml(input: BookingMailInput) {
  const rows: [string, string][] = [
    ["Booking reference", input.reference],
    ["Session type", input.sessionType],
    ["Package", `${input.packageName} (${input.price})`],
    ["Preferred date", input.date],
    ["Preferred time", input.time],
    ["Location", `${input.locationMode}${input.locationName ? `, ${input.locationName}` : ""}`],
    ["Phone", input.phone],
  ];

  return `
  <div style="font-family:Poppins,Arial,sans-serif;color:#1d1d1d;max-width:640px;margin:0 auto">
    <h1 style="font-size:22px;font-weight:500">Your session request is with us</h1>
    <p style="color:#838383;line-height:1.9">Hello ${input.name}, thank you for choosing ${SITE.name}. We have your request and will confirm the details on WhatsApp within one working day.</p>
    <table style="width:100%;border-collapse:collapse;margin:24px 0;font-size:14px">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:10px 0;border-bottom:1px solid #e0e0e0;color:#838383;width:40%">${k}</td><td style="padding:10px 0;border-bottom:1px solid #e0e0e0">${v}</td></tr>`,
        )
        .join("")}
    </table>
    ${
      input.requests
        ? `<p style="color:#838383;line-height:1.9"><strong>Special requests</strong><br/>${input.requests}</p>`
        : ""
    }
    <p style="color:#838383;line-height:1.9">${SITE.tagline}<br/>${SITE.name}, ${SITE.city}, ${SITE.country}</p>
  </div>`;
}

export function bookingConfirmationText(input: BookingMailInput) {
  return [
    `Hello ${input.name},`,
    "",
    `Thank you for choosing ${SITE.name}. Your session request is with us.`,
    "",
    `Booking reference: ${input.reference}`,
    `Session type: ${input.sessionType}`,
    `Package: ${input.packageName} (${input.price})`,
    `Preferred date: ${input.date} at ${input.time}`,
    `Location: ${input.locationMode}${input.locationName ? `, ${input.locationName}` : ""}`,
    input.requests ? `Special requests: ${input.requests}` : "",
    "",
    "We will confirm your slot on WhatsApp within one working day.",
    "",
    `${SITE.name}, ${SITE.city}, ${SITE.country}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export function studioNotificationText(input: BookingMailInput) {
  return [
    `New booking request ${input.reference}`,
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Phone: ${input.phone}`,
    `Session: ${input.sessionType}`,
    `Package: ${input.packageName} (${input.price})`,
    `Date: ${input.date} at ${input.time}`,
    `Location: ${input.locationMode}${input.locationName ? `, ${input.locationName}` : ""}`,
    `Requests: ${input.requests || "none"}`,
  ].join("\n");
}

export type ContactMailInput = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export function contactNotificationHtml(input: ContactMailInput) {
  return `
  <div style="font-family:Poppins,Arial,sans-serif;color:#1d1d1d;max-width:640px;margin:0 auto">
    <h1 style="font-size:22px;font-weight:500">New enquiry from ${input.name}</h1>
    <p style="color:#838383;line-height:1.9">${input.message}</p>
    <p style="color:#838383;line-height:1.9">Reply to ${input.email}</p>
  </div>`;
}
