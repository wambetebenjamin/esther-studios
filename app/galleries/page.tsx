import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { GALLERIES, galleriesByType } from "@/lib/galleries";
import { SESSION_TYPES, isSessionTypeId } from "@/lib/site";

export const metadata: Metadata = {
  title: "Galleries",
  description:
    "Wedding, engagement, portrait, corporate, maternity, family and event galleries photographed by Esther Studios in Nairobi and across Kenya.",
};

type Props = {
  searchParams: Promise<{ type?: string }>;
};

export default async function GalleriesPage({ searchParams }: Props) {
  const { type } = await searchParams;
  const active = type && isSessionTypeId(type) ? type : "all";
  const galleries = galleriesByType(active);

  return (
    <section style={{ paddingTop: 72, paddingBottom: 96 }}>
      <div className="es-container">
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <span className="es-eyebrow">Our work</span>
          <h1 style={{ fontSize: "clamp(28px, 4vw, 42px)", marginTop: 16 }}>Galleries</h1>
          <span className="es-rule" aria-hidden="true" />
          <p style={{ maxWidth: 640, margin: "0 auto" }}>
            Every gallery below is a real session. Filter by the kind of session you are
            planning, then open one to view it full size.
          </p>
        </div>

        <nav
          aria-label="Filter galleries by session type"
          style={{
            display: "flex",
            gap: 8,
            overflowX: "auto",
            paddingBottom: 10,
            marginBottom: 40,
          }}
        >
          {[{ id: "all", name: "All" }, ...SESSION_TYPES].map((option) => {
            const selected = option.id === active;
            return (
              <Link
                key={option.id}
                href={option.id === "all" ? "/galleries" : `/galleries?type=${option.id}`}
                aria-current={selected ? "page" : undefined}
                style={{
                  whiteSpace: "nowrap",
                  padding: "11px 20px",
                  fontSize: 13,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  border: `1px solid ${selected ? "#1d1d1d" : "#e0e0e0"}`,
                  backgroundColor: selected ? "#1d1d1d" : "#ffffff",
                  color: selected ? "#ffffff" : "#838383",
                }}
              >
                {option.name}
              </Link>
            );
          })}
        </nav>

        {galleries.length === 0 ? (
          <p style={{ textAlign: "center" }}>
            No galleries published for this session type yet.{" "}
            <Link href="/galleries" style={{ textDecoration: "underline" }}>
              Show all galleries
            </Link>
            .
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gap: 24,
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            }}
          >
            {galleries.map((gallery) => (
              <article
                key={gallery.slug}
                style={{
                  border: "1px solid #f0f0f0",
                  backgroundColor: "#ffffff",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ position: "relative", width: "100%", aspectRatio: "4 / 3" }}>
                  <Image
                    src={gallery.cover}
                    alt={gallery.coverAlt}
                    fill
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div style={{ padding: 22, display: "flex", flexDirection: "column", flex: 1 }}>
                  <h2 style={{ fontSize: 19 }}>{gallery.title}</h2>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 14,
                      marginTop: 10,
                      fontSize: 13,
                    }}
                  >
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                      <CalendarDays size={14} aria-hidden="true" /> {gallery.dateLabel}
                    </span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                      <MapPin size={14} aria-hidden="true" /> {gallery.location}
                    </span>
                  </div>
                  <p style={{ fontSize: 14, marginTop: 14, flex: 1 }}>{gallery.story}</p>
                  <Link
                    href={`/galleries/${gallery.slug}`}
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
                    View Gallery <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        <p style={{ textAlign: "center", marginTop: 48, fontSize: 13 }}>
          Showing {galleries.length} of {GALLERIES.length} published galleries.
        </p>
      </div>
    </section>
  );
}
