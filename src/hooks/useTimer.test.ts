import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useTimer } from "./useTimer";

interface MockAudio {
  play: ReturnType<typeof vi.fn>;
  pause: ReturnType<typeof vi.fn>;
  currentTime: number;
}

function attachMockAudio(
  audioRef: React.RefObject<HTMLAudioElement | null>,
): MockAudio {
  const audio: MockAudio = {
    play: vi.fn().mockResolvedValue(undefined),
    pause: vi.fn(),
    currentTime: 7,
  };
  audioRef.current = audio as unknown as HTMLAudioElement;
  return audio;
}

describe("useTimer", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("starts with FCC default values", () => {
    const { result } = renderHook(() => useTimer());
    expect(result.current.breakLength).toBe(5);
    expect(result.current.sessionLength).toBe(25);
    expect(result.current.timeLeft).toBe(1500);
    expect(result.current.timingType).toBe("session");
    expect(result.current.isRunning).toBe(false);
    expect(result.current.completedSessions).toBe(0);
  });

  it("decrements session length and syncs time-left while stopped", () => {
    const { result } = renderHook(() => useTimer());
    act(() => result.current.adjustSession(-1));
    expect(result.current.sessionLength).toBe(24);
    expect(result.current.timeLeft).toBe(1440);
  });

  it("clamps break and session lengths to [1, 60]", () => {
    const { result } = renderHook(() => useTimer());
    act(() => result.current.adjustSession(-100));
    expect(result.current.sessionLength).toBe(1);
    act(() => result.current.adjustSession(100));
    expect(result.current.sessionLength).toBe(60);
    act(() => result.current.adjustBreak(-100));
    expect(result.current.breakLength).toBe(1);
    act(() => result.current.adjustBreak(100));
    expect(result.current.breakLength).toBe(60);
  });

  it("ignores adjustments while running", () => {
    const { result } = renderHook(() => useTimer());
    act(() => result.current.toggleRunning());
    act(() => result.current.adjustSession(-1));
    expect(result.current.sessionLength).toBe(25);
  });

  it("ticks down one second at a time while running", () => {
    const { result } = renderHook(() => useTimer());
    act(() => result.current.toggleRunning());
    act(() => vi.advanceTimersByTime(1000));
    expect(result.current.timeLeft).toBe(1499);
  });

  it("beeps at zero and switches session -> break, counting the session", () => {
    const { result } = renderHook(() => useTimer());
    const audio = attachMockAudio(result.current.audioRef);

    act(() => result.current.adjustSession(-100)); // session = 1 min (60s)
    act(() => result.current.toggleRunning());

    act(() => vi.advanceTimersByTime(60_000)); // reach 00:00
    expect(result.current.timeLeft).toBe(0);
    expect(audio.play).toHaveBeenCalledTimes(1);

    act(() => vi.advanceTimersByTime(1000)); // cross below zero -> switch
    expect(result.current.timingType).toBe("break");
    expect(result.current.timeLeft).toBe(300); // breakLength (5) * 60
    expect(result.current.completedSessions).toBe(1);
  });

  it("applies custom durations from setDurations while stopped", () => {
    const { result } = renderHook(() => useTimer());
    act(() => result.current.setDurations(10, 40));
    expect(result.current.breakLength).toBe(10);
    expect(result.current.sessionLength).toBe(40);
    expect(result.current.timeLeft).toBe(2400);
    expect(result.current.timingType).toBe("session");
  });

  it("resets everything and rewinds the audio", () => {
    const { result } = renderHook(() => useTimer());
    const audio = attachMockAudio(result.current.audioRef);

    act(() => result.current.adjustSession(-5));
    act(() => result.current.toggleRunning());
    act(() => result.current.reset());

    expect(result.current.breakLength).toBe(5);
    expect(result.current.sessionLength).toBe(25);
    expect(result.current.timeLeft).toBe(1500);
    expect(result.current.timingType).toBe("session");
    expect(result.current.isRunning).toBe(false);
    expect(result.current.completedSessions).toBe(0);
    expect(audio.pause).toHaveBeenCalled();
    expect(audio.currentTime).toBe(0);
  });
});
