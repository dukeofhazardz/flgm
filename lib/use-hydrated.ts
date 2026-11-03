"use client";

import { useSyncExternalStore } from "react";

/**
 * useHydrated — `false` during the prerender and during the hydration pass,
 * `true` once React has taken over in the browser.
 *
 * Anything that reads the clock, `sessionStorage` or another browser-only
 * value can guard on this and compute the value inline during render, which
 * avoids both the Next.js "blocking prerender current time" error and the
 * `react-hooks/set-state-in-effect` lint rule.
 */

const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export function useHydrated(): boolean {
  return useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
}

/** A no-op subscription for one-off `useSyncExternalStore` reads. */
export const noopSubscribe = subscribe;
