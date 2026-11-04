"use client";

import { useEffect, useState } from "react";
import type { FormKind } from "@/data/forms";

/**
 * Client-side form transport.
 * No success is inferred locally: the server must return `{ ok: true }`, which
 * only happens after the email provider accepts the submission.
 */

export type SubmitErrorCode =
  | "not_configured"
  | "delivery_failed"
  | "invalid"
  | "rate_limited"
  | "network"
  | "unknown";

export type SubmitResult =
  | { ok: true }
  | {
      ok: false;
      code: SubmitErrorCode;
      message: string;
      fields?: Record<string, string[] | undefined>;
    };

export async function submitForm(
  kind: FormKind,
  values: unknown
): Promise<SubmitResult> {
  try {
    const response = await fetch(`/api/forms/${kind}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const data = (await response.json().catch(() => null)) as
      | {
          ok?: boolean;
          code?: string;
          message?: string;
          fields?: Record<string, string[] | undefined>;
        }
      | null;

    if (response.ok && data?.ok === true) return { ok: true };

    const code: SubmitErrorCode =
      data?.code === "not_configured" ||
      data?.code === "delivery_failed" ||
      data?.code === "invalid" ||
      data?.code === "rate_limited"
        ? data.code
        : "unknown";

    return {
      ok: false,
      code,
      message:
        data?.message ??
        "Your message could not be sent just now. Please try again, or call the church directly.",
      fields: data?.fields,
    };
  } catch {
    return {
      ok: false,
      code: "network",
      message:
        "We could not reach the church server. Please check your connection and try again, or call the church directly.",
    };
  }
}

type DeliveryState = "checking" | "connected" | "not_configured";

export function useFormDelivery(): DeliveryState {
  const [state, setState] = useState<DeliveryState>("checking");

  useEffect(() => {
    let alive = true;
    fetch("/api/forms/status", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { configured?: boolean } | null) => {
        if (!alive) return;
        setState(data?.configured ? "connected" : "not_configured");
      })
      .catch(() => {
        if (alive) setState("not_configured");
      });
    return () => {
      alive = false;
    };
  }, []);

  return state;
}
