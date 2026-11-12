// Church identity. All public copy from content.md; nothing invented.

export const CHURCH: {
  name: string;
  tagline: string;
  identityLine: string;
  address: string;
  confirmed: boolean;
} = {
  name: "Forever Life and Grace Mission",
  tagline: "We Get Better Every Day!",
  identityLine: "A House of Grace. A People of Purpose.",
  address:
    "Resurrection Ground, beside Davina Hills Resort, off 1st Avenue, Gwarinpa, Abuja, Nigeria.",
  confirmed: true,
};

/**
 * The home hero's opening statement. Kept in the data layer so the headline
 * and subtext can be revised without touching layout code.
 */
export const HOME_HERO = {
  headline: "ALL THINGS WORKING TOGETHER FOR GOOD",
  subtext:
    "Discover the path to purpose and spiritual growth with Pastor Hephzibah Julia.",
} as const;
