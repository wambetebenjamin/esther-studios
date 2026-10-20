import { randomBytes } from "node:crypto";
import { storeGet, storeSet } from "./store";
import { SITE, type SessionTypeId } from "./site";

export type BookingStatus =
  | "requested"
  | "confirmed"
  | "completed"
  | "cancelled";

export type Booking = {
  reference: string;
  createdAt: string;
  status: BookingStatus;
  sessionType: SessionTypeId;
  sessionTypeName: string;
  packageId: string;
  packageName: string;
  price: number;
  priceLabel: string;
  date: string;
  time: string;
  locationMode: "studio" | "outdoor";
  locationName: string;
  name: string;
  phone: string;
  email: string;
  requests: string;
  recaptchaScore: number | null;
};

const BOOKING_TTL = 60 * 60 * 24 * 365;

function key(reference: string) {
  return `booking:${reference}`;
}

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function randomBlock(length: number) {
  const bytes = randomBytes(length);
  let out = "";
  for (let i = 0; i < length; i += 1) {
    out += ALPHABET[bytes[i] % ALPHABET.length];
  }
  return out;
}

export function generateReference(date = new Date()): string {
  const stamp = [
    String(date.getUTCFullYear()).slice(2),
    String(date.getUTCMonth() + 1).padStart(2, "0"),
    String(date.getUTCDate()).padStart(2, "0"),
  ].join("");
  return `ES-${stamp}-${randomBlock(4)}`;
}

export async function saveBooking(booking: Booking): Promise<void> {
  await storeSet(key(booking.reference), booking, BOOKING_TTL);
}

export async function getBooking(reference: string): Promise<Booking | null> {
  if (!reference) return null;
  return storeGet<Booking>(key(reference.toUpperCase()));
}

export function bookingWhatsappUrl(booking: Booking): string {
  const message = [
    `Hello Esther Studios, I would like to coordinate the details of my booking.`,
    `Reference: ${booking.reference}`,
    `Session: ${booking.sessionTypeName}`,
    `Package: ${booking.packageName}`,
    `Date: ${booking.date} at ${booking.time}`,
    `Location: ${booking.locationMode === "studio" ? "Studio" : "Outdoor"}${
      booking.locationName ? `, ${booking.locationName}` : ""
    }`,
    `Name: ${booking.name}`,
  ].join("\n");

  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Google Calendar template link. Times are treated as Africa/Nairobi (UTC+3).
 */
export function googleCalendarUrl(booking: Booking): string {
  const start = toCalendarDate(booking.date, booking.time);
  const end = toCalendarDate(booking.date, booking.time, 2);

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${booking.sessionTypeName} session with ${SITE.name}`,
    dates: `${start}/${end}`,
    details: `Booking reference ${booking.reference}. Package: ${booking.packageName}. Location: ${
      booking.locationMode === "studio" ? `${SITE.name} studio` : booking.locationName || "Outdoor location"
    }.`,
    location:
      booking.locationMode === "studio"
        ? SITE.address.join(", ")
        : booking.locationName || `${SITE.city}, ${SITE.country}`,
    ctz: "Africa/Nairobi",
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function toCalendarDate(date: string, time: string, addHours = 0): string {
  const [year, month, day] = date.split("-").map((n) => Number(n));
  const match = /^(\d{1,2}):(\d{2})$/.exec(time.trim());
  let hours = 10;
  let minutes = 0;
  if (match) {
    hours = Number(match[1]);
    minutes = Number(match[2]);
  }

  const utc = Date.UTC(year, (month || 1) - 1, day || 1, hours + addHours, minutes);
  // Africa/Nairobi is UTC+3 with no daylight saving.
  const local = new Date(utc - 3 * 60 * 60 * 1000);

  const pad = (n: number) => String(n).padStart(2, "0");
  return [
    local.getUTCFullYear(),
    pad(local.getUTCMonth() + 1),
    pad(local.getUTCDate()),
    "T",
    pad(local.getUTCHours()),
    pad(local.getUTCMinutes()),
    "00",
  ].join("");
}
