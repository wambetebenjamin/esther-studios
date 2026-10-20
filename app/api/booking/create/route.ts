import { NextResponse } from "next/server";
import { bookingSchema } from "@/lib/validation";
import { findPackage, formatPrice } from "@/lib/packages";
import { sessionTypeName, SITE, type SessionTypeId } from "@/lib/site";
import { generateReference, saveBooking, type Booking } from "@/lib/booking";
import { verifyRecaptcha, scoreIsAcceptable } from "@/lib/recaptcha";
import {
  bookingConfirmationHtml,
  bookingConfirmationText,
  sendMail,
  studioNotificationText,
} from "@/lib/mail";

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

  const parsed = bookingSchema.safeParse(fields);
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

  const verification = await verifyRecaptcha(recaptchaToken, "booking");
  if (!scoreIsAcceptable(verification)) {
    return NextResponse.json(
      {
        ok: false,
        error: "We could not verify your request. Please complete the check and try again.",
        needsRecaptchaChallenge: true,
      },
      { status: 403 },
    );
  }

  const data = parsed.data;
  const pkg = findPackage(data.packageId);
  if (!pkg) {
    return NextResponse.json(
      { ok: false, error: "That package is no longer available" },
      { status: 422 },
    );
  }

  const sessionType = data.sessionType as SessionTypeId;

  const booking: Booking = {
    reference: generateReference(),
    createdAt: new Date().toISOString(),
    status: "requested",
    sessionType,
    sessionTypeName: sessionTypeName(sessionType),
    packageId: pkg.id,
    packageName: pkg.name,
    price: pkg.price,
    priceLabel: formatPrice(pkg.price),
    date: data.date,
    time: data.time,
    locationMode: data.locationMode,
    locationName: data.locationName ?? "",
    name: data.name,
    phone: data.phone,
    email: data.email,
    requests: data.requests ?? "",
    recaptchaScore: verification.score ?? null,
  };

  await saveBooking(booking);

  const mailInput = {
    reference: booking.reference,
    name: booking.name,
    email: booking.email,
    phone: booking.phone,
    sessionType: booking.sessionTypeName,
    packageName: booking.packageName,
    price: booking.priceLabel,
    date: booking.date,
    time: booking.time,
    locationMode: booking.locationMode === "studio" ? "Studio" : "Outdoor",
    locationName: booking.locationName,
    requests: booking.requests,
  };

  await sendMail({
    to: booking.email,
    subject: `Your ${booking.sessionTypeName} request, reference ${booking.reference}`,
    text: bookingConfirmationText(mailInput),
    html: bookingConfirmationHtml(mailInput),
    replyTo: SITE.email,
  });

  await sendMail({
    to: SITE.email,
    subject: `New booking ${booking.reference} for ${booking.sessionTypeName}`,
    text: studioNotificationText(mailInput),
    html: `<pre style="font-family:Poppins,Arial,sans-serif">${studioNotificationText(mailInput)}</pre>`,
    replyTo: booking.email,
  });

  return NextResponse.json({
    ok: true,
    reference: booking.reference,
    booking: {
      reference: booking.reference,
      sessionType: booking.sessionType,
      sessionTypeName: booking.sessionTypeName,
      packageName: booking.packageName,
      priceLabel: booking.priceLabel,
      date: booking.date,
      time: booking.time,
      status: booking.status,
    },
  });
}
