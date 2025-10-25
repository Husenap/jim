import ExercisesDrawer from "@/components/exercise-list/exercises-drawer";
import { TypographyH2 } from "@/components/typography";
import { Button } from "@heroui/react";
import { Calendar, ChartLine, Dumbbell, PersonStanding } from "lucide-react";

export default function ProfileDashboard() {
  return (
    <>
      <TypographyH2>Dashboard</TypographyH2>
      <div className="grid grid-cols-2 grid-rows-2 gap-2">
        <Button className="under-construction" startContent={<ChartLine />}>
          Statistics
        </Button>

        <ExercisesDrawer>
          {(onOpen) => (
            <Button onPress={onOpen} startContent={<Dumbbell />}>
              Exercises
            </Button>
          )}
        </ExercisesDrawer>

        <Button
          className="under-construction"
          startContent={<PersonStanding />}
        >
          Measures
        </Button>
        <Button className="under-construction" startContent={<Calendar />}>
          Calendar
        </Button>
      </div>
    </>
  );
}
