"use client";

import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PRAYER } from "@/data/forms";
import { prayerSchema, type PrayerValues } from "@/lib/forms/schemas";
import { submitForm, useFormDelivery, type SubmitErrorCode } from "@/lib/forms/client";
import {
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

/**
 * PrayerForm — optional identity, one clear request, a confidentiality
 * acknowledgement, and a rising-sun confirmation only after the server accepts
 * the message.
 */

export function PrayerForm(): React.ReactElement {
  const delivery = useFormDelivery();
  const [sent, setSent] = useState(false);
  const [failure, setFailure] = useState<{ code: SubmitErrorCode; message: string } | null>(
    null
  );

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<PrayerValues>({
    defaultValues: {
      name: "",
      contact: "",
      requestType: "" as PrayerValues["requestType"],
      message: "",
      consent: false,
    },
  });

  const values = watch();
  const done = [
    Boolean(values.requestType),
    Boolean(values.message?.trim() && values.message.trim().length >= 10),
    values.consent === true,
  ].filter(Boolean).length;

  async function onSubmit(raw: PrayerValues) {
    setFailure(null);
    const parsed = prayerSchema.safeParse(raw);
    if (!parsed.success) {
      parsed.error.issues.forEach((issue) => {
        const field = issue.path[0];
        if (typeof field === "string") {
          setError(field as keyof PrayerValues, { message: issue.message });
        }
      });
      return;
    }

    const result = await submitForm("prayer", parsed.data);
    if (result.ok) {
      setSent(true);
      return;
    }

    if (result.fields) {
      Object.entries(result.fields).forEach(([field, messages]) => {
        if (messages?.[0]) {
          setError(field as keyof PrayerValues, { message: messages[0] });
        }
      });
    }
    setFailure({ code: result.code, message: result.message });
  }

  if (sent) {
    return (
      <FormSuccess
        title={PRAYER.form.successTitle}
        body={PRAYER.form.successBody}
        reference="Request received"
        resetLabel="Send another request"
        onReset={() => {
          reset();
          setSent(false);
        }}
      />
    );
  }

  return (
    <div className="bg-white p-5 md:p-8 lg:p-9">
      <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-ink/15 pb-4">
        <h2
          id="prayer-form-title"
          className="font-serif text-[clamp(1.7rem,3.2vw,2.5rem)] font-medium leading-[1.02] tracking-[-0.03em]"
        >
          {PRAYER.form.heading}
        </h2>
        <p className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-ink/40">
          Confidential · Pastoral team
        </p>
      </div>

      <p className="mt-4 max-w-[52ch] font-sans text-[15px] leading-[1.6] text-ink/60">
        {PRAYER.form.lead}
      </p>

      <DeliveryNotice visible={delivery === "not_configured"} />

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        aria-labelledby="prayer-form-title"
        className="mt-6 space-y-6"
      >
        <FormProgress value={(done / 3) * 100} label="Request progress" />

        {failure ? <FormAlert code={failure.code} message={failure.message} /> : null}

        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Name"
            registration={register("name")}
            error={errors.name?.message}
            autoComplete="name"
            optional
          />
          <Field
            label="Phone number or email"
            registration={register("contact")}
            error={errors.contact?.message}
            autoComplete="email"
            optional
          />
        </div>

        <RadioCards
          legend="Request type"
          registration={register("requestType")}
          options={PRAYER.form.requestTypes}
          error={errors.requestType?.message}
        />

        <Textarea
          label="Your message"
          registration={register("message")}
          error={errors.message?.message}
          rows={7}
        />

        <Consent registration={register("consent")} error={errors.consent?.message}>
          I consent to my message being handled confidentially by the authorised
          church team, subject to appropriate safeguarding and legal obligations.
        </Consent>

        <div className="border-t border-ink/12 pt-5">
          <SubmitButton
            label="Send prayer request"
            pendingLabel="Sending to the church…"
            pending={isSubmitting}
          />
          <p className="mt-3 font-mono text-[8px] uppercase leading-[1.8] tracking-[0.14em] text-ink/35">
            Prayer requests are not published. Counselling appointments are
            subject to pastoral availability.
          </p>
        </div>
      </form>
    </div>
  );
}
