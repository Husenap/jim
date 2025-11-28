import Post from "@/components/post/post";
import WorkoutPost from "@/components/workout/workout-post";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Spinner } from "@heroui/react";
import { usePaginatedQuery } from "convex-helpers/react/cache/hooks";
import { InView } from "react-intersection-observer";

export default function WorkoutFeed({
  userId,
  discovery,
}: {
  userId?: Id<"users">;
  discovery?: boolean;
}) {
  const itemsPerPage = 5;

  const { results, status, loadMore, isLoading } = usePaginatedQuery(
    api.workouts.paginatedWorkouts,
    { userId, discovery },
    {
      initialNumItems: itemsPerPage,
    },
  );

  return (
    <>
      <div className="flex flex-col gap-4">
        {results.map(({ workout, user }, i) => (
          <Post
            key={workout._id + i}
            workoutDetails={{
              workout,
              user,
            }}
          >
            <WorkoutPost />
          </Post>
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
