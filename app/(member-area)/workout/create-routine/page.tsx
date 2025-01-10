"use client";
import Navbar from "@/app/(member-area)/workout/create-routine/navbar";
import ExercisesDrawer from "@/components/exercise-list/exercises-drawer";
import PageContainer from "@/components/page-container";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import useLocalStorage from "@/utils/use-local-storage";
import {
  Avatar,
  Button,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Form,
  Input,
  useDisclosure,
} from "@nextui-org/react";
import { useMutation } from "convex/react";
import { Dumbbell, EllipsisVertical, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { v4 as uuidv4 } from "uuid";

export default function Page() {
  const { back } = useRouter();

  const replaceDisclosure = useDisclosure();

  const [title, setTitle] = useLocalStorage("jim-create-routine-title", "");
  const [exercises, setExercises] = useLocalStorage(
    "jim-create-routine-exercises",
    [] as { exercise: Doc<"exercises">; id: string }[],
  );
  const [errors, setErrors] = useState({} as Record<string, string>);
  const [replaceId, setReplaceId] = useLocalStorage<string | null>(
    "jim-create-routine-replaceId",
    null,
  );

  const createRoutine = useMutation(api.routines.create);

  const onSave = async () => {
    if (title === "") {
      setErrors({
        title: "Your routine needs a title.",
      });
      return;
    }
    if (exercises.length === 0) {
      setErrors({
        exercises: "Your routine needs at least one exercise.",
      });
      return;
    }
    try {
      const result = await createRoutine({
        name: title,
        exercises: exercises.map((e) => e.exercise._id),
      });
      console.log("Successfully created routine!", result);
      back();
    } catch {
      console.error("Failed to create routine!");
    } finally {
    }
  };

  const onSelect = (e: Doc<"exercises">, onClose: () => void) => {
    if (replaceId) {
      setExercises(
        exercises.map(({ exercise, id }) =>
          id === replaceId ? { exercise: e, id: uuidv4() } : { exercise, id },
        ),
      );
    } else {
      setExercises([...exercises, { exercise: e, id: uuidv4() }]);
    }
    onClose();
  };

  return (
    <PageContainer topNavbar={<Navbar onCancel={back} onSave={onSave} />}>
      <Form validationErrors={errors}>
        <Input
          name="title"
          placeholder="Routine title"
          size="lg"
          value={title}
          onValueChange={setTitle}
        />
      </Form>
      <Divider />
      {exercises.length === 0 && (
        <div className="flex flex-col items-center gap-2 py-8">
          <Dumbbell size={32} />
          <span>Get started by adding an exercise to your routine.</span>
          {"exercises" in errors && (
            <span className="text-danger">{errors["exercises"]}</span>
          )}
        </div>
      )}

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
            className="flex flex-row justify-between p-2 transition-background"
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
            <Dropdown placement="left">
              <DropdownTrigger>
                <Button isIconOnly variant="light" size="md">
                  <EllipsisVertical size={20} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  key="replace"
                  onPress={() => {
                    setReplaceId(id);
                    replaceDisclosure.onOpen();
                  }}
                >
                  Replace exercise
                </DropdownItem>
                <DropdownItem
                  key="delete"
                  color="danger"
                  className="text-danger"
                  onPress={() =>
                    setExercises(
                      exercises.filter(({ id: otherId }) => id !== otherId),
                    )
                  }
                >
                  Remove exercise
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        ))}
      </ReactSortable>

      <ExercisesDrawer
        title="Replace Exercise"
        onSelect={onSelect}
        disclosure={replaceDisclosure}
      />

      <ExercisesDrawer title="Add Exercise" onSelect={onSelect}>
        {(onOpen) => (
          <Button
            onPress={() => {
              setReplaceId(null);
              onOpen();
            }}
            color="primary"
            startContent={<Plus />}
          >
            Add exercise
          </Button>
        )}
      </ExercisesDrawer>
    </PageContainer>
  );
}
