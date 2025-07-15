import { useForm } from '@mantine/form';
import { type Task, CategoryTask, StatusTask, PriorityTask } from '@shared/types/TaskTypes';

export function useTaskForm(initialTask: Partial<Task>, onSave: (task: Task) => void) {
  const form = useForm<Task>({
    initialValues: {
      id: initialTask.id ?? '',
      title: initialTask.title ?? '',
      description: initialTask.description ?? '',
      category: initialTask.category ?? CategoryTask.FEATURE,
      status: initialTask.status ?? StatusTask.TO_DO,
      priority: initialTask.priority ?? PriorityTask.MEDIUM,
      createdAt: initialTask.createdAt ?? new Date(),
    },
    validate: {
      title: (value) => (value.trim().length === 0 ? 'Title is required' : null),
      category: (value) => (!value ? 'Category is required' : null),
      status: (value) => (!value ? 'Status is required' : null),
      priority: (value) => (!value ? 'Priority is required' : null),
    },
    validateInputOnChange: true,
  });

  const handleSubmit = (values: typeof form.values) => {
    const taskToSave: Task = {
      ...values,
      id: values.id || generateTaskId(),
      createdAt: values.createdAt instanceof Date ? values.createdAt : new Date(values.createdAt),
    };
    onSave(taskToSave);
  };

  return { form, handleSubmit };
}

function generateTaskId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
}
