import { z } from "zod";
import { SESSION_TYPE_IDS } from "./site";
import { PACKAGES } from "./packages";

const PACKAGE_IDS = PACKAGES.map((pkg) => pkg.id);

export const bookingSchema = z.object({
  sessionType: z.enum(SESSION_TYPE_IDS as [string, ...string[]]),
  packageId: z
    .string()
    .min(1, "Please choose a package")
    .refine((id) => PACKAGE_IDS.includes(id), "Please choose a valid package"),
  date: z
    .string()
    .min(1, "Please choose a preferred date")
    .refine((value) => !Number.isNaN(Date.parse(value)), "Please choose a valid date")
    .refine(
      (value) => {
        const chosen = new Date(`${value}T00:00:00`);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return chosen.getTime() >= today.getTime();
      },
      "Please choose a date that has not passed",
    ),
  time: z.string().regex(/^\d{2}:\d{2}$/, "Please choose a preferred time"),
  locationMode: z.enum(["studio", "outdoor"]),
  locationName: z.string().max(160, "Please shorten this").optional().or(z.literal("")),
  name: z.string().min(2, "Please enter your name").max(120, "Please shorten this"),
  phone: z
    .string()
    .min(7, "Please enter a reachable phone number")
    .max(32, "Please enter a valid phone number")
    .regex(/^[+0-9\s()-]+$/, "Please use digits, spaces and the plus sign only"),
  email: z.string().email("Please enter a valid email address"),
  requests: z.string().max(1200, "Please shorten this").optional().or(z.literal("")),
});

export type BookingFormValues = z.input<typeof bookingSchema>;

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name").max(120, "Please shorten this"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .max(32, "Please enter a valid phone number")
    .regex(/^[+0-9\s()-]*$/, "Please use digits, spaces and the plus sign only")
    .optional()
    .or(z.literal("")),
  subject: z.string().min(2, "Please add a subject").max(160, "Please shorten this"),
  message: z
    .string()
    .min(10, "Please tell us a little more")
    .max(2000, "Please shorten this"),
});

export type ContactFormValues = z.input<typeof contactSchema>;

export const credentialsSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Use at least 8 characters"),
  name: z.string().min(2, "Please enter your name").optional().or(z.literal("")),
});
