import { useExercisesContext } from "@/components/exercise-list/exercises-context";
import { Button, Input } from "@nextui-org/react";
import { Search } from "lucide-react";

export default function ExercisesFilter() {
  const { setSearch } = useExercisesContext();
  return (
    <div className="flex flex-col gap-2 py-3">
      <Input
        placeholder="Type to search..."
        size="sm"
        startContent={<Search size={18} />}
        type="search"
        onChange={(e) => setSearch(e.currentTarget.value)}
      />
      <div className="grid grid-cols-2 gap-2">
        <Button size="sm" className="under-construction">
          Equipment
        </Button>
        <Button size="sm" className="under-construction">
          Muscle Groups
        </Button>
      </div>
    </div>
  );
}
