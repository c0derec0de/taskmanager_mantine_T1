import { useEffect, useState } from 'react';
import { fetchAllTasks, deleteExistingTask } from '../../../../shared/api/TaskApi';
import { type Task } from '@shared/types/TaskTypes';

export function useTaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchAllTasks();
        console.log('Fetched tasks:', data);
        setTasks(data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteExistingTask(id);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {}
  };

  return { tasks, loading, handleDeleteTask };
}
