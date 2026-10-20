import type { Metadata } from "next";
import Link from "next/link";
import AuthForm from "@/components/AuthForm";
import { WHATSAPP_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create an Esther Studios account to manage bookings, galleries and invoices.",
};

export default function SignUpPage() {
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
          <h1 style={{ fontSize: 28, marginTop: 14 }}>Create an account</h1>
          <p style={{ fontSize: 14, marginTop: 10 }}>
            One account for every session, gallery and invoice at Esther Studios.
          </p>

          <div style={{ marginTop: 30 }}>
            <AuthForm mode="signup" />
          </div>

          <p style={{ fontSize: 14, marginTop: 28, marginBottom: 0 }}>
            Already have an account?{" "}
            <Link href="/auth/signin" style={{ textDecoration: "underline" }}>
              Sign in
            </Link>
          </p>
          <p style={{ fontSize: 13, marginTop: 18, marginBottom: 0 }}>
            Just want to book?{" "}
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
