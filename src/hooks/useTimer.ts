import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { MAX_MINUTES, MIN_MINUTES } from "../lib/schema";

export type TimingType = "session" | "break";

export const DEFAULT_BREAK = 5;
export const DEFAULT_SESSION = 25;

function clampMinutes(value: number): number {
  return Math.min(MAX_MINUTES, Math.max(MIN_MINUTES, Math.round(value)));
}

export interface UseTimerResult {
  breakLength: number;
  sessionLength: number;
  timeLeft: number;
  timingType: TimingType;
  isRunning: boolean;
  completedSessions: number;
  audioRef: RefObject<HTMLAudioElement | null>;
  adjustBreak: (delta: number) => void;
  adjustSession: (delta: number) => void;
  setDurations: (breakLength: number, sessionLength: number) => void;
  toggleRunning: () => void;
  reset: () => void;
}

// Holds all the timer state. One interval runs while the clock is going; a
// second effect deals with the boundary - beep at 00:00, then flip to the
// other phase a tick later so the display actually shows zero.
export function useTimer(): UseTimerResult {
  const [breakLength, setBreakLength] = useState(DEFAULT_BREAK);
  const [sessionLength, setSessionLength] = useState(DEFAULT_SESSION);
  const [timeLeft, setTimeLeft] = useState(DEFAULT_SESSION * 60);
  const [timingType, setTimingType] = useState<TimingType>("session");
  const [isRunning, setIsRunning] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!isRunning) return;
    const intervalId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [isRunning]);

  useEffect(() => {
    if (timeLeft === 0) {
      const audio = audioRef.current;
      if (audio) {
        audio.currentTime = 0;
        // play() can reject if there's been no user gesture yet
        void audio.play().catch(() => {});
      }
      return;
    }

    if (timeLeft < 0) {
      const nextType: TimingType =
        timingType === "session" ? "break" : "session";
      const nextLength = nextType === "break" ? breakLength : sessionLength;
      setTimingType(nextType);
      setTimeLeft(nextLength * 60);
      if (timingType === "session") {
        setCompletedSessions((count) => count + 1);
      }
    }
  }, [timeLeft, timingType, breakLength, sessionLength]);

  const adjustBreak = (delta: number) => {
    if (isRunning) return;
    const next = clampMinutes(breakLength + delta);
    setBreakLength(next);
    if (timingType === "break") {
      setTimeLeft(next * 60);
    }
  };

  const adjustSession = (delta: number) => {
    if (isRunning) return;
    const next = clampMinutes(sessionLength + delta);
    setSessionLength(next);
    if (timingType === "session") {
      setTimeLeft(next * 60);
    }
  };

  const setDurations = (nextBreak: number, nextSession: number) => {
    if (isRunning) return;
    const breakMinutes = clampMinutes(nextBreak);
    const sessionMinutes = clampMinutes(nextSession);
    setBreakLength(breakMinutes);
    setSessionLength(sessionMinutes);
    setTimingType("session");
    setTimeLeft(sessionMinutes * 60);
  };

  // keep a stable identity so the key listener isn't rebound every tick
  const toggleRunning = useCallback(() => setIsRunning((prev) => !prev), []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setBreakLength(DEFAULT_BREAK);
    setSessionLength(DEFAULT_SESSION);
    setTimingType("session");
    setTimeLeft(DEFAULT_SESSION * 60);
    setCompletedSessions(0);
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }, []);

  return {
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
  };
}
