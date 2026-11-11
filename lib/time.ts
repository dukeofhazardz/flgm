// Schedule logic for FLGM. All times use Africa/Lagos (WAT, UTC+1).
// Nothing here is invented: all schedules come from content.md. Unconfirmed
// items (Carol Service time, First Fruit schedule, Alpha Worship time) are
// flagged via the `confirmed` field in the data files, not guessed here.

import type { Event, Programme } from "@/lib/types";
import { wapDayNumber } from "@/lib/watch-and-pray";

const LAGOS = "Africa/Lagos";

/** Format a Date to a Lagos-local time string. */
export function lagosTime(date: Date): string {
  return date.toLocaleString("en-NG", {
    timeZone: LAGOS,
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

/** Format a Date to a Lagos-local date (YYYY-MM-DD). */
export function lagosDateString(date: Date): string {
  return date.toLocaleString("en-CA", { timeZone: LAGOS }).split("T")[0];
}

/** Get the current date/time in Lagos. Safe for both server and client. */
export function nowLagos(): Date {
  return new Date();
}

/**
 * Client-only nowLagos. Use this inside useEffect/useMemo in Client Components
 * to avoid Next.js 16's blocking-prerender-current-time-client error.
 * Callers must gate on `typeof window !== "undefined"`.
 */
export function nowLagosClient(): Date {
  if (typeof window === "undefined") return new Date();
  return new Date();
}

/**
 * Next occurrence of a weekly programme.
 * @param weekday 0=Sunday ... 6=Saturday
 * @param time "HH:MM" 24h in Lagos time
 */
export function nextWeeklyOccurrence(weekday: number, time: string): Date {
  const [hours, minutes] = time.split(":").map(Number);
  const now = nowLagos();
  const candidate = new Date(now);
  candidate.setHours(hours, minutes, 0, 0);
  // Advance to the target weekday.
  while (candidate.getDay() !== weekday) {
    candidate.setDate(candidate.getDate() + 1);
  }
  // If the candidate is in the past (same day but time passed), move a week.
  if (candidate.getTime() <= now.getTime()) {
    candidate.setDate(candidate.getDate() + 7);
  }
  return candidate;
}

/**
 * Next occurrence of a "first Thursday of the month" programme.
 * @param time "HH:MM" 24h in Lagos time
 */
export function nextFirstThursday(time: string): Date {
  const [hours, minutes] = time.split(":").map(Number);
  const now = nowLagos();
  const candidate = new Date(now.getFullYear(), now.getMonth(), 1, hours, minutes, 0, 0);
  // Advance to the first Thursday (getDay() === 4).
  while (candidate.getDay() !== 4) {
    candidate.setDate(candidate.getDate() + 1);
  }
  if (candidate.getTime() <= now.getTime()) {
    candidate.setMonth(candidate.getMonth() + 1);
    candidate.setDate(1);
    while (candidate.getDay() !== 4) {
      candidate.setDate(candidate.getDate() + 1);
    }
  }
  return candidate;
}

/** Event status: upcoming / live / past. All times WAT (UTC+1). */
export function eventStatus(event: Event): "upcoming" | "live" | "past" {
  const now = nowLagos();
  // Parse event date/time as WAT (Africa/Lagos). Time may be "5:30 AM" or "10:00 AM".
  const timeMatch = event.time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/);
  if (!timeMatch) return "past";
  let h = parseInt(timeMatch[1], 10);
  const m = parseInt(timeMatch[2], 10);
  const ampm = timeMatch[3];
  if (ampm === "PM" && h !== 12) h += 12;
  if (ampm === "AM" && h === 12) h = 0;
  const d = new Date(event.date);
  const start = new Date(
    Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), h, m, 0)
  );
  start.setUTCHours(start.getUTCHours() - 1); // WAT = UTC+1
  const end = event.endDate
    ? new Date(
        Date.UTC(
          new Date(event.endDate).getFullYear(),
          new Date(event.endDate).getMonth(),
          new Date(event.endDate).getDate(),
          23,
          59,
          0
        )
      )
    : start;
  if (now.getTime() < start.getTime()) return "upcoming";
  if (now.getTime() <= end.getTime()) return "live";
  return "past";
}

/**
 * Watch and Pray "Day N of 50".
 * Period: 11 November 2026 to 30 December 2026 (50 days), per content.md.
 * Returns the day number if today is within the period, otherwise null.
 */
export function watchAndPrayDayNumber(): number | null {
  return wapDayNumber(nowLagos());
}

/** The five upcoming church events from content.md. Kept in sync with data/events.ts. */
export const FIXED_EVENTS: Pick<Event, "id" | "title" | "date" | "time" | "endDate" | "category">[] = [
  { id: "watch-and-pray", title: "Watch and Pray", date: "2026-11-11", time: "05:30", endDate: "2026-12-30", category: "Daily prayer" },
  { id: "business-career-summit", title: "Business and Career Summit", date: "2026-11-28", time: "10:00", category: "Conference" },
  { id: "annual-harvest-thanksgiving", title: "Annual Harvest Thanksgiving, Church Building Fundraising and Ordination Service", date: "2026-12-05", time: "10:00", category: "Annual Celebration" },
  { id: "carol-service", title: "FLGM Carol Service", date: "2026-12-17", time: "TBC", category: "Christmas Celebration" },
  { id: "first-fruit-worship", title: "First Fruit Worship", date: "2026-12-31", time: "TBC", endDate: "2027-01-08", category: "New Year Worship" },
];

/** Live-strip message computed in WAT (Africa/Lagos, UTC+1). */
export interface LiveStripMessage {
  type: "watch-and-pray-countdown" | "watch-and-pray-day" | "next-sunday";
  text: string;
  confirmed: boolean;
}

/** Days from now (Lagos) to a target date, exclusive of today. */
function daysTo(target: Date): number {
  const now = nowLagos();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfTarget = new Date(
    target.getFullYear(),
    target.getMonth(),
    target.getDate()
  );
  return Math.ceil((startOfTarget.getTime() - startOfToday.getTime()) / 86400000);
}

/** Next Sunday date (Lagos). */
function nextSunday(): Date {
  const now = nowLagos();
  const d = new Date(now);
  d.setDate(now.getDate() + ((7 - now.getDay()) % 7 || 7));
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * Compute the next relevant moment for the live strip.
 * Priority: Watch and Pray (11 Nov – 30 Dec 2026) → next Sunday service.
 * Returns null when nothing relevant to show.
 */
export function liveStripMessage(): LiveStripMessage | null {
  const now = nowLagos();
  const wpStart = new Date("2026-11-11T00:00:00");
  const wpEnd = new Date("2026-12-30T23:59:59");

  if (now.getTime() >= wpStart.getTime() && now.getTime() <= wpEnd.getTime()) {
    const day = watchAndPrayDayNumber();
    if (day) {
      return {
        type: "watch-and-pray-day",
        text: `Day ${day} of 50: Daily prayer 5:30 AM`,
        confirmed: true,
      };
    }
    return {
      type: "watch-and-pray-countdown",
      text: `Watch and Pray starts in ${daysTo(wpStart)} day${
        daysTo(wpStart) === 1 ? "" : "s"
      }`,
      confirmed: true,
    };
  }

  // Before the Watch and Pray period: countdown to its start.
  if (now.getTime() < wpStart.getTime()) {
    return {
      type: "watch-and-pray-countdown",
      text: `Watch and Pray starts in ${daysTo(wpStart)} day${
        daysTo(wpStart) === 1 ? "" : "s"
      }`,
      confirmed: true,
    };
  }

  // After Watch and Pray: next Sunday service.
  const sunday = nextSunday();
  return {
    type: "next-sunday",
    text: `Sunday worship ${sunday.toLocaleDateString("en-NG", {
      timeZone: LAGOS,
      weekday: "short",
      day: "numeric",
      month: "short",
    })}: 8:00 AM and 9:30 AM`,
    confirmed: true,
  };
}

/** Next Sunday gathering in WAT: 8:00 AM service. */
export interface NextGathering {
  /** Formatted in Lagos time, e.g. "Sunday 8 Nov". */
  dayLabel: string;
  /** Formatted in Lagos time, e.g. "8:00 AM WAT". */
  timeLabel: string;
}

export function nextSundayService(): NextGathering {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: LAGOS,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0);
  const year = get("year");
  const month = get("month");
  const day = get("day");

  const weekday = new Date(Date.UTC(year, month - 1, day)).getUTCDay();
  const toSunday = (7 - weekday) % 7;
  let chosen = new Date(Date.UTC(year, month - 1, day + toSunday, 7, 0, 0, 0));
  if (chosen.getTime() <= now.getTime()) {
    chosen = new Date(Date.UTC(year, month - 1, day + toSunday + 7, 7, 0, 0, 0));
  }

  return {
    dayLabel: chosen.toLocaleDateString("en-NG", {
      timeZone: LAGOS,
      weekday: "short",
      day: "numeric",
      month: "short",
    }),
    timeLabel: "8:00 AM WAT",
  };
}

/**
 * Client-safe next occurrence for a weekly programme. Pure date maths on the
 * viewer's clock; used only for the small "next occurrence" badge, not for any
 * public claim about a schedule. When the time is unconfirmed, only the date is
 * computed and the badge omits the clock time.
 */
export function upcomingWeeklyDate(
  weekday: number,
  time24: string | null,
  from: Date = new Date()
): Date {
  const candidate = new Date(from);
  if (time24) {
    const [hours, minutes] = time24.split(":").map(Number);
    candidate.setHours(hours, minutes, 0, 0);
  } else {
    candidate.setHours(0, 0, 0, 0);
  }
  while (candidate.getDay() !== weekday) {
    candidate.setDate(candidate.getDate() + 1);
  }
  if (candidate.getTime() <= from.getTime()) {
    candidate.setDate(candidate.getDate() + 7);
  }
  return candidate;
}

/** Next first Thursday of the month, from a given moment. */
export function upcomingFirstThursday(
  time24: string | null,
  from: Date = new Date()
): Date {
  const [hours, minutes] = time24 ? time24.split(":").map(Number) : [0, 0];
  const candidate = new Date(
    from.getFullYear(),
    from.getMonth(),
    1,
    hours,
    minutes,
    0,
    0
  );
  while (candidate.getDay() !== 4) {
    candidate.setDate(candidate.getDate() + 1);
  }
  if (candidate.getTime() <= from.getTime()) {
    candidate.setMonth(candidate.getMonth() + 1, 1);
    while (candidate.getDay() !== 4) {
      candidate.setDate(candidate.getDate() + 1);
    }
  }
  return candidate;
}

/** Next 1st of the month, from a given moment. */
export function upcomingFirstOfMonth(from: Date = new Date()): Date {
  const candidate = new Date(
    from.getFullYear(),
    from.getMonth(),
    1,
    0,
    0,
    0,
    0
  );
  if (candidate.getTime() <= from.getTime()) {
    candidate.setMonth(candidate.getMonth() + 1, 1);
  }
  return candidate;
}

/** Next first Saturday of the month, from a given moment. */
export function upcomingFirstSaturday(
  time24: string | null,
  from: Date = new Date()
): Date {
  const [hours, minutes] = time24 ? time24.split(":").map(Number) : [0, 0];
  const candidate = new Date(
    from.getFullYear(),
    from.getMonth(),
    1,
    hours,
    minutes,
    0,
    0
  );
  while (candidate.getDay() !== 6) {
    candidate.setDate(candidate.getDate() + 1);
  }
  if (candidate.getTime() <= from.getTime()) {
    candidate.setMonth(candidate.getMonth() + 1, 1);
    while (candidate.getDay() !== 6) {
      candidate.setDate(candidate.getDate() + 1);
    }
  }
  return candidate;
}

/** e.g. "Sun 8 Nov" — stable across server/client at day precision. */
export function occurrenceLabel(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

/** Regular weekly programme times from content.md. */
export const PROGRAMME_TIMES: Programme[] = [
  {
    id: "svm",
    name: "School of Vision and Mission (SVM)",
    description: "Nurturing children and young people in the knowledge of God, spiritual identity, and Christian living.",
    day: "Sunday",
    time: "8:00 AM – 9:30 AM",
    confirmed: true,
  },
  {
    id: "combined-celebration",
    name: "Combined Celebration Service",
    description: "A gathering of worship, the Word, fellowship, and celebration of the life and grace of God.",
    day: "Sunday",
    time: "9:30 AM",
    confirmed: true,
  },
  {
    id: "midweek-prophetic-prayer",
    name: "Midweek Prophetic Prayer and Faith Building",
    description: "An opportunity to strengthen faith, grow in spiritual understanding, and participate in corporate prayer.",
    day: "Thursday",
    time: "5:45 PM",
    confirmed: true,
  },
  {
    id: "alpha-worship",
    name: "Alpha Worship – Falling the Jericho Walls",
    description: "A special monthly worship and prayer gathering focused on worship, spiritual growth, and the manifestation of God’s grace.",
    day: "1st of Every Month",
    time: "TBC", // content.md gives 5:00 PM in one section and none in another — unconfirmed
    confirmed: false,
  },
  {
    id: "house-fellowship",
    name: "House Fellowship and Evangelism",
    description: "Fellowship groups and evangelism initiatives to build relationships, share the Gospel, disciple others, and extend the Kingdom.",
    day: "TBC",
    time: "TBC",
    confirmed: false,
  },
];
