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
  const updateSet = useMutation(api.activeWorkouts.updateSet).withOptimisticUpdate((localStore, { id, exerciseIndex, setIndex, setData }) => {
    const exercises = localStore.getQuery(api.activeWorkouts.exercises, { id });
    if (exercises) {
      const sets = exercises[exerciseIndex].sets;
      sets[setIndex] = {
        ...sets[setIndex],
        ...setData
      };
      if (setData.done === true && sets[setIndex].weight === undefined && setIndex > 0) {
        sets[setIndex].weight = sets[setIndex - 1].weight ?? 0;
      }
      if (setData.done === true && sets[setIndex].reps === undefined && setIndex > 0) {
        sets[setIndex].reps = sets[setIndex - 1].reps ?? 0;
      }
      localStore.setQuery(api.activeWorkouts.exercises, { id }, exercises);
    }
  });
  const addSet = useMutation(api.activeWorkouts.addSet).withOptimisticUpdate((localStore, { id, exerciseIndex }) => {
    const exercises = localStore.getQuery(api.activeWorkouts.exercises, { id });
    if (exercises) {
      exercises[exerciseIndex].sets.push({
        type: "normal",
        done: false
      });
      localStore.setQuery(api.activeWorkouts.exercises, { id }, exercises);
    }
  });
  const removeSet = useMutation(api.activeWorkouts.removeSet).withOptimisticUpdate((localStore, { id, exerciseIndex, setIndex }) => {
    const exercises = localStore.getQuery(api.activeWorkouts.exercises, { id });
    if (exercises) {
      exercises[exerciseIndex].sets.splice(setIndex, 1);
      localStore.setQuery(api.activeWorkouts.exercises, { id }, exercises);
    }
  });
  const addExercise = useMutation(api.activeWorkouts.addExercise);
  const removeExercise = useMutation(api.activeWorkouts.removeExercise).withOptimisticUpdate((localStore, { workoutId, exerciseIndex }) => {
    const exercises = localStore.getQuery(api.activeWorkouts.exercises, { id: workoutId });
    if (exercises) {
      exercises.splice(exerciseIndex, 1);
      localStore.setQuery(api.activeWorkouts.exercises, { id: workoutId }, exercises);
    }
  });
  const setBodyweight = useMutation(api.activeWorkouts.setBodyweight);

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
      addExercise,
      removeExercise,
      setBodyweight,
      volume,
      finishedSets
    }), [activeWorkout, user, exercises, updateNote, updateSet, addSet, removeSet, addExercise, removeExercise, setBodyweight]);

  return context;
};

export type UseActiveWorkoutReturn = ReturnType<typeof useActiveWorkout>;