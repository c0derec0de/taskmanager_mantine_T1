import { createContext, useContext } from "react";
import type { Task } from "@shared/types/TaskTypes";

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (id: string, updatedTask: Task) => void;
  filterTasks: (filters: {
    category?: string;
    status?: string;
    priority?: string;
  }) => Task[];
}

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};
