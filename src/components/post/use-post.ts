import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { WorkoutDetailsType } from "@/convex/workouts";
import { useDisclosure } from "@heroui/react";
import { useMutation, useQuery } from "convex/react";
import { useCallback, useMemo } from "react";

export function usePost({
  workoutId,
  workoutDetails: initialWorkoutDetails,
}: {
  workoutId?: Id<"workouts">;
  workoutDetails?: WorkoutDetailsType;
}) {
  const currentUser = useQuery(api.users.current);
  const commentsDisclosure = useDisclosure();

  // Fetch workout details if workoutId is provided
  const queriedWorkoutDetails = workoutId
    ? useQuery(api.workouts.details, { workoutId })
    : undefined;

  // Use either fetched details or provided details
  const workoutData = workoutId ? queriedWorkoutDetails : initialWorkoutDetails;

  // Setup like mutation with appropriate optimistic update
  const toggleLikeMutation = useMutation(
    api.workouts.toggleLike,
  ).withOptimisticUpdate((localStore, { workoutId }) => {
    if (!currentUser) return;

    if (queriedWorkoutDetails) {
      // Optimistic update for detailed workout view
      const result = localStore.getQuery(api.workouts.details, { workoutId });
      if (!result) return;
      const sizeBefore = result.workout.likers.length;
      result.workout.likers = result.workout.likers.filter(
        (l) => l._id !== currentUser._id,
      );
      if (result.workout.likers.length === sizeBefore) {
        result.workout.likers.push(currentUser);
      }
      localStore.setQuery(api.workouts.details, { workoutId }, result);
    } else {
      // Optimistic update for workout list view
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
    }
  });

  // Setup comment mutation
  const addCommentMutation = useMutation(api.comments.addComment);

  // Handler functions
  const toggleLike = useCallback(() => {
    if (workoutData?.workout) {
      toggleLikeMutation({ workoutId: workoutData.workout._id });
    }
  }, [toggleLikeMutation, workoutData]);

  const addComment = useCallback(
    (text: string) => {
      if (workoutData?.workout) {
        addCommentMutation({
          text,
          workoutId: workoutData.workout._id,
        });
      }
    },
    [addCommentMutation, workoutData],
  );

  // Create context object
  const context = useMemo(
    () => ({
      workout: workoutData?.workout,
      user: workoutData?.user,
      toggleLike: workoutData ? toggleLike : undefined,
      addComment: workoutData ? addComment : undefined,
      currentUser,
      commentsDisclosure,
    }),
    [workoutData, toggleLike, addComment, currentUser, commentsDisclosure],
  );

  return context;
}

export type UsePostReturn = ReturnType<typeof usePost>;
