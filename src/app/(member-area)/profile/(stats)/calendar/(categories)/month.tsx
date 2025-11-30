import { useCalendarContext } from "@/components/calendar/calendar-context";
import { TypographyH1 } from "@/components/typography";
import { cn } from "@heroui/react";
import { DateTime, Interval } from "luxon";
import { useEffect, useMemo, useRef } from "react";
import _ from "underscore";

export default function Month() {
  const { calendarData, daysSick, daysWorkedOut } = useCalendarContext();

  const months = useMemo(() => {
    if (calendarData.length === 0) return [];

    let firstMonth = _.chain(calendarData)
      .map((date) => date.startOf("month"))
      .min()
      .value() as DateTime;
    const lastMonth = _.chain(calendarData)
      .map((date) => date.startOf("month"))
      .max()
      .value() as DateTime;

    const res = [];

    while (firstMonth <= lastMonth) {
      res.push(firstMonth);
      firstMonth = firstMonth.plus({ months: 1 });
    }

    return res;
  }, [calendarData]);

  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: "instant" });
    }
  }, [daysWorkedOut]);

  return (
    <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2 lg:grid-cols-3">
      {months.map((month) => (
        <div key={month.toISODate()} className="mt-4">
          <TypographyH1>
            {month.toFormat("MMMM")} {month.toFormat("yyyy")}
          </TypographyH1>
          <div className="grid grid-cols-7">
            {_.range(month.weekday - 1).map((i) => (
              <span key={i}></span>
            ))}
            {Interval.fromDateTimes(month, month.plus({ month: 1 }))
              .splitBy({ day: 1 })
              .map((d) => (
                <div
                  key={d.start!.toISODate()}
                  className="border-content4 flex border-t p-2"
                >
                  <div
                    className={cn(
                      "flex aspect-square h-8 items-center justify-center rounded-full",
                      {
                        "bg-secondary text-secondary-foreground": daysSick.has(
                          d.start!.toISODate(),
                        ),
                      },
                      {
                        "bg-primary text-primary-foreground": daysWorkedOut.has(
                          d.start!.toISODate(),
                        ),
                      },
                    )}
                  >
                    {d.start!.day}
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
      <div ref={endRef}></div>
    </div>
  );
}
