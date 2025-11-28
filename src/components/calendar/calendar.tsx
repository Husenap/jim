"use client";

import { CalendarProvider } from "@/components/calendar/calendar-context";
import { useCalendar } from "@/components/calendar/use-calendar";
import React from "react";

export default function Calendar({ children }: { children: React.ReactNode }) {
  const context = useCalendar();
  return <CalendarProvider value={context}>{children}</CalendarProvider>;
}
