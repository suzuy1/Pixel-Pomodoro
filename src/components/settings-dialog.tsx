"use client";

import { useState, useEffect, type Dispatch, type SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  durations: {
    focus: number;
    shortBreak: number;
    longBreak: number;
  };
  setDurations: Dispatch<SetStateAction<{
    focus: number;
    shortBreak: number;
    longBreak: number;
  }>>;
}

export function SettingsDialog({ open, onOpenChange, durations, setDurations }: SettingsDialogProps) {
  const [localDurations, setLocalDurations] = useState(durations);
  const { toast } = useToast();

  useEffect(() => {
    setLocalDurations(durations);
  }, [durations]);

  const handleSave = () => {
    if(localDurations.focus <= 0 || localDurations.shortBreak <= 0 || localDurations.longBreak <= 0){
        toast({
            title: "Invalid Duration",
            description: "Durations must be greater than 0.",
            variant: "destructive",
        })
        return;
    }
    setDurations(localDurations);
    onOpenChange(false);
    toast({
        title: "Settings Saved!",
        description: "Your new timer durations have been applied.",
    })
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalDurations(prev => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] rounded-none border-4 border-foreground shadow-[8px_8px_0px_hsl(var(--foreground))]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Customize your Pomodoro timer durations (in minutes).
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="focus" className="text-right">
              Focus
            </Label>
            <Input
              id="focus"
              name="focus"
              type="number"
              value={localDurations.focus}
              onChange={handleChange}
              className="col-span-3"
              min="1"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="shortBreak" className="text-right">
              Short Break
            </Label>
            <Input
              id="shortBreak"
              name="shortBreak"
              type="number"
              value={localDurations.shortBreak}
              onChange={handleChange}
              className="col-span-3"
              min="1"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="longBreak" className="text-right">
              Long Break
            </Label>
            <Input
              id="longBreak"
              name="longBreak"
              type="number"
              value={localDurations.longBreak}
              onChange={handleChange}
              className="col-span-3"
              min="1"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSave}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
