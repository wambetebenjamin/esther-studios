import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { SITE, SESSION_TYPES } from "@/lib/site";

const LEGAL_LINKS = [
  { href: "/legal/privacy-policy", label: "Privacy Policy" },
  { href: "/legal/terms", label: "Terms of Service" },
  { href: "/legal/cookie-policy", label: "Cookie Policy" },
];

export default function SiteFooter() {
  return (
    <footer
      className="footer-area"
      style={{ backgroundColor: "#f2f4f8", paddingTop: 72, paddingBottom: 40, marginTop: 0 }}
    >
      <div className="es-container">
        <div
          style={{
            display: "grid",
            gap: 48,
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          }}
        >
          <div>
            <span
              style={{
                display: "block",
                fontSize: 16,
                letterSpacing: "0.26em",
                fontWeight: 500,
                color: "#1d1d1d",
              }}
            >
              ESTHER STUDIOS
            </span>
            <p style={{ marginTop: 14, fontSize: 14 }}>
              {SITE.tagline} A {SITE.business.toLowerCase()} in {SITE.city}, {SITE.country}.
            </p>
            <div style={{ display: "grid", gap: 10, marginTop: 22 }}>
              <a
                href={`https://wa.me/${SITE.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 14 }}
              >
                <Phone size={15} aria-hidden="true" /> WhatsApp {SITE.phone}
              </a>
              <a
                href={SITE.phoneHref}
                style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 14 }}
              >
                <Phone size={15} aria-hidden="true" /> Call {SITE.phone}
              </a>
              <a
                href={`mailto:${SITE.email}`}
                style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 14 }}
              >
                <Mail size={15} aria-hidden="true" /> {SITE.email}
              </a>
              <span style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 14 }}>
                <MapPin size={15} aria-hidden="true" /> {SITE.address.join(", ")}
              </span>
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase" }}>
              Session Types
            </h3>
            <ul style={{ listStyle: "none", margin: "18px 0 0", padding: 0, display: "grid", gap: 8 }}>
              {SESSION_TYPES.map((type) => (
                <li key={type.id}>
                  <Link
                    href={`/galleries?type=${type.id}`}
                    style={{ fontSize: 14, color: "#838383" }}
                  >
                    {type.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase" }}>
              Studio
            </h3>
            <ul style={{ listStyle: "none", margin: "18px 0 0", padding: 0, display: "grid", gap: 8 }}>
              {[
                { href: "/galleries", label: "All Galleries" },
                { href: "/packages", label: "Packages and Pricing" },
                { href: "/booking", label: "Book a Session" },
                { href: "/contact", label: "Contact" },
                { href: "/auth/signin", label: "Sign in" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} style={{ fontSize: 14, color: "#838383" }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase" }}>
              Legal
            </h3>
            <ul style={{ listStyle: "none", margin: "18px 0 0", padding: 0, display: "grid", gap: 8 }}>
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} style={{ fontSize: 14, color: "#838383" }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3
              style={{
                fontSize: 13,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginTop: 28,
              }}
            >
              Follow
            </h3>
            <ul style={{ listStyle: "none", margin: "18px 0 0", padding: 0, display: "grid", gap: 8 }}>
              {SITE.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: 14, color: "#838383" }}
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid #e0e0e0",
            marginTop: 48,
            paddingTop: 24,
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            justifyContent: "space-between",
          }}
        >
          <p style={{ margin: 0, fontSize: 13 }}>
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p style={{ margin: 0, fontSize: 13 }}>
            Photographed by {SITE.photographer} in {SITE.city}, {SITE.country}.
          </p>
        </div>
      </div>
    </footer>
  );
}
