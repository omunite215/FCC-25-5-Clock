import { z } from "zod";

export const MIN_MINUTES = 1;
export const MAX_MINUTES = 60;

// minutes: whole number, 1-60
const minuteField = z.coerce
  .number({ invalid_type_error: "Enter a number" })
  .int("Whole minutes only")
  .min(MIN_MINUTES, `Minimum is ${MIN_MINUTES}`)
  .max(MAX_MINUTES, `Maximum is ${MAX_MINUTES}`);

export const durationsSchema = z.object({
  breakLength: minuteField,
  sessionLength: minuteField,
});

export type DurationsValues = z.output<typeof durationsSchema>;
export type DurationsInput = z.input<typeof durationsSchema>;
