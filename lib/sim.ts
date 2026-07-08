export type Supervisor = { name: string; shift: "day" | "afternoon" | "night" };

export type SimEvent = {
  atSec: number;
  clock: string;
  kind: "inbound" | "roster" | "delivered" | "reply" | "escalate" | "logged";
  text: string;
  tone: "ink" | "green" | "amber" | "signal";
};

export const ROSTER = [
  { name: "Sarah Ng", shift: "day", window: "06:00–14:00" },
  { name: "James Patel", shift: "afternoon", window: "14:00–22:00" },
  { name: "Emma Wilson", shift: "night", window: "22:00–06:00" }
] as const;

const DAY = 24 * 60;

export function resolveShift(minutes: number): Supervisor {
  const t = ((minutes % DAY) + DAY) % DAY;
  if (t >= 6 * 60 && t < 14 * 60) return { name: "Sarah Ng", shift: "day" };
  if (t >= 14 * 60 && t < 22 * 60) return { name: "James Patel", shift: "afternoon" };
  return { name: "Emma Wilson", shift: "night" };
}

export function clockAt(baseMinutes: number, offsetMinutes: number): string {
  const t = (((baseMinutes + offsetMinutes) % DAY) + DAY) % DAY;
  const h = Math.floor(t / 60);
  const m = t % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function buildTimeline({
  message,
  sendMinutes,
  answers
}: {
  message: string;
  sendMinutes: number;
  answers: boolean;
}): SimEvent[] {
  const text = message.trim().slice(0, 80) || "Need a hand out here";
  const sup = resolveShift(sendMinutes);
  const at = (offsetMinutes: number) => clockAt(sendMinutes, offsetMinutes);

  const head: SimEvent[] = [
    {
      atSec: 0,
      clock: at(0),
      kind: "inbound",
      text: `Driver → company number: “${text}”`,
      tone: "ink"
    },
    {
      atSec: 1,
      clock: at(0),
      kind: "roster",
      text: `Roster check: ${sup.shift} shift → ${sup.name}`,
      tone: "green"
    },
    {
      atSec: 2,
      clock: at(0),
      kind: "delivered",
      text: `Delivered to ${sup.name}'s phone — reply timer armed`,
      tone: "green"
    }
  ];

  if (answers) {
    return [
      ...head,
      {
        atSec: 3.5,
        clock: at(2),
        kind: "reply",
        text: `${sup.name} replied — conversation resolved`,
        tone: "green"
      },
      {
        atSec: 4.5,
        clock: at(2),
        kind: "logged",
        text: "Audit row written — timestamped, tamper-evident",
        tone: "ink"
      }
    ];
  }

  return [
    ...head,
    {
      atSec: 3.5,
      clock: at(5),
      kind: "escalate",
      text: "No reply in 5:00 — Escalation contact notified",
      tone: "amber"
    },
    {
      atSec: 5,
      clock: at(15),
      kind: "escalate",
      text: "No reply in 15:00 — Duty manager notified",
      tone: "amber"
    },
    {
      atSec: 6.5,
      clock: at(16),
      kind: "reply",
      text: "Duty manager replied — conversation resolved",
      tone: "green"
    },
    {
      atSec: 7.5,
      clock: at(16),
      kind: "logged",
      text: "Audit row written — every hop recorded",
      tone: "ink"
    }
  ];
}
