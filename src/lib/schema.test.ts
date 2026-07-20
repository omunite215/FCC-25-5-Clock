import { describe, expect, it } from "vitest";
import { durationsSchema } from "./schema";

describe("durationsSchema", () => {
  it("accepts the default durations", () => {
    const result = durationsSchema.safeParse({
      breakLength: 5,
      sessionLength: 25,
    });
    expect(result.success).toBe(true);
  });

  it("coerces numeric strings", () => {
    const result = durationsSchema.safeParse({
      breakLength: "10",
      sessionLength: "30",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.sessionLength).toBe(30);
      expect(result.data.breakLength).toBe(10);
    }
  });

  it("rejects values below 1", () => {
    const result = durationsSchema.safeParse({
      breakLength: 0,
      sessionLength: 25,
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("Minimum is 1");
    }
  });

  it("rejects values above 60", () => {
    expect(
      durationsSchema.safeParse({ breakLength: 5, sessionLength: 61 }).success,
    ).toBe(false);
  });

  it("rejects non-integers", () => {
    const result = durationsSchema.safeParse({
      breakLength: 2.5,
      sessionLength: 25,
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("Whole minutes only");
    }
  });

  it("rejects empty and non-numeric input", () => {
    expect(
      durationsSchema.safeParse({ breakLength: "", sessionLength: 25 }).success,
    ).toBe(false);
    expect(
      durationsSchema.safeParse({ breakLength: "abc", sessionLength: 25 })
        .success,
    ).toBe(false);
  });
});
