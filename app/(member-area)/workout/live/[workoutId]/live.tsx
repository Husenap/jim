"use client";

import { useActiveWorkoutContext } from "@/components/active-workout/active-workout-context";
import ExercisesDrawer from "@/components/exercise-list/exercises-drawer";
import FullscreenSpinner from "@/components/fullscreen-spinner";
import { ExerciseFieldsType, ExerciseSetType, SetType } from "@/convex/schema";
import {
  Avatar,
  Button,
  Checkbox,
  cn,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  InputProps,
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
} from "@nextui-org/react";
import { Check, Ellipsis, Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

export default function Live() {
  const {
    activeWorkout,
    exercises,
    isOwner,
    updateNote,
    addExercise,
    removeExercise,
  } = useActiveWorkoutContext();
  const { back } = useRouter();

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
                <Button onPress={back} color="primary">
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
              {isOwner && (
                <Dropdown placement="left">
                  <DropdownTrigger>
                    <Button isIconOnly variant="light" size="md">
                      <Ellipsis size={20} />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu>
                    <DropdownItem
                      key="delete"
                      color="danger"
                      className="text-danger"
                      onPress={() => {
                        removeExercise({
                          workoutId: activeWorkout._id,
                          exerciseIndex: i,
                        });
                      }}
                    >
                      Remove exercise
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              )}
            </div>
            {isOwner ? (
              <DebouncedInput
                size="sm"
                placeholder="Add a note..."
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
              e.note && <span className="text-sm">{e.note}</span>
            )}
            <ExerciseSet
              exerciseIndex={i}
              isMutable={isOwner}
              exercise={e.exercise}
              sets={e.sets}
            />
          </div>
        </div>
      ))}
      {isOwner && (
        <ExercisesDrawer
          title="Add Exercise"
          onSelect={(e, onClose) => {
            addExercise({ workoutId: activeWorkout._id, exerciseId: e._id });
            onClose();
          }}
        >
          {(onOpen) => (
            <Button
              onPress={() => {
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
}: {
  exercise: ExerciseFieldsType;
  sets: ExerciseSetType["sets"];
  isMutable?: boolean;
  exerciseIndex: number;
}) {
  const { activeWorkout, updateSet, addSet, removeSet } =
    useActiveWorkoutContext();

  const columns = [];
  columns.push({ key: "type", label: "SET" });
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

  columns.push({
    key: "done",
    label: (
      <div className="flex justify-end">
        <Check />
      </div>
    ),
  });

  const rows = sets.map((set, i) => ({
    set,
    index: i,
  }));
  type Item = (typeof rows)[0];

  const setTypeButtons: {
    color: string;
    shortLabel: string;
    label: string;
    value: SetType;
  }[] = [
    {
      color: "text-warning",
      shortLabel: "W",
      label: "Warm Up Set",
      value: "warmup",
    },
    {
      color: "text-foreground",
      shortLabel: "1",
      label: "Normal Set",
      value: "normal",
    },
    {
      color: "text-danger",
      shortLabel: "F",
      label: "Failure Set",
      value: "failure",
    },
    {
      color: "text-primary",
      shortLabel: "D",
      label: "Drop Set",
      value: "drop",
    },
  ];

  const renderCell = useCallback(
    (item: Item, columnKey: keyof Item["set"]) => {
      switch (columnKey) {
        case "type":
          return (
            <Dropdown
              isOpen={isMutable ? undefined : false}
              shouldBlockScroll={false}
            >
              <DropdownTrigger>
                <div
                  className={cn(
                    "-m-3 min-w-6 cursor-pointer p-3 text-center text-lg font-bold",
                    {
                      "text-[#eeaa00]": item.set.type === "warmup",
                      "text-[#36baff]": item.set.type === "drop",
                      "text-[#e34b37]": item.set.type === "failure",
                    },
                  )}
                >
                  {item.set.type === "normal"
                    ? rows.reduce(
                        (acc, cur, ind) =>
                          acc +
                          Number(
                            ind <= item.index && cur.set.type !== "warmup",
                          ),
                        0,
                      )
                    : item.set.type[0].toUpperCase()}
                </div>
              </DropdownTrigger>
              <DropdownMenu>
                <>
                  {setTypeButtons.map(({ color, shortLabel, label, value }) => (
                    <DropdownItem
                      key={value}
                      startContent={
                        <span
                          className={cn(
                            "w-6 text-center text-lg font-bold",
                            color,
                          )}
                        >
                          {shortLabel}
                        </span>
                      }
                      onPress={
                        isMutable
                          ? () =>
                              updateSet({
                                id: activeWorkout!._id,
                                exerciseIndex,
                                setIndex: item.index,
                                setData: { type: value },
                              })
                          : undefined
                      }
                    >
                      {label}
                    </DropdownItem>
                  ))}
                  <DropdownItem
                    key="delete"
                    startContent={<X className="text-danger" />}
                    onPress={
                      isMutable
                        ? () =>
                            removeSet({
                              id: activeWorkout!._id,
                              exerciseIndex,
                              setIndex: item.index,
                            })
                        : undefined
                    }
                  >
                    Remove Set
                  </DropdownItem>
                </>
              </DropdownMenu>
            </Dropdown>
          );
        case "reps":
        case "weight":
          return (
            <DebouncedInput
              type="number"
              validationBehavior="aria"
              inputMode={columnKey === "reps" ? "numeric" : "decimal"}
              numberOnly
              autoSelect
              allowDecimals={columnKey === "weight"}
              isReadOnly={!isMutable}
              onValueChange={
                isMutable
                  ? (v) =>
                      updateSet({
                        id: activeWorkout!._id,
                        exerciseIndex,
                        setIndex: item.index,
                        setData: {
                          [columnKey]:
                            (columnKey === "reps"
                              ? parseInt(v)
                              : parseFloat(v)) || undefined,
                        },
                      })
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
                isReadOnly={!isMutable}
                size="lg"
                color="success"
                classNames={{ icon: "text-background" }}
                onValueChange={
                  isMutable
                    ? (v) =>
                        updateSet({
                          id: activeWorkout!._id,
                          exerciseIndex,
                          setIndex: item.index,
                          setData: {
                            done: v,
                          },
                        })
                    : undefined
                }
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
    th: "bg-transparent text-default-500 border-b border-divider",
    td: [
      "group-data-[first=true]/tr:first:before:rounded-none",
      "group-data-[first=true]/tr:last:before:rounded-none",
      "group-data-[middle=true]/tr:before:rounded-none",
      "group-data-[last=true]/tr:first:before:rounded-none",
      "group-data-[last=true]/tr:last:before:rounded-none",
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
      >
        <TableHeader>
          {columns.map((column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {rows.map((item) => (
            <TableRow
              className={cn({
                "bg-success-200": item.set.done,
              })}
              key={item.index}
            >
              {(columnKey) => (
                <TableCell>
                  {renderCell(item, columnKey as keyof Item["set"])}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {isMutable && (
        <Button
          size="sm"
          startContent={<Plus size={16} />}
          onPress={() => addSet({ id: activeWorkout!._id, exerciseIndex })}
        >
          Add Set
        </Button>
      )}
    </>
  );
}

interface DebouncedInputProps extends InputProps {
  numberOnly?: boolean;
  allowDecimals?: boolean;
  autoSelect?: boolean;
}
function DebouncedInput(props: DebouncedInputProps) {
  const { value, onValueChange, numberOnly, allowDecimals, autoSelect } = props;
  const [inputValue, setInputValue] = useState(value);
  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <Input
      {...props}
      ref={ref}
      type="search"
      autoComplete="none"
      value={inputValue}
      onValueChange={(v) => {
        if (numberOnly) v = v.replaceAll(/[a-zA-z]/g, "");
        if (allowDecimals) v = v.replaceAll(",", ".");
        else v = v.replaceAll(/[,.]/g, "");
        setInputValue(v);
      }}
      onFocusChange={(isFocused) => {
        if (isFocused) {
          if (autoSelect) ref.current?.setSelectionRange(0, -1);
        } else {
          onValueChange && onValueChange(inputValue ?? "");
        }
      }}
    />
  );
}
