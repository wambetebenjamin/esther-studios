import Image from "next/image";
import { INSTAGRAM_FEED } from "@/lib/galleries";
import { SITE } from "@/lib/site";

export default function InstagramFeed() {
  return (
    <section aria-labelledby="instagram-title" style={{ paddingTop: 88, paddingBottom: 88 }}>
      <div className="es-container">
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            alignItems: "baseline",
            justifyContent: "space-between",
            marginBottom: 28,
          }}
        >
          <div>
            <span className="es-eyebrow">On the grid</span>
            <h2 id="instagram-title" style={{ fontSize: "clamp(22px, 2.6vw, 28px)", marginTop: 12 }}>
              Follow {SITE.name} on Instagram
            </h2>
          </div>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase" }}
          >
            @estherstudios
          </a>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
            gap: 8,
          }}
          className="es-instagram-grid"
        >
          {INSTAGRAM_FEED.map((image, index) => (
            <a
              key={`${image.src}-${index}`}
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ position: "relative", display: "block", aspectRatio: "1 / 1", overflow: "hidden" }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 33vw, 20vw"
                style={{ objectFit: "cover" }}
              />
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .es-instagram-grid { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; }
        }
      `}</style>
    </section>
  );
}
