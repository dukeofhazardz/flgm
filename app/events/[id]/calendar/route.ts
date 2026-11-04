import { EVENTS } from "@/data/events";
import { CHURCH } from "@/data/church";

/**
 * Event calendar download.
 *
 * Confirmed events are written in UTC so every client lands on the same WAT
 * wall-clock time. Unconfirmed times (Carol Service, First Fruit Worship) are
 * saved as all-day entries with a clear note — no hour is invented. The Watch
 * and Pray entry repeats for the fifty mornings at 5:30 AM WAT.
 */

function escapeText(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

function foldLine(line: string): string {
  const encoder = new TextEncoder();
  if (encoder.encode(line).length <= 75) return line;

  const output: string[] = [];
  let current = "";
  let currentBytes = 0;
  let limit = 75;

  for (const char of line) {
    const bytes = encoder.encode(char).length;
    if (currentBytes + bytes > limit) {
      output.push(current);
      current = char;
      currentBytes = bytes;
      limit = 74;
    } else {
      current += char;
      currentBytes += bytes;
    }
  }
  if (current) output.push(current);

  return output.join("\r\n ");
}

function utcStamp(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

function dateOnly(iso: string): string {
  return iso.replace(/-/g, "");
}

function addDays(iso: string, days: number): string {
  const date = new Date(`${iso}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

/** 2026-11-11 + "05:30" in WAT (UTC+1) → the matching UTC Date. */
function watToUtc(iso: string, time24: string): Date {
  const [year, month, day] = iso.split("-").map(Number);
  const [hour, minute] = time24.split(":").map(Number);
  return new Date(Date.UTC(year, month - 1, day, hour - 1, minute));
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<Response> {
  const { id } = await params;
  const event = EVENTS.find((item) => item.id === id);
  if (!event) {
    return new Response("Event not found", { status: 404 });
  }

  const pageUrl = new URL(`/events#calendar`, request.url).toString();
  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Forever Life and Grace Mission//Events 2026-2027//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${escapeText(event.title)}`,
    "BEGIN:VEVENT",
    `UID:${event.id}@flgm`,
    `DTSTAMP:${utcStamp(new Date())}`,
  ];

  const descriptionParts = [
    event.description,
    "All times are West Africa Time (WAT, UTC+1).",
  ];

  if (event.timeConfirmed && event.time24) {
    const start = watToUtc(event.date, event.time24);
    const durationMinutes = event.id === "watch-and-pray" ? 30 : 120;
    const end = new Date(start.getTime() + durationMinutes * 60 * 1000);

    if (event.id === "watch-and-pray") {
      descriptionParts.push(
        "Watch and Pray runs daily for fifty mornings. The daily session length is still to be confirmed; this calendar reserves thirty minutes."
      );
    }

    lines.push(`DTSTART:${utcStamp(start)}`, `DTEND:${utcStamp(end)}`);

    if (event.id === "watch-and-pray") {
      lines.push("RRULE:FREQ=DAILY;COUNT=50");
    }
  } else {
    descriptionParts.push(
      event.id === "first-fruit-worship"
        ? "The daily schedule is still to be confirmed. This entry saves the season and will not presume a daily hour."
        : "The time is still to be confirmed. This entry saves the date as an all-day reminder."
    );

    lines.push(
      `DTSTART;VALUE=DATE:${dateOnly(event.date)}`,
      `DTEND;VALUE=DATE:${dateOnly(addDays(event.endDate ?? event.date, 1))}`
    );
  }

  lines.push(
    `SUMMARY:${escapeText(event.title)}`,
    `DESCRIPTION:${escapeText(descriptionParts.join("\n\n"))}`,
    `LOCATION:${escapeText(CHURCH.address)}`,
    `URL:${escapeText(pageUrl)}`,
    "TRANSP:OPAQUE",
    `STATUS:${event.confirmed ? "CONFIRMED" : "TENTATIVE"}`,
    "BEGIN:VALARM",
    "TRIGGER:-PT30M",
    "ACTION:DISPLAY",
    `DESCRIPTION:${escapeText(`${event.title} begins soon.`)}`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR"
  );

  const body = `${lines.map(foldLine).join("\r\n")}\r\n`;

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${event.id}.ics"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
