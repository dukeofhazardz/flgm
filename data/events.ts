// Church events from content.md (lines 425–468).
// All times Abuja local time (WAT, UTC+1). Carol Service time and First Fruit
// daily schedule are unconfirmed. First Fruit end date corrected to
// 8 January 2027 per the Date Correction block (awaiting Chief Pastor approval).

export const EVENTS = [
  {
    id: "watch-and-pray",
    title: "Watch and Pray Strategic Prayer and Testimony Outreach",
    date: "2026-11-11",
    time: "5:30 AM",
    endDate: "2026-12-30",
    category: "Daily Programme",
    description:
      "A 50-day prayer and digital outreach initiative featuring daily prayer, worship, testimonies, and online evangelism.",
    confirmed: true,
  },
  {
    id: "business-career-summit",
    title: "Business and Career Summit",
    date: "2026-11-28",
    time: "10:00 AM",
    category: "Conference",
    description:
      "A summit designed to inspire professional development, business growth, career advancement, entrepreneurship, and purposeful influence.",
    confirmed: true,
  },
  {
    id: "annual-harvest-thanksgiving",
    title: "Annual Harvest Thanksgiving, Church Building Fundraising and Ordination Service",
    date: "2026-12-05",
    time: "10:00 AM",
    category: "Annual Celebration",
    description:
      "A special celebration of thanksgiving, church building vision, ministry partnership, and ordination.",
    confirmed: true,
  },
  {
    id: "carol-service",
    title: "FLGM Carol Service",
    date: "2026-12-17",
    time: "Details coming soon", // Carol Service time to be confirmed — unconfirmed
    category: "Christmas Celebration",
    description:
      "A celebration of the birth of Jesus Christ through worship, Christmas carols, Scripture, and fellowship.",
    confirmed: false,
  },
  {
    id: "first-fruit-worship",
    title: "First Fruit Worship",
    date: "2026-12-31",
    time: "Details coming soon", // First Fruit Worship daily schedule to be confirmed — unconfirmed
    endDate: "2027-01-08", // Date Correction: 31 Dec 2026 – 8 Jan 2027, pending Chief Pastor confirmation
    category: "New Year Worship",
    description:
      "A special season of worship and spiritual dedication as the church enters a new year.",
    confirmed: false,
  },
] as const;
