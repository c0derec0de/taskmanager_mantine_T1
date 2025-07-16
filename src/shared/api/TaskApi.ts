import { type Task } from '../types/TaskTypes';

const API_BASE_URL = 'http://localhost:3001/tasks';

type GetTasksParams = {
  status?: Task['status'];
  priority?: Task['priority'];
  category?: Task['category'];
};

export const taskApi = {
  // Получить все задачи
  getAllTasks: async (params?: GetTasksParams): Promise<Task[]> => {
    const query = new URLSearchParams();
    if (params?.status) query.append('status', params.status);
    if (params?.priority) query.append('priority', params.priority);
    if (params?.category) query.append('category', params.category);

    const response = await fetch(`${API_BASE_URL}?${query.toString()}`);
    if (!response.ok) throw new Error('Failed to fetch tasks');
    return response.json();
  },

  // Получить задачу по ID
  getTaskById: async (id: string): Promise<Task> => {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) throw new Error('Task not found');
    return response.json();
  },

  // Создать задачу
  createTask: async (taskData: Omit<Task, 'id' | 'createdAt'>): Promise<Task> => {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });
    if (!response.ok) throw new Error('Failed to create task');
    return response.json();
  },

  // Обновить задачу
  updateTask: async (id: string, updates: Partial<Task>): Promise<Task> => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    if (!response.ok) throw new Error('Failed to update task');
    return response.json();
  },

  // Удалить задачу
  deleteTask: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete task');
  },
};
