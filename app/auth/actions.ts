"use server";

import { signIn } from "@/lib/auth";
import { verifyRecaptcha, scoreIsAcceptable } from "@/lib/recaptcha";
import { sendMail } from "@/lib/mail";
import { SITE } from "@/lib/site";

export type AuthActionState = {
  ok: boolean;
  message?: string;
  fallbackRequired?: boolean;
};

export async function googleSignIn(formData: FormData) {
  const redirectTo = (formData.get("redirectTo") as string) || "/";
  await signIn("google", { redirectTo });
}

export async function emailSignIn(
  _previous: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const email = String(formData.get("email") ?? "").trim();
  const token = String(formData.get("recaptchaToken") ?? "") || undefined;
  const mode = String(formData.get("mode") ?? "signin");

  if (!email) {
    return { ok: false, message: "Please enter your email address" };
  }

  const verification = await verifyRecaptcha(token, mode === "signup" ? "signup" : "signin");
  if (!scoreIsAcceptable(verification)) {
    return {
      ok: false,
      fallbackRequired: true,
      message: "We could not verify this request. Please complete the check and try again.",
    };
  }

  await sendMail({
    to: email,
    subject:
      mode === "signup"
        ? `Welcome to ${SITE.name}, confirm your email`
        : `Your ${SITE.name} sign in link`,
    text: [
      `Hello,`,
      "",
      mode === "signup"
        ? `Thanks for creating an account with ${SITE.name}.`
        : `Here is the link you asked for.`,
      "",
      "Continue with Google on this page to finish signing in:",
      `${SITE.siteUrl}/auth/signin`,
      "",
      "If you did not ask for this, you can ignore this message.",
      "",
      `${SITE.name}, ${SITE.city}, ${SITE.country}`,
    ].join("\n"),
    html: `<p style="font-family:Poppins,Arial,sans-serif;color:#838383">Continue with Google on <a href="${SITE.siteUrl}/auth/signin">${SITE.siteUrl}/auth/signin</a> to finish signing in.</p>`,
  });

  return {
    ok: true,
    message: `Check ${email} for your next step. Google sign in is also available below.`,
  };
}
