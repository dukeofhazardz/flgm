import { test } from "node:test";
import assert from "node:assert/strict";
import {
  WAP_START_MS,
  WAP_END_MS,
  WAP_DAYS,
  wapPhase,
  wapCountdown,
  wapDayNumber,
  wapIsLive,
  wapDayState,
  wapCountdownSentence,
  watClock,
} from "./watch-and-pray.ts";

const at = (iso: string) => new Date(iso);

test("phase boundaries: before, exact start, exact end, after", () => {
  assert.equal(wapPhase(at("2026-11-11T04:29:59.999Z")), "before");
  assert.equal(wapPhase(new Date(WAP_START_MS)), "during");
  assert.equal(wapPhase(at("2026-12-30T22:59:59.999Z")), "during");
  assert.equal(wapPhase(new Date(WAP_END_MS)), "during");
  assert.equal(wapPhase(at("2026-12-30T23:00:00.000Z")), "after");
});

test("countdown is only present before the first watch", () => {
  assert.equal(wapCountdown(at("2026-11-11T04:30:00.000Z")), null);
  assert.equal(wapCountdown(at("2027-01-01T00:00:00.000Z")), null);

  const c = wapCountdown(at("2026-11-10T04:30:00.000Z"));
  assert.ok(c);
  assert.equal(c.days, 1);
  assert.equal(c.hours, 0);
  assert.equal(c.minutes, 0);
  assert.equal(c.seconds, 0);

  const finalSecond = wapCountdown(at("2026-11-11T04:29:59.000Z"));
  assert.ok(finalSecond);
  assert.equal(finalSecond.totalMs, 1000);
  assert.equal(finalSecond.seconds, 1);
});

test("countdown rolls over correctly at unit boundaries", () => {
  const c = wapCountdown(at("2026-11-09T04:29:59.000Z")); // 2d 00:00:01 before
  assert.ok(c);
  assert.equal(c.days, 2);
  assert.equal(c.hours, 0);
  assert.equal(c.minutes, 0);
  assert.equal(c.seconds, 1);
});

test("day number is calendar-based, 1..50, null outside", () => {
  // 11 Nov 2026 00:00 WAT = 10 Nov 23:00 UTC
  assert.equal(wapDayNumber(at("2026-11-10T23:00:00.000Z")), 1);
  assert.equal(wapDayNumber(at("2026-11-10T22:59:59.999Z")), null);
  // 11 Nov 05:30 WAT still Day 1
  assert.equal(wapDayNumber(at("2026-11-11T04:30:00.000Z")), 1);
  // 30 Dec 23:59 WAT = 30 Dec 22:59 UTC
  assert.equal(wapDayNumber(at("2026-12-30T22:59:00.000Z")), 50);
  // 31 Dec 00:00 WAT = 30 Dec 23:00 UTC
  assert.equal(wapDayNumber(at("2026-12-30T23:00:00.000Z")), null);
});

test("day 50 exists and there are exactly 50 consecutive dated days", () => {
  assert.equal(WAP_DAYS.length, 50);
  assert.equal(WAP_DAYS[0].iso, "2026-11-11");
  assert.equal(WAP_DAYS[49].iso, "2026-12-30");
  assert.equal(WAP_DAYS[49].day, 50);
  assert.equal(WAP_DAYS[0].weekday, "Wed");
  assert.equal(WAP_DAYS[49].weekday, "Wed");
});

test("LIVE indicator boundaries: 05:30 inclusive, 06:00 exclusive", () => {
  assert.equal(wapIsLive(at("2026-11-11T04:29:59.999Z")), false);
  assert.equal(wapIsLive(at("2026-11-11T04:30:00.000Z")), true);
  assert.equal(wapIsLive(at("2026-11-11T04:59:59.999Z")), true);
  assert.equal(wapIsLive(at("2026-11-11T05:00:00.000Z")), false);

  // Outside the programme dates the window never opens.
  assert.equal(wapIsLive(at("2026-11-10T04:30:00.000Z")), false);
  assert.equal(wapIsLive(at("2026-12-31T04:30:00.000Z")), false);
});

test("ledger day states", () => {
  assert.equal(wapDayState(1, null), "future");
  assert.equal(wapDayState(1, 1), "today");
  assert.equal(wapDayState(1, 2), "past");
  assert.equal(wapDayState(3, 2), "future");
  assert.equal(wapDayState(50, 50), "today");
  assert.equal(wapDayState(50, null), "future");
});

test("human-readable helpers", () => {
  const c = wapCountdown(at("2026-11-10T03:28:51.000Z")); // 1d 01:01:09
  assert.ok(c);
  assert.equal(wapCountdownSentence(c), "1 day, 1 hour, 1 minute, 9 seconds");
  assert.equal(watClock(at("2026-11-11T04:30:00.000Z")), "05:30");
  assert.equal(watClock(at("2026-11-11T23:07:00.000Z")), "00:07");
});
