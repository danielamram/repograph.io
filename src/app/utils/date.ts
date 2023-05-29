export function toReadableDate(date: Date) {
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - date.getTime();
  const secondsInAMinute = 60;
  const minutesInAnHour = 60;
  const hoursInADay = 24;
  const daysInAWeek = 7;
  const weeksInAMonth = 4;
  const monthsInAYear = 12;

  if (timeDifference < 0) {
    return "Date is in the future";
  }

  const seconds = Math.floor(timeDifference / 1000);
  if (seconds < secondsInAMinute) {
    return "Less than a minute ago";
  }

  const minutes = Math.floor(seconds / secondsInAMinute);
  if (minutes < minutesInAnHour) {
    return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  }

  const hours = Math.floor(minutes / minutesInAnHour);
  if (hours < hoursInADay) {
    return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  }

  const days = Math.floor(hours / hoursInADay);
  if (days < daysInAWeek) {
    return `${days} day${days === 1 ? "" : "s"} ago`;
  }

  const weeks = Math.floor(days / daysInAWeek);
  if (weeks < weeksInAMonth) {
    return `${weeks} week${weeks === 1 ? "" : "s"} ago`;
  }

  const months = Math.floor(weeks / weeksInAMonth);
  if (months < monthsInAYear) {
    return `${months} month${months === 1 ? "" : "s"} ago`;
  }

  const years = Math.floor(months / monthsInAYear);
  return `${years} year${years === 1 ? "" : "s"} ago`;
}
