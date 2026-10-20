"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { packagesForType, formatPrice } from "@/lib/packages";
import { SESSION_TYPES, type SessionTypeId } from "@/lib/site";

type Props = {
  initialType?: SessionTypeId;
  showAllLink?: boolean;
  /** Label for the per package call to action. */
  bookLabel?: string;
};

/**
 * Animation effect 5: package tab switch transition (AnimatePresence).
 */
export default function PackagesTabs({
  initialType = "wedding",
  showAllLink = true,
  bookLabel = "Book This Package",
}: Props) {
  const [active, setActive] = useState<SessionTypeId>(initialType);
  const packages = packagesForType(active);

  return (
    <section aria-labelledby="packages-title" style={{ paddingTop: 96, paddingBottom: 96 }}>
      <div className="es-container">
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <span className="es-eyebrow">Packages</span>
          <h2 id="packages-title" style={{ fontSize: "clamp(26px, 3.4vw, 36px)", marginTop: 16 }}>
            Three ways to book every session
          </h2>
          <span className="es-rule" aria-hidden="true" />
          <p style={{ maxWidth: 620, margin: "0 auto" }}>
            Prices are in Kenya Shillings and include editing, an online gallery and a print
            release. Travel outside Nairobi is quoted separately.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Session types"
          style={{
            display: "flex",
            gap: 8,
            overflowX: "auto",
            paddingBottom: 8,
            justifyContent: "flex-start",
          }}
        >
          {SESSION_TYPES.map((type) => {
            const selected = type.id === active;
            return (
              <button
                key={type.id}
                role="tab"
                id={`package-tab-${type.id}`}
                aria-selected={selected}
                aria-controls={`package-panel-${type.id}`}
                type="button"
                onClick={() => setActive(type.id)}
                style={{
                  whiteSpace: "nowrap",
                  padding: "12px 20px",
                  fontSize: 13,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  border: `1px solid ${selected ? "#1d1d1d" : "#e0e0e0"}`,
                  backgroundColor: selected ? "#1d1d1d" : "#ffffff",
                  color: selected ? "#ffffff" : "#838383",
                  cursor: "pointer",
                  transition: "all 300ms ease",
                }}
              >
                {type.name}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            id={`package-panel-${active}`}
            role="tabpanel"
            aria-labelledby={`package-tab-${active}`}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
            style={{
              display: "grid",
              gap: 20,
              marginTop: 32,
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            }}
          >
            {packages.map((pkg) => (
              <article
                key={pkg.id}
                style={{
                  border: `1px solid ${pkg.popular ? "#1d1d1d" : "#e0e0e0"}`,
                  backgroundColor: "#ffffff",
                  padding: 30,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 10,
                  }}
                >
                  <h3 style={{ fontSize: 20 }}>{pkg.name}</h3>
                  {pkg.popular && (
                    <span
                      style={{
                        fontSize: 10,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        border: "1px solid #1d1d1d",
                        padding: "4px 8px",
                        color: "#1d1d1d",
                      }}
                    >
                      Most booked
                    </span>
                  )}
                </div>

                <p style={{ fontSize: 14, marginTop: 10 }}>{pkg.summary}</p>

                <p
                  style={{
                    fontSize: 26,
                    color: "#1d1d1d",
                    fontWeight: 500,
                    margin: "18px 0 0",
                    lineHeight: 1.2,
                  }}
                >
                  {formatPrice(pkg.price)}
                </p>
                <p style={{ fontSize: 12, marginTop: 4 }}>{pkg.priceNote}</p>

                <ul
                  style={{
                    listStyle: "none",
                    margin: "22px 0 0",
                    padding: 0,
                    display: "grid",
                    gap: 10,
                    flex: 1,
                  }}
                >
                  {pkg.includes.map((item) => (
                    <li
                      key={item}
                      style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14 }}
                    >
                      <Check size={16} aria-hidden="true" style={{ marginTop: 5, flexShrink: 0 }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <p
                  style={{
                    fontSize: 13,
                    marginTop: 22,
                    borderTop: "1px solid #f0f0f0",
                    paddingTop: 16,
                  }}
                >
                  {pkg.delivery}
                </p>

                <Link
                  href={`/booking?type=${pkg.type}&package=${pkg.id}`}
                  className="studio-btn"
                  style={{ marginTop: 20, width: "100%" }}
                >
                  {bookLabel}
                </Link>
              </article>
            ))}
          </motion.div>
        </AnimatePresence>

        {showAllLink && (
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <Link href="/packages" className="studio-btn studio-btn-2">
              See full pricing and delivery timelines
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
