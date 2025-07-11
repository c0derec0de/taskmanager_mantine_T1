import React from "react";
import { IconChevronDown } from "@tabler/icons-react";
import { Center, Menu } from "@mantine/core";
import classes from "./FiltersDropdown.module.css"

interface FilterDropdownProps {
  label: string;
  options: string[];
  selected: string | null;
  onSelect: (value: string) => void;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  options,
  selected,
  onSelect,
}) => {
  return (
    <Menu trigger="click" transitionProps={{ exitDuration: 0 }} withinPortal>
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
