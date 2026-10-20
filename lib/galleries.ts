import { altFor } from "./images";
import type { SessionTypeId } from "./site";

export type GalleryImage = {
  src: string;
  alt: string;
};

export type Gallery = {
  slug: string;
  title: string;
  type: SessionTypeId;
  date: string;
  dateLabel: string;
  location: string;
  cover: string;
  coverAlt: string;
  story: string;
  images: GalleryImage[];
};

function imgs(sources: string[]): GalleryImage[] {
  return sources.map((src) => ({ src: `/images/${src}`, alt: altFor(`/images/${src}`) }));
}

export const GALLERIES: Gallery[] = [
  {
    slug: "atieno-and-brian-rungiri-wedding",
    title: "Atieno and Brian",
    type: "wedding",
    date: "2026-06-15",
    dateLabel: "15 June 2026",
    location: "Rungiri, Kiambu County",
    cover: "/images/wedding-08.jpg",
    coverAlt: altFor("/images/wedding-08.jpg"),
    story:
      "A garden ceremony that ran long into the evening. We photographed the quiet parts between the loud ones.",
    images: imgs([
      "wedding-08.jpg",
      "wedding-01.jpg",
      "wedding-04.jpg",
      "wedding-09.jpg",
      "wedding-02.jpg",
      "wedding-16.jpg",
      "wedding-17.jpg",
      "wedding-13.jpg",
      "wedding-15.jpg",
      "wedding-03.jpg",
    ]),
  },
  {
    slug: "wanjiku-nairobi-garden-ceremony",
    title: "Wanjiku and Kimani",
    type: "wedding",
    date: "2026-04-20",
    dateLabel: "20 April 2026",
    location: "Karen, Nairobi",
    cover: "/images/wedding-12.jpg",
    coverAlt: altFor("/images/wedding-12.jpg"),
    story:
      "Two hundred guests, three outfit changes, and a ceremony that started an hour late in the best way.",
    images: imgs([
      "wedding-12.jpg",
      "wedding-05.jpg",
      "wedding-06.jpg",
      "wedding-11.jpg",
      "wedding-14.jpg",
      "wedding-07.jpg",
      "wedding-10.jpg",
      "wedding-13.jpg",
    ]),
  },
  {
    slug: "machakos-traditional-wedding",
    title: "Nthenya and Mutiso",
    type: "wedding",
    date: "2026-05-16",
    dateLabel: "16 May 2026",
    location: "Machakos County",
    cover: "/images/wedding-10.jpg",
    coverAlt: altFor("/images/wedding-10.jpg"),
    story:
      "A traditional ceremony followed by a white wedding the next morning, photographed across two days.",
    images: imgs([
      "wedding-10.jpg",
      "wedding-05.jpg",
      "wedding-11.jpg",
      "wedding-12.jpg",
      "wedding-06.jpg",
      "wedding-14.jpg",
      "event-03.jpg",
      "event-04.jpg",
    ]),
  },
  {
    slug: "kamau-ngong-engagement",
    title: "Kamau and Achieng",
    type: "engagement",
    date: "2026-03-08",
    dateLabel: "8 March 2026",
    location: "Ngong Hills, Kajiado",
    cover: "/images/engagement-03.jpg",
    coverAlt: altFor("/images/engagement-03.jpg"),
    story:
      "They wanted hills, wind and no posing. We walked for two hours and photographed what happened.",
    images: imgs([
      "engagement-03.jpg",
      "engagement-01.jpg",
      "engagement-05.jpg",
      "engagement-04.jpg",
      "engagement-02.jpg",
      "wedding-07.jpg",
      "wedding-04.jpg",
    ]),
  },
  {
    slug: "njoroge-westlands-portraits",
    title: "Njoroge Studio Portraits",
    type: "portrait",
    date: "2026-02-14",
    dateLabel: "14 February 2026",
    location: "Westlands Studio, Nairobi",
    cover: "/images/portrait-03.jpg",
    coverAlt: altFor("/images/portrait-03.jpg"),
    story:
      "A personal brand session for a musician, shot in the studio and then on the balcony at golden hour.",
    images: imgs([
      "portrait-03.jpg",
      "portrait-01.jpg",
      "portrait-02.jpg",
      "portrait-04.jpg",
      "studio-03.jpg",
      "studio-05.jpg",
      "portrait-05.jpg",
      "studio-01.jpg",
    ]),
  },
  {
    slug: "upper-hill-leadership-portraits",
    title: "Upper Hill Leadership",
    type: "corporate",
    date: "2026-01-30",
    dateLabel: "30 January 2026",
    location: "Upper Hill, Nairobi",
    cover: "/images/corporate-05.jpg",
    coverAlt: altFor("/images/corporate-05.jpg"),
    story:
      "Eleven executives, one lighting setup, and a boardroom wall we turned into a backdrop.",
    images: imgs([
      "corporate-05.jpg",
      "corporate-01.jpg",
      "corporate-02.jpg",
      "corporate-04.jpg",
      "corporate-06.jpg",
      "corporate-03.jpg",
      "studio-02.jpg",
      "studio-04.jpg",
    ]),
  },
  {
    slug: "awa-kilimani-maternity",
    title: "Awa at 34 Weeks",
    type: "maternity",
    date: "2025-12-05",
    dateLabel: "5 December 2025",
    location: "Kilimani, Nairobi",
    cover: "/images/maternity-02.jpg",
    coverAlt: altFor("/images/maternity-02.jpg"),
    story:
      "A slow studio morning with her mother in the room, which is exactly how she wanted to remember it.",
    images: imgs([
      "maternity-02.jpg",
      "maternity-01.jpg",
      "maternity-03.jpg",
      "maternity-04.jpg",
      "studio-03.jpg",
    ]),
  },
  {
    slug: "the-otieno-family-kitisuru",
    title: "The Otieno Family",
    type: "family",
    date: "2025-11-16",
    dateLabel: "16 November 2025",
    location: "Kitisuru, Nairobi",
    cover: "/images/family-03.jpg",
    coverAlt: altFor("/images/family-03.jpg"),
    story:
      "Three generations in one compound, including a grandmother who directed most of the session.",
    images: imgs([
      "family-03.jpg",
      "family-01.jpg",
      "family-02.jpg",
      "family-04.jpg",
      "family-05.jpg",
      "family-06.jpg",
    ]),
  },
  {
    slug: "nairobi-cultural-gala",
    title: "Nairobi Cultural Gala",
    type: "events",
    date: "2025-10-11",
    dateLabel: "11 October 2025",
    location: "Two Rivers, Nairobi",
    cover: "/images/event-02.jpg",
    coverAlt: altFor("/images/event-02.jpg"),
    story:
      "An evening of dance, fashion and speeches, covered by two photographers from doors to close.",
    images: imgs([
      "event-02.jpg",
      "event-01.jpg",
      "event-03.jpg",
      "event-04.jpg",
      "family-06.jpg",
      "portrait-05.jpg",
    ]),
  },
];

export const FEATURED_GALLERY: GalleryImage[] = imgs([
  "wedding-08.jpg",
  "engagement-05.jpg",
  "portrait-03.jpg",
  "wedding-11.jpg",
  "corporate-05.jpg",
  "family-01.jpg",
  "maternity-01.jpg",
  "wedding-03.jpg",
  "event-03.jpg",
  "portrait-01.jpg",
  "wedding-16.jpg",
  "family-04.jpg",
]);

export const INSTAGRAM_FEED: GalleryImage[] = imgs([
  "wedding-01.jpg",
  "portrait-02.jpg",
  "wedding-09.jpg",
  "family-02.jpg",
  "engagement-01.jpg",
  "corporate-01.jpg",
  "wedding-15.jpg",
  "maternity-03.jpg",
  "event-01.jpg",
  "portrait-04.jpg",
]);

export function getGallery(slug: string): Gallery | undefined {
  return GALLERIES.find((g) => g.slug === slug);
}

export function galleriesByType(type: string): Gallery[] {
  if (type === "all") return GALLERIES;
  return GALLERIES.filter((g) => g.type === type);
}
