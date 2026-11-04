// Watch and Pray from content.md (lines 312–382).
// Core programme facts (dates, time, theme, objectives) are confirmed.
// Daily themes are a proposed framework only — `approved: false` everywhere.
// The YouTube channel/livestream URL is unconfirmed (confirmed: false), so it is
// never rendered publicly. The media-team directory is supplied but not yet
// approved for publication (approved: false) and is therefore gated in the UI.

export interface WapSocial {
  platform: "Facebook" | "Instagram" | "TikTok" | "YouTube";
  handle: string;
  url: string | null;
  confirmed: boolean;
}

export interface WapThemeCategory {
  id: string;
  title: string;
  description: string;
  /** Internal approval flag. Never printed as "proposed" on the public page. */
  confirmed: boolean;
  proposed: true;
}

export interface WapScheduleRow {
  activity: string;
  time: string;
  confirmed: boolean;
}

export interface WapRecording {
  id: string;
  date: string;
  title: string;
  youtubeId: string | null;
  confirmed: boolean;
}

export interface WapCommunityPlatform {
  platform: "Facebook" | "Instagram" | "TikTok" | "YouTube";
  target: number;
  team: readonly string[];
  confirmed: boolean;
  /** Team names are internal until the committee directory is approved. */
  teamApproved: boolean;
}

export interface WapObjective {
  n: string;
  statement: string;
  confirmed: boolean;
}

export const WATCH_AND_PRAY = {
  programme: "Watch and Pray Strategic Prayer and Testimony Outreach",
  shortName: "Watch and Pray",
  periodStart: "2026-11-11",
  periodEnd: "2026-12-30",
  periodLabel: "11 November — 30 December 2026",
  dailyTime: "5:30 AM",
  dailyTime24: "05:30",
  durationDays: 50,
  theme: "Reaching Lives. Revealing Grace. Manifesting the Life of God.",

  about: [
    "The FLGM Watch and Pray initiative is a strategic prayer, worship, and testimony outreach designed to extend the message of God’s grace, eternal life, and Kingdom influence through digital platforms and personal evangelism.",
    "The programme brings together church members and ministry teams to participate in daily prayer, spiritual engagement, testimonies, and online outreach.",
    "Through this initiative, we seek to reach individuals and families in Abuja and beyond, strengthen believers, restore hope, and create opportunities for people to encounter the life and grace of God.",
  ],

  objectives: [
    {
      n: "01",
      statement: "Establish a consistent culture of prayer and spiritual watchfulness.",
      confirmed: true,
    },
    {
      n: "02",
      statement: "Reach people across Abuja, Nigeria, and beyond.",
      confirmed: true,
    },
    {
      n: "03",
      statement: "Share testimonies of God’s grace and transforming power.",
      confirmed: true,
    },
    {
      n: "04",
      statement: "Encourage members to participate in digital evangelism.",
      confirmed: true,
    },
    {
      n: "05",
      statement: "Build and strengthen the church’s online community.",
      confirmed: true,
    },
    {
      n: "06",
      statement: "Expand FLGM’s presence across social media platforms.",
      confirmed: true,
    },
  ] satisfies readonly WapObjective[],

  schedule: [
    { activity: "Daily Watch and Pray", time: "5:30 AM", confirmed: true },
    {
      activity: "Worship and spiritual preparation",
      time: "During the prayer session",
      confirmed: true,
    },
    { activity: "Prayer and intercession", time: "During the prayer session", confirmed: true },
    {
      activity: "Word, exhortation, or daily theme",
      time: "During the prayer session",
      confirmed: true,
    },
    { activity: "Testimonies and outreach", time: "As scheduled", confirmed: true },
    { activity: "Online engagement and follow-up", time: "Throughout the day", confirmed: true },
  ] satisfies readonly WapScheduleRow[],

  // The five categories are internally proposed (`confirmed: false`).
  // Public UI presents them as the prayer themes, never as "proposed".
  themesApproved: false,
  themeCategories: [
    {
      id: "grace-and-sonship",
      title: "Grace and Sonship",
      description:
        "Understanding our identity, inheritance, and position in Christ.",
      confirmed: false,
      proposed: true,
    },
    {
      id: "eternal-life-and-spiritual-growth",
      title: "Eternal Life and Spiritual Growth",
      description: "Growing in the knowledge and expression of God’s life.",
      confirmed: false,
      proposed: true,
    },
    {
      id: "church-growth-and-evangelism",
      title: "Church Growth and Evangelism",
      description: "Reaching people, raising disciples, and advancing the Gospel.",
      confirmed: false,
      proposed: true,
    },
    {
      id: "families-and-community",
      title: "Families and Community",
      description:
        "Spiritual growth, peace, unity, and the manifestation of God’s grace in families.",
      confirmed: false,
      proposed: true,
    },
    {
      id: "kingdom-influence-and-nations",
      title: "Kingdom Influence and Nations",
      description:
        "The influence of God’s life and wisdom in communities, institutions, and nations.",
      confirmed: false,
      proposed: true,
    },
  ] satisfies readonly WapThemeCategory[],

  // No per-day theme text may be published until the committee approves it.
  // The ledger checks both flags before rendering any theme under a date.
  dailyThemes: {
    approved: false,
    byDay: {} as Record<number, string>,
  },

  socials: [
    {
      platform: "Facebook",
      handle: "Forever Life & Grace Mission Family",
      url: "https://www.facebook.com/share/1G6hvmTPcE/",
      confirmed: true,
    },
    {
      platform: "Instagram",
      handle: "Forever Life Church",
      url: "https://www.instagram.com/foreverlifechurch",
      confirmed: true,
    },
    {
      platform: "TikTok",
      handle: "@foreverlife.church",
      url: "https://www.tiktok.com/@foreverlife.church",
      confirmed: true,
    },
    {
      platform: "YouTube",
      handle: "Official YouTube channel",
      url: null,
      confirmed: false,
    },
  ] satisfies readonly WapSocial[],

  youtube: {
    confirmed: false,
    channelUrl: null,
    liveUrl: null,
    playlistId: null,
  },

  // The archive is deliberately empty until the first approved recording exists.
  recordings: [] as readonly WapRecording[],
  archiveStructure: [
    "Date",
    "Daily Theme",
    "Prayer Recording",
    "Scripture",
    "Testimony",
    "Resources",
  ],

  community: {
    totalGoal: 12000,
    label: "Overall digital community target",
    platforms: [
      {
        platform: "Facebook",
        target: 3000,
        team: [
          "Min. Merryclara Damsa",
          "Bro. Santino Onyekachukwu",
          "Bro. Chibuzor Chinwuba",
        ],
        confirmed: true,
        teamApproved: false,
      },
      {
        platform: "Instagram",
        target: 3000,
        team: [
          "Bro. Excellent Onyekachukwu",
          "Sis. Onyinyechi Omah",
          "Bro. Dozie Egwu",
          "Bro. Walter",
        ],
        confirmed: true,
        teamApproved: false,
      },
      {
        platform: "TikTok",
        target: 3000,
        team: [
          "Bro. Goodnews Kliya",
          "Bro. Joseph Nenge Bature",
          "Sis. Ginika Mgbakogu",
          "Bro. Daniel Nnaemeka John",
        ],
        confirmed: true,
        teamApproved: false,
      },
      {
        platform: "YouTube",
        target: 3000,
        team: [
          "Bro. John Ahonye",
          "Bro. Auta Emmanuel",
          "Bro. Nnaemeka Omah",
          "Sis. Queeneth Uzomba",
        ],
        confirmed: true,
        teamApproved: false,
      },
    ] satisfies readonly WapCommunityPlatform[],
  },

  // Supplied by the committee but NOT approved for publication yet.
  // The page reads `approved` before rendering a single name.
  mediaTeam: {
    approved: false,
    credits: [
      { role: "Website Development", names: ["Bro. Nnaemeka John", "Bro. Lotanna Otikpo"] },
      { role: "Watch and Pray Committee", names: ["The appointed committee members"] },
      { role: "Media Team", names: ["Broadcast, recording, content production, and digital outreach personnel"] },
    ],
  },
} as const;

export type WatchAndPrayData = typeof WATCH_AND_PRAY;
