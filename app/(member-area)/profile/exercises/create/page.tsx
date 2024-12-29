"use client";

import Navbar from "@/app/(member-area)/profile/exercises/create/navbar";
import PageContainer from "@/components/page-container";
import { api } from "@/convex/_generated/api";
import {
  Equipment,
  EquipmentValidator,
  ExerciseType,
  ExerciseTypeValidator,
  MuscleGroup,
  MuscleGroupValidator,
} from "@/convex/schema";
import { Button, Form, Input, Select, SelectItem } from "@nextui-org/react";
import { useMutation } from "convex/react";
import { Save } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";

export default function Page() {
  const [name, setName] = useState("");
  const [equipment, setEquipment] = useState(new Set([] as Equipment[]));
  const [primaryMuscleGroup, setPrimaryMuscleGroup] = useState(
    new Set([] as MuscleGroup[]),
  );
  const [secondaryMuscleGroups, setSecondaryMuscleGroups] = useState(
    new Set([] as MuscleGroup[]),
  );
  const [exerciseType, setExerciseType] = useState(
    new Set([] as ExerciseType[]),
  );

  const createExercise = useMutation(api.exercises.create);
  const { back } = useRouter();

  const onSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      name,
      equipment: Array.from(equipment).pop()!,
      primaryMuscleGroup: Array.from(primaryMuscleGroup).pop()!,
      secondaryMuscleGroups: Array.from(secondaryMuscleGroups),
      exerciseType: Array.from(exerciseType).pop()!,
    };

    try {
      const result = await createExercise(data);
      console.log("Successfully created custom exercise!", result);
      back();
    } catch {
      console.error("Failed to create custom exercise!");
    } finally {
    }
  };

  const handleSelectionChange = <T,>(
    setValues: Dispatch<SetStateAction<Set<T>>>,
  ) => {
    return (e: ChangeEvent<HTMLSelectElement>) => {
      setValues(new Set(e.target.value.split(",") as T[]));
    };
  };

  return (
    <PageContainer topNavbar={<Navbar />}>
      <Form validationBehavior="native" onSubmit={onSave}>
        <Input
          isRequired
          name="name"
          label="Exercise Name"
          placeholder="Exercise Name"
          value={name}
          onValueChange={setName}
        />
        <Select
          name="equipment"
          isRequired
          label="Equipment"
          placeholder="Select"
          selectedKeys={equipment}
          onChange={handleSelectionChange(setEquipment)}
        >
          {EquipmentValidator.members.map((equipment) => (
            <SelectItem key={equipment.value}>{equipment.value}</SelectItem>
          ))}
        </Select>
        <Select
          name="primaryMuscleGroup"
          isRequired
          label="Primary Muscle Group"
          placeholder="Select"
          selectedKeys={primaryMuscleGroup}
          onChange={handleSelectionChange(setPrimaryMuscleGroup)}
        >
          {MuscleGroupValidator.members.map((muscleGroup) => (
            <SelectItem key={muscleGroup.value}>{muscleGroup.value}</SelectItem>
          ))}
        </Select>
        <Select
          name="secondaryMuscleGroups"
          label="Secondary Muscle Groups"
          placeholder="Select (optional)"
          selectionMode="multiple"
          selectedKeys={secondaryMuscleGroups}
          onChange={handleSelectionChange(setSecondaryMuscleGroups)}
        >
          {MuscleGroupValidator.members.map((muscleGroup) => (
            <SelectItem key={muscleGroup.value}>{muscleGroup.value}</SelectItem>
          ))}
        </Select>
        <Select
          name="exerciseType"
          isRequired
          label="Exercise Type"
          placeholder="Select"
          selectedKeys={exerciseType}
          onChange={handleSelectionChange(setExerciseType)}
        >
          {ExerciseTypeValidator.members.map((exercise) => (
            <SelectItem key={exercise.value}>{exercise.value}</SelectItem>
          ))}
        </Select>
        <Button
          type="submit"
          startContent={<Save />}
          className="w-full"
          color="primary"
        >
          Save
        </Button>
      </Form>
    </PageContainer>
  );
}
