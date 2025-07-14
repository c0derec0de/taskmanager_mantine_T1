import {
  Button,
  Group,
  Select,
  SimpleGrid,
  Stack,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import { categories, statuses, priorities } from '../types/DetailConstants';
import { type Task } from '@shared/types/TaskTypes';
import { useTaskForm } from '../model/useTaskForm';
import classes from './TaskDetail.module.css';

interface TaskFormProps {
  task: Task;
  onCancel: () => void;
  onSave: (task: Task) => void;
}

export function TaskDetailForm({ task, onCancel, onSave }: TaskFormProps) {
  const { form, handleSubmit } = useTaskForm(task, onSave);

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} className={classes.form}>
      <Title order={2} size='h3' mb='md' className={classes.title}>
        Редактирование задачи
      </Title>

      <Stack gap='sm'>
        <TextInput
          label='Название'
          variant='filled'
          size='sm'
          {...form.getInputProps('title')}
          className={classes.input}
        />

        <Textarea
          label='Описание'
          variant='filled'
          autosize
          minRows={3}
          maxRows={6}
          size='sm'
          {...form.getInputProps('description')}
          className={classes.textarea}
        />

        <SimpleGrid cols={3} spacing='sm'>
          <Select
            label='Категория'
            data={categories}
            size='sm'
            {...form.getInputProps('category')}
            className={classes.select}
          />
          <Select
            label='Статус'
            data={statuses}
            size='sm'
            {...form.getInputProps('status')}
            className={classes.select}
          />
          <Select
            label='Приоритет'
            data={priorities}
            size='sm'
            {...form.getInputProps('priority')}
            className={classes.select}
          />
        </SimpleGrid>

        <Group mt='md' justify='space-between' gap='xs'>
          <Button
            type='button'
            onClick={onCancel}
            variant='subtle'
            color='gray'
            size='sm'
            className={classes.cancelButton}
          >
            Отменить
          </Button>
          <Button type='submit' size='sm' className={classes.submitButton}>
            Сохранить
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
