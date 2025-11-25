"use client";

import { useRoutineContext } from "@/components/routine/routine-context";
import RoutineExerciseMenu from "@/components/routine/routine-exercise-menu";
import GetSupersetColor from "@/utils/workout/superset";
import { Avatar } from "@heroui/react";
import { Dumbbell } from "lucide-react";
import { Reorder } from "motion/react";

export default function RoutineExercises() {
  const { exercises, setExercises } = useRoutineContext();

  return (
    <Reorder.Group
      values={exercises}
      onReorder={setExercises}
      axis="y"
      className="-mx-2 flex flex-col py-2"
    >
      {exercises.map((item, index) => {
        return (
          <Reorder.Item
            key={item.id}
            value={item}
            className="transition-background flex flex-row justify-between p-2"
          >
            <div className="flex flex-row items-center gap-2">
              <Avatar
                isBordered={item.superset !== undefined}
                color={
                  item.superset !== undefined
                    ? GetSupersetColor(item.superset)
                    : undefined
                }
                src={item.exercise.imageURL}
                icon={<Dumbbell />}
                size="md"
              />
              <div className="flex flex-col items-start">
                <h2>{item.exercise.name}</h2>
                <span className="text-default-400">
                  {item.exercise.muscleGroups[0]?.muscleGroup}
                </span>
              </div>
            </div>
            <RoutineExerciseMenu exerciseIndex={index} />
          </Reorder.Item>
        );
      })}
    </Reorder.Group>
  );
}
