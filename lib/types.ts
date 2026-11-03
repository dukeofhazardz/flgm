// Shared types for the FLGM content data layer.
// Every public content item carries a `confirmed` flag. Unconfirmed items
// (per CONTENT_MAP.md / DESIGN.md) must be hidden or shown as a tasteful
// "Details coming soon" state via the <Pending> component. Nothing is invented.

export interface ContentItem {
  id: string;
  confirmed: boolean;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  confirmed: boolean;
}

export interface Programme {
  id: string;
  name: string;
  description: string;
  day: string;
  time: string;
  confirmed: boolean;
}

export interface Event {
  id: string;
  title: string;
  date: string; // ISO date (YYYY-MM-DD), Abuja local time (WAT, UTC+1)
  time: string;
  category: string;
  description: string;
  endDate?: string;
  confirmed: boolean;
}

export interface Belief {
  id: string;
  title: string;
  description: string;
  confirmed: boolean;
}

export interface MissionItem {
  id: string;
  description: string;
  confirmed: boolean;
}

export interface LeadershipRole {
  id: string;
  title: string;
  description: string;
  confirmed: boolean;
}

export interface GivingInfo {
  accountName: string;
  bank: string;
  accountNumber: string;
  categories: string[];
  secureGatewayPending: boolean;
  confirmed: boolean;
}

export interface SocialLink {
  platform: string;
  handle: string;
  url: string;
  confirmed: boolean;
}

export interface ContactInfo {
  address: string;
  phones: string[];
  email: string | null;
  emailConfirmed: boolean;
  socials: SocialLink[];
  youtubeConfirmed: boolean;
  confirmed: boolean;
}

export interface ChurchInfo {
  name: string;
  tagline: string;
  identityLine: string;
  address: string;
  confirmed: boolean;
}

export interface WatchAndPrayInfo {
  programme: string;
  periodStart: string;
  periodEnd: string;
  dailyTime: string; // 5:30 AM WAT
  theme: string;
  objectives: string[];
  confirmed: boolean;
}
