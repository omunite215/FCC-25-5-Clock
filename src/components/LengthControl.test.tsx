import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { LengthControl } from "./LengthControl";

const noop = () => {};

describe("LengthControl", () => {
  it("renders the label, value and required FCC ids", () => {
    render(
      <LengthControl
        label="Break Length"
        idPrefix="break"
        value={5}
        disabled={false}
        onIncrement={noop}
        onDecrement={noop}
      />,
    );
    expect(screen.getByText("Break Length")).toHaveAttribute("id", "break-label");
    expect(document.getElementById("break-length")).toHaveTextContent("5");
    expect(document.getElementById("break-increment")).toBeInTheDocument();
    expect(document.getElementById("break-decrement")).toBeInTheDocument();
  });

  it("calls the handlers when the steppers are clicked", async () => {
    const onIncrement = vi.fn();
    const onDecrement = vi.fn();
    const user = userEvent.setup();
    render(
      <LengthControl
        label="Session Length"
        idPrefix="session"
        value={25}
        disabled={false}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
      />,
    );
    await user.click(screen.getByRole("button", { name: "Increase Session Length" }));
    await user.click(screen.getByRole("button", { name: "Decrease Session Length" }));
    expect(onIncrement).toHaveBeenCalledTimes(1);
    expect(onDecrement).toHaveBeenCalledTimes(1);
  });

  it("disables the steppers while the timer runs", () => {
    render(
      <LengthControl
        label="Break Length"
        idPrefix="break"
        value={5}
        disabled
        onIncrement={noop}
        onDecrement={noop}
      />,
    );
    expect(document.getElementById("break-increment")).toBeDisabled();
    expect(document.getElementById("break-decrement")).toBeDisabled();
  });
});
