"use client";
import Routine from "@/components/routine/routine";
import RoutineEditor from "@/components/routine/routine-editor";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { Dispatch, SetStateAction } from "react";
import useLocalStorage from "use-local-storage";

export default function Page() {
  const [title, setTitle] = useLocalStorage("jim-create-routine-title", "");
  const [exercises, setExercises] = useLocalStorage(
    "jim-create-routine-exercises",
    [] as { exercise: Doc<"exercises">; id: string }[],
  );

  const createRoutine = useMutation(api.routines.create);

  const onSave = async () => {
    await createRoutine({
      name: title,
      exercises: exercises.map((e) => e.exercise._id),
    });
    setTitle("");
    setExercises([]);
  };

  return (
    <Routine
      props={{
        title,
        setTitle: setTitle as Dispatch<SetStateAction<typeof title>>,
        exercises,
        setExercises: setExercises as Dispatch<
          SetStateAction<typeof exercises>
        >,
      }}
    >
      <RoutineEditor
        titleText="Create Routine"
        confirmText="Create"
        onConfirm={onSave}
      />
    </Routine>
  );
}
