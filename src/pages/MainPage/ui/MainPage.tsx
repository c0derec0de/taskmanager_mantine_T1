import { Container, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import classes from './MainPage.module.css';
import { TaskList } from '@widgets/TaskList/TaskList';
import { TaskFilterMenu } from '@/features/filter-tasks/ui/taskfilter-menu/TaskFilterMenu';
import { useAppDispatch, useAppSelector } from '@app/providers/hooks';
import { setFilters, selectFilteredTasks } from '@app/providers/taskSlice';

const MainPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const filteredTasks = useAppSelector(selectFilteredTasks);

  const handleFilterChange = (filters: {
    category?: string;
    status?: string;
    priority?: string;
  }) => {
    dispatch(setFilters(filters));
  };

  const handleCreateTask = () => {
    navigate('/task/new');
  };
  return (
    <div className={classes.main}>
      <Container size='md'>
        <div className={classes.inner}>
          <TaskFilterMenu onFilterChange={handleFilterChange} />
          <Button type='submit' size='sm' className={classes.addButton} onClick={handleCreateTask}>
            Добавить задачу
          </Button>
        </div>
      </Container>

      <div className={classes.taskListWrapper}>
        {filteredTasks.length > 0 ? (
          <TaskList tasks={filteredTasks} />
        ) : (
          <div className={classes.taskListNotExists}>Задачи не найдены.</div>
        )}
      </div>
    </div>
  );
};

export default MainPage;
