import WorkoutPost from "@/components/workout/workout-post";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Spinner } from "@heroui/react";
import { useMutation, usePaginatedQuery, useQuery } from "convex/react";
import { InView } from "react-intersection-observer";

export default function WorkoutFeed({
  userId,
  discovery,
}: {
  userId?: Id<"users">;
  discovery?: boolean;
}) {
  const itemsPerPage = 5;

  const user = useQuery(api.users.current);
  const { results, status, loadMore, isLoading } = usePaginatedQuery(
    api.workouts.paginatedWorkouts,
    { userId, discovery },
    {
      initialNumItems: itemsPerPage,
    },
  );

  const toggleLike = useMutation(api.workouts.toggleLike).withOptimisticUpdate(
    (localStore, { workoutId }) => {
      if (!user) return;

      for (const query of localStore.getAllQueries(
        api.workouts.paginatedWorkouts,
      )) {
        const result = query.value?.page.find(
          (r) => r.workout._id === workoutId,
        );

        if (result) {
          const sizeBefore = result.workout.likers.length;
          result.workout.likers = result.workout.likers.filter(
            (l) => l._id !== user._id,
          );
          if (result.workout.likers.length === sizeBefore) {
            result.workout.likers.push(user);
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

  return (
    <>
      <div className="flex flex-col gap-4">
        {results.map(({ workout, user }, i) => (
          <WorkoutPost
            key={workout._id + i}
            workout={workout}
            user={user}
            onToggleLike={() => toggleLike({ workoutId: workout._id })}
          />
        ))}
      </div>

      {isLoading ? (
        <Spinner size="lg" className="w-full py-4" />
      ) : (
        <InView
          onChange={(inView) =>
            inView && status === "CanLoadMore" && loadMore(itemsPerPage)
          }
        />
      )}
    </>
  );
}
