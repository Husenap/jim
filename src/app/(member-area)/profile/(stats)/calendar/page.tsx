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
import { useState } from "react";

export default function Page() {
  const [category, setCategory] = useState<Selection>(new Set(["month"]));

  const Content = () => {
    const { isPending, isSuccess } = useCalendarContext();
    return (
      <>
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
