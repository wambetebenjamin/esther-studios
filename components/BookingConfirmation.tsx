"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CalendarPlus, Check, Download, MessageCircle } from "lucide-react";
import type { Booking } from "@/lib/booking";
import { bookingWhatsappUrl, googleCalendarUrl } from "@/lib/booking";
import { SITE } from "@/lib/site";

/**
 * Animation effect 6: booking confirmation reveal (Framer Motion scale).
 */
export default function BookingConfirmation({ booking }: { booking: Booking }) {
  const [qr, setQr] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const { toDataURL } = await import("qrcode");
        const url = `${SITE.siteUrl}/booking-confirmation?ref=${encodeURIComponent(booking.reference)}`;
        const dataUrl = await toDataURL(url, {
          width: 260,
          margin: 1,
          color: { dark: "#1d1d1d", light: "#ffffff" },
        });
        if (!cancelled) setQr(dataUrl);
      } catch {
        /* QR code is optional */
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [booking.reference]);

  const savePdf = async () => {
    try {
      const { jsPDF } = await import("jspdf");
      const pdf = new jsPDF({ unit: "pt", format: "a4" });
      const margin = 48;
      let y = margin;

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(18);
      pdf.text(SITE.name, margin, y);
      y += 22;

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.setTextColor(131, 131, 131);
      pdf.text(`${SITE.business}, ${SITE.city}, ${SITE.country}`, margin, y);
      y += 28;

      pdf.setTextColor(29, 29, 29);
      pdf.setFontSize(13);
      pdf.text(`Booking reference ${booking.reference}`, margin, y);
      y += 26;

      const rows: [string, string][] = [
        ["Session type", booking.sessionTypeName],
        ["Package", `${booking.packageName} (${booking.priceLabel})`],
        ["Date", booking.date],
        ["Time", `${booking.time} EAT`],
        [
          "Location",
          booking.locationMode === "studio"
            ? `${SITE.name} studio`
            : booking.locationName || "Outdoor location",
        ],
        ["Client", booking.name],
        ["Phone", booking.phone],
        ["Email", booking.email],
      ];

      pdf.setFontSize(11);
      rows.forEach(([label, value]) => {
        pdf.setTextColor(131, 131, 131);
        pdf.text(label, margin, y);
        pdf.setTextColor(29, 29, 29);
        pdf.text(value, margin + 150, y);
        y += 20;
      });

      if (booking.requests) {
        y += 10;
        pdf.setTextColor(131, 131, 131);
        pdf.text("Special requests", margin, y);
        y += 18;
        pdf.setTextColor(29, 29, 29);
        pdf.text(pdf.splitTextToSize(booking.requests, 460), margin, y);
      }

      pdf.save(`esther-studios-booking-${booking.reference}.pdf`);
    } catch {
      window.print();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 210, damping: 22 }}
      style={{
        backgroundColor: "#ffffff",
        border: "1px solid #e0e0e0",
        padding: "40px 32px",
        maxWidth: 720,
        margin: "0 auto",
      }}
    >
      <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
        <span
          style={{
            width: 42,
            height: 42,
            borderRadius: "50%",
            backgroundColor: "#1d1d1d",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Check size={20} aria-hidden="true" />
        </span>
        <div>
          <h1 style={{ fontSize: 26 }}>Your session request is in</h1>
          <p style={{ margin: 0, fontSize: 14 }}>
            {SITE.tagline} We will confirm the slot on WhatsApp within one working day.
          </p>
        </div>
      </div>

      <div
        style={{
          marginTop: 30,
          borderTop: "1px solid #f0f0f0",
          borderBottom: "1px solid #f0f0f0",
          padding: "22px 0",
        }}
      >
        <p
          style={{
            fontSize: 12,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#aeaeae",
            margin: 0,
          }}
        >
          Booking reference
        </p>
        <p
          style={{
            fontSize: 30,
            color: "#1d1d1d",
            margin: "6px 0 0",
            letterSpacing: "0.06em",
          }}
        >
          {booking.reference}
        </p>
      </div>

      <dl
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 18,
          marginTop: 26,
          marginBottom: 0,
        }}
      >
        <Detail label="Session type" value={booking.sessionTypeName} />
        <Detail label="Package" value={`${booking.packageName}, ${booking.priceLabel}`} />
        <Detail label="Date" value={booking.date} />
        <Detail label="Time" value={`${booking.time} EAT`} />
        <Detail
          label="Location"
          value={
            booking.locationMode === "studio"
              ? `${SITE.name} studio, ${SITE.city}`
              : booking.locationName || "Outdoor location"
          }
        />
        <Detail label="Status" value={booking.status} />
      </dl>

      {booking.requests && (
        <div style={{ marginTop: 22 }}>
          <p style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: "#aeaeae", margin: 0 }}>
            Special requests
          </p>
          <p style={{ marginTop: 8, marginBottom: 0, fontSize: 15 }}>{booking.requests}</p>
        </div>
      )}

      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 32 }}>
        <a
          href={bookingWhatsappUrl(booking)}
          target="_blank"
          rel="noopener noreferrer"
          className="studio-btn"
          style={{ backgroundColor: "#25D366", minWidth: 0 }}
        >
          <MessageCircle size={17} aria-hidden="true" /> Coordinate on WhatsApp
        </a>
        <a
          href={googleCalendarUrl(booking)}
          target="_blank"
          rel="noopener noreferrer"
          className="studio-btn studio-btn-2"
          style={{ minWidth: 0 }}
        >
          <CalendarPlus size={17} aria-hidden="true" /> Add to Google Calendar
        </a>
        <button
          type="button"
          onClick={savePdf}
          className="studio-btn studio-btn-2"
          style={{ minWidth: 0 }}
        >
          <Download size={17} aria-hidden="true" /> Save as PDF
        </button>
      </div>

      {qr && (
        <div style={{ marginTop: 32, display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={qr}
            alt={`QR code linking to booking ${booking.reference}`}
            width={120}
            height={120}
            style={{ border: "1px solid #e0e0e0", padding: 6 }}
          />
          <p style={{ fontSize: 13, margin: 0, maxWidth: 320 }}>
            Scan this code to come back to this confirmation page at any time.
          </p>
        </div>
      )}
    </motion.div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt style={{ fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: "#aeaeae" }}>
        {label}
      </dt>
      <dd style={{ margin: "6px 0 0", fontSize: 15, color: "#1d1d1d", textTransform: "capitalize" }}>
        {value}
      </dd>
    </div>
  );
}
