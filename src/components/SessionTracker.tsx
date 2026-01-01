import { Target, Coffee } from "lucide-react";
import { cn } from "@/lib/utils";

interface SessionTrackerProps {
  completedSessions: number;
  targetSessions: number;
}

export const SessionTracker = ({
  completedSessions,
  targetSessions,
}: SessionTrackerProps) => {
  return (
    <div className="glass-card p-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-xl">
            <Target size={20} className="text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Today's Progress</p>
            <p className="text-2xl font-semibold font-mono">
              {completedSessions}
              <span className="text-muted-foreground text-lg"> / {targetSessions}</span>
            </p>
          </div>
        </div>

        <div className="flex gap-1.5">
          {Array.from({ length: targetSessions }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                i < completedSessions
                  ? "bg-primary scale-100"
                  : "bg-muted scale-90"
              )}
            />
          ))}
        </div>
      </div>

      {completedSessions >= 4 && (
        <div className="mt-4 pt-4 border-t border-border/50 flex items-center gap-2 text-sm text-muted-foreground">
          <Coffee size={16} className="text-timer-break" />
          <span>Great focus! Consider a longer break.</span>
        </div>
      )}
    </div>
  );
};
