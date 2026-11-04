"use client";

import * as React from "react";
import { useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { ArrowLeft } from "lucide-react";
import { VOLUNTEER } from "@/data/forms";
import { volunteerSchema, type VolunteerValues } from "@/lib/forms/schemas";
import { submitForm, useFormDelivery, type SubmitErrorCode } from "@/lib/forms/client";
import {
  CheckboxCards,
  Consent,
  DeliveryNotice,
  Field,
  FormAlert,
  FormProgress,
  RadioCards,
  SubmitButton,
  Textarea,
} from "@/components/forms/form-kit";
import { FormSuccess } from "@/components/forms/form-success";
import { Button } from "@/components/ui/button";

/**
 * VolunteerForm — three visible steps, a truthful progress rail, and a
 * rising-sun confirmation only after delivery succeeds.
 */

const STEPS = ["Personal", "Service", "Availability"] as const;

const STEP_FIELDS: Array<Array<keyof VolunteerValues>> = [
  ["firstName", "lastName", "phone", "email", "membership"],
  ["serviceArea", "experience", "skills"],
  ["availability", "motivation", "consent"],
];

export function VolunteerForm(): React.ReactElement {
  const delivery = useFormDelivery();
  const [step, setStep] = useState(0);
  const [sent, setSent] = useState(false);
  const [failure, setFailure] = useState<{ code: SubmitErrorCode; message: string } | null>(
    null
  );
  const panelRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    clearErrors,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<VolunteerValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      membership: "" as VolunteerValues["membership"],
      serviceArea: "" as VolunteerValues["serviceArea"],
      experience: "" as VolunteerValues["experience"],
      skills: [],
      availability: "" as VolunteerValues["availability"],
      motivation: "",
      consent: false,
    },
  });

  const values = useWatch({ control });

  const stepChecks: boolean[][] = [
    [
      Boolean(values.firstName?.trim()),
      Boolean(values.lastName?.trim()),
      Boolean(values.phone?.trim()),
      Boolean(values.membership),
    ],
    [Boolean(values.serviceArea), Boolean(values.experience)],
    [Boolean(values.availability), values.consent === true],
  ];

  const withinStep = stepChecks[step].filter(Boolean).length / stepChecks[step].length;
  const overall = Math.min(100, ((step + withinStep) / STEPS.length) * 100);

  function validateStep(nextStep: number): boolean {
    const parsed = volunteerSchema.safeParse(getValues());
    if (parsed.success) return true;

    const allowed = STEP_FIELDS[nextStep];
    const issues = parsed.error.issues.filter((issue) => {
      const field = issue.path[0];
      return typeof field === "string" && allowed.includes(field as keyof VolunteerValues);
    });

    if (issues.length === 0) return true;

    issues.forEach((issue) => {
      const field = issue.path[0];
      if (typeof field === "string") {
        setError(field as keyof VolunteerValues, { message: issue.message });
      }
    });
    return false;
  }

  function goNext() {
    clearErrors();
    if (!validateStep(step)) return;
    setStep((current) => Math.min(STEPS.length - 1, current + 1));
    scrollToTop();
  }

  function goBack() {
    clearErrors();
    setStep((current) => Math.max(0, current - 1));
    scrollToTop();
  }

  function scrollToTop() {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    panelRef.current?.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "start",
    });
  }

  async function onSubmit(raw: VolunteerValues) {
    setFailure(null);
    const parsed = volunteerSchema.safeParse(raw);
    if (!parsed.success) {
      parsed.error.issues.forEach((issue) => {
        const field = issue.path[0];
        if (typeof field === "string") {
          setError(field as keyof VolunteerValues, { message: issue.message });
        }
      });
      const issueFields = parsed.error.issues
        .map((issue) => String(issue.path[0] ?? ""))
        .filter(Boolean);
      if (issueFields.some((field) => STEP_FIELDS[0].includes(field as keyof VolunteerValues))) {
        setStep(0);
      } else if (
        issueFields.some((field) => STEP_FIELDS[1].includes(field as keyof VolunteerValues))
      ) {
        setStep(1);
      }
      return;
    }

    const result = await submitForm("volunteer", parsed.data);
    if (result.ok) {
      setSent(true);
      return;
    }

    if (result.fields) {
      Object.entries(result.fields).forEach(([field, messages]) => {
        if (messages?.[0]) {
          setError(field as keyof VolunteerValues, { message: messages[0] });
        }
      });
    }
    setFailure({ code: result.code, message: result.message });
  }

  if (sent) {
    return (
      <FormSuccess
        title={VOLUNTEER.form.successTitle}
        body={VOLUNTEER.form.successBody}
        reference="Volunteer registration received"
        resetLabel="Register another volunteer"
        onReset={() => {
          reset();
          setStep(0);
          setSent(false);
        }}
      />
    );
  }

  return (
    <div ref={panelRef} className="scroll-mt-28 bg-white p-5 md:p-8 lg:p-9">
      <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-ink/15 pb-4">
        <h2
          id="volunteer-form-title"
          className="max-w-[24ch] font-serif text-[clamp(1.7rem,3.2vw,2.5rem)] font-medium leading-[1.02] tracking-[-0.03em]"
        >
          {VOLUNTEER.form.heading}
        </h2>
        <p className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-ink/40">
          Evangelism &amp; discipleship
        </p>
      </div>

      <p className="mt-4 max-w-[54ch] font-sans text-[15px] leading-[1.6] text-ink/60">
        {VOLUNTEER.form.lead}
      </p>

      <DeliveryNotice visible={delivery === "not_configured"} />

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        aria-labelledby="volunteer-form-title"
        className="mt-6 space-y-6"
      >
        <FormProgress
          value={overall}
          steps={STEPS}
          currentStep={step}
        />

        {failure ? <FormAlert code={failure.code} message={failure.message} /> : null}

        <div key={step} className="panel-in space-y-6">
          {step === 0 ? (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="First name"
                  registration={register("firstName")}
                  error={errors.firstName?.message}
                  autoComplete="given-name"
                />
                <Field
                  label="Last name"
                  registration={register("lastName")}
                  error={errors.lastName?.message}
                  autoComplete="family-name"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Phone number"
                  type="tel"
                  inputMode="tel"
                  registration={register("phone")}
                  error={errors.phone?.message}
                  autoComplete="tel"
                />
                <Field
                  label="Email address"
                  type="email"
                  inputMode="email"
                  registration={register("email")}
                  error={errors.email?.message}
                  autoComplete="email"
                  optional
                />
              </div>

              <RadioCards
                legend="Are you currently a member of FLGM?"
                registration={register("membership")}
                options={VOLUNTEER.form.membership}
                error={errors.membership?.message}
                columns={1}
              />
            </>
          ) : null}

          {step === 1 ? (
            <>
              <RadioCards
                legend="Preferred area of service"
                registration={register("serviceArea")}
                options={VOLUNTEER.form.serviceAreas}
                error={errors.serviceArea?.message}
                columns={1}
              />

              <RadioCards
                legend="Previous experience"
                registration={register("experience")}
                options={VOLUNTEER.form.experience}
                error={errors.experience?.message}
                columns={1}
              />

              <CheckboxCards
                legend="Skills or areas of interest"
                name="skills"
                options={VOLUNTEER.form.skills}
                register={register}
              />
            </>
          ) : null}

          {step === 2 ? (
            <>
              <RadioCards
                legend="Preferred availability"
                registration={register("availability")}
                options={VOLUNTEER.form.availability}
                error={errors.availability?.message}
                columns={1}
              />

              <Textarea
                label="Why would you like to serve in evangelism and discipleship?"
                registration={register("motivation")}
                error={errors.motivation?.message}
                rows={5}
                optional
              />

              <Consent registration={register("consent")} error={errors.consent?.message}>
                {VOLUNTEER.form.consent}
              </Consent>
            </>
          ) : null}
        </div>

        <div className="flex flex-col gap-3 border-t border-ink/12 pt-5 sm:flex-row sm:items-center">
          {step > 0 ? (
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={goBack}
              className="min-h-[56px] sm:w-auto"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
              Back
            </Button>
          ) : null}

          {step < STEPS.length - 1 ? (
            <Button
              type="button"
              size="lg"
              variant="brand"
              onClick={goNext}
              className="min-h-[56px] flex-1 justify-between px-6"
            >
              Continue
              <span aria-hidden="true" className="font-mono text-[10px] tracking-[0.18em]">
                {String(step + 2).padStart(2, "0")} / 03
              </span>
            </Button>
          ) : (
            <SubmitButton
              label="Send registration"
              pendingLabel="Sending registration…"
              pending={isSubmitting}
              className="flex-1"
            />
          )}
        </div>

        <p className="font-mono text-[8px] uppercase leading-[1.8] tracking-[0.14em] text-ink/35">
          A church representative will contact you regarding the next steps. Your
          information is handled confidentially.
        </p>
      </form>
    </div>
  );
}
