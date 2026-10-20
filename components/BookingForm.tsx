"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { SESSION_TYPES, type SessionTypeId } from "@/lib/site";
import { packagesForType, formatPrice } from "@/lib/packages";
import { bookingSchema, type BookingFormValues } from "@/lib/validation";
import { useRecaptcha } from "./RecaptchaProvider";

const TIME_SLOTS = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
];

type Props = {
  initialType?: SessionTypeId;
  initialPackage?: string;
};

export default function BookingForm({ initialType = "wedding", initialPackage }: Props) {
  const router = useRouter();
  const { execute, challenge, enabled } = useRecaptcha();
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BookingFormValues>({
    defaultValues: {
      sessionType: initialType,
      packageId: initialPackage ?? "",
      date: "",
      time: "10:00",
      locationMode: "studio",
      locationName: "",
      name: "",
      phone: "",
      email: "",
      requests: "",
    },
    mode: "onBlur",
  });

  const sessionType = watch("sessionType") as SessionTypeId;
  const locationMode = watch("locationMode");
  const packageId = watch("packageId");

  const packages = useMemo(() => packagesForType(sessionType), [sessionType]);
  const selectedPackage = packages.find((pkg) => pkg.id === packageId);

  const onSessionTypeChange = (value: string) => {
    setValue("sessionType", value as SessionTypeId, { shouldValidate: true });
    setValue("packageId", "", { shouldValidate: false });
  };

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);
    setFieldErrors({});

    const parsed = bookingSchema.safeParse(values);
    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors;
      setFieldErrors(
        Object.fromEntries(
          Object.entries(flat).map(([key, messages]) => [key, messages?.[0] ?? "Invalid"]),
        ),
      );
      return;
    }

    setSubmitting(true);

    try {
      let token = enabled ? await execute("booking") : null;

      if (enabled) {
        const verifyResponse = await fetch("/api/recaptcha/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, action: "booking" }),
        });
        const verification = (await verifyResponse.json()) as {
          ok: boolean;
          fallbackRequired?: boolean;
          error?: string;
        };

        if (!verification.ok && verification.fallbackRequired) {
          token = await challenge();
          if (!token) {
            setServerError(
              "We could not verify your request. Please try again in a moment.",
            );
            setSubmitting(false);
            return;
          }
        }
      }

      const response = await fetch("/api/booking/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsed.data, recaptchaToken: token }),
      });

      const payload = (await response.json()) as {
        ok: boolean;
        reference?: string;
        error?: string;
        fields?: Record<string, string>;
      };

      if (!response.ok || !payload.ok || !payload.reference) {
        setServerError(payload.error ?? "We could not save your booking. Please try again.");
        setFieldErrors(payload.fields ?? {});
        setSubmitting(false);
        return;
      }

      router.push(`/booking-confirmation?ref=${encodeURIComponent(payload.reference)}`);
    } catch {
      setServerError("Something went wrong on our side. Please try again.");
      setSubmitting(false);
    }
  });

  const errorFor = (field: string) =>
    fieldErrors[field] ?? (errors[field as keyof BookingFormValues]?.message as string | undefined);

  return (
    <form onSubmit={onSubmit} noValidate>
      <div style={{ display: "grid", gap: 28 }}>
        <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
          <legend style={{ fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 16 }}>
            1. Your session
          </legend>

          <div
            style={{
              display: "grid",
              gap: 18,
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            }}
          >
            <div>
              <label className="es-label" htmlFor="sessionType">
                Session type
              </label>
              <select
                id="sessionType"
                className="es-field"
                {...register("sessionType")}
                onChange={(event) => onSessionTypeChange(event.target.value)}
              >
                {SESSION_TYPES.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
              {errorFor("sessionType") && <p className="es-error">{errorFor("sessionType")}</p>}
            </div>

            <div>
              <label className="es-label" htmlFor="date">
                Preferred date
              </label>
              <input
                id="date"
                type="date"
                className="es-field"
                {...register("date")}
                min={new Date().toISOString().slice(0, 10)}
              />
              {errorFor("date") && <p className="es-error">{errorFor("date")}</p>}
            </div>

            <div>
              <label className="es-label" htmlFor="time">
                Preferred time
              </label>
              <select id="time" className="es-field" {...register("time")}>
                {TIME_SLOTS.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
              {errorFor("time") && <p className="es-error">{errorFor("time")}</p>}
            </div>
          </div>
        </fieldset>

        <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
          <legend style={{ fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 16 }}>
            2. Location
          </legend>

          <div style={{ display: "flex", gap: 18, flexWrap: "wrap", marginBottom: 18 }}>
            {(["studio", "outdoor"] as const).map((mode) => (
              <label
                key={mode}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  fontSize: 14,
                  color: "#1d1d1d",
                  cursor: "pointer",
                }}
              >
                <input
                  type="radio"
                  value={mode}
                  {...register("locationMode")}
                  defaultChecked={mode === "studio"}
                />
                {mode === "studio" ? "Esther Studios studio" : "Outdoor or on location"}
              </label>
            ))}
          </div>

          <div>
            <label className="es-label" htmlFor="locationName">
              {locationMode === "studio"
                ? "Studio notes (optional)"
                : "Location name or area"}
            </label>
            <input
              id="locationName"
              type="text"
              className="es-field"
              placeholder={
                locationMode === "studio"
                  ? "Any access notes for the studio"
                  : "For example, Karura Forest, Karen, Ngong Hills"
              }
              {...register("locationName")}
            />
            {errorFor("locationName") && <p className="es-error">{errorFor("locationName")}</p>}
          </div>
        </fieldset>

        <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
          <legend style={{ fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 16 }}>
            3. Package
          </legend>

          <div
            style={{
              display: "grid",
              gap: 14,
              gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
            }}
          >
            {packages.map((pkg) => {
              const selected = pkg.id === packageId;
              return (
                <motion.label
                  key={pkg.id}
                  whileHover={{ y: -4 }}
                  style={{
                    border: `1px solid ${selected ? "#1d1d1d" : "#e0e0e0"}`,
                    padding: 18,
                    cursor: "pointer",
                    display: "block",
                    backgroundColor: selected ? "#f2f4f8" : "#ffffff",
                  }}
                >
                  <input
                    type="radio"
                    value={pkg.id}
                    {...register("packageId")}
                    style={{ marginRight: 10 }}
                  />
                  <span style={{ fontSize: 15, color: "#1d1d1d" }}>{pkg.name}</span>
                  <span style={{ display: "block", fontSize: 13, marginTop: 8 }}>
                    {formatPrice(pkg.price)}
                  </span>
                </motion.label>
              );
            })}
          </div>
          {errorFor("packageId") && <p className="es-error">{errorFor("packageId")}</p>}
          {selectedPackage && (
            <p style={{ fontSize: 13, marginTop: 14 }}>
              {selectedPackage.delivery}
            </p>
          )}
        </fieldset>

        <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
          <legend style={{ fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 16 }}>
            4. Your details
          </legend>

          <div
            style={{
              display: "grid",
              gap: 18,
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            }}
          >
            <div>
              <label className="es-label" htmlFor="name">
                Full name
              </label>
              <input id="name" type="text" className="es-field" {...register("name")} autoComplete="name" />
              {errorFor("name") && <p className="es-error">{errorFor("name")}</p>}
            </div>

            <div>
              <label className="es-label" htmlFor="phone">
                Phone or WhatsApp number
              </label>
              <input
                id="phone"
                type="tel"
                className="es-field"
                placeholder="+254 7XX XXX XXX"
                {...register("phone")}
                autoComplete="tel"
              />
              {errorFor("phone") && <p className="es-error">{errorFor("phone")}</p>}
            </div>

            <div>
              <label className="es-label" htmlFor="email">
                Email
              </label>
              <input id="email" type="email" className="es-field" {...register("email")} autoComplete="email" />
              {errorFor("email") && <p className="es-error">{errorFor("email")}</p>}
            </div>
          </div>

          <div style={{ marginTop: 18 }}>
            <label className="es-label" htmlFor="requests">
              Special requests
            </label>
            <textarea
              id="requests"
              className="es-field"
              placeholder="Anything we should know, from outfit changes to accessibility needs."
              {...register("requests")}
            />
            {errorFor("requests") && <p className="es-error">{errorFor("requests")}</p>}
          </div>
        </fieldset>

        {serverError && (
          <p
            role="alert"
            style={{
              color: "#b3261e",
              backgroundColor: "#fdf3f2",
              border: "1px solid #f3d6d3",
              padding: "12px 16px",
              fontSize: 14,
              margin: 0,
            }}
          >
            {serverError}
          </p>
        )}

        <div>
          <button type="submit" className="studio-btn" disabled={submitting}>
            {submitting ? (
              <>
                <Loader2 size={16} className="es-spin" aria-hidden="true" /> Sending
              </>
            ) : (
              "Confirm Booking Request"
            )}
          </button>
          <p style={{ fontSize: 12, marginTop: 14 }}>
            This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of
            Service apply. We will confirm your slot on WhatsApp within one working day.
          </p>
        </div>
      </div>

      <style>{`
        .es-spin { animation: es-rotate 900ms linear infinite; }
        @keyframes es-rotate { to { transform: rotate(360deg); } }
      `}</style>
    </form>
  );
}
