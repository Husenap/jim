"use client";

import BottomNavbar from "@/app/(member-area)/bottom-navbar";
import PageContainer from "@/components/page-container";
import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
} from "@/components/typography";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useMutation, useQuery } from "convex/react";
import { Ellipsis, NotepadText, Plus, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
  const routines = useQuery(api.routines.custom) ?? [];
  const removeRoutine = useMutation(api.routines.remove);
  const createWorkout = useMutation(api.activeWorkouts.create);
  const { push } = useRouter();

  const startWorkout = async (id?: Id<"routines">) => {
    try {
      const workoutId = await createWorkout({ id });
      push(`/workout/live/${workoutId}`);
    } catch (error) {
      console.log(error);
      console.log("Failed to create workout");
    }
  };

  return (
    <PageContainer bottomNavbar={<BottomNavbar />}>
      <TypographyH2>Quick Start</TypographyH2>
      <Button
        size="lg"
        className="under-construction"
        startContent={<Plus />}
        onPress={() => startWorkout()}
      >
        Start Empty Workout
      </Button>
      <TypographyH2>Routines</TypographyH2>
      <div className="grid grid-cols-2 gap-4">
        <Button
          as={Link}
          href="/workout/create-routine"
          size="lg"
          startContent={<NotepadText />}
        >
          New Routine
        </Button>
        <Button
          size="lg"
          startContent={<Search />}
          className="under-construction"
        >
          Explore
        </Button>
      </div>
      <TypographyH3>My Routines</TypographyH3>
      {routines.map((r) => (
        <Card key={r._id} fullWidth as="div">
          <CardHeader className="items-start justify-between">
            <div>
              <TypographyH1>{r.name}</TypographyH1>
              <TypographyH4>
                {r.exercises.map((e) => e.name).join(", ")}
              </TypographyH4>
            </div>
            <Dropdown placement="left">
              <DropdownTrigger>
                <Button isIconOnly variant="light" size="md">
                  <Ellipsis size={20} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  key="delete"
                  color="danger"
                  className="text-danger"
                  onPress={() => {
                    removeRoutine({ id: r._id });
                  }}
                >
                  Remove routine
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </CardHeader>
          <CardFooter>
            <Button
              fullWidth
              color="primary"
              onPress={() => startWorkout(r._id)}
            >
              Start Routine
            </Button>
          </CardFooter>
        </Card>
      ))}
    </PageContainer>
  );
}
