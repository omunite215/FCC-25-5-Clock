import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ControlButtons } from "./ControlButtons";

const noop = () => {};

describe("ControlButtons", () => {
  it("renders the start_stop and reset controls", () => {
    render(<ControlButtons isRunning={false} onToggle={noop} onReset={noop} />);
    expect(document.getElementById("start_stop")).toBeInTheDocument();
    expect(document.getElementById("reset")).toBeInTheDocument();
  });

  it("labels the toggle Start when stopped and Pause when running", () => {
    const { rerender } = render(
      <ControlButtons isRunning={false} onToggle={noop} onReset={noop} />,
    );
    expect(document.getElementById("start_stop")).toHaveAttribute(
      "aria-label",
      "Start",
    );
    rerender(<ControlButtons isRunning onToggle={noop} onReset={noop} />);
    expect(document.getElementById("start_stop")).toHaveAttribute(
      "aria-label",
      "Pause",
    );
  });

  it("calls the handlers when clicked", async () => {
    const onToggle = vi.fn();
    const onReset = vi.fn();
    const user = userEvent.setup();
    render(
      <ControlButtons isRunning={false} onToggle={onToggle} onReset={onReset} />,
    );
    await user.click(document.getElementById("start_stop") as HTMLElement);
    await user.click(document.getElementById("reset") as HTMLElement);
    expect(onToggle).toHaveBeenCalledTimes(1);
    expect(onReset).toHaveBeenCalledTimes(1);
  });
});
