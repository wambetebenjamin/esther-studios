import { NextResponse } from "next/server";
import { getBooking } from "@/lib/booking";
import { auth } from "@/lib/auth";

/**
 * Booking lookup. Session gated: a signed in account sees any booking,
 * anyone else must prove ownership by passing the email used to book.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ ref: string }> },
) {
  const { ref } = await params;
  const booking = await getBooking(ref);

  if (!booking) {
    return NextResponse.json({ ok: false, error: "Booking not found" }, { status: 404 });
  }

  let session = null;
  try {
    session = await auth();
  } catch {
    session = null;
  }

  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email")?.trim().toLowerCase();

  const ownsBooking = Boolean(email && email === booking.email.toLowerCase());

  if (!session && !ownsBooking) {
    return NextResponse.json(
      {
        ok: false,
        error: "Sign in, or pass the email used to book, to view this booking",
        requiresAuth: true,
      },
      { status: 403 },
    );
  }

  return NextResponse.json({ ok: true, booking });
}
