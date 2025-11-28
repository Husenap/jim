"use client";

import { useExercisesContext } from "@/components/exercise-list/exercises-context";
import FullscreenSpinner from "@/components/fullscreen-spinner";
import { TypographyH2 } from "@/components/typography";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useQueryWithStatus } from "@/utils/use-query-with-status";
import { Avatar, Button } from "@heroui/react";
import { ChevronRight } from "lucide-react";
import { useCallback, useMemo } from "react";

export default function ExercisesList({
  onSelect,
}: {
  onSelect?: (exercise: Doc<"exercises">) => void;
}) {
  const {
    data: builtinExercises,
    isPending: isPendingBuiltin,
    isSuccess: isSuccessBuiltin,
  } = useQueryWithStatus(api.exercises.builtin);
  const {
    data: customExercises,
    isPending: isPendingCustom,
    isSuccess: isSuccessCustom,
  } = useQueryWithStatus(api.exercises.custom);

  const { search, muscleGroup, equipment } = useExercisesContext();

  const exerciseFilter = useCallback(
    (exercise: Doc<"exercises">) => {
      if (search.length > 0) {
        if (exercise.name.toLowerCase().indexOf(search.toLowerCase()) == -1) {
          return false;
        }
      }
      if (muscleGroup.size > 0) {
        if (
          muscleGroup.intersection(
            new Set(exercise.muscleGroups.map((mg) => mg.muscleGroup)),
          ).size === 0
        ) {
          return false;
        }
      }
      if (equipment.size > 0) {
        if (!equipment.has(exercise.equipment)) {
          return false;
        }
      }
      return true;
    },
    [search, muscleGroup, equipment],
  );

  const filteredBuiltinExercises = useMemo(() => {
    return (builtinExercises ?? []).filter(exerciseFilter);
  }, [builtinExercises, exerciseFilter]);
  const filteredCustomExercises = useMemo(() => {
    return (customExercises ?? []).filter(exerciseFilter);
  }, [customExercises, exerciseFilter]);

  return (
    <>
      <TypographyH2>Custom exercises</TypographyH2>
      {isPendingCustom && <FullscreenSpinner />}
      {isSuccessCustom && filteredCustomExercises.length > 0 && (
        <ExerciseListCategory
          exercises={filteredCustomExercises}
          onSelect={onSelect}
        />
      )}
      <TypographyH2>Built-in exercises</TypographyH2>
      {isPendingBuiltin && <FullscreenSpinner />}
      {isSuccessBuiltin && filteredBuiltinExercises.length > 0 && (
        <ExerciseListCategory
          exercises={filteredBuiltinExercises}
          onSelect={onSelect}
        />
      )}
    </>
  );
}

function ExerciseListCategory({
  exercises,
  onSelect,
}: {
  exercises: Doc<"exercises">[] | undefined;
  onSelect?: (exercise: Doc<"exercises">) => void;
}) {
  return (
    <div className="-mx-2 flex flex-col py-2">
      {exercises?.map((exercise) => (
        <Button
          variant="light"
          key={exercise._id}
          className="flex h-auto justify-start p-2"
          radius="none"
          endContent={<ChevronRight />}
          onPress={() => onSelect && onSelect(exercise)}
        >
          <div className="w-full">
            <div className="flex flex-row items-center gap-2">
              <Avatar src={exercise.imageURL ?? "/favicon.ico"} size="lg" />
              <div className="flex max-w-64 flex-col items-start text-left">
                <h2 className="w-full overflow-hidden text-ellipsis">
                  {exercise.name}
                </h2>
                <span className="text-default-400 w-full overflow-hidden text-ellipsis">
                  {exercise.muscleGroups
                    .toSorted((a, b) => b.weight - a.weight)
                    .map((mg) => mg.muscleGroup)
                    .join(", ")}
                </span>
              </div>
            </div>
          </div>
        </Button>
      ))}
    </div>
  );
}
