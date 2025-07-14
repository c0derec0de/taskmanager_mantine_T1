import { CategoryTask, PriorityTask, StatusTask } from '@shared/types/TaskTypes';

export const categories = [
  { value: CategoryTask.BUG, label: 'Bug' },
  { value: CategoryTask.FEATURE, label: 'Feature' },
  { value: CategoryTask.DOCUMENTATION, label: 'Documentation' },
  { value: CategoryTask.REFACTOR, label: 'Refactor' },
  { value: CategoryTask.TEST, label: 'Test' },
];

export const statuses = [
  { value: StatusTask.TO_DO, label: 'To Do' },
  { value: StatusTask.IN_PROGRESS, label: 'In Progress' },
  { value: StatusTask.DONE, label: 'Done' },
];

export const priorities = [
  { value: PriorityTask.LOW, label: 'Low' },
  { value: PriorityTask.MEDIUM, label: 'Medium' },
  { value: PriorityTask.HIGH, label: 'High' },
];
