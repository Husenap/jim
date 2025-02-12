"use client";

import { useExercisesContext } from "@/components/exercise-list/exercises-context";
import { TypographyH2 } from "@/components/typography";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { Avatar, Button } from "@heroui/react";
import { useQuery } from "convex/react";
import { ChevronRight } from "lucide-react";

export default function ExercisesList({
  onSelect,
}: {
  onSelect?: (exercise: Doc<"exercises">) => void;
}) {
  const builtinExercises = useQuery(api.exercises.builtin) ?? [];
  const customExercises = useQuery(api.exercises.custom) ?? [];

  const { search } = useExercisesContext();

  const filter = (exercise: Doc<"exercises">) => {
    if (search.length > 0) {
      if (exercise.name.toLowerCase().indexOf(search.toLowerCase()) == -1) {
        return false;
      }
    }
    return true;
  };

  const filteredBuiltinExercises = builtinExercises?.filter(filter);
  const filteredCustomExercises = customExercises?.filter(filter);

  return (
    <>
      {filteredCustomExercises.length > 0 && (
        <>
          <TypographyH2>Custom exercises</TypographyH2>
          <ExerciseListCategory
            exercises={filteredCustomExercises}
            onSelect={onSelect}
          />
        </>
      )}
      {filteredBuiltinExercises.length > 0 && (
        <>
          <TypographyH2>Built in exercises</TypographyH2>
          <ExerciseListCategory
            exercises={filteredBuiltinExercises}
            onSelect={onSelect}
          />
        </>
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
                <span className="w-full overflow-hidden text-ellipsis text-default-400">
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
