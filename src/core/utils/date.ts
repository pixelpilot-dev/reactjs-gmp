export const getYear = (date: string | Date) => {
  const dateFormat = typeof date === 'string' ? new Date(date) : date;

  return dateFormat.getFullYear();
};

export const getMonth = (date: Date) => date.getMonth();

export const getTime = (timeInMinutes: number) => {
  const hours = Math.floor(timeInMinutes / 60);
  const minutes = timeInMinutes % 60;

  return `${hours}h ${minutes}min`;
};

export const getIsoDate = (value: Date) => {
  const [date, time] = value.toISOString().split('T');

  return date;
};
