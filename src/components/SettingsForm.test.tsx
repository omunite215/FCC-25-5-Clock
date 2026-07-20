import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SettingsForm } from "./SettingsForm";

type User = ReturnType<typeof userEvent.setup>;

async function openPanel(user: User) {
  await user.click(screen.getByRole("button", { name: /custom durations/i }));
}

describe("SettingsForm", () => {
  it("reveals the duration inputs when expanded", async () => {
    const user = userEvent.setup();
    render(
      <SettingsForm
        breakLength={5}
        sessionLength={25}
        disabled={false}
        onApply={() => {}}
      />,
    );
    await openPanel(user);
    expect(screen.getByLabelText(/break minutes/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/session minutes/i)).toBeInTheDocument();
  });

  it("shows a validation error and does not apply invalid values", async () => {
    const onApply = vi.fn();
    const user = userEvent.setup();
    render(
      <SettingsForm
        breakLength={5}
        sessionLength={25}
        disabled={false}
        onApply={onApply}
      />,
    );
    await openPanel(user);
    const breakInput = screen.getByLabelText(/break minutes/i);
    await user.clear(breakInput);
    await user.type(breakInput, "0");
    await user.click(screen.getByRole("button", { name: /apply/i }));

    expect(await screen.findByText("Minimum is 1")).toBeInTheDocument();
    expect(onApply).not.toHaveBeenCalled();
  });

  it("applies valid custom durations", async () => {
    const onApply = vi.fn();
    const user = userEvent.setup();
    render(
      <SettingsForm
        breakLength={5}
        sessionLength={25}
        disabled={false}
        onApply={onApply}
      />,
    );
    await openPanel(user);
    const breakInput = screen.getByLabelText(/break minutes/i);
    const sessionInput = screen.getByLabelText(/session minutes/i);
    await user.clear(breakInput);
    await user.type(breakInput, "10");
    await user.clear(sessionInput);
    await user.type(sessionInput, "40");
    await user.click(screen.getByRole("button", { name: /apply/i }));

    await waitFor(() => expect(onApply).toHaveBeenCalledWith(10, 40));
  });

  it("disables the inputs while the timer runs", async () => {
    const user = userEvent.setup();
    render(
      <SettingsForm
        breakLength={5}
        sessionLength={25}
        disabled
        onApply={() => {}}
      />,
    );
    await openPanel(user);
    expect(screen.getByLabelText(/break minutes/i)).toBeDisabled();
    expect(screen.getByRole("button", { name: /apply/i })).toBeDisabled();
  });
});
