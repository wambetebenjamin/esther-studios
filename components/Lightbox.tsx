"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Download } from "lucide-react";
import type { GalleryImage } from "@/lib/galleries";
import { SITE } from "@/lib/site";
import DownloadPreviewButton from "./DownloadPreviewButton";

type Props = {
  images: GalleryImage[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number | null) => void;
};

/**
 * Animation effect 3: lightbox open and close spring animation.
 * Keyboard arrows and touch swipe navigation.
 */
export default function Lightbox({ images, index, onClose, onIndexChange }: Props) {
  const open = index !== null;
  const touchStartX = useRef<number | null>(null);

  const go = useCallback(
    (direction: number) => {
      if (index === null) return;
      const next = (index + direction + images.length) % images.length;
      onIndexChange(next);
    },
    [index, images.length, onIndexChange],
  );

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };

    window.addEventListener("keydown", onKey);
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = previous;
    };
  }, [open, go, onClose]);

  const current = index === null ? null : images[index];

  return (
    <AnimatePresence>
      {open && current && (
        <motion.div
          key="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-label={`Image viewer, image ${(index ?? 0) + 1} of ${images.length}`}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10050,
            backgroundColor: "rgba(29,29,29,0.94)",
            display: "flex",
            flexDirection: "column",
          }}
          onTouchStart={(event) => {
            touchStartX.current = event.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(event) => {
            const start = touchStartX.current;
            const end = event.changedTouches[0]?.clientX ?? null;
            touchStartX.current = null;
            if (start === null || end === null) return;
            const delta = end - start;
            if (Math.abs(delta) < 48) return;
            go(delta < 0 ? 1 : -1);
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px 20px",
              color: "#ffffff",
            }}
          >
            <span style={{ fontSize: 12, letterSpacing: "0.2em" }}>
              {(index ?? 0) + 1} / {images.length}
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close image viewer"
              style={{
                width: 44,
                height: 44,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.3)",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>

          <div
            style={{
              flex: 1,
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 16px",
              minHeight: 0,
            }}
          >
            <motion.div
              key={current.src}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              style={{ position: "relative", width: "100%", height: "100%" }}
            >
              <Image
                src={current.src}
                alt={current.alt}
                fill
                sizes="100vw"
                style={{ objectFit: "contain" }}
              />
            </motion.div>

            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous image"
              style={{
                position: "absolute",
                left: 8,
                top: "50%",
                transform: "translateY(-50%)",
                width: 46,
                height: 46,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.92)",
                border: "none",
                color: "#1d1d1d",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <ChevronLeft size={22} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next image"
              style={{
                position: "absolute",
                right: 8,
                top: "50%",
                transform: "translateY(-50%)",
                width: 46,
                height: 46,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.92)",
                border: "none",
                color: "#1d1d1d",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <ChevronRight size={22} aria-hidden="true" />
            </button>
          </div>

          <div
            style={{
              padding: "16px 20px 28px",
              display: "flex",
              flexWrap: "wrap",
              gap: 14,
              alignItems: "center",
              justifyContent: "space-between",
              color: "#ffffff",
            }}
          >
            <p style={{ color: "rgba(255,255,255,0.78)", fontSize: 13, margin: 0, maxWidth: 520 }}>
              {current.alt}
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <DownloadPreviewButton
                src={current.src}
                alt={current.alt}
                reference={SITE.name}
              />
              <a
                href={`/booking`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  border: "1px solid rgba(255,255,255,0.4)",
                  padding: "10px 18px",
                  fontSize: 13,
                  color: "#ffffff",
                }}
              >
                Book a Similar Session
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function LightboxDownloadIcon() {
  return <Download size={16} aria-hidden="true" />;
}
