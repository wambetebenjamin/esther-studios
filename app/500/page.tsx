import type { Metadata } from "next";
import Link from "next/link";
import { RefreshCw, Camera } from "lucide-react";
import { PREFILLED_WHATSAPP_URL, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Server Error",
  description: "Something went wrong on our side. Try again or reach us on WhatsApp.",
};

export default function ServerErrorPage() {
  return (
    <section
      style={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 24px",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 520 }}>
        <Camera
          size={56}
          strokeWidth={1}
          aria-hidden="true"
          style={{ color: "#1d1d1d", marginBottom: 26 }}
        />
        <p
          style={{
            fontSize: 12,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#aeaeae",
            margin: 0,
          }}
        >
          500
        </p>
        <h1 style={{ fontSize: "clamp(26px, 3.6vw, 36px)", marginTop: 12 }}>
          Something went wrong on our side
        </h1>
        <p style={{ marginTop: 18, fontSize: 16 }}>
          Our server could not complete that request. Try again, and if it keeps happening,
          message us and we will fix it for you.
        </p>

        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: 32,
          }}
        >
          <Link href="/" className="studio-btn">
            <RefreshCw size={16} aria-hidden="true" /> Try Again
          </Link>
          <a
            href={PREFILLED_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="studio-btn studio-btn-2"
          >
            Chat with us on WhatsApp
          </a>
        </div>

        <p style={{ marginTop: 28, fontSize: 14 }}>
          WhatsApp +254112272061, or email {SITE.email}.
        </p>
      </div>
    </section>
  );
}
