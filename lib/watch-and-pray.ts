// Pure Watch and Pray time logic. Every function takes the current moment so
// the state machine can be unit-tested at its exact boundaries.
//
// Africa/Lagos is UTC+1 all year (no daylight saving). The programme runs for
// 50 calendar days, 11 November – 30 December 2026, with the daily watch at
// 5:30 AM WAT.
//
// The committee has not confirmed the length of the daily session. The LIVE
// indicator therefore uses a presentation-only 30-minute window from 5:30 AM;
// this value is never printed as a session duration anywhere on the page.

export const WAP_START_MS = Date.UTC(2026, 10, 11, 4, 30, 0, 0); // 11 Nov 2026, 05:30 WAT
export const WAP_END_MS = Date.UTC(2026, 11, 30, 22, 59, 59, 999); // 30 Dec 2026, 23:59:59.999 WAT
export const WAP_FIRST_DAY_UTC = Date.UTC(2026, 10, 11, 0, 0, 0, 0);
export const WAP_DAY_COUNT = 50;
export const WAP_DAILY_MINUTES = 5 * 60 + 30; // 05:30 WAT
export const WAP_LIVE_WINDOW_MINUTES = 30;
export const WAP_TIMEZONE = "Africa/Lagos";

export type WapPhase = "before" | "during" | "after";

export interface LagosParts {
  year: number;
  month: number; // 1–12
  day: number;
  hour: number;
  minute: number;
  second: number;
}

export interface WapCountdown {
  totalMs: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface WapDay {
  day: number;
  iso: string;
  /** e.g. "11 Nov" */
  dateLabel: string;
  /** e.g. "Wed" */
  weekday: string;
  /** e.g. "11 November 2026" */
  longLabel: string;
}

const lagosPartsFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: WAP_TIMEZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

const utcDateFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "UTC",
  day: "numeric",
  month: "short",
});

const utcWeekdayFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "UTC",
  weekday: "short",
});

const utcLongFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "UTC",
  day: "numeric",
  month: "long",
  year: "numeric",
});

/** Wall-clock parts in Africa/Lagos, independent of the host timezone. */
export function lagosParts(now: Date): LagosParts {
  const parts = lagosPartsFormatter.formatToParts(now);
  const value = (type: Intl.DateTimeFormatPartTypes): number =>
    Number(parts.find((part) => part.type === type)?.value ?? 0);
  return {
    year: value("year"),
    month: value("month"),
    day: value("day"),
    hour: value("hour"),
    minute: value("minute"),
    second: value("second"),
  };
}

/** Calendar date in Lagos as a UTC-midnight timestamp. */
export function lagosDateMs(now: Date): number {
  const { year, month, day } = lagosParts(now);
  return Date.UTC(year, month - 1, day);
}

/** Which act of the programme the moment belongs to. */
export function wapPhase(now: Date): WapPhase {
  const ms = now.getTime();
  if (ms < WAP_START_MS) return "before";
  if (ms > WAP_END_MS) return "after";
  return "during";
}

/** Countdown to 11 Nov 2026, 5:30 AM WAT. Null outside the "before" phase. */
export function wapCountdown(now: Date): WapCountdown | null {
  if (wapPhase(now) !== "before") return null;
  const totalMs = Math.max(0, WAP_START_MS - now.getTime());
  const totalSeconds = Math.floor(totalMs / 1000);
  return {
    totalMs,
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

/**
 * Programme day number, 1–50, based on the Lagos calendar date.
 * Day 1 is 11 November; Day 50 is 30 December. Null outside the period.
 * (The state machine still says "before" until 5:30 AM on Day 1.)
 */
export function wapDayNumber(now: Date): number | null {
  const diffDays = Math.round((lagosDateMs(now) - WAP_FIRST_DAY_UTC) / 86400000);
  if (diffDays < 0 || diffDays > WAP_DAY_COUNT - 1) return null;
  return diffDays + 1;
}

/**
 * True during the 5:30 AM presentation window on a programme day.
 * Purely a LIVE-indicator state; it makes no claim about session length.
 */
export function wapIsLive(now: Date): boolean {
  if (wapPhase(now) !== "during") return false;
  const { hour, minute } = lagosParts(now);
  const minutes = hour * 60 + minute;
  return (
    minutes >= WAP_DAILY_MINUTES &&
    minutes < WAP_DAILY_MINUTES + WAP_LIVE_WINDOW_MINUTES
  );
}

/** Day state for the 50-day ledger. */
export function wapDayState(
  day: number,
  today: number | null
): "past" | "today" | "future" {
  if (today === null || day > today) return "future";
  if (day === today) return "today";
  return "past";
}

/** The 50 dated days of the programme, generated in UTC to stay stable. */
export const WAP_DAYS: readonly WapDay[] = Array.from(
  { length: WAP_DAY_COUNT },
  (_, index) => {
    const date = new Date(WAP_FIRST_DAY_UTC + index * 86400000);
    return {
      day: index + 1,
      iso: date.toISOString().slice(0, 10),
      dateLabel: utcDateFormatter.format(date),
      weekday: utcWeekdayFormatter.format(date),
      longLabel: utcLongFormatter.format(date),
    };
  }
);

/** "6 days, 02 hours, 14 minutes, 09 seconds" for screen readers. */
export function wapCountdownSentence(countdown: WapCountdown): string {
  const unit = (value: number, label: string) =>
    `${value} ${label}${value === 1 ? "" : "s"}`;
  return [
    unit(countdown.days, "day"),
    unit(countdown.hours, "hour"),
    unit(countdown.minutes, "minute"),
    unit(countdown.seconds, "second"),
  ].join(", ");
}

/** 24-hour WAT clock, e.g. "05:30". */
export function watClock(now: Date): string {
  const { hour, minute } = lagosParts(now);
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}
