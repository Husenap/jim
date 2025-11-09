import { useMemo, useState } from "react";

export type UseRoutineProps = {
  title: string;
  setTitle: (title: string) => void;
};

export function useRoutine(props: UseRoutineProps) {
  const [errors, setErrors] = useState({} as Record<string, string>);

  const context = useMemo(
    () => ({
      errors,
      setErrors,
      title: props.title,
      setTitle: props.setTitle,
    }),
    [errors, props.title, props.setTitle],
  );

  return context;
}

export type UseRoutineReturn = ReturnType<typeof useRoutine>;
