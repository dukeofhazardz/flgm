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
  serviceTimes: [
    {
      id: "svm",
      day: "Sunday",
      name: "Sonship and Victory Ministry",
      time: "8:00 AM",
      confirmed: true,
    },
    {
      id: "celebration",
      day: "Sunday",
      name: "Combined Celebration Service",
      time: "9:30 AM",
      confirmed: true,
    },
    {
      id: "midweek",
      day: "Thursday",
      name: "Prophetic Prayer and Faith Building",
      time: "5:45 PM",
      confirmed: true,
    },
  ],
  visit: {
    lead: "We welcome you to visit us, worship with us, participate in our programmes, and become part of our church family.",
    close: "Thank you for visiting. We look forward to welcoming you in person.",
    steps: [
      {
        id: "choose",
        title: "Choose a gathering",
        note: "Sunday worship begins at 8:00 AM with Sonship and Victory Ministry, and continues at 9:30 AM with the Combined Celebration Service. Midweek prayer meets on Thursday at 5:45 PM.",
      },
      {
        id: "find",
        title: "Find Resurrection Ground",
        note: "We are beside Davina Hills Resort, off 1st Avenue, Gwarinpa, Abuja. Use the directions card on this page and allow time for arrival.",
      },
      {
        id: "meet",
        title: "Meet the church family",
        note: "Whether you are visiting for the first time, seeking spiritual guidance, or looking for a place to worship and fellowship, we would be delighted to connect with you.",
      },
    ],
  },
  map: {
    // The pin still requires verification before publication (content.md line 596).
    query:
      "Forever Life and Grace Mission, Resurrection Ground, beside Davina Hills Resort, off 1st Avenue, Gwarinpa, Abuja, Nigeria",
    verified: false,
  },
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
