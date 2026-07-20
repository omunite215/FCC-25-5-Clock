import { useEffect } from "react";

export interface KeyboardShortcuts {
  onToggle: () => void;
  onReset: () => void;
}

const EDITABLE_TAGS = new Set(["INPUT", "TEXTAREA", "SELECT"]);

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return EDITABLE_TAGS.has(target.tagName) || target.isContentEditable;
}

// Space = start/stop, R = reset. Skipped while typing in a field.
export function useKeyboardShortcuts({
  onToggle,
  onReset,
}: KeyboardShortcuts): void {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.repeat || isTypingTarget(event.target)) return;

      if (event.code === "Space") {
        event.preventDefault();
        onToggle();
      } else if (event.code === "KeyR") {
        onReset();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onToggle, onReset]);
}
