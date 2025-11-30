import { UseCalendarReturn } from "@/components/calendar/use-calendar";
import { createContext } from "@heroui/react-utils";

export const [CalendarProvider, useCalendarContext] =
  createContext<UseCalendarReturn>({
    name: "CalendarContext",
    strict: true,
    errorMessage:
      "useCalendarContext: `context` is undefined. Seems like you forgot to wrap component within <Calendar>",
  });
