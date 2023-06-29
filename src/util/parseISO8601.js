export default function parseISO8601(dateString) {
  const currentDate = new Date();
  const parsedDate = new Date(`${dateString}Z`);

  const timeDifference = currentDate.getTime() - parsedDate.getTime();

  const secondsDifference = Math.floor(timeDifference / 1000);
  const minutesDifference = Math.floor(secondsDifference / 60);
  const hoursDifference = Math.floor(minutesDifference / 60);
  const daysDifference = Math.floor(hoursDifference / 24);
  const weeksDifference = Math.floor(daysDifference / 7);
  const monthsDifference = Math.floor(daysDifference / 30);
  const yearsDifference = Math.floor(daysDifference / 365);

  if (yearsDifference >= 1) {
    return `${yearsDifference} YEAR${yearsDifference > 1 ? 'S' : ''} AGO`;
  } else if (monthsDifference >= 1) {
    return `${monthsDifference} MONTH${monthsDifference > 1 ? 'S' : ''} AGO`;
  } else if (weeksDifference >= 1) {
    return `${weeksDifference} WEEK${weeksDifference > 1 ? 'S' : ''} AGO`;
  } else if (daysDifference >= 1) {
    return `${daysDifference} DAY${daysDifference > 1 ? 'S' : ''} AGO`;
  } else if (hoursDifference >= 1) {
    return `${hoursDifference} HOUR${hoursDifference > 1 ? 'S' : ''} AGO`;
  } else if (minutesDifference >= 1) {
    return `${minutesDifference} MINUTE${minutesDifference > 1 ? 'S' : ''} AGO`;
  } else {
    return 'JUST NOW';
  }
}