import { useNavigate } from 'react-router-dom';
import { TaskForm } from '../../../entities/task/ui/TaskForm/TaskForm';
import { createTask } from '../../../app/providers/taskSlice';
import { type Task } from '../../../shared/types/TaskTypes';
import { useAppDispatch } from '../../../app/providers/hooks';

export function CreateTask() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSave = (newTask: Task) => {
    const taskToCreate: Task = {
      ...newTask,
    };
    dispatch(createTask(taskToCreate));
    navigate('/');
  };

  let taskIdCounter = 0;

  const generateId = () => {
    taskIdCounter += 1;
    return taskIdCounter.toString();
  };

  const emptyTask: Task = {
    id: generateId(),
    title: '',
    description: '',
    category: 'bug',
    status: 'to do',
    priority: 'medium',
    createdAt: new Date(),
  };

  const handleCancel = () => navigate('/');

  return <TaskForm task={emptyTask} onSave={handleSave} onCancel={handleCancel} />;
}
