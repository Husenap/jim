import { Doc } from "@/convex/_generated/dataModel";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
type Setter<T> = Dispatch<SetStateAction<T>>;

type ExerciseItem = {
  exercise: Doc<"exercises">;
  id: string;
  superset?: number;
};

export type UseRoutineProps = {
  title: string;
  setTitle: Setter<string>;
  exercises: ExerciseItem[];
  setExercises: Setter<ExerciseItem[]>;
};

export function useRoutine(props: UseRoutineProps) {
  const [errors, setErrors] = useState({} as Record<string, string>);

  const context = useMemo(
    () => ({
      errors,
      setErrors,
      ...props,
    }),
    [errors, props],
  );

  return context;
}

export type UseRoutineReturn = ReturnType<typeof useRoutine>;
