import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import countSets, { updateSetData } from "@/utils/workout/sets";
import calculateVolume from "@/utils/workout/volume";
import { useQuery } from "convex-helpers/react/cache/hooks";
import { useMutation } from "convex/react";
import { useMemo } from "react";

export function useActiveWorkout({
  workoutId,
}: {
  workoutId: Id<"activeWorkouts">;
}) {
  const user = useQuery(api.users.current);
  const activeWorkout = useQuery(api.activeWorkouts.get, {
    id: workoutId,
  });
  const exercises = useQuery(api.activeWorkouts.exercises, {
    id: workoutId,
  });

  const updateNote = useMutation(api.activeWorkouts.updateNote);
  const updateSuperset = useMutation(api.activeWorkouts.updateSuperset);
  const updateSet = useMutation(
    api.activeWorkouts.updateSet,
  ).withOptimisticUpdate(
    (localStore, { id, exerciseIndex, setIndex, setData }) => {
      const exercises = localStore.getQuery(api.activeWorkouts.exercises, {
        id,
      });
      if (exercises) {
        updateSetData(exercises[exerciseIndex].sets, setIndex, setData);

        localStore.setQuery(api.activeWorkouts.exercises, { id }, exercises);
      }
    },
  );
  const addSet = useMutation(api.activeWorkouts.addSet).withOptimisticUpdate(
    (localStore, { id, exerciseIndex }) => {
      const exercises = localStore.getQuery(api.activeWorkouts.exercises, {
        id,
      });
      if (exercises) {
        exercises[exerciseIndex].sets.push({
          type: "normal",
          done: false,
        });
        localStore.setQuery(api.activeWorkouts.exercises, { id }, exercises);
      }
    },
  );
  const removeSet = useMutation(
    api.activeWorkouts.removeSet,
  ).withOptimisticUpdate((localStore, { id, exerciseIndex, setIndex }) => {
    const exercises = localStore.getQuery(api.activeWorkouts.exercises, { id });
    if (exercises) {
      exercises[exerciseIndex].sets.splice(setIndex, 1);
      localStore.setQuery(api.activeWorkouts.exercises, { id }, exercises);
    }
  });
  const addExercise = useMutation(api.activeWorkouts.addExercise);
  const replaceExercise = useMutation(api.activeWorkouts.replaceExercise);
  const removeExercise = useMutation(
    api.activeWorkouts.removeExercise,
  ).withOptimisticUpdate((localStore, { workoutId, exerciseIndex }) => {
    const exercises = localStore.getQuery(api.activeWorkouts.exercises, {
      id: workoutId,
    });
    if (exercises) {
      exercises.splice(exerciseIndex, 1);
      localStore.setQuery(
        api.activeWorkouts.exercises,
        { id: workoutId },
        exercises,
      );
    }
  });
  const setBodyweight = useMutation(
    api.activeWorkouts.setBodyweight,
  ).withOptimisticUpdate((localStore, { workoutId, bodyweight }) => {
    const activeWorkout = localStore.getQuery(api.activeWorkouts.get, {
      id: workoutId,
    });
    if (activeWorkout) {
      activeWorkout.bodyweight = bodyweight;
      localStore.setQuery(
        api.activeWorkouts.get,
        { id: workoutId },
        activeWorkout,
      );
    }
  });

  const isOwner = !!(
    user &&
    activeWorkout &&
    user._id === activeWorkout.userId
  );

  const volume = calculateVolume(exercises, activeWorkout?.bodyweight);
  const finishedSets = countSets(exercises, true);
  const totalSets = countSets(exercises);

  const context = useMemo(
    () => ({
      activeWorkout,
      user,
      isOwner,
      isSpectate: !isOwner,
      exercises,
      updateNote,
      updateSuperset,
      updateSet,
      addSet,
      removeSet,
      addExercise,
      replaceExercise,
      removeExercise,
      setBodyweight,
      volume,
      finishedSets,
      totalSets,
    }),
    [
      activeWorkout,
      user,
      exercises,
      updateNote,
      updateSuperset,
      updateSet,
      addSet,
      removeSet,
      addExercise,
      replaceExercise,
      removeExercise,
      setBodyweight,
    ],
  );

  return context;
}

export type UseActiveWorkoutReturn = ReturnType<typeof useActiveWorkout>;
