import { createContext, useState, useContext, useMemo } from "react";
import type { Task } from "../types/TaskTypes";
import { mockTasks } from "../data/mockTasks";


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

export const TaskContext = createContext<TaskContextType>({
  tasks: [],
  addTask: () => {},
  updateTask: () => {},
  filterTasks: () => [],
});

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);


  const filterTasks = (filters: {
    category?: string;
    status?: string;
    priority?: string;
  }) => {
    return tasks.filter((task) => {
      return (
        (!filters.category || task.category === filters.category) &&
        (!filters.status || task.status === filters.status) &&
        (!filters.priority || task.priority === filters.priority)
      );
    });
  };

  const contextValue = useMemo(
    () => ({
      tasks,
      addTask: (task: Task) => setTasks([...tasks, task]),
      updateTask: (id: string, updatedTask: Task) =>
        setTasks(tasks.map((task) => (task.id === id ? updatedTask : task))),
      filterTasks,
    }),
    [tasks],
  );

  return (
    <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
  );
};
