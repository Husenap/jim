"use client";

import Navbar from "@/app/(member-area)/profile/(stats)/calendar/navbar";
import ChartWrapper from "@/components/charts/chart-wrapper";
import FullscreenSpinner from "@/components/fullscreen-spinner";
import PageContainer from "@/components/page-container";
import { TypographyH1 } from "@/components/typography";
import { api } from "@/convex/_generated/api";
import { useQueryWithStatus } from "@/utils/use-query-with-status";
import { Calendar } from "@heroui/react";
import { ResponsiveCalendar } from "@nivo/calendar";
import { DateTime } from "luxon";
import { useMemo } from "react";
import _ from "underscore";

export default function Page() {
  const { data, isPending, isSuccess } = useQueryWithStatus(
    api.measurements.bodyweight,
  );

  const calendarData = useMemo(
    () =>
      _(data).map((r) => ({
        ...r,
        date: DateTime.fromMillis(r.date),
      })),
    [data],
  );

  const yearCalendarData = useMemo(
    () =>
      _.chain(calendarData)
        .groupBy(({ date }) => date.year)
        .mapObject((l) =>
          _.chain(l)
            .map(({ date }) => ({
              day: date.toFormat("yyyy-MM-dd"),
              value: 0,
            }))
            .uniq(true, "day")
            .value(),
        )
        .value(),
    [calendarData],
  );

  const daysWorkedOut = useMemo(
    () => new Set(calendarData.map(({ date }) => date.toFormat("yyyy-MM-dd"))),
    [calendarData],
  );

  const weekStreak = useMemo(() => {
    if (!data || data.length === 0) return 0;

    // Create a Set of ISO week start dates that have at least one measurement
    const weeksWithData = new Set(
      data.map(({ date }) =>
        DateTime.fromMillis(date).startOf("week").toISODate(),
      ),
    );

    let streak = 0;
    // Start from the current week (today's week)
    let currentWeek = DateTime.local().startOf("week");

    // Count consecutive weeks that have data
    while (weeksWithData.has(currentWeek.toISODate())) {
      ++streak;
      currentWeek = currentWeek.minus({ weeks: 1 });
    }

    return streak;
  }, [data]);

  const restDays = useMemo(() => {
    if (!data || data.length === 0) return 0;

    // Create a Set of ISO day start dates that have at least one measurement
    const daysWithData = new Set(
      data.map(({ date }) =>
        DateTime.fromMillis(date).startOf("day").toISODate(),
      ),
    );

    let days = 0;
    // Start from today
    let currentDay = DateTime.local().startOf("day");

    // Count consecutive days that have data
    while (!daysWithData.has(currentDay.toISODate())) {
      ++days;
      currentDay = currentDay.minus({ days: 1 });
    }

    return days;
  }, [data]);

  return (
    <PageContainer
      topNavbar={<Navbar weekStreak={weekStreak} restDays={restDays} />}
    >
      {isPending && <FullscreenSpinner />}
      {isSuccess && (
        <>
          <Calendar
            isReadOnly
            firstDayOfWeek="mon"
            className="mx-auto"
            hideDisabledDates
            isDateUnavailable={(d) => daysWorkedOut.has(d.toString())}
            visibleMonths={1}
            classNames={{
              cellButton:
                "data-[unavailable=true]:bg-primary data-[unavailable=true]:text-white data-[unavailable=true]:no-underline",
            }}
          />
          <ChartWrapper>
            {(theme, nivoTheme, colors) => (
              <>
                {_(yearCalendarData).map((cd, year) => (
                  <div key={year}>
                    <TypographyH1 className="text-center">{year}</TypographyH1>
                    <div className="aspect-[6/1]">
                      <ResponsiveCalendar
                        theme={nivoTheme}
                        colors={[colors[0]]}
                        data={cd}
                        from={cd[0].day}
                        to={cd[cd.length - 1].day}
                        margin={{ top: 12, right: 0, bottom: 0, left: 0 }}
                        monthLegendOffset={4}
                        align="top"
                        {...theme.calendar}
                      />
                    </div>
                  </div>
                ))}
              </>
            )}
          </ChartWrapper>
        </>
      )}
    </PageContainer>
  );
}
