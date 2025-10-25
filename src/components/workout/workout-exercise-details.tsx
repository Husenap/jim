import {
  SetRowColumnKey,
  SetRowType,
} from "@/app/(member-area)/workout/live/[workoutId]/types";
import { usePostContext } from "@/components/post/post-context";
import { TypographyH2 } from "@/components/typography";
import WorkoutSetIndicator from "@/components/workout/workout-set-indicator";
import { type WorkoutDetailsType } from "@/convex/workouts";
import { isBodyweightExercise } from "@/utils/workout/exercise";
import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { useCallback } from "react";

export default function WorkoutExerciseDetails() {
  const { workout } = usePostContext();

  if (!workout) return <></>;

  return (
    <>
      <TypographyH2>Workout</TypographyH2>

      <div className="flex flex-col gap-8 pb-32">
        {workout.exercises.map((e, i) => (
          <div key={i}>
            <Exercise exercise={e} />
          </div>
        ))}
      </div>
    </>
  );
}

function Exercise({
  exercise,
}: {
  exercise: WorkoutDetailsType["workout"]["exercises"][0];
}) {
  return (
    <div className="-mx-2 flex flex-col gap-2 p-2">
      <div className="flex flex-row items-center gap-2">
        <Avatar size="sm" src={exercise.exercise.imageURL} />
        <span className="flex-1">{exercise.exercise.name}</span>
        {isBodyweightExercise(exercise.exercise.exerciseType) && (
          <>
            <span className="text-default-500 text-xs">
              {Math.round((exercise.exercise.bodyweightFactor ?? 1) * 100)}% BW
            </span>
          </>
        )}
      </div>
      {exercise.note && (
        <span className="text-default-500 text-sm font-semibold">
          {exercise.note}
        </span>
      )}
      {<ExerciseSet exercise={exercise} />}
    </div>
  );
}

function ExerciseSet({
  exercise,
}: {
  exercise: WorkoutDetailsType["workout"]["exercises"][0];
}) {
  const { exercise: e, sets } = exercise;

  const columns = [];
  columns.push({ key: "type", label: "SET" });
  switch (e.exerciseType) {
    case "weight & reps":
      columns.push({ key: "weight_reps", label: "WEIGHT & REPS" });
      break;
    case "weighted bodyweight":
      columns.push({ key: "weight_reps", label: "WEIGHT & REPS" });
      break;
    case "assisted bodyweight":
      columns.push({ key: "weight_reps", label: "ASSIST & REPS" });
      break;
    case "bodyweight reps":
      columns.push({ key: "reps", label: "REPS" });
      break;
  }
  columns.push({ key: "padding", label: "" });

  const rows = sets.map((set, i) => ({
    set,
    index: i,
  }));

  const renderCell = useCallback(
    (item: SetRowType, columnKey: string) => {
      switch (columnKey) {
        case "type":
          return <WorkoutSetIndicator index={item.index} sets={sets} />;
        case "weight_reps":
          return (
            <div className="text-nowrap">
              {`${item.set["weight"]}kg x ${item.set["reps"]} reps`}
            </div>
          );
        case "reps":
          return (
            <div className="text-nowrap">{`${item.set["reps"]} reps`}</div>
          );
        default:
          return <div className="w-96"></div>;
      }
    },
    [rows],
  );

  const classNames = {
    th: "bg-transparent text-default-500 border-b border-divider",
    td: [
      "group-data-[first=true]/tr:first:before:rounded-none",
      "group-data-[first=true]/tr:last:before:rounded-none",
      "group-data-[middle=true]/tr:before:rounded-none",
      "group-data-[last=true]/tr:first:before:rounded-none",
      "group-data-[last=true]/tr:last:before:rounded-none",
      "group-data-[odd=true]/tr:before:bg-default/40",
    ],
  };

  return (
    <>
      <Table
        className="-mx-2 w-auto"
        classNames={classNames}
        removeWrapper
        radius="none"
        aria-label="Sets"
        isStriped
      >
        <TableHeader>
          {columns.map((column) => (
            <TableColumn allowsResizing key={column.key}>
              {column.label}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody items={rows}>
          {(item) => (
            <TableRow key={item.index}>
              {(columnKey) => (
                <TableCell>
                  {renderCell(item, columnKey as SetRowColumnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
