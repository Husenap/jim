import ChartWrapper from "@/components/charts/chart-wrapper";
import { TypographyH1, TypographyH2 } from "@/components/typography";
import { api } from "@/convex/_generated/api";
import { useQueryWithStatus } from "@/utils/use-query-with-status";
import { ResponsiveTimeRange } from "@nivo/calendar";
import { DateTime, Interval } from "luxon";
import { useEffect, useMemo, useRef } from "react";
import _ from "underscore";

export default function Year() {
  const { data } = useQueryWithStatus(api.measurements.bodyweight);

  const calendarData = useMemo(
    () =>
      _(data).map((r) => ({
        ...r,
        date: DateTime.fromMillis(r.date),
      })),
    [data],
  );

  const monthCalendarData2 = useMemo(() => {
    if (calendarData.length === 0) return [];

    let startMonth = _.chain(calendarData)
      .map(({ date }) => date.startOf("month"))
      .min()
      .value() as DateTime;
    const endMonth = (
      _.chain(calendarData)
        .map(({ date }) => date.startOf("month"))
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
              .filter(({ date }) => i.contains(date))
              .map(({ date }) => ({
                day: date.toFormat("yyyy-MM-dd"),
                value: 0,
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
            {_(monthCalendarData2).map((monthData, year) => (
              <div key={year}>
                <TypographyH1 className="text-center">{year}</TypographyH1>
                <div className="grid grid-cols-3 gap-4">
                  {_(monthData).map(({ i, cd }) => (
                    <div key={i.toISO()}>
                      <TypographyH2 className="text-center">
                        {i.start!.monthLong}
                      </TypographyH2>
                      <div className="aspect-square">
                        <ResponsiveTimeRange
                          theme={nivoTheme}
                          colors={[colors[0]]}
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
