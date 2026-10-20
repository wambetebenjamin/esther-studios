import Link from "next/link";
import type { ReactNode } from "react";

export type LegalSection = {
  heading: string;
  body: ReactNode;
};

export default function LegalPage({
  eyebrow,
  title,
  updated,
  sections,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <section style={{ paddingTop: 72, paddingBottom: 96 }}>
      <div className="es-container">
        <div style={{ maxWidth: 780 }}>
          <span className="es-eyebrow">{eyebrow}</span>
          <h1 style={{ fontSize: "clamp(28px, 4vw, 40px)", marginTop: 16 }}>{title}</h1>
          <span className="es-rule" style={{ margin: "20px 0 30px" }} aria-hidden="true" />
          <p style={{ fontSize: 13 }}>Last updated {updated}</p>

          <nav aria-label="Legal pages" style={{ marginBottom: 36 }}>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", gap: 18, flexWrap: "wrap" }}>
              {[
                { href: "/legal/privacy-policy", label: "Privacy Policy" },
                { href: "/legal/terms", label: "Terms of Service" },
                { href: "/legal/cookie-policy", label: "Cookie Policy" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} style={{ fontSize: 13, color: "#838383" }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div style={{ display: "grid", gap: 34 }}>
            {sections.map((section, index) => (
              <div key={section.heading}>
                <h2 style={{ fontSize: 19 }}>
                  {index + 1}. {section.heading}
                </h2>
                <div style={{ marginTop: 12 }}>{section.body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function P({ children }: { children: ReactNode }) {
  return <p style={{ marginTop: 0, marginBottom: 12 }}>{children}</p>;
}

export function UL({ items }: { items: ReactNode[] }) {
  return (
    <ul style={{ margin: "0 0 12px", paddingLeft: 20, display: "grid", gap: 6 }}>
      {items.map((item, index) => (
        <li key={index} style={{ fontSize: 15 }}>
          {item}
        </li>
      ))}
    </ul>
  );
}
