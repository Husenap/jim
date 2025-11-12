import { Equipment, MuscleGroup } from "@/convex/schema";
import { useMemo, useState } from "react";

export function useExercises() {
  const [search, setSearch] = useState("");
  const [equipment, setEquipment] = useState(new Set([] as Equipment[]));
  const [muscleGroup, setMuscleGroup] = useState(new Set([] as MuscleGroup[]));

  const context = useMemo(
    () => ({
      search,
      setSearch,
      muscleGroup,
      setMuscleGroup,
      equipment,
      setEquipment,
    }),
    [search, muscleGroup, equipment],
  );

  return context;
}

export type UseExercisesReturn = ReturnType<typeof useExercises>;
