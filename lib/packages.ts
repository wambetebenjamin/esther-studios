import type { SessionTypeId } from "./site";

export type Package = {
  id: string;
  type: SessionTypeId;
  name: string;
  price: number;
  priceNote: string;
  summary: string;
  includes: string[];
  delivery: string;
  popular?: boolean;
};

const KES = "KES";

export const PACKAGES: Package[] = [
  // ---------------- WEDDING ----------------
  {
    id: "wedding-keep",
    type: "wedding",
    name: "The Keep",
    price: 85000,
    priceNote: `${KES} 85,000`,
    summary: "Ceremony and portrait coverage for intimate weddings.",
    includes: [
      "6 hours of coverage",
      "One photographer",
      "200 plus edited images",
      "Online gallery for 12 months",
      "Private pre wedding consultation",
    ],
    delivery: "Edited gallery delivered within 21 days",
  },
  {
    id: "wedding-archive",
    type: "wedding",
    name: "The Archive",
    price: 165000,
    priceNote: `${KES} 165,000`,
    summary: "Full day storytelling from preparation to the last dance.",
    includes: [
      "12 hours of coverage",
      "Two photographers",
      "450 plus edited images",
      "Engagement session included",
      "Online gallery for 24 months",
      "30 page fine art album",
    ],
    delivery: "Edited gallery delivered within 14 days, album within 6 weeks",
    popular: true,
  },
  {
    id: "wedding-heirloom",
    type: "wedding",
    name: "The Heirloom",
    price: 320000,
    priceNote: `${KES} 320,000`,
    summary: "Multi day coverage for weddings that span a whole weekend.",
    includes: [
      "Three days of coverage",
      "Two photographers and one assistant",
      "900 plus edited images",
      "Engagement and rehearsal coverage",
      "50 page fine art album and two parent albums",
      "Framed 60 by 40 cm print",
    ],
    delivery: "Previews in 72 hours, full gallery within 21 days",
  },

  // ---------------- ENGAGEMENT ----------------
  {
    id: "engagement-stroll",
    type: "engagement",
    name: "The Stroll",
    price: 18000,
    priceNote: `${KES} 18,000`,
    summary: "A short, relaxed session in one location.",
    includes: [
      "90 minutes",
      "One location in Nairobi",
      "40 edited images",
      "Online gallery for 6 months",
    ],
    delivery: "Edited gallery within 10 days",
  },
  {
    id: "engagement-golden",
    type: "engagement",
    name: "The Golden Hour",
    price: 32000,
    priceNote: `${KES} 32,000`,
    summary: "Two locations, two outfits, and the best light of the day.",
    includes: [
      "3 hours",
      "Two locations",
      "80 edited images",
      "Outfit change and styling guidance",
      "Online gallery for 12 months",
    ],
    delivery: "Edited gallery within 10 days",
    popular: true,
  },
  {
    id: "engagement-journey",
    type: "engagement",
    name: "The Journey",
    price: 58000,
    priceNote: `${KES} 58,000`,
    summary: "A full story session, including travel outside Nairobi.",
    includes: [
      "6 hours",
      "Up to three locations, travel included within 100 km",
      "160 edited images",
      "Short highlight slideshow",
      "20 page keepsake album",
    ],
    delivery: "Edited gallery within 14 days",
  },

  // ---------------- PORTRAIT ----------------
  {
    id: "portrait-sitting",
    type: "portrait",
    name: "The Sitting",
    price: 12000,
    priceNote: `${KES} 12,000`,
    summary: "A focused studio sitting with one look.",
    includes: [
      "60 minutes in the studio",
      "One backdrop and one lighting setup",
      "15 edited images",
      "Web and print ready files",
    ],
    delivery: "Edited gallery within 7 days",
  },
  {
    id: "portrait-series",
    type: "portrait",
    name: "The Series",
    price: 24000,
    priceNote: `${KES} 24,000`,
    summary: "Three looks, studio and outdoor, with styling support.",
    includes: [
      "3 hours",
      "Three looks",
      "Studio and outdoor light",
      "45 edited images",
      "Retouching on 10 selections",
    ],
    delivery: "Edited gallery within 10 days",
    popular: true,
  },
  {
    id: "portrait-folio",
    type: "portrait",
    name: "The Folio",
    price: 46000,
    priceNote: `${KES} 46,000`,
    summary: "For portfolios, press features and personal brands.",
    includes: [
      "Half day on location",
      "Five looks with a stylist",
      "90 edited images",
      "Retouching on 25 selections",
      "Print ready portfolio PDF",
    ],
    delivery: "Edited gallery within 14 days",
  },

  // ---------------- CORPORATE ----------------
  {
    id: "corporate-desk",
    type: "corporate",
    name: "Desk Side",
    price: 3500,
    priceNote: `${KES} 3,500 per person`,
    summary: "Consistent headshots taken at your office.",
    includes: [
      "10 minutes per person",
      "One lighting setup, neutral backdrop",
      "2 retouched images per person",
      "Minimum booking of 5 people",
    ],
    delivery: "Edited files within 5 working days",
  },
  {
    id: "corporate-team",
    type: "corporate",
    name: "Team Set",
    price: 55000,
    priceNote: `${KES} 55,000 per day`,
    summary: "A full day of team headshots plus workplace storytelling.",
    includes: [
      "Up to 8 hours on site",
      "Up to 30 people",
      "3 retouched images per person",
      "20 workplace environment images",
      "Brand consistent colour grading",
    ],
    delivery: "Edited files within 5 working days",
    popular: true,
  },
  {
    id: "corporate-leadership",
    type: "corporate",
    name: "Leadership",
    price: 95000,
    priceNote: `${KES} 95,000 per day`,
    summary: "Executive and board portraits with environmental framing.",
    includes: [
      "Up to 8 hours on site",
      "Up to 12 executives",
      "5 retouched images per person",
      "Environmental portraits in your boardroom",
      "Usage licence for press and annual reports",
    ],
    delivery: "Edited files within 4 working days",
  },

  // ---------------- MATERNITY ----------------
  {
    id: "maternity-bloom",
    type: "maternity",
    name: "The Bloom",
    price: 16000,
    priceNote: `${KES} 16,000`,
    summary: "A gentle studio session at your own pace.",
    includes: [
      "90 minutes",
      "Studio session",
      "25 edited images",
      "Partner and sibling included",
    ],
    delivery: "Edited gallery within 10 days",
  },
  {
    id: "maternity-glow",
    type: "maternity",
    name: "The Glow",
    price: 30000,
    priceNote: `${KES} 30,000`,
    summary: "Studio and outdoor, with gowns from the studio wardrobe.",
    includes: [
      "3 hours",
      "Two looks, studio wardrobe access",
      "60 edited images",
      "Partner and children included",
      "10 fine art prints",
    ],
    delivery: "Edited gallery within 12 days",
    popular: true,
  },
  {
    id: "maternity-nesting",
    type: "maternity",
    name: "The Nesting",
    price: 52000,
    priceNote: `${KES} 52,000`,
    summary: "Maternity now, newborn later, photographed as one story.",
    includes: [
      "Maternity session of 3 hours",
      "Newborn session of 3 hours at home",
      "120 edited images across both sessions",
      "Studio wardrobe access",
      "25 page album",
    ],
    delivery: "Each gallery within 14 days of its session",
  },

  // ---------------- FAMILY ----------------
  {
    id: "family-sunday",
    type: "family",
    name: "The Sunday",
    price: 22000,
    priceNote: `${KES} 22,000`,
    summary: "An easy session at home or in a nearby park.",
    includes: [
      "2 hours",
      "Up to 6 people",
      "50 edited images",
      "Online gallery for 12 months",
    ],
    delivery: "Edited gallery within 10 days",
  },
  {
    id: "family-household",
    type: "family",
    name: "The Household",
    price: 42000,
    priceNote: `${KES} 42,000`,
    summary: "Extended family, including grandparents and cousins.",
    includes: [
      "4 hours",
      "Up to 15 people",
      "110 edited images",
      "Individual portraits of each household",
      "25 page album",
    ],
    delivery: "Edited gallery within 14 days",
    popular: true,
  },
  {
    id: "family-generations",
    type: "family",
    name: "The Generations",
    price: 88000,
    priceNote: `${KES} 88,000`,
    summary: "A documented family gathering over a full day.",
    includes: [
      "8 hours",
      "Unlimited household members",
      "250 edited images",
      "Oral history audio clips with portraits",
      "40 page album and two parent copies",
    ],
    delivery: "Edited gallery within 21 days",
  },

  // ---------------- EVENTS ----------------
  {
    id: "events-short",
    type: "events",
    name: "The Short Report",
    price: 28000,
    priceNote: `${KES} 28,000`,
    summary: "Half day documentary coverage of your event.",
    includes: [
      "4 hours",
      "One photographer",
      "120 edited images",
      "Online gallery for 6 months",
    ],
    delivery: "Edited gallery within 7 days",
  },
  {
    id: "events-full",
    type: "events",
    name: "The Full Report",
    price: 62000,
    priceNote: `${KES} 62,000`,
    summary: "Full day coverage with same day selects.",
    includes: [
      "10 hours",
      "Two photographers",
      "350 edited images",
      "20 same day selects for social media",
      "Online gallery for 12 months",
    ],
    delivery: "Same day selects, full gallery within 7 days",
    popular: true,
  },
  {
    id: "events-festival",
    type: "events",
    name: "The Festival",
    price: 140000,
    priceNote: `${KES} 140,000`,
    summary: "Multi day conferences, festivals and cultural celebrations.",
    includes: [
      "Up to three days",
      "Two photographers and one assistant",
      "900 plus edited images",
      "Daily highlight sets",
      "Licensed usage for sponsors and press",
    ],
    delivery: "Daily highlights each evening, full gallery within 14 days",
  },
];

export function packagesForType(type: SessionTypeId): Package[] {
  return PACKAGES.filter((p) => p.type === type);
}

export function findPackage(id: string): Package | undefined {
  return PACKAGES.find((p) => p.id === id);
}

export function formatPrice(price: number): string {
  return `${KES} ${price.toLocaleString("en-KE")}`;
}
