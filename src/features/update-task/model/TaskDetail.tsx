import { useLocation, useNavigate } from 'react-router-dom';
import { Title } from '@mantine/core';
import { TaskForm } from '../ui/TaskForm';
import { updateTask } from '../../../app/providers/taskSlice';
import { type Task } from '../../../shared/types/TaskTypes';
import { useAppDispatch } from '../../../app/providers/hooks';

export function TaskDetail() {
  const { state } = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const task = state?.task as Task;

  const handleSave = (updatedTask: Task) => {
    dispatch(updateTask({ id: task.id, updatedTask }));
    navigate('/');
  };

  const handleCancel = () => navigate('/');

  if (!task) {
    return <Title order={2}>Задача не найдена</Title>;
  }

  return <TaskForm task={task} onSave={handleSave} onCancel={handleCancel} />;
}
