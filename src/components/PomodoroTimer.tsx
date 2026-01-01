import { usePomodoro } from "@/hooks/usePomodoro";
import { TimerRing } from "./TimerRing";
import { ModeSelector } from "./ModeSelector";
import { TimerControls } from "./TimerControls";
import { SessionTracker } from "./SessionTracker";
import { BookOpen, Sparkles } from "lucide-react";

const modeMessages = {
  work: "Time to focus! 📚",
  shortBreak: "Take a breather ☕",
  longBreak: "You earned this rest! 🌟",
};

export const PomodoroTimer = () => {
  const {
    mode,
    isRunning,
    progress,
    completedSessions,
    formattedTime,
    toggle,
    reset,
    changeMode,
    skip,
  } = usePomodoro();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-xl">
            <BookOpen size={24} className="text-primary" />
          </div>
          <h1 className="text-xl font-semibold">Focusly</h1>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Sparkles size={16} className="text-primary" />
          <span>Stay focused, stay ahead</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-12 gap-8">
        {/* Mode Selector */}
        <div className="animate-fade-in">
          <ModeSelector mode={mode} onModeChange={changeMode} />
        </div>

        {/* Timer */}
        <div className="animate-scale-in">
          <TimerRing progress={progress} mode={mode}>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2 font-medium">
                {modeMessages[mode]}
              </p>
              <div className="timer-display text-foreground">{formattedTime}</div>
              <p className="text-sm text-muted-foreground mt-2">
                {mode === "work" ? "Focus Session" : mode === "shortBreak" ? "Short Break" : "Long Break"}
              </p>
            </div>
          </TimerRing>
        </div>

        {/* Controls */}
        <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <TimerControls
            isRunning={isRunning}
            onToggle={toggle}
            onReset={reset}
            onSkip={skip}
            mode={mode}
          />
        </div>

        {/* Session Tracker */}
        <div className="w-full max-w-sm" style={{ animationDelay: "0.2s" }}>
          <SessionTracker completedSessions={completedSessions} targetSessions={8} />
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-sm text-muted-foreground">
        <p>The Pomodoro Technique: 25 min focus, 5 min break. Every 4 sessions, take a 15 min break.</p>
      </footer>
    </div>
  );
};
