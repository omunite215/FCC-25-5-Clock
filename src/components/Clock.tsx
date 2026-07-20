import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts";
import { useTimer } from "../hooks/useTimer";
import { formatTime } from "../lib/format";
import { ControlButtons } from "./ControlButtons";
import { LengthControl } from "./LengthControl";
import { SettingsForm } from "./SettingsForm";
import { TimerDisplay } from "./TimerDisplay";

export function Clock() {
  const {
    breakLength,
    sessionLength,
    timeLeft,
    timingType,
    isRunning,
    completedSessions,
    audioRef,
    adjustBreak,
    adjustSession,
    setDurations,
    toggleRunning,
    reset,
  } = useTimer();

  const label = timingType === "session" ? "Session" : "Break";
  const totalSeconds =
    (timingType === "session" ? sessionLength : breakLength) * 60;

  useDocumentTitle(`${formatTime(timeLeft)} · ${label} — 25 + 5 Clock`);
  useKeyboardShortcuts({ onToggle: toggleRunning, onReset: reset });

  return (
    <main className="clock" data-mode={timingType}>
      <div className="clock__card">
        <h1 className="clock__title">25 + 5 Clock</h1>

        <div className="clock__lengths">
          <LengthControl
            label="Break Length"
            idPrefix="break"
            value={breakLength}
            disabled={isRunning}
            onIncrement={() => adjustBreak(1)}
            onDecrement={() => adjustBreak(-1)}
          />
          <LengthControl
            label="Session Length"
            idPrefix="session"
            value={sessionLength}
            disabled={isRunning}
            onIncrement={() => adjustSession(1)}
            onDecrement={() => adjustSession(-1)}
          />
        </div>

        <TimerDisplay
          timingType={timingType}
          timeLeft={timeLeft}
          totalSeconds={totalSeconds}
        />

        <ControlButtons
          isRunning={isRunning}
          onToggle={toggleRunning}
          onReset={reset}
        />

        <motion.p
          className="clock__counter"
          aria-live="polite"
          key={completedSessions}
          initial={{ scale: 0.85, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 320, damping: 20 }}
        >
          <CheckCircle2 size={16} aria-hidden />
          {completedSessions}{" "}
          {completedSessions === 1 ? "session" : "sessions"} completed
        </motion.p>

        <SettingsForm
          breakLength={breakLength}
          sessionLength={sessionLength}
          disabled={isRunning}
          onApply={setDurations}
        />

        <p className="clock__hint">
          <kbd>Space</kbd> start / pause &nbsp;·&nbsp; <kbd>R</kbd> reset
        </p>

        <footer className="clock__footer">
          Made by Om Patel · rebuilt with React + TypeScript
        </footer>
      </div>

      <audio id="beep" ref={audioRef} preload="auto" src="/alarm_beeps.mp3" />
    </main>
  );
}
