import { WATCH_AND_PRAY } from "@/data/watchAndPray";

/**
 * The fifty mornings as a single recurring calendar entry.
 *
 * The watch gathers at 5:30 AM WAT (UTC+1), which is 04:30 UTC all year.
 * DTSTART/DTEND are written in UTC so every calendar client lands on the same
 * wall-clock hour in Abuja. The committee has not confirmed the length of the
 * daily session, so the calendar reserves a 30-minute block and the
 * description says the duration is still to be confirmed.
 */

const START_UTC = "20261111T043000Z";
const END_UTC = "20261111T050000Z";
const DAY_COUNT = WATCH_AND_PRAY.durationDays;

/** Escape text for an iCalendar TEXT value. */
function escapeText(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

/** Fold a content line at 75 octets, continuing with a single space. */
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
      limit = 74; // continuation lines start with a space
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

export function GET(request: Request): Response {
  const description = [
    "Fifty mornings of strategic prayer, worship, testimony, and digital outreach with Forever Life and Grace Mission.",
    "Theme: Reaching Lives. Revealing Grace. Manifesting the Life of God.",
    "Daily at 5:30 AM West Africa Time (UTC+1).",
    "The length of each daily session is still to be confirmed; this calendar reserves thirty minutes.",
    "Join online via the Watch and Pray page.",
  ].join("\n\n");

  const pageUrl = new URL("/watch-and-pray", request.url).toString();

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Forever Life and Grace Mission//Watch and Pray 2026//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:Watch and Pray 2026",
    "X-WR-CALDESC:Fifty mornings of prayer and outreach, 11 November to 30 December 2026.",
    "BEGIN:VEVENT",
    "UID:watch-and-pray-2026@flgm",
    `DTSTAMP:${utcStamp(new Date())}`,
    `DTSTART:${START_UTC}`,
    `DTEND:${END_UTC}`,
    `RRULE:FREQ=DAILY;COUNT=${DAY_COUNT}`,
    `SUMMARY:${escapeText("Watch and Pray — daily prayer and outreach")}`,
    `DESCRIPTION:${escapeText(description)}`,
    `LOCATION:${escapeText(
      "Online — Facebook, Instagram, and TikTok. Details at the Watch and Pray page."
    )}`,
    `URL:${escapeText(pageUrl)}`,
    "TRANSP:OPAQUE",
    "STATUS:CONFIRMED",
    "BEGIN:VALARM",
    "TRIGGER:-PT15M",
    "ACTION:DISPLAY",
    `DESCRIPTION:${escapeText("Watch and Pray begins in fifteen minutes.")}`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  const body = `${lines.map(foldLine).join("\r\n")}\r\n`;

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="watch-and-pray-2026.ics"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
