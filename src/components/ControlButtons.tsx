import { motion } from "framer-motion";
import { Pause, Play, RotateCcw } from "lucide-react";

export interface ControlButtonsProps {
  isRunning: boolean;
  onToggle: () => void;
  onReset: () => void;
}

export function ControlButtons({
  isRunning,
  onToggle,
  onReset,
}: ControlButtonsProps) {
  return (
    <div className="control-buttons">
      <motion.button
        type="button"
        id="start_stop"
        className="control-button control-button--primary"
        onClick={onToggle}
        whileTap={{ scale: 0.93 }}
        aria-label={isRunning ? "Pause" : "Start"}
        aria-pressed={isRunning}
      >
        {isRunning ? (
          <Pause size={20} aria-hidden />
        ) : (
          <Play size={20} aria-hidden />
        )}
        <span>{isRunning ? "Pause" : "Start"}</span>
      </motion.button>
      <motion.button
        type="button"
        id="reset"
        className="control-button"
        onClick={onReset}
        whileTap={{ scale: 0.93 }}
        aria-label="Reset"
      >
        <RotateCcw size={20} aria-hidden />
        <span>Reset</span>
      </motion.button>
    </div>
  );
}
