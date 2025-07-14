import React, { useState } from 'react';
import { Group } from '@mantine/core';
import { CategoryTask, PriorityTask } from '@shared/types/TaskTypes';
import { FilterDropdown } from '../filters-dropdown/FiltersDropdown';

interface TaskFilterMenuProps {
  onFilterChange: (filters: { category?: string; priority?: string }) => void;
}

export const TaskFilterMenu: React.FC<TaskFilterMenuProps> = ({ onFilterChange }) => {
  const [category, setCategory] = useState<string | null>(null);
  const [priority, setPriority] = useState<string | null>(null);

  const handleChange = (type: 'category' | 'priority', value: string) => {
    const isAll = value === 'none';

    if (type === 'category') setCategory(isAll ? null : value);
    if (type === 'priority') setPriority(isAll ? null : value);

    onFilterChange({
      category: type === 'category' ? (isAll ? undefined : value) : category || undefined,
      priority: type === 'priority' ? (isAll ? undefined : value) : priority || undefined,
    });
  };

  return (
    <Group gap={5}>
      <FilterDropdown
        label='Категория'
        options={['none', ...Object.values(CategoryTask)]}
        selected={category}
        onSelect={(val) => handleChange('category', val)}
      />
      <FilterDropdown
        label='Приоритет'
        options={['none', ...Object.values(PriorityTask)]}
        selected={priority}
        onSelect={(val) => handleChange('priority', val)}
      />
    </Group>
  );
};
