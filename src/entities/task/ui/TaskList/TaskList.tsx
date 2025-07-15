import { Container, SimpleGrid, Stack, Title, Paper } from '@mantine/core';
import { TaskItem } from '@/entities/task/ui/TaskItem/TaskItem';
import { StatusTask, type Task } from '@shared/types/TaskTypes';

interface TaskListProps {
  tasks: Task[];
}

export function TaskList({ tasks }: TaskListProps) {
  const statuses = [
    { label: 'To Do', value: StatusTask.TO_DO },
    { label: 'In Progress', value: StatusTask.IN_PROGRESS },
    { label: 'Done', value: StatusTask.DONE },
  ];

  const getTasksByStatus = (status: string) => tasks.filter((task) => task.status === status);

  return (
    <Container my='md'>
      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing='lg'>
        {statuses.map((status) => (
          <Stack key={status.value}>
            <Title order={4}>{status.label}</Title>
            <Paper p='sm' radius='md' bg='transparent'>
              <Stack>
                {getTasksByStatus(status.value).map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </Stack>
            </Paper>
          </Stack>
        ))}
      </SimpleGrid>
    </Container>
  );
}
