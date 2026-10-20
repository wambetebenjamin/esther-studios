"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { contactSchema, type ContactFormValues } from "@/lib/validation";
import { useRecaptcha } from "./RecaptchaProvider";

export default function ContactForm() {
  const router = useRouter();
  const { execute, challenge, enabled } = useRecaptcha();
  const [values, setValues] = useState<ContactFormValues>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  const update = (key: keyof ContactFormValues) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setValues((prev) => ({ ...prev, [key]: event.target.value }));

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setServerError(null);
    setErrors({});

    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors;
      setErrors(
        Object.fromEntries(
          Object.entries(flat).map(([key, messages]) => [key, messages?.[0] ?? "Invalid"]),
        ),
      );
      return;
    }

    setBusy(true);

    try {
      let token = enabled ? await execute("contact") : null;

      if (enabled) {
        const verifyResponse = await fetch("/api/recaptcha/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, action: "contact" }),
        });
        const verification = (await verifyResponse.json()) as {
          ok: boolean;
          fallbackRequired?: boolean;
        };

        if (!verification.ok && verification.fallbackRequired) {
          token = await challenge();
          if (!token) {
            setServerError("We could not verify your message. Please try again.");
            setBusy(false);
            return;
          }
        }
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsed.data, recaptchaToken: token }),
      });

      const payload = (await response.json()) as {
        ok: boolean;
        error?: string;
        fields?: Record<string, string>;
      };

      if (!response.ok || !payload.ok) {
        setServerError(payload.error ?? "We could not send your message. Please try again.");
        setErrors(payload.fields ?? {});
        setBusy(false);
        return;
      }

      setSent(true);
      setValues({ name: "", email: "", phone: "", subject: "", message: "" });
      router.refresh();
    } catch {
      setServerError("Something went wrong on our side. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  if (sent) {
    return (
      <div
        role="status"
        style={{
          border: "1px solid #1d1d1d",
          padding: 28,
          backgroundColor: "#ffffff",
        }}
      >
        <h2 style={{ fontSize: 20 }}>Thank you, your message is with us</h2>
        <p style={{ marginTop: 10, marginBottom: 18, fontSize: 14 }}>
          We reply to every enquiry within one working day. If it is urgent, WhatsApp is the
          fastest way to reach us.
        </p>
        <button
          type="button"
          className="studio-btn studio-btn-2"
          style={{ height: 46, minWidth: 0, padding: "0 22px", fontSize: 13 }}
          onClick={() => setSent(false)}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate>
      <div style={{ display: "grid", gap: 18 }}>
        <div
          style={{
            display: "grid",
            gap: 18,
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          }}
        >
          <div>
            <label className="es-label" htmlFor="contact-name">
              Your name
            </label>
            <input
              id="contact-name"
              className="es-field"
              value={values.name}
              onChange={update("name")}
              autoComplete="name"
            />
            {errors.name && <p className="es-error">{errors.name}</p>}
          </div>

          <div>
            <label className="es-label" htmlFor="contact-email">
              Email
            </label>
            <input
              id="contact-email"
              type="email"
              className="es-field"
              value={values.email}
              onChange={update("email")}
              autoComplete="email"
            />
            {errors.email && <p className="es-error">{errors.email}</p>}
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gap: 18,
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          }}
        >
          <div>
            <label className="es-label" htmlFor="contact-phone">
              Phone or WhatsApp (optional)
            </label>
            <input
              id="contact-phone"
              className="es-field"
              value={values.phone}
              onChange={update("phone")}
              autoComplete="tel"
            />
            {errors.phone && <p className="es-error">{errors.phone}</p>}
          </div>

          <div>
            <label className="es-label" htmlFor="contact-subject">
              Subject
            </label>
            <input
              id="contact-subject"
              className="es-field"
              value={values.subject}
              onChange={update("subject")}
            />
            {errors.subject && <p className="es-error">{errors.subject}</p>}
          </div>
        </div>

        <div>
          <label className="es-label" htmlFor="contact-message">
            Message
          </label>
          <textarea
            id="contact-message"
            className="es-field"
            value={values.message}
            onChange={update("message")}
          />
          {errors.message && <p className="es-error">{errors.message}</p>}
        </div>

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
          <button type="submit" className="studio-btn" disabled={busy}>
            {busy ? (
              <>
                <Loader2 size={16} className="es-spin" aria-hidden="true" /> Sending
              </>
            ) : (
              "Send Message"
            )}
          </button>
          <p style={{ fontSize: 12, marginTop: 14 }}>
            This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of
            Service apply.
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
