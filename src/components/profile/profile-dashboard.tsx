import ExercisesDrawer from "@/components/exercise-list/exercises-drawer";
import { TypographyH2 } from "@/components/typography";
import { Button } from "@heroui/react";
import { Calendar, ChartLine, Dumbbell, PersonStanding } from "lucide-react";
import Link from "next/link";

export default function ProfileDashboard() {
  return (
    <>
      <TypographyH2>Dashboard</TypographyH2>
      <div className="grid grid-cols-2 grid-rows-2 gap-2">
        <Button
          startContent={<ChartLine />}
          as={Link}
          href="profile/statistics"
        >
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
          startContent={<PersonStanding />}
          as={Link}
          href="profile/measures"
        >
          Measures
        </Button>

        <Button startContent={<Calendar />} as={Link} href="profile/calendar">
          Calendar
        </Button>
      </div>
    </>
  );
}
