import { useMemo, useState } from "react";

export function useExercises() {
  const [search, setSearch] = useState("");
  const context = useMemo(() => ({ search, setSearch }), [search]);
  return context;
}

export type UseExercisesReturn = ReturnType<typeof useExercises>;