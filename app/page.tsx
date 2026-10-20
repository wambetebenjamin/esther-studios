import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Hero from "@/components/Hero";
import SessionTypeCards from "@/components/SessionTypeCards";
import MasonryGallery from "@/components/MasonryGallery";
import AboutPhotographer from "@/components/AboutPhotographer";
import PackagesTabs from "@/components/PackagesTabs";
import Testimonials from "@/components/Testimonials";
import InstagramFeed from "@/components/InstagramFeed";
import Reveal from "@/components/Reveal";
import { FEATURED_GALLERY } from "@/lib/galleries";
import { SITE } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <Hero />

      <section
        aria-labelledby="intro-title"
        style={{ paddingTop: 96, paddingBottom: 24 }}
      >
        <div className="es-container">
          <Reveal>
            <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
              <span className="es-eyebrow">The studio</span>
              <h2
                id="intro-title"
                style={{ fontSize: "clamp(24px, 3vw, 34px)", marginTop: 16, lineHeight: 1.35 }}
              >
                We photograph the moments people forget to look at twice.
              </h2>
              <span className="es-rule" aria-hidden="true" />
              <p style={{ fontSize: 16, lineHeight: 2 }}>
                {SITE.name} is a small studio in {SITE.city} run by {SITE.photographer}, and we
                take on a limited number of sessions each month so that every gallery is edited
                by the person who shot it. We work quietly, we keep what is real, and we
                deliver photographs you will still want in thirty years, because the point of a
                photograph is the life it came from.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <SessionTypeCards />

      <section
        aria-labelledby="featured-title"
        style={{ backgroundColor: "#f6f6f6", paddingTop: 96, paddingBottom: 96 }}
      >
        <div className="es-container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="es-eyebrow">Featured work</span>
            <h2 id="featured-title" style={{ fontSize: "clamp(26px, 3.4vw, 36px)", marginTop: 16 }}>
              Featured gallery
            </h2>
            <span className="es-rule" aria-hidden="true" />
            <p style={{ maxWidth: 620, margin: "0 auto" }}>
              A dozen frames from recent weddings, portraits and family sessions across Kenya.
            </p>
          </div>

          <MasonryGallery images={FEATURED_GALLERY} />

          <div style={{ textAlign: "center", marginTop: 44 }}>
            <Link href="/galleries" className="studio-btn">
              Browse All Galleries <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <AboutPhotographer />
      <PackagesTabs />
      <Testimonials />
      <InstagramFeed />
    </>
  );
}
