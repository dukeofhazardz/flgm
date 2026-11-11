import * as React from "react";
import type { SocialAccount } from "@/data/socials";
import { SocialIcon } from "@/components/ui/social-icon";
import { cn } from "@/lib/utils";

/**
 * SocialLink — one external profile link with its platform icon.
 *
 * The icon is decorative and inherits the link colour. The visible label (or
 * the supplied children) supplies the accessible name; every link opens in a
 * new tab with a safe rel.
 */

interface SocialLinkProps {
  social: SocialAccount;
  className?: string;
  /** Override the visible label. Defaults to the platform name. */
  children?: React.ReactNode;
  /** Optional trailing element, such as an external-link arrow. */
  trailing?: React.ReactNode;
  /** Extra classes for the icon itself. */
  iconClassName?: string;
  /** Extra classes for the label wrapper, for stacked label + handle layouts. */
  labelClassName?: string;
}

export function SocialLink({
  social,
  className,
  children,
  trailing,
  iconClassName,
  labelClassName,
}: SocialLinkProps): React.ReactElement {
  return (
    <a
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("inline-flex items-center gap-2", className)}
    >
      <SocialIcon id={social.id} className={iconClassName} />
      <span className={labelClassName}>{children ?? social.label}</span>
      {trailing}
    </a>
  );
}
