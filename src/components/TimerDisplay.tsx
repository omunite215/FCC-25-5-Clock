import { motion } from "framer-motion";
import type { TimingType } from "../hooks/useTimer";
import { formatTime } from "../lib/format";

export interface TimerDisplayProps {
  timingType: TimingType;
  timeLeft: number;
  totalSeconds: number;
}

const RADIUS = 130;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function TimerDisplay({
  timingType,
  timeLeft,
  totalSeconds,
}: TimerDisplayProps) {
  const label = timingType === "session" ? "Session" : "Break";
  const progress =
    totalSeconds > 0 ? Math.min(1, Math.max(0, timeLeft / totalSeconds)) : 0;
  const dashOffset = CIRCUMFERENCE * (1 - progress);
  const isLow = timeLeft > 0 && timeLeft <= 10;

  return (
    <div
      className={`timer-display timer-display--${timingType}`}
      data-testid="timer-display"
    >
      <svg
        className="timer-display__ring"
        viewBox="0 0 300 300"
        role="img"
        aria-label={`${label}: ${formatTime(timeLeft)} remaining`}
      >
        <circle
          className="timer-display__track"
          cx="150"
          cy="150"
          r={RADIUS}
        />
        <motion.circle
          className="timer-display__progress"
          cx="150"
          cy="150"
          r={RADIUS}
          transform="rotate(-90 150 150)"
          strokeDasharray={CIRCUMFERENCE}
          initial={false}
          animate={{ strokeDashoffset: dashOffset }}
          transition={{ duration: 0.5, ease: "linear" }}
        />
      </svg>
      <div className="timer-display__readout">
        <h3 id="timer-label" className="timer-display__label">
          {label}
        </h3>
        <div
          id="time-left"
          className="timer-display__time"
          data-low={isLow || undefined}
        >
          {formatTime(timeLeft)}
        </div>
      </div>
    </div>
  );
}
