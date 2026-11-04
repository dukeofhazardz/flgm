"use client";

import * as React from "react";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { CONTACT_FORM } from "@/data/forms";
import { contactSchema, type ContactValues } from "@/lib/forms/schemas";
import { submitForm, useFormDelivery, type SubmitErrorCode } from "@/lib/forms/client";
import {
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
 * ContactForm — the church enquiry form.
 * The enquiry type is a visible choice, not a hidden default; Plan a Visit is
 * one of the published options.
 */

export function ContactForm(): React.ReactElement {
  const delivery = useFormDelivery();
  const [sent, setSent] = useState(false);
  const [failure, setFailure] = useState<{ code: SubmitErrorCode; message: string } | null>(
    null
  );

  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    defaultValues: {
      name: "",
      email: "",
      enquiryType: "General Enquiry",
      message: "",
    },
  });

  const values = useWatch({ control });
  const done = [
    Boolean(values.name?.trim()),
    Boolean(values.email?.trim()),
    Boolean(values.enquiryType),
    Boolean(values.message?.trim() && values.message.trim().length >= 10),
  ].filter(Boolean).length;

  async function onSubmit(raw: ContactValues) {
    setFailure(null);
    const parsed = contactSchema.safeParse(raw);
    if (!parsed.success) {
      parsed.error.issues.forEach((issue) => {
        const field = issue.path[0];
        if (typeof field === "string") {
          setError(field as keyof ContactValues, { message: issue.message });
        }
      });
      return;
    }

    const result = await submitForm("contact", parsed.data);
    if (result.ok) {
      setSent(true);
      return;
    }

    if (result.fields) {
      Object.entries(result.fields).forEach(([field, messages]) => {
        if (messages?.[0]) {
          setError(field as keyof ContactValues, { message: messages[0] });
        }
      });
    }
    setFailure({ code: result.code, message: result.message });
  }

  if (sent) {
    return (
      <FormSuccess
        title={CONTACT_FORM.successTitle}
        body={CONTACT_FORM.successBody}
        reference="Message received"
        resetLabel="Send another message"
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
          id="contact-form-title"
          className="font-serif text-[clamp(1.7rem,3.2vw,2.5rem)] font-medium leading-[1.02] tracking-[-0.03em]"
        >
          {CONTACT_FORM.heading}
        </h2>
        <p className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-ink/40">
          Enquiries · Church office
        </p>
      </div>

      <p className="mt-4 max-w-[54ch] font-sans text-[15px] leading-[1.6] text-ink/60">
        {CONTACT_FORM.lead}
      </p>

      <DeliveryNotice visible={delivery === "not_configured"} />

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        aria-labelledby="contact-form-title"
        className="mt-6 space-y-6"
      >
        <FormProgress value={(done / 4) * 100} label="Message progress" />

        {failure ? <FormAlert code={failure.code} message={failure.message} /> : null}

        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Full name"
            registration={register("name")}
            error={errors.name?.message}
            autoComplete="name"
          />
          <Field
            label="Email address"
            type="email"
            inputMode="email"
            registration={register("email")}
            error={errors.email?.message}
            autoComplete="email"
          />
        </div>

        <RadioCards
          legend="Enquiry type"
          registration={register("enquiryType")}
          options={CONTACT_FORM.enquiryTypes}
          error={errors.enquiryType?.message}
        />

        <Textarea
          label="Message"
          registration={register("message")}
          error={errors.message?.message}
          rows={6}
        />

        <div className="border-t border-ink/12 pt-5">
          <SubmitButton
            label="Send message"
            pendingLabel="Sending to the church…"
            pending={isSubmitting}
          />
          <p className="mt-3 font-mono text-[8px] uppercase leading-[1.8] tracking-[0.14em] text-ink/35">
            Your message is read by the church office. Personal details are not
            published.
          </p>
        </div>
      </form>
    </div>
  );
}
