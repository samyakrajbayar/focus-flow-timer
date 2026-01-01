import { cn } from "@/lib/utils";

interface TimerRingProps {
  progress: number;
  mode: "work" | "shortBreak" | "longBreak";
  size?: number;
  strokeWidth?: number;
  children?: React.ReactNode;
}

const modeColors = {
  work: "stroke-timer-work",
  shortBreak: "stroke-timer-break",
  longBreak: "stroke-timer-longBreak",
};

const modeGlows = {
  work: "drop-shadow-[0_0_20px_hsl(15_80%_55%/0.4)]",
  shortBreak: "drop-shadow-[0_0_20px_hsl(160_50%_45%/0.4)]",
  longBreak: "drop-shadow-[0_0_20px_hsl(220_60%_55%/0.4)]",
};

export const TimerRing = ({
  progress,
  mode,
  size = 320,
  strokeWidth = 8,
  children,
}: TimerRingProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - progress * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg
        width={size}
        height={size}
        className={cn("transform -rotate-90 transition-all duration-300", modeGlows[mode])}
      >
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className="stroke-muted/50"
        />
        {/* Progress ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={cn("timer-ring", modeColors[mode])}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};
