"use client";

import * as React from "react";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { NEW_MEMBERS } from "@/data/forms";
import { newMemberSchema, type NewMemberValues } from "@/lib/forms/schemas";
import { submitForm, useFormDelivery, type SubmitErrorCode } from "@/lib/forms/client";
import {
  CheckboxCards,
  DeliveryNotice,
  Field,
  FormAlert,
  FormProgress,
  RadioCards,
  SubmitButton,
} from "@/components/forms/form-kit";
import { FormSuccess } from "@/components/forms/form-success";

/**
 * NewMemberForm — the visitor registration and follow-up request.
 * The journey and status treat the visitor as a person, never a lead.
 */

export function NewMemberForm(): React.ReactElement {
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
  } = useForm<NewMemberValues>({
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      descriptor: "" as NewMemberValues["descriptor"],
      interests: [],
      followUp: "" as NewMemberValues["followUp"],
    },
  });

  const values = useWatch({ control });
  const done = [
    Boolean(values.fullName?.trim()),
    Boolean(values.phone?.trim()),
    Boolean(values.descriptor),
    Boolean(values.followUp),
  ].filter(Boolean).length;

  async function onSubmit(raw: NewMemberValues) {
    setFailure(null);
    const parsed = newMemberSchema.safeParse(raw);
    if (!parsed.success) {
      parsed.error.issues.forEach((issue) => {
        const field = issue.path[0];
        if (typeof field === "string") {
          setError(field as keyof NewMemberValues, { message: issue.message });
        }
      });
      return;
    }

    const result = await submitForm("new-members", parsed.data);
    if (result.ok) {
      setSent(true);
      return;
    }

    if (result.fields) {
      Object.entries(result.fields).forEach(([field, messages]) => {
        if (messages?.[0]) {
          setError(field as keyof NewMemberValues, { message: messages[0] });
        }
      });
    }
    setFailure({ code: result.code, message: result.message });
  }

  if (sent) {
    return (
      <FormSuccess
        title={NEW_MEMBERS.form.successTitle}
        body={NEW_MEMBERS.form.successBody}
        reference="Follow-up requested"
        resetLabel="Register someone else"
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
          id="new-member-form-title"
          className="max-w-[20ch] font-serif text-[clamp(1.7rem,3.2vw,2.5rem)] font-medium leading-[1.02] tracking-[-0.03em]"
        >
          {NEW_MEMBERS.form.heading}
        </h2>
        <p className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-ink/40">
          Follow-up · Administration
        </p>
      </div>

      <p className="mt-4 max-w-[54ch] font-sans text-[15px] leading-[1.6] text-ink/60">
        {NEW_MEMBERS.form.lead}
      </p>

      <DeliveryNotice visible={delivery === "not_configured"} />

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        aria-labelledby="new-member-form-title"
        className="mt-6 space-y-6"
      >
        <FormProgress value={(done / 4) * 100} label="Registration progress" />

        {failure ? <FormAlert code={failure.code} message={failure.message} /> : null}

        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Full name"
            registration={register("fullName")}
            error={errors.fullName?.message}
            autoComplete="name"
          />
          <Field
            label="Phone number"
            type="tel"
            inputMode="tel"
            registration={register("phone")}
            error={errors.phone?.message}
            autoComplete="tel"
          />
        </div>

        <Field
          label="Email address"
          type="email"
          inputMode="email"
          registration={register("email")}
          error={errors.email?.message}
          autoComplete="email"
          optional
        />

        <RadioCards
          legend="How would you describe yourself?"
          registration={register("descriptor")}
          options={NEW_MEMBERS.form.descriptors}
          error={errors.descriptor?.message}
        />

        <CheckboxCards
          legend="What are you interested in?"
          name="interests"
          options={NEW_MEMBERS.form.interests}
          register={register}
        />

        <RadioCards
          legend="Preferred follow-up"
          registration={register("followUp")}
          options={NEW_MEMBERS.form.followUp}
          error={errors.followUp?.message}
        />

        <div className="border-t border-ink/12 pt-5">
          <SubmitButton
            label="Request follow-up"
            pendingLabel="Sending to administration…"
            pending={isSubmitting}
          />
          <p className="mt-3 font-mono text-[8px] uppercase leading-[1.8] tracking-[0.14em] text-ink/35">
            Your details are used only by the church administration for follow-up.
            They are not published.
          </p>
        </div>
      </form>
    </div>
  );
}
