"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { SITE } from "@/lib/site";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/galleries", label: "Galleries" },
  { href: "/packages", label: "Packages" },
  { href: "/booking", label: "Booking" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("es-no-scroll", open);
    return () => document.documentElement.classList.remove("es-no-scroll");
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className="header-area"
      style={{
        height: "var(--es-header-h)",
        backgroundColor: scrolled ? "rgba(255,255,255,0.94)" : "#ffffff",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        borderBottom: "1px solid #f0f0f0",
      }}
    >
      <div
        className="es-container"
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
        }}
      >
        <Link href="/" aria-label={`${SITE.name} home`} style={{ lineHeight: 1 }}>
          <span
            style={{
              display: "block",
              fontSize: 17,
              letterSpacing: "0.26em",
              fontWeight: 500,
              color: "#1d1d1d",
            }}
          >
            ESTHER STUDIOS
          </span>
          <span
            style={{
              display: "block",
              fontSize: 10,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#aeaeae",
              marginTop: 4,
            }}
          >
            {SITE.city}, {SITE.country}
          </span>
        </Link>

        <nav aria-label="Primary" style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <ul
            style={{
              display: "none",
              alignItems: "center",
              gap: 26,
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
            className="es-nav-list"
          >
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  style={{
                    fontSize: 13,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: isActive(link.href) ? "#1d1d1d" : "#838383",
                    borderBottom: isActive(link.href)
                      ? "1px solid #1d1d1d"
                      : "1px solid transparent",
                    paddingBottom: 2,
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/booking"
            className="studio-btn"
            style={{ height: 44, minWidth: 0, lineHeight: "44px", padding: "0 22px", fontSize: 13 }}
          >
            Book a Session
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="es-menu-btn"
            style={{
              display: "inline-flex",
              marginLeft: 8,
              width: 44,
              height: 44,
              alignItems: "center",
              justifyContent: "center",
              background: "transparent",
              border: "1px solid #e0e0e0",
              color: "#1d1d1d",
              cursor: "pointer",
            }}
          >
            {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </nav>
      </div>

      {open && (
        <div
          id="mobile-menu"
          style={{
            position: "fixed",
            inset: "var(--es-header-h) 0 0 0",
            backgroundColor: "#ffffff",
            zIndex: 1200,
            padding: "32px 24px",
            overflowY: "auto",
          }}
        >
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 4 }}>
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  style={{
                    display: "block",
                    fontSize: 22,
                    padding: "14px 0",
                    borderBottom: "1px solid #f0f0f0",
                    color: isActive(link.href) ? "#1d1d1d" : "#838383",
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/auth/signin"
                style={{
                  display: "block",
                  fontSize: 22,
                  padding: "14px 0",
                  borderBottom: "1px solid #f0f0f0",
                  color: "#838383",
                }}
              >
                Sign in
              </Link>
            </li>
          </ul>
        </div>
      )}

      <style>{`
        @media (min-width: 1024px) {
          .es-nav-list { display: flex !important; }
          .es-menu-btn { display: none !important; }
        }
      `}</style>
    </header>
  );
}
