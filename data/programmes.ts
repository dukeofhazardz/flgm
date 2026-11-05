// Featured programmes from content.md (lines 26–42 / 221–235).
// Schedules flagged confirmed per content.md; Alpha Worship time and House
// Fellowship are unconfirmed (content.md gives conflicting / missing times).
//
// `weekday` (0 = Sunday) and `time24` (WAT) exist only so the site can compute
// the next occurrence. They restate the published day/time, never guess it.

export interface ProgrammeRecord {
  id: string;
  name: string;
  description: string;
  day: string;
  time: string;
  confirmed: boolean;
  /** 0 = Sunday … 6 = Saturday. Null when the day is unconfirmed. */
  weekday: number | null;
  /** 24-hour WAT time used for the next-occurrence badge. Null when unconfirmed. */
  time24: string | null;
  /** Weekly, or the first Thursday of each month. */
  recurrence: "weekly" | "first-thursday" | null;
}

export const PROGRAMMES: ProgrammeRecord[] = [
  {
    id: "svm",
    name: "School of Vision and Mission (SVM)",
    description:
      "A ministry dedicated to nurturing children and young people in the knowledge of God, spiritual identity, and Christian living.",
    day: "Sunday",
    time: "8:00 AM – 9:30 AM",
    confirmed: true,
    weekday: 0,
    time24: "08:00",
    recurrence: "weekly",
  },
  {
    id: "combined-celebration",
    name: "Combined Celebration Service",
    description:
      "A gathering of worship, the Word, fellowship, and celebration of the life and grace of God.",
    day: "Sunday",
    time: "9:30 AM",
    confirmed: true,
    weekday: 0,
    time24: "09:30",
    recurrence: "weekly",
  },
  {
    id: "midweek-prophetic-prayer",
    name: "Midweek Prophetic Prayer and Faith Building",
    description:
      "An opportunity to strengthen faith, grow in spiritual understanding, and participate in corporate prayer.",
    day: "Thursday",
    time: "5:45 PM",
    confirmed: true,
    weekday: 4,
    time24: "17:45",
    recurrence: "weekly",
  },
  {
    id: "alpha-worship",
    name: "Alpha Worship – Pulling Down the Jericho Wall",
    description:
      "A special monthly worship and prayer gathering focused on worship, spiritual growth, and the manifestation of God’s grace.",
    day: "First Thursday of the month",
    time: "Details coming soon", // content.md: one section says 5:00 PM, another gives none — unconfirmed
    confirmed: false,
    weekday: 4,
    time24: null,
    recurrence: "first-thursday",
  },
  {
    id: "house-fellowship",
    name: "House Fellowship and Evangelism",
    description:
      "Connecting believers through fellowship, discipleship, evangelism, and community outreach.",
    day: "Details coming soon",
    time: "Details coming soon",
    confirmed: false,
    weekday: null,
    time24: null,
    recurrence: null,
  },
];
