import { NextResponse } from "next/server";
import { isFormKind, parseForm } from "@/lib/forms/schemas";
import { isEmailConfigured, sendFormEmail } from "@/lib/forms/email";

/**
 * The one route handler shared by all four public forms.
 *
 * POST /api/forms/:kind
 *   prayer | new-members | volunteer | contact
 *
 * A 200 response means the email provider accepted the message. It is never
 * returned when email delivery is unconfigured or failed. The interface turns
 * `not_configured` into an honest notice with the church's phone and WhatsApp
 * lines, not a success state.
 */

const MAX_BODY_BYTES = 20_000;
const RATE_LIMIT = 12;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const buckets = new Map<string, { count: number; reset: number }>();

function json(body: unknown, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "local";
}

function overLimit(key: string): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.reset <= now) {
    buckets.set(key, { count: 1, reset: now + RATE_WINDOW_MS });
    return false;
  }

  bucket.count += 1;
  return bucket.count > RATE_LIMIT;
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ kind: string }> }
): Promise<Response> {
  const { kind } = await params;

  if (!isFormKind(kind)) {
    return json({ ok: false, code: "not_found", message: "Unknown form." }, 404);
  }

  if (overLimit(clientKey(request))) {
    return json(
      {
        ok: false,
        code: "rate_limited",
        message:
          "Too many attempts. Please wait a few minutes, or call the church directly.",
      },
      429
    );
  }

  const raw = await request.text();
  if (!raw || raw.length > MAX_BODY_BYTES) {
    return json(
      { ok: false, code: "invalid", message: "Please check the form and try again." },
      413
    );
  }

  let payload: unknown;
  try {
    payload = JSON.parse(raw);
  } catch {
    return json(
      { ok: false, code: "invalid", message: "Please check the form and try again." },
      400
    );
  }

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return json(
      { ok: false, code: "invalid", message: "Please check the form and try again." },
      400
    );
  }

  // Honeypot: hidden from people, attractive to bots.
  const honeypot = (payload as Record<string, unknown>).company;
  if (typeof honeypot === "string" && honeypot.trim().length > 0) {
    return json({ ok: false, code: "invalid", message: "Please try again." }, 400);
  }

  const parsed = parseForm(kind, payload);
  if (!parsed.success) {
    return json(
      {
        ok: false,
        code: "invalid",
        message: "Please check the highlighted fields.",
        fields: parsed.error.flatten().fieldErrors,
      },
      422
    );
  }

  if (!isEmailConfigured()) {
    return json(
      {
        ok: false,
        code: "not_configured",
        message:
          "Email delivery is not connected on this deployment, so your message has not been sent. Please use the phone or WhatsApp lines below.",
      },
      503
    );
  }

  const result = await sendFormEmail(
    kind,
    parsed.data as Record<string, unknown>
  );

  if (!result.ok) {
    return json(
      {
        ok: false,
        code: "delivery_failed",
        message:
          "Your message could not be sent just now. Please try again, or use the phone or WhatsApp lines below.",
      },
      result.status === 503 ? 503 : 502
    );
  }

  return json({ ok: true });
}
