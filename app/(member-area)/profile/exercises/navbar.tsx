"use client";

import BackButton from "@/components/back-button";
import ExercisesFilter from "@/components/exercise-list/exercises-filter";
import { Button, Divider, Link } from "@nextui-org/react";

export default function Navbar() {
  return (
    <>
      <div className="grid grid-cols-3 items-center p-3">
        <BackButton />

        <span className="text-center">Exercises</span>

        <div className="text-right">
          <Button
            as={Link}
            color="primary"
            href="/profile/exercises/create"
            variant="light"
          >
            Create
          </Button>
        </div>
      </div>
      <Divider />
      <ExercisesFilter />
    </>
  );
}
