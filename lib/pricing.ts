export const INCLUDED_DRIVERS = 25;
export const BASE_MONTHLY_AUD = 79;
export const PER_DRIVER_AUD = 3;
export const ONBOARDING_AUD = 399;
export const MAX_DRIVERS = 1000;

export function monthlyPriceAud(drivers: number): number {
  if (!Number.isFinite(drivers)) throw new Error("drivers must be a finite number");
  const n = Math.min(MAX_DRIVERS, Math.max(1, Math.ceil(drivers)));
  return BASE_MONTHLY_AUD + Math.max(0, n - INCLUDED_DRIVERS) * PER_DRIVER_AUD;
}

export function annualPriceAud(drivers: number): number {
  return monthlyPriceAud(drivers) * 10;
}

export function formatAud(value: number): string {
  return `AU$${Math.round(value).toLocaleString("en-AU")}`;
}
