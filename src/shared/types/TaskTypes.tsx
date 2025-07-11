export const CategoryTask = {
  BUG: "bug",
  FEATURE: "feature",
  DOCUMENTATION: "documentation",
  REFACTOR: "refactor",
  TEST: "test",
} as const;

export const StatusTask = {
  TO_DO: "to do",
  IN_PROGRESS: "in progress",
  DONE: "done",
} as const;

export const PriorityTask = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
} as const;

export type CategoryTask = (typeof CategoryTask)[keyof typeof CategoryTask];
export type StatusTask = (typeof StatusTask)[keyof typeof StatusTask];
export type PriorityTask = (typeof PriorityTask)[keyof typeof PriorityTask];

export interface Task {
  id: string;
  title: string;
  description?: string;
  category: CategoryTask;
  status: StatusTask;
  priority: PriorityTask;
  createdAt: Date;
}
