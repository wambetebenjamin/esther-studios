"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { emailSignIn, googleSignIn, type AuthActionState } from "@/app/auth/actions";
import { useRecaptcha } from "./RecaptchaProvider";

const INITIAL: AuthActionState = { ok: false };

function GoogleButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="studio-btn studio-btn-2"
      disabled={pending}
      style={{ width: "100%", minWidth: 0 }}
    >
      {pending ? (
        <>
          <Loader2 size={16} className="es-spin" aria-hidden="true" /> Redirecting
        </>
      ) : (
        <>
          <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="#4285F4"
              d="M23.5 12.27c0-.82-.07-1.6-.2-2.36H12v4.46h6.47a5.54 5.54 0 0 1-2.4 3.63v3.02h3.88c2.27-2.09 3.55-5.17 3.55-8.75Z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.96-1.08 7.95-2.91l-3.88-3.02c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.72-4.96H1.29v3.13A11.99 11.99 0 0 0 12 24Z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.26a7.2 7.2 0 0 1 0-4.52V6.61H1.29a12 12 0 0 0 0 10.78l3.99-3.13Z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0A11.99 11.99 0 0 0 1.29 6.61l3.99 3.13C6.22 6.86 8.87 4.75 12 4.75Z"
            />
          </svg>
          {label}
        </>
      )}
    </button>
  );
}

export default function AuthForm({ mode }: { mode: "signin" | "signup" }) {
  const [state, formAction] = useActionState(emailSignIn, INITIAL);
  const { execute, challenge, enabled } = useRecaptcha();
  const tokenRef = useRef<HTMLInputElement | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;
    (async () => {
      const token = await execute(mode === "signup" ? "signup" : "signin");
      if (!cancelled && tokenRef.current) tokenRef.current.value = token ?? "";
    })();

    return () => {
      cancelled = true;
    };
  }, [enabled, execute, mode, state]);

  const action = mode === "signup" ? "signup" : "signin";

  const submitWithFallback = async (formData: FormData) => {
    setLocalError(null);

    if (enabled) {
      const token = String(formData.get("recaptchaToken") ?? "");
      const response = await fetch("/api/recaptcha/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, action }),
      });
      const verification = (await response.json()) as {
        ok: boolean;
        fallbackRequired?: boolean;
      };

      if (!verification.ok && verification.fallbackRequired) {
        const v2Token = await challenge();
        if (!v2Token) {
          setLocalError("We could not verify this request. Please try again.");
          return;
        }
        formData.set("recaptchaToken", v2Token);
      }
    }

    formAction(formData);
  };

  return (
    <div style={{ display: "grid", gap: 22 }}>
      <form action={googleSignIn}>
        <input type="hidden" name="redirectTo" value="/" />
        <GoogleButton label={mode === "signup" ? "Sign up with Google" : "Sign in with Google"} />
      </form>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          color: "#aeaeae",
          fontSize: 12,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
        }}
      >
        <span style={{ flex: 1, height: 1, backgroundColor: "#e0e0e0" }} />
        Or use email
        <span style={{ flex: 1, height: 1, backgroundColor: "#e0e0e0" }} />
      </div>

      <form action={submitWithFallback} style={{ display: "grid", gap: 16 }}>
        <input type="hidden" name="mode" value={mode} />
        <input type="hidden" name="recaptchaToken" ref={tokenRef} />

        {mode === "signup" && (
          <div>
            <label className="es-label" htmlFor="auth-name">
              Full name
            </label>
            <input id="auth-name" name="name" className="es-field" autoComplete="name" />
          </div>
        )}

        <div>
          <label className="es-label" htmlFor="auth-email">
            Email
          </label>
          <input
            id="auth-email"
            name="email"
            type="email"
            className="es-field"
            autoComplete="email"
            required
          />
        </div>

        <div>
          <label className="es-label" htmlFor="auth-password">
            Password
          </label>
          <input
            id="auth-password"
            name="password"
            type="password"
            className="es-field"
            autoComplete={mode === "signup" ? "new-password" : "current-password"}
            minLength={8}
            required
          />
          <p style={{ fontSize: 12, marginTop: 8 }}>
            {mode === "signup"
              ? "Use at least 8 characters. Your password is never stored in plain text."
              : "Forgot your password? Continue with Google and we will link the accounts."}
          </p>
        </div>

        {(localError || (!state.ok && state.message)) && (
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
            {localError ?? state.message}
          </p>
        )}

        {state.ok && state.message && (
          <p
            role="status"
            style={{
              color: "#1d1d1d",
              backgroundColor: "#f2f4f8",
              border: "1px solid #e0e0e0",
              padding: "12px 16px",
              fontSize: 14,
              margin: 0,
            }}
          >
            {state.message}
          </p>
        )}

        <SubmitButton
          label={mode === "signup" ? "Create Account" : "Sign In"}
          pendingLabel={mode === "signup" ? "Creating" : "Signing in"}
        />

        <p style={{ fontSize: 12 }}>
          This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of
          Service apply.
        </p>
      </form>

      <style>{`
        .es-spin { animation: es-rotate 900ms linear infinite; }
        @keyframes es-rotate { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

function SubmitButton({ label, pendingLabel }: { label: string; pendingLabel: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="studio-btn" disabled={pending} style={{ width: "100%", minWidth: 0 }}>
      {pending ? (
        <>
          <Loader2 size={16} className="es-spin" aria-hidden="true" /> {pendingLabel}
        </>
      ) : (
        label
      )}
    </button>
  );
}
