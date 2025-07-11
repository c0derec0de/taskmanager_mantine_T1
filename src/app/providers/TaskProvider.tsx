import React, { useState, useCallback, useMemo } from "react";
import { TaskContext } from "./TaskContext";
import type { Task } from "@shared/types/TaskTypes";
import { mockTasks } from "../../data/mock/mockTasks";

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  const filterTasks = useCallback(
    (filters: { category?: string; status?: string; priority?: string }) => {
      return tasks.filter((task) => {
        return (
          (!filters.category || task.category === filters.category) &&
          (!filters.status || task.status === filters.status) &&
          (!filters.priority || task.priority === filters.priority)
        );
      });
    },
    [tasks]
  );

  const contextValue = useMemo(
    () => ({
      tasks,
      addTask: (task: Task) => setTasks((tasks) => [...tasks, task]),
      updateTask: (id: string, updatedTask: Task) =>
        setTasks((tasks) =>
          tasks.map((task) => (task.id === id ? updatedTask : task))
        ),
      filterTasks,
    }),
    [tasks, filterTasks]
  );

  return (
    <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
  );
};
