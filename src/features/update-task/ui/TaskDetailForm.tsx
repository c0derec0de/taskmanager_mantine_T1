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
import { categories, statuses, priorities } from "../types/DetailConstants";
import {
  type Task,
} from "@shared/types/TaskTypes";
import { useTaskForm } from "../model/useTaskForm";

interface TaskFormProps {
  task: Task;
  onCancel: () => void;
  onSave: (task: Task) => void;
}

export function TaskDetailForm({ task, onCancel, onSave }: TaskFormProps) {
  const { form, handleSubmit } = useTaskForm(task, onSave);

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
