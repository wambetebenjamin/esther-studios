import type { Metadata } from "next";
import Link from "next/link";
import PackagesTabs from "@/components/PackagesTabs";
import Reveal from "@/components/Reveal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Packages and Pricing",
  description:
    "Full pricing for weddings, engagements, portraits, corporate headshots, maternity, family and event photography at Esther Studios in Nairobi, Kenya.",
};

const NOTES = [
  {
    title: "What every booking includes",
    items: [
      "A planning call or WhatsApp conversation before the session",
      "Hand edited images in colour and in black and white where it suits",
      "A private online gallery with downloads for you and your family",
      "A personal print release for non commercial use",
    ],
  },
  {
    title: "How payment works",
    items: [
      "A 40 percent booking fee holds your date",
      "The balance is due on or before the session date",
      "M Pesa, bank transfer and card are all accepted",
      "Date changes are free with 14 days notice",
    ],
  },
  {
    title: "Travel",
    items: [
      "Sessions inside Nairobi County include travel",
      "Sessions up to 100 km from the city carry a flat KES 8,000 travel fee",
      "Weddings outside Kenya are quoted after a call",
    ],
  },
];

export default function PackagesPage() {
  return (
    <>
      <section style={{ paddingTop: 72, paddingBottom: 24 }}>
        <div className="es-container">
          <Reveal>
            <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto" }}>
              <span className="es-eyebrow">Pricing</span>
              <h1 style={{ fontSize: "clamp(28px, 4vw, 42px)", marginTop: 16 }}>
                Packages
              </h1>
              <span className="es-rule" aria-hidden="true" />
              <p style={{ fontSize: 16 }}>
                Every session type has three packages. Switch between the tabs to compare
                what is included, what it costs and how long delivery takes.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <PackagesTabs showAllLink={false} />

      <section style={{ backgroundColor: "#f2f4f8", paddingTop: 88, paddingBottom: 88 }}>
        <div className="es-container">
          <div
            style={{
              display: "grid",
              gap: 32,
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            }}
          >
            {NOTES.map((note) => (
              <Reveal key={note.title}>
                <div>
                  <h2 style={{ fontSize: 18 }}>{note.title}</h2>
                  <ul style={{ listStyle: "none", margin: "18px 0 0", padding: 0, display: "grid", gap: 10 }}>
                    {note.items.map((item) => (
                      <li key={item} style={{ display: "flex", gap: 10, fontSize: 14 }}>
                        <span aria-hidden="true" style={{ color: "#aeaeae" }}>
                          &bull;
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 56 }}>
            <Link href="/booking" className="studio-btn">
              Book Now
            </Link>
            <p style={{ marginTop: 18, fontSize: 13 }}>
              Questions about a package? Message us on WhatsApp {SITE.phone}.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
