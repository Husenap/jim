import { UseActiveWorkoutReturn } from "@/components/active-workout/use-active-workout";
import { createContext } from "@heroui/react-utils";

export const [ActiveWorkoutProvider, useActiveWorkoutContext] = createContext<UseActiveWorkoutReturn>({
  name: "ActiveWorkoutContext",
  strict: true,
  errorMessage: "useActiveWorkoutContext: `context` is undefined. Seems like you forgot to wrap component within <ActiveWorkout>",
});