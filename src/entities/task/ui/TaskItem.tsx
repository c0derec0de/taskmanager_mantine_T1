import { Badge, Button, Card, Group, Text } from "@mantine/core";
import classes from "./TaskItem.module.css";
import type { Task } from "@shared/types/TaskTypes";
import { badgesStyles } from "../model/badgesStyles";
import { useNavigate } from "react-router-dom";
import { getCardBackground } from "../model/cardBackground";

export function TaskItem({ task }: { task: Task }) {
  const navigate = useNavigate();

  const handleGoEditTask = () => {
    navigate(`/task/${task.id}`);
  };

  function getBadge<T extends { key: string; label: string; emoji: string }>(
    list: T[],
    key: string,
    color: string
  ) {
    const item = list.find((i) => i.key === key);
    return item ? (
      <Badge color={color} variant="light">
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
        <Text fz="sm" mt="xs" className={classes.description}>
          {task.description}
        </Text>
      </Card.Section>

      <Group mt="sm">
        {getBadge(badgesStyles.badgesCategory, task.category, "blue")}
        {getBadge(badgesStyles.badgesPriority, task.priority, "gray")}
      </Group>

      <Group mt="md">
        <Button radius="md" style={{ flex: 1 }} onClick={handleGoEditTask}>
          Edit
        </Button>
      </Group>
    </Card>
  );
}
