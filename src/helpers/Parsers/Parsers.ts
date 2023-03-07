export const toHoursAndMinutesParser = (externalMinutes: number) => {
  const minutes = externalMinutes % 60;
  const hours = Math.floor(externalMinutes / 60);

  return `${hours}h ${minutes > 0 ? `${minutes}min` : ''}`;
};
