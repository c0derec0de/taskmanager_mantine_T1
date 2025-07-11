import { createContext, useContext } from "react";
import type { Task } from "@shared/types/TaskTypes";

interface TaskContextType {
  tasks: Task[];
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
    throw new Error("Контекст не найден");
  }
  return context;
};
