import { NextResponse } from "next/server";
import { verifyRecaptcha, scoreIsAcceptable } from "@/lib/recaptcha";

export async function POST(request: Request) {
  let body: { token?: string; action?: string } = {};

  try {
    body = (await request.json()) as { token?: string; action?: string };
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body" },
      { status: 400 },
    );
  }

  const result = await verifyRecaptcha(body.token, body.action ?? "submit");
  const acceptable = scoreIsAcceptable(result);

  return NextResponse.json(
    {
      ok: acceptable,
      score: result.score ?? null,
      action: result.action ?? null,
      hostname: result.hostname ?? null,
      bypassed: Boolean(result.bypassed),
      /** Client should fall back to reCAPTCHA v2 when this is true. */
      fallbackRequired: !acceptable,
      error: acceptable ? undefined : (result.errorCodes?.join(", ") ?? "verification-failed"),
    },
    { status: acceptable ? 200 : 200 },
  );
}
