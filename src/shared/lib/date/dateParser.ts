export const dateParser = (date: Date | string | undefined): string => {
  if (!date) return 'Дата не указана';

  const parsedDate = typeof date === 'string' ? new Date(date) : date;

  return parsedDate.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
