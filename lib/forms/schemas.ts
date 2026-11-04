import { z } from "zod";
import {
  CONTACT_FORM,
  NEW_MEMBERS,
  PRAYER,
  VOLUNTEER,
  type FormKind,
} from "@/data/forms";

/**
 * One validation module for every public form.
 *
 * The route handler and the client submit handler both use these schemas, so a
 * form can never be accepted by the browser and rejected by the server for a
 * different reason. All string fields are trimmed and bounded; no field is
 * silently invented on the server.
 */

const optionalText = (max: number) =>
  z.string().trim().max(max).optional().or(z.literal(""));

const optionalEmail = z
  .string()
  .trim()
  .max(180)
  .refine(
    (value) => value === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    "Enter a valid email address."
  )
  .optional()
  .or(z.literal(""));

const phone = z
  .string()
  .trim()
  .min(7, "Enter a phone number we can reach you on.")
  .max(24, "That phone number is too long.")
  .regex(/^[+0-9()\s-]+$/, "Use digits, spaces, or a leading + only.");

const consent = z
  .boolean()
  .refine((value) => value === true, "Please confirm before sending.");

export const prayerSchema = z.object({
  name: optionalText(120),
  contact: optionalText(180),
  requestType: z.enum(PRAYER.form.requestTypes),
  message: z
    .string()
    .trim()
    .min(10, "Please share a little more so the team can pray with you.")
    .max(5000, "Please keep your request under 5,000 characters."),
  consent,
});

export const newMemberSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(120, "That name is too long."),
  phone,
  email: optionalEmail,
  descriptor: z.enum(NEW_MEMBERS.form.descriptors),
  interests: z.array(z.enum(NEW_MEMBERS.form.interests)).max(6).default([]),
  followUp: z.enum(NEW_MEMBERS.form.followUp),
});

export const volunteerSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "Please enter your first name.")
    .max(80, "That name is too long."),
  lastName: z
    .string()
    .trim()
    .min(1, "Please enter your last name.")
    .max(80, "That name is too long."),
  phone,
  email: optionalEmail,
  membership: z.enum(VOLUNTEER.form.membership),
  serviceArea: z.enum(VOLUNTEER.form.serviceAreas),
  experience: z.enum(VOLUNTEER.form.experience),
  skills: z.array(z.enum(VOLUNTEER.form.skills)).max(10).default([]),
  availability: z.enum(VOLUNTEER.form.availability),
  motivation: optionalText(2000),
  consent,
});

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(120, "That name is too long."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address.")
    .max(180, "That email address is too long.")
    .refine(
      (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      "Enter a valid email address."
    ),
  enquiryType: z.enum(CONTACT_FORM.enquiryTypes),
  message: z
    .string()
    .trim()
    .min(10, "Please add a little more detail.")
    .max(5000, "Please keep your message under 5,000 characters."),
});

export const FORM_SCHEMAS = {
  prayer: prayerSchema,
  "new-members": newMemberSchema,
  volunteer: volunteerSchema,
  contact: contactSchema,
} as const;

export function isFormKind(value: string): value is FormKind {
  return Object.prototype.hasOwnProperty.call(FORM_SCHEMAS, value);
}

export function parseForm(kind: FormKind, payload: unknown) {
  return FORM_SCHEMAS[kind].safeParse(payload);
}

export type PrayerValues = z.infer<typeof prayerSchema>;
export type NewMemberValues = z.infer<typeof newMemberSchema>;
export type VolunteerValues = z.infer<typeof volunteerSchema>;
export type ContactValues = z.infer<typeof contactSchema>;
