"use client";

import FullscreenSpinner from "@/components/fullscreen-spinner";
import Routine from "@/components/routine/routine";
import RoutineEditor, {
  RoutineData,
} from "@/components/routine/routine-editor";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useQueryWithStatus } from "@/utils/use-query-with-status";
import { useMutation } from "convex/react";
import { use, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Page({
  params,
}: {
  params: Promise<{ routineId: Id<"routines"> }>;
}) {
  const { routineId } = use(params);

  const { data, isPending, isError } = useQueryWithStatus(api.routines.get, {
    routineId,
  });
  const updateRoutine = useMutation(api.routines.update);

  const [title, setTitle] = useState<string>("");
  const [exercises, setExercises] = useState(
    [] as { exercise: Doc<"exercises">; id: string }[],
  );

  useEffect(() => {
    if (data) {
      setTitle(data.name);
      setExercises(
        data.exercises.map((e) => ({
          exercise: e,
          id: uuidv4(),
        })),
      );
    }
  }, [data]);

  const onUpdate = async (routineData: RoutineData) => {
    await updateRoutine({
      routineId,
      ...routineData,
    });
  };

  if (isError) {
    return <span>Failed to load routine!</span>;
  }

  if (isPending) {
    return <FullscreenSpinner />;
  }

  return (
    <Routine
      props={{
        title,
        setTitle,
        exercises,
        setExercises,
      }}
    >
      <RoutineEditor
        titleText="Edit Routine"
        confirmText="Update"
        onConfirm={onUpdate}
      />
    </Routine>
  );
}
