import DrawerMenu from "@/components/drawer-menu/drawer-menu";
import DrawerMenuContent from "@/components/drawer-menu/drawer-menu-content";
import DrawerMenuTrigger from "@/components/drawer-menu/drawer-menu-trigger";
import ExercisesDrawer from "@/components/exercise-list/exercises-drawer";
import { useRoutineContext } from "@/components/routine/routine-context";
import { Doc } from "@/convex/_generated/dataModel";
import { Avatar, Button, MenuItem, useDisclosure } from "@heroui/react";
import { Ellipsis, Plus, Replace, X } from "lucide-react";
import { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { v4 as uuidv4 } from "uuid";

export default function RoutineExercises() {
  const { exercises, setExercises } = useRoutineContext();
  const replaceDisclosure = useDisclosure();

  const [replaceId, setReplaceId] = useState<string | null>(null);
  const onSelect = (e: Doc<"exercises">) => {
    if (replaceId) {
      setExercises(
        exercises.map(({ exercise, id }) =>
          id === replaceId ? { exercise: e, id: uuidv4() } : { exercise, id },
        ),
      );
    }
  };

  return (
    <>
      <ReactSortable
        list={exercises}
        setList={setExercises}
        className="-mx-2 flex flex-col py-2"
        animation={200}
        chosenClass="bg-content2"
      >
        {exercises.map(({ exercise, id }) => (
          <div
            key={id}
            className="transition-background flex flex-row justify-between p-2"
          >
            <div className="flex flex-row items-center gap-2">
              <Avatar src={exercise.imageURL ?? "/favicon.ico"} size="lg" />
              <div className="flex flex-col items-start">
                <h2>{exercise.name}</h2>
                <span className="text-default-400">
                  {exercise.muscleGroups[0]?.muscleGroup}
                </span>
              </div>
            </div>
            <DrawerMenu>
              <DrawerMenuTrigger>
                <Button isIconOnly variant="light" size="md">
                  <Ellipsis size={20} />
                </Button>
              </DrawerMenuTrigger>
              <DrawerMenuContent ariaLabel="Exercise Menu">
                <MenuItem
                  startContent={<Replace />}
                  key="replace"
                  title="Replace Exercise"
                  onPress={() => {
                    setReplaceId(id);
                    replaceDisclosure.onOpen();
                  }}
                />
                <MenuItem
                  startContent={<Plus />}
                  key="add-superset"
                  title="Add to Superset"
                  className="under-construction"
                />
                <MenuItem
                  startContent={<X />}
                  key="delete"
                  color="danger"
                  className="text-danger"
                  title="Remove Exercise"
                  onPress={() =>
                    setExercises(
                      exercises.filter(({ id: otherId }) => id !== otherId),
                    )
                  }
                />
              </DrawerMenuContent>
            </DrawerMenu>
          </div>
        ))}
      </ReactSortable>

      <ExercisesDrawer
        title="Replace Exercise"
        onSelect={onSelect}
        disclosure={replaceDisclosure}
      />
    </>
  );
}
