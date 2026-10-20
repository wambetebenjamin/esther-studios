export type SessionTypeId =
  | "wedding"
  | "engagement"
  | "portrait"
  | "corporate"
  | "maternity"
  | "family"
  | "events";

export type SessionType = {
  id: SessionTypeId;
  name: string;
  blurb: string;
  image: string;
  alt: string;
};

export const SITE = {
  name: "Esther Studios",
  tagline: "Every moment. Beautifully kept.",
  description:
    "Esther Studios is a wedding and portrait photography studio in Nairobi, Kenya. Weddings, engagements, portraits, headshots, maternity, family and event photography, delivered with care.",
  business: "Wedding and portrait photography studio",
  city: "Nairobi",
  country: "Kenya",
  photographer: "Esther Wanjiku",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "254112272061",
  whatsappMessage:
    "Hello Esther Studios, I would like to book a photography session or ask about packages.",
  consentKey: "esther_studios_consent",
  phone: "+254 112 272 061",
  phoneHref: "tel:+254112272061",
  email: "hello@estherstudios.co.ke",
  address: [
    "Esther Studios",
    "Chania Avenue, Kilimani",
    "Nairobi, Kenya",
  ],
  hours: "Monday to Saturday, 9:00 to 18:00 EAT",
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "Facebook", href: "https://www.facebook.com/" },
    { label: "Pinterest", href: "https://www.pinterest.com/" },
    { label: "Behance", href: "https://www.behance.net/" },
  ],
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.estherstudios.co.ke",
} as const;

export const WHATSAPP_MESSAGE_ENCODED = encodeURIComponent(
  SITE.whatsappMessage,
);

export const WHATSAPP_URL = `https://wa.me/${SITE.whatsappNumber}?text=${WHATSAPP_MESSAGE_ENCODED}`;

export const PREFILLED_WHATSAPP_URL =
  "https://wa.me/254112272061?text=Hello%20Esther%20Studios%2C%20I%20would%20like%20to%20book%20a%20photography%20session%20or%20ask%20about%20packages.";

export const SESSION_TYPES: SessionType[] = [
  {
    id: "wedding",
    name: "Wedding",
    blurb:
      "Full day coverage of your ceremony, portraits and reception, photographed quietly and honestly.",
    image: "/images/wedding-08.jpg",
    alt: "African wedding couple celebrating in Rungiri, Kenya",
  },
  {
    id: "engagement",
    name: "Engagement",
    blurb:
      "An unhurried pre wedding session in a place that means something to the two of you.",
    image: "/images/engagement-05.jpg",
    alt: "African couple holding hands outdoors in traditional clothing",
  },
  {
    id: "portrait",
    name: "Portrait",
    blurb:
      "Studio or location portraits with direction, natural light and room for your personality.",
    image: "/images/portrait-03.jpg",
    alt: "East African woman in traditional attire photographed in natural light",
  },
  {
    id: "corporate",
    name: "Corporate Headshots",
    blurb:
      "Clean, consistent team headshots shot on site, delivered ready for LinkedIn and press.",
    image: "/images/corporate-05.jpg",
    alt: "African man in a dark suit photographed in a studio",
  },
  {
    id: "maternity",
    name: "Maternity",
    blurb:
      "Soft, considered maternity portraits in the studio or outdoors between 28 and 36 weeks.",
    image: "/images/maternity-01.jpg",
    alt: "Pregnant woman in colourful traditional clothing photographed indoors",
  },
  {
    id: "family",
    name: "Family",
    blurb:
      "Generational portraits at home or on location, with space for the children to be children.",
    image: "/images/family-01.jpg",
    alt: "African family portrait in traditional clothing",
  },
  {
    id: "events",
    name: "Events",
    blurb:
      "Conferences, cultural celebrations and private parties documented as they actually happened.",
    image: "/images/event-02.jpg",
    alt: "Outdoor African cultural dance celebration",
  },
];

export const SESSION_TYPE_IDS = SESSION_TYPES.map((t) => t.id);

export function isSessionTypeId(value: string): value is SessionTypeId {
  return SESSION_TYPE_IDS.includes(value as SessionTypeId);
}

export function sessionTypeName(id: SessionTypeId): string {
  return SESSION_TYPES.find((t) => t.id === id)?.name ?? "Session";
}

/** Kenya Data Protection Act 2019 contacts used across the legal pages. */
export const DPO = {
  officer: "Esther Wanjiku, Data Protection Contact",
  email: "privacy@estherstudios.co.ke",
  regulator: "Office of the Data Protection Commissioner, Kenya",
};
