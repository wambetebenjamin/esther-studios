"use client";

import { useRef, useState } from "react";
import { Download } from "lucide-react";
import { SITE } from "@/lib/site";

type Props = {
  src: string;
  alt: string;
  reference?: string;
};

/**
 * Downloads a watermarked preview of a gallery image.
 * The composite is rendered with html2canvas and written to a PDF with jsPDF.
 */
export default function DownloadPreviewButton({ src, alt, reference }: Props) {
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const [busy, setBusy] = useState(false);

  const handleDownload = async () => {
    if (busy || !nodeRef.current) return;
    setBusy(true);

    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);

      const canvas = await html2canvas(nodeRef.current, {
        backgroundColor: "#ffffff",
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imageData = canvas.toDataURL("image/jpeg", 0.92);
      const orientation = canvas.width >= canvas.height ? "landscape" : "portrait";

      const pdf = new jsPDF({
        orientation,
        unit: "px",
        format: [canvas.width / 2, canvas.height / 2],
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imageData, "JPEG", 0, 0, pageWidth, pageHeight);
      pdf.setFontSize(8);
      pdf.setTextColor(131, 131, 131);
      pdf.text(
        `${SITE.name} watermarked preview. ${reference ? `Reference ${reference}. ` : ""}Not for reproduction.`,
        12,
        pageHeight - 8,
      );

      const filename = `esther-studios-preview-${src.split("/").pop()?.replace(/\.\w+$/, "") ?? "image"}.pdf`;
      pdf.save(filename);
    } catch {
      downloadWithCanvas(src, alt);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleDownload}
        disabled={busy}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          border: "1px solid rgba(255,255,255,0.4)",
          background: "transparent",
          padding: "10px 18px",
          fontSize: 13,
          color: "#ffffff",
          cursor: busy ? "wait" : "pointer",
        }}
      >
        <Download size={16} aria-hidden="true" />
        {busy ? "Preparing" : "Download Watermarked Preview"}
      </button>

      {/* Offscreen composite that html2canvas renders into the preview file */}
      <div
        aria-hidden="true"
        style={{ position: "fixed", top: 0, left: -20000, width: 900, pointerEvents: "none" }}
      >
        <div
          ref={nodeRef}
          style={{
            width: 900,
            backgroundColor: "#ffffff",
            position: "relative",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt=""
            style={{ display: "block", width: "100%", height: "auto" }}
          />
          <span
            style={{
              position: "absolute",
              left: 28,
              bottom: 24,
              color: "#ffffff",
              fontSize: 22,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              textShadow: "0 1px 12px rgba(29,29,29,0.75)",
              fontFamily: "Poppins, Arial, sans-serif",
            }}
          >
            {SITE.name}
          </span>
          <span
            style={{
              position: "absolute",
              right: 28,
              bottom: 24,
              color: "rgba(255,255,255,0.86)",
              fontSize: 12,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              textShadow: "0 1px 10px rgba(29,29,29,0.75)",
              fontFamily: "Poppins, Arial, sans-serif",
            }}
          >
            Preview
          </span>
          <span
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "rgba(255,255,255,0.30)",
              fontSize: 44,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              transform: "rotate(-22deg)",
              textShadow: "0 1px 18px rgba(29,29,29,0.6)",
              fontFamily: "Poppins, Arial, sans-serif",
            }}
          >
            {SITE.name}
          </span>
        </div>
      </div>
    </>
  );
}

function downloadWithCanvas(src: string, alt: string) {
  const image = new Image();
  image.crossOrigin = "anonymous";
  image.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(image, 0, 0);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((-22 * Math.PI) / 180);
    ctx.fillStyle = "rgba(255,255,255,0.35)";
    ctx.font = `${Math.round(canvas.width / 16)}px Poppins, Arial, sans-serif`;
    ctx.textAlign = "center";
    ctx.fillText(SITE.name, 0, 0);
    ctx.restore();

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/jpeg", 0.92);
    link.download = `esther-studios-preview-${alt.slice(0, 24).replace(/\s+/g, "-").toLowerCase()}.jpg`;
    link.click();
  };
  image.src = src;
}
