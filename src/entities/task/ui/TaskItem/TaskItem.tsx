import { Badge, Button, Card, Group, Text } from '@mantine/core';
import classes from './TaskItem.module.css';
import type { Task } from '@shared/types/TaskTypes';
import { badgesStyles } from '../../model/badgesStyles';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../../app/providers/hooks';
import { deleteTask } from '../../../../app/providers/taskSlice';
import { dateParser } from '../../../../shared/lib/date/dateParser';

export function TaskItem({ task }: { task: Task }) {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleGoEditTask = () => {
    navigate(`/task/${task.id}`, {
      state: { task },
    });
  };

  const handleGoDeleteTask = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    dispatch(deleteTask(task.id));
  };

  function getBadge<T extends { key: string; label: string; emoji: string }>(
    list: T[],
    key: string,
    color: string
  ) {
    const item = list.find((i) => i.key === key);
    return item ? (
      <Badge color={color} variant='light' radius='xs' size='sm' className={classes.badge}>
        {item.emoji} {item.label}
      </Badge>
    ) : null;
  }

  return (
    <Card withBorder radius='sm' p='md' className={classes.card}>
      <Text fz='md' fw={500} mb={4} className={classes.title} lineClamp={1}>
        {task.title}
      </Text>

      <Group justify='flex-end' mb='sm'>
        <Text fz='xs' c='dimmed' className={classes.date}>
          {dateParser(task.createdAt)}
        </Text>
      </Group>

      <Text fz='sm' c='dimmed' mb='sm' className={classes.description} lineClamp={2}>
        {task.description}
      </Text>

      <Group gap={4} mb='md' className={classes.badgesWrapper}>
        {getBadge(badgesStyles.badgesCategory, task.category, 'gray')}
        {getBadge(badgesStyles.badgesPriority, task.priority, 'gray')}
      </Group>

      <Group gap={4} justify='space-between' className={classes.actions}>
        <Button
          variant='subtle'
          size='xs'
          onClick={handleGoEditTask}
          className={classes.editButton}
        >
          Изменить
        </Button>
        <Button
          variant='subtle'
          color='red'
          size='xs'
          onClick={handleGoDeleteTask}
          className={classes.deleteButton}
        >
          Удалить
        </Button>
      </Group>
    </Card>
  );
}
