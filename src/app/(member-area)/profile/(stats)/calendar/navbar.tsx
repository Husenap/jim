import BackButton from "@/components/back-button";
import { useCalendarContext } from "@/components/calendar/calendar-context";
import type { Selection } from "@heroui/react";
import { Button, Divider, Select, SelectItem } from "@heroui/react";
import { ClipboardPlus, Flame, Hourglass, Moon } from "lucide-react";
import { DateTime } from "luxon";
import Link from "next/link";
import { useMemo } from "react";

export default function Navbar({
  category,
  setCategory,
}: {
  category: Selection;
  setCategory: (selection: Selection) => void;
}) {
  const { dates, calendarData, sickData } = useCalendarContext();

  const combinedDays = useMemo(
    () => calendarData.concat(sickData),
    [calendarData, sickData],
  );

  const weekStreak = useMemo(() => {
    if (combinedDays.length === 0) return 0;

    // Create a Set of ISO week start dates that have at least one measurement
    const weeksWithData = new Set(
      combinedDays.map((date) => date.startOf("week").toISODate()),
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
  }, [combinedDays]);

  const previousWeekStreak = useMemo(() => {
    if (combinedDays.length === 0) return 0;

    // Create a Set of ISO week start dates that have at least one measurement
    const weeksWithData = new Set(
      combinedDays.map((date) => date.startOf("week").toISODate()),
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
  }, [combinedDays]);

  const restDays = useMemo(() => {
    if (calendarData.length === 0) return 0;

    // Create a Set of ISO day start dates that have at least one measurement
    const daysWithData = new Set(calendarData.map((date) => date.toISODate()));

    let days = 0;
    // Start from today
    let currentDay = DateTime.local().startOf("day");

    // Count consecutive days that have data
    while (!daysWithData.has(currentDay.toISODate())) {
      ++days;
      currentDay = currentDay.minus({ days: 1 });
    }

    return days;
  }, [calendarData]);

  return (
    <div className="-mx-2 flex flex-col">
      <div className="grid grid-cols-3 items-center px-2 py-3">
        <div>
          <BackButton />
        </div>

        <div>
          <Select
            variant="underlined"
            selectedKeys={category}
            onSelectionChange={setCategory}
            disallowEmptySelection
            className="mx-auto w-32"
          >
            <SelectItem key="month">Month</SelectItem>
            <SelectItem key="year">Year</SelectItem>
            <SelectItem key="multi-year">Multi-year</SelectItem>
          </Select>
        </div>

        <div className="flex justify-end">
          <Button
            isIconOnly
            variant="light"
            as={Link}
            href="/profile/calendar/sick-leave"
          >
            <ClipboardPlus />
          </Button>
        </div>
      </div>

      <Divider />

      <div className="flex items-center py-3">
        <div className="flex flex-1 justify-center gap-1">
          {previousWeekStreak !== 0 && weekStreak === 0 ? (
            <>
              <Hourglass className="text-orange-500" />
              <span>{previousWeekStreak} week streak</span>
            </>
          ) : weekStreak !== 0 ? (
            <>
              <Flame className="text-orange-500" />
              <span>{weekStreak} week streak</span>
            </>
          ) : (
            <>
              <Flame className="text-default-400" />
              <span>{weekStreak} week streak</span>
            </>
          )}
        </div>
        <Divider orientation="vertical" className="-my-3 h-12" />
        <div className="flex flex-1 justify-center gap-1">
          <Moon className="text-blue-500" />
          <span>
            {restDays} rest day{restDays === 1 ? "" : "s"}
          </span>
        </div>
      </div>

      {category instanceof Set && category.has("month") && (
        <>
          <Divider />
          <div className="py-1">
            <div className="grid grid-cols-7">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <span key={day} className="text-foreground-500 text-center">
                  {day}
                </span>
              ))}
            </div>
          </div>
        </>
      )}

      <Divider />
    </div>
  );
}
