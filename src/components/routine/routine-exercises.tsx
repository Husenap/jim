import { useRoutineContext } from "@/components/routine/routine-context";
import RoutineExerciseMenu from "@/components/routine/routine-exercise-menu";
import GetSupersetColor from "@/utils/workout/superset";
import { Avatar } from "@heroui/react";
import { Dumbbell } from "lucide-react";
import { ReactSortable } from "react-sortablejs";

export default function RoutineExercises() {
  const { exercises, setExercises } = useRoutineContext();

  return (
    <>
      <ReactSortable
        list={exercises}
        setList={setExercises}
        className="-mx-2 flex flex-col py-2"
        animation={200}
        chosenClass="bg-content2"
      >
        {exercises.map(({ exercise, id, superset }, index) => (
          <div
            key={id}
            className="transition-background flex flex-row justify-between p-2"
          >
            <div className="flex flex-row items-center gap-2">
              <Avatar
                isBordered={superset !== undefined}
                color={
                  superset !== undefined
                    ? GetSupersetColor(superset)
                    : undefined
                }
                src={exercise.imageURL}
                icon={<Dumbbell />}
                size="md"
              />
              <div className="flex flex-col items-start">
                <h2>{exercise.name}</h2>
                <span className="text-default-400">
                  {exercise.muscleGroups[0]?.muscleGroup}
                </span>
              </div>
            </div>
            <RoutineExerciseMenu exerciseIndex={index} />
          </div>
        ))}
      </ReactSortable>
    </>
  );
}
