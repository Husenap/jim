import GetSupersetColor from "@/utils/workout/superset";
import { Chip } from "@heroui/react";

export default function WorkoutSupersetChip({
  superset,
}: {
  superset: number;
}) {
  return (
    <Chip color={GetSupersetColor(superset)} variant="shadow">
      Superset
    </Chip>
  );
}
