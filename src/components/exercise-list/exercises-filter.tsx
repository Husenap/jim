import { useExercisesContext } from "@/components/exercise-list/exercises-context";
import {
  Equipment,
  EquipmentValidator,
  MuscleGroup,
  MuscleGroupValidator,
} from "@/convex/schema";
import { Input, Select, SelectItem } from "@heroui/react";
import { Search } from "lucide-react";

export default function ExercisesFilter() {
  const {
    search,
    setSearch,
    muscleGroup,
    setMuscleGroup,
    equipment,
    setEquipment,
  } = useExercisesContext();

  return (
    <div className="flex flex-col gap-2 py-3">
      <Input
        placeholder="Type to search..."
        size="sm"
        startContent={<Search size={18} />}
        type="search"
        autoComplete="off"
        onChange={(e) => setSearch(e.currentTarget.value)}
        value={search}
      />
      <div className="grid grid-cols-2 gap-2">
        <Select
          placeholder="All Equipment"
          aria-label="Equipment"
          size="md"
          selectedKeys={equipment}
          isClearable
          onChange={(e) => {
            setEquipment(
              new Set(
                (e.target.value === ""
                  ? []
                  : e.target.value.split(",")) as Equipment[],
              ),
            );
          }}
        >
          {EquipmentValidator.members.map((eq) => (
            <SelectItem key={eq.value}>{eq.value}</SelectItem>
          ))}
        </Select>
        <Select
          placeholder="All Muscles"
          aria-label="Muscle Group"
          size="md"
          selectedKeys={muscleGroup}
          isClearable
          onChange={(e) => {
            setMuscleGroup(
              new Set(
                (e.target.value === ""
                  ? []
                  : e.target.value.split(",")) as MuscleGroup[],
              ),
            );
          }}
        >
          {MuscleGroupValidator.members.map((mg) => (
            <SelectItem key={mg.value}>{mg.value}</SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
}
