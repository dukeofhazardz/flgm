// Navigation menu. Follows the proposed menu in content.md (lines 182–191)
// plus the Volunteer page (Evangelism and Discipleship, lines 849–1017).
// No invented items; nothing here requires external confirmation.

export const NAV_ITEMS = [
  { id: "home", label: "Home", href: "/", confirmed: true },
  { id: "about", label: "About Us", href: "/about", confirmed: true },
  { id: "watch-and-pray", label: "Watch and Pray", href: "/watch-and-pray", confirmed: true },
  { id: "sermons", label: "Sermons & Messages", href: "/sermons", confirmed: true },
  { id: "events", label: "Events & Programmes", href: "/events", confirmed: true },
  { id: "give", label: "Online Giving", href: "/give", confirmed: true },
  { id: "prayer", label: "Prayer & Counselling", href: "/prayer", confirmed: true },
  { id: "contact", label: "Contact", href: "/contact", confirmed: true },
  { id: "new-members", label: "New Members", href: "/new-members", confirmed: true },
  { id: "volunteer", label: "Volunteer", href: "/volunteer", confirmed: true },
] as const;

export type NavId = (typeof NAV_ITEMS)[number]["id"];
