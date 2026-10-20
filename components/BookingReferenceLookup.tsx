"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function BookingReferenceLookup() {
  const router = useRouter();
  const [reference, setReference] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setBusy(true);

    const ref = reference.trim().toUpperCase();
    const params = new URLSearchParams({ ref });
    if (email.trim()) params.set("email", email.trim());

    const response = await fetch(`/api/booking/${encodeURIComponent(ref)}?${params.toString()}`);
    const payload = (await response.json()) as { ok: boolean; error?: string };

    if (!payload.ok) {
      setError(payload.error ?? "We could not find that booking.");
      setBusy(false);
      return;
    }

    const query = email.trim()
      ? `?ref=${encodeURIComponent(ref)}&email=${encodeURIComponent(email.trim())}`
      : `?ref=${encodeURIComponent(ref)}`;

    router.push(`/booking-confirmation${query}`);
  };

  return (
    <form
      onSubmit={submit}
      style={{ display: "grid", gap: 16, textAlign: "left", maxWidth: 420, margin: "0 auto" }}
    >
      <div>
        <label className="es-label" htmlFor="lookup-ref">
          Booking reference
        </label>
        <input
          id="lookup-ref"
          className="es-field"
          placeholder="ES-260620-A7K9"
          value={reference}
          onChange={(event) => setReference(event.target.value)}
          required
        />
      </div>

      <div>
        <label className="es-label" htmlFor="lookup-email">
          Email used to book (optional)
        </label>
        <input
          id="lookup-email"
          type="email"
          className="es-field"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      {error && (
        <p role="alert" className="es-error" style={{ marginTop: 0 }}>
          {error}
        </p>
      )}

      <button type="submit" className="studio-btn" disabled={busy}>
        {busy ? (
          <>
            <Loader2 size={16} className="es-spin" aria-hidden="true" /> Looking
          </>
        ) : (
          "Find My Booking"
        )}
      </button>

      <style>{`
        .es-spin { animation: es-rotate 900ms linear infinite; }
        @keyframes es-rotate { to { transform: rotate(360deg); } }
      `}</style>
    </form>
  );
}
