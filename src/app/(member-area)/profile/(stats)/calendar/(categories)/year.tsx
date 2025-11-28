import { useCalendarContext } from "@/components/calendar/calendar-context";
import ChartWrapper from "@/components/charts/chart-wrapper";
import { TypographyH1, TypographyH2 } from "@/components/typography";
import { ResponsiveTimeRange } from "@nivo/calendar";
import { DateTime, Interval } from "luxon";
import { useEffect, useMemo, useRef } from "react";
import _ from "underscore";

export default function Year() {
  const { calendarData, daysWorkedOut, sickData } = useCalendarContext();

  const monthCalendarData = useMemo(() => {
    if (calendarData.length === 0) return [];

    let startMonth = _.chain(calendarData)
      .map((date) => date.startOf("month"))
      .min()
      .value() as DateTime;
    const endMonth = (
      _.chain(calendarData)
        .map((date) => date.startOf("month"))
        .max()
        .value() as DateTime
    ).plus({ months: 1 });

    const monthIntervals = Interval.fromDateTimes(startMonth, endMonth).splitBy(
      { months: 1 },
    );

    return _.chain(monthIntervals)
      .groupBy((i) => i.start!.year)
      .mapObject((l) =>
        _.chain(l)
          .mapObject((i) => ({
            i,
            cd: calendarData
              .concat(sickData)
              .filter((date) => i.contains(date))
              .map((date) => ({
                day: date.toFormat("yyyy-MM-dd"),
                value: daysWorkedOut.has(date.toISODate()) ? 1 : 0,
              })),
          }))
          .value(),
      )
      .value();
  }, [calendarData]);

  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: "instant" });
    }
  }, [calendarData]);

  return (
    <>
      <ChartWrapper>
        {(theme, nivoTheme, colors) => (
          <>
            {_(monthCalendarData).map((monthData, year) => (
              <div key={year}>
                <TypographyH1 className="text-center">{year}</TypographyH1>
                <div className="grid grid-cols-3 gap-4">
                  {_(monthData).map(({ i, cd }) => (
                    <div key={i.toISODate()}>
                      <TypographyH2 className="text-center">
                        {i.start!.monthLong}
                      </TypographyH2>
                      <div className="aspect-square">
                        <ResponsiveTimeRange
                          theme={nivoTheme}
                          colors={[colors[1], colors[0]]}
                          data={cd}
                          from={i.start!.toJSDate()}
                          to={i.end!.toJSDate()}
                          margin={{ top: 12, right: 0, bottom: 0, left: 0 }}
                          firstWeekday="monday"
                          weekdayLegendOffset={0}
                          weekdayTicks={[]}
                          dayRadius={6}
                          direction="vertical"
                          monthLegendOffset={4}
                          align="top"
                          isInteractive={false}
                          {...theme.timeRange}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
      </ChartWrapper>
      <div ref={endRef}></div>
    </>
  );
}
