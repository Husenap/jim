"use client";

import ExerciseMenu from "@/app/(member-area)/workout/live/[workoutId]/exercise-menu";
import SetMenu from "@/app/(member-area)/workout/live/[workoutId]/set-menu";
import {
  SetRowColumnKey,
  SetRowType,
} from "@/app/(member-area)/workout/live/[workoutId]/types";
import { useActiveWorkoutContext } from "@/components/active-workout/active-workout-context";
import ExercisesDrawer from "@/components/exercise-list/exercises-drawer";
import FullscreenSpinner from "@/components/fullscreen-spinner";
import DebouncedInput from "@/components/input/debounced-input";
import WorkoutSupersetChip from "@/components/workout/workout-superset-chip";
import { ExerciseFieldsType, ExerciseSetType } from "@/convex/schema";
import { zap } from "@/utils/vibration";
import {
  isBodyweightExercise,
  setDetailString,
} from "@/utils/workout/exercise";
import {
  Avatar,
  Button,
  Checkbox,
  cn,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@heroui/react";
import { Check, Plus, TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function Live() {
  const { activeWorkout, exercises, isOwner, updateNote, addExercise } =
    useActiveWorkoutContext();
  const { replace } = useRouter();

  if (activeWorkout === undefined) {
    return <FullscreenSpinner />;
  }

  if (activeWorkout === null) {
    return (
      <Modal
        placement="center"
        isDismissable={false}
        hideCloseButton
        isOpen={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Workout is finished!</ModalHeader>
              <ModalBody>
                <Button onPress={() => replace("/home")} color="primary">
                  Exit
                </Button>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    );
  }

  return (
    <div className="flex flex-col gap-8 pb-32">
      {exercises?.map((e, i) => (
        <div key={i}>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center gap-2">
              <Avatar size="sm" src={e.exercise.imageURL} />
              <span className="flex-1">{e.exercise.name}</span>
              {isBodyweightExercise(e.exercise.exerciseType) && (
                <>
                  <span className="text-foreground/70 text-xs">
                    {Math.round((e.exercise.bodyweightFactor ?? 1) * 100)}% BW
                  </span>
                  {(!activeWorkout.bodyweight ||
                    activeWorkout.bodyweight <= 0) && (
                    <Tooltip
                      color="warning"
                      placement="left"
                      content="No Bodyweight"
                    >
                      <TriangleAlert className="text-warning" />
                    </Tooltip>
                  )}
                </>
              )}
              {isOwner && <ExerciseMenu exerciseIndex={i} />}
            </div>
            {e.superset !== undefined && (
              <WorkoutSupersetChip superset={e.superset} />
            )}
            {isOwner ? (
              <DebouncedInput
                size="sm"
                placeholder={e.previous.note ?? "Add a note..."}
                isMultiLine
                value={e.note ?? ""}
                onValueChange={(v) =>
                  v !== (e.note ?? "") &&
                  updateNote({
                    id: activeWorkout!._id,
                    exerciseIndex: i,
                    note: v.length > 0 ? v : undefined,
                  })
                }
              />
            ) : (
              e.note && (
                <span className="text-foreground/70 text-sm font-semibold">
                  {e.note}
                </span>
              )
            )}
            <ExerciseSet
              exerciseIndex={i}
              isMutable={isOwner}
              exercise={e.exercise}
              previousSets={e.previous.sets}
              sets={e.sets}
            />
          </div>
        </div>
      ))}
      {isOwner && (
        <ExercisesDrawer
          title="Add Exercise"
          onSelect={(e) =>
            addExercise({ workoutId: activeWorkout._id, exerciseId: e._id })
          }
        >
          {(onOpen) => (
            <Button
              onPress={() => {
                zap();
                onOpen();
              }}
              color="primary"
              startContent={<Plus />}
            >
              Add exercise
            </Button>
          )}
        </ExercisesDrawer>
      )}
    </div>
  );
}

function ExerciseSet({
  exercise,
  sets,
  isMutable = false,
  exerciseIndex,
  previousSets,
}: {
  exercise: ExerciseFieldsType;
  sets: ExerciseSetType["sets"];
  isMutable?: boolean;
  exerciseIndex: number;
  previousSets: ExerciseSetType["sets"] | undefined;
}) {
  const { activeWorkout, updateSet, addSet } = useActiveWorkoutContext();

  const columns = [];
  columns.push({ key: "type", label: "SET" });
  columns.push({ key: "previous", label: "PREVIOUS" });
  switch (exercise.exerciseType) {
    case "weight & reps":
      columns.push({ key: "weight", label: "KG" });
      columns.push({ key: "reps", label: "REPS" });
      break;
    case "weighted bodyweight":
      columns.push({ key: "weight", label: "+KG" });
      columns.push({ key: "reps", label: "REPS" });
      break;
    case "assisted bodyweight":
      columns.push({ key: "weight", label: "-KG" });
      columns.push({ key: "reps", label: "REPS" });
      break;
    case "bodyweight reps":
      columns.push({ key: "reps", label: "REPS" });
      break;
  }

  if (isMutable) {
    columns.push({
      key: "done",
      label: (
        <div className="flex justify-end">
          <Check />
        </div>
      ),
    });
  }

  const rows = sets.map((set, i) => ({
    set,
    index: i,
  }));

  const renderCell = useCallback(
    (item: SetRowType, columnKey: SetRowColumnKey) => {
      switch (columnKey) {
        case "type":
          return (
            <SetMenu item={item} rows={rows} exerciseIndex={exerciseIndex} />
          );
        case "previous":
          if (previousSets && item.index < previousSets.length) {
            return (
              <div
                className="text-foreground/70 text-nowrap"
                onClick={
                  isMutable
                    ? () =>
                        updateSet({
                          id: activeWorkout!._id,
                          exerciseIndex,
                          setIndex: item.index,
                          setData: {
                            reps: previousSets[item.index].reps,
                            weight: previousSets[item.index].weight,
                            type: previousSets[item.index].type,
                          },
                        })
                    : undefined
                }
              >
                {setDetailString(previousSets[item.index])}
              </div>
            );
          } else {
            return <div className="text-foreground/70">-</div>;
          }
        case "reps":
        case "weight":
          return (
            <DebouncedInput
              type="number"
              classNames={{
                input: "font-black",
              }}
              validationBehavior="aria"
              inputMode={columnKey === "reps" ? "numeric" : "decimal"}
              numberOnly
              autoSelect
              allowDecimals={columnKey === "weight"}
              isReadOnly={!isMutable}
              onValueChange={
                isMutable
                  ? (v) => {
                      updateSet({
                        id: activeWorkout!._id,
                        exerciseIndex,
                        setIndex: item.index,
                        setData: {
                          [columnKey]:
                            columnKey === "reps" ? parseInt(v) : parseFloat(v),
                        },
                      });
                    }
                  : undefined
              }
              value={item.set[columnKey]?.toString() ?? ""}
              placeholder={
                item.index > 0
                  ? (rows[item.index - 1]?.set[columnKey]?.toString() ?? "0")
                  : "0"
              }
            />
          );
        case "done":
          return (
            <div className="flex justify-end">
              <Checkbox
                isSelected={item.set.done}
                size="lg"
                color="success"
                classNames={{ icon: "text-background" }}
                onValueChange={(v) => {
                  zap();
                  updateSet({
                    id: activeWorkout!._id,
                    exerciseIndex,
                    setIndex: item.index,
                    setData: {
                      done: v,
                    },
                  });
                }}
              />
            </div>
          );
        default:
          return item[columnKey];
      }
    },
    [isMutable, rows],
  );

  const classNames = {
    th: "bg-transparent text-foreground/70 border-b border-divider",
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
            <TableColumn key={column.key}>{column.label}</TableColumn>
          ))}
        </TableHeader>
        <TableBody items={rows}>
          {(item) => (
            <TableRow
              className={cn({
                "bg-success-200": item.set.done,
              })}
              key={item.index}
            >
              {(columnKey) => (
                <TableCell>
                  {renderCell(item, columnKey as SetRowColumnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {isMutable && (
        <Button
          size="sm"
          startContent={<Plus size={16} />}
          onPress={() => {
            zap();
            addSet({ id: activeWorkout!._id, exerciseIndex });
          }}
        >
          Add Set
        </Button>
      )}
    </>
  );
}
