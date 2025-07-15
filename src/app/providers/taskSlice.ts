import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Task } from '@shared/types/TaskTypes';
import { loadFromLocalStorage, saveToLocalStorage } from '../../shared/storage/localStorage';
import { mockTasks } from '@/data/mock/mockTasks';

const TASKS_KEY = 'tasks';

type TasksState = {
  tasks: Task[];
  filters: {
    category?: string;
    status?: string;
    priority?: string;
  };
};

const initialState: TasksState = {
  tasks: loadFromLocalStorage(TASKS_KEY, mockTasks),
  filters: {},
};

const saveTasks = (tasks: Task[]) => {
  saveToLocalStorage(TASKS_KEY, tasks);
};

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    createTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
      saveTasks(state.tasks);
    },
    updateTask: (state, action: PayloadAction<{ id: string; updatedTask: Task }>) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload.updatedTask;
        saveTasks(state.tasks);
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      saveTasks(state.tasks);
    },
    setFilters: (
      state,
      action: PayloadAction<{
        category?: string;
        status?: string;
        priority?: string;
      }>
    ) => {
      state.filters = action.payload;
    },
  },
});

export const { createTask, updateTask, deleteTask, setFilters } = taskSlice.actions;

export const selectTasks = (state: { tasks: TasksState }) => state.tasks.tasks;
export const selectFilters = (state: { tasks: TasksState }) => state.tasks.filters;
export const selectFilteredTasks = (state: { tasks: TasksState }) => {
  const { tasks, filters } = state.tasks;
  return tasks.filter((task) => {
    return (
      (!filters.category || task.category === filters.category) &&
      (!filters.status || task.status === filters.status) &&
      (!filters.priority || task.priority === filters.priority)
    );
  });
};

export default taskSlice.reducer;
