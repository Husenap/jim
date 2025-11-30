import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useQueryWithStatus } from "@/utils/use-query-with-status";
import { DateTime, Interval } from "luxon";
import { Dispatch, SetStateAction, useMemo } from "react";
import _ from "underscore";
type Setter<T> = Dispatch<SetStateAction<T>>;

type ExerciseItem = {
  exercise: Doc<"exercises">;
  id: string;
  superset?: number;
};

export function useCalendar() {
  const {
    data: dates,
    isPending: isPendingDates,
    isSuccess: isSuccessDates,
  } = useQueryWithStatus(api.measurements.dates);
  const {
    data: sickLeaves,
    isPending: isPendingSickLeaves,
    isSuccess: isSuccessSickLeaves,
  } = useQueryWithStatus(api.sickLeaves.get);

  const calendarData = useMemo(
    () =>
      _(dates).map(
        (millis) =>
          DateTime.fromMillis(millis).startOf("day") as DateTime<true>,
      ),
    [dates],
  );

  const daysWorkedOut = useMemo(
    () => new Set(calendarData.map((date) => date.toISODate())),
    [calendarData],
  );

  const sickData = useMemo(
    () =>
      _.chain(sickLeaves)
        .map((s) => ({
          start: DateTime.fromMillis(s.startTime),
          end: DateTime.fromMillis(s.endTime),
        }))
        .map((s) =>
          Interval.fromDateTimes(s.start, s.end.plus({ days: 1 }))
            .splitBy({
              days: 1,
            })
            .map((s) => s.start!.startOf("day")),
        )
        .flatten()
        .value(),
    [sickLeaves],
  );

  const daysSick = useMemo(
    () => new Set(sickData.map((s) => s.toISODate())),
    [sickData],
  );

  const context = useMemo(
    () => ({
      isPending: isPendingDates || isPendingSickLeaves,
      isSuccess: isSuccessDates && isSuccessSickLeaves,
      dates: dates ?? [],
      calendarData,
      daysWorkedOut,
      sickLeaves: sickLeaves ?? [],
      sickData,
      daysSick,
    }),
    [
      isPendingDates,
      isPendingSickLeaves,
      isSuccessDates,
      isSuccessSickLeaves,
      dates,
      sickLeaves,
      calendarData,
      daysWorkedOut,
      daysSick,
      sickData,
    ],
  );

  return context;
}

export type UseCalendarReturn = ReturnType<typeof useCalendar>;
