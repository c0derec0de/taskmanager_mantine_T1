import { CreateTask } from '@features/create-task/model/CreateTask';
import { Title } from '@mantine/core';

const CreatePage = () => {
  return (
    <div>
      <Title order={2} size='h3' mb='md'>
        Создание задачи
      </Title>
      <CreateTask></CreateTask>
    </div>
  );
};

export default CreatePage;
