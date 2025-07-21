import { fetchAllTasks } from '@/shared/api/TaskApi';
import { setTasks } from './taskSlice';

export const loadTasks = () => async (dispatch: any) => {
  try {
    const tasks = await fetchAllTasks();
    dispatch(setTasks(tasks));
  } catch (error) {
    console.log('error.message');
  }
};
