import { describe, expect, it } from "vitest";
import { formatAud, TIERS, tierFor } from "./pricing";

describe("TIERS", () => {
  it("matches the ratified ladder exactly", () => {
    expect(TIERS.map((t) => [t.name, t.maxDrivers, t.monthly])).toEqual([
      ["Starter", 10, 39],
      ["Crew", 25, 79],
      ["Fleet", 100, 249]
    ]);
  });

  it("per-driver 'from' rates are computed at full tier size", () => {
    expect((TIERS[0].monthly / TIERS[0].maxDrivers).toFixed(2)).toBe("3.90");
    expect((TIERS[1].monthly / TIERS[1].maxDrivers).toFixed(2)).toBe("3.16");
    expect((TIERS[2].monthly / TIERS[2].maxDrivers).toFixed(2)).toBe("2.49");
  });
});

describe("tierFor", () => {
  it("selects tiers at boundaries", () => {
    expect(tierFor(1).name).toBe("Starter");
    expect(tierFor(10).name).toBe("Starter");
    expect(tierFor(11).name).toBe("Crew");
    expect(tierFor(25).name).toBe("Crew");
    expect(tierFor(26).name).toBe("Fleet");
    expect(tierFor(100).name).toBe("Fleet");
  });

  it("clamps above self-serve range to Fleet", () => {
    expect(tierFor(250).name).toBe("Fleet");
  });

  it("rejects garbage", () => {
    expect(() => tierFor(NaN)).toThrow();
  });
});

describe("formatAud", () => {
  it("formats with AU$ prefix and separators", () => {
    expect(formatAud(39)).toBe("AU$39");
    expect(formatAud(2988)).toBe("AU$2,988");
  });
});
