import { usePostContext } from "@/components/post/post-context";
import { TypographyH4 } from "@/components/typography";
import { humanReadiableDuration } from "@/utils/time-diff";
import countSets from "@/utils/workout/sets";
import calculateVolume from "@/utils/workout/volume";
import { useMemo } from "react";

export default function WorkoutStats() {
  const { workout } = usePostContext();

  if (!workout) return <></>;

  const time = useMemo(
    () =>
      workout.startTime
        ? humanReadiableDuration({
            startTime: workout.startTime,
            endTime: workout._creationTime,
            includeSeconds: false,
          })
        : undefined,
    [workout],
  );
  const volume = useMemo(
    () => calculateVolume(workout.exercises, workout.bodyweight),
    [workout],
  );
  const sets = useMemo(() => countSets(workout.exercises), [workout]);

  return (
    <>
      <div className="flex flex-row gap-8">
        {time && (
          <div className="flex flex-col">
            <TypographyH4>Time</TypographyH4>
            <span>{time}</span>
          </div>
        )}
        <div className="flex flex-col">
          <TypographyH4>Volume</TypographyH4>
          <span>{volume} kg</span>
        </div>
        <div className="flex flex-col">
          <TypographyH4>Sets</TypographyH4>
          <span>{sets} sets</span>
        </div>
      </div>
    </>
  );
}
