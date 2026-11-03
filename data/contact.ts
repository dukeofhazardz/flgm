// Contact information from content.md (lines 567–596 / 719–748).
// Three enquiry numbers supplied. Official email address is missing
// ("Insert official church email address" — line 124) — emailConfirmed: false.
// YouTube URL is unconfirmed (confirmed:false); tracking parameters stripped
// from the supplied social links.
// Instagram link supplied under YouTube was an mislabelling (line 592) — placed
// under Instagram here; actual YouTube URL still needed.

export const CONTACT = {
  address:
    "Forever Life and Grace Mission\nResurrection Ground, beside Davina Hills Resort, off 1st Avenue, Gwarinpa, Abuja, Nigeria.",
  phones: ["08089599066", "0706 824 6902", "+234 803 705 5043"],
  email: null, // not supplied in content.md — insert official church email address
  emailConfirmed: false,
  socials: [
    {
      platform: "Instagram",
      handle: "Forever Life Church",
      url: "https://www.instagram.com/foreverlifechurch",
      confirmed: true,
    },
    {
      platform: "Facebook",
      handle: "Forever Life & Grace Mission Family",
      url: "https://www.facebook.com/share/1G6hvmTPcE/",
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
      url: null, // YouTube channel link to be confirmed — confirmed:false
      confirmed: false,
    },
  ] as const,
  youtubeConfirmed: false,
  mapVerified: false, // Google Maps pin requires verification before publication
  confirmed: true,
} as const;
