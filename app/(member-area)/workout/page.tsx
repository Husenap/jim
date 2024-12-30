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
import { Button, Card, CardFooter, CardHeader } from "@nextui-org/react";
import { useQuery } from "convex/react";
import { Ellipsis, NotepadText, Plus, Search } from "lucide-react";
import Link from "next/link";

export default function Page() {
  const routines = useQuery(api.routines.custom) ?? [];

  return (
    <PageContainer bottomNavbar={<BottomNavbar />}>
      <TypographyH2>Quick Start</TypographyH2>
      <Button size="lg" className="under-construction" startContent={<Plus />}>
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
        <Card key={r._id} fullWidth isPressable as="div">
          <CardHeader className="items-start justify-between">
            <div>
              <TypographyH1>{r.name}</TypographyH1>
              <TypographyH4>
                {r.exercises.map((e) => e?.name).join(", ")}
              </TypographyH4>
            </div>
            <Button isIconOnly variant="light" size="md">
              <Ellipsis size={20} />
            </Button>
          </CardHeader>
          <CardFooter>
            <Button fullWidth color="primary" className="under-construction">
              Start Routine
            </Button>
          </CardFooter>
        </Card>
      ))}
    </PageContainer>
  );
}
