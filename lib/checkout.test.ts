import { describe, expect, it } from "vitest";
import { parseCheckoutRequest } from "./checkout";

describe("parseCheckoutRequest", () => {
  it("accepts a valid monthly request", () => {
    expect(parseCheckoutRequest({ interval: "monthly", drivers: 25, onboarding: false })).toEqual({
      interval: "monthly",
      drivers: 25,
      onboarding: false
    });
  });

  it("accepts a valid annual request with onboarding", () => {
    expect(parseCheckoutRequest({ interval: "annual", drivers: 120, onboarding: true })).toEqual({
      interval: "annual",
      drivers: 120,
      onboarding: true
    });
  });

  it("rejects bad intervals", () => {
    expect(parseCheckoutRequest({ interval: "weekly", drivers: 25, onboarding: false })).toBeNull();
  });

  it("rejects out-of-range or non-integer drivers", () => {
    expect(parseCheckoutRequest({ interval: "monthly", drivers: 0, onboarding: false })).toBeNull();
    expect(parseCheckoutRequest({ interval: "monthly", drivers: 1001, onboarding: false })).toBeNull();
    expect(parseCheckoutRequest({ interval: "monthly", drivers: 12.5, onboarding: false })).toBeNull();
    expect(parseCheckoutRequest({ interval: "monthly", drivers: NaN, onboarding: false })).toBeNull();
    expect(parseCheckoutRequest({ interval: "monthly", drivers: "25", onboarding: false })).toBeNull();
  });

  it("rejects missing fields and non-objects", () => {
    expect(parseCheckoutRequest(null)).toBeNull();
    expect(parseCheckoutRequest("hi")).toBeNull();
    expect(parseCheckoutRequest({ interval: "monthly", drivers: 25 })).toBeNull();
  });
});
