import React from "react";
import { Burger, Container } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./MainPage.module.css";
import { TaskList } from "../../components/TaskList/TaskList";
import { TaskFilterMenu } from "../../components/TaskFilterMenu/TaskFilterMenu";
import { useTasks } from "../../context/TaskContext";

const MainPage = () => {
  const [opened, { toggle }] = useDisclosure(false);
  const { tasks } = useTasks();

  const [filteredTasks, setFilteredTasks] = React.useState(tasks);

  const handleFilterChange = (filters: {
    category?: string;
    status?: string;
    priority?: string;
  }) => {
    const filtered = tasks.filter((task) => {
      return (
        (!filters.category || task.category === filters.category) &&
        (!filters.status || task.status === filters.status) &&
        (!filters.priority || task.priority === filters.priority)
      );
    });
    setFilteredTasks(filtered);
  };

  React.useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  return (
    <div className={classes.main}>
      <Container size="md">
        <div className={classes.inner}>
          <TaskFilterMenu onFilterChange={handleFilterChange} />
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
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
