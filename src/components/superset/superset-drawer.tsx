import DrawerMenu from "@/components/drawer-menu/drawer-menu";
import DrawerMenuContent from "@/components/drawer-menu/drawer-menu-content";
import GetSupersetColor from "@/utils/workout/superset";
import { cn, MenuItem } from "@heroui/react";
import type { UseDisclosureReturn } from "@heroui/use-disclosure";
import { Check } from "lucide-react";

type Exercise = {
  name: string;
  superset?: number;
};

export default function SupersetDrawer({
  disclosure,
  exerciseIndex,
  onSelect,
  exercises,
}: {
  disclosure: UseDisclosureReturn;
  exerciseIndex: number;
  onSelect: (selectedExercise: number) => void;
  exercises: Exercise[];
}) {
  return (
    <DrawerMenu disclosure={disclosure}>
      <DrawerMenuContent ariaLabel={"Superset Menu"}>
        {exercises!.map((exercise, index) => (
          <MenuItem
            key={index}
            title={exercise.name}
            closeOnSelect={exerciseIndex !== index}
            endContent={
              index === exerciseIndex ? (
                <Check className="text-primary" />
              ) : null
            }
            startContent={
              exercise.superset !== undefined ? (
                <span
                  className={cn(
                    "h-5 w-1 rounded-full",
                    `bg-${GetSupersetColor(exercise.superset)}`,
                  )}
                />
              ) : null
            }
            onPress={
              exerciseIndex !== index ? () => onSelect(index) : undefined
            }
          />
        ))}
      </DrawerMenuContent>
    </DrawerMenu>
  );
}
