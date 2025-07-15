import type { Task } from '@shared/types/TaskTypes';
import { CategoryTask, StatusTask, PriorityTask } from '@shared/types/TaskTypes';

const getRandomDate = (daysRange: number = 30): Date => {
  const now = new Date();
  const pastDate = new Date();
  pastDate.setDate(now.getDate() - daysRange);

  const randomBuffer = new Uint32Array(1);
  crypto.getRandomValues(randomBuffer);
  const random = randomBuffer[0] / (0xffffffff + 1);

  return new Date(pastDate.getTime() + random * (now.getTime() - pastDate.getTime()));
};

const generateId = (): string => {
  return crypto.randomUUID();
};
const getRealisticStatus = (): StatusTask => {
  const rand = Math.random();
  return rand < 0.4 ? StatusTask.TO_DO : rand < 0.8 ? StatusTask.IN_PROGRESS : StatusTask.DONE;
};

const getRealisticPriority = (): PriorityTask => {
  const rand = Math.random();
  return rand < 0.6 ? PriorityTask.MEDIUM : rand < 0.85 ? PriorityTask.LOW : PriorityTask.HIGH;
};

export const mockTasks: Task[] = [
  {
    id: generateId(),
    title: 'Исправить баг с авторизацией',
    description: 'Пользователи не могут войти через Google OAuth',
    category: CategoryTask.BUG,
    status: StatusTask.IN_PROGRESS,
    priority: PriorityTask.HIGH,
    createdAt: getRandomDate(7),
  },
  {
    id: generateId(),
    title: 'Добавить темную тему',
    description: 'Реализовать переключение между светлой и темной темой',
    category: CategoryTask.FEATURE,
    status: StatusTask.TO_DO,
    priority: PriorityTask.MEDIUM,
    createdAt: getRandomDate(60),
  },
  {
    id: generateId(),
    title: 'Обновить документацию API',
    description: 'Добавить примеры запросов для всех endpoints',
    category: CategoryTask.DOCUMENTATION,
    status: StatusTask.DONE,
    priority: PriorityTask.LOW,
    createdAt: getRandomDate(90),
  },
  {
    id: generateId(),
    title: 'Рефакторинг модуля аутентификации',
    description: 'Разделить на подмодули и улучшить обработку ошибок',
    category: CategoryTask.REFACTOR,
    status: getRealisticStatus(),
    priority: getRealisticPriority(),
    createdAt: getRandomDate(45),
  },
  {
    id: generateId(),
    title: 'Интеграционные тесты для платежей',
    description: 'Покрыть тестами весь платежный модуль',
    category: CategoryTask.TEST,
    status: getRealisticStatus(),
    priority: PriorityTask.HIGH,
    createdAt: getRandomDate(14),
  },

  ...Array.from({ length: 5 }, (_, i) => ({
    id: generateId(),
    title: `Задача ${i + 6}`,
    description: `Описание для автоматически сгенерированной задачи #${i + 6}`,
    category:
      Object.values(CategoryTask)[Math.floor(Math.random() * Object.values(CategoryTask).length)],
    status: getRealisticStatus(),
    priority: getRealisticPriority(),
    createdAt: getRandomDate(365),
  })),
];
