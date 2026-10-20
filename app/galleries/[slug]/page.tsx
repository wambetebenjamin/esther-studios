import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, MapPin, ArrowLeft } from "lucide-react";
import { GALLERIES, getGallery } from "@/lib/galleries";
import { sessionTypeName } from "@/lib/site";
import MasonryGallery from "@/components/MasonryGallery";
import Reveal from "@/components/Reveal";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return GALLERIES.map((gallery) => ({ slug: gallery.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const gallery = getGallery(slug);
  if (!gallery) return { title: "Gallery not found" };

  return {
    title: `${gallery.title} | ${sessionTypeName(gallery.type)} gallery`,
    description: gallery.story,
  };
}

export default async function GalleryPage({ params }: Props) {
  const { slug } = await params;
  const gallery = getGallery(slug);

  if (!gallery) notFound();

  const related = GALLERIES.filter(
    (item) => item.type === gallery.type && item.slug !== gallery.slug,
  ).slice(0, 3);

  return (
    <section style={{ paddingTop: 72, paddingBottom: 96 }}>
      <div className="es-container">
        <Link
          href="/galleries"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontSize: 13,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#838383",
          }}
        >
          <ArrowLeft size={15} aria-hidden="true" /> All galleries
        </Link>

        <Reveal>
          <div style={{ marginTop: 26, maxWidth: 760 }}>
            <span className="es-eyebrow">{sessionTypeName(gallery.type)}</span>
            <h1 style={{ fontSize: "clamp(28px, 4vw, 42px)", marginTop: 14 }}>
              {gallery.title}
            </h1>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 18,
                marginTop: 16,
                fontSize: 14,
              }}
            >
              <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
                <CalendarDays size={15} aria-hidden="true" /> {gallery.dateLabel}
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
                <MapPin size={15} aria-hidden="true" /> {gallery.location}
              </span>
              <span>{gallery.images.length} photographs</span>
            </div>
            <p style={{ marginTop: 18, fontSize: 16 }}>{gallery.story}</p>
          </div>
        </Reveal>

        <div style={{ marginTop: 48 }}>
          <MasonryGallery images={gallery.images} />
        </div>

        <Reveal>
          <div
            style={{
              marginTop: 64,
              borderTop: "1px solid #e0e0e0",
              paddingTop: 40,
              display: "flex",
              flexWrap: "wrap",
              gap: 20,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h2 style={{ fontSize: 22 }}>Want something like this?</h2>
              <p style={{ marginTop: 8, marginBottom: 0 }}>
                Tell us the date and the location and we will hold the slot for you.
              </p>
            </div>
            <Link href={`/booking?type=${gallery.type}`} className="studio-btn">
              Book a Similar Session
            </Link>
          </div>
        </Reveal>

        {related.length > 0 && (
          <div style={{ marginTop: 64 }}>
            <h2 style={{ fontSize: 20 }}>More {sessionTypeName(gallery.type).toLowerCase()} work</h2>
            <ul
              style={{
                listStyle: "none",
                margin: "20px 0 0",
                padding: 0,
                display: "grid",
                gap: 10,
              }}
            >
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/galleries/${item.slug}`}
                    style={{ fontSize: 15, color: "#838383" }}
                  >
                    {item.title}, {item.location}, {item.dateLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
