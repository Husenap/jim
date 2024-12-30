import { UseExercisesReturn } from "@/components/exercise-list/use-exercises";
import { createContext } from "@nextui-org/react-utils";

export const [ExercisesProvider, useExercisesContext] = createContext<UseExercisesReturn>({
  name: "ExercisesContext",
  strict: true,
  errorMessage: "useExercisesContext: `context` is undefined. Seems like you forgot to wrap component within <Exercises>",
});