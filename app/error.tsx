"use client";

import { useEffect } from "react";
import { RotateCcw, RefreshCw } from "lucide-react";
import { PREFILLED_WHATSAPP_URL, SITE } from "@/lib/site";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

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
        <RotateCcw
          size={56}
          strokeWidth={1}
          aria-hidden="true"
          style={{ color: "#1d1d1d", marginBottom: 26 }}
        />
        <h1 style={{ fontSize: "clamp(26px, 3.6vw, 36px)" }}>Something went wrong</h1>
        <p style={{ marginTop: 18, fontSize: 16 }}>
          We hit an unexpected error while loading this page. Try again, and if it keeps
          happening, tell us on WhatsApp and we will sort it out.
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
          <button type="button" className="studio-btn" onClick={reset}>
            <RefreshCw size={16} aria-hidden="true" /> Try Again
          </button>
          <a
            href={PREFILLED_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="studio-btn studio-btn-2"
          >
            Chat with us on WhatsApp
          </a>
        </div>

        <p style={{ marginTop: 28, fontSize: 14 }}>WhatsApp {SITE.phone}</p>
        {error.digest && (
          <p style={{ marginTop: 10, fontSize: 12, color: "#aeaeae" }}>
            Error reference {error.digest}
          </p>
        )}
      </div>
    </section>
  );
}
