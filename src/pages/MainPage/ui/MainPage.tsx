import { Container, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import classes from './MainPage.module.css';
import { TaskList } from '@/entities/task/ui/TaskList/TaskList';
import { TaskFilterMenu } from '@/features/filter-tasks/ui/taskfilter-menu/TaskFilterMenu';
import { useAppDispatch, useAppSelector } from '@app/providers/hooks';
import {
  setFilters,
  selectFilteredTasks,
  selectLoading,
  selectError,
  loadTasks,
} from '@app/providers/taskSlice';
import { useEffect } from 'react';

const MainPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const filteredTasks = useAppSelector(selectFilteredTasks);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);

  useEffect(() => {
    dispatch(loadTasks());
  }, [dispatch]);

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
          <Button
            variant='subtle'
            size='sm'
            onClick={handleCreateTask}
            className={classes.addButton}
            color='black'
          >
            Добавить задачу
          </Button>
        </div>
      </Container>

      <div className={classes.taskListWrapper}>
        {error ? (
          <div className={classes.error}>Ошибка загрузки задач: {error}</div>
        ) : loading ? (
          <div className={classes.taskListNotExists}>Загрузка задач...</div>
        ) : filteredTasks.length > 0 ? (
          <TaskList tasks={filteredTasks} />
        ) : (
          <div className={classes.taskListNotExists}>Задачи не найдены.</div>
        )}
      </div>
    </div>
  );
};

export default MainPage;
