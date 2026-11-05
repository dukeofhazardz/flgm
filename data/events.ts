// Church events from content.md (lines 425–468).
// All times Abuja local time (WAT, UTC+1). Carol Service time and First Fruit
// daily schedule are unconfirmed. First Fruit end date corrected to
// 8 January 2027 per the Date Correction block (awaiting Chief Pastor approval).

export interface ChurchEvent {
  id: string;
  title: string;
  date: string;
  endDate?: string;
  /** Published wall-clock time, or the neutral unconfirmed value. */
  time: string;
  /** False renders "Time to be confirmed" instead of a clock time. */
  timeConfirmed: boolean;
  /** 24-hour WAT value used by the calendar route. Null when unconfirmed. */
  time24: string | null;
  category: string;
  description: string;
  /** Call to action from content.md lines 431–468. */
  cta: string;
  ctaHref: string;
  confirmed: boolean;
}

export const EVENTS: readonly ChurchEvent[] = [
  {
    id: "watch-and-pray",
    title: "Watch and Pray Strategic Prayer and Testimony Outreach",
    date: "2026-11-11",
    endDate: "2026-12-30",
    time: "5:30 AM",
    timeConfirmed: true,
    time24: "05:30",
    category: "Daily Programme",
    description:
      "A 50-day prayer and digital outreach initiative featuring daily prayer, worship, testimonies, and online evangelism.",
    cta: "Join Watch and Pray",
    ctaHref: "/watch-and-pray",
    confirmed: true,
  },
  {
    id: "business-career-summit",
    title: "Business and Career Summit",
    date: "2026-11-28",
    time: "10:00 AM",
    timeConfirmed: true,
    time24: "10:00",
    category: "Conference",
    description:
      "A summit designed to inspire professional development, business growth, career advancement, entrepreneurship, and purposeful influence.",
    cta: "Summit Information and Registration",
    ctaHref: "/contact?enquiry=business-career-summit",
    confirmed: true,
  },
  {
    id: "annual-harvest-thanksgiving",
    title:
      "Annual Harvest Thanksgiving, Church Building Fundraising and Ordination Service",
    date: "2026-12-05",
    time: "10:00 AM",
    timeConfirmed: true,
    time24: "10:00",
    category: "Annual Celebration",
    description:
      "A special celebration of thanksgiving, church building vision, ministry partnership, and ordination.",
    cta: "Event Details",
    ctaHref: "/contact?enquiry=annual-harvest-thanksgiving",
    confirmed: true,
  },
  {
    id: "carol-service",
    title: "FLGM Carol Service",
    date: "2026-12-17",
    time: "Details coming soon",
    timeConfirmed: false,
    time24: null,
    category: "Christmas Celebration",
    description:
      "A celebration of the birth of Jesus Christ through worship, Christmas carols, Scripture, and fellowship.",
    cta: "Carol Service Information",
    ctaHref: "/contact?enquiry=carol-service",
    confirmed: false,
  },
  {
    id: "first-fruit-worship",
    title: "First Fruit Worship",
    date: "2026-12-31",
    endDate: "2027-01-08",
    time: "Details coming soon",
    timeConfirmed: false,
    time24: null,
    category: "New Year Worship",
    description:
      "A special season of worship and spiritual dedication as the church enters a new year.",
    cta: "First Fruit Worship Information",
    ctaHref: "/contact?enquiry=first-fruit-worship",
    confirmed: false,
  },
] as const;

/** The filters offered on the events page. */
export const EVENT_CATEGORIES = [
  "Daily Programme",
  "Conference",
  "Annual Celebration",
  "Christmas Celebration",
  "New Year Worship",
] as const;

export interface AnnualProgrammeItem {
  id: string;
  label: string;
  rhythm: string;
  description: string;
  /** 0 = Sunday … 6 = Saturday. Null when the published day is not fixed. */
  weekday: number | null;
  time: string;
  confirmed: boolean;
}

export const ANNUAL_PROGRAMME: AnnualProgrammeItem[] = [
  {
    id: "sunday-celebration",
    label: "Sunday Celebration Services",
    rhythm: "Weekly · Sunday",
    description:
      "School of Vision and Mission at 8:00 AM, followed by the Combined Celebration Service at 9:30 AM.",
    weekday: 0,
    time: "8:00 AM / 9:30 AM",
    confirmed: true,
  },
  {
    id: "thursday-prayer",
    label: "Thursday Prophetic Prayer and Faith Building",
    rhythm: "Weekly · Thursday",
    description:
      "Corporate prayer, faith building, and spiritual understanding in the middle of the week.",
    weekday: 4,
    time: "5:45 PM",
    confirmed: true,
  },
  {
    id: "alpha-worship",
    label: "Alpha Worship — Pulling Down the Jericho Wall",
    rhythm: "Monthly · First Thursday",
    description:
      "A monthly worship and prayer gathering focused on worship, spiritual growth, and the manifestation of God’s grace.",
    weekday: 4,
    time: "Time to be confirmed",
    confirmed: false,
  },
  {
    id: "svm",
    label: "School of Vision and Mission",
    rhythm: "Weekly · Sunday",
    description:
      "Nurturing children and young people in the knowledge of God, spiritual identity, and Christian living.",
    weekday: 0,
    time: "8:00 AM",
    confirmed: true,
  },
  {
    id: "evangelism",
    label: "Evangelism and Outreach",
    rhythm: "Through the year",
    description:
      "Sharing the Gospel, reaching people, and extending the influence of God’s Kingdom.",
    weekday: null,
    time: "As scheduled",
    confirmed: true,
  },
  {
    id: "house-fellowship",
    label: "House Fellowship",
    rhythm: "Through the year",
    description:
      "Fellowship groups and evangelism initiatives that build relationships and disciple believers.",
    weekday: null,
    time: "Time to be confirmed",
    confirmed: false,
  },
  {
    id: "building-project",
    label: "Church Building Project Activities",
    rhythm: "Through the year",
    description:
      "Prayer, partnership, and voluntary giving toward the 1,000-capacity auditorium vision.",
    weekday: null,
    time: "As scheduled",
    confirmed: true,
  },
  {
    id: "special-programmes",
    label: "Special Conferences and Ministry Celebrations",
    rhythm: "Through the year",
    description:
      "Conferences, celebrations, and church events that gather the family for worship and the Word.",
    weekday: null,
    time: "As announced",
    confirmed: true,
  },
];
