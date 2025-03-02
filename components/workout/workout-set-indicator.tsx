import { WorkoutDetailsType } from "@/convex/workouts";
import { cn } from "@heroui/react";

export const colorWarmup = "text-[#eeaa00]";
export const colorDrop = "text-[#36baff]";
export const colorFailure = "text-[#e34b37]";

export default function WorkoutSetIndicator({
  index,
  sets,
  onPress,
}: {
  index: number;
  sets: WorkoutDetailsType["workout"]["exercises"][0]["sets"];
  onPress?: () => void;
}) {
  const set = sets[index];

  return (
    <div
      onClick={onPress}
      className={cn("-m-3 min-w-6 p-3 text-center text-lg font-bold", {
        [colorWarmup]: set.type === "warmup",
        [colorDrop]: set.type === "drop",
        [colorFailure]: set.type === "failure",
      })}
    >
      {set.type === "normal"
        ? sets.reduce(
            (acc, cur, ind) =>
              acc + Number(ind <= index && cur.type !== "warmup"),
            0,
          )
        : set.type[0].toUpperCase()}
    </div>
  );
}
