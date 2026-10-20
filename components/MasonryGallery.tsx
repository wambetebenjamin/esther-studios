"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import type { GalleryImage } from "@/lib/galleries";
import Lightbox from "./Lightbox";

type Props = {
  images: GalleryImage[];
  columns?: string;
};

/**
 * Animation effect 2: masonry image stagger entrance (Framer Motion).
 */
export default function MasonryGallery({ images, columns }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <div
        className="es-masonry"
        style={columns ? ({ columnCount: columns } as React.CSSProperties) : undefined}
      >
        {images.map((image, index) => (
          <motion.button
            type="button"
            key={`${image.src}-${index}`}
            className="es-masonry-item"
            onClick={() => setOpenIndex(index)}
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.7,
              delay: (index % 6) * 0.08,
              ease: [0.2, 0.7, 0.2, 1],
            }}
            whileHover={{ scale: 1.012 }}
            aria-label={`Open image ${index + 1} of ${images.length}: ${image.alt}`}
            style={{
              display: "block",
              width: "100%",
              padding: 0,
              border: "none",
              background: "#f2f4f8",
              cursor: "zoom-in",
              position: "relative",
            }}
          >
            <span
              style={{
                display: "block",
                position: "relative",
                width: "100%",
                aspectRatio: index % 5 === 0 ? "3 / 4" : index % 3 === 0 ? "1 / 1" : "4 / 5",
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 31vw"
                style={{ objectFit: "cover" }}
              />
            </span>
          </motion.button>
        ))}
      </div>

      <Lightbox
        images={images}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onIndexChange={setOpenIndex}
      />
    </>
  );
}
