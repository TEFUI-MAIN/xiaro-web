import { describe, expect, it } from "vitest";
import { buildTimeline, clockAt, resolveShift } from "./sim";

const m = (h: number, min = 0) => h * 60 + min;

describe("resolveShift", () => {
  it("resolves day/afternoon/night with inclusive starts", () => {
    expect(resolveShift(m(6)).name).toBe("Sarah Ng");
    expect(resolveShift(m(13, 59)).name).toBe("Sarah Ng");
    expect(resolveShift(m(14)).name).toBe("James Patel");
    expect(resolveShift(m(21, 59)).name).toBe("James Patel");
    expect(resolveShift(m(22)).name).toBe("Emma Wilson");
  });

  it("wraps overnight", () => {
    expect(resolveShift(m(2, 47)).name).toBe("Emma Wilson");
    expect(resolveShift(m(5, 59)).name).toBe("Emma Wilson");
  });
});

describe("clockAt", () => {
  it("formats and wraps midnight", () => {
    expect(clockAt(m(2, 47), 0)).toBe("02:47");
    expect(clockAt(m(23, 58), 5)).toBe("00:03");
  });
});

describe("buildTimeline", () => {
  it("answered: inbound→roster→delivered→reply→logged", () => {
    const t = buildTimeline({ message: "Flat tyre", sendMinutes: m(2, 47), answers: true });
    expect(t.map((e) => e.kind)).toEqual(["inbound", "roster", "delivered", "reply", "logged"]);
    expect(t[1].text).toContain("Emma Wilson");
    expect(t[3].clock).toBe("02:49");
    expect(t.every((e, i) => i === 0 || e.atSec > t[i - 1].atSec)).toBe(true);
  });

  it("missed: climbs both rungs then duty manager answers", () => {
    const t = buildTimeline({ message: "Flat tyre", sendMinutes: m(2, 47), answers: false });
    expect(t.map((e) => e.kind)).toEqual([
      "inbound",
      "roster",
      "delivered",
      "escalate",
      "escalate",
      "reply",
      "logged"
    ]);
    expect(t[3].text).toContain("Escalation contact");
    expect(t[3].clock).toBe("02:52");
    expect(t[4].text).toContain("Duty manager");
    expect(t[4].clock).toBe("03:02");
  });

  it("trims and caps the message at 80 chars", () => {
    const t = buildTimeline({ message: "  " + "x".repeat(120), sendMinutes: m(10), answers: true });
    expect(t[0].text.length).toBeLessThanOrEqual(80 + 40);
    expect(t[0].text).toContain("x".repeat(80));
    expect(t[0].text).not.toContain("x".repeat(81));
  });
});
