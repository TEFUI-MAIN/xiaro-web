export const HOW_STEPS = [
  {
    title: "A driver messages the company number",
    copy: "WhatsApp or SMS — same number, same thread."
  },
  {
    title: "Xiaro checks the roster",
    copy: "Site, shift window, time of day. The message lands with the supervisor actually on duty."
  },
  {
    title: "Delivered — and watched",
    copy: "Read receipts, reply tracking, and a timer. Everything logged."
  },
  {
    title: "Nobody answers? It climbs the ladder.",
    copy: "Unanswered messages climb the escalation ladder until a human owns them. Timings are yours to set."
  }
] as const;

export const LADDER = [
  { time: "0:00", who: "Supervisor (on shift)", status: "Notified", tone: "green" },
  { time: "+5:00", who: "Escalation contact", status: "Notified", tone: "amber" },
  { time: "+15:00", who: "Duty manager", status: "Notified", tone: "amber" },
  { time: "+25:00", who: "Admin alert", status: "Flagged", tone: "signal" }
] as const;
