import { useLocation, useNavigate } from 'react-router-dom';
import { Title } from '@mantine/core';
import { TaskForm } from '../../../entities/task/ui/TaskForm/TaskForm';
import { type Task } from '../../../shared/types/TaskTypes';
import { useAppDispatch } from '../../../app/providers/hooks';
import { updateTaskThunk } from '@app/providers/taskSlice';

export function TaskDetail() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const task = state?.task as Task;

  const handleSave = async (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    try {
      await dispatch(
        updateTaskThunk({
          id: task.id,
          updatedTask: taskData,
        })
      ).unwrap();
      navigate('/');
    } catch (error) {
      console.log('Failed to update task:', error);
    }
  };

  const handleCancel = () => navigate('/');

  if (!task) {
    return <Title order={2}>Задача не найдена</Title>;
  }

  return <TaskForm task={task} onSave={handleSave} onCancel={handleCancel} />;
}
