import { TypographyH2 } from "@/components/typography";
import { Button } from "@nextui-org/react";
import { Calendar, ChartLine, Dumbbell, PersonStanding } from "lucide-react";
import { Link } from "next-view-transitions";

export default function ProfileDashboard() {
  return (
    <>
      <TypographyH2>Dashboard</TypographyH2>
      <div className="grid grid-cols-2 grid-rows-2 gap-2">
        <Button className="under-construction" startContent={<ChartLine />}>
          Statistics
        </Button>
        <Button as={Link} href="/profile/exercises" startContent={<Dumbbell />}>
          Exercises
        </Button>
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
