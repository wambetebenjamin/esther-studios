import Link from "next/link";
import { Camera, Home } from "lucide-react";
import { SITE } from "@/lib/site";

export default function NotFound() {
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
          size={64}
          strokeWidth={1}
          aria-hidden="true"
          style={{ color: "#1d1d1d", marginBottom: 26 }}
        />
        <h1 style={{ fontSize: "clamp(28px, 4vw, 40px)" }}>This page was not captured.</h1>
        <p style={{ marginTop: 18, fontSize: 16 }}>
          The page you were looking for is not here. It may have moved, or the gallery may
          have been archived.
        </p>
        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: 34,
          }}
        >
          <Link href="/" className="studio-btn">
            <Home size={16} aria-hidden="true" /> Back to Home
          </Link>
          <Link href="/galleries" className="studio-btn studio-btn-2">
            Browse Galleries
          </Link>
        </div>
        <p style={{ marginTop: 28, fontSize: 13 }}>
          Still stuck? Message us on WhatsApp {SITE.phone}.
        </p>
      </div>
    </section>
  );
}
