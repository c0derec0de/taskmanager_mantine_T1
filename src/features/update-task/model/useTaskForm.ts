import { useForm } from '@mantine/form';
import { type Task, CategoryTask, StatusTask, PriorityTask } from '@shared/types/TaskTypes';

interface UseTaskFormOptions {
  initialTask: Partial<Task>;
  onSave: (task: Omit<Task, 'id' | 'createdAt'>) => Promise<void>;
}

export function useTaskForm({ initialTask, onSave }: UseTaskFormOptions) {
  const form = useForm<Task>({
    initialValues: {
      id: initialTask.id ?? '',
      title: initialTask.title ?? '',
      description: initialTask.description ?? '',
      category: initialTask.category ?? CategoryTask.BUG,
      status: initialTask.status ?? StatusTask.TO_DO,
      priority: initialTask.priority ?? PriorityTask.MEDIUM,
      createdAt: initialTask.createdAt ?? new Date(),
    },
    validate: {
      title: (value) => (value.trim().length === 0 ? 'Название обязательно' : null),
      category: (value) => (!value ? 'Категория обязательна' : null),
      status: (value) => (!value ? 'Статус обязателен' : null),
      priority: (value) => (!value ? 'Приоритет обязателен' : null),
    },
    validateInputOnChange: true,
  });

  const handleSubmit = (values: Task) => {
    const { id, createdAt, ...taskData } = values;
    onSave(taskData);
  };

  return { form, handleSubmit };
}
