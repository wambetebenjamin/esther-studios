"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { SITE } from "@/lib/site";
import Reveal from "./Reveal";

const STATS = [
  { value: "9", label: "Years photographing" },
  { value: "240+", label: "Weddings covered" },
  { value: "4", label: "Awards and features" },
];

/**
 * Animation effect 7: about section image parallax on scroll (GSAP).
 */
export default function AboutPhotographer() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    if (!section || !image) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(max-width: 900px)").matches) return;

    let cleanup = () => {};

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      gsap.registerPlugin(ScrollTrigger);

      const tween = gsap.fromTo(
        image,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      cleanup = () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    })();

    return () => cleanup();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="about-title"
      style={{ backgroundColor: "#f2f4f8", paddingTop: 96, paddingBottom: 96, overflow: "hidden" }}
    >
      <div
        className="es-container"
        style={{
          display: "grid",
          gap: 56,
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          alignItems: "center",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "4 / 5",
            overflow: "hidden",
          }}
        >
          <div
            ref={imageRef}
            style={{ position: "absolute", inset: "-12% 0", willChange: "transform" }}
          >
            <Image
              src="/images/portrait-03.jpg"
              alt={`East African portrait of ${SITE.photographer}`}
              fill
              sizes="(max-width: 900px) 92vw, 44vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>

        <div>
          <Reveal>
            <span className="es-eyebrow">About the photographer</span>
            <h2 id="about-title" style={{ fontSize: "clamp(26px, 3.4vw, 36px)", marginTop: 16 }}>
              {SITE.photographer}
            </h2>
            <p style={{ marginTop: 22 }}>
              Esther started photographing weddings in her second year at university and never
              stopped. She works quietly, watches for the moment before the pose, and edits
              every gallery herself.
            </p>
            <p>
              Her work has taken her from garden ceremonies in Kiambu to studio sittings in
              Kilimani, and she still answers most enquiries on WhatsApp personally.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: 18,
                marginTop: 36,
                borderTop: "1px solid #e0e0e0",
                paddingTop: 28,
              }}
            >
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <span
                    style={{
                      display: "block",
                      fontSize: "clamp(26px, 3vw, 34px)",
                      color: "#1d1d1d",
                      fontWeight: 500,
                      lineHeight: 1.1,
                    }}
                  >
                    {stat.value}
                  </span>
                  <span style={{ display: "block", fontSize: 13, marginTop: 8 }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
