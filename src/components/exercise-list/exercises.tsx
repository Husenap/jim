"use client";

import { ExercisesProvider } from "@/components/exercise-list/exercises-context";
import { useExercises } from "@/components/exercise-list/use-exercises";
import React from "react";

export default function Exercises({ children }: { children: React.ReactNode }) {
  const context = useExercises();
  return <ExercisesProvider value={context}>{children}</ExercisesProvider>;
}
