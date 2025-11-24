"use client";

import Month from "@/app/(member-area)/profile/(stats)/calendar/(categories)/month";
import MultiYear from "@/app/(member-area)/profile/(stats)/calendar/(categories)/multi-year";
import Year from "@/app/(member-area)/profile/(stats)/calendar/(categories)/year";
import Navbar from "@/app/(member-area)/profile/(stats)/calendar/navbar";
import FullscreenSpinner from "@/components/fullscreen-spinner";
import PageContainer from "@/components/page-container";
import { api } from "@/convex/_generated/api";
import { useQueryWithStatus } from "@/utils/use-query-with-status";
import type { Selection } from "@heroui/react";
import { DateTime } from "luxon";
import { useMemo, useState } from "react";
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

  const previousWeekStreak = useMemo(() => {
    if (!data || data.length === 0) return 0;

    // Create a Set of ISO week start dates that have at least one measurement
    const weeksWithData = new Set(
      data.map(({ date }) =>
        DateTime.fromMillis(date).startOf("week").toISODate(),
      ),
    );

    let streak = 0;
    // Start from the current week (today's week)
    let currentWeek = DateTime.local().startOf("week").minus({ weeks: 1 });

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

  const [category, setCategory] = useState<Selection>(new Set(["month"]));

  return (
    <PageContainer
      topNavbar={
        <Navbar
          category={category}
          setCategory={setCategory}
          weekStreak={weekStreak}
          previousWeekStreak={previousWeekStreak}
          restDays={restDays}
        />
      }
    >
      {isPending && <FullscreenSpinner />}
      {isSuccess && (
        <>
          {category instanceof Set && category.has("month") && <Month />}
          {category instanceof Set && category.has("year") && <Year />}
          {category instanceof Set && category.has("multi-year") && (
            <MultiYear />
          )}
        </>
      )}
    </PageContainer>
  );
}
