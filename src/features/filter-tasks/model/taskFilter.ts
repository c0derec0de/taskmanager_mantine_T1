
export interface Filters {
    category?: string;
    priority?: string;
  }
  
  export function taskFilter(
    currentFilters: Filters,
    type: "category" | "priority",
    value: string
  ): Filters {
    const isAll = value === "none";
  
    return {
      category:
        type === "category" ? (isAll ? undefined : value) : currentFilters.category,
      priority:
        type === "priority" ? (isAll ? undefined : value) : currentFilters.priority,
    };
  }