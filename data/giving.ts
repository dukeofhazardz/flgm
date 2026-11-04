// Giving from content.md (lines 493–539).
// Exact bank details supplied by the church. A payment gateway must not be
// presented as operational until approved, integrated, and tested — confirmed:false.

export const GIVING = {
  hero: {
    titleLines: ["Giving", "with Grace.", "Building for", "Generations."],
    lead: "At Forever Life and Grace Mission, we believe that giving is an expression of gratitude, partnership, and commitment to the work of God’s Kingdom.",
    body: "We invite members, friends, partners, and well-wishers to participate in the ministry’s vision through voluntary giving and approved church contributions.",
    support:
      "Your generosity supports the advancement of the Gospel, ministry activities, spiritual development, and the Church Building Project.",
  },
  accountName: "Forever Life And Grace Mission",
  bank: "Moniepoint MFB",
  accountNumber: "6023762744",
  building: {
    heading: "A Vision for a 1,000-Capacity Auditorium",
    lead: "The FLGM Church Building Project is a vision to establish a 1,000-capacity auditorium in Gwarinpa, Abuja.",
    body: "The project seeks to provide a suitable place for worship, discipleship, conferences, ministry gatherings, and the advancement of God’s Kingdom.",
    invitation: "Join us in advancing this vision through prayer, partnership, and voluntary giving.",
    contributors: [
      "Church members and families",
      "Business owners and entrepreneurs",
      "Friends and well-wishers",
      "Sons and daughters of the ministry in the diaspora",
      "Pastors and ministry partners",
      "Government officials and institutional partners",
    ],
  },
  categories: [
    "Tithes",
    "Offerings",
    "Church Building Project",
    "Harvest Thanksgiving",
    "Missions and Evangelism",
    "Special Church Programmes",
    "General Ministry Support",
  ],
  notice:
    "All contributions are voluntary and should be made through officially approved church channels.",
  // All contributions voluntary; made through officially approved church channels.
  secureGatewayPending: true,
  // The displayed Moniepoint account is church-supplied. Not yet confirmed as an
  // operational online payment gateway — confirmed:false.
  confirmed: false,
} as const;
