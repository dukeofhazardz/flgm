// Leadership from content.md (lines 95–109 / 293–310).
// STRUCTURE ONLY. No names, photographs, or biographies are invented.
// The leadership directory requires Chief Pastor approval — confirmed:false.

export const LEADERSHIP_ROLES = [
  {
    id: "chief-pastor",
    title: "Chief Pastor",
    description:
      "Provides spiritual oversight, direction, and leadership for the ministry, ensuring that the church remains aligned with its divine mandate and doctrinal foundations.",
    confirmed: false,
  },
  {
    id: "executive-secretary",
    title: "Church Executive Secretary",
    description:
      "Coordinates church administration, official correspondence, records, communication, programmes, committee activities, documentation, and follow-up.",
    confirmed: false,
  },
  {
    id: "ministry-departments",
    title: "Ministry and Departmental Leadership",
    description:
      "The church operates through ministry leaders, departmental coordinators, fellowship leaders, and dedicated members who contribute to the spiritual and administrative life of the ministry.",
    confirmed: false,
  },
] as const;

export const LEADERSHIP_DIRECTORY_CONFIRMED = false;

export const LEADERSHIP_DEPARTMENTS = [
  "Evangelism and Outreach",
  "In-house Group Fellowship",
  "House Fellowship and Peter's Boat House Fellowship",
  "School of Vision and Mission",
  "Church Media and Communications",
  "Watch and Pray Committee",
  "Ministry and Departmental Coordination",
  "Church Planning and Building Project Committee",
] as const;
