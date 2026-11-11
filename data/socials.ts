// The church's published social accounts. One source for every link, so the
// icon, label and destination stay consistent across the site.
//
// Only accounts with a real, supplied URL live here. Nothing is invented.

export type SocialId = "instagram" | "facebook" | "tiktok" | "youtube";

export interface SocialAccount {
  id: SocialId;
  /** Human-readable platform name. */
  label: string;
  /** The handle or account name shown beneath the label. */
  handle: string;
  /** Canonical profile URL. */
  href: string;
}

export const SOCIALS: readonly SocialAccount[] = [
  {
    id: "instagram",
    label: "Instagram",
    handle: "Forever Life Church",
    href: "https://www.instagram.com/foreverlifechurch",
  },
  {
    id: "facebook",
    label: "Facebook",
    handle: "Forever Life & Grace Mission Family",
    href: "https://www.facebook.com/share/1G6hvmTPcE/",
  },
  {
    id: "tiktok",
    label: "TikTok",
    handle: "@foreverlife.church",
    href: "https://www.tiktok.com/@foreverlife.church",
  },
  {
    id: "youtube",
    label: "YouTube",
    handle: "@flgm2023",
    href: "https://youtube.com/@flgm2023?si=NPkx2AVFzoUFNFVZ",
  },
] as const;
