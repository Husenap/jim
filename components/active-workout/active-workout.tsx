import { ActiveWorkoutProvider } from "@/components/active-workout/active-workout-context";
import { useActiveWorkout } from "@/components/active-workout/use-active-workout";
import { Id } from "@/convex/_generated/dataModel";
import React from "react";

export default function ActiveWorkout({
  children,
  workoutId,
}: {
  children: React.ReactNode;
  workoutId: Id<"activeWorkouts">;
}) {
  const context = useActiveWorkout({ workoutId });
  return (
    <ActiveWorkoutProvider value={context}>{children}</ActiveWorkoutProvider>
  );
}
