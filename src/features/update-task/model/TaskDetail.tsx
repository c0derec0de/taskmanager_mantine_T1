import { useParams, useNavigate } from 'react-router-dom';
import { useTasks } from '@app/providers/TaskContext';
import { Title } from '@mantine/core';
import { TaskDetailForm } from '../ui/TaskDetailForm';

export function TaskDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { tasks, updateTask } = useTasks();

  const task = tasks.find((t) => t.id === id);

  const handleSave = (updatedTask: typeof task) => {
    if (!updatedTask) return;
    updateTask(updatedTask.id, updatedTask);
    navigate('/');
  };

  const handleCancel = () => navigate('/');

  if (!task) {
    return <Title order={2}>Задача не найдена</Title>;
  }

  return <TaskDetailForm task={task} onSave={handleSave} onCancel={handleCancel} />;
}
