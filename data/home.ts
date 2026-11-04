// Home page content. Every line is drawn from content.md and lightly edited for
// scannability. Nothing is invented: no names, dates, statistics, or histories.
// Unconfirmed schedules remain flagged `confirmed: false`.

import type { ArtName } from "@/components/ui/art-slot";

/** content.md line 17 (Home) / line 211 (Vision). */
export const VISION_STATEMENT =
  "To raise a people established in the revelation of God’s grace and eternal life, manifesting sonship, dominion, spiritual maturity, and Kingdom influence in every sphere of life.";

export interface Pillar {
  id: string;
  word: string;
  line: string;
  art: ArtName;
  /** Folio inside the section, e.g. 01–04. */
  mark: string;
}

/** The four themes that recur through the vision, beliefs, and mission. */
export const PILLARS: Pillar[] = [
  {
    id: "grace",
    word: "Grace",
    line: "Salvation and our standing before God are established through His grace and the finished work of Jesus Christ.",
    art: "sun",
    mark: "01",
  },
  {
    id: "eternal-life",
    word: "Eternal Life",
    line: "Eternal life is the life of God received through Jesus Christ, and believers are called to live in its reality.",
    art: "stairs",
    mark: "02",
  },
  {
    id: "sonship",
    word: "Sonship",
    line: "Those in Christ are new creations, and have received the identity and privilege of sons of God.",
    art: "doorway",
    mark: "03",
  },
  {
    id: "kingdom-influence",
    word: "Kingdom Influence",
    line: "The Church is called to proclaim the Gospel and influence the world with the values of His Kingdom.",
    art: "rays",
    mark: "04",
  },
];

/** Welcome letter — content.md lines 214–219. */
export const WELCOME = {
  salutation: "Dearly Beloved,",
  heading: "Welcome to Forever Life and Grace Mission",
  paragraphs: [
    "Welcome to Forever Life and Grace Mission, a place where the life of God is revealed, the grace of Jesus Christ is celebrated, and believers are established in their identity as sons of God.",
    "We are delighted to welcome you to our online home. Whether you are visiting for the first time, seeking spiritual understanding, desiring fellowship, or looking for a place to grow in faith, we are glad you are here.",
    "At FLGM, we believe that God’s grace is the foundation of our relationship with Him and that every believer has a divine purpose to fulfil. Our heart is to see you grow in spiritual understanding, experience the fullness of God’s life, and manifest His purpose in your everyday life.",
    "We invite you to worship with us, participate in our programmes, connect with our fellowship, and become part of a family committed to spiritual growth, evangelism, and Kingdom influence.",
    "Thank you for visiting. We look forward to welcoming you in person.",
  ],
  pullQuote: "We are glad you are here.",
} as const;

export interface WeekService {
  name: string;
  time: string;
  confirmed: boolean;
  /** Alpha Worship meets on the first Thursday only. */
  monthly?: boolean;
}

export interface WeekDay {
  id: string;
  day: string;
  short: string;
  services: WeekService[];
}

/** The week as published in content.md lines 28–41. Empty days stay empty. */
export const WEEK: WeekDay[] = [
  {
    id: "sun",
    day: "Sunday",
    short: "Sun",
    services: [
      { name: "Sonship and Victory Ministry", time: "8:00 AM", confirmed: true },
      { name: "Combined Celebration Service", time: "9:30 AM", confirmed: true },
    ],
  },
  { id: "mon", day: "Monday", short: "Mon", services: [] },
  { id: "tue", day: "Tuesday", short: "Tue", services: [] },
  { id: "wed", day: "Wednesday", short: "Wed", services: [] },
  {
    id: "thu",
    day: "Thursday",
    short: "Thu",
    services: [
      { name: "Midweek Prophetic Prayer and Faith Building", time: "5:45 PM", confirmed: true },
      {
        name: "Alpha Worship — Pulling Down the Jericho Wall",
        time: "Details coming soon",
        confirmed: false,
        monthly: true,
      },
    ],
  },
  { id: "fri", day: "Friday", short: "Fri", services: [] },
  { id: "sat", day: "Saturday", short: "Sat", services: [] },
];

export type StepTone = "green" | "forest" | "night" | "mist" | "white";

export interface NextStep {
  id: string;
  label: string;
  href: string;
  note: string;
  art: ArtName;
  tone: StepTone;
}

export const NEXT_STEPS: NextStep[] = [
  {
    id: "visit",
    label: "Plan Your Visit",
    href: "/contact",
    note: "Sundays at Resurrection Ground, Gwarinpa, Abuja.",
    art: "doorway",
    tone: "green",
  },
  {
    id: "family",
    label: "Join Our Church Family",
    href: "/new-members",
    note: "There is a place for you in the FLGM family.",
    art: "hands",
    tone: "forest",
  },
  {
    id: "watch",
    label: "Watch and Worship Online",
    href: "/sermons",
    note: "Messages, videos, livestreams, and testimonies.",
    art: "rays",
    tone: "night",
  },
  {
    id: "prayer",
    label: "Submit a Prayer Request",
    href: "/prayer",
    note: "Share your request with the church prayer and pastoral team.",
    art: "book",
    tone: "mist",
  },
  {
    id: "ministry",
    label: "Get Involved in Ministry",
    href: "/volunteer",
    note: "Serve through the ministry departments and fellowship.",
    art: "stairs",
    tone: "white",
  },
];

/**
 * Section fields. Text colour is always paired for contrast:
 * ink on green/mist/white, white on forest/night.
 */
export const STEP_FIELDS: Record<
  StepTone,
  { background: string; foreground: string; dark: boolean }
> = {
  green: { background: "#C9F5DA", foreground: "#07130D", dark: false },
  forest: { background: "#0B3B24", foreground: "#FFFFFF", dark: true },
  night: { background: "#04180F", foreground: "#FFFFFF", dark: true },
  mist: { background: "#F2F8F3", foreground: "#07130D", dark: false },
  white: { background: "#FFFFFF", foreground: "#07130D", dark: false },
};

/** Building project copy — content.md lines 236–241 / 498–501. */
export const BUILDING = {
  heading: "Building a House for Generations",
  lead: "Forever Life and Grace Mission is advancing its vision for a 1,000-capacity church auditorium in Gwarinpa, Abuja.",
  body: "The Church Building Project represents our commitment to creating a place where generations can worship, grow spiritually, receive the Word, and participate in the work of God’s Kingdom.",
  invitation:
    "Join us in advancing this vision through prayer, partnership, and voluntary giving.",
  capacity: 1000,
} as const;
