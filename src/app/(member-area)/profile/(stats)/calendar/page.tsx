"use client";

import Month from "@/app/(member-area)/profile/(stats)/calendar/(categories)/month";
import MultiYear from "@/app/(member-area)/profile/(stats)/calendar/(categories)/multi-year";
import Year from "@/app/(member-area)/profile/(stats)/calendar/(categories)/year";
import Navbar from "@/app/(member-area)/profile/(stats)/calendar/navbar";
import Calendar from "@/components/calendar/calendar";
import { useCalendarContext } from "@/components/calendar/calendar-context";
import FullscreenSpinner from "@/components/fullscreen-spinner";
import PageContainer from "@/components/page-container";
import type { Selection } from "@heroui/react";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

export default function Page() {
  const [category, setCategory] = useState<Selection>(new Set(["month"]));

  const Content = () => {
    const { calendarData, isPending, isSuccess } = useCalendarContext();
    return (
      <>
        {isPending && <FullscreenSpinner />}
        {isSuccess && (
          <>
            {calendarData.length === 0 && (
              <>
                <div className="flex flex-col items-center gap-2 py-8">
                  <CalendarIcon size={32} />
                  <span className="text-center">
                    You haven't finished any workouts yet.
                  </span>
                </div>
              </>
            )}
            {category instanceof Set && category.has("month") && <Month />}
            {category instanceof Set && category.has("year") && <Year />}
            {category instanceof Set && category.has("multi-year") && (
              <MultiYear />
            )}
          </>
        )}
      </>
    );
  };

  return (
    <Calendar>
      <PageContainer
        topNavbar={<Navbar category={category} setCategory={setCategory} />}
      >
        <Content />
      </PageContainer>
    </Calendar>
  );
}
