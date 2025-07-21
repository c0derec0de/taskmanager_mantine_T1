import { type Task, CategoryTask, StatusTask, PriorityTask } from '../../shared/types/TaskTypes';

const API_BASE_URL = 'http://localhost:3000/tasks';

// Получить все задачи
export const fetchAllTasks = async (): Promise<Task[]> => {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }
  return response.json();
};

// Получить задачу по ID
export const fetchTaskById = async (id: string): Promise<Task> => {
  const response = await fetch(`${API_BASE_URL}/${id}`);
  if (!response.ok) {
    throw new Error('Task not found');
  }
  return response.json();
};

// Создать новую задачу
export const createNewTask = async (taskData: Omit<Task, 'id' | 'createdAt'>): Promise<Task> => {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to create task');
  }
  return response.json();
};

export const updateExistingTask = async (
  id: string,
  taskData: Partial<Omit<Task, 'id' | 'createdAt'>>
): Promise<Task> => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to update task');
  }

  return response.json();
};

// Удалить задачу
export const deleteExistingTask = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete task');
  }
};

export const getTaskEnums = () => {
  return {
    categories: Object.values(CategoryTask),
    statuses: Object.values(StatusTask),
    priorities: Object.values(PriorityTask),
  };
};
export { PriorityTask, StatusTask, CategoryTask };
