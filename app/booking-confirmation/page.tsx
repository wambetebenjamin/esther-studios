import type { Metadata } from "next";
import Link from "next/link";
import { getBooking } from "@/lib/booking";
import BookingConfirmation from "@/components/BookingConfirmation";
import BookingReferenceLookup from "@/components/BookingReferenceLookup";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Booking Confirmation",
  description: "Your Esther Studios booking reference, session details and next steps.",
};

type Props = {
  searchParams: Promise<{ ref?: string }>;
};

export default async function BookingConfirmationPage({ searchParams }: Props) {
  const { ref } = await searchParams;
  const booking = ref ? await getBooking(decodeURIComponent(ref)) : null;

  if (!booking) {
    return (
      <section style={{ paddingTop: 72, paddingBottom: 96 }}>
        <div className="es-container">
          <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
            <span className="es-eyebrow">Booking confirmation</span>
            <h1 style={{ fontSize: "clamp(26px, 3.6vw, 36px)", marginTop: 16 }}>
              Find your booking
            </h1>
            <span className="es-rule" aria-hidden="true" />
            <p>
              Enter the reference we emailed to you, or the email address you booked with, and
              we will pull up your session details.
            </p>
            <BookingReferenceLookup />
            <p style={{ marginTop: 26, fontSize: 14 }}>
              Not booked yet?{" "}
              <Link href="/booking" style={{ textDecoration: "underline" }}>
                Book a session
              </Link>{" "}
              or message us on WhatsApp {SITE.phone}.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section style={{ paddingTop: 72, paddingBottom: 96 }}>
      <div className="es-container">
        <BookingConfirmation booking={booking} />

        <div style={{ maxWidth: 720, margin: "40px auto 0", textAlign: "center" }}>
          <p style={{ fontSize: 14 }}>
            Looking for a different booking?{" "}
            <Link href="/booking-confirmation" style={{ textDecoration: "underline" }}>
              Search by reference
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
