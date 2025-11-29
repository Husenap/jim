import { useCalendarContext } from "@/components/calendar/calendar-context";
import ChartWrapper from "@/components/charts/chart-wrapper";
import { TypographyH1 } from "@/components/typography";
import { ResponsiveTimeRange } from "@nivo/calendar";
import { useEffect, useMemo, useRef } from "react";
import _ from "underscore";

export default function MultiYear() {
  const { calendarData, sickData, daysWorkedOut } = useCalendarContext();

  const yearCalendarData = useMemo(
    () =>
      _.chain(calendarData)
        .concat(sickData)
        .groupBy((date) => date.year)
        .mapObject((l) =>
          _.chain(l)
            .map((date) => ({
              day: date.toFormat("yyyy-MM-dd"),
              value: daysWorkedOut.has(date.toISODate()) ? 1 : 0,
            }))
            .uniq(true, "day")
            .value(),
        )
        .value(),
    [calendarData, sickData, daysWorkedOut],
  );

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
            {_(yearCalendarData).map((cd, year) => (
              <div key={year}>
                <TypographyH1 className="text-center">{year}</TypographyH1>
                <div className="aspect-[6/1]">
                  <ResponsiveTimeRange
                    theme={nivoTheme}
                    colors={[colors[1], colors[0]]}
                    data={cd}
                    from={`${year}-1-1`}
                    to={`${year}-12-31`}
                    margin={{ top: 12, right: 0, bottom: 0, left: 0 }}
                    firstWeekday="monday"
                    weekdayLegendOffset={0}
                    weekdayTicks={[]}
                    dayRadius={2}
                    monthLegendOffset={4}
                    isInteractive={false}
                    minValue={0}
                    maxValue={1}
                    {...theme.timeRange}
                  />
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
