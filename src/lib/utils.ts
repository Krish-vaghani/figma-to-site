import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Normalize any rating value to the allowed display steps:
 * 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5
 */
export function normalizeRating(raw: number | null | undefined): number {
  if (raw == null || Number.isNaN(raw as number)) return 4;

  const value = Number(raw);
  const clamped = Math.min(5.5, Math.max(1, value));

  // Round to nearest 0.5 step starting from 1
  const step = 0.5;
  const rounded = Math.round((clamped - 1) / step) * step + 1;

  // Guard against floating point noise like 4.499999
  return Number(rounded.toFixed(1));
}
