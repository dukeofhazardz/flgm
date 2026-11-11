import type { FormKind } from "@/data/forms";

/**
 * Form delivery.
 *
 * A submission is only reported as successful when the email provider accepts
 * it. If `RESEND_API_KEY`, `FORM_EMAIL_FROM`, and `FORM_EMAIL_TO` are not all
 * present, the route returns `not_configured` and the interface offers the
 * church's phone and WhatsApp lines instead. It never fakes a confirmation.
 *
 * Nothing in this module writes submitted personal data to logs.
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";

const META: Record<
  FormKind,
  {
    subject: string;
    intro: string;
    order: string[];
    labels: Record<string, string>;
  }
> = {
  prayer: {
    subject: "Prayer request — FLGM website",
    intro: "A prayer or counselling request was submitted through the website.",
    order: ["requestType", "name", "contact", "message"],
    labels: {
      requestType: "Request type",
      name: "Name",
      contact: "Phone or email",
      message: "Message",
      consent: "Confidentiality acknowledged",
    },
  },
  "new-members": {
    subject: "New member follow-up — FLGM website",
    intro: "A visitor or new member requested follow-up through the website.",
    order: ["fullName", "phone", "email", "descriptor", "interests", "followUp"],
    labels: {
      fullName: "Full name",
      phone: "Phone",
      email: "Email",
      descriptor: "Describes themselves as",
      interests: "Interested in",
      followUp: "Preferred follow-up",
    },
  },
  volunteer: {
    subject: "Volunteer registration — FLGM website",
    intro: "A volunteer registration was submitted through the website.",
    order: [
      "firstName",
      "lastName",
      "phone",
      "email",
      "membership",
      "serviceArea",
      "experience",
      "skills",
      "availability",
      "motivation",
    ],
    labels: {
      firstName: "First name",
      lastName: "Last name",
      phone: "Phone",
      email: "Email",
      membership: "Member of FLGM",
      serviceArea: "Preferred area of service",
      experience: "Previous experience",
      skills: "Skills and interests",
      availability: "Preferred availability",
      motivation: "Why they would like to serve",
      consent: "Consent to contact",
    },
  },
  contact: {
    subject: "Website enquiry — FLGM",
    intro: "A message was submitted through the contact page.",
    order: ["name", "email", "enquiryType", "message"],
    labels: {
      name: "Full name",
      email: "Email",
      enquiryType: "Enquiry type",
      message: "Message",
    },
  },
};

function env(name: string): string {
  return process.env[name]?.trim() ?? "";
}

export function isEmailConfigured(): boolean {
  return Boolean(
    env("RESEND_API_KEY") && env("FORM_EMAIL_FROM") && env("FORM_EMAIL_TO")
  );
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function displayValue(value: unknown): string {
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return String(value ?? "").trim();
}

function linesFor(kind: FormKind, payload: Record<string, unknown>) {
  const meta = META[kind];
  return meta.order
    .map((key) => ({
      key,
      label: meta.labels[key] ?? key,
      value: displayValue(payload[key]),
    }))
    .filter((line) => line.value.length > 0);
}

function replyToFor(payload: Record<string, unknown>): string | undefined {
  const candidates = [payload.email, payload.contact];
  for (const candidate of candidates) {
    if (typeof candidate === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(candidate.trim())) {
      return candidate.trim();
    }
  }
  return undefined;
}

export async function sendFormEmail(
  kind: FormKind,
  payload: Record<string, unknown>
): Promise<{ ok: true } | { ok: false; status: number }> {
  if (!isEmailConfigured()) return { ok: false, status: 503 };

  const meta = META[kind];
  const lines = linesFor(kind, payload);
  const submittedAt = new Date().toLocaleString("en-NG", {
    timeZone: "Africa/Lagos",
    dateStyle: "full",
    timeStyle: "short",
  });

  const text = [
    meta.intro,
    "",
    ...lines.map((line) => `${line.label}: ${line.value}`),
    "",
    `Submitted: ${submittedAt} WAT`,
  ].join("\n");

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#07130d;line-height:1.55;max-width:640px">
      <p style="font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#408609">Forever Life and Grace Mission</p>
      <h1 style="font-size:24px;margin:8px 0 16px">${escapeHtml(meta.subject)}</h1>
      <p>${escapeHtml(meta.intro)}</p>
      <table style="width:100%;border-collapse:collapse;margin-top:16px">
        ${lines
          .map(
            (line) => `<tr>
              <th style="text-align:left;vertical-align:top;padding:8px 16px 8px 0;border-top:1px solid #DDE5CE;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#408609;width:34%">${escapeHtml(
              line.label
            )}</th>
              <td style="padding:8px 0;border-top:1px solid #DDE5CE;white-space:pre-wrap">${escapeHtml(
                line.value
              )}</td>
            </tr>`
          )
          .join("")}
      </table>
      <p style="margin-top:24px;font-size:12px;color:#4A5A38">Submitted ${escapeHtml(
        submittedAt
      )} WAT from the FLGM website.</p>
    </div>
  `;

  const body = {
    from: env("FORM_EMAIL_FROM"),
    to: env("FORM_EMAIL_TO")
      .split(",")
      .map((address) => address.trim())
      .filter(Boolean),
    subject: meta.subject,
    text,
    html,
    ...(replyToFor(payload) ? { reply_to: replyToFor(payload) } : {}),
  };

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env("RESEND_API_KEY")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    if (!response.ok) return { ok: false, status: response.status };
    return { ok: true };
  } catch {
    return { ok: false, status: 502 };
  }
}
