"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Lock } from "lucide-react";
import { useConsent } from "@/lib/consent";

const CATEGORIES = [
  {
    key: "necessary" as const,
    name: "Necessary",
    description:
      "Required for the site to work. These keep your booking reference, your session and the form protections running. They cannot be switched off.",
  },
  {
    key: "functional" as const,
    name: "Functional",
    description:
      "Remember your preferences such as your chosen session type, the studio location and your language settings.",
  },
  {
    key: "analytics" as const,
    name: "Analytics",
    description:
      "Anonymous statistics about which galleries and packages are viewed, so we know what to photograph and publish more of.",
  },
  {
    key: "marketing" as const,
    name: "Marketing",
    description:
      "Used to measure the performance of our campaigns and to show relevant work to people who have visited the site.",
  },
];

export default function CookieConsent() {
  const {
    decided,
    managerOpen,
    categories,
    hydrate,
    acceptAll,
    rejectOptional,
    save,
    openManager,
    closeManager,
  } = useConsent();

  const [draft, setDraft] = useState({
    functional: false,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    setDraft({
      functional: categories.functional,
      analytics: categories.analytics,
      marketing: categories.marketing,
    });
  }, [categories.analytics, categories.functional, categories.marketing, managerOpen]);

  useEffect(() => {
    if (!managerOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeManager();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [managerOpen, closeManager]);

  const showBanner = !decided || managerOpen;

  return (
    <>
      {!decided && (
        <div
          style={{
            position: "fixed",
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9990,
            width: "100%",
            backgroundColor: "#ffffff",
            borderTop: "1px solid #e0e0e0",
            boxShadow: "0 -2px 24px rgba(29,29,29,0.06)",
          }}
        >
          <div
            className="es-container"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 18,
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: 20,
              paddingBottom: 20,
            }}
          >
            <div style={{ flex: "1 1 460px", minWidth: 0 }}>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.9, color: "#1d1d1d" }}>
                <strong style={{ fontWeight: 500 }}>Cookies at Esther Studios.</strong>{" "}
                We use cookies to run the booking form, keep your preferences and understand
                which galleries people love. You choose what we keep, and you can change it
                at any time. This notice is written to meet the Kenya Data Protection Act
                2019. Read our{" "}
                <Link href="/legal/cookie-policy" style={{ textDecoration: "underline" }}>
                  cookie policy
                </Link>
                .
              </p>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button type="button" className="studio-btn" onClick={acceptAll}>
                Accept All
              </button>
              <button
                type="button"
                className="studio-btn studio-btn-2"
                onClick={openManager}
              >
                Manage Preferences
              </button>
            </div>
          </div>
        </div>
      )}

      {managerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="consent-manager-title"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9995,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
            backgroundColor: "rgba(29,29,29,0.45)",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              width: "100%",
              maxWidth: 620,
              maxHeight: "86vh",
              overflowY: "auto",
              padding: 32,
            }}
          >
            <h2 id="consent-manager-title" style={{ fontSize: 22, marginBottom: 8 }}>
              Manage cookie preferences
            </h2>
            <p style={{ fontSize: 14, marginTop: 0, marginBottom: 24 }}>
              Switch categories on or off, then save. Necessary cookies stay on because the
              site cannot run without them.
            </p>

            <div style={{ display: "grid", gap: 14 }}>
              {CATEGORIES.map((category) => {
                const locked = category.key === "necessary";
                const checked = locked ? true : draft[category.key];
                return (
                  <div
                    key={category.key}
                    style={{
                      border: "1px solid #e0e0e0",
                      padding: 16,
                      display: "flex",
                      gap: 16,
                      alignItems: "flex-start",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          color: "#1d1d1d",
                          fontWeight: 500,
                          fontSize: 15,
                        }}
                      >
                        {category.name}
                        {locked && (
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 4,
                              fontSize: 11,
                              letterSpacing: "0.14em",
                              textTransform: "uppercase",
                              color: "#838383",
                            }}
                          >
                            <Lock size={12} aria-hidden="true" /> Always on
                          </span>
                        )}
                      </div>
                      <p style={{ fontSize: 13, margin: "6px 0 0" }}>{category.description}</p>
                    </div>

                    <button
                      type="button"
                      role="switch"
                      aria-checked={checked}
                      aria-label={`${category.name} cookies`}
                      disabled={locked}
                      onClick={() =>
                        !locked &&
                        setDraft((d) => ({ ...d, [category.key]: !d[category.key] }))
                      }
                      style={{
                        width: 48,
                        height: 26,
                        borderRadius: 999,
                        border: "1px solid #e0e0e0",
                        backgroundColor: checked ? "#1d1d1d" : "#f2f4f8",
                        position: "relative",
                        cursor: locked ? "not-allowed" : "pointer",
                        opacity: locked ? 0.6 : 1,
                        flexShrink: 0,
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          top: 2,
                          left: checked ? 24 : 2,
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          backgroundColor: "#fff",
                          transition: "left 240ms ease",
                        }}
                      />
                    </button>
                  </div>
                );
              })}
            </div>

            <div
              style={{
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
                marginTop: 26,
                justifyContent: "space-between",
              }}
            >
              <button
                type="button"
                className="studio-btn studio-btn-2"
                onClick={() => {
                  rejectOptional();
                }}
              >
                Reject Optional
              </button>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button
                  type="button"
                  className="studio-btn studio-btn-2"
                  onClick={closeManager}
                >
                  Close
                </button>
                <button type="button" className="studio-btn" onClick={() => save(draft)}>
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {decided && !managerOpen && (
        <button
          type="button"
          onClick={openManager}
          style={{
            position: "fixed",
            bottom: 96,
            left: 24,
            zIndex: 9970,
            fontSize: 11,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "#838383",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: 4,
          }}
        >
          Cookie settings
        </button>
      )}
    </>
  );
}
