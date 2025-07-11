import { type Task } from "@shared/types/TaskTypes";

export function getCardBackground(priority: Task["priority"]) {
  switch (priority) {
    case "high":
      return "#ffe5e5";
    case "medium":
      return "#fff8e1";
    case "low":
      return "#e8f5e9";
    default:
      return "#ffffff";
  }
}
