import { Button, Select, Textarea, TextInput } from '@mantine/core';
import {
  categories,
  statuses,
  priorities,
} from '../../../../features/update-task/types/DetailConstants';
import { type Task } from '@shared/types/TaskTypes';
import { useTaskForm } from '../../../../features/update-task/model/useTaskForm';
import classes from './TaskForm.module.css';

interface TaskFormProps {
  task: Task;
  onCancel: () => void;
  onSave: (task: Task) => void;
}

export function TaskForm({ task, onCancel, onSave }: TaskFormProps) {
  const { form, handleSubmit } = useTaskForm(task, onSave);

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} className={classes.form}>
      <div className={classes.formContent}>
        <TextInput
          label='Title'
          placeholder='Enter task name'
          size='md'
          radius='md'
          {...form.getInputProps('title')}
          classNames={{ input: classes.input }}
        />

        <Textarea
          label='Description'
          placeholder='Task details'
          autosize
          minRows={3}
          size='md'
          radius='md'
          {...form.getInputProps('description')}
          classNames={{ input: classes.textarea }}
        />

        <div className={classes.selectGroup}>
          <Select
            label='Category'
            data={categories}
            size='md'
            radius='md'
            {...form.getInputProps('category')}
            classNames={{ input: classes.select }}
          />
          <Select
            label='Status'
            data={statuses}
            size='md'
            radius='md'
            {...form.getInputProps('status')}
            classNames={{ input: classes.select }}
          />
          <Select
            label='Priority'
            data={priorities}
            size='md'
            radius='md'
            {...form.getInputProps('priority')}
            classNames={{ input: classes.select }}
          />
        </div>

        <div className={classes.actions}>
          <Button
            type='button'
            onClick={onCancel}
            variant='light'
            size='md'
            radius='md'
            color='black'
            className={classes.secondaryAction}
          >
            Cancel
          </Button>
          <Button
            type='submit'
            color='black'
            size='md'
            radius='md'
            className={classes.primaryAction}
          >
            Save Task
          </Button>
        </div>
      </div>
    </form>
  );
}
