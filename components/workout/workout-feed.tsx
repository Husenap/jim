import WorkoutPost from "@/components/workout/workout-post";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Spinner } from "@nextui-org/react";
import { usePaginatedQuery } from "convex/react";
import { InView } from "react-intersection-observer";

export default function WorkoutFeed({ userId }: { userId?: Id<"users"> }) {
  const itemsPerPage = 1;

  const { results, status, loadMore, isLoading } = usePaginatedQuery(
    api.workouts.paginatedWorkouts,
    { userId },
    {
      initialNumItems: itemsPerPage,
    },
  );

  return (
    <>
      <div className="flex flex-col gap-4">
        {results.map(({ workout, user }, i) => (
          <WorkoutPost key={workout._id + i} workout={workout} user={user} />
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
