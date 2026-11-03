"use strict";

export { Hero } from "./hero";
export { VisionSection } from "./vision";
export { WelcomeSection } from "./welcome";
export { ProgrammesSection } from "./programmes";
export { BuildingProjectSection } from "./building-project";
export { NextStepSection } from "./next-step";
export { EventsTeaserSection } from "./events-teaser";

// Stub sections for pages not yet built.
export function HistoryStub() {
  return <section aria-label="Our history (unconfirmed — hidden until verified)" />;
}
export function BeliefsStub() {
  return <section aria-label="Our beliefs (proposed — pending Chief Pastor approval)" />;
}
export function LeadershipStub() {
  return <section aria-label="Leadership directory (unconfirmed — structure only)" />;
}
export function WatchAndPrayStub() {
  return <section aria-label="Watch and Pray programme" />;
}
export function SermonsStub() {
  return <section aria-label="Sermons and messages library" />;
}
export function EventsStub() {
  return <section aria-label="Events and programmes calendar" />;
}
export function GiveStub() {
  return <section aria-label="Online giving" />;
}
export function PrayerStub() {
  return <section aria-label="Prayer requests and counselling" />;
}
export function ContactStub() {
  return <section aria-label="Contact and location" />;
}
export function NewMembersStub() {
  return <section aria-label="New members and follow-up" />;
}
export function VolunteerStub() {
  return <section aria-label="Volunteer registration" />;
}
