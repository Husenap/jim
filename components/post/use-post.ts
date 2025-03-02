import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { WorkoutDetailsType } from "@/convex/workouts";
import { useMutation, useQuery } from "convex/react";
import { useCallback, useMemo } from "react";

export function usePost({ workoutId, workoutDetails }: {
  workoutId?: Id<"workouts">;
  workoutDetails?: {
    workout: WorkoutDetailsType["workout"];
    user: Doc<"users">;
  };
}) {
  if (workoutId) {
    const workoutDetails = useQuery(api.workouts.details, { workoutId });

    const currentUser = useQuery(api.users.current);

    const toggleLikeMutation = useMutation(api.workouts.toggleLike).withOptimisticUpdate(
      (localStore, { workoutId }) => {
        if (!currentUser) return;

        const result = localStore.getQuery(api.workouts.details, { workoutId });
        if (!result) return;
        const sizeBefore = result.workout.likers.length;
        result.workout.likers = result.workout.likers.filter(
          (l) => l._id !== currentUser._id,
        );
        if (result.workout.likers.length === sizeBefore) {
          result.workout.likers.push(currentUser);
        }
        localStore.setQuery(
          api.workouts.details,
          { workoutId },
          result
        );
      }
    );
    const toggleLike = useCallback(() => {
      workoutDetails && toggleLikeMutation({ workoutId: workoutDetails.workout._id });
    }, [toggleLikeMutation]);

    const context = useMemo(() => ({
      workout: workoutDetails?.workout,
      user: workoutDetails?.user,
      toggleLike,
      currentUser,
    }), [
      workoutDetails,
      toggleLike,
      currentUser,
    ]);

    return context;
  } else if (workoutDetails) {
    const currentUser = useQuery(api.users.current);

    const toggleLikeMutation = useMutation(api.workouts.toggleLike).withOptimisticUpdate(
      (localStore, { workoutId }) => {
        if (!currentUser) return;

        for (const query of localStore.getAllQueries(
          api.workouts.paginatedWorkouts,
        )) {
          const result = query.value?.page.find(
            (r) => r.workout._id === workoutId,
          );

          if (result) {
            const sizeBefore = result.workout.likers.length;
            result.workout.likers = result.workout.likers.filter(
              (l) => l._id !== currentUser._id,
            );
            if (result.workout.likers.length === sizeBefore) {
              result.workout.likers.push(currentUser);
            }
            localStore.setQuery(
              api.workouts.paginatedWorkouts,
              query.args,
              query.value,
            );
          }
        }
      },
    );
    const toggleLike = useCallback(() => {
      toggleLikeMutation({ workoutId: workoutDetails.workout._id });
    }, [toggleLikeMutation]);

    const context = useMemo(() => ({
      workout: workoutDetails.workout,
      user: workoutDetails.user,
      toggleLike,
      currentUser,
    }), [
      workoutDetails,
      toggleLike,
      currentUser,
    ]);

    return context;
  } else {
    const context = useMemo(() => ({
      workout: null,
      user: null,
      toggleLike: undefined,
      currentUser: null,
    }), []);
    return context;
  }
};

export type UsePostReturn = ReturnType<typeof usePost>;