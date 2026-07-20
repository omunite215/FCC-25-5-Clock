import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { Settings2 } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { durationsSchema, type DurationsValues } from "../lib/schema";

export interface SettingsFormProps {
  breakLength: number;
  sessionLength: number;
  disabled: boolean;
  onApply: (breakLength: number, sessionLength: number) => void;
}

// Collapsible panel for typing exact minutes. Validated with zod via
// react-hook-form; valid values go back up through onApply.
export function SettingsForm({
  breakLength,
  sessionLength,
  disabled,
  onApply,
}: SettingsFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();
  const breakId = useId();
  const sessionId = useId();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DurationsValues>({
    resolver: zodResolver(durationsSchema),
    defaultValues: { breakLength, sessionLength },
    mode: "onSubmit",
  });

  // if the steppers or reset change things, mirror that in the inputs
  useEffect(() => {
    reset({ breakLength, sessionLength });
  }, [breakLength, sessionLength, reset]);

  const onSubmit = handleSubmit((values) => {
    onApply(values.breakLength, values.sessionLength);
  });

  return (
    <section className="settings">
      <button
        type="button"
        className="settings__toggle"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <Settings2 size={18} aria-hidden />
        <span>Custom durations</span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.form
            id={panelId}
            className="settings__panel"
            onSubmit={onSubmit}
            noValidate
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <div className="settings__field">
              <label htmlFor={breakId}>Break minutes</label>
              <input
                id={breakId}
                type="number"
                inputMode="numeric"
                min={1}
                max={60}
                disabled={disabled}
                aria-invalid={errors.breakLength ? true : undefined}
                {...register("breakLength", { valueAsNumber: true })}
              />
              {errors.breakLength && (
                <p className="settings__error" role="alert">
                  {errors.breakLength.message}
                </p>
              )}
            </div>

            <div className="settings__field">
              <label htmlFor={sessionId}>Session minutes</label>
              <input
                id={sessionId}
                type="number"
                inputMode="numeric"
                min={1}
                max={60}
                disabled={disabled}
                aria-invalid={errors.sessionLength ? true : undefined}
                {...register("sessionLength", { valueAsNumber: true })}
              />
              {errors.sessionLength && (
                <p className="settings__error" role="alert">
                  {errors.sessionLength.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="control-button control-button--primary settings__apply"
              disabled={disabled}
            >
              Apply
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </section>
  );
}
