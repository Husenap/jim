import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import countSets from "@/utils/workout/sets";
import calculateVolume from "@/utils/workout/volume";
import { useMutation, useQuery } from "convex/react";
import { useMemo } from "react";

export function useActiveWorkout({ workoutId }: {
  workoutId: Id<"activeWorkouts">;
}) {
  const user = useQuery(api.users.current);
  const activeWorkout = useQuery(api.activeWorkouts.get, { id: workoutId });
  const exercises = useQuery(api.activeWorkouts.exercises, { id: workoutId });

  const updateNote = useMutation(api.activeWorkouts.updateNote);
  const updateSet = useMutation(api.activeWorkouts.updateSet);
  const addSet = useMutation(api.activeWorkouts.addSet);
  const removeSet = useMutation(api.activeWorkouts.removeSet);

  const isOwner = !!(user && activeWorkout && user._id === activeWorkout.userId);

  const volume = calculateVolume(exercises, activeWorkout?.bodyweight);
  const finishedSets = countSets(exercises);

  const context = useMemo(
    () => ({
      activeWorkout,
      user,
      isOwner,
      isSpectate: !isOwner,
      exercises,
      updateNote,
      updateSet,
      addSet,
      removeSet,
      volume,
      finishedSets
    }), [activeWorkout, user, exercises, updateNote, updateSet, addSet, removeSet]);

  return context;
};

export type UseActiveWorkoutReturn = ReturnType<typeof useActiveWorkout>;