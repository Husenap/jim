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
import {
  Accordion,
  AccordionItem,
  Button,
  Form,
  Input,
  Select,
  SelectItem,
  Slider,
} from "@nextui-org/react";
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
  const [muscleGroupWeight, setMuscleGroupWeight] = useState<
    Partial<Record<MuscleGroup, number>>
  >({});
  const [bodyweightFactor, setBodyweightFactor] = useState(1.0);

  const filteredSecondaryMuscleGroups = MuscleGroupValidator.members.filter(
    (mg) => !primaryMuscleGroup.has(mg.value),
  );

  const allMuscleGroups = Array.from(
    primaryMuscleGroup.union(secondaryMuscleGroups),
  );

  const createExercise = useMutation(api.exercises.create);
  const { back } = useRouter();

  const onSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      name,
      equipment: Array.from(equipment).pop()!,
      muscleGroups: allMuscleGroups.map((mg) => ({
        muscleGroup: mg,
        weight: muscleGroupWeight[mg] ?? 0.5,
      })),
      exerciseType: Array.from(exerciseType).pop()!,
      bodyweightFactor,
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
    values: Set<T>,
    setValues: Dispatch<SetStateAction<Set<T>>>,
    defaultWeight?: number,
    otherValues?: Set<T>,
    setOtherValues?: Dispatch<SetStateAction<Set<T>>>,
  ) => {
    return (e: ChangeEvent<HTMLSelectElement>) => {
      const newSet = new Set(
        (e.target.value === "" ? [] : e.target.value.split(",")) as T[],
      );

      if (otherValues && setOtherValues) {
        setOtherValues(otherValues.difference(newSet));
      }

      setValues(newSet);

      if (defaultWeight) {
        setMuscleGroupWeight({
          ...muscleGroupWeight,
          ...Object.fromEntries(
            Array.from(newSet.difference(values)).map((m) => [
              m,
              defaultWeight,
            ]),
          ),
        });
      }
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
          onChange={handleSelectionChange(equipment, setEquipment)}
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
          onChange={handleSelectionChange(
            primaryMuscleGroup,
            setPrimaryMuscleGroup,
            1.0,
            secondaryMuscleGroups,
            setSecondaryMuscleGroups,
          )}
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
          selectedKeys={secondaryMuscleGroups.difference(
            new Set(filteredSecondaryMuscleGroups),
          )}
          onChange={handleSelectionChange(
            secondaryMuscleGroups,
            setSecondaryMuscleGroups,
            0.5,
          )}
        >
          {filteredSecondaryMuscleGroups.map((muscleGroup) => (
            <SelectItem key={muscleGroup.value}>{muscleGroup.value}</SelectItem>
          ))}
        </Select>

        <Select
          name="exerciseType"
          isRequired
          label="Exercise Type"
          placeholder="Select"
          selectedKeys={exerciseType}
          onChange={handleSelectionChange(exerciseType, setExerciseType)}
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

        <Accordion selectionMode="multiple">
          <AccordionItem
            isDisabled={allMuscleGroups.length === 0}
            title="Muscle Group Coefficients"
          >
            {allMuscleGroups.map((mg) => (
              <Slider
                key={mg}
                name={mg}
                maxValue={1.0}
                minValue={0.1}
                step={0.1}
                value={muscleGroupWeight[mg]}
                onChange={(weight) =>
                  setMuscleGroupWeight({
                    ...muscleGroupWeight,
                    [mg]: weight,
                  })
                }
                label={mg}
                color="secondary"
                showSteps
              />
            ))}
          </AccordionItem>
          <AccordionItem
            isDisabled={
              exerciseType.intersection(
                new Set([
                  "bodyweight reps",
                  "weighted bodyweight",
                  "assisted bodyweight",
                ] as ExerciseType[]),
              ).size === 0
            }
            title="Bodyweight Factor"
          >
            <Slider
              name={"bodyweightFactor"}
              maxValue={1}
              minValue={0.05}
              value={bodyweightFactor}
              getValue={(v) => `${Math.round((v as number) * 100)}%`}
              step={0.05}
              onChange={(value) => setBodyweightFactor(value as number)}
              label="Bodyweight Factor"
              color="secondary"
              showSteps
            />
          </AccordionItem>
        </Accordion>
      </Form>
    </PageContainer>
  );
}
