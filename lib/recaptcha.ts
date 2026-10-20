/**
 * Server side Google reCAPTCHA verification.
 * RECAPTCHA_SECRET_KEY is only ever read here, never in client code.
 */
export type RecaptchaResult = {
  success: boolean;
  score?: number;
  action?: string;
  challengeTs?: string;
  hostname?: string;
  errorCodes?: string[];
  /** true when no secret key is configured (local development) */
  bypassed?: boolean;
};

const VERIFY_ENDPOINT = "https://www.google.com/recaptcha/api/siteverify";

export const RECAPTCHA_SCORE_THRESHOLD = 0.5;

export async function verifyRecaptcha(
  token: string | undefined,
  expectedAction?: string,
): Promise<RecaptchaResult> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  if (!secret) {
    return { success: true, score: 1, action: expectedAction, bypassed: true };
  }

  if (!token) {
    return { success: false, errorCodes: ["missing-input-response"] };
  }

  const body = new URLSearchParams({ secret, response: token });

  try {
    const res = await fetch(VERIFY_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      cache: "no-store",
    });
    const data = (await res.json()) as RecaptchaResult & { "error-codes"?: string[] };

    const result: RecaptchaResult = {
      success: Boolean(data.success),
      score: typeof data.score === "number" ? data.score : undefined,
      action: data.action,
      challengeTs: data.challengeTs,
      hostname: data.hostname,
      errorCodes: data["error-codes"] ?? data.errorCodes,
    };

    if (
      expectedAction &&
      result.action &&
      result.action !== expectedAction
    ) {
      return { success: false, errorCodes: ["action-mismatch"] };
    }

    return result;
  } catch {
    return { success: false, errorCodes: ["verification-request-failed"] };
  }
}

/** A score at or above 0.5 passes, anything lower falls back to reCAPTCHA v2. */
export function scoreIsAcceptable(result: RecaptchaResult): boolean {
  if (result.bypassed) return true;
  if (!result.success) return false;
  return (result.score ?? 0) >= RECAPTCHA_SCORE_THRESHOLD;
}
