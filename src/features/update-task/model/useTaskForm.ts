import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { CategoryTask, PriorityTask, StatusTask, type Task } from "@shared/types/TaskTypes";

export function useTaskForm(task: Task, onSave: (task: Task) => void) {
  const form = useForm({
    initialValues: {
      title: task?.title || "",
      description: task?.description || "",
      category: task?.category || CategoryTask.BUG,
      status: task?.status || StatusTask.TO_DO,
      priority: task?.priority || PriorityTask.LOW,
    },
    validate: {
      title: (value) => (value.trim().length > 0 ? null : "Введите название"),
      description: (value) =>
        value.trim().length > 0 ? null : "Введите описание",
    },
  });

  useEffect(() => {
    form.setValues({
      title: task.title,
      description: task.description,
      category: task.category,
      status: task.status,
      priority: task.priority,
    });
  }, [task]);

  const handleSubmit = () => {
    onSave({
      ...task,
      ...form.values,
    });
  };

  return { form, handleSubmit };
}
