"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SITE } from "@/lib/site";

const HERO = {
  src: "/images/hero-wedding.jpg",
  alt: "African wedding ceremony with guests in traditional attire",
};

export default function Hero() {
  return (
    <section
      aria-label="Esther Studios"
      style={{
        position: "relative",
        height: "100vh",
        minHeight: 620,
        overflow: "hidden",
        marginTop: "calc(-1 * var(--es-header-h))",
      }}
    >
      <div style={{ position: "absolute", inset: 0 }}>
        <Image
          src={HERO.src}
          alt={HERO.alt}
          fill
          priority
          sizes="100vw"
          className="es-ken-burns"
          style={{ objectFit: "cover", objectPosition: "center 40%" }}
        />
      </div>

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(29,29,29,0.42) 0%, rgba(29,29,29,0.28) 42%, rgba(29,29,29,0.52) 100%)",
        }}
      />

      <div
        className="es-container"
        style={{
          position: "relative",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          maxWidth: 900,
          paddingTop: "var(--es-header-h)",
        }}
      >
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          style={{
            display: "block",
            fontSize: 12,
            letterSpacing: "0.34em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.82)",
            marginBottom: 18,
          }}
        >
          {SITE.business}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          style={{
            color: "#ffffff",
            fontSize: "clamp(38px, 7vw, 76px)",
            fontWeight: 500,
            lineHeight: 1.08,
            letterSpacing: "-0.01em",
          }}
        >
          {SITE.tagline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          style={{
            color: "rgba(255,255,255,0.86)",
            fontSize: "clamp(15px, 1.6vw, 18px)",
            maxWidth: 520,
            marginTop: 22,
            lineHeight: 1.9,
          }}
        >
          Weddings, portraits and family stories photographed across Nairobi and Kenya.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55 }}
          style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 38 }}
        >
          <Link href="/galleries">
            <span
              className="studio-btn"
              style={{ backgroundColor: "#ffffff", color: "#1d1d1d" }}
            >
              View Galleries <ArrowRight size={16} aria-hidden="true" />
            </span>
          </Link>
          <Link href="/booking">
            <span
              className="studio-btn studio-btn-2"
              style={{ borderColor: "#ffffff", color: "#ffffff" }}
            >
              Book a Session
            </span>
          </Link>
        </motion.div>
      </div>

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 28,
          left: "50%",
          transform: "translateX(-50%)",
          color: "rgba(255,255,255,0.7)",
          fontSize: 11,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
        }}
      >
        Scroll
      </div>
    </section>
  );
}
