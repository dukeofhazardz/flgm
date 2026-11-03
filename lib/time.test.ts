import assert from "node:assert";
import {
  nextWeeklyOccurrence,
  nextFirstThursday,
  eventStatus,
  watchAndPrayDayNumber,
  PROGRAMME_TIMES,
} from "./time";
import { toWhatsAppLink } from "./whatsapp";

const now = new Date();

// nextWeeklyOccurrence: future, correct weekday, correct time.
{
  const sun830 = nextWeeklyOccurrence(0, "08:30");
  assert.ok(sun830.getTime() > now.getTime(), "next weekly occurrence is in the future");
  assert.strictEqual(sun830.getDay(), 0, "lands on Sunday");
  assert.strictEqual(sun830.getHours(), 8, "hour matches");
  assert.strictEqual(sun830.getMinutes(), 30, "minute matches");

  const thu1745 = nextWeeklyOccurrence(4, "17:45");
  assert.ok(thu1745.getTime() > now.getTime(), "Thursday occurrence is in the future");
  assert.strictEqual(thu1745.getDay(), 4, "lands on Thursday");
}

// nextFirstThursday: future, first Thursday of a month (date 1-7).
{
  const d = nextFirstThursday("05:00");
  assert.ok(d.getTime() > now.getTime(), "first Thursday is in the future");
  assert.strictEqual(d.getDay(), 4, "is a Thursday");
  assert.ok(d.getDate() >= 1 && d.getDate() <= 7, "falls in the first week of the month");
}

// eventStatus
{
  const future = new Date(now.getTime() + 86400000).toISOString().slice(0, 16).replace("T", " ");
  const past = new Date(now.getTime() - 86400000).toISOString().slice(0, 16).replace("T", " ");
  assert.strictEqual(
    eventStatus({
      id: "e1",
      title: "Future",
      date: future.slice(0, 10),
      time: future.slice(11),
      category: "x",
      description: "d",
      confirmed: true,
    }),
    "upcoming",
  );
  assert.strictEqual(
    eventStatus({
      id: "e2",
      title: "Past",
      date: past.slice(0, 10),
      time: past.slice(11),
      category: "x",
      description: "d",
      confirmed: true,
    }),
    "past",
  );
}

// watchAndPrayDayNumber: null before 11 Nov 2026, 1..50 inside.
{
  const n = watchAndPrayDayNumber();
  assert.ok(n === null || (n >= 1 && n <= 50), "day number is null or within 1-50");
}

// PROGRAMME_TIMES matches content.md schedules.
{
  const svm = PROGRAMME_TIMES.find((p) => p.id === "svm");
  assert.strictEqual(svm?.day, "Sunday");
  assert.strictEqual(svm?.time, "8:00 AM – 9:30 AM");
  assert.strictEqual(svm?.confirmed, true);

  const alpha = PROGRAMME_TIMES.find((p) => p.id === "alpha-worship");
  assert.strictEqual(alpha?.confirmed, false, "Alpha Worship time unconfirmed");
}

// WhatsApp normalization: 08089599066 -> 2348089599066
{
  const link = toWhatsAppLink("08089599066", "Hello FLGM");
  assert.ok(link.includes("https://wa.me/2348089599066"), "normalises to international format");
  assert.ok(link.includes("Hello%20FLGM"), "message is URL-encoded");
}

console.log("All time/whatsapp unit tests passed.");
