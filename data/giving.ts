// Giving from content.md (lines 493–539).
// Exact bank details supplied by the church. A payment gateway must not be
// presented as operational until approved, integrated, and tested — confirmed:false.

export const GIVING = {
  accountName: "Forever Life And Grace Mission",
  bank: "Moniepoint MFB",
  accountNumber: "6023762744",
  categories: [
    "Tithes",
    "Offerings",
    "Church Building Project",
    "Harvest Thanksgiving",
    "Missions and Evangelism",
    "Special Church Programmes",
    "General Ministry Support",
  ],
  // All contributions voluntary; made through officially approved church channels.
  secureGatewayPending: true,
  // The displayed Moniepoint account is church-supplied. Not yet confirmed as an
  // operational online payment gateway — confirmed:false.
  confirmed: false,
} as const;
