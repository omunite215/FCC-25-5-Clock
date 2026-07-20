import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

export interface LengthControlProps {
  label: string;
  // "break" or "session" — used to build the required element ids
  idPrefix: "break" | "session";
  value: number;
  disabled: boolean;
  onIncrement: () => void;
  onDecrement: () => void;
}

export function LengthControl({
  label,
  idPrefix,
  value,
  disabled,
  onIncrement,
  onDecrement,
}: LengthControlProps) {
  return (
    <div className="length-control">
      <h2 id={`${idPrefix}-label`} className="length-control__label">
        {label}
      </h2>
      <div className="length-control__stepper">
        <motion.button
          type="button"
          id={`${idPrefix}-decrement`}
          className="icon-button"
          onClick={onDecrement}
          disabled={disabled}
          whileTap={{ scale: 0.88 }}
          aria-label={`Decrease ${label}`}
        >
          <ChevronDown size={22} aria-hidden />
        </motion.button>
        <span id={`${idPrefix}-length`} className="length-control__value">
          {value}
        </span>
        <motion.button
          type="button"
          id={`${idPrefix}-increment`}
          className="icon-button"
          onClick={onIncrement}
          disabled={disabled}
          whileTap={{ scale: 0.88 }}
          aria-label={`Increase ${label}`}
        >
          <ChevronUp size={22} aria-hidden />
        </motion.button>
      </div>
    </div>
  );
}
