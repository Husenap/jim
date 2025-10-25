import { useActiveWorkoutContext } from "@/components/active-workout/active-workout-context";
import DrawerMenu from "@/components/drawer-menu/drawer-menu";
import DrawerMenuContent from "@/components/drawer-menu/drawer-menu-content";
import GetSupersetColor from "@/utils/workout/superset";
import { cn, MenuItem } from "@heroui/react";
import type { UseDisclosureReturn } from "@heroui/use-disclosure";
import { Check } from "lucide-react";

export default function SupersetDrawer({
  disclosure,
  exerciseIndex,
}: {
  disclosure: UseDisclosureReturn;
  exerciseIndex: number;
}) {
  const { activeWorkout, exercises, updateSuperset } =
    useActiveWorkoutContext();

  return (
    <>
      <DrawerMenu disclosure={disclosure}>
        <DrawerMenuContent ariaLabel={"Superset Menu"}>
          {exercises!.map((exercise, index) => (
            <MenuItem
              key={index}
              title={exercise.exercise.name}
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
                exerciseIndex !== index
                  ? () => {
                      updateSuperset({
                        id: activeWorkout!._id,
                        exerciseIndex,
                        withIndex: index,
                      });
                    }
                  : undefined
              }
            />
          ))}
        </DrawerMenuContent>
      </DrawerMenu>
    </>
  );
}
