import React, { useState } from "react";
import { IconChevronDown } from "@tabler/icons-react";
import { Center, Group, Menu } from "@mantine/core";
import classes from "./TaskFilterMenu.module.css";
import { CategoryTask, PriorityTask } from "../../types/TaskTypes";

interface TaskFilterMenuProps {
  onFilterChange: (filters: { category?: string; priority?: string }) => void;
}

export const TaskFilterMenu: React.FC<TaskFilterMenuProps> = ({
  onFilterChange,
}) => {
  const [category, setCategory] = useState<string | null>(null);
  const [priority, setPriority] = useState<string | null>(null);

  const handleChange = (type: "category" | "priority", value: string) => {
    const isAll = value === "none";

    if (type === "category") setCategory(isAll ? null : value);
    if (type === "priority") setPriority(isAll ? null : value);

    onFilterChange({
      category: type === "category" ? (isAll ? undefined : value) : category || undefined,
      priority: type === "priority" ? (isAll ? undefined : value) : priority || undefined,
    });
  };

  return (
    <Group gap={5} visibleFrom="sm">
      <FilterDropdown
        label="Категория"
        options={["none", ...Object.values(CategoryTask)]}
        selected={category}
        onSelect={(val) => handleChange("category", val)}
      />
      <FilterDropdown
        label="Приоритет"
        options={["none", ...Object.values(PriorityTask)]}
        selected={priority}
        onSelect={(val) => handleChange("priority", val)}
      />
    </Group>
  );
};

interface FilterDropdownProps {
  label: string;
  options: string[];
  selected: string | null;
  onSelect: (value: string) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  options,
  selected,
  onSelect,
}) => {
  return (
    <Menu trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
      <Menu.Target>
        <a
          href="#"
          className={classes.link}
          onClick={(e) => e.preventDefault()}
        >
          <Center>
            <span className={classes.linkLabel}>
              {label}
              {selected ? `: ${selected}` : ""}
            </span>
            <IconChevronDown size={14} stroke={1.5} />
          </Center>
        </a>
      </Menu.Target>
      <Menu.Dropdown>
        {options.map((option) => (
          <Menu.Item key={option} onClick={() => onSelect(option)}>
            {option}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};
