import { UseRoutineReturn } from "@/components/routine/use-routine";
import { createContext } from "@heroui/react-utils";

export const [RoutineProvider, useRoutineContext] =
  createContext<UseRoutineReturn>({
    name: "RoutineContext",
    strict: true,
    errorMessage:
      "useRoutineContext: `context` is undefined. Seems like you forgot to wrap component within <Routine>",
  });
