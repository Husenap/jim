function timeToMillis(time?: number | Date) {
  time = time ?? new Date();
  if (time instanceof Date) {
    time = time.getTime();
  }
  return time;
}

function calculateTimeDiff({
  startTime,
  endTime,
}: {
  startTime?: number | Date;
  endTime?: number | Date;
}) {
  startTime = timeToMillis(startTime);
  endTime = timeToMillis(endTime);
  return endTime - startTime;
}

export function humanReadableTimeDiff({
  startTime,
  endTime,
}: {
  startTime?: number | Date;
  endTime?: number | Date;
}): string {
  let timeDifference = calculateTimeDiff({ startTime, endTime });
  const tense = timeDifference > 0 ? "ago" : "from now";
  timeDifference = Math.abs(timeDifference);

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
}

export function humanReadableDuration({
  startTime,
  endTime,
  includeSeconds = true,
}: {
  startTime?: number | Date;
  endTime?: number | Date;
  includeSeconds?: boolean;
}) {
  startTime = timeToMillis(startTime);
  endTime = timeToMillis(endTime);

  const timeDifference = Math.abs(calculateTimeDiff({ startTime, endTime }));

  const hours = Math.floor(timeDifference / (3600 * 1000));
  const minutes = Math.floor((timeDifference % (3600 * 1000)) / (60 * 1000));
  const seconds = Math.floor((timeDifference % (60 * 1000)) / 1000);

  const parts = [];
  if (hours >= 1) {
    parts.push(`${hours}h`);
  }
  if (minutes >= 1) {
    parts.push(`${minutes}min`);
  }
  if ((includeSeconds && seconds >= 1) || parts.length === 0) {
    parts.push(`${seconds}s`);
  }
  return parts.join(" ");
}
