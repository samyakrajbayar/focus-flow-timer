import { Play, Pause, RotateCcw, SkipForward } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimerControlsProps {
  isRunning: boolean;
  onToggle: () => void;
  onReset: () => void;
  onSkip: () => void;
  mode: "work" | "shortBreak" | "longBreak";
}

const modeStyles = {
  work: "bg-timer-work hover:bg-timer-work/90 shadow-[0_8px_30px_-8px_hsl(15_80%_55%/0.5)]",
  shortBreak: "bg-timer-break hover:bg-timer-break/90 shadow-[0_8px_30px_-8px_hsl(160_50%_45%/0.5)]",
  longBreak: "bg-timer-longBreak hover:bg-timer-longBreak/90 shadow-[0_8px_30px_-8px_hsl(220_60%_55%/0.5)]",
};

export const TimerControls = ({
  isRunning,
  onToggle,
  onReset,
  onSkip,
  mode,
}: TimerControlsProps) => {
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={onReset}
        className="control-button bg-muted/80 hover:bg-muted text-muted-foreground hover:text-foreground"
        aria-label="Reset timer"
      >
        <RotateCcw size={20} />
      </button>

      <button
        onClick={onToggle}
        className={cn(
          "control-button text-primary-foreground p-6",
          modeStyles[mode]
        )}
        aria-label={isRunning ? "Pause timer" : "Start timer"}
      >
        {isRunning ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
      </button>

      <button
        onClick={onSkip}
        className="control-button bg-muted/80 hover:bg-muted text-muted-foreground hover:text-foreground"
        aria-label="Skip to next session"
      >
        <SkipForward size={20} />
      </button>
    </div>
  );
};
