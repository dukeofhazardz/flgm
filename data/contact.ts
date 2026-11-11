// Contact information from content.md (lines 567–596 / 719–748).
// Three enquiry numbers supplied. The official church email and YouTube channel
// were supplied later and are confirmed. Social links come from the shared
// `data/socials.ts` list so every surface renders the same four accounts.

import { SOCIALS } from "@/data/socials";

export const CONTACT = {
  address:
    "Forever Life and Grace Mission\nResurrection Ground, beside Davina Hills Resort, off 1st Avenue, Gwarinpa, Abuja, Nigeria.",
  phones: ["+234 808 959 9066", "+234 706 824 6902", "+234 803 705 5043"],
  email: "Flgm.grace@gmail.com",
  emailConfirmed: true,
  serviceTimes: [
    {
      id: "svm",
      day: "Sunday",
      name: "School of Vision and Mission",
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
        note: "Sunday worship begins at 8:00 AM with School of Vision and Mission, and continues at 9:30 AM with the Combined Celebration Service. Midweek prayer meets on Thursday at 5:45 PM.",
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
  // Legacy-shaped view of the shared list, kept so contact components and
  // structured data keep one source of truth.
  socials: SOCIALS.map((social) => ({
    platform: social.label,
    handle: social.handle,
    url: social.href,
    confirmed: true,
  })),
  youtubeConfirmed: true,
  mapVerified: false, // Google Maps pin requires verification before publication
  confirmed: true,
} as const;
