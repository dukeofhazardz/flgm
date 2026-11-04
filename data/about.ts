// About page content from content.md (lines 49–109 / 243–310).
// Public copy only. The history timeline is a designed slot, but no milestone
// is invented: it stays hidden until the church confirms dates and events.

import type { ArtName } from "@/components/ui/art-slot";

export const ABOUT_HERO = {
  kicker: "Who we are",
  folio: "The Daybreak Edition / About",
  pullQuote: ["A House", "of Grace.", "A People", "of Purpose."],
  paragraphs: [
    "Forever Life and Grace Mission (FLGM) is a Christ-centred ministry committed to the revelation of God’s grace, eternal life, sonship, spiritual growth, and Kingdom influence.",
    "We are a community of believers who recognise that the Christian life is founded on the finished work of Jesus Christ and the reality of God’s life in those who believe.",
    "Our ministry emphasises spiritual understanding, personal transformation, fellowship, discipleship, evangelism, and Kingdom influence.",
    "We believe every believer has a divine purpose and is called to manifest the life, wisdom, and character of God in every sphere of life.",
  ],
  art: "stairs" as ArtName,
} as const;

export const ABOUT_HISTORY = {
  paragraphs: [
    "Forever Life and Grace Mission was established as a ministry dedicated to the revelation of God’s grace and eternal life in Jesus Christ.",
    "Over the years, the ministry has continued to pursue its mandate of raising believers in spiritual understanding, sonship, and Kingdom influence through teaching, worship, prayer, fellowship, and evangelism.",
    "Through its ministry expressions, FLGM seeks to strengthen believers, nurture children and young people, build godly relationships, and extend the message of God’s grace to communities and beyond.",
    "Our journey continues with a commitment to spiritual growth, discipleship, evangelism, and the establishment of a strong church community.",
  ],
} as const;

export interface HistoryMilestone {
  id: string;
  year: string;
  title: string;
  body: string;
}

/**
 * The timeline slot. It is intentionally empty and gated: the public page
 * must not imply a founding year, founder, milestone, or achievement that the
 * church has not confirmed. Add records here only after written approval, then
 * switch HISTORY_CONFIRMED to true.
 */
export const HISTORY_TIMELINE_CONFIRMED = false;
export const HISTORY_TIMELINE: HistoryMilestone[] = [];

export interface VisionCard {
  id: string;
  number: string;
  label: string;
  statement: string;
  tone: "green" | "white" | "mist" | "forest" | "ink";
}

export const VISION_CARDS: VisionCard[] = [
  {
    id: "vision",
    number: "01",
    label: "Our vision",
    statement:
      "To raise a people established in the revelation of God’s grace and eternal life, manifesting sonship, dominion, spiritual maturity, and Kingdom influence in every sphere of life.",
    tone: "green",
  },
  {
    id: "identity",
    number: "02",
    label: "A generation that knows",
    statement: "Understand and live from their identity as sons of God.",
    tone: "white",
  },
  {
    id: "grace",
    number: "03",
    label: "A generation established",
    statement:
      "Are established in the knowledge of God’s grace and eternal life.",
    tone: "mist",
  },
  {
    id: "maturity",
    number: "04",
    label: "A generation formed",
    statement: "Demonstrate spiritual maturity and the character of Christ.",
    tone: "white",
  },
  {
    id: "dominion",
    number: "05",
    label: "A generation of influence",
    statement:
      "Exercise dominion and influence in their families, communities, and society.",
    tone: "forest",
  },
  {
    id: "kingdom",
    number: "06",
    label: "A generation sent",
    statement:
      "Participate actively in evangelism, discipleship, and the advancement of God’s Kingdom.",
    tone: "ink",
  },
];

export interface DirectoryEntry {
  id: string;
  office: string;
  title: string;
  name: string | null;
  photograph: string | null;
  responsibility: string;
  confirmed: boolean;
}

/**
 * The directory is a finished grid waiting for approved records. No name,
 * title, photograph, or biography is invented. `confirmed` stays false until
 * the Chief Pastor approves the entry.
 */
export const LEADERSHIP_DIRECTORY: DirectoryEntry[] = [
  {
    id: "chief-pastor",
    office: "Office of the Chief Pastor",
    title: "Chief Pastor",
    name: null,
    photograph: null,
    responsibility: "Spiritual oversight, direction, and doctrinal leadership.",
    confirmed: false,
  },
  {
    id: "executive-secretary",
    office: "Church Administration",
    title: "Church Executive Secretary",
    name: null,
    photograph: null,
    responsibility:
      "Administration, records, correspondence, programmes, and follow-up.",
    confirmed: false,
  },
  {
    id: "ministry-leadership",
    office: "Ministry and Departments",
    title: "Ministry and Departmental Leadership",
    name: null,
    photograph: null,
    responsibility:
      "Coordination of ministry, fellowship, outreach, media, and building work.",
    confirmed: false,
  },
];

/** Portfolio marks used by the directory's designed portrait slots. */
export const DIRECTORY_ART: ArtName[] = ["doorway", "sun", "stairs"];
