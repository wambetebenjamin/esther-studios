import type { Metadata } from "next";
import Image from "next/image";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Esther Studios in Kilimani, Nairobi. Call, email or WhatsApp us about weddings, portraits, headshots, maternity, family and event photography.",
};

export default function ContactPage() {
  return (
    <section style={{ paddingTop: 72, paddingBottom: 96 }}>
      <div className="es-container">
        <div style={{ maxWidth: 720, marginBottom: 44 }}>
          <span className="es-eyebrow">Contact</span>
          <h1 style={{ fontSize: "clamp(28px, 4vw, 42px)", marginTop: 16 }}>
            Please get in touch
          </h1>
          <span className="es-rule" style={{ margin: "0 0 20px" }} aria-hidden="true" />
          <p style={{ fontSize: 16 }}>
            Whether you know exactly what you want or you are still working it out, send us a
            note. We answer every message within one working day.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gap: 48,
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            alignItems: "start",
          }}
        >
          <Reveal>
            <ContactForm />
          </Reveal>

          <div style={{ display: "grid", gap: 28 }}>
            <div>
              <h2 style={{ fontSize: 16, marginBottom: 14 }}>Studio</h2>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 12 }}>
                <li style={{ display: "flex", gap: 12, alignItems: "flex-start", fontSize: 14 }}>
                  <MapPin size={16} aria-hidden="true" style={{ marginTop: 6, flexShrink: 0 }} />
                  <span>
                    {SITE.address[0]}
                    <br />
                    {SITE.address[1]}
                    <br />
                    {SITE.address[2]}
                  </span>
                </li>
                <li style={{ display: "flex", gap: 12, alignItems: "center", fontSize: 14 }}>
                  <Phone size={16} aria-hidden="true" />
                  <a href={SITE.phoneHref}>{SITE.phone}</a>
                </li>
                <li style={{ display: "flex", gap: 12, alignItems: "center", fontSize: 14 }}>
                  <Phone size={16} aria-hidden="true" />
                  <a
                    href={`https://wa.me/${SITE.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp {SITE.phone}
                  </a>
                </li>
                <li style={{ display: "flex", gap: 12, alignItems: "center", fontSize: 14 }}>
                  <Mail size={16} aria-hidden="true" />
                  <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                </li>
                <li style={{ display: "flex", gap: 12, alignItems: "center", fontSize: 14 }}>
                  <Clock size={16} aria-hidden="true" />
                  <span>{SITE.hours}</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 style={{ fontSize: 16, marginBottom: 14 }}>Follow us</h2>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", gap: 18, flexWrap: "wrap" }}>
                {SITE.socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: 13,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "#838383",
                      }}
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 style={{ fontSize: 16, marginBottom: 14 }}>Find the studio</h2>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "4 / 3",
                  border: "1px solid #e0e0e0",
                  overflow: "hidden",
                  backgroundColor: "#f2f4f8",
                }}
              >
                <Image
                  src="/images/map-placeholder.svg"
                  alt="Map showing Esther Studios on Chania Avenue, Kilimani, Nairobi"
                  fill
                  sizes="(max-width: 900px) 92vw, 44vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <p style={{ fontSize: 12, marginTop: 10 }}>
                Static map placeholder. Add a Google Maps Static API key to render live tiles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
