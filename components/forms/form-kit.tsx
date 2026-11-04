"use client";

import * as React from "react";
import { AlertCircle, ArrowUpRight, Check, ChevronDown, Loader2 } from "lucide-react";
import type {
  FieldValues,
  Path,
  UseFormRegister,
  UseFormRegisterReturn,
} from "react-hook-form";
import { CONTACT } from "@/data/contact";
import { whatsappLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { SubmitErrorCode } from "@/lib/forms/client";

/**
 * Form kit — large fields, floating labels, editorial radio tiles, and one
 * honest set of delivery states.
 *
 * Nothing here relies on hover. Labels are real <label> elements; errors are
 * announced with role="alert"; every control keeps a 44px+ target.
 */

interface FieldProps {
  label: string;
  registration: UseFormRegisterReturn;
  error?: string;
  type?: string;
  autoComplete?: string;
  inputMode?: "text" | "tel" | "email" | "numeric";
  optional?: boolean;
  className?: string;
}

export function Field({
  label,
  registration,
  error,
  type = "text",
  autoComplete,
  inputMode,
  optional,
  className,
}: FieldProps): React.ReactElement {
  const id = registration.name;
  const errorId = `${id}-error`;

  return (
    <div className={className}>
      <div className="field-shell">
        <input
          id={id}
          type={type}
          placeholder=" "
          autoComplete={autoComplete}
          inputMode={inputMode}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? errorId : undefined}
          className="field-input"
          {...registration}
        />
        <label htmlFor={id} className="field-label">
          {label}
          {optional ? <span className="normal-case tracking-normal"> (optional)</span> : null}
        </label>
      </div>
      <FieldError id={errorId} message={error} />
    </div>
  );
}

interface TextareaProps {
  label: string;
  registration: UseFormRegisterReturn;
  error?: string;
  rows?: number;
  optional?: boolean;
  className?: string;
}

export function Textarea({
  label,
  registration,
  error,
  rows = 6,
  optional,
  className,
}: TextareaProps): React.ReactElement {
  const id = registration.name;
  const errorId = `${id}-error`;

  return (
    <div className={className}>
      <div className="field-shell">
        <textarea
          id={id}
          rows={rows}
          placeholder=" "
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? errorId : undefined}
          className="field-input field-input--area"
          {...registration}
        />
        <label htmlFor={id} className="field-label">
          {label}
          {optional ? <span className="normal-case tracking-normal"> (optional)</span> : null}
        </label>
      </div>
      <FieldError id={errorId} message={error} />
    </div>
  );
}

interface SelectProps {
  label: string;
  registration: UseFormRegisterReturn;
  error?: string;
  options: readonly string[];
  placeholder?: string;
  className?: string;
}

export function Select({
  label,
  registration,
  error,
  options,
  placeholder = "Choose one",
  className,
}: SelectProps): React.ReactElement {
  const id = registration.name;
  const errorId = `${id}-error`;

  return (
    <div className={className}>
      <div className="field-shell">
        <select
          id={id}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? errorId : undefined}
          className="field-input field-select"
          {...registration}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <label htmlFor={id} className="field-label">
          {label}
        </label>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/45"
          strokeWidth={1.5}
        />
      </div>
      <FieldError id={errorId} message={error} />
    </div>
  );
}

function FieldError({
  id,
  message,
}: {
  id: string;
  message?: string;
}): React.ReactElement | null {
  if (!message) return null;
  return (
    <p
      id={id}
      role="alert"
      className="mt-2 flex items-start gap-1.5 font-sans text-[13px] leading-[1.45] text-crimson-text"
    >
      <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={1.8} aria-hidden="true" />
      {message}
    </p>
  );
}

interface RadioCardsProps {
  legend: string;
  registration: UseFormRegisterReturn;
  options: readonly string[];
  error?: string;
  columns?: 1 | 2;
  className?: string;
}

export function RadioCards({
  legend,
  registration,
  options,
  error,
  columns = 2,
  className,
}: RadioCardsProps): React.ReactElement {
  const errorId = `${registration.name}-error`;

  return (
    <fieldset
      className={className}
      aria-invalid={error ? "true" : undefined}
      aria-describedby={error ? errorId : undefined}
    >
      <legend className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink/55">
        {legend}
      </legend>
      <div
        className={cn(
          "mt-3 grid gap-2",
          columns === 2 ? "sm:grid-cols-2" : "grid-cols-1"
        )}
      >
        {options.map((option) => (
          <label
            key={option}
            className="group relative flex min-h-[54px] cursor-pointer items-center gap-3 border border-ink/15 bg-white px-4 py-3 transition-[background-color,border-color,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] has-[:checked]:border-ink has-[:checked]:bg-dawn-mint hover:border-ink/40 active:scale-[0.99]"
          >
            <input
              type="radio"
              value={option}
              className="peer sr-only"
              {...registration}
            />
            <span
              aria-hidden="true"
              className="relative flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border border-ink/30 bg-white transition-colors duration-200 peer-checked:border-ink peer-checked:bg-ink"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
            </span>
            <span className="font-sans text-[15px] leading-[1.35] text-ink/80">
              {option}
            </span>
          </label>
        ))}
      </div>
      <FieldError id={errorId} message={error} />
    </fieldset>
  );
}

interface CheckboxCardsProps<T extends FieldValues> {
  legend: string;
  name: Path<T>;
  options: readonly string[];
  register: UseFormRegister<T>;
  className?: string;
}

export function CheckboxCards<T extends FieldValues>({
  legend,
  name,
  options,
  register,
  className,
}: CheckboxCardsProps<T>): React.ReactElement {
  return (
    <fieldset className={className}>
      <legend className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink/55">
        {legend}
        <span className="ml-2 normal-case tracking-normal text-ink/40">
          select any that apply
        </span>
      </legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => (
          <label
            key={option}
            className="group relative flex min-h-[44px] cursor-pointer items-center gap-2.5 border border-ink/15 bg-white px-3.5 py-2 transition-[background-color,border-color] duration-200 has-[:checked]:border-ink has-[:checked]:bg-dawn-mint hover:border-ink/40"
          >
            <span className="relative flex h-4 w-4 shrink-0 items-center justify-center border border-ink/30 bg-white has-[:checked]:border-ink has-[:checked]:bg-ink">
              <input
                type="checkbox"
                value={option}
                className="peer sr-only"
                {...register(name)}
              />
              <Check
                aria-hidden="true"
                className="h-3 w-3 text-white opacity-0 peer-checked:opacity-100"
                strokeWidth={2.4}
              />
            </span>
            <span className="font-sans text-[14px] leading-[1.3] text-ink/75">
              {option}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

interface ConsentProps {
  registration: UseFormRegisterReturn;
  error?: string;
  children: React.ReactNode;
}

export function Consent({
  registration,
  error,
  children,
}: ConsentProps): React.ReactElement {
  const errorId = `${registration.name}-error`;

  return (
    <div>
      <label className="flex cursor-pointer items-start gap-3">
        <span className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border border-ink/30 bg-white transition-colors duration-200 has-[:checked]:border-ink has-[:checked]:bg-ink">
          <input
            type="checkbox"
            className="peer sr-only"
            aria-invalid={error ? "true" : undefined}
            aria-describedby={error ? errorId : undefined}
            {...registration}
          />
          <Check
            aria-hidden="true"
            className="h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100"
            strokeWidth={2.4}
          />
        </span>
        <span className="max-w-[62ch] font-sans text-[14px] leading-[1.55] text-ink/65">
          {children}
        </span>
      </label>
      <FieldError id={errorId} message={error} />
    </div>
  );
}

interface FormProgressProps {
  value: number;
  label?: string;
  steps?: readonly string[];
  currentStep?: number;
  className?: string;
}

export function FormProgress({
  value,
  label = "Request",
  steps,
  currentStep = 0,
  className,
}: FormProgressProps): React.ReactElement {
  const clamped = Math.max(0, Math.min(100, Math.round(value)));

  return (
    <div className={className}>
      <div className="flex items-baseline justify-between gap-4">
        <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink/50">
          {steps ? `Step ${currentStep + 1} of ${steps.length}` : label}
        </p>
        <p className="font-mono text-[10px] tabular-nums tracking-[0.1em] text-ink/55">
          {clamped}%
        </p>
      </div>
      <div className="mt-2 h-[3px] overflow-hidden bg-ink/10">
        <div
          className="h-full origin-left bg-brand-green transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
          style={{ transform: `scaleX(${clamped / 100})` }}
        />
      </div>
      {steps ? (
        <ol className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
          {steps.map((step, index) => (
            <li
              key={step}
              className={cn(
                "font-mono text-[8px] uppercase tracking-[0.14em]",
                index === currentStep
                  ? "text-ink"
                  : index < currentStep
                    ? "text-ink/45"
                    : "text-ink/25"
              )}
            >
              {String(index + 1).padStart(2, "0")} {step}
            </li>
          ))}
        </ol>
      ) : null}
    </div>
  );
}

const ERROR_TITLES: Record<SubmitErrorCode, string> = {
  not_configured: "Not sent — email delivery is not connected",
  delivery_failed: "Not sent — delivery failed",
  invalid: "Please check the highlighted fields",
  rate_limited: "Too many attempts",
  network: "Connection problem",
  unknown: "Not sent",
};

interface DirectLinesProps {
  className?: string;
  tone?: "light" | "dark";
}

export function DirectLines({
  className,
  tone = "light",
}: DirectLinesProps): React.ReactElement {
  return (
    <div className={className}>
      <p
        className={cn(
          "font-mono text-[8.5px] uppercase tracking-[0.18em]",
          tone === "dark" ? "text-white/45" : "text-ink/45"
        )}
      >
        Reach the church directly
      </p>
      <div className="mt-2 flex flex-col gap-1.5">
        {CONTACT.phones.map((phone) => (
          <a
            key={phone}
            href={`tel:${phone.replace(/\s/g, "")}`}
            className={cn(
              "inline-flex min-h-[32px] w-fit items-center gap-2 font-mono text-[12px] tracking-[0.04em] transition-colors",
              tone === "dark"
                ? "text-white/85 hover:text-dawn-mint"
                : "text-ink/80 hover:text-forest"
            )}
          >
            <span className="h-1 w-1 rounded-full bg-signal-red" aria-hidden="true" />
            {phone}
          </a>
        ))}
        <a
          href={whatsappLink(
            "Good day, I tried to send a message through the FLGM website."
          )}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "mt-1 inline-flex min-h-[36px] w-fit items-center gap-1.5 border px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] transition-colors",
            tone === "dark"
              ? "border-white/25 text-white/80 hover:border-dawn-mint hover:text-dawn-mint"
              : "border-ink/25 text-ink/75 hover:border-ink hover:text-ink"
          )}
        >
          WhatsApp the church
          <ArrowUpRight className="h-3 w-3" strokeWidth={1.6} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

export function DeliveryNotice({
  visible,
}: {
  visible: boolean;
}): React.ReactElement | null {
  if (!visible) return null;
  return (
    <div className="border-l-2 border-forest bg-mist p-4 md:p-5">
      <p className="font-sans text-[15px] font-medium leading-[1.4] text-ink">
        Email delivery is not connected on this deployment.
      </p>
      <p className="mt-1.5 max-w-[56ch] font-sans text-[14px] leading-[1.55] text-ink/65">
        You can still fill the form, but it will not be sent. Call or WhatsApp
        the church and a member of the team will help directly.
      </p>
      <DirectLines className="mt-3" />
    </div>
  );
}

interface FormAlertProps {
  code: SubmitErrorCode;
  message: string;
}

export function FormAlert({ code, message }: FormAlertProps): React.ReactElement {
  const notice = code === "not_configured";

  return (
    <div
      role="alert"
      className={cn(
        "border-l-2 p-4 md:p-5",
        notice
          ? "border-forest bg-mist text-ink"
          : "border-crimson-text bg-blush/45 text-ink"
      )}
    >
      <p className="flex items-start gap-2 font-sans text-[15px] font-medium leading-[1.4]">
        <AlertCircle
          className={cn(
            "mt-0.5 h-4 w-4 shrink-0",
            notice ? "text-forest" : "text-crimson-text"
          )}
          strokeWidth={1.8}
          aria-hidden="true"
        />
        {ERROR_TITLES[code]}
      </p>
      <p className="mt-2 max-w-[56ch] font-sans text-[14px] leading-[1.55] text-ink/65">
        {message}
      </p>
      {notice || code === "delivery_failed" || code === "network" ? (
        <DirectLines className="mt-4" />
      ) : null}
    </div>
  );
}

interface SubmitButtonProps {
  label: string;
  pendingLabel?: string;
  pending: boolean;
  disabled?: boolean;
  className?: string;
}

export function SubmitButton({
  label,
  pendingLabel = "Sending…",
  pending,
  disabled,
  className,
}: SubmitButtonProps): React.ReactElement {
  return (
    <Button
      type="submit"
      size="lg"
      variant="brand"
      disabled={pending || disabled}
      className={cn("min-h-[56px] w-full justify-between px-6", className)}
    >
      <span>{pending ? pendingLabel : label}</span>
      {pending ? (
        <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.8} aria-hidden="true" />
      ) : (
        <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
      )}
    </Button>
  );
}
