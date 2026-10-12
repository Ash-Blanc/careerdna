import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDuration(weeks: number): string {
  if (weeks <= 4) return `${weeks} Weeks (1 Month)`;
  if (weeks <= 8) return `${weeks} Weeks (2 Months)`;
  return `${weeks} Weeks (3 Months / 90 Days)`;
}
