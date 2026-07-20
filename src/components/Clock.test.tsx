import { act, fireEvent, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Clock } from "./Clock";

function byId(id: string): HTMLElement {
  const element = document.getElementById(id);
  if (!element) throw new Error(`Missing element #${id}`);
  return element;
}

describe("Clock (integration)", () => {
  it("renders every required FCC element with default values", () => {
    render(<Clock />);
    expect(byId("break-label")).toHaveTextContent(/break length/i);
    expect(byId("session-label")).toHaveTextContent(/session length/i);
    expect(byId("break-length")).toHaveTextContent("5");
    expect(byId("session-length")).toHaveTextContent("25");
    expect(byId("timer-label")).toHaveTextContent("Session");
    expect(byId("time-left")).toHaveTextContent("25:00");
    expect(byId("start_stop")).toBeInTheDocument();
    expect(byId("reset")).toBeInTheDocument();
    expect(byId("break-decrement")).toBeInTheDocument();
    expect(byId("break-increment")).toBeInTheDocument();
    expect(byId("session-decrement")).toBeInTheDocument();
    expect(byId("session-increment")).toBeInTheDocument();
    expect(byId("beep")).toBeInTheDocument();
  });

  it("increments session length and updates time-left", () => {
    render(<Clock />);
    fireEvent.click(byId("session-increment"));
    expect(byId("session-length")).toHaveTextContent("26");
    expect(byId("time-left")).toHaveTextContent("26:00");
  });

  it("does not let break length drop below 1", () => {
    render(<Clock />);
    for (let i = 0; i < 10; i += 1) {
      fireEvent.click(byId("break-decrement"));
    }
    expect(byId("break-length")).toHaveTextContent("1");
  });

  describe("with fake timers", () => {
    beforeEach(() => vi.useFakeTimers());
    afterEach(() => vi.useRealTimers());

    it("counts down while running and resets to the default", () => {
      render(<Clock />);
      fireEvent.click(byId("start_stop"));
      act(() => vi.advanceTimersByTime(1000));
      expect(byId("time-left")).toHaveTextContent("24:59");

      fireEvent.click(byId("reset"));
      expect(byId("time-left")).toHaveTextContent("25:00");
      expect(byId("session-length")).toHaveTextContent("25");
    });

    it("starts the timer with the Space shortcut", () => {
      render(<Clock />);
      expect(byId("start_stop")).toHaveAttribute("aria-label", "Start");
      act(() => {
        fireEvent.keyDown(window, { code: "Space" });
      });
      expect(byId("start_stop")).toHaveAttribute("aria-label", "Pause");
    });
  });
});
