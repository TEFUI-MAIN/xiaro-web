/** Ratified tier ladder — tiers gate fleet size, never features. Prices AUD ex GST. */
export const TIERS = [
  { name: "Starter", maxDrivers: 10, monthly: 39, fromPerDriver: "3.90" },
  { name: "Crew", maxDrivers: 25, monthly: 79, fromPerDriver: "3.16" },
  { name: "Fleet", maxDrivers: 100, monthly: 249, fromPerDriver: "2.49" }
] as const;

export type Tier = (typeof TIERS)[number];

/** Self-serve tier for a fleet size; sizes beyond Fleet clamp to Fleet (Group is per-entity). */
export function tierFor(drivers: number): Tier {
  if (!Number.isFinite(drivers)) throw new Error("drivers must be a finite number");
  const n = Math.max(1, Math.ceil(drivers));
  return TIERS.find((tier) => n <= tier.maxDrivers) ?? TIERS[TIERS.length - 1];
}

export function formatAud(value: number): string {
  return `AU$${Math.round(value).toLocaleString("en-AU")}`;
}
