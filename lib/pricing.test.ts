import { describe, expect, it } from "vitest";
import { annualPriceAud, formatAud, monthlyPriceAud } from "./pricing";

describe("monthlyPriceAud", () => {
  it("bills flat AU$79 up to 25 drivers", () => {
    expect(monthlyPriceAud(1)).toBe(79);
    expect(monthlyPriceAud(25)).toBe(79);
  });

  it("adds AU$3 per driver above 25", () => {
    expect(monthlyPriceAud(26)).toBe(82);
    expect(monthlyPriceAud(40)).toBe(124);
    expect(monthlyPriceAud(100)).toBe(304);
  });

  it("clamps to 1..1000 and rejects garbage", () => {
    expect(monthlyPriceAud(0)).toBe(79);
    expect(monthlyPriceAud(2000)).toBe(monthlyPriceAud(1000));
    expect(() => monthlyPriceAud(NaN)).toThrow();
  });
});

describe("annualPriceAud", () => {
  it("is 10x monthly (two months free)", () => {
    expect(annualPriceAud(25)).toBe(790);
    expect(annualPriceAud(40)).toBe(1240);
  });
});

describe("formatAud", () => {
  it("formats with AU$ prefix and separators", () => {
    expect(formatAud(79)).toBe("AU$79");
    expect(formatAud(1240)).toBe("AU$1,240");
  });
});
