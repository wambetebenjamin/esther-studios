"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { SESSION_TYPES } from "@/lib/site";

/**
 * Animation effect 9: session type cards lift on hover (Framer Motion).
 */
export default function SessionTypeCards() {
  return (
    <section
      aria-labelledby="session-types-title"
      style={{ paddingTop: 96, paddingBottom: 96 }}
    >
      <div className="es-container">
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span className="es-eyebrow">What we photograph</span>
          <h2 id="session-types-title" style={{ fontSize: "clamp(26px, 3.4vw, 36px)", marginTop: 16 }}>
            Session types
          </h2>
          <span className="es-rule" aria-hidden="true" />
          <p style={{ maxWidth: 620, margin: "0 auto" }}>
            Seven ways to work with us. Pick the one that fits the moment you want kept.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gap: 20,
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          }}
        >
          {SESSION_TYPES.map((type, index) => (
            <motion.article
              key={type.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.06, ease: [0.2, 0.7, 0.2, 1] }}
              whileHover={{ y: -10 }}
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #f0f0f0",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ position: "relative", width: "100%", aspectRatio: "3 / 4" }}>
                <Image
                  src={type.image}
                  alt={type.alt}
                  fill
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div style={{ padding: 22, display: "flex", flexDirection: "column", flex: 1 }}>
                <h3 style={{ fontSize: 18 }}>{type.name}</h3>
                <p style={{ fontSize: 14, marginTop: 10, flex: 1 }}>{type.blurb}</p>
                <Link
                  href={`/booking?type=${type.id}`}
                  className="studio-btn studio-btn-2"
                  style={{
                    marginTop: 18,
                    height: 46,
                    minWidth: 0,
                    lineHeight: "46px",
                    padding: "0 22px",
                    fontSize: 13,
                    alignSelf: "flex-start",
                  }}
                >
                  Book
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
