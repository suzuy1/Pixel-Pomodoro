
"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const storedTasks = localStorage.getItem("pomodoro-tasks");
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error("Failed to load tasks from local storage:", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("pomodoro-tasks", JSON.stringify(tasks));
    } catch (error) {
      console.error("Failed to save tasks to local storage:", error);
    }
  }, [tasks]);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim() === "") return;
    const newTaskObject: Task = {
      id: Date.now(),
      text: newTask,
      completed: false,
    };
    setTasks([...tasks, newTaskObject]);
    setNewTask("");
    inputRef.current?.focus();
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  
  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  
  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const pixelButtonClasses = "font-headline font-bold border-2 border-foreground shadow-[4px_4px_0px_hsl(var(--foreground))] transition-all hover:shadow-[2px_2px_0px_hsl(var(--foreground))] active:shadow-none active:translate-x-1 active:translate-y-1 transform-gpu duration-150 dark:shadow-[4px_4px_0px_hsl(var(--primary))] dark:hover:shadow-[2px_2px_0px_hsl(var(--primary))]";

  return (
    <div className="w-full">
      <h2 className="text-lg sm:text-xl font-bold mb-4">Daftar Tugas</h2>
      <form onSubmit={addTask} className="flex gap-2 mb-4">
        <Input
          ref={inputRef}
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Tambahkan tugas baru..."
          className="h-10 text-sm"
        />
        <Button type="submit" className={cn(pixelButtonClasses, "h-10 text-sm px-4")}>
          Add
        </Button>
      </form>
      <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center gap-3 bg-muted p-2 border-2 border-foreground">
            <Checkbox
              id={`task-${task.id}`}
              checked={task.completed}
              onCheckedChange={() => toggleTask(task.id)}
            />
            <label
              htmlFor={`task-${task.id}`}
              className={cn(
                "flex-grow text-sm cursor-pointer",
                task.completed && "line-through text-muted-foreground"
              )}
            >
              {task.text}
            </label>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => deleteTask(task.id)}
              className="h-7 w-7 p-1 hover:bg-destructive/20"
              aria-label="Delete task"
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        ))}
         {tasks.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">
              Belum ada tugas. Tambahkan satu!
            </p>
          )}
      </div>
      {tasks.some(task => task.completed) && (
        <div className="mt-4 flex justify-end">
            <Button onClick={clearCompleted} variant="outline" className={cn(pixelButtonClasses, "h-9 text-xs px-3 bg-card")}>
                Clear Completed
            </Button>
        </div>
      )}
    </div>
  );
}
