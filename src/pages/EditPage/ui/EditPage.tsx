import { TaskDetail } from '@features/update-task/model/TaskDetail';
import { Title } from '@mantine/core';

const EditPage = () => {
  return (
    <div>
      <Title order={2} size='h3' mb='md'>
        Редактирование задачи
      </Title>
      <TaskDetail></TaskDetail>
    </div>
  );
};

export default EditPage;
