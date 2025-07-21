import {
  createSelector,
  createSlice,
  type PayloadAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import type { Task } from '@shared/types/TaskTypes';
import { fetchAllTasks, deleteExistingTask, updateExistingTask } from '@/shared/api/TaskApi';

type TasksState = {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  filters: {
    category?: string;
    status?: string;
    priority?: string;
  };
};

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
  filters: {},
};

type ApiError = {
  message: string;
  status?: number;
};

export const loadTasks = createAsyncThunk<Task[], void, { rejectValue: ApiError }>(
  'tasks/loadTasks',
  async (_, { rejectWithValue }) => {
    try {
      const tasks = await fetchAllTasks();
      return tasks;
    } catch (error) {
      const err = error as Error & { status?: number };
      return rejectWithValue({
        message: err.message,
        status: err.status,
      });
    }
  }
);

export const deleteTaskThunk = createAsyncThunk<string, string, { rejectValue: ApiError }>(
  'tasks/deleteTask',
  async (taskId, { rejectWithValue }) => {
    try {
      await deleteExistingTask(taskId);
      return taskId;
    } catch (error) {
      const err = error as Error & { status?: number };
      return rejectWithValue({
        message: err.message,
        status: err.status,
      });
    }
  }
);

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    createTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<{ id: string; updatedTask: Task }>) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload.updatedTask;
      }
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
    resetFilters: (state) => {
      state.filters = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(loadTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Неизвестная ошибка';
      })
      .addCase(deleteTaskThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTaskThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(deleteTaskThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Ошибка при удалении задачи';
      });
  },
});

export const { setTasks, setLoading, setError, createTask, updateTask, setFilters, resetFilters } =
  taskSlice.actions;

export const selectTasks = (state: { tasks: TasksState }) => state.tasks.tasks;
export const selectLoading = (state: { tasks: TasksState }) => state.tasks.loading;
export const selectError = (state: { tasks: TasksState }) => state.tasks.error;
export const selectFilters = (state: { tasks: TasksState }) => state.tasks.filters;

export const selectFilteredTasks = createSelector(
  [selectTasks, selectFilters],
  (tasks, filters) => {
    return tasks.filter((task) => {
      return (
        (!filters.category || task.category === filters.category) &&
        (!filters.status || task.status === filters.status) &&
        (!filters.priority || task.priority === filters.priority)
      );
    });
  }
);

export const updateTaskThunk = createAsyncThunk<
  { id: string; updatedTask: Task },
  { id: string; updatedTask: Partial<Task> },
  { rejectValue: ApiError }
>('tasks/updateTask', async ({ id, updatedTask }, { rejectWithValue }) => {
  try {
    const response = await updateExistingTask(id, updatedTask);
    return { id, updatedTask: response };
  } catch (error) {
    const err = error as Error & { status?: number };
    return rejectWithValue({
      message: err.message,
      status: err.status,
    });
  }
});

export const selectTaskById = (id: string) =>
  createSelector([selectTasks], (tasks) => tasks.find((task) => task.id === id));

export default taskSlice.reducer;
