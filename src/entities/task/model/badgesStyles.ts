import { CategoryTask, PriorityTask } from "@shared/types/TaskTypes";

export const badgesStyles = {
  badgesCategory: [
    {
      key: CategoryTask.BUG,
      label: "Bug",
      emoji: "🐞",
    },
    {
      key: CategoryTask.FEATURE,
      label: "Feature",
      emoji: "🚀",
    },
    {
      key: CategoryTask.DOCUMENTATION,
      label: "Docs",
      emoji: "📄",
    },
    {
      key: CategoryTask.REFACTOR,
      label: "Refactor",
      emoji: "🛠️",
    },
    {
      key: CategoryTask.TEST,
      label: "Test",
      emoji: "🧪",
    },
  ],
  badgesPriority: [
    {
      key: PriorityTask.LOW,
      label: "Low",
      emoji: "🟢",
    },
    {
      key: PriorityTask.MEDIUM,
      label: "Medium",
      emoji: "🟡",
    },
    {
      key: PriorityTask.HIGH,
      label: "High",
      emoji: "🔴",
    },
  ],
};
