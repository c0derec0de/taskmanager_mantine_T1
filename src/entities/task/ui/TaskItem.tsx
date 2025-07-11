import { Badge, Button, Card, Group, Text } from "@mantine/core";
import classes from "./TaskItem.module.css";
import type { Task } from "@shared/types/TaskTypes";
import { badgesStyles } from "./badgesStyles";
import { useNavigate } from "react-router-dom";

export function TaskItem({ task }: { task: Task }) {
  const navigate = useNavigate();

  function getCardBackground(priority: Task["priority"]) {
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

  const handleGoEditTask = () => {
    navigate(`/task/${task.id}`);
  };

  function getCategoryBadge(category: Task["category"]) {
    const item = badgesStyles.badgesCategory.find((i) => i.key === category);
    return item ? (
      <Badge color="blue" variant="light">
        {item.emoji} {item.label}
      </Badge>
    ) : null;
  }

  function getPriorityBadge(priority: Task["priority"]) {
    const item = badgesStyles.badgesPriority.find((i) => i.key === priority);
    return item ? (
      <Badge color="gray" variant="light">
        {item.emoji} {item.label}
      </Badge>
    ) : null;
  }

  return (
    <Card
      withBorder
      radius="md"
      p="md"
      className={classes.card}
      style={{ backgroundColor: getCardBackground(task.priority) }}
    >
      <Card.Section className={classes.section} mt="md">
        <Group justify="apart">
          <Text fz="lg" fw={500}>
            {task.title}
          </Text>
        </Group>
        <Text fz="sm" mt="xs">
          {task.description}
        </Text>
      </Card.Section>

      <Group mt="sm">
        {getCategoryBadge(task.category)}
        {getPriorityBadge(task.priority)}
      </Group>

      <Group mt="md">
        <Button radius="md" style={{ flex: 1 }} onClick={handleGoEditTask}>
          Edit
        </Button>
      </Group>
    </Card>
  );
}
