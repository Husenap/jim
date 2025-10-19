"use client";

import { usePostContext } from "@/components/post/post-context";
import { TypographyH2 } from "@/components/typography";
import { Link, Progress } from "@heroui/react";
import { useMemo, useState } from "react";

export default function WorkoutMuscleSplit() {
  const [showMore, setShowMore] = useState(false);

  const { workout } = usePostContext();

  if (!workout) return <></>;

  const sums = useMemo(() => {
    const muscleGroupSum = new Map<string, number>();

    for (const exercise of workout.exercises) {
      if (exercise.sets.length <= 0) continue;

      for (const muscleGroup of exercise.exercise.muscleGroups) {
        let sum = muscleGroupSum.get(muscleGroup.muscleGroup) ?? 0;
        sum += muscleGroup.weight * exercise.sets.length;
        muscleGroupSum.set(muscleGroup.muscleGroup, sum);
      }
    }

    const totalSum = Array.from(muscleGroupSum.values()).reduce(
      (a, b) => a + b,
      0,
    );

    const split = Array.from(muscleGroupSum.entries())
      .map(([k, v]) => [k, v / totalSum] as [string, number])
      .toSorted(([_1, v1], [_2, v2]) => v2 - v1);

    const factors = Array.from(split.map(([_, v]) => v));

    return {
      split,
      maxFactor: Math.max(...[...factors]),
    };
  }, [workout]);

  return (
    <>
      <TypographyH2>Muscle Split</TypographyH2>

      {(showMore || sums.split.length <= 3
        ? sums.split
        : sums.split.slice(0, 3)
      ).map(([k, v]) => (
        <Progress
          minValue={0}
          maxValue={sums.maxFactor}
          value={v}
          showValueLabel
          label={k}
          valueLabel={new Intl.NumberFormat("en-US", {
            style: "percent",
          }).format(v)}
          key={k}
          classNames={{
            indicator: "bg-linear-to-r from-danger via-purple-500 to-primary",
          }}
        />
      ))}
      {sums.split.length > 3 && (
        <Link
          color="secondary"
          onPress={() => setShowMore(!showMore)}
          className="cursor-pointer"
        >
          {showMore ? "Show Less" : "Show More"}
        </Link>
      )}
    </>
  );
}
