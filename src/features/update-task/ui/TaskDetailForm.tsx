import {
  Button,
  Group,
  Select,
  SimpleGrid,
  Stack,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { categories, statuses, priorities } from "../types/DetailConstants";
import {
  CategoryTask,
  PriorityTask,
  StatusTask,
  type Task,
} from "@shared/types/TaskTypes";

interface TaskFormProps {
  task: Task;
  onCancel: () => void;
  onSave: (task: Task) => void;
}

export function TaskDetailForm({ task, onCancel, onSave }: TaskFormProps) {
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

  return (
    <form
      onSubmit={form.onSubmit(handleSubmit)}
      style={{ maxWidth: 600, margin: "auto" }}
    >
      <Title order={2} size="h2" ta="center" mb="md">
        Редактирование задачи
      </Title>

      <Stack>
        <TextInput
          label="Название"
          variant="filled"
          size="sm"
          {...form.getInputProps("title")}
        />

        <Textarea
          label="Описание"
          variant="filled"
          autosize
          minRows={3}
          maxRows={6}
          size="sm"
          {...form.getInputProps("description")}
        />

        <SimpleGrid cols={3} spacing="sm">
          <Select
            label="Категория"
            data={categories}
            size="sm"
            {...form.getInputProps("category")}
          />
          <Select
            label="Статус"
            data={statuses}
            size="sm"
            {...form.getInputProps("status")}
          />
          <Select
            label="Приоритет"
            data={priorities}
            size="sm"
            {...form.getInputProps("priority")}
          />
        </SimpleGrid>

        <Group mt="md">
          <Button type="submit" size="sm">
            Сохранить
          </Button>
          <Button type="button" onClick={onCancel} variant="default" size="sm">
            Отменить
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
