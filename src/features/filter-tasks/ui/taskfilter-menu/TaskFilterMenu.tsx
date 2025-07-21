import React, { useState } from 'react';
import { Group } from '@mantine/core';
import { CategoryTask, PriorityTask, StatusTask } from '@shared/types/TaskTypes';
import { FilterDropdown } from '../filters-dropdown/FiltersDropdown';

interface TaskFilterMenuProps {
  onFilterChange: (filters: { category?: string; status?: string; priority?: string }) => void;
}

export const TaskFilterMenu: React.FC<TaskFilterMenuProps> = ({ onFilterChange }) => {
  const [category, setCategory] = useState<string | null>(null);
  const [priority, setPriority] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (type: 'category' | 'priority' | 'status', value: string) => {
    const isAll = value === 'none';

    if (type === 'category') setCategory(isAll ? null : value);
    if (type === 'priority') setPriority(isAll ? null : value);
    if (type === 'status') setStatus(isAll ? null : value);

    onFilterChange({
      category: type === 'category' ? (isAll ? undefined : value) : category || undefined,
      priority: type === 'priority' ? (isAll ? undefined : value) : priority || undefined,
      status: type === 'status' ? (isAll ? undefined : value) : status || undefined,
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
      <FilterDropdown
        label='Статус'
        options={['none', ...Object.values(StatusTask)]}
        selected={status}
        onSelect={(val) => handleChange('status', val)}
      />
    </Group>
  );
};
