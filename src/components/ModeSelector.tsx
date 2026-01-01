import { cn } from "@/lib/utils";

type TimerMode = "work" | "shortBreak" | "longBreak";

interface ModeSelectorProps {
  mode: TimerMode;
  onModeChange: (mode: TimerMode) => void;
}

const modes: { key: TimerMode; label: string; duration: string }[] = [
  { key: "work", label: "Focus", duration: "25 min" },
  { key: "shortBreak", label: "Short Break", duration: "5 min" },
  { key: "longBreak", label: "Long Break", duration: "15 min" },
];

const modeStyles = {
  work: "bg-timer-work text-primary-foreground",
  shortBreak: "bg-timer-break text-primary-foreground",
  longBreak: "bg-timer-longBreak text-primary-foreground",
};

export const ModeSelector = ({ mode, onModeChange }: ModeSelectorProps) => {
  return (
    <div className="flex gap-2 p-1.5 bg-muted/50 rounded-full backdrop-blur-sm">
      {modes.map((m) => (
        <button
          key={m.key}
          onClick={() => onModeChange(m.key)}
          className={cn(
            "mode-pill",
            mode === m.key
              ? cn(modeStyles[m.key], "mode-pill-active")
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          )}
        >
          <span className="font-medium">{m.label}</span>
        </button>
      ))}
    </div>
  );
};
