import { useNavigate } from 'react-router-dom';
import { TaskForm } from '../../../entities/task/ui/TaskForm/TaskForm';
import { createNewTask } from '../../../shared/api/TaskApi';
import { type Task } from '../../../shared/types/TaskTypes';

export function CreateTask() {
  const navigate = useNavigate();

  const handleSave = async (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    try {
      const createdTask = await createNewTask({
        title: taskData.title,
        description: taskData.description,
        category: taskData.category,
        status: taskData.status,
        priority: taskData.priority,
      });
      navigate('/');
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleCancel = () => navigate('/');

  const emptyTask: Omit<Task, 'id' | 'createdAt'> = {
    title: '',
    description: '',
    category: 'bug',
    status: 'to do',
    priority: 'medium',
  };

  return <TaskForm task={emptyTask} onSave={handleSave} onCancel={handleCancel} />;
}
