// Sermons and messages from content.md (lines 383–420).
// The archive is intentionally empty at launch. No title, speaker, date,
// Scripture reference, description, or video ID is invented. The data model is
// ready for the church's approved media as soon as it is supplied.

export type SermonCategoryId =
  | "grace-and-sonship"
  | "eternal-life"
  | "kingdom-influence"
  | "faith-building"
  | "prophetic-messages"
  | "youth-and-children"
  | "watch-and-pray"
  | "special-programmes";

export interface SermonCategory {
  id: SermonCategoryId;
  label: string;
  description: string;
}

/** The eight categories published in content.md lines 390–399. */
export const SERMON_CATEGORIES: SermonCategory[] = [
  {
    id: "grace-and-sonship",
    label: "Grace and Sonship",
    description: "Messages on God’s grace, sonship, and identity in Christ.",
  },
  {
    id: "eternal-life",
    label: "Eternal Life",
    description: "Teachings on the life of God in the believer.",
  },
  {
    id: "kingdom-influence",
    label: "Kingdom Influence",
    description: "Spiritual maturity, dominion, and purpose.",
  },
  {
    id: "faith-building",
    label: "Faith Building",
    description: "Messages that strengthen spiritual understanding and faith.",
  },
  {
    id: "prophetic-messages",
    label: "Prophetic Messages",
    description: "Approved prophetic teachings and exhortations.",
  },
  {
    id: "youth-and-children",
    label: "Youth and Children",
    description: "SVM teachings and ministry resources.",
  },
  {
    id: "watch-and-pray",
    label: "Watch and Pray",
    description: "Daily prayer sessions and recordings.",
  },
  {
    id: "special-programmes",
    label: "Special Programmes",
    description: "Conference messages, celebrations, and church events.",
  },
];

export interface Sermon {
  id: string;
  title: string;
  speaker: string;
  speakerRole: string;
  /** ISO date, e.g. 2026-11-11. */
  date: string;
  service: string;
  scripture: string[];
  description: string;
  category: SermonCategoryId;
  /** YouTube video ID for the lite embed. Null when only audio exists. */
  youtubeId: string | null;
  audioUrl: string | null;
  transcriptUrl: string | null;
  confirmed: boolean;
}

/**
 * Zero entries at launch. Add approved sermons here; every record must carry
 * `confirmed: true` before it can render publicly.
 */
export const SERMONS: Sermon[] = [];

/** The featured message slot. Null until the church approves the first one. */
export const FEATURED_SERMON: Sermon | null = null;
