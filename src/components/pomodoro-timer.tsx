"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Settings, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { SettingsDialog } from "@/components/settings-dialog";
import { TodoList } from "@/components/todo-list";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { fetchQuote } from "@/app/actions";

const LONG_BREAK_INTERVAL = 4; // Number of focus sessions before a long break

type Mode = "focus" | "shortBreak" | "longBreak";

const modeTitles: Record<Mode, string> = {
  focus: "Fokus Time",
  shortBreak: "Short Break",
  longBreak: "Long Break",
};

export function PomodoroTimer({ initialQuote }: { initialQuote: string }) {
  const [durations, setDurations] = useState({
    focus: 25,
    shortBreak: 5,
    longBreak: 15,
  });
  const [mode, setMode] = useState<Mode>("focus");
  const [timeRemaining, setTimeRemaining] = useState(durations.focus * 60);
  const [isActive, setIsActive] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [showEndAlert, setShowEndAlert] = useState(false);
  const [nextMode, setNextMode] = useState<Mode>("shortBreak");
  const [quote, setQuote] = useState(initialQuote);
  const { toast } = useToast();
  const [isTimeVisible, setIsTimeVisible] = useState(true);

  const timeInSeconds = useMemo(() => ({
    focus: durations.focus * 60,
    shortBreak: durations.shortBreak * 60,
    longBreak: durations.longBreak * 60,
  }), [durations]);

  const switchMode = useCallback((newMode: Mode) => {
    setIsActive(false);
    setIsTimeVisible(false);
    setTimeout(() => {
        setMode(newMode);
        setTimeRemaining(timeInSeconds[newMode]);
        setIsTimeVisible(true);
    }, 300); // Corresponds to animation duration
  }, [timeInSeconds]);
  
  const resetTimer = useCallback(() => {
    setIsActive(false);
    setTimeRemaining(timeInSeconds[mode]);
  }, [mode, timeInSeconds]);

  const handleSessionEnd = useCallback(async () => {
    setIsActive(false);
    
    let newQuote = "Time for a break!";
    try {
        const result = await fetchQuote();
        if(result.quote) newQuote = result.quote;
    } catch (e) {
        console.error(e)
    }
    setQuote(newQuote)

    if (mode === "focus") {
      const newSessionsCompleted = sessionsCompleted + 1;
      setSessionsCompleted(newSessionsCompleted);
      const nextBreakMode = newSessionsCompleted % LONG_BREAK_INTERVAL === 0 ? "longBreak" : "shortBreak";
      setNextMode(nextBreakMode);
    } else {
        setNextMode("focus");
    }

    setShowEndAlert(true);
    
    // Play a notification sound
    const audio = new Audio('/notification.mp3');
    audio.play().catch(e => console.log("Failed to play notification sound. User interaction might be needed."));

  }, [mode, sessionsCompleted]);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          handleSessionEnd();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, handleSessionEnd]);

  useEffect(() => {
    resetTimer();
  }, [durations, resetTimer]);
  
  useEffect(() => {
    document.title = `${Math.floor(timeRemaining / 60)
      .toString()
      .padStart(2, "0")}:${(timeRemaining % 60).toString().padStart(2, "0")} | Pomodoro Timer`;
  }, [timeRemaining]);


  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };
  
  const handleConfirmAction = () => {
    switchMode(nextMode);
    setIsActive(true);
    setShowEndAlert(false);
  };

  const pixelatedCardClass = "w-full max-w-md mx-auto bg-card p-4 sm:p-8 border-4 border-foreground shadow-[8px_8px_0px_hsl(var(--foreground))]";
  const pixelButtonClasses = "font-headline font-bold border-2 border-foreground shadow-[4px_4px_0px_hsl(var(--foreground))] transition-all hover:shadow-[2px_2px_0px_hsl(var(--foreground))] active:shadow-none active:translate-x-1 active:translate-y-1 transform-gpu duration-150 dark:shadow-[4px_4px_0px_hsl(var(--primary))] dark:hover:shadow-[2px_2px_0px_hsl(var(--primary))] active:scale-95";

  return (
    <div className="flex flex-col gap-4">
      <div className={pixelatedCardClass}>
        <header className="flex justify-between items-center mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold">Pomodoro Timer</h1>
          <div className="flex gap-2">
              <Button
                  variant="ghost"
                  size="icon"
                  onClick={resetTimer}
                  className={cn(pixelButtonClasses, "w-10 h-10 sm:w-11 sm:h-11 p-0 bg-card hover:bg-muted")}
                  aria-label="Reset Timer"
              >
                  <RotateCcw className="h-5 w-5" />
              </Button>
              <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowSettings(true)}
                  className={cn(pixelButtonClasses, "w-10 h-10 sm:w-11 sm:h-11 p-0 bg-card hover:bg-muted")}
                  aria-label="Settings"
              >
                  <Settings className="h-5 w-5" />
              </Button>
          </div>
        </header>
        
        <Tabs value={mode} onValueChange={(value) => switchMode(value as Mode)} className="w-full mb-4">
          <TabsList className="grid w-full grid-cols-3 bg-muted p-1">
            <TabsTrigger value="focus" className="text-xs sm:text-sm">Focus</TabsTrigger>
            <TabsTrigger value="shortBreak" className="text-xs sm:text-sm">Short Break</TabsTrigger>
            <TabsTrigger value="longBreak" className="text-xs sm:text-sm">Long Break</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="text-center mb-4">
          <p className="text-base sm:text-lg text-foreground font-bold">{modeTitles[mode]}</p>
        </div>

        <div className="text-center my-6 sm:my-10 h-24 sm:h-28 md:h-32 flex items-center justify-center">
          <p
            className={cn(
                "text-7xl sm:text-8xl md:text-9xl font-headline text-foreground transition-all duration-300",
                isActive && "animate-pulse",
                isTimeVisible ? 'animate-in' : 'animate-out'
            )}
            aria-live="polite"
          >
            {formatTime(timeRemaining)}
          </p>
        </div>

        <div className="flex justify-center mb-6 sm:mb-8">
          <Button
            onClick={toggleTimer}
            className={cn(pixelButtonClasses, "bg-primary text-primary-foreground text-xl sm:text-2xl h-14 w-40 sm:h-16 sm:w-48")}
          >
            {isActive ? "Pause" : "Start"}
          </Button>
        </div>

        <div className="text-center min-h-[3rem] sm:min-h-[4rem] flex items-center justify-center p-2 bg-muted border-2 border-foreground">
          <p className="text-xs sm:text-sm italic text-muted-foreground">"{quote}"</p>
        </div>
      </div>
      
      <div className={cn(pixelatedCardClass, "mt-0")}>
        <TodoList />
      </div>

      <SettingsDialog
        open={showSettings}
        onOpenChange={setShowSettings}
        durations={durations}
        setDurations={setDurations}
      />
      
      <AlertDialog open={showEndAlert} onOpenChange={setShowEndAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {mode !== 'focus' ? 'Break Over!' : 'Session Ended!'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {mode !== 'focus'
                ? "Time to get back to focus!"
                : `Great work! Time for a ${nextMode === 'shortBreak' ? 'short' : 'long'} break?`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Dismiss</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmAction}>
              {mode !== 'focus' ? 'Start Focus' : 'Start Break'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
