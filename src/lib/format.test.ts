import { describe, expect, it } from "vitest";
import { formatTime } from "./format";

describe("formatTime", () => {
  it("formats the default session length", () => {
    expect(formatTime(1500)).toBe("25:00");
  });

  it("formats zero as 00:00", () => {
    expect(formatTime(0)).toBe("00:00");
  });

  it("zero-pads minutes and seconds", () => {
    expect(formatTime(65)).toBe("01:05");
  });

  it("formats an exact ten-minute break", () => {
    expect(formatTime(600)).toBe("10:00");
  });

  it("formats the maximum 60-minute length", () => {
    expect(formatTime(3600)).toBe("60:00");
  });

  it("clamps negative input to 00:00", () => {
    expect(formatTime(-1)).toBe("00:00");
  });
});
