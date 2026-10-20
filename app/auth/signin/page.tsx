import type { Metadata } from "next";
import Link from "next/link";
import AuthForm from "@/components/AuthForm";
import { WHATSAPP_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Esther Studios account to manage bookings and galleries.",
};

export default function SignInPage() {
  return (
    <section style={{ paddingTop: 72, paddingBottom: 96 }}>
      <div className="es-container">
        <div
          style={{
            maxWidth: 460,
            margin: "0 auto",
            backgroundColor: "#ffffff",
            border: "1px solid #e0e0e0",
            padding: "40px 32px",
          }}
        >
          <span className="es-eyebrow">Account</span>
          <h1 style={{ fontSize: 28, marginTop: 14 }}>Sign in</h1>
          <p style={{ fontSize: 14, marginTop: 10 }}>
            Sign in to keep your bookings, galleries and invoices in one place.
          </p>

          <div style={{ marginTop: 30 }}>
            <AuthForm mode="signin" />
          </div>

          <p style={{ fontSize: 14, marginTop: 28, marginBottom: 0 }}>
            New here?{" "}
            <Link href="/auth/signup" style={{ textDecoration: "underline" }}>
              Create an account
            </Link>
          </p>
          <p style={{ fontSize: 13, marginTop: 18, marginBottom: 0 }}>
            Booking a session instead?{" "}
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline" }}>
              Message us on WhatsApp
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
