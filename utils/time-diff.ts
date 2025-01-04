export function humanReadibleTimeDiff(startTime?: number | Date, endTime?: number | Date): string {
  startTime = startTime ?? new Date();
  if (startTime instanceof Date) {
    startTime = startTime.getTime();
  }
  endTime = endTime ?? new Date();
  if (endTime instanceof Date) {
    endTime = endTime.getTime();
  }

  const timeDifference = Math.abs(endTime - startTime);
  const tense = endTime > startTime ? 'ago' : 'from now';

  const secondsAgo = timeDifference / 1000;
  const minutesAgo = secondsAgo / 60;
  const hoursAgo = minutesAgo / 60;
  const daysAgo = hoursAgo / 24;
  const monthsAgo = daysAgo / 30;
  const yearsAgo = monthsAgo / 12;

  if (monthsAgo >= 12) {
    const year = Math.round(yearsAgo);
    if (year === 1) {
      return `A year ${tense}`;
    } else {
      return `${year} years ${tense}`;
    }
  } else if (daysAgo >= 30) {
    const month = Math.round(monthsAgo);
    if (month === 1) {
      return `A month ${tense}`;
    } else {
      return `${month} months ${tense}`;
    }
  } else if (hoursAgo >= 24) {
    const day = Math.round(daysAgo);
    if (day === 1) {
      if (tense === "ago") {
        return "Yesterday";
      } else {
        return "Tomorrow";
      }
    } else {
      return `${day} days ${tense}`;
    }
  } else if (minutesAgo >= 60) {
    const hour = Math.round(hoursAgo);
    if (hour === 1) {
      return `An hour ${tense}`;
    } else {
      return `${hour} hours ${tense}`;
    }
  } else if (secondsAgo >= 60) {
    const minute = Math.round(minutesAgo);
    if (minute === 1) {
      return `A minute ${tense}`;
    } else {
      return `${minute} minutes ${tense}`;
    }
  } else if (secondsAgo >= 1) {
    const second = Math.round(secondsAgo);
    if (second === 1) {
      return `A second ${tense}`;
    } else {
      return `${second} seconds ${tense}`;
    }
  }
  return "Now";
};

export function humanReadiableDuration(startTime?: number | Date, endTime?: number | Date) {
  startTime = startTime ?? new Date();
  if (startTime instanceof Date) {
    startTime = startTime.getTime();
  }
  endTime = endTime ?? new Date();
  if (endTime instanceof Date) {
    endTime = endTime.getTime();
  }

  const timeDifference = Math.abs(endTime - startTime);

  const hours = Math.floor(timeDifference / (3600 * 1000));
  const minutes = Math.floor((timeDifference % (3600 * 1000)) / (60 * 1000));
  const seconds = Math.floor((timeDifference % (60 * 1000)) / 1000);

  if (hours >= 1) {
    return `${hours}h ${minutes}min ${seconds}s`;
  } else if (minutes >= 1) {
    return `${minutes}min ${seconds}s`;
  } else {
    return `${seconds}s`;
  }
}