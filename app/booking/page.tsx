import type { Metadata } from "next";
import BookingForm from "@/components/BookingForm";
import { SESSION_TYPES, isSessionTypeId, SITE, type SessionTypeId } from "@/lib/site";
import { findPackage } from "@/lib/packages";

export const metadata: Metadata = {
  title: "Book a Session",
  description:
    "Book a wedding, engagement, portrait, corporate, maternity, family or event photography session with Esther Studios in Nairobi, Kenya.",
};

type Props = {
  searchParams: Promise<{ type?: string; package?: string }>;
};

export default async function BookingPage({ searchParams }: Props) {
  const { type, package: packageId } = await searchParams;

  const initialType: SessionTypeId =
    type && isSessionTypeId(type) ? type : "wedding";

  const pkg = packageId ? findPackage(packageId) : undefined;
  const initialPackage = pkg && pkg.type === initialType ? pkg.id : undefined;

  return (
    <section style={{ paddingTop: 72, paddingBottom: 96 }}>
      <div className="es-container">
        <div style={{ maxWidth: 760, marginBottom: 44 }}>
          <span className="es-eyebrow">Booking</span>
          <h1 style={{ fontSize: "clamp(28px, 4vw, 42px)", marginTop: 16 }}>
            Book a session
          </h1>
          <span className="es-rule" style={{ margin: "0 0 20px" }} aria-hidden="true" />
          <p style={{ fontSize: 16 }}>
            Tell us what you have in mind and we will hold the date. You will get a booking
            reference straight away, and we will confirm the details on WhatsApp within one
            working day.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gap: 44,
            gridTemplateColumns: "minmax(0, 1fr)",
            maxWidth: 900,
          }}
        >
          <BookingForm initialType={initialType} initialPackage={initialPackage} />
        </div>

        <aside
          style={{
            marginTop: 64,
            borderTop: "1px solid #e0e0e0",
            paddingTop: 32,
            display: "grid",
            gap: 24,
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          }}
        >
          <div>
            <h2 style={{ fontSize: 16 }}>Prefer to talk it through?</h2>
            <p style={{ fontSize: 14, marginBottom: 0 }}>
              Message {SITE.photographer} on WhatsApp {SITE.phone} and we will fill the form
              in together.
            </p>
          </div>
          <div>
            <h2 style={{ fontSize: 16 }}>Studio</h2>
            <p style={{ fontSize: 14, marginBottom: 0 }}>
              {SITE.address.join(", ")}
              <br />
              {SITE.hours}
            </p>
          </div>
          <div>
            <h2 style={{ fontSize: 16 }}>Already booked?</h2>
            <p style={{ fontSize: 14, marginBottom: 0 }}>
              Open your{" "}
              <a href="/booking-confirmation" style={{ textDecoration: "underline" }}>
                booking confirmation
              </a>{" "}
              to check your reference and add the session to your calendar.
            </p>
          </div>
        </aside>

        <p style={{ fontSize: 13, marginTop: 40 }}>
          Session types we photograph: {SESSION_TYPES.map((t) => t.name).join(", ")}.
        </p>
      </div>
    </section>
  );
}
