import { useState, useEffect, useCallback, useRef } from "react";

type TimerMode = "work" | "shortBreak" | "longBreak";

const DURATIONS: Record<TimerMode, number> = {
  work: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

export const usePomodoro = () => {
  const [mode, setMode] = useState<TimerMode>("work");
  const [timeLeft, setTimeLeft] = useState(DURATIONS[mode]);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const totalTime = DURATIONS[mode];
  const progress = (totalTime - timeLeft) / totalTime;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const toggle = useCallback(() => {
    setIsRunning((prev) => !prev);
  }, []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(DURATIONS[mode]);
  }, [mode]);

  const changeMode = useCallback((newMode: TimerMode) => {
    setMode(newMode);
    setTimeLeft(DURATIONS[newMode]);
    setIsRunning(false);
  }, []);

  const skip = useCallback(() => {
    if (mode === "work") {
      setCompletedSessions((prev) => prev + 1);
      const nextMode = (completedSessions + 1) % 4 === 0 ? "longBreak" : "shortBreak";
      changeMode(nextMode);
    } else {
      changeMode("work");
    }
  }, [mode, completedSessions, changeMode]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            // Auto transition
            if (mode === "work") {
              setCompletedSessions((s) => s + 1);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, mode]);

  // Play notification sound when timer ends
  useEffect(() => {
    if (timeLeft === 0) {
      // Simple notification
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification(
          mode === "work" ? "Focus session complete! 🎉" : "Break's over! Time to focus 📚"
        );
      }
    }
  }, [timeLeft, mode]);

  return {
    mode,
    timeLeft,
    isRunning,
    progress,
    completedSessions,
    formattedTime: formatTime(timeLeft),
    toggle,
    reset,
    changeMode,
    skip,
  };
};
