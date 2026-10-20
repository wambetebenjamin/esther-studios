import Reveal from "./Reveal";

const TESTIMONIALS = [
  {
    quote:
      "Esther arrived before we did and left after the last guest. Looking at the gallery felt like being at the wedding again, not like looking at poses.",
    name: "Atieno and Brian",
    detail: "Wedding, Rungiri, Kiambu County",
    image: "/images/wedding-08.jpg",
  },
  {
    quote:
      "I hate being photographed. She talked me through it in about ten minutes and then forgot the camera was there. The portraits are the ones my mother framed.",
    name: "Wanjiru N.",
    detail: "Portrait session, Westlands",
    image: "/images/portrait-03.jpg",
  },
  {
    quote:
      "We had eleven executives and one afternoon. Every headshot matched, the files landed in four days, and the board asked who we used.",
    name: "Mercy K.",
    detail: "Corporate headshots, Upper Hill",
    image: "/images/corporate-05.jpg",
  },
];

export default function Testimonials() {
  return (
    <section
      aria-labelledby="testimonials-title"
      style={{ backgroundColor: "#f6f6f6", paddingTop: 96, paddingBottom: 96 }}
    >
      <div className="es-container">
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <span className="es-eyebrow">In their words</span>
          <h2
            id="testimonials-title"
            style={{ fontSize: "clamp(26px, 3.4vw, 36px)", marginTop: 16 }}
          >
            What clients say
          </h2>
          <span className="es-rule" aria-hidden="true" />
        </div>

        <div
          style={{
            display: "grid",
            gap: 22,
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          }}
        >
          {TESTIMONIALS.map((item, index) => (
            <Reveal key={item.name} delay={index * 0.08}>
              <figure
                style={{
                  margin: 0,
                  height: "100%",
                  backgroundColor: "#ffffff",
                  border: "1px solid #efefef",
                  padding: 32,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: 24,
                }}
              >
                <blockquote style={{ margin: 0 }}>
                  <p style={{ fontSize: 16, lineHeight: 1.95, color: "#1d1d1d" }}>
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </blockquote>
                <figcaption style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <span
                    style={{
                      width: 46,
                      height: 46,
                      borderRadius: "50%",
                      overflow: "hidden",
                      position: "relative",
                      flexShrink: 0,
                      backgroundColor: "#f2f4f8",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt=""
                      loading="lazy"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </span>
                  <span>
                    <span style={{ display: "block", fontSize: 14, color: "#1d1d1d" }}>
                      {item.name}
                    </span>
                    <span style={{ display: "block", fontSize: 12 }}>{item.detail}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
